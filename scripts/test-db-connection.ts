/**
 * Script to test database connection
 * Run with: tsx scripts/test-db-connection.ts
 */

import * as dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

import { testDatabaseConnection, getConnectionStatus } from '../lib/db-connection';
import { testCrudOperations } from '../lib/db-crud-test';
import { disconnectDatabase } from '../lib/db-connection';

async function main() {
  console.log('🔍 Testing database connection...\n');

  // Test connection
  const connectionResult = await testDatabaseConnection();
  console.log('Connection Test:');
  console.log(`  Success: ${connectionResult.success}`);
  console.log(`  Message: ${connectionResult.message}`);
  if (connectionResult.error) {
    console.log(`  Error: ${connectionResult.error.message}`);
  }
  console.log('');

  if (!connectionResult.success) {
    console.error('❌ Database connection failed. Please check your DATABASE_URL.');
    await disconnectDatabase();
    process.exit(1);
  }

  // Get connection status
  const status = await getConnectionStatus();
  console.log('Connection Status:');
  console.log(`  Connected: ${status.connected}`);
  console.log(`  Message: ${status.message}`);
  console.log('');

  // Test CRUD operations
  console.log('🧪 Testing CRUD operations...\n');
  const crudResult = await testCrudOperations();
  console.log('CRUD Test Results:');
  console.log(`  Create: ${crudResult.create ? '✅' : '❌'}`);
  console.log(`  Read: ${crudResult.read ? '✅' : '❌'}`);
  console.log(`  Update: ${crudResult.update ? '✅' : '❌'}`);
  console.log(`  Delete: ${crudResult.delete ? '✅' : '❌'}`);
  if (crudResult.errors.length > 0) {
    console.log(`  Errors: ${crudResult.errors.join(', ')}`);
  }
  console.log('');

  if (crudResult.create && crudResult.read && crudResult.update && crudResult.delete) {
    console.log('✅ All database tests passed!');
  } else {
    console.error('❌ Some CRUD operations failed.');
  }

  await disconnectDatabase();
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});

