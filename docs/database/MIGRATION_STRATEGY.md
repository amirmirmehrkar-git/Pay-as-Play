# Migration Strategy - Pay as Play

**Date:** 2025-01-XX  
**ORM:** Prisma  
**Status:** Planning

---

## 📋 Migration Approach

### Strategy: Prisma Migrate

**Rationale:**
- Built-in migration system
- Type-safe migrations
- Automatic migration generation
- Easy rollback support
- Version control friendly

---

## 🔄 Migration Workflow

### 1. Development Workflow:

```bash
# Make schema changes in prisma/schema.prisma
# Generate migration
npx prisma migrate dev --name migration_name

# This will:
# - Create migration SQL file
# - Apply migration to dev database
# - Regenerate Prisma Client
```

### 2. Production Workflow:

```bash
# Review migrations
npx prisma migrate status

# Apply migrations (dry run)
npx prisma migrate deploy --preview-feature

# Apply migrations
npx prisma migrate deploy
```

---

## 📁 Migration File Structure

### Example Migration:
```sql
-- Migration: 20250101_init_schema
-- Created: 2025-01-01

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
```

---

## 🔐 Migration Best Practices

### 1. Naming Conventions:
- Use descriptive names: `add_user_wallet_relation`
- Include date prefix: `20250101_add_user_wallet_relation`
- Use snake_case

### 2. Migration Guidelines:
- ✅ One logical change per migration
- ✅ Test migrations on dev/staging first
- ✅ Always backup production before migration
- ✅ Review SQL before applying
- ✅ Use transactions for data migrations

### 3. Rollback Strategy:
```bash
# Rollback last migration
npx prisma migrate resolve --rolled-back <migration_name>

# Or manually create rollback migration
npx prisma migrate dev --create-only --name rollback_<migration_name>
```

---

## 📊 Schema Versioning

### Version Control:
- All migrations in `prisma/migrations/` directory
- Tracked in Git
- Each migration is immutable
- Sequential migration numbers

### Migration History:
```
prisma/migrations/
  ├── 20250101000000_init/
  │   └── migration.sql
  ├── 20250102000000_add_wallets/
  │   └── migration.sql
  └── 20250103000000_add_transactions/
      └── migration.sql
```

---

## 🔧 Migration Templates

### Template 1: Add Table
```sql
-- Migration: add_<table_name>
CREATE TABLE "<table_name>" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT "<table_name>_pkey" PRIMARY KEY ("id")
);
```

### Template 2: Add Column
```sql
-- Migration: add_<column_name>_to_<table_name>
ALTER TABLE "<table_name>" 
ADD COLUMN "<column_name>" <TYPE> NOT NULL;
```

### Template 3: Add Foreign Key
```sql
-- Migration: add_<fk_name>_to_<table_name>
ALTER TABLE "<table_name>" 
ADD CONSTRAINT "<fk_name>" 
FOREIGN KEY ("<column_name>") 
REFERENCES "<referenced_table>"("id");
```

### Template 4: Add Index
```sql
-- Migration: add_index_<index_name>_to_<table_name>
CREATE INDEX "<index_name>" ON "<table_name>"("<column_name>");
```

---

## 🚨 Data Migration Guidelines

### Safe Data Migrations:
1. **Backup First:** Always backup before data migration
2. **Test on Dev:** Test migration on development database
3. **Use Transactions:** Wrap in transaction for rollback
4. **Batch Processing:** Process large datasets in batches
5. **Verify Results:** Verify data after migration

### Example Data Migration:
```sql
-- Migration: migrate_user_emails_to_lowercase
BEGIN;

UPDATE users 
SET email = LOWER(email)
WHERE email != LOWER(email);

COMMIT;
```

---

## 📝 Migration Checklist

### Before Migration:
- [ ] Review schema changes
- [ ] Test on development database
- [ ] Backup production database
- [ ] Review migration SQL
- [ ] Plan rollback strategy

### During Migration:
- [ ] Apply migration in transaction
- [ ] Monitor for errors
- [ ] Verify data integrity

### After Migration:
- [ ] Verify application functionality
- [ ] Check database constraints
- [ ] Monitor performance
- [ ] Update documentation

---

## 🔄 Rollback Procedures

### Automatic Rollback:
- Prisma Migrate supports rollback for development
- Production rollbacks require manual SQL

### Manual Rollback:
```sql
-- Create rollback migration manually
-- Example: rollback_add_wallets

DROP TABLE IF EXISTS "wallets";
DROP INDEX IF EXISTS "idx_wallets_user_id";
```

---

## 📚 Resources

- [Prisma Migrate Guide](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Migration Best Practices](https://www.prisma.io/docs/guides/migrate/production-troubleshooting)

---

**Migration Strategy Complete** ✅

