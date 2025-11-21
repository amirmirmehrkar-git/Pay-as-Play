/**
 * Prisma Seed Script
 * Seeds the database with development data
 */

import { PrismaClient, UserRole, TransactionType, TransactionStatus } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.transaction.deleteMany();
  await prisma.session.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.platform.deleteMany();
  await prisma.withdrawal.deleteMany();
  await prisma.lmsConnection.deleteMany();
  await prisma.autoTopupSettings.deleteMany();
  await prisma.notificationSettings.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.user.deleteMany();

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);
  const partnerPassword = await bcrypt.hash('partner123', 10);

  // Create users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@payasplay.com',
      passwordHash: adminPassword,
      name: 'Admin User',
      role: UserRole.ADMIN,
      emailVerified: true,
      onboardingCompleted: true,
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      passwordHash: userPassword,
      name: 'Test User',
      role: UserRole.USER,
      emailVerified: true,
      onboardingCompleted: true,
    },
  });

  const partner = await prisma.user.create({
    data: {
      email: 'partner@example.com',
      passwordHash: partnerPassword,
      name: 'Partner User',
      role: UserRole.PARTNER,
      emailVerified: true,
      onboardingCompleted: true,
    },
  });

  // Create wallets
  const adminWallet = await prisma.wallet.create({
    data: {
      userId: admin.id,
      balance: 1000.00,
      currency: 'EUR',
      averageMinuteCost: 0.45,
    },
  });

  const userWallet = await prisma.wallet.create({
    data: {
      userId: user.id,
      balance: 50.00,
      currency: 'EUR',
      averageMinuteCost: 0.50,
    },
  });

  // Create transactions
  await prisma.transaction.createMany({
    data: [
      {
        userId: user.id,
        walletId: userWallet.id,
        type: TransactionType.topup,
        amount: 50.00,
        currency: 'EUR',
        status: TransactionStatus.completed,
        paymentMethod: 'card',
        description: 'Initial top-up',
      },
      {
        userId: user.id,
        walletId: userWallet.id,
        type: TransactionType.payment,
        amount: -2.50,
        currency: 'EUR',
        status: TransactionStatus.completed,
        description: 'Payment for content',
      },
    ],
  });

  // Create notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: user.id,
        type: 'low_balance',
        title: 'Low Balance Warning',
        message: 'Your balance is running low. Current balance: 5.50 EUR',
        read: false,
        actionUrl: '/wallet',
      },
      {
        userId: user.id,
        type: 'auto_topup',
        title: 'Auto-top-up Completed',
        message: 'Auto-top-up completed: +50.00 EUR',
        read: false,
        actionUrl: '/wallet',
      },
    ],
  });

  // Create notification settings
  await prisma.notificationSettings.create({
    data: {
      userId: user.id,
      lowBalanceThreshold: 10.00,
      notificationEmail: 'user@example.com',
      typePreferences: {
        low_balance: { enabled: true, channels: { inApp: true, email: true, push: false } },
        auto_topup: { enabled: true, channels: { inApp: true, email: true, push: false } },
      },
    },
  });

  // Create auto top-up settings
  await prisma.autoTopupSettings.create({
    data: {
      userId: user.id,
      enabled: false,
      threshold: 5.00,
      amount: 25.00,
      paymentMethodId: 'card_123',
    },
  });

  // Create platform
  await prisma.platform.create({
    data: {
      userId: partner.id,
      name: 'Test Video Platform',
      type: 'video',
      description: 'Test platform for development',
      status: 'active',
    },
  });

  console.log('✅ Seeding completed!');
  console.log('📧 Admin: admin@payasplay.com / admin123');
  console.log('📧 User: user@example.com / user123');
  console.log('📧 Partner: partner@example.com / partner123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

