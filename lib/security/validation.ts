/**
 * Input Validation Utilities
 * Validate and sanitize user input
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate email
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];

  if (!email) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
    }
    if (email.length > 255) {
      errors.push('Email must be less than 255 characters');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate password
 */
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];

  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
    if (password.length > 128) {
      errors.push('Password must be less than 128 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove null bytes
  let sanitized = input.replace(/\0/g, '');

  // Trim whitespace
  sanitized = sanitized.trim();

  // Limit length (prevent DoS)
  const maxLength = 10000;
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Sanitize number input
 */
export function sanitizeNumber(input: unknown): number | null {
  if (typeof input === 'number') {
    return isNaN(input) ? null : input;
  }

  if (typeof input === 'string') {
    const num = parseFloat(input);
    return isNaN(num) ? null : num;
  }

  return null;
}

/**
 * Validate amount (for payments)
 */
export function validateAmount(amount: number | string): ValidationResult {
  const errors: string[] = [];
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    errors.push('Amount must be a valid number');
  } else {
    if (numAmount <= 0) {
      errors.push('Amount must be greater than 0');
    }
    if (numAmount > 1000000) {
      errors.push('Amount must be less than 1,000,000');
    }
    // Check decimal places
    const decimalPlaces = (numAmount.toString().split('.')[1] || '').length;
    if (decimalPlaces > 2) {
      errors.push('Amount must have at most 2 decimal places');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate UUID
 */
export function validateUUID(uuid: string): ValidationResult {
  const errors: string[] = [];
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!uuid) {
    errors.push('UUID is required');
  } else if (!uuidRegex.test(uuid)) {
    errors.push('Invalid UUID format');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate and sanitize object
 */
export function validateAndSanitize<T extends Record<string, unknown>>(
  data: T,
  schema: Record<keyof T, (value: unknown) => ValidationResult>,
): { valid: boolean; data: T; errors: Record<string, string[]> } {
  const errors: Record<string, string[]> = {};
  const sanitized = { ...data };

  for (const [key, validator] of Object.entries(schema)) {
    const result = validator(data[key]);
    if (!result.valid) {
      errors[key] = result.errors;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    data: sanitized,
    errors,
  };
}

