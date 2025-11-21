# مراحل اتصال به Database - راهنمای گام به گام

**Date:** 2025-01-XX  
**Status:** Ready to Execute

---

## 📋 پیش‌نیازها

### 1. PostgreSQL Database
شما باید یک PostgreSQL database داشته باشید:

**گزینه‌ها:**
- **Local PostgreSQL:** نصب شده روی سیستم شما
- **Docker:** استفاده از Docker Compose
- **Cloud:** Supabase, Railway, Neon, etc.

---

## 🚀 مراحل Setup

### Step 1: بررسی فایل `.env`

فایل `.env` باید شامل `DATABASE_URL` باشد:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/payasplay?schema=public"
```

**برای Local PostgreSQL:**
```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/payasplay?schema=public"
```

**برای Supabase:**
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[HOST]:5432/postgres?schema=public"
```

**برای Railway:**
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/railway"
```

---

### Step 2: Generate Prisma Client

```bash
npm run db:generate
```

این دستور Prisma Client را generate می‌کند.

---

### Step 3: Run Migrations

```bash
npm run db:migrate
```

این دستور:
- تمام tables را در database ایجاد می‌کند
- Relationships را ایجاد می‌کند
- Indexes را ایجاد می‌کند

**نکته:** اگر database خالی نیست، ممکن است نیاز به `db:reset` داشته باشید.

---

### Step 4: Seed Database (اختیاری)

```bash
npm run db:seed
```

این دستور database را با test data پر می‌کند.

---

### Step 5: Test Connection

```bash
npm run db:test
```

این دستور:
- Connection را test می‌کند
- CRUD operations را test می‌کند
- همه چیز را verify می‌کند

---

## 🧪 Testing via API

### Start Dev Server:
```bash
npm run dev
```

### Test Connection:
```bash
curl http://localhost:3000/api/db/test-connection
```

### Test CRUD:
```bash
curl http://localhost:3000/api/db/test-crud
```

---

## 🐛 Troubleshooting

### Error: Can't reach database server
- بررسی کنید PostgreSQL running است
- بررسی کنید `DATABASE_URL` درست است
- بررسی کنید firewall/network settings

### Error: Database does not exist
- ابتدا database را create کنید:
```sql
CREATE DATABASE payasplay;
```

### Error: Permission denied
- بررسی کنید user permissions
- ممکن است نیاز به `GRANT` داشته باشید

---

## ✅ Checklist

- [ ] PostgreSQL installed/running
- [ ] `.env` file configured
- [ ] `DATABASE_URL` set correctly
- [ ] `npm run db:generate` successful
- [ ] `npm run db:migrate` successful
- [ ] `npm run db:seed` successful (optional)
- [ ] `npm run db:test` passes
- [ ] API test endpoints work

---

**Database Connection Steps** ✅

