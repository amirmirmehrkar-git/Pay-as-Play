# Data Seeding Plan - Pay as Play

**Date:** 2025-01-XX  
**ORM:** Prisma  
**Status:** Planning

---

## 📋 Seeding Strategy

### Purpose:
- Development data for testing
- Demo data for demonstrations
- Test data for QA
- Initial admin user

---

## 🔧 Prisma Seeding Setup

### 1. Install Dependencies:
```bash
npm install -D ts-node
```

### 2. Configure package.json:
```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

### 3. Create Seed Script:
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed data here
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## 📊 Seed Data Structure

### 1. Users Seed Data:

```typescript
const users = [
  {
    email: 'admin@payasplay.com',
    passwordHash: 'hashed_admin_password',
    name: 'Admin User',
    role: 'ADMIN',
    emailVerified: true,
    onboardingCompleted: true,
  },
  {
    email: 'user@example.com',
    passwordHash: 'hashed_user_password',
    name: 'Test User',
    role: 'USER',
    emailVerified: true,
    onboardingCompleted: true,
  },
  {
    email: 'partner@example.com',
    passwordHash: 'hashed_partner_password',
    name: 'Partner User',
    role: 'PARTNER',
    emailVerified: true,
    onboardingCompleted: true,
  },
];
```

### 2. Wallets Seed Data:

```typescript
const wallets = [
  {
    userId: 'user_id_1',
    balance: 100.00,
    currency: 'EUR',
    averageMinuteCost: 0.45,
  },
  {
    userId: 'user_id_2',
    balance: 25.50,
    currency: 'EUR',
    averageMinuteCost: 0.50,
  },
];
```

### 3. Transactions Seed Data:

```typescript
const transactions = [
  {
    userId: 'user_id_1',
    walletId: 'wallet_id_1',
    type: 'topup',
    amount: 50.00,
    status: 'completed',
    paymentMethod: 'card',
    description: 'Initial top-up',
  },
  {
    userId: 'user_id_1',
    walletId: 'wallet_id_1',
    type: 'payment',
    amount: -2.50,
    status: 'completed',
    description: 'Payment for content',
  },
];
```

### 4. Platforms Seed Data:

```typescript
const platforms = [
  {
    userId: 'partner_id_1',
    name: 'Test Video Platform',
    type: 'video',
    description: 'Test platform for development',
    status: 'active',
  },
];
```

### 5. Notifications Seed Data:

```typescript
const notifications = [
  {
    userId: 'user_id_1',
    type: 'low_balance',
    title: 'Low Balance Warning',
    message: 'Your balance is running low',
    read: false,
    actionUrl: '/wallet',
  },
];
```

---

## 🔄 Seeding Workflow

### Development Seeding:
```bash
# Reset database and seed
npx prisma migrate reset

# Or seed without reset
npx prisma db seed
```

### Production Seeding:
- ⚠️ **Never run seed scripts in production**
- Use migration scripts for initial data
- Or manual data entry

---

## 📝 Seed Script Template

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data (optional)
  await prisma.transaction.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@payasplay.com',
      passwordHash: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      emailVerified: true,
      onboardingCompleted: true,
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      passwordHash: userPassword,
      name: 'Test User',
      role: 'USER',
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
        type: 'topup',
        amount: 50.00,
        currency: 'EUR',
        status: 'completed',
        paymentMethod: 'card',
        description: 'Initial top-up',
      },
      {
        userId: user.id,
        walletId: userWallet.id,
        type: 'payment',
        amount: -2.50,
        currency: 'EUR',
        status: 'completed',
        description: 'Payment for content',
      },
    ],
  });

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## 🔐 Security Considerations

### Password Hashing:
- Always hash passwords before seeding
- Use bcrypt or similar
- Never store plain text passwords

### Sensitive Data:
- Don't seed real user data
- Use test/demo data only
- Remove sensitive information

---

## 📊 Seed Data Categories

### 1. Development Data:
- Test users with known passwords
- Sample transactions
- Mock platforms
- Test notifications

### 2. Demo Data:
- Realistic user scenarios
- Complete user journeys
- Sample analytics data

### 3. Test Data:
- Edge cases
- Boundary values
- Error scenarios

---

## 🔄 Environment-Specific Seeding

### Development:
```typescript
if (process.env.NODE_ENV === 'development') {
  // Seed development data
  await seedDevelopmentData();
}
```

### Staging:
```typescript
if (process.env.NODE_ENV === 'staging') {
  // Seed staging data (more realistic)
  await seedStagingData();
}
```

### Production:
```typescript
// Never seed in production
if (process.env.NODE_ENV === 'production') {
  throw new Error('Seeding not allowed in production');
}
```

---

## 📝 Seeding Checklist

### Before Seeding:
- [ ] Define seed data structure
- [ ] Create seed script
- [ ] Test seed script
- [ ] Verify data integrity

### During Seeding:
- [ ] Clear existing data (if needed)
- [ ] Create seed data in correct order
- [ ] Handle relationships correctly

### After Seeding:
- [ ] Verify seed data
- [ ] Test application with seed data
- [ ] Document seed data

---

## 📚 Resources

- [Prisma Seeding Guide](https://www.prisma.io/docs/guides/database/seed-database)
- [Database Seeding Best Practices](https://www.prisma.io/docs/guides/database/seed-database)

---

**Seeding Plan Complete** ✅

