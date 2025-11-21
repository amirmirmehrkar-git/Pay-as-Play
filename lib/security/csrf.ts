/**
 * CSRF Protection Utilities
 * Generate and validate CSRF tokens
 */

import crypto from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || 'your-csrf-secret-change-in-production';
const CSRF_TOKEN_LENGTH = 32;

/**
 * Generate CSRF token
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
}

/**
 * Create CSRF token with signature
 */
export function createCSRFToken(): string {
  const token = generateCSRFToken();
  const signature = signCSRFToken(token);
  return `${token}.${signature}`;
}

/**
 * Sign CSRF token
 */
function signCSRFToken(token: string): string {
  if (!CSRF_SECRET || CSRF_SECRET === 'your-csrf-secret-change-in-production') {
    throw new Error('CSRF_SECRET must be set in environment variables');
  }

  return crypto
    .createHmac('sha256', CSRF_SECRET)
    .update(token)
    .digest('hex');
}

/**
 * Verify CSRF token
 */
export function verifyCSRFToken(token: string): boolean {
  if (!token || !token.includes('.')) {
    return false;
  }

  const [tokenPart, signature] = token.split('.');
  if (!tokenPart || !signature) {
    return false;
  }

  const expectedSignature = signCSRFToken(tokenPart);
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

/**
 * Get CSRF token from request
 */
export function getCSRFTokenFromRequest(request: Request): string | null {
  // Try header first
  const headerToken = request.headers.get('X-CSRF-Token');
  if (headerToken) {
    return headerToken;
  }

  // Try form data
  // Note: This is a simplified version. In production, you'd parse the body
  return null;
}

