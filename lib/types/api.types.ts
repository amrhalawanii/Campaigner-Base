// Common API Response
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}

// User Types
export interface User {
  id: number;
  full_name: string;
  email: string;
  user_name: string;
  signin_method: string;
  subscription_type: string;
  account_type: string;
  fcm_token?: string;
  gender?: string;
  last_login_at?: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email?: string;
  user_name?: string;
  password: string;
  signin_method: string;
  type?: string; // API may require this field
}

export interface SignupRequest {
  email: string;
  password: string;
  signin_method: string;
  full_name?: string;
  user_name?: string;
  subscription_type?: string;
  account_type?: string;
  fcm_token?: string;
  gender?: string;
}

export interface ResetPasswordRequest {
  user_id?: number;
  email?: string;
  old_password?: string;
  password: string;
  confirm_password: string;
}

export interface SendVerificationCodeRequest {
  email: string;
}

// Campaign Types
export interface Campaign {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  launch_date: string;
  brand: Brand;
  agency: Agency;
  location: Location;
  media: Media[];
  is_saved?: boolean;
  my_campaigns_folder_saved?: number[];
  bookmarks_lists_saved?: number[];
}

export interface Brand {
  id: number;
  name: string;
  logo: string | null;
}

export interface Agency {
  id: number;
  name: string;
  logo: string | null;
}

export interface Location {
  country: string;
  region: string;
}

export interface Media {
  id: number;
  url: string;
  type: string;
  description?: string;
  views: number;
}
