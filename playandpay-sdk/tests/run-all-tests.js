/**
 * Play and Pay SDK - Run All Tests
 * Executes all test suites
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_FILES = [
  'test-wallet.js',
  'test-billing.js',
  'test-analytics.js',
  'test-integration.js'
];

/**
 * Run a test file
 */
async function runTest(testFile) {
  const testPath = path.join(__dirname, testFile);
  
  try {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Running: ${testFile}`);
    console.log('='.repeat(60));
    
    const { stdout, stderr } = await execAsync(`node ${testPath}`, {
      cwd: path.join(__dirname, '..'),
      env: process.env
    });
    
    console.log(stdout);
    if (stderr) {
      console.error(stderr);
    }
    
    return true;
  } catch (error) {
    console.error(`\n❌ Test ${testFile} failed:`);
    console.error(error.message);
    return false;
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log('🧪 Play and Pay SDK - Running All Tests\n');
  console.log('='.repeat(60));
  console.log(`Total test suites: ${TEST_FILES.length}\n`);
  
  const results = {};
  
  for (const testFile of TEST_FILES) {
    results[testFile] = await runTest(testFile);
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Final Test Results Summary\n');
  
  const passed = Object.values(results).filter(r => r).length;
  const total = Object.keys(results).length;
  
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}`);
  });
  
  console.log(`\nPassed: ${passed}/${total}`);
  
  if (passed === total) {
    console.log('\n✅ All test suites passed!\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some test suites failed\n');
    process.exit(1);
  }
}

// Run all tests
runAllTests().catch(console.error);

