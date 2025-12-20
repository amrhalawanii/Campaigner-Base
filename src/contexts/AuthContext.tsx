"use client"

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { userApi } from '../services/userApi';
import { storage } from '../utils/storage';
import { errorHandler } from '../services/errorHandler';
import { SUCCESS_MESSAGES } from '../constants/errorMessages';
import {
  User,
  LoginCredentials,
  SignupData,
  UpdateUserData,
  ResetPasswordData,
} from '../types/user.types';
import { AuthResult } from '../types/auth.types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signup: (userData: SignupData) => Promise<AuthResult>;
  login: (credentials: LoginCredentials, rememberMe?: boolean) => Promise<AuthResult>;
  logout: () => Promise<AuthResult>;
  updateProfile: (userData: Partial<UpdateUserData>) => Promise<AuthResult>;
  resetPassword: (passwordData: ResetPasswordData) => Promise<AuthResult>;
  sendVerificationCode: (email: string, type?: 'signup' | 'reset') => Promise<AuthResult>;
  deleteAccount: (reason?: string) => Promise<AuthResult>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const initializeAuth = async (): Promise<void> => {
    try {
      const savedUser = storage.getUser();
      if (savedUser) {
        const response = await userApi.getUserData(savedUser.id);
        if (response.success && response.data) {
          setUser(response.data);
          setIsAuthenticated(true);
          storage.setUser(response.data);
        } else {
          storage.clearAll();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      storage.clearAll();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const signup = useCallback(async (userData: SignupData): Promise<AuthResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await userApi.signup(userData);

      if (response.success && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
        storage.setUser(response.data);
        return {
          success: true,
          message: SUCCESS_MESSAGES.SIGNUP_SUCCESS,
          data: response.data,
        };
      }

      return { success: false, message: 'Signup failed' };
    } catch (error) {
      const errorMessage = errorHandler.getUserMessage(error);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (
      credentials: LoginCredentials,
      rememberMe: boolean = false
    ): Promise<AuthResult> => {
      setLoading(true);
      setError(null);

      try {
        const response = await userApi.login(credentials);

        if (response.success && response.data) {
          setUser(response.data);
          setIsAuthenticated(true);
          storage.setUser(response.data);
          storage.setRememberMe(rememberMe);

          return {
            success: true,
            message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
            data: response.data,
          };
        }

        return { success: false, message: 'Login failed' };
      } catch (error) {
        const errorMessage = errorHandler.getUserMessage(error);
        setError(errorMessage);
        return { success: false, message: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async (): Promise<AuthResult> => {
    setLoading(true);
    setError(null);

    try {
      if (user?.id) {
        await userApi.logout(user.id);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      storage.clearAll();
      setLoading(false);
      return { success: true, message: SUCCESS_MESSAGES.LOGOUT_SUCCESS };
    }
  }, [user]);

  const updateProfile = useCallback(
    async (userData: Partial<UpdateUserData>): Promise<AuthResult> => {
      if (!user) {
        return { success: false, message: 'No user logged in' };
      }

      setLoading(true);
      setError(null);

      try {
        const response = await userApi.updateUser({
          user_id: user.id,
          ...userData,
        });

        if (response.success) {
          const updatedUser = await userApi.getUserData(user.id);
          if (updatedUser.success && updatedUser.data) {
            setUser(updatedUser.data);
            storage.setUser(updatedUser.data);

            return {
              success: true,
              message: 'Profile updated successfully!',
              data: updatedUser.data,
            };
          }
        }

        return { success: false, message: 'Update failed' };
      } catch (error) {
        const errorMessage = errorHandler.getUserMessage(error);
        setError(errorMessage);
        return { success: false, message: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const resetPassword = useCallback(
    async (passwordData: ResetPasswordData): Promise<AuthResult> => {
      setLoading(true);
      setError(null);

      try {
        const response = await userApi.resetPassword({
          user_id: user?.id,
          ...passwordData,
        });

        if (response.success) {
          return { success: true, message: SUCCESS_MESSAGES.PASSWORD_RESET };
        }

        return { success: false, message: 'Password reset failed' };
      } catch (error) {
        const errorMessage = errorHandler.getUserMessage(error);
        setError(errorMessage);
        return { success: false, message: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const sendVerificationCode = useCallback(
    async (email: string, type: 'signup' | 'reset' = 'signup'): Promise<AuthResult> => {
      setLoading(true);
      setError(null);

      try {
        const response =
          type === 'signup'
            ? await userApi.sendSignupVerification(email)
            : await userApi.sendResetPasswordVerification(email);

        if (response.success) {
          return {
            success: true,
            message: SUCCESS_MESSAGES.VERIFICATION_SENT,
            data: response.data as any,
          };
        }

        return { success: false, message: 'Failed to send verification code' };
      } catch (error) {
        const errorMessage = errorHandler.getUserMessage(error);
        setError(errorMessage);
        return { success: false, message: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteAccount = useCallback(
    async (reason: string = ''): Promise<AuthResult> => {
      if (!user) {
        return { success: false, message: 'No user logged in' };
      }

      setLoading(true);
      setError(null);

      try {
        const response = await userApi.deleteAccount(user.id, reason);

        if (response.success) {
          setUser(null);
          setIsAuthenticated(false);
          storage.clearAll();
          return { success: true, message: 'Account deleted successfully.' };
        }

        return { success: false, message: 'Account deletion failed' };
      } catch (error) {
        const errorMessage = errorHandler.getUserMessage(error);
        setError(errorMessage);
        return { success: false, message: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const refreshUser = useCallback(async (): Promise<void> => {
    if (!user?.id) return;

    try {
      const response = await userApi.getUserData(user.id);
      if (response.success && response.data) {
        setUser(response.data);
        storage.setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  }, [user]);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticated,
    signup,
    login,
    logout,
    updateProfile,
    resetPassword,
    sendVerificationCode,
    deleteAccount,
    refreshUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

