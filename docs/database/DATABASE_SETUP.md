# Database Setup Guide

**Date:** 2025-01-XX  
**Status:** Ready for Setup

---

## 📋 Prerequisites

### Required:
- PostgreSQL database (version 12 or higher)
- Node.js and npm installed
- Prisma CLI installed

---

## 🚀 Setup Steps

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Database Connection

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your database connection string:
```env
DATABASE_URL="potgres:PayasPlay20Mehr!#**@db.hsbhqahaptoizorubpgx.supabase.co:5432/postgres?schema=public"
```

**For local PostgreSQL:**
```env
DATABASE_URL="potgres:PayasPlay20Mehr!#**@db.hsbhqahaptoizorubpgx.supabase.co:5432/postgres?schema=public"
```

**For cloud databases (e.g., Supabase, Railway, etc.):**
- Use the connection string provided by your database provider

### Step 3: Generate Prisma Client

```bash
npm run db:generate
```

### Step 4: Run Migrations

```bash
npm run db:migrate
```

This will:
- Create all tables in the database
- Create all relationships
- Create all indexes

### Step 5: Seed Database (Optional)

```bash
npm run db:seed
```

This will populate the database with test data.

### Step 6: Test Connection

```bash
npm run db:test
```

This will:
- Test database connection
- Test CRUD operations
- Verify everything works

---

## 🧪 Testing

### Test Connection via API:

```bash
# Start dev server
npm run dev

# In another terminal, test connection
curl http://localhost:3000/api/db/test-connection
```

### Test CRUD Operations:

```bash
curl http://localhost:3000/api/db/test-crud
```

---

## 📊 Database Schema

### Models (10):
1. User
2. Wallet
3. Transaction
4. Session
5. Platform
6. Notification
7. NotificationSettings
8. AutoTopupSettings
9. Withdrawal
10. LMSConnection

### Enums (11):
1. UserRole
2. TransactionType
3. TransactionStatus
4. SessionStatus
5. PlatformType
6. NotificationType
7. NotificationDeliveryMethod
8. WithdrawalMethod
9. WithdrawalStatus
10. LMSProvider
11. LMSConnectionStatus

---

## 🔧 Useful Commands

### Prisma Studio (Database GUI):
```bash
npm run db:studio
```

### Reset Database:
```bash
npm run db:reset
```

### Create New Migration:
```bash
npm run db:migrate
```

---

## 🐛 Troubleshooting

### Connection Error:
- Check DATABASE_URL in `.env`
- Verify database is running
- Check firewall/network settings
- Verify database credentials

### Migration Error:
- Make sure database is empty or use `db:reset`
- Check Prisma schema for errors
- Verify database user has CREATE TABLE permissions

### Seed Error:
- Make sure migrations have run
- Check for duplicate data
- Verify bcrypt is installed

---

## ✅ Verification Checklist

- [ ] Database connection successful
- [ ] Migrations run successfully
- [ ] All tables created
- [ ] Seed script runs successfully
- [ ] CRUD operations work
- [ ] Prisma Studio opens correctly

---

**Database Setup Complete** ✅

