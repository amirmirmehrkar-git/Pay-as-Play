/**
 * Play and Pay - TestNet Account Setup Script
 * Creates TestNet accounts for development
 * 
 * Usage:
 *   node setup-testnet-account.js
 * 
 * Output:
 *   - Creates .env file with account details
 *   - Displays account addresses and mnemonics
 *   - Provides Faucet links
 */

require('dotenv').config();
const algosdk = require('algosdk');
const fs = require('fs');
const path = require('path');

// Configuration
const NETWORK = 'testnet';
const ALGOD_URL = 'https://testnet-api.algonode.cloud';
const ALGOD_TOKEN = '';
const ALGOD_PORT = '';

// Initialize Algod client
const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_URL, ALGOD_PORT);

/**
 * Generate a new TestNet account
 */
function generateAccount() {
    const account = algosdk.generateAccount();
    const mnemonic = algosdk.secretKeyToMnemonic(account.sk);
    
    return {
        address: account.addr,
        mnemonic: mnemonic,
        publicKey: Buffer.from(account.addr).toString('hex')
    };
}

/**
 * Check account balance
 */
async function getBalance(address) {
    try {
        const accountInfo = await algod.accountInformation(address).do();
        return accountInfo.amount / 1e6; // Convert microAlgos to Algos
    } catch (error) {
        console.error('Error getting balance:', error.message);
        return 0;
    }
}

/**
 * Main function
 */
async function main() {
    console.log('🚀 Play and Pay - TestNet Account Setup\n');
    console.log('='.repeat(50));
    console.log('');
    
    // Generate accounts
    console.log('📝 Generating TestNet accounts...\n');
    
    const creator = generateAccount();
    const provider = generateAccount();
    const platform = generateAccount();
    const user = generateAccount();
    
    console.log('✅ Accounts generated successfully!\n');
    
    // Display account information
    console.log('📋 Account Details:\n');
    
    console.log('1️⃣  CREATOR Account (for deploying contracts):');
    console.log(`   Address: ${creator.address}`);
    console.log(`   Mnemonic: ${creator.mnemonic}`);
    console.log(`   Balance: 0 ALGO (needs funding from Faucet)`);
    console.log('');
    
    console.log('2️⃣  PROVIDER Account (receives payments):');
    console.log(`   Address: ${provider.address}`);
    console.log(`   Mnemonic: ${provider.mnemonic}`);
    console.log(`   Balance: 0 ALGO (needs funding from Faucet)`);
    console.log('');
    
    console.log('3️⃣  PLATFORM Account (receives fees):');
    console.log(`   Address: ${platform.address}`);
    console.log(`   Mnemonic: ${platform.mnemonic}`);
    console.log(`   Balance: 0 ALGO (needs funding from Faucet)`);
    console.log('');
    
    console.log('4️⃣  USER Account (for testing):');
    console.log(`   Address: ${user.address}`);
    console.log(`   Mnemonic: ${user.mnemonic}`);
    console.log(`   Balance: 0 ALGO (needs funding from Faucet)`);
    console.log('');
    
    // Create .env file
    const envPath = path.join(__dirname, '.env');
    const envContent = `# Play and Pay - TestNet Configuration
# Generated: ${new Date().toISOString()}

# Network
NETWORK=testnet
ALGOD_URL=${ALGOD_URL}
ALGOD_TOKEN=${ALGOD_TOKEN}
ALGOD_PORT=${ALGOD_PORT}
INDEXER_URL=https://testnet-idx.algonode.cloud
INDEXER_TOKEN=
INDEXER_PORT=

# Creator Account (for deploying contracts)
CREATOR_ADDR=${creator.address}
CREATOR_MNEMONIC=${creator.mnemonic}

# Provider Account (receives payments)
PROVIDER_ADDR=${provider.address}
PROVIDER_MNEMONIC=${provider.mnemonic}

# Platform Account (receives fees)
PLATFORM_ADDR=${platform.address}
PLATFORM_MNEMONIC=${platform.mnemonic}

# User Account (for testing)
USER_ADDR=${user.address}
USER_MNEMONIC=${user.mnemonic}

# ASA Configuration (will be set after ASA creation)
ASA_ID=

# Smart Contract Configuration (will be set after deployment)
APP_ID=

# Fee Configuration
PLATFORM_FEE_BPS=500
MIN_RATE=1
MAX_RATE=1000
`;

    try {
        fs.writeFileSync(envPath, envContent);
        console.log('✅ .env file created successfully!');
        console.log(`   Location: ${envPath}\n`);
    } catch (error) {
        console.error('❌ Error creating .env file:', error.message);
        console.log('\n📋 Manual .env content:');
        console.log(envContent);
    }
    
    // Faucet instructions
    console.log('💰 Next Steps: Fund Your Accounts\n');
    console.log('1. Go to Algorand TestNet Faucet:');
    console.log('   https://bank.testnet.algorand.network\n');
    console.log('2. Request ALGO for each account:');
    console.log(`   - Creator: ${creator.address}`);
    console.log(`   - Provider: ${provider.address}`);
    console.log(`   - Platform: ${platform.address}`);
    console.log(`   - User: ${user.address}\n`);
    console.log('3. Wait for confirmation (usually instant)\n');
    console.log('4. Verify balances:');
    console.log('   node check-balances.js\n');
    
    // Security warning
    console.log('⚠️  SECURITY WARNING:');
    console.log('   - These accounts are for TESTNET ONLY');
    console.log('   - NEVER use these mnemonics on MainNet');
    console.log('   - Keep .env file secure and never commit to git');
    console.log('   - Add .env to .gitignore\n');
    
    // Save account details to separate file (for reference)
    const accountsPath = path.join(__dirname, 'testnet-accounts.json');
    const accountsData = {
        generated: new Date().toISOString(),
        network: NETWORK,
        accounts: {
            creator: {
                address: creator.address,
                mnemonic: creator.mnemonic
            },
            provider: {
                address: provider.address,
                mnemonic: provider.mnemonic
            },
            platform: {
                address: platform.address,
                mnemonic: platform.mnemonic
            },
            user: {
                address: user.address,
                mnemonic: user.mnemonic
            }
        },
        faucet: 'https://bank.testnet.algorand.network'
    };
    
    try {
        fs.writeFileSync(accountsPath, JSON.stringify(accountsData, null, 2));
        console.log('✅ Account details saved to testnet-accounts.json');
        console.log('   (Keep this file secure!)\n');
    } catch (error) {
        console.error('❌ Error saving accounts file:', error.message);
    }
    
    console.log('='.repeat(50));
    console.log('✅ Setup complete!');
    console.log('');
    console.log('📚 Next:');
    console.log('   1. Fund accounts from Faucet');
    console.log('   2. Create ASA (PlayCoin)');
    console.log('   3. Deploy Smart Contract');
    console.log('');
}

// Run
main().catch(console.error);

