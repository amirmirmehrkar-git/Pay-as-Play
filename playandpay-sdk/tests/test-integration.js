/**
 * Play and Pay SDK - Integration Tests
 * End-to-end tests for SDK integration
 */

import { init, wallet, billing, analytics } from '../src/index.js';
import { logger } from '../src/utils.js';

// Test configuration
const TEST_CONFIG = {
  network: 'testnet',
  asaId: process.env.ASA_ID ? parseInt(process.env.ASA_ID) : null,
  providerAddr: process.env.PROVIDER_ADDR || null,
  platformAddr: process.env.PLATFORM_ADDR || null,
  appId: process.env.APP_ID ? parseInt(process.env.APP_ID) : null
};

/**
 * Test SDK initialization
 */
async function testSDKInit() {
  console.log('\n📊 Test 1: SDK Initialization\n');
  
  try {
    const sdk = init(TEST_CONFIG);
    
    console.log('✅ SDK initialized:');
    console.log('   Network:', sdk.config.network);
    console.log('   Demo mode:', sdk.config.demoMode);
    console.log('   Modules available:', Object.keys(sdk).join(', '));
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

/**
 * Test end-to-end workflow
 */
async function testEndToEndWorkflow() {
  console.log('\n📊 Test 2: End-to-End Workflow\n');
  
  try {
    init(TEST_CONFIG);
    
    // Step 1: Check balance
    console.log('   Step 1: Check balance...');
    const balance = await wallet.getBalance(process.env.USER_ADDR || 'DEMO_USER');
    console.log('   ✅ Balance:', balance, 'ALGO');
    
    // Step 2: Start session
    console.log('   Step 2: Start session...');
    const session = await billing.startSession({
      contentId: 'test-content-001',
      pricePerMinute: 0.02,
      userAddress: process.env.USER_ADDR || 'DEMO_USER'
    });
    console.log('   ✅ Session started:', session.sessionId);
    
    // Step 3: Send tick
    console.log('   Step 3: Send tick...');
    const tick = await billing.sendTick({
      sessionId: session.sessionId,
      playedMs: 60000 // 1 minute
    });
    console.log('   ✅ Tick sent:', tick.tickId);
    
    // Step 4: Stop session
    console.log('   Step 4: Stop session...');
    const result = await billing.stopSession(session.sessionId);
    console.log('   ✅ Session stopped');
    console.log('   Total charge:', result.totalChargeEUR, 'EUR');
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

/**
 * Test error handling
 */
async function testErrorHandling() {
  console.log('\n📊 Test 3: Error Handling\n');
  
  try {
    init(TEST_CONFIG);
    
    // Test invalid session
    try {
      await billing.sendTick({
        sessionId: 'invalid-session-id',
        playedMs: 60000
      });
      console.log('   ❌ Should have thrown error for invalid session');
      return false;
    } catch (error) {
      console.log('   ✅ Correctly handled invalid session error');
    }
    
    // Test invalid address
    try {
      await wallet.getBalance('invalid-address');
      console.log('   ⚠️  Invalid address handled (may not throw in demo mode)');
    } catch (error) {
      console.log('   ✅ Correctly handled invalid address error');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

/**
 * Run all integration tests
 */
async function runTests() {
  console.log('🧪 Play and Pay SDK - Integration Tests\n');
  console.log('='.repeat(60));
  
  const results = {
    sdkInit: false,
    endToEnd: false,
    errorHandling: false
  };
  
  results.sdkInit = await testSDKInit();
  results.endToEnd = await testEndToEndWorkflow();
  results.errorHandling = await testErrorHandling();
  
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
    console.log('\n✅ All integration tests passed!\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed\n');
    process.exit(1);
  }
}

// Run tests
runTests().catch(console.error);

