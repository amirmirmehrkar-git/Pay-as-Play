# نصب Docker - راهنمای کامل

**Date:** 2025-01-XX  
**Platform:** Windows

---

## 📋 نصب Docker Desktop برای Windows

### Step 1: دانلود Docker Desktop

1. بروید به: https://www.docker.com/products/docker-desktop/
2. Download Docker Desktop for Windows
3. فایل installer را دانلود کنید

### Step 2: نصب

1. فایل installer را اجرا کنید
2. "Use WSL 2 instead of Hyper-V" را انتخاب کنید (توصیه می‌شود)
3. نصب را کامل کنید
4. Restart کنید

### Step 3: راه‌اندازی

1. Docker Desktop را start کنید
2. منتظر بمانید تا Docker running شود
3. Verify کنید:
```bash
docker --version
docker-compose --version
```

---

## ⚠️ اگر Docker نمی‌خواهید نصب کنید

### گزینه 1: استفاده از Local PostgreSQL

1. PostgreSQL را نصب کنید: https://www.postgresql.org/download/windows/
2. Database ایجاد کنید
3. `.env` را update کنید

### گزینه 2: استفاده از Cloud Database (رایگان)

**Supabase (توصیه می‌شود):**
1. Sign up: https://supabase.com
2. Create project
3. Copy connection string
4. Update `.env`

**Railway:**
1. Sign up: https://railway.app
2. Create PostgreSQL
3. Copy connection string

**Neon:**
1. Sign up: https://neon.tech
2. Create database
3. Copy connection string

---

## ✅ بعد از نصب Docker

```bash
# 1. Start database
docker-compose up -d

# 2. Check status
docker ps

# 3. Update .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/payasplay?schema=public"

# 4. Run migrations
npm run db:migrate

# 5. Seed database
npm run db:seed

# 6. Test
npm run db:test
```

---

**Docker Installation Guide** ✅

