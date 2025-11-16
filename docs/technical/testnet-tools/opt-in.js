#!/usr/bin/env node
/**
 * Opt-in Script for PlayCoin (PLY) ASA on Algorand TestNet
 * 
 * Usage:
 *   USER_MNEMONIC="your 25-word mnemonic" ASA_ID=1234567 node opt-in.js
 * 
 * Or set in .env file:
 *   USER_MNEMONIC=your 25-word mnemonic
 *   ASA_ID=1234567
 * 
 * Example:
 *   USER_MNEMONIC="word1 word2 ... word25" ASA_ID=1234567 node opt-in.js
 * 
 * Note:
 *   In Algorand, accounts must opt-in to an ASA before they can receive or send it.
 *   This script creates a 0-amount transfer to self, which is the opt-in transaction.
 */

require('dotenv').config();
const algosdk = require('algosdk');

// TestNet configuration
const ALGOD_URL = 'https://testnet-api.algonode.cloud';
const ALGOD_TOKEN = '';
const ALGOD_PORT = '';

async function optInToASA() {
  try {
    // Initialize Algod client
    const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_URL, ALGOD_PORT);

    // Get user account from mnemonic
    const userMnemonic = process.env.USER_MNEMONIC;
    if (!userMnemonic) {
      throw new Error('USER_MNEMONIC environment variable is required');
    }

    const user = algosdk.mnemonicToSecretKey(userMnemonic);
    console.log('✅ User account loaded:', user.addr);

    // Get ASA ID
    const asaId = parseInt(process.env.ASA_ID);
    if (!asaId || isNaN(asaId)) {
      throw new Error('ASA_ID environment variable is required and must be a number');
    }
    console.log('📦 ASA ID:', asaId);

    // Check if already opted in
    const accountInfo = await algod.accountInformation(user.addr).do();
    const hasAsset = accountInfo.assets?.some(asset => asset['asset-id'] === asaId);
    
    if (hasAsset) {
      console.log('✅ Account already opted in to ASA', asaId);
      return { success: true, alreadyOptedIn: true };
    }

    // Check account balance
    const balance = accountInfo.amount / 1e6;
    console.log(`💰 Account balance: ${balance} ALGO`);

    if (balance < 0.1) {
      console.warn('⚠️  Warning: Low balance. You need at least 0.1 ALGO for opt-in.');
      console.log('   Get TestNet ALGO from: https://bank.testnet.algorand.network/');
    }

    // Get transaction parameters
    const params = await algod.getTransactionParams().do();
    console.log('📝 Transaction params retrieved');

    // Create opt-in transaction (transfer 0 assets to self)
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: user.addr,
      to: user.addr,
      amount: 0,
      assetIndex: asaId,
      suggestedParams: params
    });

    // Sign transaction
    const signedTxn = txn.signTxn(user.sk);
    console.log('✍️  Transaction signed');

    // Send transaction
    const { txId } = await algod.sendRawTransaction(signedTxn).do();
    console.log('📤 Transaction sent:', txId);

    // Wait for confirmation
    console.log('⏳ Waiting for confirmation...');
    await algosdk.waitForConfirmation(algod, txId, 3);
    
    console.log('\n🎉 Opt-in Successful!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Account:', user.addr);
    console.log('ASA ID:', asaId);
    console.log('Transaction ID:', txId);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return {
      success: true,
      account: user.addr,
      asaId,
      txId
    };

  } catch (error) {
    console.error('❌ Error opting in to ASA:', error.message);
    if (error.response) {
      console.error('Response:', error.response.body);
    }
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  optInToASA();
}

module.exports = { optInToASA };

