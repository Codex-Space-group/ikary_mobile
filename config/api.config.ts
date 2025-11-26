/**
 * API Configuration
 * Update BASE_URL to point to your backend server
 */

// Development - Make sure this matches your backend server
export const BASE_URL = 'http://192.168.10.169:3000/api';

// Production (uncomment and update when deploying)
// export const BASE_URL = 'https://your-production-api.com/api';

export const API_ENDPOINTS = {
  // Authentication
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  PASSWORD_RESET_REQUEST: '/auth/password-reset/request',
  PASSWORD_RESET_CONFIRM: '/auth/password-reset/confirm',
  
  // Wallet
  WALLET_BALANCE: '/wallet/balance',
  WALLET_DEBIT: '/wallet/debit',
  WALLET_TRANSACTIONS: '/wallet/transactions',
  
  // Profile
  PROFILE: '/wallet/profile',
  CHANGE_PASSWORD: '/wallet/change-password',
};

export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};
