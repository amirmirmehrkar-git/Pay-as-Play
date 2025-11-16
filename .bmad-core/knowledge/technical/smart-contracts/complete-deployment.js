/**
 * Play and Pay - Complete Deployment Workflow
 * After funding accounts, this script:
 * 1. Checks account balances
 * 2. Creates ASA (PlayCoin)
 * 3. Opts-in accounts to ASA
 * 4. Deploys Smart Contract
 * 5. Opts-in user to contract
 * 
 * Usage:
 *   node complete-deployment.js
 * 
 * Prerequisites:
 *   - Accounts funded from Faucet
 *   - .env file configured
 */

require('dotenv').config();
const algosdk = require('algosdk');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const ALGOD_URL = process.env.ALGOD_URL || 'https://testnet-api.algonode.cloud';
const ALGOD_TOKEN = process.env.ALGOD_TOKEN || '';
const ALGOD_PORT = process.env.ALGOD_PORT || '';

// Initialize Algod client
const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_URL, ALGOD_PORT);

/**
 * Check account balance
 */
async function getBalance(address) {
    try {
        const accountInfo = await algod.accountInformation(address).do();
        return accountInfo.amount / 1e6;
    } catch (error) {
        return 0;
    }
}

/**
 * Check if account has opted in to asset
 */
async function isOptedInToAsset(address, assetId) {
    try {
        const accountInfo = await algod.accountInformation(address).do();
        return accountInfo.assets?.some(a => a['asset-id'] === assetId) || false;
    } catch (error) {
        return false;
    }
}

/**
 * Opt-in account to asset
 */
async function optInToAsset(address, mnemonic, assetId) {
    const account = algosdk.mnemonicToSecretKey(mnemonic);
    const params = await algod.getTransactionParams().do();
    
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: address,
        to: address,
        amount: 0,
        assetIndex: assetId,
        suggestedParams: params
    });
    
    const signed = txn.signTxn(account.sk);
    const { txId } = await algod.sendRawTransaction(signed).do();
    await algosdk.waitForConfirmation(algod, txId, 4);
    
    return txId;
}

/**
 * Create ASA (PlayCoin)
 */
async function createASA() {
    console.log('\n📦 Step 2: Creating ASA (PlayCoin)...\n');
    
    const creatorMnemonic = process.env.CREATOR_MNEMONIC;
    if (!creatorMnemonic) {
        throw new Error('CREATOR_MNEMONIC not set in .env');
    }
    
    const creator = algosdk.mnemonicToSecretKey(creatorMnemonic);
    
    const params = await algod.getTransactionParams().do();
    
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: creator.addr,
        total: 10_000_000,
        decimals: 2,
        defaultFrozen: false,
        unitName: 'PLY',
        assetName: 'PlayCoin',
        assetURL: 'https://playandpay.io',
        note: new Uint8Array(Buffer.from('Pay-as-you-Use micro-token')),
        suggestedParams: params
    });
    
    const signed = txn.signTxn(creator.sk);
    const { txId } = await algod.sendRawTransaction(signed).do();
    const confirmation = await algosdk.waitForConfirmation(algod, txId, 4);
    const assetId = confirmation['asset-index'];
    
    console.log(`✅ ASA Created!`);
    console.log(`   Asset ID: ${assetId}`);
    console.log(`   Transaction: ${txId}`);
    console.log(`   View: https://testnet.explorer.algorand.org/tx/${txId}\n`);
    
    // Update .env
    updateEnvFile('ASA_ID', assetId.toString());
    
    return assetId;
}

/**
 * Opt-in all accounts to ASA
 */
