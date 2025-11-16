/**
 * Play and Pay SDK - Billing Engine Tests
 * Tests billing functionality: start session, send tick, stop session
 */

import { init, billing } from '../src/index.js';
import { logger } from '../src/utils.js';

// Test configuration
const TEST_CONFIG = {
  network: 'testnet',
  asaId: process.env.ASA_ID ? parseInt(process.env.ASA_ID) : null,
  providerAddr: process.env.PROVIDER_ADDR || null,
  platformAddr: process.env.PLATFORM_ADDR || null,
  appId: process.env.APP_ID ? parseInt(process.env.APP_ID) : null,
  platformFeePct: 500 // 5%
};

/**
 * Test startSession
 */
async function testStartSession() {
  console.log('\n📊 Test 1: Start Session\n');
  
  try {
    init(TEST_CONFIG);
    
    const session = await billing.startSession({
      contentId: 'test-content-001',
      pricePerMinute: 0.02, // €0.02 per minute
      userAddress: process.env.USER_ADDR || 'DEMO_USER'
    });
    
    console.log('✅ Session started:');
    console.log('   Session ID:', session.sessionId);
    console.log('   Status:', session.status);
    console.log('   Price:', session.pricePerMinute, 'EUR/min');
    
    return session;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return null;
  }
}

/**
 * Test sendTick
 */
async function testSendTick(sessionId) {
  console.log('\n📊 Test 2: Send Tick\n');
  
  if (!sessionId) {
    console.log('⚠️  No session ID, skipping tick test');
    return false;
  }
  
  try {
    // Simulate 1 minute of playback
    const tick = await billing.sendTick({
      sessionId: sessionId,
      playedMs: 60000 // 1 minute
    });
    
    console.log('✅ Tick sent:');
    console.log('   Tick ID:', tick.tickId);
    console.log('   Minutes:', tick.minutes);
    console.log('   Charge:', tick.chargeEUR, 'EUR');
    console.log('   Payment:', tick.paymentSuccess ? 'Success' : 'Skipped (demo mode)');
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

/**
 * Test stopSession
 */
async function testStopSession(sessionId) {
  console.log('\n📊 Test 3: Stop Session\n');
  
  if (!sessionId) {
    console.log('⚠️  No session ID, skipping stop test');
    return false;
  }
  
  try {
    const result = await billing.stopSession(sessionId);
    
    console.log('✅ Session stopped:');
    console.log('   Session ID:', result.sessionId);
    console.log('   Status:', result.status);
    console.log('   Total time:', result.totalMinutes, 'minutes');
    console.log('   Total charge:', result.totalChargeEUR, 'EUR');
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

/**
 * Run all billing tests
 */
async function runTests() {
  console.log('🧪 Play and Pay SDK - Billing Engine Tests\n');
  console.log('='.repeat(60));
  
  const results = {
    startSession: false,
    sendTick: false,
    stopSession: false
  };
  
  // Start session
  const session = await testStartSession();
  results.startSession = session !== null;
  
  // Send tick
  if (session) {
    results.sendTick = await testSendTick(session.sessionId);
    
    // Stop session
    results.stopSession = await testStopSession(session.sessionId);
  }
  
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
    console.log('\n✅ All billing tests passed!\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed or were skipped\n');
    process.exit(1);
  }
}

// Run tests
runTests().catch(console.error);

