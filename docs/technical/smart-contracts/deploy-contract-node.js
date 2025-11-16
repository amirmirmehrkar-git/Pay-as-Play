/**
 * Play and Pay - Deploy Smart Contract (Node.js)
 * Alternative to goal CLI for deploying contract
 * 
 * Usage:
 *   node deploy-contract-node.js
 * 
 * Prerequisites:
 *   - .env file with CREATOR_MNEMONIC, PROVIDER_ADDR, PLATFORM_ADDR
 *   - TEAL files compiled (usage_contract_approval.teal, usage_contract_clear.teal)
 */

require('dotenv').config();
const algosdk = require('algosdk');
const fs = require('fs');
const path = require('path');

// Configuration
const ALGOD_URL = process.env.ALGOD_URL || 'https://testnet-api.algonode.cloud';
const ALGOD_TOKEN = process.env.ALGOD_TOKEN || '';
const ALGOD_PORT = process.env.ALGOD_PORT || '';

// Contract parameters
const PROVIDER_ADDR = process.env.PROVIDER_ADDR;
const PLATFORM_ADDR = process.env.PLATFORM_ADDR;
const PLATFORM_FEE_BPS = parseInt(process.env.PLATFORM_FEE_BPS || '500'); // 5%
const MIN_RATE = parseInt(process.env.MIN_RATE || '1');
const MAX_RATE = parseInt(process.env.MAX_RATE || '1000');

// Initialize Algod client
const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_URL, ALGOD_PORT);

/**
 * Read TEAL file
 */
function readTealFile(filename) {
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) {
        throw new Error(`TEAL file not found: ${filename}`);
    }
    return fs.readFileSync(filePath, 'utf8');
}

/**
 * Main function
 */
async function main() {
    console.log('🚀 Play and Pay - Deploy Smart Contract (Node.js)\n');
    console.log('='.repeat(60));
    console.log('');
    
    // Validate environment
    if (!process.env.CREATOR_MNEMONIC) {
        throw new Error('CREATOR_MNEMONIC not set in .env');
    }
    
    if (!PROVIDER_ADDR) {
        throw new Error('PROVIDER_ADDR not set in .env');
    }
    
    if (!PLATFORM_ADDR) {
        throw new Error('PLATFORM_ADDR not set in .env');
    }
    
    // Get creator account
    const creator = algosdk.mnemonicToSecretKey(process.env.CREATOR_MNEMONIC);
    
    console.log('📋 Configuration:');
    console.log(`   Creator: ${creator.addr}`);
    console.log(`   Provider: ${PROVIDER_ADDR}`);
    console.log(`   Platform: ${PLATFORM_ADDR}`);
    console.log(`   Fee: ${PLATFORM_FEE_BPS} basis points (${PLATFORM_FEE_BPS / 100}%)`);
    console.log(`   Min Rate: ${MIN_RATE} PLY minor/min`);
    console.log(`   Max Rate: ${MAX_RATE} PLY minor/min`);
    console.log('');
    
    // Check creator balance
    try {
        const accountInfo = await algod.accountInformation(creator.addr).do();
        const balance = accountInfo.amount / 1e6;
        console.log(`💰 Creator Balance: ${balance.toFixed(4)} ALGO`);
        
        if (balance < 0.1) {
            console.log('⚠️  Warning: Low balance! Deployment may fail.');
            console.log('   Fund account from: https://bank.testnet.algorand.network');
            console.log('');
        }
    } catch (error) {
        console.error('❌ Error checking balance:', error.message);
        throw error;
    }
    
    // Read TEAL files
    console.log('📄 Reading TEAL files...');
    const approvalProgram = readTealFile('usage_contract_approval.teal');
    const clearProgram = readTealFile('usage_contract_clear.teal');
    console.log('✅ TEAL files loaded\n');
    
    // Compile TEAL programs
    console.log('🔨 Compiling TEAL programs...');
    const approvalCompiled = await algod.compile(approvalProgram).do();
    const clearCompiled = await algod.compile(clearProgram).do();
    console.log('✅ Programs compiled\n');
    
    // Get suggested parameters
    const suggestedParams = await algod.getTransactionParams().do();
    
    // Create application creation transaction
    console.log('📝 Creating application transaction...');
    const appArgs = [
        algosdk.encodeAddress(Buffer.from(algosdk.decodeAddress(PROVIDER_ADDR).publicKey)),
        algosdk.encodeAddress(Buffer.from(algosdk.decodeAddress(PLATFORM_ADDR).publicKey)),
        algosdk.encodeUint64(PLATFORM_FEE_BPS),
        algosdk.encodeUint64(MIN_RATE),
        algosdk.encodeUint64(MAX_RATE)
    ];
    
    const txn = algosdk.makeApplicationCreateTxnFromObject({
        from: creator.addr,
        suggestedParams: suggestedParams,
        onComplete: algosdk.OnApplicationComplete.NoOpOC,
        approvalProgram: new Uint8Array(Buffer.from(approvalCompiled.result, 'base64')),
        clearProgram: new Uint8Array(Buffer.from(clearCompiled.result, 'base64')),
        numGlobalByteSlices: 0,
        numGlobalInts: 5,
        numLocalByteSlices: 1,
        numLocalInts: 0,
        appArgs: appArgs
    });
    
    // Sign transaction
    console.log('✍️  Signing transaction...');
    const signedTxn = txn.signTxn(creator.sk);
    console.log('✅ Transaction signed\n');
    
    // Submit transaction
    console.log('📤 Submitting transaction...');
    const { txId } = await algod.sendRawTransaction(signedTxn).do();
    console.log(`✅ Transaction submitted: ${txId}`);
    console.log(`🔗 View on Explorer: https://testnet.explorer.algorand.org/tx/${txId}`);
    console.log('');
    
    // Wait for confirmation
    console.log('⏳ Waiting for confirmation...');
    const confirmation = await algosdk.waitForConfirmation(algod, txId, 4);
    const appId = confirmation['application-index'];
    
    console.log('✅ Contract deployed successfully!');
    console.log('');
    console.log('📋 Deployment Details:');
    console.log(`   App ID: ${appId}`);
    console.log(`   Transaction ID: ${txId}`);
    console.log(`   Confirmed in round: ${confirmation['confirmed-round']}`);
    console.log('');
    
    // Update .env file
    console.log('📝 Updating .env file...');
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        // Update or add APP_ID
        if (envContent.includes('APP_ID=')) {
            envContent = envContent.replace(/APP_ID=.*/, `APP_ID=${appId}`);
        } else {
            envContent += `\nAPP_ID=${appId}\n`;
        }
        
        fs.writeFileSync(envPath, envContent);
        console.log('✅ .env file updated with APP_ID');
    } else {
        console.log('⚠️  .env file not found, please add manually:');
        console.log(`   APP_ID=${appId}`);
    }
    
    console.log('');
    console.log('='.repeat(60));
    console.log('✅ Deployment complete!');
    console.log('');
    console.log('📚 Next Steps:');
    console.log('   1. Opt-in users to contract');
    console.log('   2. Test contract functionality');
    console.log('   3. Update SPRINT1_EXECUTION_LOG.md');
    console.log('');
}

// Run
main().catch(console.error);

