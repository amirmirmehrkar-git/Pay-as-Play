/**
 * Secure Token Storage Utilities
 * Secure storage and retrieval of authentication tokens
 */

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_EXPIRY_KEY = 'auth_token_expiry';

/**
 * Store access token securely
 */
export function storeAccessToken(token: string, expiresIn: number): void {
  if (typeof window === 'undefined') return;

  try {
    // Calculate expiry timestamp
    const expiryTime = Date.now() + expiresIn * 1000;

    // Store token and expiry
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
  } catch (error) {
    console.error('Failed to store access token:', error);
  }
}

/**
 * Store refresh token securely
 */
export function storeRefreshToken(token: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to store refresh token:', error);
  }
}

/**
 * Get access token
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

    // Check if token is expired
    if (token && expiry) {
      const expiryTime = parseInt(expiry, 10);
      if (Date.now() >= expiryTime) {
        // Token expired, remove it
        clearTokens();
        return null;
      }
    }

    return token;
  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
}

/**
 * Get refresh token
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to get refresh token:', error);
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(): boolean {
  if (typeof window === 'undefined') return true;

  try {
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiry) return true;

    const expiryTime = parseInt(expiry, 10);
    return Date.now() >= expiryTime;
  } catch {
    return true;
  }
}

/**
 * Clear all tokens
 */
export function clearTokens(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  } catch (error) {
    console.error('Failed to clear tokens:', error);
  }
}

/**
 * Store token pair
 */
export function storeTokenPair(accessToken: string, refreshToken: string, expiresIn: number): void {
  storeAccessToken(accessToken, expiresIn);
  storeRefreshToken(refreshToken);
}

