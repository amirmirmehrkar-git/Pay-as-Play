# 🗄️ Database Schema

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04

---

## 📊 ساختار دیتابیس

### 📋 جداول اصلی

#### Table: users
- **Description:** [توضیح]
- **Columns:**
  - `id`: [نوع] - [توضیح] - [Constraints]
  - `email`: [نوع] - [توضیح] - [Constraints]
  - `password`: [نوع] - [توضیح] - [Constraints]
  - `created_at`: [نوع] - [توضیح]
  - `updated_at`: [نوع] - [توضیح]
- **Indexes:** [ایندکس‌ها]
- **Relationships:** [روابط]

#### Table: payments
- **Description:** [توضیح]
- **Columns:**
  - `id`: [نوع] - [توضیح] - [Constraints]
  - `user_id`: [نوع] - [توضیح] - [Constraints]
  - `amount`: [نوع] - [توضیح] - [Constraints]
  - `status`: [نوع] - [توضیح] - [Constraints]
  - `created_at`: [نوع] - [توضیح]
- **Indexes:** [ایندکس‌ها]
- **Relationships:** [روابط]

#### Table: transactions
- **Description:** [توضیح]
- **Columns:**
  - `id`: [نوع] - [توضیح]
  - [سایر ستون‌ها]
- **Indexes:** [ایندکس‌ها]
- **Relationships:** [روابط]

---

### 🔗 روابط (Relationships)

#### Relationship 1
- **From:** [جدول 1]
- **To:** [جدول 2]
- **Type:** [نوع - One-to-One, One-to-Many, Many-to-Many]
- **Foreign Key:** [کلید خارجی]
- **Description:** [توضیح]

#### Relationship 2
- **From:** [جدول 1]
- **To:** [جدول 2]
- **Type:** [نوع]
- **Foreign Key:** [کلید خارجی]
- **Description:** [توضیح]

---

### 📈 Indexes

#### Index 1
- **Table:** [جدول]
- **Columns:** [ستون‌ها]
- **Type:** [نوع - Primary, Unique, Index]
- **Purpose:** [هدف]

#### Index 2
- **Table:** [جدول]
- **Columns:** [ستون‌ها]
- **Type:** [نوع]
- **Purpose:** [هدف]

---

### 🔄 Migrations

#### Migration 1: [عنوان]
- **Description:** [توضیح]
- **Changes:** [تغییرات]
- **Rollback:** [نحوه rollback]

#### Migration 2: [عنوان]
- **Description:** [توضیح]
- **Changes:** [تغییرات]

---

### 📊 Data Models

#### User Model
```typescript
// یا به زبان دیگری که استفاده می‌کنید
interface User {
  id: string;
  email: string;
  // ...
}
```

#### Payment Model
```typescript
interface Payment {
  id: string;
  userId: string;
  amount: number;
  // ...
}
```

---

### 🔐 Constraints & Validation

#### Constraints
- **Table 1:**
  - [Constraint 1]
  - [Constraint 2]

#### Validation Rules
- **Field 1:** [قانون]
- **Field 2:** [قانون]

---

### 📦 Enums & Types

#### Enum: PaymentStatus
- `pending`: [توضیح]
- `completed`: [توضیح]
- `failed`: [توضیح]
- `cancelled`: [توضیح]

#### Enum: UserRole
- `admin`: [توضیح]
- `user`: [توضیح]
- `developer`: [توضیح]

---

### 🔍 Queries

#### Query 1: [عنوان]
- **Purpose:** [هدف]
- **SQL/Query:** [کوئری]
- **Performance:** [ملاحظات عملکردی]

#### Query 2: [عنوان]
- **Purpose:** [هدف]
- **SQL/Query:** [کوئری]

---

### 📊 Views (اگر استفاده می‌شود)

#### View 1: [نام]
- **Description:** [توضیح]
- **Columns:** [ستون‌ها]
- **Query:** [کوئری]

---

### 🔄 Triggers (اگر استفاده می‌شود)

#### Trigger 1: [نام]
- **Table:** [جدول]
- **Event:** [رویداد]
- **Action:** [عمل]

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04


