/**
 * Play and Pay - Auto Fund from TestNet Faucet
 * Automatically requests ALGO from TestNet Faucet for all accounts
 * 
 * Usage:
 *   node fund-from-faucet.js
 * 
 * Note: Faucet may have rate limits, so requests are made sequentially
 */

require('dotenv').config();
const https = require('https');

// TestNet Faucet URL
const FAUCET_URL = 'https://bank.testnet.algorand.network';

/**
 * Request ALGO from Faucet
 */
function requestFromFaucet(address) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({ address: address });
        
        const options = {
            hostname: 'bank.testnet.algorand.network',
            port: 443,
            path: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        
        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const result = JSON.parse(data);
                        resolve(result);
                    } catch (e) {
                        resolve({ success: true, message: 'Funds dispensed' });
                    }
                } else if (res.statusCode === 400) {
                    // Rate limit or already funded
                    resolve({ success: false, message: 'Rate limited or already funded' });
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                }
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        req.write(postData);
        req.end();
    });
}

/**
 * Wait for a delay
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main function
 */
async function main() {
    console.log('💰 Play and Pay - Auto Fund from TestNet Faucet\n');
    console.log('='.repeat(60));
    console.log('');
    
    const accounts = [
        { name: 'Creator', address: process.env.CREATOR_ADDR },
        { name: 'Provider', address: process.env.PROVIDER_ADDR },
        { name: 'Platform', address: process.env.PLATFORM_ADDR },
        { name: 'User', address: process.env.USER_ADDR }
    ];
    
    console.log('📝 Requesting ALGO from Faucet for each account...\n');
    
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        
        if (!account.address) {
            console.log(`⚠️  ${account.name}: Address not set in .env`);
            continue;
        }
        
        console.log(`${i + 1}. ${account.name} (${account.address.substring(0, 10)}...):`);
        
        try {
            const result = await requestFromFaucet(account.address);
            
            if (result.success !== false) {
                console.log(`   ✅ Success! Funds dispensed.`);
            } else {
                console.log(`   ⚠️  ${result.message || 'Rate limited or already funded'}`);
            }
            
            // Wait 2 seconds between requests to avoid rate limiting
            if (i < accounts.length - 1) {
                console.log(`   ⏳ Waiting 2 seconds before next request...\n`);
                await delay(2000);
            }
        } catch (error) {
            console.error(`   ❌ Error: ${error.message}`);
        }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Funding requests completed!');
    console.log('');
    console.log('⏳ Waiting 5 seconds for transactions to confirm...');
    await delay(5000);
    
    console.log('\n📊 Checking balances...\n');
    
    // Run check-balances script
    const { exec } = require('child_process');
    exec('node check-balances.js', (error, stdout, stderr) => {
        if (error) {
            console.error('Error checking balances:', error);
            return;
        }
        console.log(stdout);
        
        if (stdout.includes('Total Balance: 0.0000')) {
            console.log('\n⚠️  Accounts still have zero balance.');
            console.log('   This might be due to:');
            console.log('   - Rate limiting (try again in a few minutes)');
            console.log('   - Faucet temporary unavailability');
            console.log('   - Network issues');
            console.log('\n   Manual funding: https://bank.testnet.algorand.network');
        } else {
            console.log('\n✅ Accounts funded successfully!');
            console.log('   Next: Deploy Smart Contract');
        }
    });
}

// Run
main().catch(console.error);

