# راه‌حل‌های جایگزین - بدون Docker

**Date:** 2025-01-XX  
**Status:** Alternative Options

---

## 🚀 گزینه 1: Supabase (رایگان - توصیه می‌شود) ⭐

### مزایا:
- ✅ رایگان
- ✅ Setup سریع (5 دقیقه)
- ✅ Cloud-based
- ✅ Dashboard برای مدیریت
- ✅ Backup خودکار

### مراحل:

#### Step 1: Sign Up
1. بروید به: https://supabase.com
2. Sign up کنید (با GitHub یا Email)

#### Step 2: Create Project
1. Click "New Project"
2. Project name: `payasplay`
3. Database password: یک password قوی انتخاب کنید
4. Region: نزدیک‌ترین region
5. Click "Create new project"
6. منتظر بمانید (2-3 دقیقه)

#### Step 3: Get Connection String
1. در Project dashboard، بروید به Settings > Database
2. در بخش "Connection string" > "URI"
3. Connection string را copy کنید
4. Password را replace کنید با password خودتان

**مثال:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

#### Step 4: Update `.env`

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres?schema=public"
```

#### Step 5: Run Migrations

```bash
npm run db:migrate
```

#### Step 6: Seed Database

```bash
npm run db:seed
```

#### Step 7: Test

```bash
npm run db:test
```

---

## 🚀 گزینه 2: Railway (رایگان)

### مراحل:

#### Step 1: Sign Up
1. بروید به: https://railway.app
2. Sign up با GitHub

#### Step 2: Create Database
1. Click "New Project"
2. Click "Provision PostgreSQL"
3. Database ایجاد می‌شود

#### Step 3: Get Connection String
1. Click روی PostgreSQL service
2. در تب "Variables"
3. `DATABASE_URL` را copy کنید

#### Step 4: Update `.env`

```env
DATABASE_URL="postgresql://postgres:password@host:port/railway"
```

#### Step 5: Run Migrations

```bash
npm run db:migrate
```

---

## 🚀 گزینه 3: Neon (رایگان)

### مراحل:

#### Step 1: Sign Up
1. بروید به: https://neon.tech
2. Sign up کنید

#### Step 2: Create Database
1. Click "Create Project"
2. Project name: `payasplay`
3. Database ایجاد می‌شود

#### Step 3: Get Connection String
1. در Project dashboard
2. Connection string را copy کنید

#### Step 4: Update `.env`

```env
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname"
```

#### Step 5: Run Migrations

```bash
npm run db:migrate
```

---

## 🚀 گزینه 4: Local PostgreSQL

### مراحل:

#### Step 1: نصب PostgreSQL
1. Download: https://www.postgresql.org/download/windows/
2. نصب کنید
3. Password را یادداشت کنید

#### Step 2: ایجاد Database
1. pgAdmin را باز کنید
2. یا از command line:
```bash
psql -U postgres
CREATE DATABASE payasplay;
\q
```

#### Step 3: Update `.env`

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/payasplay?schema=public"
```

#### Step 4: Run Migrations

```bash
npm run db:migrate
```

---

## 📊 مقایسه گزینه‌ها

| گزینه | زمان Setup | هزینه | سختی | توصیه |
|-------|-----------|-------|------|-------|
| Supabase | 5 دقیقه | رایگان | آسان | ⭐⭐⭐⭐⭐ |
| Railway | 5 دقیقه | رایگان | آسان | ⭐⭐⭐⭐ |
| Neon | 5 دقیقه | رایگان | آسان | ⭐⭐⭐⭐ |
| Local PostgreSQL | 30 دقیقه | رایگان | متوسط | ⭐⭐⭐ |
| Docker | 15 دقیقه | رایگان | آسان | ⭐⭐⭐⭐ |

---

## ✅ توصیه

**برای Development:** Supabase (سریع‌ترین و ساده‌ترین)

**برای Production:** Supabase یا Railway

---

**Alternative Setup Guide** ✅

