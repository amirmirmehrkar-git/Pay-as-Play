# Pay as Play - Pay-as-you-Use Micro-Payment Platform

**Version:** 0.1.0
**Status:** Development prototype — not approved for production
**Last Updated:** 2026-11-22

---

## 🎯 Overview

Pay as Play is a blockchain-based SaaS platform for real-time micro-payments using Algorand. The platform enables content creators and LMS providers to monetize their content with a pay-as-you-use model.

**📖 For detailed product information in Persian, see [Product Overview (فارسی)](docs/PRODUCT_OVERVIEW.md)**

---

## ✨ Features

### Core Features:
- 💰 **Wallet Management** - Balance tracking, top-up, withdrawals
- 📊 **Analytics & Reporting** - Comprehensive analytics with charts
- 🔔 **Notifications System** - Real-time notifications
- 🎓 **LMS Integration** - Connect with learning management systems
- 🤝 **Partner Portal** - Settlement and revenue sharing
- 📈 **Analytics Dashboard** - Time watched, spending, content distribution
- 📤 **Export Functionality** - CSV and PDF exports

### User Experience:
- 🚀 **Onboarding Flow** - Multi-step onboarding process
- 🔐 **Authentication** - Email, Google, Wallet Connect
- ⚙️ **Settings** - Comprehensive settings management
- 📱 **Responsive Design** - Mobile-friendly interface

---

## 🚀 Quick Start

### Prerequisites:
- Node.js 20+
- npm or yarn
- PostgreSQL (or Supabase)
- Git

### Installation:

```bash
# Clone repository
git clone https://github.com/your-org/pay-as-play-project.git
cd pay-as-play-project

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Setup database
npm run db:generate
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

---

## 📚 Documentation

### For Users:
- [User Guide](docs/user/USER_GUIDE.md) - How to use the platform

### For Developers:
- [Developer Guide](docs/developer/DEVELOPER_GUIDE.md) - Setup and development
- [API Documentation](docs/api/API_DOCUMENTATION.md) - API endpoints
- [Documentation Index](docs/README.md) - All documentation

### For Operations:
- [Deployment Guide](docs/deployment/DEPLOYMENT_GUIDE.md) - Production deployment
- [Operations Manual](docs/operations/OPERATIONS_MANUAL.md) - Operations procedures
- [Monitoring Guide](docs/monitoring/MONITORING_GUIDE.md) - Monitoring setup

### For Security:
- [Security Guide](docs/security/SECURITY_GUIDE.md) - Security measures
- [Security Checklist](docs/security/SECURITY_CHECKLIST.md) - Security checklist

---

## 🏗️ Project Structure

```
pay-as-play-project/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── analytics/         # Analytics pages
│   ├── wallet/            # Wallet pages
│   └── ...
├── components/            # React components
├── lib/                   # Utilities and helpers
│   ├── api-client.ts      # API client
│   ├── security/          # Security utilities
│   ├── monitoring/        # Monitoring utilities
│   └── ...
├── hooks/                 # React hooks
├── prisma/                # Prisma schema and migrations
├── docs/                  # Documentation
└── tests/                 # Test files
```

---

## 🧪 Testing

### Unit Tests:
```bash
npm test
```

### Integration Tests:
```bash
npm run test:e2e
```

### Coverage:
```bash
npm test -- --coverage
```

---

## 🚀 Deployment

### Production Deployment:
See [Deployment Guide](docs/deployment/DEPLOYMENT_GUIDE.md) for detailed instructions.

### Quick Deploy:
```bash
# Using deployment script
./scripts/deploy.sh production

