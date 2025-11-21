/**
 * Database Connection Utilities
 * Provides connection testing and error handling
 */

import { prisma } from './prisma';

export interface ConnectionResult {
  success: boolean;
  message: string;
  error?: Error;
}

/**
 * Test database connection
 */
export async function testDatabaseConnection(): Promise<ConnectionResult> {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    return {
      success: true,
      message: 'Database connection successful',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Database connection failed',
      error: error as Error,
    };
  }
}

/**
 * Get database connection status
 */
export async function getConnectionStatus(): Promise<{
  connected: boolean;
  message: string;
}> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      connected: true,
      message: 'Connected',
    };
  } catch (error) {
    return {
      connected: false,
      message: (error as Error).message || 'Not connected',
    };
  }
}

/**
 * Disconnect from database
 */
export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
}

