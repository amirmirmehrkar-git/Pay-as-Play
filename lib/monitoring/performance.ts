/**
 * Performance Monitoring Utilities
 * Track Core Web Vitals and API performance
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  context?: Record<string, unknown>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private maxMetrics: number = 1000;

  /**
   * Record performance metric
   */
  record(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToService(metric);
    }
  }

  /**
   * Record API response time
   */
  recordApiResponse(
    endpoint: string,
    method: string,
    duration: number,
    statusCode: number,
  ): void {
    this.record({
      name: 'api.response_time',
      value: duration,
      timestamp: Date.now(),
      context: {
        endpoint,
        method,
        statusCode,
      },
    });
  }

  /**
   * Record database query time
   */
  recordDatabaseQuery(
    query: string,
    duration: number,
    success: boolean,
  ): void {
    this.record({
      name: 'database.query_time',
      value: duration,
      timestamp: Date.now(),
      context: {
        query: query.substring(0, 100), // Truncate long queries
        success,
      },
    });
  }

  /**
   * Record Core Web Vital
   */
  recordWebVital(
    name: 'LCP' | 'FID' | 'CLS' | 'FCP' | 'TTFB',
    value: number,
  ): void {
    this.record({
      name: `web_vital.${name.toLowerCase()}`,
      value,
      timestamp: Date.now(),
    });
  }

  /**
   * Get performance metrics
   */
  getMetrics(name?: string): PerformanceMetric[] {
    if (name) {
      return this.metrics.filter((m) => m.name === name);
    }
    return [...this.metrics];
  }

  /**
   * Get average metric value
   */
  getAverage(name: string, windowMs?: number): number | null {
    const now = Date.now();
    const filtered = this.metrics.filter((m) => {
      if (m.name !== name) return false;
      if (windowMs && now - m.timestamp > windowMs) return false;
      return true;
    });

    if (filtered.length === 0) return null;

    const sum = filtered.reduce((acc, m) => acc + m.value, 0);
    return sum / filtered.length;
  }

  /**
   * Send metric to monitoring service
   */
  private sendToService(metric: PerformanceMetric): void {
    // In production, send to monitoring service (e.g., Datadog, New Relic, etc.)
    // For now, just log
    if (process.env.MONITORING_ENABLED === 'true') {
      // Send to monitoring service
      // fetch(process.env.MONITORING_ENDPOINT, {
      //   method: 'POST',
      //   body: JSON.stringify(metric),
      // });
    }
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

