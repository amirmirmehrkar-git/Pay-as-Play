#!/usr/bin/env node
/**
 * ASA Creation Script for PlayCoin (PLY) on Algorand TestNet
 * 
 * Usage:
 *   CREATOR_MNEMONIC="your 25-word mnemonic" node asa-create.js
 * 
 * Or set in .env file:
 *   CREATOR_MNEMONIC=your 25-word mnemonic
 * 
 * Example:
 *   CREATOR_MNEMONIC="word1 word2 ... word25" node asa-create.js
 * 
 * Output:
 *   Asset ID: 1234567
 *   Transaction ID: ABCDEF123...
 *   Config file updated automatically
 */

require('dotenv').config();
const algosdk = require('algosdk');

// TestNet configuration
const ALGOD_URL = 'https://testnet-api.algonode.cloud';
const ALGOD_TOKEN = '';
const ALGOD_PORT = '';

// ASA Configuration
const ASA_CONFIG = {
  total: 10_000_000,        // 10 million PLY
  decimals: 2,              // 1 PLY = 0.01 EUR (100 minor units = 1 PLY)
  unitName: 'PLY',
  assetName: 'PlayCoin',
  assetURL: 'https://playandpay.io',
  defaultFrozen: false,      // Users can freely transfer
  note: 'Pay-as-you-Use micro-token for Play and Pay platform'
};

async function createASA() {
  try {
    // Initialize Algod client
    const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_URL, ALGOD_PORT);

    // Get creator account from mnemonic
    const creatorMnemonic = process.env.CREATOR_MNEMONIC;
    if (!creatorMnemonic) {
      throw new Error('CREATOR_MNEMONIC environment variable is required');
    }

    const creator = algosdk.mnemonicToSecretKey(creatorMnemonic);
    console.log('✅ Creator account loaded:', creator.addr);

    // Check account balance
    const accountInfo = await algod.accountInformation(creator.addr).do();
    const balance = accountInfo.amount / 1e6; // Convert microAlgos to Algos
    console.log(`💰 Creator balance: ${balance} ALGO`);

    if (balance < 0.1) {
      console.warn('⚠️  Warning: Low balance. You need at least 0.1 ALGO to create an ASA.');
      console.log('   Get TestNet ALGO from: https://bank.testnet.algorand.network/');
    }

    // Get transaction parameters
    const params = await algod.getTransactionParams().do();
    console.log('📝 Transaction params retrieved');

    // Create ASA transaction
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: creator.addr,
      total: ASA_CONFIG.total,
      decimals: ASA_CONFIG.decimals,
      defaultFrozen: ASA_CONFIG.defaultFrozen,
      unitName: ASA_CONFIG.unitName,
      assetName: ASA_CONFIG.assetName,
      assetURL: ASA_CONFIG.assetURL,
      note: new Uint8Array(Buffer.from(ASA_CONFIG.note)),
      suggestedParams: params
    });

    // Sign transaction
    const signedTxn = txn.signTxn(creator.sk);
    console.log('✍️  Transaction signed');

    // Send transaction
    const { txId } = await algod.sendRawTransaction(signedTxn).do();
    console.log('📤 Transaction sent:', txId);

    // Wait for confirmation
    console.log('⏳ Waiting for confirmation...');
    const confirmedTxn = await algosdk.waitForConfirmation(algod, txId, 3);
    
    const assetId = confirmedTxn['asset-index'];
    console.log('\n🎉 ASA Created Successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Asset ID:', assetId);
    console.log('Unit Name:', ASA_CONFIG.unitName);
    console.log('Asset Name:', ASA_CONFIG.assetName);
    console.log('Total Supply:', ASA_CONFIG.total.toLocaleString(), ASA_CONFIG.unitName);
    console.log('Decimals:', ASA_CONFIG.decimals);
    console.log('1 PLY = €0.01 (100 minor units = 1 PLY)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Save to config file
    const fs = require('fs');
    const path = require('path');
    const configPath = path.join(__dirname, '..', 'server', 'playandpay.config.json');
    
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      config.asa_id = assetId.toString();
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log('✅ Config file updated:', configPath);
    }

    // Generate opt-in instructions
    console.log('\n📋 Next Steps:');
    console.log('1. Update playandpay.config.json with ASA ID:', assetId);
    console.log('2. Users and providers need to opt-in to this asset');
    console.log('3. Use opt-in.js script or WalletConnect for opt-in\n');

    return {
      assetId,
      txId,
      unitName: ASA_CONFIG.unitName,
      assetName: ASA_CONFIG.assetName
    };

  } catch (error) {
    console.error('❌ Error creating ASA:', error.message);
    if (error.response) {
      console.error('Response:', error.response.body);
    }
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  createASA();
}

module.exports = { createASA, ASA_CONFIG };

