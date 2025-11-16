/**
 * Play and Pay - Check Status and Deploy
 * Checks if accounts are funded, then runs deployment
 * 
 * Usage:
 *   node check-and-deploy.js
 * 
 * Run this after funding accounts
 */

require('dotenv').config();
const algosdk = require('algosdk');
const { execSync } = require('child_process');
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
    console.log('📊 Play and Pay - Status Check & Deploy\n');
    console.log('='.repeat(60));
    
    // Check balances
    console.log('\n💰 Checking Account Balances...\n');
    
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
    
    console.log(`\nTotal Balance: ${total.toFixed(4)} ALGO\n`);
    
    // Check if ready for deployment
    if (!allFunded || total < 0.2) {
        console.log('='.repeat(60));
        console.log('\n⏳ Accounts not fully funded yet!\n');
        console.log('📝 Next Steps:');
        console.log('   1. Fund accounts from: https://bank.testnet.algorand.network');
        console.log('   2. Wait a few seconds for confirmation');
        console.log('   3. Run this script again: node check-and-deploy.js\n');
        console.log('💡 Or run auto-monitor: node wait-and-deploy.js\n');
        process.exit(0);
    }
    
    console.log('='.repeat(60));
    console.log('\n✅ All accounts funded!');
    console.log(`   Total Balance: ${total.toFixed(4)} ALGO\n`);
    
    // Check if already deployed
    const asaId = process.env.ASA_ID;
    const appId = process.env.APP_ID;
    
    if (asaId && appId) {
        console.log('✅ Deployment already complete!');
        console.log(`   ASA ID: ${asaId}`);
        console.log(`   App ID: ${appId}\n`);
        console.log('📚 Next Steps:');
        console.log('   - Test contract: node test-contract.js');
        console.log('   - Update SPRINT1_EXECUTION_LOG.md\n');
        process.exit(0);
    }
    
    // Run deployment
    console.log('🚀 Starting deployment...\n');
    console.log('='.repeat(60));
    
    try {
        const deploymentScript = path.join(__dirname, 'complete-deployment.js');
        execSync(`node "${deploymentScript}"`, { stdio: 'inherit' });
        
        console.log('\n' + '='.repeat(60));
        console.log('✅ Deployment completed successfully!\n');
        console.log('📚 Next Steps:');
        console.log('   1. Test contract: node test-contract.js');
        console.log('   2. Update SPRINT1_EXECUTION_LOG.md');
        console.log('   3. Begin Task 1.4: Testing\n');
    } catch (error) {
        console.error('\n❌ Deployment failed:', error.message);
        console.log('\n💡 Troubleshooting:');
        console.log('   - Check account balances');
        console.log('   - Verify TEAL files exist');
        console.log('   - Check network connection\n');
        process.exit(1);
    }
}

main().catch(console.error);

