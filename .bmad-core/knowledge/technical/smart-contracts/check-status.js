/**
 * Play and Pay - Status Check
 * Quick status check for deployment readiness
 */

require('dotenv').config();
const algosdk = require('algosdk');
const fs = require('fs');
const path = require('path');

const ALGOD_URL = process.env.ALGOD_URL || 'https://testnet-api.algonode.cloud';
const algod = new algosdk.Algodv2('', ALGOD_URL, '');

async function getBalance(address) {
    try {
        const info = await algod.accountInformation(address).do();
        return info.amount / 1e6;
    } catch {
        return 0;
    }
}

async function main() {
    console.log('📊 Play and Pay - Deployment Status\n');
    console.log('='.repeat(60));
    
    // Check balances
    console.log('\n💰 Account Balances:\n');
    const accounts = [
        { name: 'Creator', addr: process.env.CREATOR_ADDR },
        { name: 'Provider', addr: process.env.PROVIDER_ADDR },
        { name: 'Platform', addr: process.env.PLATFORM_ADDR },
        { name: 'User', addr: process.env.USER_ADDR }
    ];
    
    let total = 0;
    let allFunded = true;
    
    for (const acc of accounts) {
        if (!acc.addr) continue;
        const bal = await getBalance(acc.addr);
        total += bal;
        const status = bal > 0 ? '✅' : '❌';
        console.log(`${status} ${acc.name}: ${bal.toFixed(4)} ALGO`);
        if (bal === 0) allFunded = false;
    }
    
    console.log(`\nTotal: ${total.toFixed(4)} ALGO`);
    
    // Check .env
    const envPath = path.join(__dirname, '.env');
    let asaId = process.env.ASA_ID || 'Not set';
    let appId = process.env.APP_ID || 'Not set';
    
    console.log('\n📋 Configuration:\n');
    console.log(`ASA_ID: ${asaId}`);
    console.log(`APP_ID: ${appId}`);
    
    // Check TEAL files
    const tealApproval = fs.existsSync(path.join(__dirname, 'usage_contract_approval.teal'));
    const tealClear = fs.existsSync(path.join(__dirname, 'usage_contract_clear.teal'));
    
    console.log('\n📄 Files:\n');
    console.log(`${tealApproval ? '✅' : '❌'} usage_contract_approval.teal`);
    console.log(`${tealClear ? '✅' : '❌'} usage_contract_clear.teal`);
    
    // Status summary
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 Status Summary:\n');
    
    if (allFunded && total >= 0.2) {
        console.log('✅ Ready for Deployment!');
        console.log('   Run: node complete-deployment.js\n');
    } else {
        console.log('⏳ Waiting for Funding...');
        console.log('   Fund accounts from: https://bank.testnet.algorand.network');
        console.log('   Or run: node wait-and-deploy.js (auto-monitor)\n');
    }
    
    if (asaId !== 'Not set' && appId !== 'Not set') {
        console.log('✅ Deployment Complete!');
        console.log(`   ASA ID: ${asaId}`);
        console.log(`   App ID: ${appId}`);
        console.log('   Ready for testing!\n');
    }
}

main().catch(console.error);

