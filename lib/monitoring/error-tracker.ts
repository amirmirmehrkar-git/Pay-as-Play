/**
 * Error Tracking Utility
 * Track and report errors to monitoring service
 */

import { logger } from '../logging/logger';

export interface ErrorContext {
  userId?: string;
  requestId?: string;
  url?: string;
  userAgent?: string;
  [key: string]: unknown;
}

class ErrorTracker {
  private enabled: boolean;

  constructor() {
    this.enabled = process.env.ERROR_TRACKING_ENABLED === 'true';
  }

  /**
   * Track error
   */
  trackError(
    error: Error,
    context?: ErrorContext,
    level: 'error' | 'fatal' = 'error',
  ): void {
    // Log error
    if (level === 'fatal') {
      logger.fatal(error.message, error, context);
    } else {
      logger.error(error.message, error, context);
    }

    // Send to error tracking service (e.g., Sentry)
    if (this.enabled) {
      this.sendToService(error, context, level);
    }
  }

  /**
   * Track API error
   */
  trackApiError(
    error: Error,
    endpoint: string,
    method: string,
    statusCode: number,
    context?: ErrorContext,
  ): void {
    this.trackError(error, {
      ...context,
      endpoint,
      method,
      statusCode,
      type: 'api_error',
    });
  }

  /**
   * Track database error
   */
  trackDatabaseError(
    error: Error,
    query: string,
    context?: ErrorContext,
  ): void {
    this.trackError(error, {
      ...context,
      query: query.substring(0, 100), // Truncate long queries
      type: 'database_error',
    });
  }

  /**
   * Track authentication error
   */
  trackAuthError(
    error: Error,
    userId?: string,
    context?: ErrorContext,
  ): void {
    this.trackError(error, {
      ...context,
      userId,
      type: 'authentication_error',
    }, 'error');
  }

  /**
   * Send error to tracking service
   */
  private sendToService(
    error: Error,
    context?: ErrorContext,
    level: 'error' | 'fatal' = 'error',
  ): void {
    // In production, send to error tracking service (e.g., Sentry)
    // Example with Sentry:
    // Sentry.captureException(error, {
    //   level: level === 'fatal' ? 'fatal' : 'error',
    //   contexts: {
    //     custom: context,
    //   },
    // });

    // For now, just log structured error
    console.error(JSON.stringify({
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      context,
      level,
      timestamp: new Date().toISOString(),
    }));
  }

  /**
   * Set user context
   */
  setUser(userId: string, email?: string): void {
    // In production, set user context in error tracking service
    // Sentry.setUser({ id: userId, email });
  }

  /**
   * Clear user context
   */
  clearUser(): void {
    // In production, clear user context
    // Sentry.setUser(null);
  }
}

// Singleton instance
export const errorTracker = new ErrorTracker();

