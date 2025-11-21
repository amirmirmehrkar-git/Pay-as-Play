/**
 * API Client - Centralized API request handler
 * Supports both mock and real backend APIs
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  retries?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface ApiError extends Error {
  code: string;
  status?: number;
  details?: unknown;
}

/**
 * API Client Configuration
 */
export interface ApiClientConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  apiVersion?: string;
  useMock?: boolean;
}

/**
 * Default API Client Configuration
 */
const defaultConfig: ApiClientConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 30000, // 30 seconds
  retries: 2,
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
  useMock: process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' || !process.env.NEXT_PUBLIC_API_BASE_URL,
};

/**
 * Get authentication token from storage
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

/**
 * Get refresh token from storage
 */
function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refresh_token');
}

/**
 * Store authentication tokens
 */
function setAuthTokens(accessToken: string, refreshToken?: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', accessToken);
  if (refreshToken) {
    localStorage.setItem('refresh_token', refreshToken);
  }
}

/**
 * Clear authentication tokens
 */
function clearAuthTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
}

/**
 * Refresh authentication token
 */
async function refreshAuthToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${defaultConfig.baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      clearAuthTokens();
      return null;
    }

    const data = await response.json();
    if (data.success && data.data?.accessToken) {
      setAuthTokens(data.data.accessToken, data.data.refreshToken);
      return data.data.accessToken;
    }

    return null;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    clearAuthTokens();
    return null;
  }
}

/**
 * Create standardized error object
 */
function createApiError(
  message: string,
  code: string = 'API_ERROR',
  status?: number,
  details?: unknown,
): ApiError {
  const error = new Error(message) as ApiError;
  error.code = code;
  error.status = status;
  error.details = details;
  return error;
}

/**
 * Build query string from params
 */
function buildQueryString(params: Record<string, string | number | boolean>): string {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    queryParams.append(key, String(value));
  });
  return queryParams.toString();
}

/**
 * Make API request with retry logic
 */
async function makeRequest<T>(
  url: string,
  config: ApiRequestConfig,
  attempt: number = 0,
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    headers = {},
    body,
    params,
    timeout = defaultConfig.timeout,
    retries = defaultConfig.retries,
  } = config;

  // Build full URL
  let fullUrl = url;
  if (params && Object.keys(params).length > 0) {
    const queryString = buildQueryString(params);
    fullUrl += `?${queryString}`;
  }

  // Add authentication token
  const authToken = getAuthToken();
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  // Add default headers
  if (!headers['Content-Type'] && body) {
    headers['Content-Type'] = 'application/json';
  }

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(fullUrl, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle 401 Unauthorized - try to refresh token
    if (response.status === 401 && attempt === 0) {
      const newToken = await refreshAuthToken();
      if (newToken) {
        // Retry with new token
        return makeRequest<T>(url, config, attempt + 1);
      } else {
        // Refresh failed - clear tokens and redirect to login
        clearAuthTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/signin';
        }
        throw createApiError('Authentication failed', 'AUTH_ERROR', 401);
      }
    }

    // Parse response
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorCode = data.error?.code || `HTTP_${response.status}`;
      const errorMessage = data.error?.message || response.statusText || 'Request failed';
      throw createApiError(errorMessage, errorCode, response.status, data.error?.details);
    }

    return data as ApiResponse<T>;
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle network errors
    if (error instanceof Error && error.name === 'AbortError') {
      throw createApiError('Request timeout', 'TIMEOUT_ERROR', 408);
    }

    if (error instanceof Error && error.message.includes('fetch')) {
      throw createApiError('Network error', 'NETWORK_ERROR', 0, error.message);
    }

    // Retry logic for certain errors
    if (attempt < retries && error instanceof Error && !error.code?.startsWith('AUTH_')) {
      // Wait before retry (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      return makeRequest<T>(url, config, attempt + 1);
    }

    // Re-throw if it's already an ApiError
    if (error instanceof Error && 'code' in error) {
      throw error;
    }

    // Wrap unknown errors
    throw createApiError(
      error instanceof Error ? error.message : 'Unknown error',
      'UNKNOWN_ERROR',
    );
  }
}

/**
 * API Client Class
 */
export class ApiClient {
  private config: ApiClientConfig;

  constructor(config?: Partial<ApiClientConfig>) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: Omit<ApiRequestConfig, 'method' | 'body'>): Promise<T> {
    const response = await makeRequest<T>(url, { ...config, method: 'GET' });
    if (!response.success || !response.data) {
      throw createApiError(
        response.error?.message || 'Request failed',
        response.error?.code || 'API_ERROR',
      );
    }
    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(url: string, body?: unknown, config?: Omit<ApiRequestConfig, 'method'>): Promise<T> {
    const response = await makeRequest<T>(url, { ...config, method: 'POST', body });
    if (!response.success || !response.data) {
      throw createApiError(
        response.error?.message || 'Request failed',
        response.error?.code || 'API_ERROR',
      );
    }
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(url: string, body?: unknown, config?: Omit<ApiRequestConfig, 'method'>): Promise<T> {
    const response = await makeRequest<T>(url, { ...config, method: 'PUT', body });
    if (!response.success || !response.data) {
      throw createApiError(
        response.error?.message || 'Request failed',
        response.error?.code || 'API_ERROR',
      );
    }
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, body?: unknown, config?: Omit<ApiRequestConfig, 'method'>): Promise<T> {
    const response = await makeRequest<T>(url, { ...config, method: 'PATCH', body });
    if (!response.success || !response.data) {
      throw createApiError(
        response.error?.message || 'Request failed',
        response.error?.code || 'API_ERROR',
      );
    }
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: Omit<ApiRequestConfig, 'method' | 'body'>): Promise<T> {
    const response = await makeRequest<T>(url, { ...config, method: 'DELETE' });
    if (!response.success || !response.data) {
      throw createApiError(
        response.error?.message || 'Request failed',
        response.error?.code || 'API_ERROR',
      );
    }
    return response.data;
  }

  /**
   * Raw request (returns full response)
   */
  async request<T>(url: string, config: ApiRequestConfig): Promise<ApiResponse<T>> {
    return makeRequest<T>(url, config);
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string, refreshToken?: string): void {
    setAuthTokens(token, refreshToken);
  }

  /**
   * Clear authentication tokens
   */
  clearAuth(): void {
    clearAuthTokens();
  }

  /**
   * Check if using mock API
   */
  isMockMode(): boolean {
    return this.config.useMock ?? false;
  }
}

/**
 * Default API Client instance
 */
export const apiClient = new ApiClient();

/**
 * Helper function to get full API URL
 */
export function getApiUrl(endpoint: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
  const version = process.env.NEXT_PUBLIC_API_VERSION || 'v1';
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' || !process.env.NEXT_PUBLIC_API_BASE_URL;

  if (useMock || baseUrl.startsWith('/')) {
    // Use relative URL for mock APIs
    return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  }

  // Use absolute URL for real APIs
  return `${baseUrl}/${version}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}

