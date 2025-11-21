# Production Deployment Guide - Pay as Play

**Date:** 2025-01-XX  
**Status:** Ready for Deployment

---

## 📋 Prerequisites

### Required:
- Production database (Supabase, AWS RDS, etc.)
- Hosting platform account (Vercel, AWS, etc.)
- Domain name (optional)
- Environment variables configured

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Advantages:**
- Easy Next.js deployment
- Automatic CI/CD
- Free tier available
- Built-in SSL

**Steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`
4. Configure environment variables in Vercel dashboard

---

### Option 2: AWS (EC2/ECS)

**Steps:**
1. Setup EC2 instance or ECS cluster
2. Install Node.js and dependencies
3. Run deployment script: `./scripts/deploy.sh`
4. Setup reverse proxy (Nginx)
5. Configure SSL (Let's Encrypt)

---

### Option 3: Docker

**Steps:**
1. Build Docker image: `docker build -t payasplay .`
2. Run container: `docker run -p 3000:3000 payasplay`
3. Use Docker Compose for multi-container setup

---

## 🔧 Environment Variables

### Required:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXT_PUBLIC_API_BASE_URL="https://api.payasplay.com"
NEXT_PUBLIC_USE_MOCK_API="false"
NEXT_PUBLIC_API_VERSION="v1"
```

### Optional:
```env
NEXT_PUBLIC_API_TIMEOUT="30000"
NEXT_PUBLIC_API_RETRIES="2"
NEXT_PUBLIC_API_LOGGING="false"
```

---

## 📝 Deployment Steps

### Step 1: Pre-Deployment Checklist

- [ ] Database migrations run
- [ ] Environment variables configured
- [ ] Tests passing
- [ ] Build successful
- [ ] Health check passing

### Step 2: Build Application

```bash
npm ci
npm run db:generate
npm run build
```

### Step 3: Run Migrations

```bash
npm run db:migrate
```

### Step 4: Deploy

```bash
# Using deployment script
./scripts/deploy.sh production

# Or using platform-specific commands
vercel --prod  # Vercel
```

### Step 5: Verify Deployment

```bash
# Health check
npm run health:check

# Or manually
curl https://your-domain.com/api/health
```

---

## 🔍 Post-Deployment

### Verify:
1. Application loads correctly
2. Database connection works
3. API endpoints respond
4. Health check passes
5. Error tracking works

### Monitor:
1. Application logs
2. Error tracking (Sentry, etc.)
3. Performance metrics
4. Database performance

---

## 🐛 Troubleshooting

### Build Fails:
- Check Node.js version (20+)
- Verify all dependencies installed
- Check environment variables

### Database Connection Fails:
- Verify DATABASE_URL is correct
- Check database is accessible
- Verify network/firewall settings

### Deployment Fails:
- Check CI/CD logs
- Verify environment variables
- Check build output

---

## 📚 Resources

- `scripts/deploy.sh` - Deployment script
- `scripts/health-check.sh` - Health check script
- `.github/workflows/ci.yml` - CI/CD pipeline
- `vercel.json` - Vercel configuration

---

**Deployment Guide** ✅

