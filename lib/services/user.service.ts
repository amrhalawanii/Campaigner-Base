
import { apiService } from './api.service';
import type { 
  User, 
  LoginRequest,
  SignupRequest,
  ResetPasswordRequest,
  SendVerificationCodeRequest,
  ApiResponse 
} from '../types/api.types';

export class UserService {
  async login(data: LoginRequest): Promise<ApiResponse<User>> {
    return apiService.post<User>('/login.php', data);
  }

  async signup(data: SignupRequest): Promise<ApiResponse<User>> {
    return apiService.post<User>('/signup.php', data);
  }

  async logout(userId: number): Promise<ApiResponse<null>> {
    return apiService.post<null>('/logout.php', { user_id: userId });
  }

  async getUserData(userId: number): Promise<ApiResponse<User>> {
    return apiService.get<User>('/get_user_data.php', { user_id: userId });
  }

  async sendVerificationCode(data: SendVerificationCodeRequest): Promise<ApiResponse<{ verification_code: string }>> {
    return apiService.post('/send_signup_verification_code.php', data);
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<null>> {
    return apiService.post<null>('/reset_password.php', data);
  }

  async updateUserData(userId: number, updates: Partial<User>): Promise<ApiResponse<null>> {
    return apiService.post<null>('/update_user_data.php', {
      user_id: userId,
      ...updates,
    });
  }

  async deleteAccount(userId: number, reason?: string): Promise<ApiResponse<null>> {
    return apiService.post<null>('/delete_user_account.php', {
      user_id: userId,
      reason,
    });
  }
}

export const userService = new UserService();

