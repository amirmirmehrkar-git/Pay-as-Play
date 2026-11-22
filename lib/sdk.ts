/**
 * Play and Pay SDK Integration
 * Frontend wrapper for the SDK
 */

// Import SDK modules
// Using dynamic import for ES modules compatibility
type SDKModule = typeof import('../playandpay-sdk/src/index.js');
let sdk: SDKModule | null = null;

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
    const initConfig: SDKConfig = {
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

// Lazy proxies maintain the legacy SDK surface without bypassing type safety.
function createModuleProxy<T extends object>(loader: () => Promise<T>): T {
  return new Proxy({} as T, {
    get: (_target, prop) => {
      return async (...args: unknown[]) => {
        const module = await loader();
        const method = Reflect.get(module, prop);
        if (typeof method !== 'function') {
          throw new TypeError(`SDK member ${String(prop)} is not callable`);
        }
        return Reflect.apply(method, module, args);
      };
    },
  });
}

export const wallet = createModuleProxy(getWallet);
export const billing = createModuleProxy(getBilling);
export const analytics = createModuleProxy(getAnalytics);
export const walletConnect = createModuleProxy(getWalletConnect);

export default loadSDK;

