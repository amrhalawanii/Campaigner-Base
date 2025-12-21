import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_CONFIG } from '../config/api.config';
import { ErrorHandler, type AppError } from '../utils/error-handler';
import type { ApiResponse } from '../types/api.types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS,
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if exists (only in browser)
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('auth_token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        const appError = ErrorHandler.handleApiError(error);
        ErrorHandler.logError(appError, 'Request Interceptor');
        return Promise.reject(appError);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        try {
          const appError = ErrorHandler.handleApiError(error);
          ErrorHandler.logError(appError, 'Response Interceptor');
          return Promise.reject(appError);
        } catch (handlerError) {
          // Fallback if error handler itself fails
          console.error('Error in error handler:', handlerError);
          return Promise.reject(error);
        }
      }
    );
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    // Ensure URL starts with / for proper path joining
    const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
    const response = await this.api.get<ApiResponse<T>>(normalizedUrl, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.post<ApiResponse<T>>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.put<ApiResponse<T>>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.api.delete<ApiResponse<T>>(url);
    return response.data;
  }
}

export const apiService = new ApiService();

