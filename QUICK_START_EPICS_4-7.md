# 🚀 راهنمای شروع فردا - Epics 4 تا 7

**تاریخ ایجاد:** 2025-01-26  
**وضعیت:** آماده برای اجرا  
**هدف:** تکمیل Epics 4, 5, 6, 7

---

## 📊 خلاصه وضعیت فعلی

### ✅ Epics تکمیل شده:
- **Epic 1:** Partner Integration Experience (100%)
- **Epic 2:** Partner Settlement Dashboard (100%)
- **Epic 3:** LMS Integration UI (100%)

### 🎯 Epics باقی‌مانده برای فردا:
- **Epic 4:** Export Functionality (0%)
- **Epic 5:** Notifications Backend (0%)
- **Epic 6:** Sandbox Environment (0%)
- **Epic 7:** Compliance Tools (0%)

---

## 📋 Epic 4: Export Functionality

**اولویت:** MEDIUM  
**تخمین:** 1 هفته  
**Story Points:** 8

### Story 4.1: CSV Export
**Route:** `/analytics` (افزودن دکمه Export)  
**API:** `GET /api/analytics/export?format=csv&dateRange=...`

**Tasks:**
- [ ] افزودن دکمه "Export CSV" در Analytics Page
- [ ] ایجاد Export Options Modal (Date Range, Fields Selection)
- [ ] پیاده‌سازی CSV Export API Route
- [ ] تست CSV Export با داده‌های واقعی

**Files to Create:**
- `app/api/analytics/export/route.ts`
- `components/ExportOptionsModal.tsx` (اختیاری)

**Dependencies:**
- Analytics Page موجود است
- Media History data موجود است

---

### Story 4.2: PDF Report Generation
**Route:** `/analytics` (افزودن دکمه Export PDF)  
**API:** `GET /api/analytics/export?format=pdf&...`

**Tasks:**
- [ ] افزودن دکمه "Export PDF" در Analytics Page
- [ ] پیاده‌سازی PDF Generation (jspdf یا puppeteer)
- [ ] ایجاد PDF Template (Summary Cards, Charts, Media History)
- [ ] پیاده‌سازی PDF Export API Route
- [ ] تست PDF Export

**Files to Create:**
- `app/api/analytics/export/route.ts` (افزودن PDF support)
- `lib/pdf-generator.ts` (PDF generation logic)

**Dependencies:**
- نصب `jspdf` و `jspdf-autotable` یا استفاده از puppeteer
- Analytics Page موجود است

**Package Installation:**
```bash
npm install jspdf jspdf-autotable
# یا
npm install puppeteer
```

---

## 📋 Epic 5: Notifications Backend

**اولویت:** MEDIUM  
**تخمین:** 1-2 هفته  
**Story Points:** 10

### Story 5.1: Email Notifications Backend
**API:** Email service integration

**Tasks:**
- [ ] انتخاب Email Service (SendGrid, AWS SES, یا Resend)
- [ ] ایجاد Email Service (`services/email.ts`)
- [ ] ایجاد Email Templates:
  - [ ] Low Balance Warning
  - [ ] Auto-top-up Confirmation
  - [ ] Session End Summary
  - [ ] Weekly Analytics Report
- [ ] پیاده‌سازی Email Queue (Bull یا Redis)
- [ ] ایجاد API Routes برای trigger کردن emails
- [ ] تست Email Delivery

**Files to Create:**
- `services/email.ts`
- `services/email-templates.ts`
- `app/api/notifications/email/route.ts`
- `templates/emails/` (email templates)

**Dependencies:**
- نصب email service SDK
- نصب queue library (Bull یا Redis)

**Package Installation:**
```bash
npm install @sendgrid/mail
# یا
npm install @aws-sdk/client-ses
# یا
npm install resend

# برای Queue:
npm install bull redis
```

**Environment Variables:**
```
EMAIL_API_KEY=...
EMAIL_FROM=noreply@payasplay.com
REDIS_URL=...
```

---

### Story 5.2: Push Notifications Backend
**API:** Push notification service integration

**Tasks:**
- [ ] انتخاب Push Service (Firebase Cloud Messaging, OneSignal)
- [ ] ایجاد Push Service (`services/push.ts`)
- [ ] پیاده‌سازی Device Token Management
- [ ] ایجاد API Routes برای send push notifications
- [ ] ایجاد Service Worker برای Web Push
- [ ] تست Push Notifications

