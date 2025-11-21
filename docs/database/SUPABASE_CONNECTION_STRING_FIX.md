# Fix Supabase Connection String

**مشکل:** Connection string شامل کاراکترهای خاص است که باید escape شوند.

---

## 🔧 راه‌حل

### Password با کاراکترهای خاص

اگر password شما شامل کاراکترهای خاص است (مثل `!`, `#`, `*`, `@`, etc.)، باید آن‌ها را URL-encode کنید:

**کاراکترهای خاص و معادل URL-encoded:**
- `!` → `%21`
- `#` → `%23`
- `*` → `%2A`
- `@` → `%40`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`

### مثال:

**Password:** `PayasPlay20Mehr!#**`

**URL-encoded:** `PayasPlay20Mehr%21%23%2A%2A`

**Connection String:**
```env
DATABASE_URL="postgresql://postgres:PayasPlay20Mehr%21%23%2A%2A@db.hsbhqahaptoizorubpgx.supabase.co:5432/postgres?schema=public"
```

---

## 🚀 راه‌حل سریع

### Option 1: استفاده از Pooler (توصیه می‌شود)

در Supabase Dashboard:
1. Settings → Database
2. Connection string → **Session mode** (به جای Direct connection)
3. Connection string را copy کنید
4. Password را URL-encode کنید

### Option 2: تغییر Password

در Supabase:
1. Settings → Database
2. Reset database password
3. یک password ساده انتخاب کنید (فقط حروف و اعداد)
4. Connection string جدید را copy کنید

---

## ✅ Format صحیح Connection String

```env
DATABASE_URL="postgresql://postgres:[URL-ENCODED-PASSWORD]@[HOST]:[PORT]/postgres?schema=public"
```

**نکات:**
- Password باید URL-encoded باشد
- `?schema=public` باید اضافه شود
- اگر `?` وجود دارد، از `&schema=public` استفاده کنید

---

**Connection String Fix Guide** ✅

