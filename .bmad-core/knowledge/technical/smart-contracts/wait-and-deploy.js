/**
 * Play and Pay - Wait for Funding and Deploy
 * Monitors account balances and automatically runs deployment when funded
 * 
 * Usage:
 *   node wait-and-deploy.js
 * 
 * This script will:
 * 1. Check account balances every 10 seconds
 * 2. When all accounts are funded, run complete-deployment.js
 * 3. Exit after successful deployment
 */

require('dotenv').config();
const algosdk = require('algosdk');
const { exec } = require('child_process');
const path = require('path');

// Configuration
const ALGOD_URL = process.env.ALGOD_URL || 'https://testnet-api.algonode.cloud';
const ALGOD_TOKEN = process.env.ALGOD_TOKEN || '';
const ALGOD_PORT = process.env.ALGOD_PORT || '';
const CHECK_INTERVAL = 10000; // 10 seconds

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
 * Check if all accounts are funded
 */
async function checkAllFunded() {
    const accounts = [
        { name: 'Creator', addr: process.env.CREATOR_ADDR },
        { name: 'Provider', addr: process.env.PROVIDER_ADDR },
        { name: 'Platform', addr: process.env.PLATFORM_ADDR },
        { name: 'User', addr: process.env.USER_ADDR }
    ];
    
    let totalBalance = 0;
    let allFunded = true;
    const balances = {};
    
    for (const account of accounts) {
        if (!account.addr) continue;
        
        const balance = await getBalance(account.addr);
        balances[account.name] = balance;
        totalBalance += balance;
        
        if (balance === 0) {
            allFunded = false;
        }
    }
    
    return { allFunded, totalBalance, balances };
}

/**
 * Run complete deployment
 */
function runDeployment() {
    return new Promise((resolve, reject) => {
        const deploymentScript = path.join(__dirname, 'complete-deployment.js');
        
        console.log('\n🚀 Starting deployment...\n');
        
        const child = exec(`node "${deploymentScript}"`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            
            console.log(stdout);
            if (stderr) {
                console.error(stderr);
            }
            
            resolve();
        });
        
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
    });
}

/**
 * Main function
 */
async function main() {
    console.log('⏳ Play and Pay - Waiting for Account Funding\n');
    console.log('='.repeat(60));
    console.log('\n📋 Monitoring accounts for funding...\n');
    console.log('💡 Fund your accounts from: https://bank.testnet.algorand.network\n');
    console.log('Accounts to fund:');
    console.log(`   Creator: ${process.env.CREATOR_ADDR}`);
    console.log(`   Provider: ${process.env.PROVIDER_ADDR}`);
    console.log(`   Platform: ${process.env.PLATFORM_ADDR}`);
    console.log(`   User: ${process.env.USER_ADDR}\n`);
    console.log('Checking every 10 seconds...\n');
    console.log('Press Ctrl+C to cancel\n');
    console.log('='.repeat(60));
    
    let checkCount = 0;
    
    const checkInterval = setInterval(async () => {
        checkCount++;
        
        try {
            const { allFunded, totalBalance, balances } = await checkAllFunded();
            
            // Display current balances
            process.stdout.write(`\r[Check ${checkCount}] `);
            Object.entries(balances).forEach(([name, balance]) => {
                process.stdout.write(`${name}: ${balance.toFixed(4)} ALGO  `);
            });
            process.stdout.write(`Total: ${totalBalance.toFixed(4)} ALGO`);
            
            if (allFunded && totalBalance >= 0.2) {
                clearInterval(checkInterval);
                
                console.log('\n\n✅ All accounts funded!');
                console.log('   Total Balance:', totalBalance.toFixed(4), 'ALGO');
                console.log('');
                
                // Wait 2 seconds for transactions to fully confirm
                console.log('⏳ Waiting 2 seconds for transactions to confirm...\n');
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Run deployment
                try {
                    await runDeployment();
                    console.log('\n✅ Deployment workflow completed!\n');
                    
                    // Wait a bit for everything to settle
                    console.log('⏳ Waiting 3 seconds before testing...\n');
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    
                    // Run tests
                    console.log('🧪 Running contract tests...\n');
                    const testScript = path.join(__dirname, 'test-contract.js');
                    const { exec } = require('child_process');
                    
                    exec(`node "${testScript}"`, (error, stdout, stderr) => {
                        console.log(stdout);
                        if (stderr) {
                            console.error(stderr);
                        }
                        
                        if (error) {
                            console.log('\n⚠️  Some tests failed or were skipped');
                            console.log('   Check test output above for details\n');
                        } else {
                            console.log('\n✅ All tests passed!');
                            console.log('✅ Sprint 1 Complete!\n');
                        }
                        
                        process.exit(0);
                    });
                } catch (error) {
                    console.error('\n❌ Deployment failed:', error.message);
                    process.exit(1);
                }
            }
        } catch (error) {
            console.error('\n❌ Error checking balances:', error.message);
        }
    }, CHECK_INTERVAL);
    
    // Initial check
    const { allFunded, totalBalance, balances } = await checkAllFunded();
    
    if (allFunded && totalBalance >= 0.2) {
        clearInterval(checkInterval);
        console.log('✅ Accounts already funded! Starting deployment...\n');
        
        try {
            await runDeployment();
            console.log('\n✅ Deployment workflow completed!\n');
            process.exit(0);
        } catch (error) {
            console.error('\n❌ Deployment failed:', error.message);
            process.exit(1);
        }
    } else {
        // Display initial balances
        process.stdout.write(`[Check 0] `);
        Object.entries(balances).forEach(([name, balance]) => {
            process.stdout.write(`${name}: ${balance.toFixed(4)} ALGO  `);
        });
        process.stdout.write(`Total: ${totalBalance.toFixed(4)} ALGO`);
    }
}

// Handle Ctrl+C
process.on('SIGINT', () => {
    console.log('\n\n⚠️  Monitoring cancelled by user');
    console.log('   You can run deployment manually: node complete-deployment.js\n');
    process.exit(0);
});

// Run
main().catch(console.error);

