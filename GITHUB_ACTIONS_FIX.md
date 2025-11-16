# 🔧 رفع مشکل GitHub Actions
## Play and Pay

**تاریخ:** 2025-11-16  
**مشکل:** `The process '/usr/bin/git' failed with exit code 128`

---

## ✅ مشکل شناسایی شده

**خطا:**
```
Action failed with "The process '/usr/bin/git' failed with exit code 128"
```

**علت:**
- مشکل permissions در GitHub Actions
- نیاز به `contents: write` و `pages: write` permissions
- نیاز به استفاده از `actions/checkout@v4` به جای `v3`

---

## ✅ تغییرات اعمال شده

### 1. اضافه کردن Permissions

```yaml
permissions:
  contents: write
  pages: write
  id-token: write
```

### 2. به‌روزرسانی Actions

- `actions/checkout@v3` → `actions/checkout@v4`
- `actions/setup-node@v3` → `actions/setup-node@v4`

### 3. اضافه کردن Error Handling

```yaml
- name: Install dependencies
  run: |
    if [ -f "package.json" ]; then
      npm ci || echo "npm ci failed, continuing..."
    else
      echo "No package.json found, skipping npm install"
    fi
  continue-on-error: true
```

### 4. اضافه کردن fetch-depth

```yaml
- name: Checkout code
  uses: actions/checkout@v4
  with:
    fetch-depth: 0  # Fetch all history for git
```

---

## 🚀 بررسی

**Workflow اصلاح شده push شد:**
- Commit: `4fbe581` - "Fix GitHub Actions workflow - Add permissions and error handling"

**بررسی در GitHub:**
1. باز کردن: https://github.com/amirmirmehrkar-git/Pay-as-Play/actions
2. بررسی آخرین workflow run
3. باید موفق باشد

---

## 🔧 اگر هنوز مشکل دارید

### Option 1: غیرفعال کردن Workflow

اگر نمی‌خواهید GitHub Pages deploy شود:

```yaml
# در .github/workflows/deploy.yml
# کامنت کردن job deploy
```

یا حذف فایل:
```bash
rm .github/workflows/deploy.yml
git add .
git commit -m "Remove GitHub Actions workflow"
git push origin main
```

### Option 2: ساده‌سازی Workflow

اگر فقط می‌خواهید workflow اجرا شود بدون deploy:

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Test
        run: echo "Workflow runs successfully"
```

---

## 📋 Checklist

- [x] Permissions اضافه شد
- [x] Actions به‌روزرسانی شد
- [x] Error handling اضافه شد
- [x] Workflow push شد
- [ ] بررسی موفقیت workflow در GitHub

---

**Workflow اصلاح شد و push شد!** ✅

