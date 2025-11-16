# 🚀 Deployment Guide — Play and Pay

**تاریخ ایجاد:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 فهرست

- [GitHub Repository Setup](#github-repository-setup)
- [Initial Commit](#initial-commit)
- [GitHub Actions](#github-actions)
- [GitHub Pages](#github-pages)
- [Security Checklist](#security-checklist)

---

## 🔧 GitHub Repository Setup

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `play-and-pay`
3. Description: "Pay-as-you-Use micro-payment platform on Algorand"
4. Visibility: Private (recommended) or Public
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Initialize Local Repository

```bash
# Navigate to project directory
cd C:\Amir\pay-as-play-project

# Initialize git (if not already initialized)
git init

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/play-and-pay.git

# Or if using SSH
git remote add origin git@github.com:YOUR_USERNAME/play-and-pay.git
```

---

## 📝 Initial Commit

### Step 1: Check .gitignore

Ensure `.gitignore` includes:
- `.env` files
- `*.mnemonic` files
- `node_modules/`
- Secrets and keys

### Step 2: Add Files

```bash
# Check status
git status

# Add all files (except those in .gitignore)
git add .

# Check what will be committed
git status
```

### Step 3: Initial Commit

```bash
# Create initial commit
git commit -m "Initial commit: Play and Pay POC

- Complete Knowledge Base
- TestNet Tools
- SDK Structure
- Documentation
- Security Best Practices"

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🔄 GitHub Actions

### Automatic Documentation Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
- Builds documentation on push to main
- Deploys to GitHub Pages (optional)

### Enable GitHub Actions

1. Go to repository Settings
2. Navigate to Actions → General
3. Enable "Allow all actions and reusable workflows"
4. Save

### Manual Trigger

```bash
# Push to trigger workflow
git push origin main
```

---

## 📄 GitHub Pages

### Option 1: Deploy Knowledge Base

1. Go to repository Settings
2. Navigate to Pages
3. Source: GitHub Actions
4. Save

Knowledge Base will be available at:
`https://YOUR_USERNAME.github.io/play-and-pay/docs/`

### Option 2: Deploy Main Site

If you have a website:
1. Build the site
2. Deploy to `gh-pages` branch
3. Configure Pages to use `gh-pages` branch

---

## 🔒 Security Checklist

### Before Pushing to GitHub

- [ ] ✅ `.env` files in `.gitignore`
- [ ] ✅ No mnemonics in code
- [ ] ✅ No API keys in code
- [ ] ✅ No secrets in config files
- [ ] ✅ `.gitignore` properly configured
- [ ] ✅ Review all files before commit

### Check for Secrets

```bash
# Search for potential secrets
grep -r "mnemonic" --include="*.js" --include="*.ts" --include="*.json" .
grep -r "api_key" --include="*.js" --include="*.ts" --include="*.json" .
grep -r "secret" --include="*.js" --include="*.ts" --include="*.json" .
```

### Remove Secrets from History (if needed)

If you accidentally committed secrets:

```bash
# Use git-filter-repo or BFG Repo-Cleaner
# Or create a new repository
```

---

## 📦 What Gets Deployed

### Included:
- ✅ Knowledge Base (`.bmad-core/knowledge/`)
- ✅ Documentation
- ✅ TestNet Tools (scripts)
- ✅ SDK Structure
- ✅ README and guides

### Excluded (via .gitignore):
- ❌ `.env` files
- ❌ Mnemonics and keys
- ❌ `node_modules/`
- ❌ Build outputs
- ❌ Logs

---

## 🔄 Regular Updates

### Daily Workflow

```bash
# Pull latest changes
git pull origin main

# Make changes
# ... edit files ...

# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Description of changes"

# Push
git push origin main
```

### Commit Message Format

```
Type: Short description

Detailed description (if needed)

- Change 1
- Change 2
```

Types:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `refactor:` Code refactoring
- `test:` Tests
- `chore:` Maintenance

---

## 🚨 Troubleshooting

### Issue: "Repository not found"

**Solution:**
```bash
# Check remote URL
git remote -v

# Update remote
git remote set-url origin https://github.com/YOUR_USERNAME/play-and-pay.git
```

### Issue: "Permission denied"

**Solution:**
1. Check GitHub credentials
2. Use Personal Access Token (not password)
3. Or use SSH keys

### Issue: "Large file warning"

**Solution:**
```bash
# Use Git LFS for large files
git lfs install
git lfs track "*.large-file"
```

---

## 📚 Related Documentation

- **Knowledge Index:** [`.bmad-core/knowledge/KNOWLEDGE_INDEX.md`](.bmad-core/knowledge/KNOWLEDGE_INDEX.md)
- **Project Status:** [`.bmad-core/knowledge/PROJECT_STATUS.md`](.bmad-core/knowledge/PROJECT_STATUS.md)
- **Security Best Practices:** [`.bmad-core/knowledge/technical/security-best-practices.md`](.bmad-core/knowledge/technical/security-best-practices.md)

---

## 🔄 به‌روزرسانی‌ها

**2025-11-04 - ورژن 1.0:**
- ایجاد فایل اولیه
- مستندسازی GitHub Repository Setup
- مستندسازی Initial Commit
- مستندسازی GitHub Actions
- مستندسازی GitHub Pages
- اضافه کردن Security Checklist
- اضافه کردن Troubleshooting

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن فعلی:** 1.0

