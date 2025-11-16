/**
 * Play and Pay SDK - Main Entry Point
 * 
 * @module @playandpay/sdk
 * @version 1.0.0
 */

import { initConfig, getConfig } from './config.js';
import * as wallet from './wallet.js';
import * as billing from './billing.js';
import * as analytics from './analytics.js';
import * as api from './api.js';
import * as auth from './auth.js';
import * as utils from './utils.js';
import * as walletConnect from './wallet-connect.js';

/**
 * Initialize SDK
 * @param {Object} config - Configuration object
 * @param {string} config.apiKey - API key (optional)
 * @param {string} config.apiBaseUrl - API base URL (optional)
 * @param {string} config.network - Network ('testnet' | 'mainnet', default: 'testnet')
 * @param {number} config.asaId - PlayCoin ASA ID (optional)
 * @param {string} config.providerAddr - Provider address (optional)
 * @param {string} config.platformAddr - Platform address (optional)
 * @param {number} config.appId - Smart Contract App ID (optional)
 * @returns {Object} SDK instance
 */
export function init(config = {}) {
  // Initialize configuration
  const finalConfig = initConfig(config);
  
  // Set API key if provided
  if (config.apiKey) {
    auth.setApiKey(config.apiKey);
  }
  
  return {
    config: finalConfig,
    wallet,
    billing,
    analytics,
    api,
    auth,
    utils
  };
}

/**
 * Quick start: Initialize wallet
 * @param {Object} config - Configuration
 * @returns {Promise<Object>} Wallet balance
 */
export async function initWallet(config = {}) {
  const sdk = init(config);
  // This is a placeholder - in real usage, user would connect their wallet
  return sdk.wallet;
}

/**
 * Quick start: Start billing
 * @param {Object} params - Billing parameters
 * @param {string} params.contentId - Content ID
 * @param {number} params.pricePerMinute - Price per minute
 * @returns {Promise<Object>} Session
 */
export async function startBilling(params) {
  const sdk = init();
  return await sdk.billing.startSession(params);
}

/**
 * Quick start: Get analytics
 * @param {Object} params - Analytics parameters
 * @returns {Promise<Object>} Analytics data
 */
export async function getAnalytics(params) {
  const sdk = init();
  return await sdk.analytics.getUserAnalytics(params);
}

// Export all modules
export {
  wallet,
  billing,
  analytics,
  api,
  auth,
  utils,
  walletConnect,
  initConfig,
  getConfig
};

// Default export
export default {
  init,
  initWallet,
  startBilling,
  getAnalytics,
  wallet,
  billing,
  analytics,
  api,
  auth,
  utils,
  walletConnect
};

