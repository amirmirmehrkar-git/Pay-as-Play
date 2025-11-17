# ✅ چک‌لیست Epics 4-7

**تاریخ:** 2025-01-27  
**هدف:** تکمیل Epics 4, 5, 6, 7

---

## 📋 Epic 4: Export Functionality

### Story 4.1: CSV Export
- [ ] ایجاد `app/api/analytics/export/route.ts`
- [ ] افزودن دکمه "Export CSV" در `app/analytics/page.tsx`
- [ ] ایجاد Export Options Modal (اختیاری)
- [ ] تست CSV Export
- [ ] QA Review
- [ ] Update Story Status

### Story 4.2: PDF Report Generation
- [ ] نصب `jspdf` و `jspdf-autotable`
- [ ] ایجاد `lib/pdf-generator.ts`
- [ ] افزودن دکمه "Export PDF" در `app/analytics/page.tsx`
- [ ] پیاده‌سازی PDF Template
- [ ] تست PDF Export
- [ ] QA Review
- [ ] Update Story Status

---

## 📋 Epic 5: Notifications Backend

### Story 5.1: Email Notifications Backend
- [ ] انتخاب Email Service (SendGrid/AWS SES/Resend)
- [ ] نصب Email SDK
- [ ] ایجاد `services/email.ts`
- [ ] ایجاد Email Templates
- [ ] ایجاد `app/api/notifications/email/route.ts`
- [ ] تست Email Delivery
- [ ] QA Review
- [ ] Update Story Status

### Story 5.2: Push Notifications Backend
- [ ] انتخاب Push Service (FCM/OneSignal)
- [ ] نصب Push SDK
- [ ] ایجاد `services/push.ts`
- [ ] ایجاد `app/api/notifications/push/route.ts`
- [ ] ایجاد Service Worker (`public/sw.js`)
- [ ] ایجاد Device Token Management
- [ ] تست Push Notifications
- [ ] QA Review
- [ ] Update Story Status

---

## 📋 Epic 6: Sandbox Environment

### Story 6.1: Sandbox Dashboard
- [ ] ایجاد `app/partner/sandbox/page.tsx`
- [ ] ایجاد `components/SandboxDashboard.tsx`
- [ ] ایجاد `app/api/sandbox/api-keys/route.ts`
- [ ] ایجاد `app/api/sandbox/test-data/route.ts`
- [ ] ایجاد `app/api/sandbox/reset/route.ts`
- [ ] ایجاد `components/TestDataGenerator.tsx`
- [ ] تست Sandbox Dashboard
- [ ] QA Review
- [ ] Update Story Status

### Story 6.2: Sandbox Testing Tools
- [ ] ایجاد `components/SandboxTestingTools.tsx`
- [ ] ایجاد `components/TestSessionCreator.tsx`
- [ ] ایجاد `components/TestPaymentSimulator.tsx`
- [ ] ایجاد `components/TestWebhookReceiver.tsx`
- [ ] ایجاد `components/TestAPIRequestBuilder.tsx`
- [ ] ایجاد API Routes برای testing
- [ ] تست Testing Tools
- [ ] QA Review
- [ ] Update Story Status

---

## 📋 Epic 7: Compliance Tools

### Story 7.1: GDPR Settings
- [ ] ایجاد `app/partner/compliance/gdpr/page.tsx`
- [ ] ایجاد `components/GDPRSettings.tsx`
- [ ] ایجاد `components/DataRetentionSettings.tsx`
- [ ] ایجاد `components/UserConsentManagement.tsx`
- [ ] ایجاد `app/api/partner/compliance/gdpr/export/route.ts`
- [ ] ایجاد `app/api/partner/compliance/gdpr/delete/route.ts`
- [ ] ایجاد `app/api/partner/compliance/gdpr/settings/route.ts`
- [ ] تست GDPR Settings
- [ ] QA Review
- [ ] Update Story Status

### Story 7.2: AML/KYC Tools
- [ ] ایجاد `app/partner/compliance/aml-kyc/page.tsx`
- [ ] ایجاد `components/AMLKYCSettings.tsx`
- [ ] ایجاد `components/KYCVerificationStatus.tsx`
- [ ] ایجاد `components/AMLRiskAssessment.tsx`
- [ ] ایجاد `components/UserVerificationRequests.tsx`
- [ ] ایجاد `components/ComplianceReports.tsx`
- [ ] ایجاد `app/api/partner/compliance/aml-kyc/route.ts`
- [ ] تست AML/KYC Tools
- [ ] QA Review
- [ ] Update Story Status

---

## 📊 Progress Tracking

### Epic 4: Export Functionality
- [ ] Story 4.1: Done
- [ ] Story 4.2: Done
- **Status:** 0/2 Stories Done

### Epic 5: Notifications Backend
- [ ] Story 5.1: Done
- [ ] Story 5.2: Done
- **Status:** 0/2 Stories Done

### Epic 6: Sandbox Environment
- [ ] Story 6.1: Done
- [ ] Story 6.2: Done
- **Status:** 0/2 Stories Done

### Epic 7: Compliance Tools
- [ ] Story 7.1: Done
- [ ] Story 7.2: Done
- **Status:** 0/2 Stories Done

---

## 🎯 Daily Goals

### Day 1 (Epic 4):
- [ ] Story 4.1: CSV Export
- [ ] Story 4.2: PDF Export

### Day 2-3 (Epic 6):
- [ ] Story 6.1: Sandbox Dashboard
- [ ] Story 6.2: Testing Tools

### Day 4-5 (Epic 5):
- [ ] Story 5.1: Email Notifications
- [ ] Story 5.2: Push Notifications

### Day 6-7 (Epic 7):
- [ ] Story 7.1: GDPR Settings
- [ ] Story 7.2: AML/KYC Tools

---

**آخرین به‌روزرسانی:** 2025-01-26

