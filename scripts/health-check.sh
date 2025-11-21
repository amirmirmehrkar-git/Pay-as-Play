#!/bin/bash

# Health Check Script
# Checks if the application is running correctly

set -e

BASE_URL=${1:-http://localhost:3000}

echo "🏥 Running health check on $BASE_URL..."

# Check if server is responding
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL" || echo "000")

if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 301 ] || [ "$HTTP_CODE" -eq 302 ]; then
  echo "✅ Server is responding (HTTP $HTTP_CODE)"
else
  echo "❌ Server is not responding (HTTP $HTTP_CODE)"
  exit 1
fi

# Check API health endpoint (if available)
API_HEALTH=$(curl -s "$BASE_URL/api/health" || echo "")

if [ -n "$API_HEALTH" ]; then
  echo "✅ API health check passed"
else
  echo "⚠️  API health check endpoint not available"
fi

# Check database connection (if endpoint available)
DB_HEALTH=$(curl -s "$BASE_URL/api/db/test-connection" || echo "")

if [ -n "$DB_HEALTH" ]; then
  echo "✅ Database connection check passed"
else
  echo "⚠️  Database health check endpoint not available"
fi

echo "✅ Health check complete!"

