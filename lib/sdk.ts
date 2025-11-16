/**
 * Play and Pay SDK Integration
 * Frontend wrapper for the SDK
 */

// Import SDK modules
// Using dynamic import for ES modules compatibility
let sdk: any = null;

async function loadSDK() {
  if (!sdk) {
    sdk = await import('../playandpay-sdk/src/index.js');
  }
  return sdk;
}

export interface SDKConfig {
  network?: 'testnet' | 'mainnet';
  apiUrl?: string;
  apiKey?: string;
  providerAddr?: string;
  platformAddr?: string;
  platformFeePct?: number;
  asaId?: number;
  appId?: number;
}

/**
 * Initialize SDK
 */
export async function initSDK(config?: SDKConfig) {
  try {
    const sdkModule = await loadSDK();
    const initConfig: any = {
      network: config?.network || 'testnet',
    };
    
    if (config?.apiUrl) initConfig.apiUrl = config.apiUrl;
    if (config?.apiKey) initConfig.apiKey = config.apiKey;
    if (config?.providerAddr) initConfig.providerAddr = config.providerAddr;
    if (config?.platformAddr) initConfig.platformAddr = config.platformAddr;
    if (config?.platformFeePct) initConfig.platformFeePct = config.platformFeePct;
    if (config?.asaId) initConfig.asaId = config.asaId;
    if (config?.appId) initConfig.appId = config.appId;
    
    await sdkModule.init(initConfig);
    return true;
  } catch (error) {
    console.error('SDK initialization error:', error);
    return false;
  }
}

/**
 * Get SDK modules (lazy loaded)
 */
export async function getWallet() {
  const sdkModule = await loadSDK();
  return sdkModule.wallet;
}

export async function getBilling() {
  const sdkModule = await loadSDK();
  return sdkModule.billing;
}

export async function getAnalytics() {
  const sdkModule = await loadSDK();
  return sdkModule.analytics;
}

export async function getWalletConnect() {
  const sdkModule = await loadSDK();
  return sdkModule.walletConnect;
}

// For backward compatibility, export as getters
export const wallet = new Proxy({} as any, {
  get: (target, prop) => {
    return async (...args: any[]) => {
      const w = await getWallet();
      return (w as any)[prop](...args);
    };
  },
});

export const billing = new Proxy({} as any, {
  get: (target, prop) => {
    return async (...args: any[]) => {
      const b = await getBilling();
      return (b as any)[prop](...args);
    };
  },
});

export const analytics = new Proxy({} as any, {
  get: (target, prop) => {
    return async (...args: any[]) => {
      const a = await getAnalytics();
      return (a as any)[prop](...args);
    };
  },
});

export const walletConnect = new Proxy({} as any, {
  get: (target, prop) => {
    return async (...args: any[]) => {
      const wc = await getWalletConnect();
      return (wc as any)[prop](...args);
    };
  },
});

export default loadSDK;

