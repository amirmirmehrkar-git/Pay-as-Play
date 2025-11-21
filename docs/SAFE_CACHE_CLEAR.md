# راهنمای پاک کردن کش - ایمن

**⚠️ هشدار:** هرگز از `Remove-Item -Recurse -Force .` استفاده نکنید!
این دستور **کل پروژه** را حذف می‌کند!

---

## ✅ دستورات ایمن برای پاک کردن کش

### 1. پاک کردن کش Next.js (توصیه می‌شود):
```powershell
Remove-Item -Recurse -Force .next
```

### 2. پاک کردن کش npm:
```powershell
Remove-Item -Recurse -Force node_modules\.cache
```

### 3. پاک کردن هر دو (کامل):
```powershell
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules\.cache
```

---

## ⚠️ دستورات خطرناک (هرگز استفاده نکنید!)

### ❌ هرگز این دستورات را اجرا نکنید:
```powershell
# این دستور کل پروژه را حذف می‌کند!
Remove-Item -Recurse -Force .

# این دستور کل node_modules را حذف می‌کند (نیاز به npm install مجدد)
Remove-Item -Recurse -Force node_modules
```

---

## 🚀 دستور کامل و ایمن

```powershell
# پاک کردن کش Next.js
Remove-Item -Recurse -Force .next

# پاک کردن کش npm (اگر وجود دارد)
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force node_modules\.cache
}

# اجرای مجدد سرور
npm run dev
```

---

## 📝 توضیح

- `.next` = پوشه کش Next.js (ایمن برای حذف)
- `node_modules\.cache` = پوشه کش npm (ایمن برای حذف)
- `.` = کل دایرکتوری فعلی (خطرناک!)
- `node_modules` = وابستگی‌ها (نیاز به npm install مجدد)

---

**همیشه مراقب باشید!** ⚠️

