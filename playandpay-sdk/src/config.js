/**
 * Play and Pay SDK - Configuration Module
 * Handles API base URL, network settings, and environment configuration
 */

let config = null;

/**
 * Default configuration
 */
const DEFAULT_CONFIG = {
  apiBaseUrl: 'http://localhost:8080',
  network: 'testnet', // 'testnet' | 'mainnet'
  algodUrl: 'https://testnet-api.algonode.cloud',
  algodToken: '',
  algodPort: '',
  indexerUrl: 'https://testnet-idx.algonode.cloud',
  indexerToken: '',
  indexerPort: '',
  asaId: null, // PlayCoin ASA ID
  currency: 'PLY',
  ratePerMinute: 0.02, // Default rate in EUR
  autoTopupThreshold: 1.00, // EUR
  appId: null, // Smart Contract App ID
  providerAddr: null,
  platformAddr: null,
  platformFeePct: 500, // 5% = 500 basis points
  demoMode: false
};

/**
 * Initialize configuration
 * @param {Object} userConfig - User-provided configuration
 * @returns {Object} Configuration object
 */
export function initConfig(userConfig = {}) {
  // Load from environment variables if available
  const envConfig = {
    apiBaseUrl: process.env.PLAYANDPAY_API_URL || DEFAULT_CONFIG.apiBaseUrl,
    network: process.env.PLAYANDPAY_NETWORK || DEFAULT_CONFIG.network,
    algodUrl: process.env.PLAYANDPAY_ALGOD_URL || DEFAULT_CONFIG.algodUrl,
    indexerUrl: process.env.PLAYANDPAY_INDEXER_URL || DEFAULT_CONFIG.indexerUrl,
    asaId: process.env.PLAYANDPAY_ASA_ID ? parseInt(process.env.PLAYANDPAY_ASA_ID) : null,
    appId: process.env.PLAYANDPAY_APP_ID ? parseInt(process.env.PLAYANDPAY_APP_ID) : null,
    providerAddr: process.env.PLAYANDPAY_PROVIDER_ADDR || null,
    platformAddr: process.env.PLAYANDPAY_PLATFORM_ADDR || null,
    apiKey: process.env.PLAYANDPAY_API_KEY || null
  };

  // Merge: userConfig > envConfig > DEFAULT_CONFIG
  config = {
    ...DEFAULT_CONFIG,
    ...envConfig,
    ...userConfig
  };

  // Set network-specific URLs if network changed
  if (config.network === 'mainnet') {
    config.algodUrl = config.algodUrl || 'https://mainnet-api.algonode.cloud';
    config.indexerUrl = config.indexerUrl || 'https://mainnet-idx.algonode.cloud';
  }

  // Enable demo mode if critical config is missing
  if (!config.asaId || !config.providerAddr) {
    config.demoMode = true;
  }

  return config;
}

/**
 * Get current configuration
 * @returns {Object} Configuration object
 */
export function getConfig() {
  if (!config) {
    console.warn('⚠️  Config not initialized. Using defaults.');
    return initConfig();
  }
  return config;
}

/**
 * Update configuration
 * @param {Object} updates - Configuration updates
 */
export function updateConfig(updates) {
  if (!config) {
    config = { ...DEFAULT_CONFIG };
  }
  config = { ...config, ...updates };
  return config;
}

/**
 * Check if demo mode is enabled
 * @returns {boolean}
 */
export function isDemoMode() {
  return getConfig().demoMode;
}

/**
 * Get API base URL
 * @returns {string}
 */
export function getApiBaseUrl() {
  return getConfig().apiBaseUrl;
}

/**
 * Get Algorand network configuration
 * @returns {Object}
 */
export function getAlgorandConfig() {
  const cfg = getConfig();
  return {
    algodUrl: cfg.algodUrl,
    algodToken: cfg.algodToken,
    algodPort: cfg.algodPort,
    indexerUrl: cfg.indexerUrl,
    indexerToken: cfg.indexerToken,
    indexerPort: cfg.indexerPort
  };
}

export default {
  initConfig,
  getConfig,
  updateConfig,
  isDemoMode,
  getApiBaseUrl,
  getAlgorandConfig
};

