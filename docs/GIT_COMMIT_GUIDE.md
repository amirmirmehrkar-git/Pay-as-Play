# راهنمای Commit و Push به GitHub

**تاریخ:** 2025-11-21  
**وضعیت:** ⚠️ تغییرات زیادی commit نشده‌اند

---

## 📊 وضعیت فعلی Git

### ✅ Repository متصل است:
```
origin: https://github.com/amirmirmehrkar-git/Pay-as-Play.git
```

### ⚠️ تغییرات Commit نشده:
- **Modified Files:** فایل‌های زیادی تغییر کرده‌اند
- **Untracked Files:** فایل‌های جدید زیادی اضافه شده‌اند
- **`.next/` Directory:** باید در `.gitignore` باشد (build files)

---

## 🚀 مراحل Commit و Push

### 1️⃣ بررسی `.gitignore`
مطمئن شوید که فایل‌های build در `.gitignore` هستند:
- `.next/`
- `node_modules/`
- `.env`
- `coverage/`

### 2️⃣ Add کردن تغییرات
```bash
# Add همه فایل‌های جدید و تغییر یافته
git add .

# یا فقط فایل‌های خاص:
git add docs/
git add components/
git add app/
git add lib/
git add prisma/
git add *.ts *.tsx *.json
```

### 3️⃣ Commit کردن
```bash
git commit -m "feat: Complete all 10 sprints - Production ready

- Complete Sprint 4-10 (37 stories, 216 points)
- Add all features: Wallet, Analytics, Notifications, Onboarding
- Database integration (Supabase)
- CI/CD pipeline ready
- Security hardening
- Performance optimization
- Comprehensive documentation
- UI improvements (Heroicons, fonts, 44 platforms)
- Fix Next.js 16 compatibility
- Year-end summary (2025-11-21)"
```

### 4️⃣ Push به GitHub
```bash
git push origin main
```

---

## 📝 توصیه‌ها

### قبل از Commit:
1. ✅ بررسی کنید که `.next/` در `.gitignore` است
2. ✅ بررسی کنید که `.env` در `.gitignore` است
3. ✅ بررسی کنید که `node_modules/` در `.gitignore` است

### Commit Message:
- از format استاندارد استفاده کنید: `feat:`, `fix:`, `docs:`, `chore:`
- توضیحات کامل بنویسید
- تاریخ و وضعیت را ذکر کنید

### بعد از Push:
1. ✅ بررسی کنید که همه فایل‌ها در GitHub هستند
2. ✅ بررسی کنید که CI/CD pipeline کار می‌کند
3. ✅ بررسی کنید که documentation در GitHub است

---

## ⚠️ هشدارها

### فایل‌هایی که نباید commit شوند:
- ❌ `.env` (شامل secrets)
- ❌ `.next/` (build files)
- ❌ `node_modules/` (dependencies)
- ❌ `coverage/` (test coverage reports)
- ❌ `*.log` (log files)

### فایل‌هایی که باید commit شوند:
- ✅ همه فایل‌های source code
- ✅ همه فایل‌های documentation
- ✅ همه فایل‌های configuration (به جز `.env`)
- ✅ همه فایل‌های test

---

## 🔍 بررسی وضعیت

### بررسی فایل‌های Untracked:
```bash
git status
```

### بررسی فایل‌های Modified:
```bash
git diff
```

### بررسی Remote:
```bash
git remote -v
```

### بررسی آخرین Commit:
```bash
git log --oneline -5
```

---

## 📦 خلاصه فایل‌های مهم

### فایل‌های جدید که باید commit شوند:
- ✅ `docs/YEAR_END_SUMMARY.md`
- ✅ `docs/GIT_COMMIT_GUIDE.md` (این فایل)
- ✅ همه فایل‌های `docs/`
- ✅ همه فایل‌های `components/`
- ✅ همه فایل‌های `app/`
- ✅ همه فایل‌های `lib/`
- ✅ همه فایل‌های `prisma/`
- ✅ همه فایل‌های `tests/`
- ✅ `middleware.ts`
- ✅ `next.config.ts`
- ✅ `package.json`
- ✅ `vercel.json`
- ✅ `.github/workflows/ci.yml`

---

**آماده برای Commit و Push!** 🚀

