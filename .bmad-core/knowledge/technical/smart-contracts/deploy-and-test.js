/**
 * Play and Pay - Deploy and Test
 * Complete workflow: Check funding → Deploy → Test
 * 
 * Usage:
 *   node deploy-and-test.js
 */

require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Check if deployment completed
 */
function isDeploymentComplete() {
    const asaId = process.env.ASA_ID;
    const appId = process.env.APP_ID;
    return asaId && appId && asaId !== '' && appId !== '';
}

/**
 * Run deployment
 */
function runDeployment() {
    return new Promise((resolve, reject) => {
        const deploymentScript = path.join(__dirname, 'complete-deployment.js');
        
        console.log('\n🚀 Running deployment...\n');
        
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
 * Run tests
 */
function runTests() {
    return new Promise((resolve, reject) => {
        const testScript = path.join(__dirname, 'test-contract.js');
        
        console.log('\n🧪 Running contract tests...\n');
        
        const child = exec(`node "${testScript}"`, (error, stdout, stderr) => {
            if (error) {
                // Don't reject, just log (tests might have expected failures)
                console.error(stderr);
                resolve(false);
                return;
            }
            
            console.log(stdout);
            if (stderr) {
                console.error(stderr);
            }
            
            resolve(true);
        });
        
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
    });
}

/**
 * Main function
 */
async function main() {
    console.log('🚀 Play and Pay - Deploy and Test Workflow\n');
    console.log('='.repeat(60));
    
    // Check if already deployed
    if (isDeploymentComplete()) {
        console.log('\n✅ Deployment already complete!');
        console.log(`   ASA ID: ${process.env.ASA_ID}`);
        console.log(`   App ID: ${process.env.APP_ID}\n`);
        
        // Run tests
        const testPassed = await runTests();
        
        if (testPassed) {
            console.log('\n✅ All tests passed!');
            console.log('✅ Sprint 1 Complete!\n');
        } else {
            console.log('\n⚠️  Some tests failed or were skipped');
            console.log('   Check test output above for details\n');
        }
        
        process.exit(testPassed ? 0 : 1);
    }
    
    // Check if accounts are funded
    console.log('\n💰 Checking account balances...\n');
    
    const algosdk = require('algosdk');
    const algod = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');
    
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
        
        try {
            const accountInfo = await algod.accountInformation(account.addr).do();
            const balance = accountInfo.amount / 1e6;
            totalBalance += balance;
            
            console.log(`${account.name}: ${balance.toFixed(4)} ALGO`);
            
            if (balance === 0) {
                allFunded = false;
            }
        } catch (error) {
            console.log(`${account.name}: 0.0000 ALGO (account not found)`);
            allFunded = false;
        }
    }
    
    console.log(`\nTotal Balance: ${totalBalance.toFixed(4)} ALGO\n`);
    
    if (!allFunded || totalBalance < 0.2) {
        console.log('❌ Accounts not fully funded!');
        console.log('   Please fund accounts from: https://bank.testnet.algorand.network');
        console.log('   Then run this script again.\n');
        process.exit(1);
    }
    
    console.log('✅ All accounts funded!\n');
    
    // Run deployment
    try {
        await runDeployment();
        
        // Reload .env to get new values
        delete require.cache[require.resolve('dotenv')];
        require('dotenv').config();
        
        // Check if deployment succeeded
        if (!isDeploymentComplete()) {
            console.log('\n⚠️  Deployment may have failed');
            console.log('   Check output above for errors\n');
            process.exit(1);
        }
        
        console.log('\n✅ Deployment successful!');
        console.log(`   ASA ID: ${process.env.ASA_ID}`);
        console.log(`   App ID: ${process.env.APP_ID}\n`);
        
        // Wait a bit for everything to settle
        console.log('⏳ Waiting 3 seconds before testing...\n');
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Run tests
        const testPassed = await runTests();
        
        if (testPassed) {
            console.log('\n✅ All tests passed!');
            console.log('✅ Sprint 1 Complete!\n');
        } else {
            console.log('\n⚠️  Some tests failed or were skipped');
            console.log('   Check test output above for details\n');
        }
        
        process.exit(testPassed ? 0 : 1);
        
    } catch (error) {
        console.error('\n❌ Deployment failed:', error.message);
        process.exit(1);
    }
}

// Run
main().catch(console.error);

