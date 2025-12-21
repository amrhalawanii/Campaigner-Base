import { AxiosError } from 'axios';
import type { ApiResponse } from '../types/api.types';

export enum ErrorType {
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: any;
  statusCode?: number;
  details?: any;
}

export class ErrorHandler {
  /**
   * Handle API errors from Axios
   */
  static handleApiError(error: unknown): AppError {
    // If it's already an AppError, return it
    if (error && typeof error === 'object' && 'type' in error && 'message' in error) {
      return error as AppError;
    }

    if (error instanceof AxiosError) {
      return this.handleAxiosError(error);
    }

    if (error instanceof Error) {
      return {
        type: ErrorType.UNKNOWN,
        message: error.message || 'An unexpected error occurred',
        originalError: error,
      };
    }

    // Handle string errors
    if (typeof error === 'string') {
      return {
        type: ErrorType.UNKNOWN,
        message: error,
        originalError: error,
      };
    }

    // Handle object errors that might have a message
    if (error && typeof error === 'object') {
      const errorObj = error as any;
      return {
        type: ErrorType.UNKNOWN,
        message: errorObj.message || errorObj.error || 'An unexpected error occurred',
        originalError: error,
        details: errorObj,
      };
    }

    return {
      type: ErrorType.UNKNOWN,
      message: 'An unexpected error occurred',
      originalError: error,
    };
  }

  /**
   * Handle Axios-specific errors
   */
  private static handleAxiosError(error: AxiosError<ApiResponse>): AppError {
    // Network error (no response received)
    if (error.request && !error.response) {
      return {
        type: ErrorType.NETWORK,
        message: 'Network error. Please check your internet connection and try again.',
        originalError: error,
        details: {
          code: error.code,
          message: error.message,
        },
      };
    }

    // Server responded with error
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      // Determine error type based on status code
      let errorType = ErrorType.API;
      let message = data?.message || 'An error occurred';

      switch (status) {
        case 401:
          errorType = ErrorType.AUTHENTICATION;
          message = message || 'Authentication failed. Please sign in again.';
          break;
        case 403:
          errorType = ErrorType.AUTHORIZATION;
          message = message || 'You do not have permission to perform this action.';
          break;
        case 404:
          errorType = ErrorType.NOT_FOUND;
          message = message || 'The requested resource was not found.';
          break;
        case 422:
          errorType = ErrorType.VALIDATION;
          message = message || 'Validation error. Please check your input.';
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          errorType = ErrorType.SERVER;
          message = message || 'Server error. Please try again later.';
          break;
        default:
          errorType = ErrorType.API;
          message = message || `Request failed with status ${status}`;
      }

      return {
        type: errorType,
        message,
        statusCode: status,
        originalError: error,
        details: {
          data: data,
          status: status,
          statusText: error.response.statusText,
        },
      };
    }

    // Request configuration error
    return {
      type: ErrorType.UNKNOWN,
      message: error.message || 'An error occurred while making the request',
      originalError: error,
    };
  }

  /**
   * Get user-friendly error message
   */
  static getUserFriendlyMessage(error: AppError): string {
    switch (error.type) {
      case ErrorType.NETWORK:
        return 'Unable to connect to the server. Please check your internet connection.';
      case ErrorType.AUTHENTICATION:
        return 'Your session has expired. Please sign in again.';
      case ErrorType.AUTHORIZATION:
        return 'You do not have permission to perform this action.';
      case ErrorType.NOT_FOUND:
        return 'The requested resource was not found.';
      case ErrorType.VALIDATION:
        return error.message || 'Please check your input and try again.';
      case ErrorType.SERVER:
        return 'Server error. Our team has been notified. Please try again later.';
      case ErrorType.API:
        return error.message || 'An error occurred. Please try again.';
      default:
        return error.message || 'An unexpected error occurred. Please try again.';
    }
  }

  /**
   * Log error for debugging
   */
  static logError(error: AppError | any, context?: string): void {
    // Ensure we have a valid error object
    let appError: AppError;
    
    if (error && typeof error === 'object' && 'type' in error && 'message' in error) {
      // It's already an AppError
      appError = error as AppError;
    } else {
      // Convert to AppError if it's not already
      appError = this.handleApiError(error);
    }

    const logData = {
      type: appError.type || ErrorType.UNKNOWN,
      message: appError.message || 'Unknown error',
      statusCode: appError.statusCode,
      context: context || 'Unknown',
      timestamp: new Date().toISOString(),
      details: appError.details,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Handler:', logData);
      if (appError.originalError) {
        console.error('Original Error:', appError.originalError);
      }
    }

    // In production, you might want to send to error tracking service
    // Example: Sentry.captureException(appError.originalError, { extra: logData });
  }

  /**
   * Check if error is retryable
   */
  static isRetryable(error: AppError): boolean {
    return (
      error.type === ErrorType.NETWORK ||
      error.type === ErrorType.SERVER ||
      (error.statusCode && error.statusCode >= 500)
    );
  }

  /**
   * Format error for display in UI
   */
  static formatForDisplay(error: AppError): string {
    return this.getUserFriendlyMessage(error);
  }
}

/**
 * Helper function to handle errors in async functions
 */
export function handleAsyncError<T>(
  asyncFn: () => Promise<T>,
  context?: string
): Promise<T> {
  return asyncFn().catch((error) => {
    const appError = ErrorHandler.handleApiError(error);
    ErrorHandler.logError(appError, context);
    throw appError;
  });
}

