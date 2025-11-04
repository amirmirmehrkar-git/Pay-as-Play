# 🚀 راهنمای نصب BMAD Method

**پروژه:** Pay as Play  
**مسیر:** `C:\Amir\pay-as-play-project`

---

## 📋 مراحل نصب:

### مرحله 1: رفتن به پوشه پروژه

```bash
cd C:\Amir\pay-as-play-project
```

### مرحله 2: اجرای دستور نصب

```bash
npx bmad-method install
```

### مرحله 3: پاسخ به سوالات

وقتی دستور اجرا شد، از شما سوال می‌پرسد:

1. **Enter the full path to your project directory:**
   - پاسخ: `C:\Amir\pay-as-play-project`
   - یا Enter بزنید (اگر در همان پوشه هستید)

2. **Select your IDE:**
   - انتخاب کنید: **Cursor**

---

## ✅ پس از نصب:

BMAD Method پوشه‌های زیر را ایجاد می‌کند:

```
pay-as-play-project/
├── .bmad-core/          # پوشه اصلی با تمام agents
│   ├── agents/
│   ├── rules/
│   └── ...
├── .cursor/
│   └── rules/           # فایل‌های rule برای Cursor (.mdc)
└── ...
```

---

## 🎯 استفاده از BMAD Agents در Cursor:

بعد از نصب، می‌توانید در Cursor (با Ctrl+L یا Cmd+L) از agents استفاده کنید:

### Agents موجود:

- **@bmad-master** - Universal task executor
- **@sm** - Scrum Master
- **@dev** - Full-stack developer
- **@architect** - Solution architect
- **@pm** - Product manager
- **@analyst** - Business analyst
- **@qa** - QA specialist
- **@po** - Product owner
- **@ux-expert** - UX specialist

### نحوه استفاده:

1. در Cursor، چت را باز کنید (Ctrl+L / Cmd+L)
2. نام agent را تایپ کنید: `@agent-name`
3. سوال یا درخواست خود را بنویسید

---

## 📝 مثال:

```
@dev How do I create a new API route in Next.js?
```

```
@architect Design the database schema for a payment system
```

---

## 🔧 نکات مهم:

1. **Cursor IDE:** حتماً Cursor را به عنوان IDE انتخاب کنید
2. **Rule Files:** فایل‌های rule در `.cursor/rules/` به صورت `.mdc` ذخیره می‌شوند
3. **Agents:** همه agents در پوشه `.bmad-core/` قرار دارند

---

## 🆘 در صورت مشکل:

اگر نصب با مشکل مواجه شد:

1. مطمئن شوید Node.js نصب است
2. مطمئن شوید در پوشه صحیح هستید
3. دوباره دستور را اجرا کنید

---

**موفق باشید!** 🎉

