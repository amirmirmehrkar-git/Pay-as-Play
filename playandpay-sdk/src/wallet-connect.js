/**
 * Play and Pay SDK - WalletConnect Module
 * Handles Pera Wallet connection and user-side transaction signing
 */

import { getConfig } from './config.js';
import { logger } from './utils.js';

let peraWallet = null;
let isConnected = false;
let connectedAddress = null;

/**
 * Initialize Pera Wallet
 */
export async function initPeraWallet() {
    if (typeof window === 'undefined') {
        logger.warn('Pera Wallet can only be used in browser environment');
        return null;
    }

    try {
        // Dynamic import for browser only
        const { PeraWalletConnect } = await import('@perawallet/connect');
        peraWallet = new PeraWalletConnect({
            chainId: getConfig().network === 'mainnet' ? 416002 : 416003, // TestNet
            shouldShowSignTxnToast: true
        });
        
        logger.debug('Pera Wallet initialized');
        return peraWallet;
    } catch (error) {
        logger.error('Error initializing Pera Wallet:', error);
        return null;
    }
}

/**
 * Connect to Pera Wallet
 * @returns {Promise<string>} Connected wallet address
 */
export async function connectWallet() {
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
            logger.debug('Wallet connected:', connectedAddress);
            return connectedAddress;
        } else {
            throw new Error('No accounts returned from wallet');
        }
    } catch (error) {
        if (error.data?.type !== 'CONNECT_MODAL_CLOSED') {
            logger.error('Error connecting wallet:', error);
        }
        throw error;
    }
}

/**
 * Disconnect from Pera Wallet
 */
export async function disconnectWallet() {
    if (peraWallet) {
        try {
            await peraWallet.disconnect();
            isConnected = false;
            connectedAddress = null;
            logger.debug('Wallet disconnected');
        } catch (error) {
            logger.error('Error disconnecting wallet:', error);
        }
    }
}

/**
 * Get connected wallet address
 * @returns {string|null} Connected address or null
 */
export function getConnectedAddress() {
    return connectedAddress;
}

/**
 * Check if wallet is connected
 * @returns {boolean}
 */
export function isWalletConnected() {
    return isConnected && connectedAddress !== null;
}

/**
 * Sign transactions using Pera Wallet
 * @param {Array} transactions - Array of unsigned transactions
 * @returns {Promise<Array>} Array of signed transactions
 */
export async function signTransactions(transactions) {
    if (!isConnected || !peraWallet) {
        throw new Error('Wallet not connected. Call connectWallet() first.');
    }

    try {
        // Pera Wallet expects array of transactions
        const signedTxns = await peraWallet.signTransaction(Array.isArray(transactions) ? transactions : [transactions]);
        logger.debug('Transactions signed successfully');
        return Array.isArray(signedTxns) ? signedTxns : [signedTxns];
    } catch (error) {
        if (error.data?.type !== 'SIGN_MODAL_CLOSED') {
            logger.error('Error signing transactions:', error);
        }
        throw error;
    }
}

/**
 * Sign a single transaction
 * @param {Object} transaction - Unsigned transaction object
 * @returns {Promise<Uint8Array>} Signed transaction
 */
export async function signTransaction(transaction) {
    const signed = await signTransactions([transaction]);
    return signed[0];
}

/**
 * Reconnect to previously connected wallet
 */
export async function reconnectWallet() {
    if (!peraWallet) {
        peraWallet = await initPeraWallet();
    }

    if (peraWallet) {
        try {
            const accounts = await peraWallet.reconnectSession();
            if (accounts && accounts.length > 0) {
                isConnected = true;
                connectedAddress = accounts[0];
                logger.debug('Wallet reconnected:', connectedAddress);
                return connectedAddress;
            }
        } catch (error) {
            logger.debug('No previous session to reconnect');
            return null;
        }
    }
    
    return null;
}

/**
 * Get wallet connector object (for use with SDK)
 * @returns {Object} Wallet connector with signTransaction method
 */
export function getWalletConnector() {
    if (!isConnected) {
        throw new Error('Wallet not connected');
    }

    return {
        address: connectedAddress,
        signTransaction: async (txn) => {
            return await signTransaction(txn);
        },
        signTransactions: async (txns) => {
            return await signTransactions(txns);
        }
    };
}

export default {
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

