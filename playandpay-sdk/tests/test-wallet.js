/**
 * Play and Pay SDK - Wallet Manager Tests
 * Tests wallet functionality: balance, transfer, opt-in, history
 */

import { init, wallet } from '../src/index.js';
import { logger } from '../src/utils.js';

// Test configuration
const TEST_CONFIG = {
  network: 'testnet',
  asaId: process.env.ASA_ID ? parseInt(process.env.ASA_ID) : null,
  providerAddr: process.env.PROVIDER_ADDR || null,
  platformAddr: process.env.PLATFORM_ADDR || null
};

/**
 * Test getBalance
 */
async function testGetBalance() {
  console.log('\n📊 Test 1: Get Balance\n');
  
  try {
    init(TEST_CONFIG);
    
    // Test with demo mode (no address)
    const demoBalance = await wallet.getBalance();
    console.log('✅ Demo mode balance:', demoBalance);
    
    // Test with address (if provided)
    if (process.env.USER_ADDR) {
      const realBalance = await wallet.getBalance(process.env.USER_ADDR);
      console.log('✅ Real balance:', realBalance, 'ALGO');
    } else {
      console.log('⚠️  USER_ADDR not set, skipping real balance test');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

/**
 * Test checkOptIn
 */
async function testCheckOptIn() {
  console.log('\n📊 Test 2: Check Opt-In\n');
  
  try {
    if (!TEST_CONFIG.asaId) {
      console.log('⚠️  ASA_ID not set, skipping opt-in test');
      return true;
    }
    
    if (!process.env.USER_ADDR) {
      console.log('⚠️  USER_ADDR not set, skipping opt-in test');
      return true;
    }
    
    const isOptedIn = await wallet.checkOptIn(process.env.USER_ADDR, TEST_CONFIG.asaId);
    console.log('✅ Opt-in status:', isOptedIn ? 'Opted in' : 'Not opted in');
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

/**
 * Test getTransactionHistory
 */
async function testTransactionHistory() {
  console.log('\n📊 Test 3: Transaction History\n');
  
  try {
    if (!process.env.USER_ADDR) {
      console.log('⚠️  USER_ADDR not set, skipping history test');
      return true;
    }
    
    const history = await wallet.getTransactionHistory(process.env.USER_ADDR, { limit: 5 });
    console.log('✅ Transaction history:', history.length, 'transactions');
    
    if (history.length > 0) {
      console.log('   Latest transaction:', history[0].id);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

/**
 * Run all wallet tests
 */
async function runTests() {
  console.log('🧪 Play and Pay SDK - Wallet Manager Tests\n');
  console.log('='.repeat(60));
  
  const results = {
    getBalance: false,
    checkOptIn: false,
    transactionHistory: false
  };
  
  results.getBalance = await testGetBalance();
  results.checkOptIn = await testCheckOptIn();
  results.transactionHistory = await testTransactionHistory();
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Test Results Summary\n');
  
  const passed = Object.values(results).filter(r => r).length;
  const total = Object.keys(results).length;
  
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}`);
  });
  
  console.log(`\nPassed: ${passed}/${total}`);
  
  if (passed === total) {
    console.log('\n✅ All wallet tests passed!\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed or were skipped\n');
    process.exit(1);
  }
}

// Run tests
runTests().catch(console.error);

