# 🌍 Internationalization (i18n) Implementation Guide

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 Overview

این سند راهنمای پیاده‌سازی بین‌المللی‌سازی (i18n) برای پروژه Pay as Play با استفاده از Next.js App Router و `next-intl` است.

---

## 🎯 Supported Locales

### Languages
- **فارسی (fa)** - RTL
- **English (en)** - LTR
- **Deutsch (de)** - LTR

### Default Locale
- **English (en)**

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── [locale]/              # Dynamic locale route
│   │   ├── layout.tsx         # Locale layout with i18n provider
│   │   ├── page.tsx           # Home page
│   │   ├── dashboard/         # Dashboard routes
│   │   ├── auth/              # Authentication routes
│   │   └── ...
│   └── page.tsx               # Root redirect
├── locales/                   # Translation files
│   ├── en.json
│   ├── fa.json
│   └── de.json
├── i18n.ts                    # i18n configuration
└── middleware.ts              # Locale middleware
```

---

## 🔧 Implementation Steps

### 1. Install Dependencies

```bash
npm install next-intl
```

### 2. Create Middleware (`middleware.ts`)

```typescript
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fa', 'de'],

  // Used when no locale matches
  defaultLocale: 'en'
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fa|en|de)/:path*']
}
```

### 3. Create i18n Configuration (`src/i18n.ts`)

```typescript
import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config
const locales = ['en', 'fa', 'de']

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate that the incoming `locale` parameter is valid
  const locale = await requestLocale
  
  if (!locale || !locales.includes(locale as any)) {
    notFound()
  }

  try {
    return {
      locale,
      messages: (await import(`./locales/${locale}.json`)).default
    }
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error)
    notFound()
  }
})
```

### 4. Create Locale Layout (`src/app/[locale]/layout.tsx`)

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Play and Pay',
  description: 'Pay-as-you-use micro-payment platform',
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <div className={inter.className} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </NextIntlClientProvider>
  )
}
```

### 5. Create Translation Files

#### `src/locales/en.json`
```json
{
  "common": {
    "login": "Login",
    "signup": "Sign Up",
    "wallet": "Wallet",
    "balance": "Balance",
    "transactions": "Transactions",
    "settings": "Settings"
  },
  "dashboard": {
    "welcome": "Welcome",
    "totalRevenue": "Total Revenue",
    "activeUsers": "Active Users"
  }
}
```

#### `src/locales/fa.json`
```json
{
  "common": {
    "login": "ورود",
    "signup": "ثبت‌نام",
    "wallet": "کیف پول",
    "balance": "موجودی",
    "transactions": "تراکنش‌ها",
    "settings": "تنظیمات"
  },
  "dashboard": {
    "welcome": "خوش آمدید",
    "totalRevenue": "کل درآمد",
    "activeUsers": "کاربران فعال"
  }
}
```

#### `src/locales/de.json`
```json
{
  "common": {
    "login": "Anmelden",
    "signup": "Registrieren",
    "wallet": "Brieftasche",
    "balance": "Guthaben",
    "transactions": "Transaktionen",
    "settings": "Einstellungen"
  },
  "dashboard": {
    "welcome": "Willkommen",
    "totalRevenue": "Gesamteinnahmen",
    "activeUsers": "Aktive Benutzer"
  }
}
```

### 6. Update Next.js Config (`next.config.js`)

```javascript
const withNextIntl = require('next-intl/plugin')(
  './src/i18n.ts'
)

module.exports = withNextIntl({
  // Your Next.js config
})
```

---

## 💻 Usage in Components

### Client Components

```typescript
'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

export default function MyComponent() {
  const t = useTranslations('common')
  const params = useParams()
  const locale = params.locale as string

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>Current locale: {locale}</p>
    </div>
  )
}
```

### Server Components

```typescript
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export default async function MyServerComponent() {
  const t = await getTranslations('common')

  return (
    <div>
      <h1>{t('welcome')}</h1>
    </div>
  )
}
```

### Navigation with Locale

```typescript
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function Navigation() {
  const params = useParams()
  const locale = params.locale as string

  return (
    <nav>
      <Link href={`/${locale}/dashboard`}>
        Dashboard
      </Link>
      <Link href={`/${locale}/wallet`}>
        Wallet
      </Link>
    </nav>
  )
}
```

---

## 🔄 Language Switcher Component

```typescript
'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

interface LanguageSwitcherProps {
  currentLocale: string
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('languages')

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fa', name: 'فارسی', flag: '🌐' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ]

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]

  const handleLanguageChange = (locale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/'
    // Navigate to the new locale
    router.push(`/${locale}${pathWithoutLocale}`)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## 🎨 RTL Support

### Automatic RTL Detection

در `layout.tsx`:
```typescript
<div dir={locale === 'fa' ? 'rtl' : 'ltr'}>
  {children}
</div>
```

### Tailwind CSS RTL Support

```bash
npm install tailwindcss-rtl
```

در `tailwind.config.js`:
```javascript
module.exports = {
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
```

---

## 📝 Best Practices

### 1. Namespace Organization
- استفاده از namespace برای سازماندهی ترجمه‌ها
- مثال: `common`, `dashboard`, `wallet`, `transactions`

### 2. Type Safety
- استفاده از TypeScript برای type-safe translations
- ایجاد types برای translation keys

### 3. Dynamic Content
- استفاده از interpolation برای محتوای داینامیک
- مثال: `t('welcome', { name: user.name })`

### 4. Pluralization
- استفاده از plural rules برای زبان‌های مختلف
- مثال: `t('items', { count: 5 })`

### 5. Date & Number Formatting
- استفاده از `next-intl` برای format کردن تاریخ و عدد
- مثال: `formatDate(date, { dateStyle: 'long' })`

---

## 🔍 Testing

### Test Locale Switching
```typescript
// Test that locale switching works
it('should switch locale correctly', () => {
  // Test implementation
})
```

### Test RTL Layout
```typescript
// Test that RTL layout is applied for Persian
it('should apply RTL for Persian locale', () => {
  // Test implementation
})
```

---

## 📚 Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [RTL Support in Tailwind CSS](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support)

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

