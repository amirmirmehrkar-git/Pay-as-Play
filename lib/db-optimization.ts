/**
 * Database Query Optimization Utilities
 */

import { prisma } from './prisma';

/**
 * Optimized query: Get user with wallet (single query)
 */
export async function getUserWithWallet(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      wallet: true,
    },
  });
}

/**
 * Optimized query: Get transactions with pagination
 */
export async function getTransactionsPaginated(
  userId: string,
  page: number = 1,
  limit: number = 10,
) {
  const skip = (page - 1) * limit;

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        session: {
          select: {
            id: true,
            platform: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    }),
    prisma.transaction.count({
      where: { userId },
    }),
  ]);

  return {
    transactions,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Optimized query: Get notifications with pagination
 */
export async function getNotificationsPaginated(
  userId: string,
  page: number = 1,
  limit: number = 20,
) {
  const skip = (page - 1) * limit;

  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.notification.count({
      where: { userId },
    }),
  ]);

  return {
    notifications,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Batch operations helper
 */
export async function batchOperation<T>(
  items: T[],
  operation: (item: T) => Promise<any>,
  batchSize: number = 10,
): Promise<any[]> {
  const results: any[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(operation));
    results.push(...batchResults);
  }
  
  return results;
}

