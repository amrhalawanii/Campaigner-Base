export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface ApiError {
  message: string;
  status: number;
  code: string;
  data?: any;
}

export interface ValidationError {
  field: string;
  message: string;
}

