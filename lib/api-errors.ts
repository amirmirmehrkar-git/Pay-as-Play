/**
 * API Error Utilities - Standardized error handling
 */

import { ApiError } from './api-client';

/**
 * Error codes enum
 */
export enum ApiErrorCode {
  // Network errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  
  // Authentication errors
  AUTH_ERROR = 'AUTH_ERROR',
  AUTH_REQUIRED = 'AUTH_REQUIRED',
  AUTH_EXPIRED = 'AUTH_EXPIRED',
  AUTH_INVALID = 'AUTH_INVALID',
  
  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  
  // Server errors
  SERVER_ERROR = 'SERVER_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  
  // Client errors
  NOT_FOUND = 'NOT_FOUND',
  FORBIDDEN = 'FORBIDDEN',
  CONFLICT = 'CONFLICT',
  
  // Unknown errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  if (error instanceof Error && 'code' in error) {
    const apiError = error as ApiError;
    
    switch (apiError.code) {
      case ApiErrorCode.NETWORK_ERROR:
        return 'Network connection failed. Please check your internet connection.';
      case ApiErrorCode.TIMEOUT_ERROR:
        return 'Request timed out. Please try again.';
      case ApiErrorCode.AUTH_ERROR:
      case ApiErrorCode.AUTH_REQUIRED:
      case ApiErrorCode.AUTH_EXPIRED:
        return 'Your session has expired. Please sign in again.';
      case ApiErrorCode.AUTH_INVALID:
        return 'Invalid credentials. Please check your email and password.';
      case ApiErrorCode.VALIDATION_ERROR:
      case ApiErrorCode.INVALID_INPUT:
        return apiError.message || 'Invalid input. Please check your data.';
      case ApiErrorCode.NOT_FOUND:
        return 'The requested resource was not found.';
      case ApiErrorCode.FORBIDDEN:
        return 'You do not have permission to perform this action.';
      case ApiErrorCode.CONFLICT:
        return 'This action conflicts with existing data.';
      case ApiErrorCode.SERVER_ERROR:
      case ApiErrorCode.INTERNAL_ERROR:
        return 'Server error occurred. Please try again later.';
      default:
        return apiError.message || 'An unexpected error occurred.';
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred.';
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error && 'code' in error) {
    const apiError = error as ApiError;
    return apiError.code === ApiErrorCode.NETWORK_ERROR || apiError.code === ApiErrorCode.TIMEOUT_ERROR;
  }
  return false;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (error instanceof Error && 'code' in error) {
    const apiError = error as ApiError;
    return (
      apiError.code === ApiErrorCode.AUTH_ERROR ||
      apiError.code === ApiErrorCode.AUTH_REQUIRED ||
      apiError.code === ApiErrorCode.AUTH_EXPIRED ||
      apiError.code === ApiErrorCode.AUTH_INVALID
    );
  }
  return false;
}

/**
 * Check if error is a validation error
 */
export function isValidationError(error: unknown): boolean {
  if (error instanceof Error && 'code' in error) {
    const apiError = error as ApiError;
    return apiError.code === ApiErrorCode.VALIDATION_ERROR || apiError.code === ApiErrorCode.INVALID_INPUT;
  }
  return false;
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: unknown): boolean {
  if (error instanceof Error && 'code' in error) {
    const apiError = error as ApiError;
    return (
      apiError.code === ApiErrorCode.NETWORK_ERROR ||
      apiError.code === ApiErrorCode.TIMEOUT_ERROR ||
      apiError.code === ApiErrorCode.SERVER_ERROR ||
      (apiError.status !== undefined && apiError.status >= 500)
    );
  }
  return false;
}

/**
 * Log error for debugging
 */
export function logApiError(error: unknown, context?: string): void {
  if (process.env.NEXT_PUBLIC_API_LOGGING === 'true' || process.env.NODE_ENV === 'development') {
    const prefix = context ? `[${context}]` : '[API Error]';
    console.error(prefix, error);
    
    if (error instanceof Error && 'code' in error) {
      const apiError = error as ApiError;
      console.error(`${prefix} Code:`, apiError.code);
      console.error(`${prefix} Status:`, apiError.status);
      console.error(`${prefix} Details:`, apiError.details);
    }
  }
}