**Files to Create:**
- `services/push.ts`
- `app/api/notifications/push/route.ts`
- `public/sw.js` (Service Worker)
- `app/api/notifications/device-tokens/route.ts`

**Dependencies:**
- نصب push notification SDK
- Service Worker registration

**Package Installation:**
```bash
npm install firebase-admin
# یا
npm install onesignal-node
```

**Environment Variables:**
```
FCM_SERVER_KEY=...
# یا
ONESIGNAL_APP_ID=...
ONESIGNAL_API_KEY=...
```

---

## 📋 Epic 6: Sandbox Environment

**اولویت:** MEDIUM  
**تخمین:** 1-2 هفته  
**Story Points:** 10

### Story 6.1: Sandbox Dashboard
**Route:** `/partner/sandbox`

**Tasks:**
- [ ] ایجاد Sandbox Dashboard Page
- [ ] ایجاد Sandbox API Key Generation
- [ ] ایجاد Sandbox API Endpoints Documentation
- [ ] پیاده‌سازی Test Data Generator:
  - [ ] Generate Test Users
  - [ ] Generate Test Sessions
  - [ ] Generate Test Transactions
- [ ] افزودن Reset Sandbox Button
- [ ] ایجاد Sandbox API Routes (با prefix `/api/sandbox/...`)

**Files to Create:**
- `app/partner/sandbox/page.tsx`
- `app/api/sandbox/api-keys/route.ts`
- `app/api/sandbox/test-data/route.ts`
- `app/api/sandbox/reset/route.ts`
- `components/SandboxDashboard.tsx`
- `components/TestDataGenerator.tsx`

**Dependencies:**
- Partner Dashboard موجود است
- Separate database/collection برای Sandbox (یا flag در database)

---

### Story 6.2: Sandbox Testing Tools
**Route:** `/partner/sandbox` (افزودن Testing Tools section)

**Tasks:**
- [ ] ایجاد Test Session Creator
- [ ] ایجاد Test Payment Simulator
- [ ] ایجاد Test Webhook Receiver
- [ ] ایجاد Test API Request Builder
- [ ] ایجاد Test Response Viewer
- [ ] پیاده‌سازی Testing Tools Components

**Files to Create:**
- `components/SandboxTestingTools.tsx`
- `components/TestSessionCreator.tsx`
- `components/TestPaymentSimulator.tsx`
- `components/TestWebhookReceiver.tsx`
- `components/TestAPIRequestBuilder.tsx`
- `app/api/sandbox/test-session/route.ts`
- `app/api/sandbox/test-payment/route.ts`
- `app/api/sandbox/webhook/route.ts`

**Dependencies:**
- Sandbox Dashboard موجود است
- Sandbox API endpoints موجود است

---

## 📋 Epic 7: Compliance Tools

**اولویت:** LOW  
**تخمین:** 2-3 هفته  
**Story Points:** 12

### Story 7.1: GDPR Settings
**Route:** `/partner/compliance/gdpr`

**Tasks:**
- [ ] ایجاد GDPR Settings Page
- [ ] پیاده‌سازی Data Retention Settings
- [ ] پیاده‌سازی User Consent Management
- [ ] پیاده‌سازی Data Export (User Data) - CSV/JSON
- [ ] پیاده‌سازی Data Deletion (Right to be Forgotten)
- [ ] افزودن Privacy Policy Link
- [ ] افزودن Terms of Service Link
- [ ] ایجاد GDPR API Routes

**Files to Create:**
- `app/partner/compliance/gdpr/page.tsx`
- `components/GDPRSettings.tsx`
- `components/DataRetentionSettings.tsx`
- `components/UserConsentManagement.tsx`
- `app/api/partner/compliance/gdpr/export/route.ts`
- `app/api/partner/compliance/gdpr/delete/route.ts`
- `app/api/partner/compliance/gdpr/settings/route.ts`

**Dependencies:**
- Partner Dashboard موجود است
- User data access در backend

---

### Story 7.2: AML/KYC Tools
**Route:** `/partner/compliance/aml-kyc`

**Tasks:**
- [ ] ایجاد AML/KYC Settings Page
- [ ] پیاده‌سازی KYC Verification Status Display
- [ ] پیاده‌سازی AML Risk Assessment Display
- [ ] پیاده‌سازی User Verification Requests List
- [ ] پیاده‌سازی Compliance Reports (PDF)
- [ ] Integration با KYC Provider (Sumsub, Onfido - اختیاری)
- [ ] ایجاد AML/KYC API Routes

