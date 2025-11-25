import { API_ENDPOINTS } from '@/config/api.config';
import ApiService from './api.service';

/**
 * Wallet Service
 * Handles all wallet-related API calls
 */

export interface WalletBalance {
  accountNumber: string;
  balance: string;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: string;
  balanceBefore: string;
  balanceAfter: string;
  description: string;
  reference: string;
  createdAt: string;
  metadata?: any;
}

export interface TransactionHistory {
  transactions: Transaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DebitRequest {
  amount: number;
  description?: string;
  metadata?: any;
}

export interface DebitResponse {
  message: string;
  transaction: Transaction;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  wallet: {
    accountNumber: string;
    balance: string;
  };
}

export const WalletService = {
  /**
   * Get wallet balance
   */
  async getBalance(): Promise<WalletBalance> {
    try {
      const response = await ApiService.get<WalletBalance>(
        API_ENDPOINTS.WALLET_BALANCE
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  /**
   * Make a payment (debit wallet)
   */
  async makePayment(data: DebitRequest): Promise<DebitResponse> {
    try {
      const response = await ApiService.post<DebitResponse>(
        API_ENDPOINTS.WALLET_DEBIT,
        data
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  /**
   * Get transaction history
   */
  async getTransactions(
    page: number = 1,
    limit: number = 20,
    type?: 'CREDIT' | 'DEBIT'
  ): Promise<TransactionHistory> {
    try {
      const params: any = { page, limit };
      if (type) params.type = type;

      const response = await ApiService.get<TransactionHistory>(
        API_ENDPOINTS.WALLET_TRANSACTIONS,
        { params }
      );
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  /**
   * Get user profile
   */
  async getProfile(): Promise<UserProfile> {
    try {
      const response = await ApiService.get<UserProfile>(API_ENDPOINTS.PROFILE);
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(data: {
    name?: string;
    email?: string;
  }): Promise<{ message: string; user: UserProfile }> {
    try {
      const response = await ApiService.put(API_ENDPOINTS.PROFILE, data);
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
      const message = error.response.data?.error || 'An error occurred';
      return new Error(message);
    } else if (error.request) {
      return new Error('Network error. Please check your connection.');
    } else {
      return new Error(error.message || 'An unexpected error occurred');
    }
  },
};
