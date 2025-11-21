# راهنمای کامل نصب و Setup Docker - Windows

**Date:** 2025-01-XX  
**Platform:** Windows  
**Estimated Time:** 15 دقیقه

---

## 📋 Step 1: دانلود Docker Desktop

### لینک دانلود:
https://www.docker.com/products/docker-desktop/

یا مستقیم:
https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe

### سیستم مورد نیاز:
- Windows 10 64-bit: Pro, Enterprise, or Education (Build 19041 or higher)
- Windows 11 64-bit
- WSL 2 feature enabled
- Virtualization enabled in BIOS

---

## 📋 Step 2: نصب Docker Desktop

1. فایل installer را اجرا کنید
2. "Use WSL 2 instead of Hyper-V" را انتخاب کنید (توصیه می‌شود)
3. "Add shortcut to desktop" را انتخاب کنید
4. Click "Ok" برای شروع نصب
5. منتظر بمانید تا نصب کامل شود
6. **Restart کامپیوتر** (مهم!)

---

## 📋 Step 3: راه‌اندازی Docker Desktop

1. بعد از Restart، Docker Desktop را از Start Menu اجرا کنید
2. منتظر بمانید تا Docker start شود (ممکن است چند دقیقه طول بکشد)
3. در System Tray، آیکون Docker را ببینید (whale icon)
4. وقتی Docker running است، آیکون سبز می‌شود

---

## 📋 Step 4: Verify نصب

بعد از اینکه Docker Desktop running شد، Terminal را باز کنید و این دستورات را اجرا کنید:

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker-compose --version

# Check Docker is running
docker ps
```

**خروجی مورد انتظار:**
```
Docker version 24.x.x, build xxxxx
docker-compose version 1.x.x
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

---

## 📋 Step 5: Setup Database

بعد از اینکه Docker running شد:

### 1. Start Database Container

```bash
docker-compose up -d
```

این دستور:
- PostgreSQL image را download می‌کند (اولین بار)
- Container را start می‌کند
- Database `payasplay` را ایجاد می‌کند
- Port 5432 را expose می‌کند

### 2. Check Container Status

```bash
docker ps
```

باید container با نام `payasplay-db` را ببینید.

### 3. Update `.env` File

فایل `.env` را باز کنید و `DATABASE_URL` را update کنید:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/payasplay?schema=public"
```

### 4. Run Migrations

```bash
npm run db:migrate
```

این دستور:
- تمام tables را در database ایجاد می‌کند
- Relationships را ایجاد می‌کند
- Indexes را ایجاد می‌کند

### 5. Seed Database (Optional)

```bash
npm run db:seed
```

این دستور database را با test data پر می‌کند.

### 6. Test Connection

```bash
npm run db:test
```

این دستور:
- Connection را test می‌کند
- CRUD operations را test می‌کند
- همه چیز را verify می‌کند

---

## 🐛 Troubleshooting

### Error: WSL 2 installation is incomplete

**راه‌حل:**
1. WSL 2 را نصب کنید:
```bash
wsl --install
```
2. Restart کنید
3. Docker Desktop را دوباره اجرا کنید

### Error: Virtualization is not enabled

**راه‌حل:**
1. BIOS را باز کنید
2. Virtualization را enable کنید
3. Restart کنید

### Error: Docker Desktop won't start

**راه‌حل:**
1. Windows Features را بررسی کنید:
   - Windows Subsystem for Linux
   - Virtual Machine Platform
2. اگر نصب نیستند، نصب کنید
3. Restart کنید

### Error: Port 5432 is already in use

**راه‌حل:**
1. اگر PostgreSQL local نصب دارید، آن را stop کنید
2. یا port را در `docker-compose.yml` تغییر دهید

---

## ✅ Checklist

- [ ] Docker Desktop downloaded
- [ ] Docker Desktop installed
- [ ] Computer restarted
- [ ] Docker Desktop running
- [ ] `docker --version` works
- [ ] `docker-compose --version` works
- [ ] `docker ps` works
- [ ] `docker-compose up -d` successful
- [ ] `.env` updated
- [ ] `npm run db:migrate` successful
- [ ] `npm run db:seed` successful (optional)
- [ ] `npm run db:test` passes

---

## 🎉 بعد از Setup

بعد از اینکه همه چیز کار کرد:

### Useful Commands:

```bash
# Stop database
docker-compose down

# Start database
docker-compose up -d

# View logs
docker-compose logs

# Reset database (delete all data)
docker-compose down -v
npm run db:migrate
npm run db:seed
```

---

**Docker Setup Guide** ✅

