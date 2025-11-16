/**
 * Play and Pay - Check TestNet Account Balances
 * 
 * Usage:
 *   node check-balances.js
 * 
 * Prerequisites:
 *   - .env file with account addresses
 */

require('dotenv').config();
const algosdk = require('algosdk');

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
        const balance = accountInfo.amount / 1e6; // Convert microAlgos to Algos
        
        // Check for assets
        const assets = accountInfo.assets || [];
        
        return {
            balance: balance,
            assets: assets
        };
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return { balance: 0, assets: [] };
        }
        throw error;
    }
}

/**
 * Main function
 */
async function main() {
    console.log('💰 Play and Pay - TestNet Account Balances\n');
    console.log('='.repeat(60));
    console.log('');
    
    const accounts = [
        { name: 'Creator', address: process.env.CREATOR_ADDR },
        { name: 'Provider', address: process.env.PROVIDER_ADDR },
        { name: 'Platform', address: process.env.PLATFORM_ADDR },
        { name: 'User', address: process.env.USER_ADDR }
    ];
    
    let totalBalance = 0;
    
    for (const account of accounts) {
        if (!account.address) {
            console.log(`⚠️  ${account.name}: Address not set in .env`);
            continue;
        }
        
        try {
            const info = await getBalance(account.address);
            totalBalance += info.balance;
            
            console.log(`${account.name}:`);
            console.log(`   Address: ${account.address}`);
            console.log(`   Balance: ${info.balance.toFixed(4)} ALGO`);
            
            if (info.assets.length > 0) {
                console.log(`   Assets: ${info.assets.length}`);
                info.assets.forEach(asset => {
                    console.log(`     - Asset ID: ${asset['asset-id']}, Amount: ${asset.amount}`);
                });
            } else {
                console.log(`   Assets: None`);
            }
            console.log('');
        } catch (error) {
            console.error(`❌ Error checking ${account.name}:`, error.message);
            console.log('');
        }
    }
    
    console.log('='.repeat(60));
    console.log(`Total Balance: ${totalBalance.toFixed(4)} ALGO`);
    console.log('');
    
    // Check if accounts need funding
    if (totalBalance === 0) {
        console.log('⚠️  All accounts have zero balance!');
        console.log('   Fund your accounts from: https://bank.testnet.algorand.network');
        console.log('');
    } else if (totalBalance < 1) {
        console.log('⚠️  Low balance detected!');
        console.log('   Consider funding accounts for deployment fees.');
        console.log('');
    } else {
        console.log('✅ Accounts have sufficient balance for testing.');
        console.log('');
    }
}

// Run
main().catch(console.error);

