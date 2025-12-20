import { ApiError } from '../types/api.types';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export class ApiErrorClass extends Error implements ApiError {
  status: number;
  code: string;
  data?: any;

  constructor(message: string, status: number, code: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

export const errorHandler = {
  handleApiError: (error: any): ApiErrorClass => {
    console.error('API Error:', error);

    if (!error.response && error.message === 'Failed to fetch') {
      return new ApiErrorClass(
        ERROR_MESSAGES.NETWORK_ERROR,
        0,
        'NETWORK_ERROR'
      );
    }

    if (error.status) {
      switch (error.status) {
        case 401:
          return new ApiErrorClass(
            ERROR_MESSAGES.UNAUTHORIZED,
            401,
            'UNAUTHORIZED'
          );
        case 403:
          return new ApiErrorClass('Access denied.', 403, 'FORBIDDEN');
        case 404:
          return new ApiErrorClass('Resource not found.', 404, 'NOT_FOUND');
        case 422:
          return new ApiErrorClass(
            ERROR_MESSAGES.VALIDATION_ERROR,
            422,
            'VALIDATION_ERROR',
            error.data
          );
        case 500:
          return new ApiErrorClass(
            ERROR_MESSAGES.SERVER_ERROR,
            500,
            'SERVER_ERROR'
          );
        default:
          return new ApiErrorClass(
            error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
            error.status,
            'UNKNOWN_ERROR'
          );
      }
    }

    return new ApiErrorClass(
      error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      0,
      'UNKNOWN_ERROR'
    );
  },

  getUserMessage: (error: any): string => {
    if (error instanceof ApiErrorClass) {
      return error.message;
    }
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  },
};