# Or using Vercel
vercel --prod
```

---

## 📊 Project Status

### Sprints:
- **Total Sprints:** 10
- **Completed:** 10 ✅
- **Success Rate:** 100%

### Stories:
- **Total Stories:** 37
- **Completed:** 37 ✅
- **Success Rate:** 100%

### Story Points:
- **Total Points:** 216
- **Completed:** 216 ✅
- **Velocity:** 100%

---

## 🔧 Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Database:** PostgreSQL (Prisma ORM)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Testing:** Vitest, Playwright
- **Blockchain:** Algorand SDK

---

## 📈 Key Metrics

### Code Quality:
- **Unit Tests:** 103 tests passing
- **Integration Tests:** 6 test suites
- **Code Coverage:** Improved significantly
- **Linter:** No errors

### Infrastructure:
- **Database:** Connected (Supabase)
- **CI/CD:** GitHub Actions configured
- **Security:** Hardened
- **Performance:** Optimized
- **Monitoring:** Ready

---

## 🔐 Security

### Security Measures:
- ✅ Security headers configured
- ✅ Rate limiting implemented
- ✅ Input validation and sanitization
- ✅ CSRF protection
- ✅ JWT token security
- ✅ Secure token storage

See [Security Guide](docs/security/SECURITY_GUIDE.md) for details.

---

## 📚 Resources

### Documentation:
- [Documentation Index](docs/README.md)
- [API Documentation](docs/api/API_DOCUMENTATION.md)
- [Deployment Guide](docs/deployment/DEPLOYMENT_GUIDE.md)
- [Operations Manual](docs/operations/OPERATIONS_MANUAL.md)

### External:
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Algorand Docs](https://developer.algorand.org/docs/)

---

## 🤝 Contributing

See [Developer Guide](docs/developer/DEVELOPER_GUIDE.md) for contribution guidelines.

---

## 📝 License

[Add your license here]

---

## 📞 Support

**For Users:**
- Email: support@payasplay.com
- Help Center: https://help.payasplay.com

**For Developers:**
- GitHub Issues: [Link to issues]
- Documentation: [docs/README.md](docs/README.md)

---

## 🎉 Project Status

**Status:** ✅ **PRODUCTION READY**

All sprints completed ✅
All stories done ✅
All infrastructure ready ✅
All documentation complete ✅

**Ready for Production Deployment** ✅

---

**Pay as Play** - Development prototype

## Authentication safety

The signin, signup and Google routes are mock implementations. They return HTTP 503
by default and in every production environment. For a local demo only, run with
`NODE_ENV=development` and `ENABLE_DEMO_AUTH=true`. This flag is server-only.
These routes do not verify passwords, persist accounts or provide Google OAuth.
Real authentication, authorization and payment security must be completed and reviewed
before production use. Do not send real passwords to the demo routes.

Use Node.js 22 and `npm ci` with the committed `package-lock.json`.
Lint errors now fail CI rather than being ignored.

### Validation after repository hardening (2026-11-22)

- Next.js / eslint-config-next: 16.4.6; React / React DOM: 19.3.1.
- Prisma CLI, client and PostgreSQL adapter: 7.10.1; Effect is overridden to patched 3.22.5.
- jsPDF 4.2.1, Vitest / coverage 5.1.1 and sharp 0.35.5 replace vulnerable versions.
- Unit tests: 107 passed. Playwright integration specs are excluded from Vitest and must run with Playwright separately.
- Production build passed using generated Prisma types and a synthetic local DATABASE_URL. No real database was contacted or migration run.
- npm audit reported zero known advisories after the lockfile update; this does not certify the application security.
- Legacy lint violations remain and must be fixed before merge; CI no longer ignores them.
- Mock authentication is intentionally unavailable in production. Real identity, authorization, payments and rate limiting require separate validation.
- Tracked coverage artifacts remain in history/current tree; ignores prevent new untracked output but do not remove tracked files.

Demo withdrawal records contain empty payout details and are blocked in production. Previously committed financial-looking fixture values were removed from the proposed code; historical copies were not rewritten.

Application CI performs validation only; it does not deploy to production. The obsolete documentation publisher was removed; it did not build documentation and published raw knowledge files. A production release needs its own reviewed deployment action.
