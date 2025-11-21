# Update .env File - Instructions

**Password:** `PayasPlayAmir`

---

## 🔧 Update Connection String

فایل `.env` را باز کنید و `DATABASE_URL` را به این صورت تغییر دهید:

```env
DATABASE_URL="postgresql://postgres:PayasPlayAmir@db.hsbhqahaptoizorubpgx.supabase.co:5432/postgres?schema=public"
```

**نکته:** این password ساده است و نیازی به URL-encoding ندارد.

---

## ✅ بعد از Update

بعد از اینکه `.env` را update کردید، دستورات زیر را اجرا کنید:

```bash
# 1. Run migrations
npm run db:migrate

# 2. Seed database (optional)
npm run db:seed

# 3. Test connection
npm run db:test
```

---

**Update Instructions** ✅

