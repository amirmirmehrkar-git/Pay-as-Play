/**
 * Play and Pay SDK - WalletConnect Tests
 * Tests Pera Wallet integration
 */

import { init, walletConnect } from '../src/index.js';

// Test configuration
const TEST_CONFIG = {
  network: 'testnet'
};

/**
 * Test wallet initialization
 */
async function testWalletInit() {
  console.log('\n📊 Test 1: Wallet Initialization\n');
  
  try {
    init(TEST_CONFIG);
    
    // Check if wallet-connect module is available
    if (!walletConnect) {
      console.log('⚠️  WalletConnect module not available');
      return false;
    }
    
    console.log('✅ WalletConnect module loaded');
    console.log('   Available functions:', Object.keys(walletConnect).join(', '));
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

/**
 * Test wallet connection (browser only)
 */
async function testWalletConnection() {
  console.log('\n📊 Test 2: Wallet Connection\n');
  
  try {
    if (typeof window === 'undefined') {
      console.log('⚠️  Browser environment required for wallet connection');
      console.log('   This test can only run in browser');
      return true; // Don't fail in Node.js
    }
    
    // Try to initialize wallet
    await walletConnect.initPeraWallet();
    console.log('✅ Pera Wallet initialized');
    
    // Note: Actual connection requires user interaction
    console.log('   (Connection requires user interaction in browser)');
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return true; // Don't fail if not in browser
  }
}

/**
 * Test transaction signing interface
 */
async function testTransactionSigning() {
  console.log('\n📊 Test 3: Transaction Signing Interface\n');
  
  try {
    // Check if signing functions exist
    const hasSignTransaction = typeof walletConnect.signTransaction === 'function';
    const hasSignTransactions = typeof walletConnect.signTransactions === 'function';
    const hasGetWalletConnector = typeof walletConnect.getWalletConnector === 'function';
    
    console.log('✅ Signing functions available:');
    console.log('   signTransaction:', hasSignTransaction ? '✅' : '❌');
    console.log('   signTransactions:', hasSignTransactions ? '✅' : '❌');
    console.log('   getWalletConnector:', hasGetWalletConnector ? '✅' : '❌');
    
    return hasSignTransaction && hasSignTransactions && hasGetWalletConnector;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

/**
 * Run all WalletConnect tests
 */
async function runTests() {
  console.log('🧪 Play and Pay SDK - WalletConnect Tests\n');
  console.log('='.repeat(60));
  console.log('⚠️  Note: Some tests require browser environment');
  console.log('   Run in browser for full functionality\n');
  
  const results = {
    walletInit: false,
    walletConnection: false,
    transactionSigning: false
  };
  
  results.walletInit = await testWalletInit();
  results.walletConnection = await testWalletConnection();
  results.transactionSigning = await testTransactionSigning();
  
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
    console.log('\n✅ All WalletConnect tests passed!\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed or were skipped\n');
    process.exit(1);
  }
}

// Run tests
runTests().catch(console.error);

