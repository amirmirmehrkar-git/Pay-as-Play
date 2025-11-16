/**
 * Play and Pay - Smart Contract Test Script
 * Tests UsageContract billing functionality on Algorand TestNet
 * 
 * Usage:
 *   node test-contract.js
 * 
 * Prerequisites:
 *   - Deployed contract (APP_ID set in .env)
 *   - User account with PLY tokens
 *   - User opted in to contract
 */

require('dotenv').config();
const algosdk = require('algosdk');

// Configuration
const ALGOD_URL = 'https://testnet-api.algonode.cloud';
const ALGOD_TOKEN = '';
const ALGOD_PORT = '';

// Load from .env
const USER_MNEMONIC = process.env.USER_MNEMONIC;
const PROVIDER_ADDR = process.env.PROVIDER_ADDR;
const PLATFORM_ADDR = process.env.PLATFORM_ADDR;
const APP_ID = parseInt(process.env.APP_ID);
const ASA_ID = parseInt(process.env.ASA_ID);

// Test parameters
const UNITS = 1; // 1 minute
const UNIT_PRICE = 2; // 2 PLY minor per minute (€0.02)
const FEE_PCT = 500; // 5% = 500 basis points

// Validate environment
if (!USER_MNEMONIC || !PROVIDER_ADDR || !PLATFORM_ADDR || !APP_ID || !ASA_ID) {
    console.error('❌ Error: Missing required environment variables');
    console.error('Required: USER_MNEMONIC, PROVIDER_ADDR, PLATFORM_ADDR, APP_ID, ASA_ID');
    process.exit(1);
}

// Initialize Algod client
const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_URL, ALGOD_PORT);

// User account
const userAccount = algosdk.mnemonicToSecretKey(USER_MNEMONIC);

/**
 * Get user balance
 */
async function getBalance() {
    try {
        const accountInfo = await algod.accountInformation(userAccount.addr).do();
        const asset = accountInfo.assets.find(a => a['asset-id'] === ASA_ID);
        return asset ? asset.amount : 0;
    } catch (error) {
        console.error('Error getting balance:', error);
        return 0;
    }
}

/**
 * Check if user is opted in to contract
 */
async function isOptedIn() {
    try {
        const accountInfo = await algod.accountInformation(userAccount.addr).do();
        return accountInfo['apps-local-state']?.some(app => app.id === APP_ID) || false;
    } catch (error) {
        console.error('Error checking opt-in:', error);
        return false;
    }
}

/**
 * Opt in user to contract
 */
async function optIn() {
    try {
        const params = await algod.getTransactionParams().do();
        const optInTxn = algosdk.makeApplicationOptInTxnFromObject({
            from: userAccount.addr,
            appIndex: APP_ID,
            suggestedParams: params
        });

        const signedTxn = optInTxn.signTxn(userAccount.sk);
        const { txId } = await algod.sendRawTransaction(signedTxn).do();
        await algosdk.waitForConfirmation(algod, txId, 4);

        console.log('✅ Opt-in successful!');
        console.log('Transaction ID:', txId);
        return true;
    } catch (error) {
        console.error('❌ Opt-in failed:', error);
        return false;
    }
}

/**
 * Test billing transaction
 */
async function testBilling() {
    try {
        console.log('\n🧪 Testing Billing Transaction...\n');

        // Check balance
        const balanceBefore = await getBalance();
        console.log(`💰 Balance before: ${balanceBefore} PLY minor`);

        if (balanceBefore < UNIT_PRICE) {
            console.error('❌ Insufficient balance!');
            return false;
        }

        // Check opt-in
        if (!(await isOptedIn())) {
            console.log('⚠️  User not opted in. Opting in...');
            if (!(await optIn())) {
                return false;
            }
        }

        // Calculate amounts
        const grossAmount = UNITS * UNIT_PRICE;
        const feeAmount = Math.floor((grossAmount * FEE_PCT) / 10000);
        const providerAmount = grossAmount - feeAmount;

        console.log(`📊 Billing Details:`);
        console.log(`   Units: ${UNITS} minute(s)`);
        console.log(`   Unit Price: ${UNIT_PRICE} PLY minor/min`);
        console.log(`   Gross Amount: ${grossAmount} PLY minor`);
        console.log(`   Fee (${FEE_PCT / 100}%): ${feeAmount} PLY minor`);
        console.log(`   Provider Amount: ${providerAmount} PLY minor`);
        console.log('');

        // Generate unique tick ID
        const tickId = Buffer.from(`tick_${Date.now()}_${Math.random()}`);

        // Get suggested params
        const params = await algod.getTransactionParams().do();

        // Transaction 1: Application Call
        const appCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
            from: userAccount.addr,
            appIndex: APP_ID,
            appArgs: [
                tickId,
                algosdk.encodeUint64(UNITS),
                algosdk.encodeUint64(UNIT_PRICE),
                algosdk.encodeUint64(ASA_ID)
            ],
            suggestedParams: params
        });

        // Transaction 2: User → Provider
        const providerTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: userAccount.addr,
            to: PROVIDER_ADDR,
            amount: providerAmount,
            assetIndex: ASA_ID,
            suggestedParams: params
        });

        // Transaction 3: User → Platform
        const platformTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: userAccount.addr,
            to: PLATFORM_ADDR,
            amount: feeAmount,
            assetIndex: ASA_ID,
            suggestedParams: params
        });

        // Group transactions
        const txnGroup = [appCallTxn, providerTxn, platformTxn];
        algosdk.assignGroupID(txnGroup);

        // Sign all transactions
        const signedTxns = txnGroup.map(txn => txn.signTxn(userAccount.sk));

        // Submit
        console.log('📤 Submitting transaction group...');
        const { txId } = await algod.sendRawTransaction(signedTxns).do();
        console.log('⏳ Waiting for confirmation...');
        await algosdk.waitForConfirmation(algod, txId, 4);

        // Check balance after
        const balanceAfter = await getBalance();
        const actualDeduction = balanceBefore - balanceAfter;

        console.log('\n✅ Billing transaction successful!');
        console.log(`📋 Transaction ID: ${txId}`);
        console.log(`💰 Balance after: ${balanceAfter} PLY minor`);
        console.log(`💸 Deducted: ${actualDeduction} PLY minor`);
        console.log(`🔗 View on AlgoExplorer: https://testnet.explorer.algorand.org/tx/${txId}`);

        // Verify deduction matches expected
        if (actualDeduction === grossAmount) {
            console.log('✅ Deduction matches expected amount!');
        } else {
            console.warn(`⚠️  Warning: Expected ${grossAmount}, got ${actualDeduction}`);
        }

        return true;
    } catch (error) {
        console.error('❌ Billing test failed:', error);
        if (error.response) {
            console.error('Response:', error.response.text);
        }
        return false;
    }
}

/**
 * Main test function
 */
async function main() {
    console.log('🚀 Play and Pay - Smart Contract Test\n');
    console.log('Configuration:');
    console.log(`  User: ${userAccount.addr}`);
    console.log(`  Provider: ${PROVIDER_ADDR}`);
    console.log(`  Platform: ${PLATFORM_ADDR}`);
    console.log(`  App ID: ${APP_ID}`);
    console.log(`  ASA ID: ${ASA_ID}`);
    console.log('');

    // Run test
    const success = await testBilling();

    if (success) {
        console.log('\n✅ All tests passed!');
        process.exit(0);
    } else {
        console.log('\n❌ Tests failed!');
        process.exit(1);
    }
}

// Run tests
main().catch(console.error);

