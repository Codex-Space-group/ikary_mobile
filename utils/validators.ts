/**
 * Validation utility functions
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  
  if (password.length > 100) {
    return { valid: false, message: 'Password is too long' };
  }
  
  return { valid: true };
};

/**
 * Validate amount
 */
export const isValidAmount = (amount: string | number): { valid: boolean; message?: string } => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(num)) {
    return { valid: false, message: 'Amount must be a valid number' };
  }
  
  if (num <= 0) {
    return { valid: false, message: 'Amount must be greater than 0' };
  }
  
  if (num > 1000000) {
    return { valid: false, message: 'Amount is too large' };
  }
  
  // Check for more than 2 decimal places
  const decimalPlaces = (num.toString().split('.')[1] || '').length;
  if (decimalPlaces > 2) {
    return { valid: false, message: 'Amount can have at most 2 decimal places' };
  }
  
  return { valid: true };
};

/**
 * Validate name
 */
export const isValidName = (name: string): { valid: boolean; message?: string } => {
  if (!name || name.trim().length === 0) {
    return { valid: false, message: 'Name is required' };
  }
  
  if (name.length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters' };
  }
  
  if (name.length > 100) {
    return { valid: false, message: 'Name is too long' };
  }
  
  return { valid: true };
};

/**
 * Validate phone number (basic)
 */
export const isValidPhone = (phone: string): { valid: boolean; message?: string } => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  
  if (!phoneRegex.test(phone)) {
    return { valid: false, message: 'Invalid phone number format' };
  }
  
  return { valid: true };
};

/**
 * Check if passwords match
 */
export const doPasswordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

/**
 * Sanitize input (remove potentially harmful characters)
 */
export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '');
};
