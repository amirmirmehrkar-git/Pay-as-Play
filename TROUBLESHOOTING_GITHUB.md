# 🔧 Troubleshooting GitHub Deployment
## Play and Pay

**Date:** 2025-11-16

---

## 🔍 بررسی مشکلات احتمالی

### 1. مشکل Authentication

**علائم:**
- خطای `Authentication failed`
- خطای `Permission denied`
- خطای `403 Forbidden`

**راه‌حل:**

#### Option A: استفاده از Personal Access Token

```bash
# 1. ایجاد Personal Access Token در GitHub
# Settings → Developer settings → Personal access tokens → Tokens (classic)
# Scopes: repo (full control)

# 2. استفاده از token در URL
git remote set-url origin https://YOUR_TOKEN@github.com/amirmirmehrkar-git/Pay-as-Play.git

# 3. Push مجدد
git push origin main
```

#### Option B: استفاده از SSH

```bash
# 1. بررسی SSH keys
ssh -T git@github.com

# 2. اگر SSH key ندارید، ایجاد کنید
ssh-keygen -t ed25519 -C "your_email@example.com"

# 3. اضافه کردن SSH key به GitHub
# Settings → SSH and GPG keys → New SSH key

# 4. تغییر remote به SSH
git remote set-url origin git@github.com:amirmirmehrkar-git/Pay-as-Play.git

# 5. Push مجدد
git push origin main
```

#### Option C: استفاده از GitHub CLI

```bash
# نصب GitHub CLI
# Windows: winget install GitHub.cli

# Login
gh auth login

# Push
git push origin main
```

---

### 2. مشکل Repository وجود ندارد

**علائم:**
- خطای `Repository not found`
- خطای `404 Not Found`

**راه‌حل:**

```bash
# 1. بررسی وجود repository در GitHub
# https://github.com/amirmirmehrkar-git/Pay-as-Play

# 2. اگر repository وجود ندارد، ایجاد کنید:
# https://github.com/new
# Name: Pay-as-Play
# Visibility: Private/Public

# 3. اضافه کردن remote
git remote add origin https://github.com/amirmirmehrkar-git/Pay-as-Play.git

# 4. Push
git push -u origin main
```

---

### 3. مشکل Branch Protection

**علائم:**
- خطای `Protected branch`
- خطای `Push rejected`

**راه‌حل:**

```bash
# 1. بررسی branch protection rules
# Repository → Settings → Branches

# 2. اگر main branch protected است:
# - استفاده از pull request
# - یا disable protection موقتاً
```

---

### 4. مشکل فایل‌های بزرگ

**علائم:**
- خطای `File too large`
- خطای `Push rejected`

**راه‌حل:**

```bash
# 1. بررسی فایل‌های بزرگ
git ls-files -z | xargs -0 du -h | sort -rh | head -20

# 2. اضافه کردن به .gitignore
echo "large-file.bin" >> .gitignore

# 3. حذف از Git history (اگر قبلاً commit شده)
git rm --cached large-file.bin
git commit -m "Remove large file"
git push origin main
```

---

### 5. مشکل Network/Connection

**علائم:**
- خطای `Connection timeout`
- خطای `Network unreachable`

**راه‌حل:**

```bash
# 1. بررسی اتصال
ping github.com

# 2. استفاده از proxy (اگر نیاز است)
git config --global http.proxy http://proxy.example.com:8080
git config --global https.proxy https://proxy.example.com:8080

# 3. افزایش timeout
git config --global http.postBuffer 524288000
```

---

## 🔍 بررسی وضعیت فعلی

### بررسی Local Repository

```bash
cd C:\Amir\pay-as-play-project

# وضعیت Git
git status

# آخرین commit
git log --oneline -5

# فایل‌های untracked
git status --porcelain
```

### بررسی Remote Repository

```bash
# بررسی remote
git remote -v

# بررسی آخرین commit در remote
git ls-remote origin

# مقایسه local و remote
git log origin/main..HEAD
```

---

## ✅ راه‌حل سریع

### اگر push ناموفق بود:

```bash
cd C:\Amir\pay-as-play-project

# 1. بررسی وضعیت
git status

# 2. اضافه کردن فایل‌های جدید
git add .

# 3. Commit
git commit -m "Update project files"

# 4. Pull (برای sync)
git pull origin main --rebase

# 5. Push مجدد
git push origin main
```

---

## 🔐 تنظیمات Authentication

### استفاده از Credential Manager

```bash
# Windows Credential Manager
git config --global credential.helper manager-core

# یا WinCred
git config --global credential.helper wincred
```

### استفاده از Personal Access Token

1. **ایجاد Token:**
   - GitHub → Settings → Developer settings
   - Personal access tokens → Tokens (classic)
   - Generate new token
   - Scopes: `repo` (full control)

2. **استفاده:**
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/amirmirmehrkar-git/Pay-as-Play.git
   ```

---

## 📝 لاگ خطاها

اگر خطایی دریافت کردید، لطفاً:

1. **کپی کردن خطای کامل**
2. **اجرای دستورات زیر:**
   ```bash
   git --version
   git config --list
   git remote -v
   git status
   ```

3. **ارسال خطا برای بررسی**

---

## 🚀 دستورات کامل Deploy

```bash
cd C:\Amir\pay-as-play-project

# 1. بررسی وضعیت
git status

# 2. اضافه کردن همه فایل‌ها
git add .

# 3. Commit
git commit -m "Deploy Play and Pay Phase 1"

# 4. Pull (برای sync)
git pull origin main --rebase

# 5. Push
git push origin main

# 6. بررسی
git log --oneline -3
```

---

**اگر مشکل ادامه داشت، لطفاً خطای دقیق را ارسال کنید.** 🔧

