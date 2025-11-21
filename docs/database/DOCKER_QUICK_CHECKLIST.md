# Docker Setup - Quick Checklist

**برای بعد از نصب Docker**

---

## ✅ مراحل سریع

### 1. Verify Docker
```bash
docker --version
docker-compose --version
docker ps
```

### 2. Start Database
```bash
docker-compose up -d
```

### 3. Check Status
```bash
docker ps
# Should see payasplay-db container
```

### 4. Update .env
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/payasplay?schema=public"
```

### 5. Run Migrations
```bash
npm run db:migrate
```

### 6. Seed Database
```bash
npm run db:seed
```

### 7. Test
```bash
npm run db:test
```

---

## 🎉 Done!

Database شما آماده است!

---

**Quick Checklist** ✅

