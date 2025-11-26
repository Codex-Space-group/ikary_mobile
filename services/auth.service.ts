import { API_ENDPOINTS } from '@/config/api.config';
import ApiService from './api.service';
import { StorageService } from './storage.service';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    wallet: {
      accountNumber: string;
      balance: string;
    };
  };
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}

export const AuthService = {
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await ApiService.post<RegisterResponse>(
        API_ENDPOINTS.REGISTER,
        data
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  /**
   * Login user
   */
  async login(data: LoginData): Promise<LoginResponse> {
    try {
      const response = await ApiService.post<LoginResponse>(
        API_ENDPOINTS.LOGIN,
        data
      );

      // Save tokens and user data
      await StorageService.saveTokens(
        response.accessToken,
        response.refreshToken
      );
      await StorageService.saveUserData(response.user);

      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await ApiService.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call result
      await StorageService.clearAll();
      ApiService.clearAuthToken();
    }
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<{ message: string; resetToken: string }> {
    try {
      const response = await ApiService.post(
        API_ENDPOINTS.PASSWORD_RESET_REQUEST,
        { email }
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  /**
   * Confirm password reset
   */
  async confirmPasswordReset(
    resetToken: string,
    newPassword: string
  ): Promise<{ message: string }> {
    try {
      const response = await ApiService.post(
        API_ENDPOINTS.PASSWORD_RESET_CONFIRM,
        { resetToken, newPassword }
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await StorageService.getAccessToken();
    return !!token;
  },

  /**
   * Get stored user data
   */
  async getStoredUser(): Promise<any> {
    return await StorageService.getUserData();
  },

  /**
   * Update user profile
   */
  async updateProfile(data: { name?: string; email?: string }): Promise<{ message: string; user: any }> {
    try {
      const response = await ApiService.put(
        API_ENDPOINTS.PROFILE,
        data
      );
      
      // Update stored user data
      if (response.user) {
        await StorageService.saveUserData(response.user);
      }
      
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  /**
   * Change user password
   */
  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
    try {
      const response = await ApiService.put(
        API_ENDPOINTS.CHANGE_PASSWORD,
        data
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  /**
   * Handle API errors
   */
  handleError(error: any): Error {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.error || 'An error occurred';
      return new Error(message);
    } else if (error.request) {
      // Request made but no response
      return new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      return new Error(error.message || 'An unexpected error occurred');
    }
  },
};
