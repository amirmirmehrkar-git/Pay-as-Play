/**
 * Play and Pay SDK - Utility Functions
 * Logger, formatters, and helper functions
 */

/**
 * Logger utility
 */
export const logger = {
  enabled: process.env.NODE_ENV !== 'production',
  
  log(...args) {
    if (this.enabled) {
      console.log('[PlayAndPay]', ...args);
    }
  },
  
  error(...args) {
    console.error('[PlayAndPay] ERROR:', ...args);
  },
  
  warn(...args) {
    if (this.enabled) {
      console.warn('[PlayAndPay] WARN:', ...args);
    }
  },
  
  debug(...args) {
    if (this.enabled && process.env.DEBUG) {
      console.debug('[PlayAndPay] DEBUG:', ...args);
    }
  }
};

/**
 * Format amount from minor units to major units
 * @param {number} minor - Amount in minor units (cents)
 * @param {number} decimals - Decimal places (default: 2)
 * @returns {number}
 */
export function formatAmount(minor, decimals = 2) {
  return minor / Math.pow(10, decimals);
}

/**
 * Convert EUR to PLY minor units
 * @param {number} eur - Amount in EUR
 * @param {number} rate - Conversion rate (1 PLY = rate EUR, default: 0.01)
 * @returns {number} PLY minor units
 */
export function eurToPLYMinor(eur, rate = 0.01) {
  return Math.round(eur / rate);
}

/**
 * Convert PLY minor units to EUR
 * @param {number} plyMinor - Amount in PLY minor units
 * @param {number} rate - Conversion rate (1 PLY = rate EUR, default: 0.01)
 * @returns {number} EUR amount
 */
export function plyMinorToEUR(plyMinor, rate = 0.01) {
  return plyMinor * rate;
}

/**
 * Convert minutes to milliseconds
 * @param {number} minutes
 * @returns {number}
 */
export function minutesToMs(minutes) {
  return minutes * 60 * 1000;
}

/**
 * Convert milliseconds to minutes
 * @param {number} ms
 * @returns {number}
 */
export function msToMinutes(ms) {
  return ms / (60 * 1000);
}

/**
 * Generate unique ID
 * @param {string} prefix - Prefix for ID
 * @returns {string}
 */
export function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate tick ID for idempotency
 * @param {string} sessionId - Session ID
 * @param {number} timestamp - Timestamp
 * @returns {string}
 */
export function generateTickId(sessionId, timestamp = Date.now()) {
  return `tick_${sessionId}_${timestamp}_${Math.random().toString(36).substr(2, 6)}`;
}

/**
 * Format duration (ms) to human-readable string
 * @param {number} ms - Duration in milliseconds
 * @returns {string}
 */
export function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Format currency amount
 * @param {number} amount - Amount
 * @param {string} currency - Currency code (default: 'EUR')
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'EUR') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

/**
 * Sleep/delay utility
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry utility
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum retries
 * @param {number} delay - Delay between retries (ms)
 * @returns {Promise}
 */
export async function retry(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      logger.warn(`Retry ${i + 1}/${maxRetries} after error:`, error.message);
      await sleep(delay * (i + 1)); // Exponential backoff
    }
  }
}

/**
 * Validate address format (Algorand)
 * @param {string} address - Address to validate
 * @returns {boolean}
 */
export function isValidAddress(address) {
  if (!address || typeof address !== 'string') return false;
  // Algorand addresses are 58 characters, base32 encoded
  return /^[A-Z2-7]{58}$/.test(address);
}

/**
 * Validate session ID format
 * @param {string} sessionId - Session ID to validate
 * @returns {boolean}
 */
export function isValidSessionId(sessionId) {
  if (!sessionId || typeof sessionId !== 'string') return false;
  return /^session_[a-zA-Z0-9_]+$/.test(sessionId);
}

export default {
  logger,
  formatAmount,
  eurToPLYMinor,
  plyMinorToEUR,
  minutesToMs,
  msToMinutes,
  generateId,
  generateTickId,
  formatDuration,
  formatCurrency,
  sleep,
  retry,
  isValidAddress,
  isValidSessionId
};

