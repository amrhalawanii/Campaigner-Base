import apiService from './apiService';
import {
  User,
  SignupData,
  LoginCredentials,
  UpdateUserData,
  ResetPasswordData,
} from '../types/user.types';
import { ApiResponse } from '../types/api.types';

export const userApi = {
  signup: async (userData: SignupData): Promise<ApiResponse<User>> => {
    return apiService.post<User>('/signup.php', userData);
  },

  login: async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    return apiService.post<User>('/login.php', credentials);
  },

  logout: async (userId: number): Promise<ApiResponse<null>> => {
    return apiService.post<null>('/logout.php', { user_id: userId });
  },

  getUserData: async (userId: number): Promise<ApiResponse<User>> => {
    return apiService.get<User>('/get_user_data.php', { user_id: userId });
  },

  updateUser: async (userData: UpdateUserData): Promise<ApiResponse<null>> => {
    return apiService.post<null>('/update_user_data.php', userData);
  },

  resetPassword: async (
    passwordData: ResetPasswordData
  ): Promise<ApiResponse<null>> => {
    return apiService.post<null>('/reset_password.php', passwordData);
  },

  sendSignupVerification: async (
    email: string
  ): Promise<ApiResponse<{ verification_code: string }>> => {
    return apiService.post<{ verification_code: string }>(
      '/send_signup_verification_code.php',
      { email }
    );
  },

  sendResetPasswordVerification: async (
    email: string
  ): Promise<ApiResponse<{ verification_code: string }>> => {
    return apiService.post<{ verification_code: string }>(
      '/send_reset_password_verification_code.php',
      { email }
    );
  },

  deleteAccount: async (
    userId: number,
    reason?: string
  ): Promise<ApiResponse<null>> => {
    return apiService.post<null>('/delete_user_account.php', {
      user_id: userId,
      reason,
    });
  },
};

