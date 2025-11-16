/**
 * Play and Pay SDK - Wallet Module
 * Handles Algorand ASA wallet operations (balance, transfers)
 */

import algosdk from 'algosdk';
import { getConfig, getAlgorandConfig, isDemoMode } from './config.js';
import { logger, isValidAddress } from './utils.js';

let algodClient = null;
let indexerClient = null;

/**
 * Initialize Algorand clients
 */
function initClients() {
  if (algodClient && indexerClient) {
    return;
  }
  
  const algodConfig = getAlgorandConfig();
  algodClient = new algosdk.Algodv2(
    algodConfig.algodToken,
    algodConfig.algodUrl,
    algodConfig.algodPort
  );
  
  indexerClient = new algosdk.Indexer(
    algodConfig.indexerToken,
    algodConfig.indexerUrl,
    algodConfig.indexerPort
  );
  
  logger.debug('Algorand clients initialized');
}

/**
 * Get wallet balance
 * @param {string} address - Algorand address
 * @returns {Promise<Object>} Balance object
 */
export async function getBalance(address) {
  if (!address || !isValidAddress(address)) {
    throw new Error('Invalid address');
  }
  
  if (isDemoMode()) {
    logger.debug('Demo mode: returning mock balance');
    return {
      address,
      balanceMinor: 50000, // 500 PLY (50000 minor units)
      balance: 500.00,
      currency: getConfig().currency || 'PLY'
    };
  }
  
  try {
    initClients();
    const config = getConfig();
    const asaId = config.asaId;
    
    if (!asaId) {
      throw new Error('ASA ID not configured');
    }
    
    const accountInfo = await indexerClient.lookupAccountByID(address).do();
    const asset = accountInfo.account.assets?.find(a => a['asset-id'] === asaId);
    const balanceMinor = asset ? asset.amount : 0;
    const balance = balanceMinor / 100; // Assuming 2 decimals
    
    logger.debug(`Balance for ${address}: ${balance} ${config.currency}`);
    
    return {
      address,
      balanceMinor,
      balance,
      currency: config.currency || 'PLY'
    };
  } catch (error) {
    logger.error('Error getting balance:', error);
    throw error;
  }
}

/**
 * Transfer ASA tokens
 * @param {string} fromAddress - Sender address
 * @param {string} toAddress - Receiver address
 * @param {number} amountMinor - Amount in minor units
 * @param {Object} signer - Signer object (mnemonic or wallet connector)
 * @returns {Promise<Object>} Transaction result
 */
export async function transfer(fromAddress, toAddress, amountMinor, signer) {
  if (!isValidAddress(fromAddress) || !isValidAddress(toAddress)) {
    throw new Error('Invalid address');
  }
  
  if (amountMinor <= 0) {
    throw new Error('Amount must be positive');
  }
  
  if (isDemoMode()) {
    logger.debug('Demo mode: returning mock transaction');
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
    const config = getConfig();
    const asaId = config.asaId;
    
    if (!asaId) {
      throw new Error('ASA ID not configured');
    }
    
    // Get transaction parameters
    const params = await algodClient.getTransactionParams().do();
    
    // Create asset transfer transaction
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
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
      const account = algosdk.mnemonicToSecretKey(signer);
      signedTxn = txn.signTxn(account.sk);
    } else if (signer && typeof signer.signTransaction === 'function') {
      // Wallet connector (e.g., Pera Wallet)
      signedTxn = await signer.signTransaction([txn]);
    } else {
      throw new Error('Invalid signer. Provide mnemonic string or wallet connector.');
    }
    
    // Submit transaction
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    logger.debug(`Transaction submitted: ${txId}`);
    
    // Wait for confirmation
    const confirmation = await algosdk.waitForConfirmation(algodClient, txId, 4);
    
    logger.debug(`Transaction confirmed in round ${confirmation['confirmed-round']}`);
    
    return {
      txId,
      amountMinor,
      fromAddress,
      toAddress,
      confirmed: true,
      confirmedRound: confirmation['confirmed-round']
    };
  } catch (error) {
    logger.error('Error transferring tokens:', error);
    throw error;
  }
}

/**
 * Check if address has opted in to ASA
 * @param {string} address - Algorand address
 * @returns {Promise<boolean>}
 */
export async function isOptedIn(address) {
  if (!address || !isValidAddress(address)) {
    return false;
  }
  
  if (isDemoMode()) {
    return true; // Assume opted in for demo
  }
  
  try {
    initClients();
    const config = getConfig();
    const asaId = config.asaId;
    
    if (!asaId) {
      return false;
    }
    
    const accountInfo = await indexerClient.lookupAccountByID(address).do();
    return accountInfo.account.assets?.some(a => a['asset-id'] === asaId) || false;
  } catch (error) {
    logger.error('Error checking opt-in:', error);
    return false;
  }
}

/**
 * Get transaction history for an address
 * @param {string} address - Algorand address
 * @param {number} limit - Maximum number of transactions
 * @returns {Promise<Array>} Transaction history
 */
export async function getTransactionHistory(address, limit = 50) {
  if (!address || !isValidAddress(address)) {
    throw new Error('Invalid address');
  }
  
  if (isDemoMode()) {
    logger.debug('Demo mode: returning mock transaction history');
    return [];
  }
  
  try {
    initClients();
    const config = getConfig();
    const asaId = config.asaId;
    
    const transactions = await indexerClient
      .lookupAccountTransactions(address)
      .assetID(asaId)
      .limit(limit)
      .do();
    
    return transactions.transactions || [];
  } catch (error) {
    logger.error('Error getting transaction history:', error);
    throw error;
  }
}

export default {
  getBalance,
  transfer,
  isOptedIn,
  getTransactionHistory
};

