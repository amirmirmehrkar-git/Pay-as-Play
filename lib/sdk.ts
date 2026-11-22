/**
 * Lazy Play-and-Pay SDK adapter.
 *
 * The installed JavaScript SDK does not yet expose a coherent public TypeScript
 * contract. Validate exports and methods at runtime instead of relying on
 * unchecked assertions. A typed SDK migration remains a separate release task.
 */
let sdk: unknown = null;

async function loadSDK(): Promise<unknown> {
  if (sdk === null) {
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

function moduleExport(target: unknown, name: string) {
  if (target === null || (typeof target !== 'object' && typeof target !== 'function')) {
    throw new TypeError('SDK module is unavailable');
  }
  const value = Reflect.get(target, name);
  if (value === undefined || value === null) {
    throw new TypeError(`SDK export ${name} is unavailable`);
  }
  return value;
}

export async function initSDK(config?: SDKConfig): Promise<boolean> {
  try {
    const module = await loadSDK();
    const init: unknown = moduleExport(module, 'init');
    if (typeof init !== 'function') throw new TypeError('SDK init is not a function');

    const initConfig: SDKConfig = {
      network: config?.network ?? 'testnet',
    };
    if (config?.apiUrl) initConfig.apiUrl = config.apiUrl;
    if (config?.apiKey) initConfig.apiKey = config.apiKey;
    if (config?.providerAddr) initConfig.providerAddr = config.providerAddr;
    if (config?.platformAddr) initConfig.platformAddr = config.platformAddr;
    if (config?.platformFeePct !== undefined) initConfig.platformFeePct = config.platformFeePct;
    if (config?.asaId !== undefined) initConfig.asaId = config.asaId;
    if (config?.appId !== undefined) initConfig.appId = config.appId;
    await Reflect.apply(init, module, [initConfig]);
    return true;
  } catch (error) {
    console.error('SDK initialization error:', error);
    return false;
  }
}

// Reflect.get retains the legacy JavaScript module's dynamic callable surface.
// Runtime validation occurs in the lazy proxy immediately before each call.
export async function getWallet() {
  return moduleExport(await loadSDK(), 'wallet');
}
export async function getBilling() {
  return moduleExport(await loadSDK(), 'billing');
}
export async function getAnalytics() {
  return moduleExport(await loadSDK(), 'analytics');
}
export async function getWalletConnect() {
  return moduleExport(await loadSDK(), 'walletConnect');
}

function lazyProxy(loader: () => Promise<unknown>) {
  return new Proxy({}, {
    get: (_target, prop) => async (...args: unknown[]) => {
      const module = await loader();
      if (module === null || (typeof module !== 'object' && typeof module !== 'function')) {
        throw new TypeError('SDK service is unavailable');
      }
      const method: unknown = Reflect.get(module, prop);
      if (typeof method !== 'function') {
        throw new TypeError(`SDK method ${String(prop)} is unavailable`);
      }
      return Reflect.apply(method, module, args);
    },
  });
}

export const wallet = lazyProxy(getWallet);
export const billing = lazyProxy(getBilling);
export const analytics = lazyProxy(getAnalytics);
export const walletConnect = lazyProxy(getWalletConnect);

export default loadSDK;
