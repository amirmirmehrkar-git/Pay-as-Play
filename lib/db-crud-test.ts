/**
 * Database CRUD Operations Test Utilities
 * Used for testing database operations
 */

import { prisma } from './prisma';
import { UserRole } from '@prisma/client';

export interface CrudTestResult {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  errors: string[];
}

/**
 * Test CRUD operations
 */
export async function testCrudOperations(): Promise<CrudTestResult> {
  const result: CrudTestResult = {
    create: false,
    read: false,
    update: false,
    delete: false,
    errors: [],
  };

  try {
    // CREATE Test
    const testUser = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        passwordHash: 'test-hash',
        name: 'Test User',
        role: UserRole.USER,
      },
    });
    result.create = true;

    // READ Test
    const foundUser = await prisma.user.findUnique({
      where: { id: testUser.id },
    });
    result.read = foundUser !== null;

    // UPDATE Test
    const updatedUser = await prisma.user.update({
      where: { id: testUser.id },
      data: { name: 'Updated Test User' },
    });
    result.update = updatedUser.name === 'Updated Test User';

    // DELETE Test
    await prisma.user.delete({
      where: { id: testUser.id },
    });
    const deletedUser = await prisma.user.findUnique({
      where: { id: testUser.id },
    });
    result.delete = deletedUser === null;
  } catch (error) {
    result.errors.push((error as Error).message);
  }

  return result;
}