async function optInAllToASA(assetId) {
    console.log('\n🔗 Step 3: Opting-in accounts to ASA...\n');
    
    const accounts = [
        { name: 'Creator', addr: process.env.CREATOR_ADDR, mnemonic: process.env.CREATOR_MNEMONIC },
        { name: 'Provider', addr: process.env.PROVIDER_ADDR, mnemonic: process.env.PROVIDER_MNEMONIC },
        { name: 'Platform', addr: process.env.PLATFORM_ADDR, mnemonic: process.env.PLATFORM_MNEMONIC },
        { name: 'User', addr: process.env.USER_ADDR, mnemonic: process.env.USER_MNEMONIC }
    ];
    
    for (const account of accounts) {
        if (!account.addr || !account.mnemonic) continue;
        
        const isOptedIn = await isOptedInToAsset(account.addr, assetId);
        
        if (isOptedIn) {
            console.log(`✅ ${account.name} already opted in`);
        } else {
            try {
                const txId = await optInToAsset(account.addr, account.mnemonic, assetId);
                console.log(`✅ ${account.name} opted in: ${txId}`);
            } catch (error) {
                console.error(`❌ ${account.name} opt-in failed:`, error.message);
            }
        }
    }
}

/**
 * Deploy Smart Contract
 */
async function deployContract() {
    console.log('\n🚀 Step 4: Deploying Smart Contract...\n');
    
    const approvalPath = path.join(__dirname, 'usage_contract_approval.teal');
    const clearPath = path.join(__dirname, 'usage_contract_clear.teal');
    
    if (!fs.existsSync(approvalPath) || !fs.existsSync(clearPath)) {
        throw new Error('TEAL files not found. Run: python usage-contract.py');
    }
    
    const approvalProgram = fs.readFileSync(approvalPath, 'utf8');
    const clearProgram = fs.readFileSync(clearPath, 'utf8');
    
    const approvalCompiled = await algod.compile(approvalProgram).do();
    const clearCompiled = await algod.compile(clearProgram).do();
    
    const creator = algosdk.mnemonicToSecretKey(process.env.CREATOR_MNEMONIC);
    const params = await algod.getTransactionParams().do();
    
    const appArgs = [
        algosdk.encodeAddress(Buffer.from(algosdk.decodeAddress(process.env.PROVIDER_ADDR).publicKey)),
        algosdk.encodeAddress(Buffer.from(algosdk.decodeAddress(process.env.PLATFORM_ADDR).publicKey)),
        algosdk.encodeUint64(parseInt(process.env.PLATFORM_FEE_BPS || '500')),
        algosdk.encodeUint64(parseInt(process.env.MIN_RATE || '1')),
        algosdk.encodeUint64(parseInt(process.env.MAX_RATE || '1000'))
    ];
    
    const txn = algosdk.makeApplicationCreateTxnFromObject({
        from: creator.addr,
        suggestedParams: params,
        onComplete: algosdk.OnApplicationComplete.NoOpOC,
        approvalProgram: new Uint8Array(Buffer.from(approvalCompiled.result, 'base64')),
        clearProgram: new Uint8Array(Buffer.from(clearCompiled.result, 'base64')),
        numGlobalByteSlices: 0,
        numGlobalInts: 5,
        numLocalByteSlices: 1,
        numLocalInts: 0,
        appArgs: appArgs
    });
    
    const signed = txn.signTxn(creator.sk);
    const { txId } = await algod.sendRawTransaction(signed).do();
    const confirmation = await algosdk.waitForConfirmation(algod, txId, 4);
    const appId = confirmation['application-index'];
    
    console.log(`✅ Contract Deployed!`);
    console.log(`   App ID: ${appId}`);
    console.log(`   Transaction: ${txId}`);
    console.log(`   View: https://testnet.explorer.algorand.org/tx/${txId}`);
    console.log(`   App: https://testnet.explorer.algorand.org/app/${appId}\n`);
    
    // Update .env
    updateEnvFile('APP_ID', appId.toString());
    
    return appId;
}

/**
 * Opt-in user to contract
 */
