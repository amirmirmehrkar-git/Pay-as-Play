# راهنمای کامل Setup Supabase - Pay as Play

**Date:** 2025-01-XX  
**Estimated Time:** 5 دقیقه  
**Status:** Step-by-Step Guide

---

## 🚀 Step 1: Sign Up در Supabase

1. بروید به: https://supabase.com
2. Click "Start your project"
3. Sign up کنید:
   - با GitHub (توصیه می‌شود)
   - یا با Email

---

## 🚀 Step 2: Create New Project

1. بعد از login، click "New Project"
2. **Organization:** اگر ندارید، یک organization ایجاد کنید
3. **Project Details:**
   - **Name:** `payasplay` (یا هر نامی که می‌خواهید)
   - **Database Password:** یک password قوی انتخاب کنید و **حتماً یادداشت کنید**
   - **Region:** نزدیک‌ترین region را انتخاب کنید
4. Click "Create new project"
5. منتظر بمانید تا project ایجاد شود (2-3 دقیقه)

---

## 🚀 Step 3: Get Connection String

1. بعد از اینکه project ایجاد شد، در Project Dashboard:
2. بروید به **Settings** (آیکون چرخ دنده در sidebar)
3. بروید به **Database**
4. در بخش **Connection string**:
   - Tab **URI** را انتخاب کنید
5. Connection string را copy کنید

**مثال:**
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

**⚠️ مهم:** Password را در connection string replace کنید با password خودتان!

---

## 🚀 Step 4: Update `.env` File

1. فایل `.env` را در root پروژه باز کنید
2. `DATABASE_URL` را پیدا کنید
3. Connection string را جایگزین کنید:

```env
DATABASE_URL="postgresql://postgres.xxxxx:YOUR_PASSWORD@aws-0-us-west-1.pooler.supabase.com:6543/postgres?schema=public"
```

**نکته:** 
- `YOUR_PASSWORD` را با password خودتان replace کنید
- اگر connection string شامل `?` است، `?schema=public` را اضافه کنید
- اگر `?` دارد، `&schema=public` استفاده کنید

---

## 🚀 Step 5: Run Migrations

بعد از اینکه `.env` را update کردید:

```bash
npm run db:migrate
```

این دستور:
- تمام tables را در Supabase database ایجاد می‌کند
- Relationships را ایجاد می‌کند
- Indexes را ایجاد می‌کند

---

## 🚀 Step 6: Seed Database (Optional)

```bash
npm run db:seed
```

این دستور database را با test data پر می‌کند.

---

## 🚀 Step 7: Test Connection

```bash
npm run db:test
```

این دستور:
- Connection را test می‌کند
- CRUD operations را test می‌کند
- همه چیز را verify می‌کند

---

## 🧪 Test via API

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

## 📊 View Data in Supabase

1. در Supabase Dashboard
2. بروید به **Table Editor**
3. تمام tables را می‌بینید
4. می‌توانید data را view/edit کنید

---

## 🐛 Troubleshooting

### Error: Password authentication failed
- ✅ Password در connection string درست است؟
- ✅ Password را از Supabase project settings copy کرده‌اید؟

### Error: Connection timeout
- ✅ Internet connection درست است؟
- ✅ Firewall blocking نیست؟

### Error: Database does not exist
- ✅ Project در Supabase ایجاد شده است؟
- ✅ منتظر مانده‌اید تا project ready شود؟

---

## ✅ Checklist

- [ ] Supabase account created
- [ ] Project created
- [ ] Database password saved
- [ ] Connection string copied
- [ ] `.env` updated with connection string
- [ ] `npm run db:migrate` successful
- [ ] `npm run db:seed` successful (optional)
- [ ] `npm run db:test` passes
- [ ] Data visible in Supabase Table Editor

---

## 🎉 Done!

Database شما در Supabase آماده است! 🎉

---

**Supabase Setup Guide** ✅

