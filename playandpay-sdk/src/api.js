/**
 * Play and Pay SDK - API Wrapper Module
 * Backend API wrapper for session management and wallet operations
 */

import { getConfig, isDemoMode } from './config.js';
import { getHeaders } from './auth.js';
import { logger, generateId } from './utils.js';

/**
 * Start a session via API
 * @param {Object} params - Session parameters
 * @param {string} params.userId - User ID
 * @param {string} params.contentId - Content ID
 * @param {number} params.pricePerMinute - Price per minute
 * @returns {Promise<Object>} Session response
 */
export async function startSession(params) {
  if (isDemoMode()) {
    logger.debug('Demo mode: returning mock session');
    return {
      sessionId: generateId('session'),
      playbackToken: generateId('token'),
      startedAt: new Date().toISOString()
    };
  }
  
  try {
    const config = getConfig();
    const response = await fetch(`${config.apiBaseUrl}/session/start`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(params)
    });
    
    if (!response.ok) {
      throw new Error(`Session start failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    logger.error('Error starting session:', error);
    throw error;
  }
}

/**
 * Send tick via API
 * @param {Object} params - Tick parameters
 * @param {string} params.sessionId - Session ID
 * @param {number} params.playedMs - Played time in milliseconds
 * @param {string} params.tickId - Unique tick ID
 * @returns {Promise<Object>} Tick response
 */
export async function sendTick(params) {
  if (isDemoMode()) {
    logger.debug('Demo mode: returning mock tick');
    return {
      success: true,
      charged: 0.02,
      remainingBalance: 4.98,
      txId: `DEMO-TX-${Date.now()}`
    };
  }
  
  try {
    const config = getConfig();
    const response = await fetch(`${config.apiBaseUrl}/session/tick`, {
      method: 'POST',
      headers: getHeaders({
        'X-Idempotency-Key': params.tickId || generateId('tick')
      }),
      body: JSON.stringify(params)
    });
    
    if (!response.ok) {
      throw new Error(`Tick failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    logger.error('Error sending tick:', error);
    throw error;
  }
}

/**
 * Stop session via API
 * @param {string} sessionId - Session ID
 * @returns {Promise<Object>} Session summary
 */
export async function stopSession(sessionId) {
  if (isDemoMode()) {
    logger.debug('Demo mode: returning mock session stop');
    return {
      sessionId,
      totalCharged: 0.30,
      duration: 15 * 60 * 1000
    };
  }
  
  try {
    const config = getConfig();
    const response = await fetch(`${config.apiBaseUrl}/session/stop`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ sessionId })
    });
    
    if (!response.ok) {
      throw new Error(`Session stop failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    logger.error('Error stopping session:', error);
    throw error;
  }
}

/**
 * Get wallet balance via API
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Balance response
 */
export async function getWalletBalance(userId) {
  if (isDemoMode()) {
    logger.debug('Demo mode: returning mock balance');
    return {
      userId,
      balance: 500.00,
      balanceMinor: 50000,
      currency: 'PLY'
    };
  }
  
  try {
    const config = getConfig();
    const response = await fetch(`${config.apiBaseUrl}/wallet/balance/${userId}`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Balance request failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    logger.error('Error getting wallet balance:', error);
    throw error;
  }
}

/**
 * Top up wallet via API
 * @param {Object} params - Top-up parameters
 * @param {string} params.userId - User ID
 * @param {number} params.amount - Amount in EUR
 * @param {string} params.paymentMethod - Payment method (e.g., 'card', 'paypal')
 * @returns {Promise<Object>} Top-up response
 */
export async function topUpWallet(params) {
  if (isDemoMode()) {
    logger.debug('Demo mode: returning mock top-up');
    return {
      success: true,
      txId: `DEMO-TOPUP-${Date.now()}`,
      amount: params.amount,
      newBalance: 500.00 + params.amount
    };
  }
  
  try {
    const config = getConfig();
    const response = await fetch(`${config.apiBaseUrl}/wallet/topup`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(params)
    });
    
    if (!response.ok) {
      throw new Error(`Top-up failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    logger.error('Error topping up wallet:', error);
    throw error;
  }
}

export default {
  startSession,
  sendTick,
  stopSession,
  getWalletBalance,
  topUpWallet
};

