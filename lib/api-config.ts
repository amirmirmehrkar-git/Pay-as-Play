/**
 * API Configuration - Environment-based configuration
 */

export interface ApiConfig {
  baseUrl: string;
  apiVersion: string;
  timeout: number;
  retries: number;
  useMock: boolean;
  enableLogging: boolean;
}

/**
 * Get API configuration from environment variables
 */
export function getApiConfig(): ApiConfig {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
  const apiVersion = process.env.NEXT_PUBLIC_API_VERSION || 'v1';
  const timeout = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10);
  const retries = parseInt(process.env.NEXT_PUBLIC_API_RETRIES || '2', 10);
  const useMock =
    process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' || !process.env.NEXT_PUBLIC_API_BASE_URL;
  const enableLogging = process.env.NEXT_PUBLIC_API_LOGGING === 'true';

  return {
    baseUrl,
    apiVersion,
    timeout,
    retries,
    useMock,
    enableLogging,
  };
}

/**
 * Check if running in mock mode
 */
export function isMockMode(): boolean {
  return getApiConfig().useMock;
}

/**
 * Check if running in development mode
 */
export function isDevelopmentMode(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if running in production mode
 */
export function isProductionMode(): boolean {
  return process.env.NODE_ENV === 'production';
}

