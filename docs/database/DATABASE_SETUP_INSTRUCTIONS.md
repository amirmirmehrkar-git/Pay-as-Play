# راهنمای Setup Database - Pay as Play

**Date:** 2025-01-XX  
**Status:** Database Connection Needed

---

## ⚠️ وضعیت فعلی

**خطا:** `Can't reach database server at localhost:5432`

این یعنی:
- PostgreSQL running نیست، یا
- `DATABASE_URL` در `.env` درست configure نشده است

---

## 🚀 راه‌حل‌ها

### گزینه 1: استفاده از Local PostgreSQL (توصیه می‌شود برای Development)

#### Step 1: نصب PostgreSQL

**Windows:**
1. Download از: https://www.postgresql.org/download/windows/
2. نصب کنید
3. Password را یادداشت کنید

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql
sudo systemctl start postgresql
```

#### Step 2: ایجاد Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE payasplay;

# Exit
\q
```

#### Step 3: Update `.env`

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/payasplay?schema=public"
```

**مثال:**
```env
DATABASE_URL="postgresql://postgres:mypassword123@localhost:5432/payasplay?schema=public"
```

---

### گزینه 2: استفاده از Docker (ساده‌ترین روش)

#### Step 1: ایجاد `docker-compose.yml`

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    container_name: payasplay-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: payasplay
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### Step 2: Run Docker Compose

```bash
docker-compose up -d
```

#### Step 3: Update `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/payasplay?schema=public"
```

---

### گزینه 3: استفاده از Cloud Database (برای Production)

#### Supabase (رایگان):
1. Sign up: https://supabase.com
2. Create new project
3. Copy connection string
4. Update `.env`:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

#### Railway (رایگان):
1. Sign up: https://railway.app
2. Create PostgreSQL database
3. Copy connection string
4. Update `.env`

#### Neon (رایگان):
1. Sign up: https://neon.tech
2. Create database
3. Copy connection string
4. Update `.env`

---

## ✅ بعد از Setup Database

### Step 1: Verify Database Running

**Local PostgreSQL:**
```bash
# Windows
# Check if service is running in Services

# Mac/Linux
pg_isready
```

**Docker:**
```bash
docker ps
# Should see postgres container running
```

### Step 2: Test Connection

```bash
# Try to connect
psql -U postgres -d payasplay
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

## 🐛 Troubleshooting

### Error: Can't reach database server
- ✅ PostgreSQL running است؟
- ✅ Port 5432 باز است؟
- ✅ `DATABASE_URL` درست است؟

### Error: Database does not exist
```sql
CREATE DATABASE payasplay;
```

### Error: Password authentication failed
- ✅ Password در `.env` درست است؟
- ✅ User permissions درست است؟

### Error: Connection refused
- ✅ Firewall blocking نیست؟
- ✅ PostgreSQL listening on port 5432 است؟

---

## 📋 Quick Start (Docker - ساده‌ترین)

```bash
# 1. Create docker-compose.yml (copy from above)

# 2. Start database
docker-compose up -d

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

## ✅ Checklist

- [ ] PostgreSQL installed/running (یا Docker)
- [ ] Database created
- [ ] `.env` updated with correct `DATABASE_URL`
- [ ] Connection tested
- [ ] Migrations run successfully
- [ ] Seed script runs successfully
- [ ] All tests pass

---

**Database Setup Instructions** ✅

