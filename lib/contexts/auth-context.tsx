"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { userService } from "../services/user.service"
import { ErrorHandler, type AppError } from "../utils/error-handler"
import type { User, LoginRequest, SignupRequest } from "../types/api.types"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (data: LoginRequest) => Promise<User>
  signup: (data: SignupRequest) => Promise<User>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      // Safety check for browser environment
      if (typeof window === 'undefined') {
        setIsLoading(false)
        return
      }

      try {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('auth_token')
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser))
        }
      } catch (err) {
        const appError = ErrorHandler.handleApiError(err)
        ErrorHandler.logError(appError, 'Auth Context - Load User from Storage')
        // Clear corrupted data
        try {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('user')
            localStorage.removeItem('auth_token')
          }
        } catch (clearError) {
          ErrorHandler.logError(
            ErrorHandler.handleApiError(clearError),
            'Auth Context - Clear Storage'
          )
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (data: LoginRequest): Promise<User> => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await userService.login(data)
      
      if (response.success && response.data) {
        setUser(response.data)
        // Store user and token in localStorage
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(response.data))
            // Note: The API should return a token in the response
            // For now, we'll store a placeholder. Update this when you know the token field name
            if (response.data.id) {
              localStorage.setItem('auth_token', String(response.data.id))
            }
          }
        } catch (storageError) {
          ErrorHandler.logError(
            {
              type: ErrorHandler.handleApiError(storageError).type,
              message: 'Failed to save user data to localStorage',
              originalError: storageError,
            },
            'Auth Context - Login Storage'
          )
        }
        return response.data
      } else {
        const appError: AppError = {
          type: ErrorHandler.handleApiError(new Error(response.message || 'Login failed')).type,
          message: response.message || 'Login failed',
        }
        setError(ErrorHandler.getUserFriendlyMessage(appError))
        throw appError
      }
    } catch (err: any) {
      const appError = ErrorHandler.handleApiError(err)
      const errorMessage = ErrorHandler.getUserFriendlyMessage(appError)
      ErrorHandler.logError(appError, 'Auth Context - Login')
      setError(errorMessage)
      throw appError
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (data: SignupRequest): Promise<User> => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await userService.signup(data)
      
      if (response.success && response.data) {
        setUser(response.data)
        // Store user and token in localStorage
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(response.data))
            // Note: The API should return a token in the response
            // For now, we'll store a placeholder. Update this when you know the token field name
            if (response.data.id) {
              localStorage.setItem('auth_token', String(response.data.id))
            }
          }
        } catch (storageError) {
          ErrorHandler.logError(
            {
              type: ErrorHandler.handleApiError(storageError).type,
              message: 'Failed to save user data to localStorage',
              originalError: storageError,
            },
            'Auth Context - Signup Storage'
          )
        }
        return response.data
      } else {
        const appError: AppError = {
          type: ErrorHandler.handleApiError(new Error(response.message || 'Signup failed')).type,
          message: response.message || 'Signup failed',
        }
        setError(ErrorHandler.getUserFriendlyMessage(appError))
        throw appError
      }
    } catch (err: any) {
      const appError = ErrorHandler.handleApiError(err)
      const errorMessage = ErrorHandler.getUserFriendlyMessage(appError)
      ErrorHandler.logError(appError, 'Auth Context - Signup')
      setError(errorMessage)
      throw appError
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      if (user) {
        try {
          await userService.logout(user.id)
        } catch (err) {
          // Log error but don't block logout
          const appError = ErrorHandler.handleApiError(err)
          ErrorHandler.logError(appError, 'Auth Context - Logout API')
        }
      }
    } catch (err) {
      const appError = ErrorHandler.handleApiError(err)
      ErrorHandler.logError(appError, 'Auth Context - Logout')
    } finally {
      // Always clear local state even if API call fails
      setUser(null)
      try {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user')
          localStorage.removeItem('auth_token')
        }
      } catch (storageError) {
        ErrorHandler.logError(
          {
            type: ErrorHandler.handleApiError(storageError).type,
            message: 'Failed to clear localStorage',
            originalError: storageError,
          },
          'Auth Context - Logout Storage'
        )
      }
    }
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

