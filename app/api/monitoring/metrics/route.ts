import { NextResponse } from 'next/server';
import { performanceMonitor } from '@/lib/monitoring/performance';

/**
 * GET /api/monitoring/metrics
 * Get performance metrics
 */
export async function GET() {
  try {
    const metrics = performanceMonitor.getMetrics();
    
    // Calculate averages
    const apiAvg = performanceMonitor.getAverage('api.response_time', 5 * 60 * 1000);
    const dbAvg = performanceMonitor.getAverage('database.query_time', 5 * 60 * 1000);

    return NextResponse.json({
      success: true,
      data: {
        metrics: metrics.slice(-100), // Last 100 metrics
        averages: {
          apiResponseTime: apiAvg,
          databaseQueryTime: dbAvg,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'METRICS_ERROR',
          message: error?.message || 'Failed to fetch metrics',
        },
      },
      { status: 500 },
    );
  }
}

