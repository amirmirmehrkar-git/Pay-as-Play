(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/playandpay-sdk/src/config.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Play and Pay SDK - Configuration Module
 * Handles API base URL, network settings, and environment configuration
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getAlgorandConfig",
    ()=>getAlgorandConfig,
    "getApiBaseUrl",
    ()=>getApiBaseUrl,
    "getConfig",
    ()=>getConfig,
    "initConfig",
    ()=>initConfig,
    "isDemoMode",
    ()=>isDemoMode,
    "updateConfig",
    ()=>updateConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
let config = null;
/**
 * Default configuration
 */ const DEFAULT_CONFIG = {
    apiBaseUrl: 'http://localhost:8080',
    network: 'testnet',
    algodUrl: 'https://testnet-api.algonode.cloud',
    algodToken: '',
    algodPort: '',
    indexerUrl: 'https://testnet-idx.algonode.cloud',
    indexerToken: '',
    indexerPort: '',
    asaId: null,
    currency: 'PLY',
    ratePerMinute: 0.02,
    autoTopupThreshold: 1.00,
    appId: null,
    providerAddr: null,
    platformAddr: null,
    platformFeePct: 500,
    demoMode: false
};
function initConfig(userConfig = {}) {
    // Load from environment variables if available
    const envConfig = {
        apiBaseUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.PLAYANDPAY_API_URL || DEFAULT_CONFIG.apiBaseUrl,
        network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.PLAYANDPAY_NETWORK || DEFAULT_CONFIG.network,
        algodUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.PLAYANDPAY_ALGOD_URL || DEFAULT_CONFIG.algodUrl,
        indexerUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.PLAYANDPAY_INDEXER_URL || DEFAULT_CONFIG.indexerUrl,
        asaId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.PLAYANDPAY_ASA_ID ? parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.PLAYANDPAY_ASA_ID) : null,
        appId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.PLAYANDPAY_APP_ID ? parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.PLAYANDPAY_APP_ID) : null,
        providerAddr: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.PLAYANDPAY_PROVIDER_ADDR || null,
        platformAddr: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.PLAYANDPAY_PLATFORM_ADDR || null,
        apiKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.PLAYANDPAY_API_KEY || null
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
function getConfig() {
    if (!config) {
        console.warn('⚠️  Config not initialized. Using defaults.');
        return initConfig();
    }
    return config;
}
function updateConfig(updates) {
    if (!config) {
        config = {
            ...DEFAULT_CONFIG
        };
    }
    config = {
        ...config,
        ...updates
    };
    return config;
}
function isDemoMode() {
    return getConfig().demoMode;
}
function getApiBaseUrl() {
    return getConfig().apiBaseUrl;
}
function getAlgorandConfig() {
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
const __TURBOPACK__default__export__ = {
    initConfig,
    getConfig,
    updateConfig,
    isDemoMode,
    getApiBaseUrl,
    getAlgorandConfig
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/playandpay-sdk/src/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Play and Pay SDK - Utility Functions
 * Logger, formatters, and helper functions
 */ /**
 * Logger utility
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "eurToPLYMinor",
    ()=>eurToPLYMinor,
    "formatAmount",
    ()=>formatAmount,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDuration",
    ()=>formatDuration,
    "generateId",
    ()=>generateId,
    "generateTickId",
    ()=>generateTickId,
    "isValidAddress",
    ()=>isValidAddress,
    "isValidSessionId",
    ()=>isValidSessionId,
    "logger",
    ()=>logger,
    "minutesToMs",
    ()=>minutesToMs,
    "msToMinutes",
    ()=>msToMinutes,
    "plyMinorToEUR",
    ()=>plyMinorToEUR,
    "retry",
    ()=>retry,
    "sleep",
    ()=>sleep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const logger = {
    enabled: ("TURBOPACK compile-time value", "development") !== 'production',
    log (...args) {
        if (this.enabled) {
            console.log('[PlayAndPay]', ...args);
        }
    },
    error (...args) {
        console.error('[PlayAndPay] ERROR:', ...args);
    },
    warn (...args) {
        if (this.enabled) {
            console.warn('[PlayAndPay] WARN:', ...args);
        }
    },
    debug (...args) {
        if (this.enabled && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.DEBUG) {
            console.debug('[PlayAndPay] DEBUG:', ...args);
        }
    }
};
function formatAmount(minor, decimals = 2) {
    return minor / Math.pow(10, decimals);
}
function eurToPLYMinor(eur, rate = 0.01) {
    return Math.round(eur / rate);
}
function plyMinorToEUR(plyMinor, rate = 0.01) {
    return plyMinor * rate;
}
function minutesToMs(minutes) {
    return minutes * 60 * 1000;
}
function msToMinutes(ms) {
    return ms / (60 * 1000);
}
function generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
function generateTickId(sessionId, timestamp = Date.now()) {
    return `tick_${sessionId}_${timestamp}_${Math.random().toString(36).substr(2, 6)}`;
}
function formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
        return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
    } else {
        return `${seconds}s`;
    }
}
function formatCurrency(amount, currency = 'EUR') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}
function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
async function retry(fn, maxRetries = 3, delay = 1000) {
    for(let i = 0; i < maxRetries; i++){
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            logger.warn(`Retry ${i + 1}/${maxRetries} after error:`, error.message);
            await sleep(delay * (i + 1)); // Exponential backoff
        }
    }
}
function isValidAddress(address) {
    if (!address || typeof address !== 'string') return false;
    // Algorand addresses are 58 characters, base32 encoded
    return /^[A-Z2-7]{58}$/.test(address);
}
function isValidSessionId(sessionId) {
    if (!sessionId || typeof sessionId !== 'string') return false;
    return /^session_[a-zA-Z0-9_]+$/.test(sessionId);
}
const __TURBOPACK__default__export__ = {
    logger,
    formatAmount,
    eurToPLYMinor,
    plyMinorToEUR,
    minutesToMs,
    msToMinutes,
    generateId,
    generateTickId,
    formatDuration,
    formatCurrency,
    sleep,
    retry,
    isValidAddress,
    isValidSessionId
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/playandpay-sdk/src/wallet.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Play and Pay SDK - Wallet Module
 * Handles Algorand ASA wallet operations (balance, transfers)
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getBalance",
    ()=>getBalance,
    "getTransactionHistory",
    ()=>getTransactionHistory,
    "isOptedIn",
    ()=>isOptedIn,
    "transfer",
    ()=>transfer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/playandpay-sdk/node_modules/algosdk/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/utils.js [app-client] (ecmascript)");
;
;
;
let algodClient = null;
let indexerClient = null;
/**
 * Initialize Algorand clients
 */ function initClients() {
    if (algodClient && indexerClient) {
        return;
    }
    const algodConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlgorandConfig"])();
    algodClient = new __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].Algodv2(algodConfig.algodToken, algodConfig.algodUrl, algodConfig.algodPort);
    indexerClient = new __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].Indexer(algodConfig.indexerToken, algodConfig.indexerUrl, algodConfig.indexerPort);
    __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Algorand clients initialized');
}
async function getBalance(address) {
    if (!address || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidAddress"])(address)) {
        throw new Error('Invalid address');
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDemoMode"])()) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Demo mode: returning mock balance');
        return {
            address,
            balanceMinor: 50000,
            balance: 500.00,
            currency: (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().currency || 'PLY'
        };
    }
    try {
        initClients();
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        const asaId = config.asaId;
        if (!asaId) {
            throw new Error('ASA ID not configured');
        }
        const accountInfo = await indexerClient.lookupAccountByID(address).do();
        const asset = accountInfo.account.assets?.find((a)=>a['asset-id'] === asaId);
        const balanceMinor = asset ? asset.amount : 0;
        const balance = balanceMinor / 100; // Assuming 2 decimals
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug(`Balance for ${address}: ${balance} ${config.currency}`);
        return {
            address,
            balanceMinor,
            balance,
            currency: config.currency || 'PLY'
        };
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error getting balance:', error);
        throw error;
    }
}
async function transfer(fromAddress, toAddress, amountMinor, signer) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidAddress"])(fromAddress) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidAddress"])(toAddress)) {
        throw new Error('Invalid address');
    }
    if (amountMinor <= 0) {
        throw new Error('Amount must be positive');
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDemoMode"])()) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Demo mode: returning mock transaction');
        return {
            txId: `DEMO-TX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            amountMinor,
            fromAddress,
            toAddress,
            confirmed: false
        };
    }
    try {
        initClients();
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        const asaId = config.asaId;
        if (!asaId) {
            throw new Error('ASA ID not configured');
        }
        // Get transaction parameters
        const params = await algodClient.getTransactionParams().do();
        // Create asset transfer transaction
        const txn = __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: fromAddress,
            to: toAddress,
            amount: amountMinor,
            assetIndex: asaId,
            suggestedParams: params
        });
        // Sign transaction
        let signedTxn;
        if (typeof signer === 'string') {
            // Mnemonic
            const account = __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].mnemonicToSecretKey(signer);
            signedTxn = txn.signTxn(account.sk);
        } else if (signer && typeof signer.signTransaction === 'function') {
            // Wallet connector (e.g., Pera Wallet)
            signedTxn = await signer.signTransaction([
                txn
            ]);
        } else {
            throw new Error('Invalid signer. Provide mnemonic string or wallet connector.');
        }
        // Submit transaction
        const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug(`Transaction submitted: ${txId}`);
        // Wait for confirmation
        const confirmation = await __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$node_modules$2f$algosdk$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].waitForConfirmation(algodClient, txId, 4);
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug(`Transaction confirmed in round ${confirmation['confirmed-round']}`);
        return {
            txId,
            amountMinor,
            fromAddress,
            toAddress,
            confirmed: true,
            confirmedRound: confirmation['confirmed-round']
        };
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error transferring tokens:', error);
        throw error;
    }
}
async function isOptedIn(address) {
    if (!address || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidAddress"])(address)) {
        return false;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDemoMode"])()) {
        return true; // Assume opted in for demo
    }
    try {
        initClients();
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        const asaId = config.asaId;
        if (!asaId) {
            return false;
        }
        const accountInfo = await indexerClient.lookupAccountByID(address).do();
        return accountInfo.account.assets?.some((a)=>a['asset-id'] === asaId) || false;
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error checking opt-in:', error);
        return false;
    }
}
async function getTransactionHistory(address, limit = 50) {
    if (!address || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidAddress"])(address)) {
        throw new Error('Invalid address');
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDemoMode"])()) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Demo mode: returning mock transaction history');
        return [];
    }
    try {
        initClients();
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        const asaId = config.asaId;
        const transactions = await indexerClient.lookupAccountTransactions(address).assetID(asaId).limit(limit).do();
        return transactions.transactions || [];
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error getting transaction history:', error);
        throw error;
    }
}
const __TURBOPACK__default__export__ = {
    getBalance,
    transfer,
    isOptedIn,
    getTransactionHistory
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/playandpay-sdk/src/wallet-connect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Play and Pay SDK - WalletConnect Module
 * Handles Pera Wallet connection and user-side transaction signing
 */ __turbopack_context__.s([
    "connectWallet",
    ()=>connectWallet,
    "default",
    ()=>__TURBOPACK__default__export__,
    "disconnectWallet",
    ()=>disconnectWallet,
    "getConnectedAddress",
    ()=>getConnectedAddress,
    "getWalletConnector",
    ()=>getWalletConnector,
    "initPeraWallet",
    ()=>initPeraWallet,
    "isWalletConnected",
    ()=>isWalletConnected,
    "reconnectWallet",
    ()=>reconnectWallet,
    "signTransaction",
    ()=>signTransaction,
    "signTransactions",
    ()=>signTransactions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/utils.js [app-client] (ecmascript)");
;
;
let peraWallet = null;
let isConnected = false;
let connectedAddress = null;
async function initPeraWallet() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        // Dynamic import for browser only
        const { PeraWalletConnect } = await __turbopack_context__.A("[project]/playandpay-sdk/node_modules/@perawallet/connect/dist/index.js [app-client] (ecmascript, async loader)");
        peraWallet = new PeraWalletConnect({
            chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])().network === 'mainnet' ? 416002 : 416003,
            shouldShowSignTxnToast: true
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Pera Wallet initialized');
        return peraWallet;
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error initializing Pera Wallet:', error);
        return null;
    }
}
async function connectWallet() {
    if (!peraWallet) {
        peraWallet = await initPeraWallet();
    }
    if (!peraWallet) {
        throw new Error('Pera Wallet not available. Make sure @perawallet/connect is installed.');
    }
    try {
        const accounts = await peraWallet.connect();
        if (accounts && accounts.length > 0) {
            isConnected = true;
            connectedAddress = accounts[0];
            __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Wallet connected:', connectedAddress);
            return connectedAddress;
        } else {
            throw new Error('No accounts returned from wallet');
        }
    } catch (error) {
        if (error.data?.type !== 'CONNECT_MODAL_CLOSED') {
            __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error connecting wallet:', error);
        }
        throw error;
    }
}
async function disconnectWallet() {
    if (peraWallet) {
        try {
            await peraWallet.disconnect();
            isConnected = false;
            connectedAddress = null;
            __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Wallet disconnected');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error disconnecting wallet:', error);
        }
    }
}
function getConnectedAddress() {
    return connectedAddress;
}
function isWalletConnected() {
    return isConnected && connectedAddress !== null;
}
async function signTransactions(transactions) {
    if (!isConnected || !peraWallet) {
        throw new Error('Wallet not connected. Call connectWallet() first.');
    }
    try {
        // Pera Wallet expects array of transactions
        const signedTxns = await peraWallet.signTransaction(Array.isArray(transactions) ? transactions : [
            transactions
        ]);
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Transactions signed successfully');
        return Array.isArray(signedTxns) ? signedTxns : [
            signedTxns
        ];
    } catch (error) {
        if (error.data?.type !== 'SIGN_MODAL_CLOSED') {
            __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error signing transactions:', error);
        }
        throw error;
    }
}
async function signTransaction(transaction) {
    const signed = await signTransactions([
        transaction
    ]);
    return signed[0];
}
async function reconnectWallet() {
    if (!peraWallet) {
        peraWallet = await initPeraWallet();
    }
    if (peraWallet) {
        try {
            const accounts = await peraWallet.reconnectSession();
            if (accounts && accounts.length > 0) {
                isConnected = true;
                connectedAddress = accounts[0];
                __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Wallet reconnected:', connectedAddress);
                return connectedAddress;
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('No previous session to reconnect');
            return null;
        }
    }
    return null;
}
function getWalletConnector() {
    if (!isConnected) {
        throw new Error('Wallet not connected');
    }
    return {
        address: connectedAddress,
        signTransaction: async (txn)=>{
            return await signTransaction(txn);
        },
        signTransactions: async (txns)=>{
            return await signTransactions(txns);
        }
    };
}
const __TURBOPACK__default__export__ = {
    initPeraWallet,
    connectWallet,
    disconnectWallet,
    getConnectedAddress,
    isWalletConnected,
    signTransactions,
    signTransaction,
    reconnectWallet,
    getWalletConnector
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/playandpay-sdk/src/billing.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Play and Pay SDK - Billing Engine
 * Handles pay-as-you-use billing: sessions, ticks, payments
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getActiveSessions",
    ()=>getActiveSessions,
    "getSession",
    ()=>getSession,
    "getSessionHistory",
    ()=>getSessionHistory,
    "sendTick",
    ()=>sendTick,
    "startSession",
    ()=>startSession,
    "stopSession",
    ()=>stopSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/wallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2d$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/wallet-connect.js [app-client] (ecmascript)");
;
;
;
;
// Active sessions storage
const activeSessions = new Map();
async function startSession({ contentId, pricePerMinute, userAddress, metadata = {} }) {
    if (!contentId || !pricePerMinute || !userAddress) {
        throw new Error('Missing required parameters: contentId, pricePerMinute, userAddress');
    }
    if (pricePerMinute <= 0) {
        throw new Error('Price per minute must be positive');
    }
    // Use WalletConnect address if connected, otherwise use provided address
    let finalUserAddress = userAddress;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2d$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWalletConnected"])()) {
        const { getConnectedAddress } = await __turbopack_context__.A("[project]/playandpay-sdk/src/wallet-connect.js [app-client] (ecmascript, async loader)");
        const connectedAddr = getConnectedAddress();
        if (connectedAddr) {
            finalUserAddress = connectedAddr;
            __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Using WalletConnect address:', connectedAddr);
        }
    }
    const sessionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])('session');
    const session = {
        sessionId,
        contentId,
        pricePerMinute,
        userAddress: finalUserAddress,
        status: 'active',
        startTime: Date.now(),
        totalPlayedMs: 0,
        totalChargeEUR: 0,
        totalChargeMinor: 0,
        ticks: [],
        metadata
    };
    activeSessions.set(sessionId, session);
    __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug(`Session started: ${sessionId} for content ${contentId}`);
    return session;
}
/**
 * Generate tick ID
 */ function generateTickId(sessionId) {
    return `${sessionId}-tick-${Date.now()}`;
}
async function sendTick({ sessionId, playedMs, tickId = null }) {
    const session = activeSessions.get(sessionId);
    if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
    }
    if (session.status !== 'active') {
        throw new Error(`Session is not active: ${session.status}`);
    }
    if (playedMs <= 0) {
        throw new Error('Played time must be positive');
    }
    // Generate tick ID if not provided
    const finalTickId = tickId || generateTickId(sessionId);
    // Calculate charge
    const minutes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["msToMinutes"])(playedMs);
    const chargeEUR = session.pricePerMinute * minutes;
    const chargeMinor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eurToPLYMinor"])(chargeEUR);
    __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug(`Tick ${finalTickId}: ${minutes.toFixed(2)} min = €${chargeEUR.toFixed(2)} (${chargeMinor} PLY minor)`);
    // Execute payment using WalletConnect if available
    let txId = null;
    let paymentSuccess = false;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDemoMode"])() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2d$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWalletConnected"])() && session.userAddress) {
        try {
            const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
            const providerAddr = config.providerAddr;
            if (!providerAddr) {
                __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].warn('Provider address not configured, skipping payment');
            } else {
                // Get wallet connector for signing
                const walletConnector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2d$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWalletConnector"])();
                // Calculate fee split
                const feePct = config.platformFeePct || 500; // 5% default
                const feeMinor = Math.floor(chargeMinor * feePct / 10000);
                const providerAmount = chargeMinor - feeMinor;
                // Transfer to provider using WalletConnect
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transfer"])(session.userAddress, providerAddr, providerAmount, walletConnector // Use WalletConnect signer
                );
                txId = result.txId;
                paymentSuccess = result.confirmed;
                // Transfer fee to platform (if configured)
                if (feeMinor > 0 && config.platformAddr) {
                    try {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transfer"])(session.userAddress, config.platformAddr, feeMinor, walletConnector // Use WalletConnect signer
                        );
                    } catch (error) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error transferring platform fee:', error);
                    }
                }
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Payment error:', error);
        // Continue even if payment fails (will be retried)
        }
    } else {
        // Demo mode or wallet not connected
        txId = `DEMO-TX-${Date.now()}`;
        paymentSuccess = true;
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Demo mode: payment simulated');
    }
    // Update session
    session.totalPlayedMs += playedMs;
    session.totalChargeEUR += chargeEUR;
    session.totalChargeMinor += chargeMinor;
    const tick = {
        tickId: finalTickId,
        timestamp: Date.now(),
        playedMs,
        minutes,
        chargeEUR,
        chargeMinor,
        txId,
        paymentSuccess
    };
    session.ticks.push(tick);
    __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug(`Tick ${finalTickId} processed: ${paymentSuccess ? 'paid' : 'pending'}`);
    return tick;
}
async function stopSession(sessionId) {
    const session = activeSessions.get(sessionId);
    if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
    }
    if (session.status === 'stopped') {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].warn(`Session ${sessionId} already stopped`);
        return session;
    }
    session.status = 'stopped';
    session.endTime = Date.now();
    session.durationMs = session.endTime - session.startTime;
    session.totalMinutes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["msToMinutes"])(session.totalPlayedMs);
    __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug(`Session stopped: ${sessionId}, total: ${session.totalMinutes.toFixed(2)} min, €${session.totalChargeEUR.toFixed(2)}`);
    // Return summary
    return {
        sessionId: session.sessionId,
        contentId: session.contentId,
        status: session.status,
        startTime: session.startTime,
        endTime: session.endTime,
        durationMs: session.durationMs,
        totalPlayedMs: session.totalPlayedMs,
        totalMinutes: session.totalMinutes,
        totalChargeEUR: session.totalChargeEUR,
        totalChargeMinor: session.totalChargeMinor,
        ticksCount: session.ticks.length,
        ticks: session.ticks
    };
}
function getSession(sessionId) {
    return activeSessions.get(sessionId) || null;
}
function getActiveSessions() {
    return Array.from(activeSessions.values()).filter((s)=>s.status === 'active');
}
function getSessionHistory(userAddress = null) {
    const sessions = Array.from(activeSessions.values());
    if (userAddress) {
        return sessions.filter((s)=>s.userAddress === userAddress);
    }
    return sessions;
}
const __TURBOPACK__default__export__ = {
    startSession,
    sendTick,
    stopSession,
    getSession,
    getActiveSessions,
    getSessionHistory
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/playandpay-sdk/src/auth.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Play and Pay SDK - Authentication Module
 * Handles JWT tokens and API key management
 */ __turbopack_context__.s([
    "authenticate",
    ()=>authenticate,
    "clearAuth",
    ()=>clearAuth,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getApiKey",
    ()=>getApiKey,
    "getAuthHeader",
    ()=>getAuthHeader,
    "getHeaders",
    ()=>getHeaders,
    "getJWTToken",
    ()=>getJWTToken,
    "isTokenValid",
    ()=>isTokenValid,
    "setApiKey",
    ()=>setApiKey,
    "setJWTToken",
    ()=>setJWTToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/config.js [app-client] (ecmascript)");
;
;
let apiKey = null;
let jwtToken = null;
let tokenExpiry = null;
function setApiKey(key) {
    apiKey = key;
    __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('API key set');
}
function getApiKey() {
    if (!apiKey) {
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        apiKey = config.apiKey || null;
    }
    return apiKey;
}
function setJWTToken(token, expiresIn = 3600) {
    jwtToken = token;
    tokenExpiry = Date.now() + expiresIn * 1000;
    __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('JWT token set, expires at:', new Date(tokenExpiry));
}
function getJWTToken() {
    // Check if token is expired
    if (jwtToken && tokenExpiry && Date.now() >= tokenExpiry) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].warn('JWT token expired');
        jwtToken = null;
        tokenExpiry = null;
    }
    return jwtToken;
}
function isTokenValid() {
    const token = getJWTToken();
    return token !== null && tokenExpiry !== null && Date.now() < tokenExpiry;
}
function clearAuth() {
    apiKey = null;
    jwtToken = null;
    tokenExpiry = null;
    __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Authentication cleared');
}
function getAuthHeader() {
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
function getHeaders(additionalHeaders = {}) {
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
async function authenticate(userId, password) {
    try {
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                password
            })
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
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Authentication error:', error);
        throw error;
    }
}
const __TURBOPACK__default__export__ = {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/playandpay-sdk/src/analytics.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Play and Pay SDK - Analytics Module
 * Fetches user/session reports and analytics data
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getPartnerAnalytics",
    ()=>getPartnerAnalytics,
    "getSessionReport",
    ()=>getSessionReport,
    "getUsageStats",
    ()=>getUsageStats,
    "getUserAnalytics",
    ()=>getUserAnalytics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$billing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/billing.js [app-client] (ecmascript)");
;
;
;
;
async function getUserAnalytics({ userId, from, to }) {
    if (!userId) {
        throw new Error('User ID is required');
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDemoMode"])()) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Demo mode: returning mock analytics');
        return getMockAnalytics(userId);
    }
    try {
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        const params = new URLSearchParams({
            userId,
            ...from && {
                from: typeof from === 'string' ? from : from.toISOString()
            },
            ...to && {
                to: typeof to === 'string' ? to : to.toISOString()
            }
        });
        const response = await fetch(`${config.apiBaseUrl}/analytics/user?${params}`, {
            method: 'GET',
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHeaders"])()
        });
        if (!response.ok) {
            throw new Error(`Analytics request failed: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error getting user analytics:', error);
        throw error;
    }
}
async function getPartnerAnalytics({ partnerId, from, to }) {
    if (!partnerId) {
        throw new Error('Partner ID is required');
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDemoMode"])()) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Demo mode: returning mock partner analytics');
        return getMockPartnerAnalytics(partnerId);
    }
    try {
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        const params = new URLSearchParams({
            partnerId,
            ...from && {
                from: typeof from === 'string' ? from : from.toISOString()
            },
            ...to && {
                to: typeof to === 'string' ? to : to.toISOString()
            }
        });
        const response = await fetch(`${config.apiBaseUrl}/analytics/partner?${params}`, {
            method: 'GET',
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHeaders"])()
        });
        if (!response.ok) {
            throw new Error(`Partner analytics request failed: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error getting partner analytics:', error);
        throw error;
    }
}
async function getSessionReport(sessionId) {
    if (!sessionId) {
        throw new Error('Session ID is required');
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDemoMode"])()) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Demo mode: returning mock session report');
        return getMockSessionReport(sessionId);
    }
    try {
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        const response = await fetch(`${config.apiBaseUrl}/analytics/session/${sessionId}`, {
            method: 'GET',
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHeaders"])()
        });
        if (!response.ok) {
            throw new Error(`Session report request failed: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error getting session report:', error);
        throw error;
    }
}
async function getUsageStats(params = {}) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDemoMode"])()) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Demo mode: returning mock usage stats');
        return getMockUsageStats();
    }
    try {
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        const queryParams = new URLSearchParams();
        if (params.userId) queryParams.append('userId', params.userId);
        if (params.contentId) queryParams.append('contentId', params.contentId);
        if (params.from) queryParams.append('from', typeof params.from === 'string' ? params.from : params.from.toISOString());
        if (params.to) queryParams.append('to', typeof params.to === 'string' ? params.to : params.to.toISOString());
        const response = await fetch(`${config.apiBaseUrl}/analytics/stats?${queryParams}`, {
            method: 'GET',
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHeaders"])()
        });
        if (!response.ok) {
            throw new Error(`Usage stats request failed: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error getting usage stats:', error);
        throw error;
    }
}
// Mock data generators for demo mode
function getMockAnalytics(userId) {
    return {
        userId,
        period: {
            from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            to: new Date().toISOString()
        },
        totalSessions: 12,
        totalWatchTime: 180 * 60 * 1000,
        totalSpent: 3.60,
        averageSessionDuration: 15 * 60 * 1000,
        favoriteContent: [
            {
                contentId: 'film123',
                watchTime: 60 * 60 * 1000,
                sessions: 4
            },
            {
                contentId: 'series456',
                watchTime: 45 * 60 * 1000,
                sessions: 3
            }
        ]
    };
}
function getMockPartnerAnalytics(partnerId) {
    return {
        partnerId,
        period: {
            from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            to: new Date().toISOString()
        },
        totalUsers: 150,
        totalSessions: 450,
        totalRevenue: 90.00,
        totalWatchTime: 2250 * 60 * 1000,
        topContent: [
            {
                contentId: 'film123',
                revenue: 45.00,
                sessions: 120
            },
            {
                contentId: 'series456',
                revenue: 30.00,
                sessions: 80
            }
        ],
        engagement: {
            averageSessionDuration: 15 * 60 * 1000,
            retentionRate: 0.65
        }
    };
}
function getMockSessionReport(sessionId) {
    return {
        sessionId,
        userId: 'user123',
        contentId: 'film123',
        startedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        stoppedAt: new Date().toISOString(),
        duration: 15 * 60 * 1000,
        totalCharged: 0.30,
        ticks: [
            {
                tickId: 'tick_1',
                playedMs: 60000,
                charge: 0.02,
                timestamp: Date.now() - 14 * 60 * 1000
            },
            {
                tickId: 'tick_2',
                playedMs: 60000,
                charge: 0.02,
                timestamp: Date.now() - 13 * 60 * 1000
            }
        ]
    };
}
function getMockUsageStats() {
    return {
        totalUsers: 1000,
        totalSessions: 5000,
        totalWatchTime: 75000 * 60 * 1000,
        totalRevenue: 1500.00,
        averageSessionDuration: 15 * 60 * 1000,
        peakHours: [
            20,
            21,
            22
        ],
        topContent: [
            {
                contentId: 'film123',
                views: 500,
                revenue: 100.00
            },
            {
                contentId: 'series456',
                views: 300,
                revenue: 60.00
            }
        ]
    };
}
const __TURBOPACK__default__export__ = {
    getUserAnalytics,
    getPartnerAnalytics,
    getSessionReport,
    getUsageStats
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/playandpay-sdk/src/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Play and Pay SDK - API Wrapper Module
 * Backend API wrapper for session management and wallet operations
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getWalletBalance",
    ()=>getWalletBalance,
    "sendTick",
    ()=>sendTick,
    "startSession",
    ()=>startSession,
    "stopSession",
    ()=>stopSession,
    "topUpWallet",
    ()=>topUpWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/utils.js [app-client] (ecmascript)");
;
;
;
async function startSession(params) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDemoMode"])()) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Demo mode: returning mock session');
        return {
            sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])('session'),
            playbackToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])('token'),
            startedAt: new Date().toISOString()
        };
    }
    try {
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        const response = await fetch(`${config.apiBaseUrl}/session/start`, {
            method: 'POST',
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHeaders"])(),
            body: JSON.stringify(params)
        });
        if (!response.ok) {
            throw new Error(`Session start failed: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error starting session:', error);
        throw error;
    }
}
async function sendTick(params) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDemoMode"])()) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Demo mode: returning mock tick');
        return {
            success: true,
            charged: 0.02,
            remainingBalance: 4.98,
            txId: `DEMO-TX-${Date.now()}`
        };
    }
    try {
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        const response = await fetch(`${config.apiBaseUrl}/session/tick`, {
            method: 'POST',
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHeaders"])({
                'X-Idempotency-Key': params.tickId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])('tick')
            }),
            body: JSON.stringify(params)
        });
        if (!response.ok) {
            throw new Error(`Tick failed: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error sending tick:', error);
        throw error;
    }
}
async function stopSession(sessionId) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDemoMode"])()) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Demo mode: returning mock session stop');
        return {
            sessionId,
            totalCharged: 0.30,
            duration: 15 * 60 * 1000
        };
    }
    try {
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        const response = await fetch(`${config.apiBaseUrl}/session/stop`, {
            method: 'POST',
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHeaders"])(),
            body: JSON.stringify({
                sessionId
            })
        });
        if (!response.ok) {
            throw new Error(`Session stop failed: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error stopping session:', error);
        throw error;
    }
}
async function getWalletBalance(userId) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDemoMode"])()) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Demo mode: returning mock balance');
        return {
            userId,
            balance: 500.00,
            balanceMinor: 50000,
            currency: 'PLY'
        };
    }
    try {
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        const response = await fetch(`${config.apiBaseUrl}/wallet/balance/${userId}`, {
            method: 'GET',
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHeaders"])()
        });
        if (!response.ok) {
            throw new Error(`Balance request failed: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error getting wallet balance:', error);
        throw error;
    }
}
async function topUpWallet(params) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDemoMode"])()) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].debug('Demo mode: returning mock top-up');
        return {
            success: true,
            txId: `DEMO-TOPUP-${Date.now()}`,
            amount: params.amount,
            newBalance: 500.00 + params.amount
        };
    }
    try {
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"])();
        const response = await fetch(`${config.apiBaseUrl}/wallet/topup`, {
            method: 'POST',
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHeaders"])(),
            body: JSON.stringify(params)
        });
        if (!response.ok) {
            throw new Error(`Top-up failed: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"].error('Error topping up wallet:', error);
        throw error;
    }
}
const __TURBOPACK__default__export__ = {
    startSession,
    sendTick,
    stopSession,
    getWalletBalance,
    topUpWallet
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/playandpay-sdk/src/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * Play and Pay SDK - Main Entry Point
 * 
 * @module @playandpay/sdk
 * @version 1.0.0
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getAnalytics",
    ()=>getAnalytics,
    "init",
    ()=>init,
    "initWallet",
    ()=>initWallet,
    "startBilling",
    ()=>startBilling
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/wallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$billing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/billing.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$analytics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/analytics.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2d$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/wallet-connect.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
function init(config = {}) {
    // Initialize configuration
    const finalConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initConfig"])(config);
    // Set API key if provided
    if (config.apiKey) {
        __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setApiKey"](config.apiKey);
    }
    return {
        config: finalConfig,
        wallet: __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
        billing: __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$billing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
        analytics: __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$analytics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
        api: __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
        utils: __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
    };
}
async function initWallet(config = {}) {
    const sdk = init(config);
    // This is a placeholder - in real usage, user would connect their wallet
    return sdk.wallet;
}
async function startBilling(params) {
    const sdk = init();
    return await sdk.billing.startSession(params);
}
async function getAnalytics(params) {
    const sdk = init();
    return await sdk.analytics.getUserAnalytics(params);
}
;
const __TURBOPACK__default__export__ = {
    init,
    initWallet,
    startBilling,
    getAnalytics,
    wallet: __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    billing: __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$billing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    analytics: __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$analytics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    api: __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    auth: __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    utils: __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    walletConnect: __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2d$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/playandpay-sdk/src/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analytics",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$analytics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    "api",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    "auth",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    "billing",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$billing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    "default",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"],
    "getAnalytics",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAnalytics"],
    "getConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConfig"],
    "init",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["init"],
    "initConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initConfig"],
    "initWallet",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initWallet"],
    "startBilling",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["startBilling"],
    "utils",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    "wallet",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    "walletConnect",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2d$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/wallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$billing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/billing.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$analytics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/analytics.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$playandpay$2d$sdk$2f$src$2f$wallet$2d$connect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/playandpay-sdk/src/wallet-connect.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=playandpay-sdk_src_bc2ee49d._.js.map