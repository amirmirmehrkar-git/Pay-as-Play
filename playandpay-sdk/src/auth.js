/**
 * Play and Pay SDK - Authentication Module
 * Handles JWT tokens and API key management
 */

import { logger } from './utils.js';
import { getConfig } from './config.js';

let apiKey = null;
let jwtToken = null;
let tokenExpiry = null;

/**
 * Set API key
 * @param {string} key - API key
 */
export function setApiKey(key) {
  apiKey = key;
  logger.debug('API key set');
}

/**
 * Get API key
 * @returns {string|null}
 */
export function getApiKey() {
  if (!apiKey) {
    const config = getConfig();
    apiKey = config.apiKey || null;
  }
  return apiKey;
}

/**
 * Set JWT token
 * @param {string} token - JWT token
 * @param {number} expiresIn - Expiration time in seconds
 */
export function setJWTToken(token, expiresIn = 3600) {
  jwtToken = token;
  tokenExpiry = Date.now() + (expiresIn * 1000);
  logger.debug('JWT token set, expires at:', new Date(tokenExpiry));
}

/**
 * Get JWT token
 * @returns {string|null}
 */
export function getJWTToken() {
  // Check if token is expired
  if (jwtToken && tokenExpiry && Date.now() >= tokenExpiry) {
    logger.warn('JWT token expired');
    jwtToken = null;
    tokenExpiry = null;
  }
  return jwtToken;
}

/**
 * Check if JWT token is valid
 * @returns {boolean}
 */
export function isTokenValid() {
  const token = getJWTToken();
  return token !== null && tokenExpiry !== null && Date.now() < tokenExpiry;
}

/**
 * Clear authentication (logout)
 */
export function clearAuth() {
  apiKey = null;
  jwtToken = null;
  tokenExpiry = null;
  logger.debug('Authentication cleared');
}

/**
 * Get authorization header value
 * @returns {string|null}
 */
export function getAuthHeader() {
  const token = getJWTToken();
  if (token) {
    return `Bearer ${token}`;
  }
  
  const key = getApiKey();
  if (key) {
    return `ApiKey ${key}`;
  }
  
  return null;
}

/**
 * Get headers for API requests
 * @param {Object} additionalHeaders - Additional headers to include
 * @returns {Object}
 */
export function getHeaders(additionalHeaders = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...additionalHeaders
  };
  
  const authHeader = getAuthHeader();
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }
  
  return headers;
}

/**
 * Authenticate with API
 * @param {string} userId - User ID
 * @param {string} password - Password (or API key)
 * @returns {Promise<Object>} Auth response with token
 */
export async function authenticate(userId, password) {
  try {
    const config = getConfig();
    const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, password })
    });
    
    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.token) {
      setJWTToken(data.token, data.expiresIn || 3600);
    }
    
    return data;
  } catch (error) {
    logger.error('Authentication error:', error);
    throw error;
  }
}

export default {
  setApiKey,
  getApiKey,
  setJWTToken,
  getJWTToken,
  isTokenValid,
  clearAuth,
  getAuthHeader,
  getHeaders,
  authenticate
};

