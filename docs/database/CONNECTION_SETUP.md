# Database Connection Setup - Pay as Play

**Date:** 2025-01-XX  
**ORM:** Prisma  
**Database:** PostgreSQL  
**Status:** Planning

---

## 📋 Connection Configuration

### Environment Variables:

```env
# Database URL
DATABASE_URL="postgresql://user:password@localhost:5432/payasplay?schema=public"

# Connection Pool Settings (optional)
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_POOL_IDLE_TIMEOUT=30000
```

---

## 🔧 Prisma Client Setup

### 1. Create Prisma Client Singleton:

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### 2. Usage in API Routes:

```typescript
// app/api/users/route.ts
import { prisma } from '@/lib/prisma';

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}
```

---

## 🔐 Connection Pooling

### Prisma Connection Pooling:

Prisma automatically handles connection pooling. Configuration:

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Connection pool settings in connection string
}
```

### Connection String with Pooling:

```
postgresql://user:password@localhost:5432/payasplay?schema=public&connection_limit=10&pool_timeout=20
```

---

## 🌍 Environment-Specific Configuration

### Development:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/payasplay_dev?schema=public"
```

### Staging:
```env
DATABASE_URL="postgresql://user:password@staging-db.example.com:5432/payasplay_staging?schema=public&sslmode=require"
```

### Production:
```env
DATABASE_URL="postgresql://user:password@prod-db.example.com:5432/payasplay?schema=public&sslmode=require&connection_limit=20"
```

---

## 🔄 Connection Management

### Best Practices:

1. **Singleton Pattern:** Use single Prisma Client instance
2. **Connection Pooling:** Let Prisma handle pooling
3. **Graceful Shutdown:** Disconnect on app shutdown
4. **Error Handling:** Handle connection errors gracefully

### Example Shutdown Handler:

```typescript
// lib/prisma.ts
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
```

---

## 🚨 Error Handling

### Connection Error Handling:

```typescript
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json(users);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      console.error('Prisma error:', error);
    } else {
      // Handle unknown errors
      console.error('Unknown error:', error);
    }
    throw error;
  }
}
```

---

## 📊 Connection Monitoring

### Health Check Endpoint:

```typescript
// app/api/health/db/route.ts
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ status: 'healthy' });
  } catch (error) {
    return Response.json({ status: 'unhealthy', error: error.message }, { status: 500 });
  }
}
```

---

## 🔐 Security Considerations

### 1. Connection String Security:
- ✅ Store in environment variables
- ✅ Never commit to Git
- ✅ Use SSL in production
- ✅ Rotate credentials regularly

### 2. Connection Limits:
- Set appropriate pool size
- Monitor connection usage
- Handle connection exhaustion

### 3. Timeout Settings:
- Set query timeouts
- Set connection timeouts
- Handle timeout errors

---

## 📝 Connection Setup Checklist

### Initial Setup:
- [ ] Install Prisma
- [ ] Configure DATABASE_URL
- [ ] Create Prisma Client singleton
- [ ] Test connection
- [ ] Setup connection pooling

### Production Setup:
- [ ] Use SSL connection
- [ ] Set appropriate pool size
- [ ] Configure timeouts
- [ ] Setup monitoring
- [ ] Document connection details

---

## 📚 Resources

- [Prisma Connection Management](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management)
- [PostgreSQL Connection String](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)

---

**Connection Setup Complete** ✅

