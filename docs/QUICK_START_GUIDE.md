# Quick Start Guide - Pay as Play

**Version:** 1.0.0  
**Last Updated:** 2025-01-XX

---

## 🚀 Quick Start

This guide helps you get started with Pay as Play quickly.

---

## 📋 Prerequisites

- Node.js 20+
- npm or yarn
- PostgreSQL (or Supabase account)
- Git

---

## ⚡ Installation (5 Minutes)

### 1. Clone Repository
```bash
git clone https://github.com/your-org/pay-as-play-project.git
cd pay-as-play-project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Setup Database
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

---

## 🔧 Configuration

### Environment Variables

Required variables in `.env`:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_USE_MOCK_API="true"
```

### Database Setup

**Option 1: Supabase (Recommended)**
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string
4. Add to `.env` as `DATABASE_URL`

**Option 2: Local PostgreSQL**
1. Install PostgreSQL
2. Create database
3. Add connection string to `.env`

See [Database Setup Guide](database/DATABASE_SETUP.md) for details.

---

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm test

# Integration tests
npm run test:e2e

# With coverage
npm test -- --coverage
```

---

## 📚 Documentation

### Quick Links:
- [User Guide](user/USER_GUIDE.md) - How to use the platform
- [Developer Guide](developer/DEVELOPER_GUIDE.md) - Development setup
- [API Documentation](api/API_DOCUMENTATION.md) - API reference
- [Deployment Guide](deployment/DEPLOYMENT_GUIDE.md) - Production deployment

### Full Documentation:
See [Documentation Index](README.md) for complete list.

---

## 🚀 Deployment

### Quick Deploy to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

See [Deployment Guide](deployment/DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 🆘 Troubleshooting

### Common Issues:

**Database Connection Error:**
- Check `DATABASE_URL` in `.env`
- Verify database is running
- Check network connectivity

**Port Already in Use:**
- Change port: `npm run dev -- -p 3001`
- Or kill process using port 3000

**Migration Errors:**
- Reset database: `npm run db:migrate:reset`
- Check Prisma schema

**Test Failures:**
- Clear cache: `npm test -- --clearCache`
- Check test setup files

---

## 📞 Support

**For Help:**
- Check [Documentation Index](README.md)
- Review [Developer Guide](developer/DEVELOPER_GUIDE.md)
- See [Troubleshooting Guide](operations/OPERATIONS_MANUAL.md)

**For Issues:**
- GitHub Issues: [Link to issues]
- Email: support@payasplay.com

---

## ✅ Next Steps

1. ✅ Complete installation
2. ✅ Review documentation
3. ✅ Run tests
4. ✅ Start development
5. ✅ Deploy to production

---

**Quick Start Guide** ✅  
**Ready to Start!** 🚀

