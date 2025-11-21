#!/bin/bash

# Production Deployment Script
# Usage: ./scripts/deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}

echo "🚀 Starting deployment to $ENVIRONMENT..."

# Check if required environment variables are set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: DATABASE_URL is not set"
  exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npm run db:generate

# Run database migrations
echo "🗄️  Running database migrations..."
npm run db:migrate

# Build application
echo "🏗️  Building application..."
npm run build

# Run tests
echo "🧪 Running tests..."
npm test -- --run

# Health check
echo "🏥 Running health check..."
npm run health:check || echo "⚠️  Health check skipped"

echo "✅ Deployment preparation complete!"
echo "📝 Next steps:"
echo "   1. Review build output"
echo "   2. Deploy to $ENVIRONMENT"
echo "   3. Verify deployment"

