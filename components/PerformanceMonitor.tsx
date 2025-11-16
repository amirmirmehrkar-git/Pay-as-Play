'use client';

/**
 * Performance Monitor Component
 * Monitors component render times and performance metrics
 */

import { useEffect, useRef, useState } from 'react';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const renderStartRef = useRef<number>(0);

  useEffect(() => {
    renderStartRef.current = performance.now();

    // Measure component mount time
    const measureMount = () => {
      const mountTime = performance.now() - renderStartRef.current;
      return {
        name: 'Component Mount',
        value: mountTime,
        unit: 'ms',
      };
    };

    // Measure memory usage (if available)
    const measureMemory = (): PerformanceMetric | null => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        return {
          name: 'Memory Usage',
          value: Math.round(memory.usedJSHeapSize / 1048576),
          unit: 'MB',
        };
      }
      return null;
    };

    // Measure paint timing
    const measurePaint = async (): Promise<PerformanceMetric | null> => {
      try {
        const paintEntries = performance.getEntriesByType('paint');
        if (paintEntries.length > 0) {
          const fcp = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
          if (fcp) {
            return {
              name: 'First Contentful Paint',
              value: Math.round(fcp.startTime),
              unit: 'ms',
            };
          }
        }
      } catch (err) {
        // Paint timing not available
      }
      return null;
    };

    // Collect all metrics
    const collectMetrics = async () => {
      const collectedMetrics: PerformanceMetric[] = [measureMount()];

      const memoryMetric = measureMemory();
      if (memoryMetric) {
        collectedMetrics.push(memoryMetric);
      }

      const paintMetric = await measurePaint();
      if (paintMetric) {
        collectedMetrics.push(paintMetric);
      }

      setMetrics(collectedMetrics);
    };

    // Small delay to ensure paint is complete
    setTimeout(collectMetrics, 100);
  }, []);

  if (metrics.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 rounded-lg border border-zinc-200 bg-white/90 p-2 text-xs shadow-lg backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/90">
      <div className="mb-1 font-semibold text-zinc-900 dark:text-zinc-100">Performance</div>
      {metrics.map((metric, index) => (
        <div key={index} className="flex justify-between gap-4">
          <span className="text-zinc-600 dark:text-zinc-400">{metric.name}:</span>
          <span className="font-mono text-zinc-900 dark:text-zinc-100">
            {metric.value.toFixed(2)} {metric.unit}
          </span>
        </div>
      ))}
    </div>
  );
}

