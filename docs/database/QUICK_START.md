# Quick Start - Database Setup

**ساده‌ترین روش برای شروع**

---

## 🚀 با Docker (توصیه می‌شود)

### Step 1: Start Database

```bash
docker-compose up -d
```

این دستور:
- PostgreSQL را در Docker start می‌کند
- Database `payasplay` را ایجاد می‌کند
- Port 5432 را expose می‌کند

### Step 2: Update `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/payasplay?schema=public"
```

### Step 3: Run Migrations

```bash
npm run db:migrate
```

### Step 4: Seed Database

```bash
npm run db:seed
```

### Step 5: Test

```bash
npm run db:test
```

---

## ✅ Done!

Database شما آماده است! 🎉

---

**Quick Start** ✅