**Files to Create:**
- `app/partner/compliance/aml-kyc/page.tsx`
- `components/AMLKYCSettings.tsx`
- `components/KYCVerificationStatus.tsx`
- `components/AMLRiskAssessment.tsx`
- `components/UserVerificationRequests.tsx`
- `components/ComplianceReports.tsx`
- `app/api/partner/compliance/aml-kyc/route.ts`
- `app/api/partner/compliance/aml-kyc/reports/route.ts`

**Dependencies:**
- Partner Dashboard موجود است
- KYC Provider Integration (اختیاری - می‌توان mock کرد)

---

## 🎯 اولویت‌بندی برای فردا

### پیشنهاد ترتیب اجرا:

1. **Epic 4 (Export Functionality)** - ساده‌ترین و سریع‌ترین
   - Story 4.1: CSV Export (نیم روز)
   - Story 4.2: PDF Export (نیم روز)
   - **کل زمان: 1 روز**

2. **Epic 6 (Sandbox Environment)** - مفید برای تست
   - Story 6.1: Sandbox Dashboard (1 روز)
   - Story 6.2: Testing Tools (1 روز)
   - **کل زمان: 2 روز**

3. **Epic 5 (Notifications Backend)** - نیاز به setup بیشتر
   - Story 5.1: Email Notifications (1-2 روز)
   - Story 5.2: Push Notifications (1-2 روز)
   - **کل زمان: 2-4 روز**

4. **Epic 7 (Compliance Tools)** - پیچیده‌ترین
   - Story 7.1: GDPR Settings (1-2 روز)
   - Story 7.2: AML/KYC Tools (1-2 روز)
   - **کل زمان: 2-4 روز**

---

## 📝 چک‌لیست شروع

### قبل از شروع:
- [ ] بررسی مستندات موجود در `docs/API_SPECIFICATIONS.md`
- [ ] بررسی Design Specs در `docs/DESIGN_SPECIFICATIONS.md`
- [ ] بررسی Story files در `docs/stories/`
- [ ] نصب dependencies مورد نیاز (jspdf, email SDK, etc.)

### برای هر Epic:
- [ ] خواندن Story file کامل
- [ ] بررسی Acceptance Criteria
- [ ] بررسی Technical Notes
- [ ] ایجاد API Routes (mock برای شروع)
- [ ] ایجاد Components
- [ ] تست Build
- [ ] QA Review
- [ ] Update Story Status

---

## 🔗 لینک‌های مفید

### مستندات:
- `PHASE2_DEVELOPMENT_ROADMAP.md` - Roadmap کامل
- `docs/API_SPECIFICATIONS.md` - API Specs
- `docs/DESIGN_SPECIFICATIONS.md` - Design Specs
- `docs/stories/` - Story files

### فایل‌های مرجع:
- `components/RevenueChart.tsx` - مثال Chart component
- `app/analytics/page.tsx` - Analytics Page (برای Export)
- `app/partner/settlement/page.tsx` - Settlement Dashboard (برای Sandbox reference)

---

## 💡 نکات مهم

1. **Epic 4 (Export):**
   - CSV Export ساده‌تر است - با Blob API
   - PDF Export نیاز به library دارد - jspdf یا puppeteer

2. **Epic 5 (Notifications):**
   - نیاز به API Keys از Email/Push services
   - می‌توان با mock شروع کرد و بعد real integration

3. **Epic 6 (Sandbox):**
   - می‌توان از همان database استفاده کرد با flag `isSandbox: true`
   - یا separate database برای sandbox

4. **Epic 7 (Compliance):**
   - GDPR می‌تواند mock باشد
   - AML/KYC می‌تواند mock باشد یا integration با provider

---

## ✅ Success Criteria

### Epic 4:
- [ ] CSV Export کار می‌کند
- [ ] PDF Export کار می‌کند
- [ ] Export Options Modal کار می‌کند

### Epic 5:
- [ ] Email Notifications ارسال می‌شوند
- [ ] Push Notifications ارسال می‌شوند
- [ ] Device Token Management کار می‌کند

### Epic 6:
- [ ] Sandbox Dashboard قابل دسترسی است
- [ ] Test Data Generator کار می‌کند
- [ ] Testing Tools کار می‌کنند

### Epic 7:
- [ ] GDPR Settings قابل تنظیم است
- [ ] Data Export/Deletion کار می‌کند
- [ ] AML/KYC Tools قابل استفاده است

---

**آماده برای شروع فردا! 🚀**

**آخرین به‌روزرسانی:** 2025-01-26

