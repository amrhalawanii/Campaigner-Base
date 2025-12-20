export interface User {
  id: number;
  full_name: string;
  email: string;
  user_name: string;
  signin_method: 'email' | 'google' | 'facebook';
  subscription_type: 'free' | 'premium' | 'enterprise';
  account_type: 'basic' | 'pro' | 'business';
  fcm_token?: string;
  gender?: 'male' | 'female' | 'other';
  last_login_at?: string;
  status?: number;
  created_at: string;
  updated_at?: string;
}

export interface SignupData {
  email: string;
  password: string;
  signin_method: 'email' | 'google' | 'facebook';
  full_name?: string;
  user_name?: string;
  subscription_type?: 'free' | 'premium' | 'enterprise';
  account_type?: 'basic' | 'pro' | 'business';
  fcm_token?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface LoginCredentials {
  email?: string;
  user_name?: string;
  password: string;
  signin_method: 'email' | 'google' | 'facebook';
}

export interface UpdateUserData {
  user_id: number;
  full_name?: string;
  email?: string;
  user_name?: string;
  password?: string;
  subscription_type?: string;
  account_type?: string;
  fcm_token?: string;
  gender?: string;
}

export interface ResetPasswordData {
  user_id?: number;
  email?: string;
  old_password?: string;
  password: string;
  confirm_password: string;
}