async function optInUserToContract(appId) {
    console.log('\n🔗 Step 5: Opting-in User to Contract...\n');
    
    const userMnemonic = process.env.USER_MNEMONIC;
    if (!userMnemonic) {
        console.log('⚠️  USER_MNEMONIC not set, skipping user opt-in');
        return;
    }
    
    const user = algosdk.mnemonicToSecretKey(userMnemonic);
    const params = await algod.getTransactionParams().do();
    
    const txn = algosdk.makeApplicationOptInTxnFromObject({
        from: user.addr,
        appIndex: appId,
        suggestedParams: params
    });
    
    const signed = txn.signTxn(user.sk);
    const { txId } = await algod.sendRawTransaction(signed).do();
    await algosdk.waitForConfirmation(algod, txId, 4);
    
    console.log(`✅ User opted in to contract`);
    console.log(`   Transaction: ${txId}\n`);
}

/**
 * Update .env file
 */
function updateEnvFile(key, value) {
    const envPath = path.join(__dirname, '.env');
    if (!fs.existsSync(envPath)) return;
    
    let content = fs.readFileSync(envPath, 'utf8');
    
    if (content.includes(`${key}=`)) {
        content = content.replace(new RegExp(`${key}=.*`), `${key}=${value}`);
    } else {
        content += `\n${key}=${value}\n`;
    }
    
    fs.writeFileSync(envPath, content);
}

/**
 * Main function
 */
async function main() {
    console.log('🚀 Play and Pay - Complete Deployment Workflow\n');
    console.log('='.repeat(60));
    
    // Step 1: Check balances
    console.log('\n💰 Step 1: Checking account balances...\n');
    
    const accounts = [
        { name: 'Creator', addr: process.env.CREATOR_ADDR },
        { name: 'Provider', addr: process.env.PROVIDER_ADDR },
        { name: 'Platform', addr: process.env.PLATFORM_ADDR },
        { name: 'User', addr: process.env.USER_ADDR }
    ];
    
    let totalBalance = 0;
    let allFunded = true;
    
    for (const account of accounts) {
        if (!account.addr) continue;
        
        const balance = await getBalance(account.addr);
        totalBalance += balance;
        
        console.log(`${account.name}: ${balance.toFixed(4)} ALGO`);
        
        if (balance === 0) {
            allFunded = false;
        }
    }
    
    console.log(`\nTotal Balance: ${totalBalance.toFixed(4)} ALGO\n`);
    
    if (!allFunded || totalBalance < 0.2) {
        console.log('❌ Accounts not funded or insufficient balance!');
        console.log('   Please fund accounts from: https://bank.testnet.algorand.network');
        console.log('   Then run this script again.\n');
        process.exit(1);
    }
    
    console.log('✅ All accounts funded!\n');
    
    // Step 2: Create ASA
    let assetId = process.env.ASA_ID ? parseInt(process.env.ASA_ID) : null;
    
    if (!assetId) {
        assetId = await createASA();
    } else {
        console.log(`\n📦 Step 2: ASA already exists (ID: ${assetId})\n`);
    }
    
    // Step 3: Opt-in to ASA
    await optInAllToASA(assetId);
    
    // Step 4: Deploy Contract
    let appId = process.env.APP_ID ? parseInt(process.env.APP_ID) : null;
    
    if (!appId) {
        appId = await deployContract();
    } else {
        console.log(`\n🚀 Step 4: Contract already deployed (App ID: ${appId})\n`);
    }
    
    // Step 5: Opt-in user to contract
    await optInUserToContract(appId);
    
    // Summary
    console.log('='.repeat(60));
    console.log('✅ Deployment Complete!\n');
    console.log('📋 Summary:');
    console.log(`   ASA ID: ${assetId}`);
    console.log(`   App ID: ${appId}`);
    console.log(`   Provider: ${process.env.PROVIDER_ADDR}`);
    console.log(`   Platform: ${process.env.PLATFORM_ADDR}`);
    console.log('\n📚 Next Steps:');
    console.log('   1. Test contract: node test-contract.js');
    console.log('   2. Update SPRINT1_EXECUTION_LOG.md');
    console.log('   3. Begin Task 1.4: Testing\n');
}

// Run
main().catch(console.error);

