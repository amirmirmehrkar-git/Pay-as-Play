'use client';

import { useEffect, useRef } from 'react';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}

interface AnalyticsChartsProps {
  timeWatchedData?: { date: string; minutes: number }[];
  costData?: { date: string; cost: number }[];
  monthlySpend?: { month: string; spend: number }[];
}

export default function AnalyticsCharts({
  timeWatchedData = [],
  costData = [],
  monthlySpend = [],
}: AnalyticsChartsProps) {
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const areaChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generate sample data if not provided
    const generateSampleData = () => {
      const days = [];
      const timeData = [];
      const costData = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        timeData.push(Math.floor(Math.random() * 120) + 30); // 30-150 minutes
        costData.push(Math.random() * 5 + 1); // €1-6
      }
      return { days, timeData, costData };
    };

    const { days, timeData, costData: costValues } = generateSampleData();

    // Draw Line Chart (Time Watched Over Time)
    if (lineChartRef.current) {
      drawLineChart(lineChartRef.current, days, timeData, 'Time Watched (minutes)');
    }

    // Draw Bar Chart (Cost per Content)
    if (barChartRef.current) {
      drawBarChart(barChartRef.current, days, costValues, 'Cost (€)');
    }

    // Draw Area Chart (Monthly Spend)
    if (areaChartRef.current) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const monthlyData = months.map(() => Math.random() * 50 + 20); // €20-70
      drawAreaChart(areaChartRef.current, months, monthlyData, 'Monthly Spend (€)');
    }
  }, [timeWatchedData, costData, monthlySpend]);

  function drawLineChart(
    canvas: HTMLCanvasElement,
    labels: string[],
    data: number[],
    label: string
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw axes
    ctx.strokeStyle = '#e4e4e7';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw grid lines
    const maxValue = Math.max(...data, 1);
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i;
      ctx.strokeStyle = '#f4f4f5';
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1 || 1)) * index;
      const y = height - padding - (value / maxValue) * chartHeight;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#3b82f6';
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1 || 1)) * index;
      const y = height - padding - (value / maxValue) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = '#71717a';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
      const x = padding + (chartWidth / (labels.length - 1 || 1)) * index;
      ctx.fillText(label, x, height - padding + 20);
    });
  }

  function drawBarChart(
    canvas: HTMLCanvasElement,
    labels: string[],
    data: number[],
    label: string
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    ctx.clearRect(0, 0, width, height);

    // Draw axes
    ctx.strokeStyle = '#e4e4e7';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw bars
    const maxValue = Math.max(...data, 1);
    const barWidth = chartWidth / data.length - 10;
    data.forEach((value, index) => {
      const x = padding + (chartWidth / data.length) * index + 5;
      const barHeight = (value / maxValue) * chartHeight;
      const y = height - padding - barHeight;

      ctx.fillStyle = '#10b981';
      ctx.fillRect(x, y, barWidth, barHeight);
    });

    // Draw labels
    ctx.fillStyle = '#71717a';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
      const x = padding + (chartWidth / data.length) * index + chartWidth / data.length / 2;
      ctx.fillText(label, x, height - padding + 20);
    });
  }

  function drawAreaChart(
    canvas: HTMLCanvasElement,
    labels: string[],
    data: number[],
    label: string
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    ctx.clearRect(0, 0, width, height);

    // Draw axes
    ctx.strokeStyle = '#e4e4e7';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw area
    const maxValue = Math.max(...data, 1);
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1 || 1)) * index;
      const y = height - padding - (value / maxValue) * chartHeight;
      if (index === 0) {
        ctx.moveTo(x, height - padding);
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1 || 1)) * index;
      const y = height - padding - (value / maxValue) * chartHeight;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = '#71717a';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
      const x = padding + (chartWidth / (labels.length - 1 || 1)) * index;
      ctx.fillText(label, x, height - padding + 20);
    });
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Line Chart */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Time Watched Over Time
        </h3>
        <canvas ref={lineChartRef} width={300} height={200} className="w-full" />
      </div>

      {/* Bar Chart */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Cost per Content
        </h3>
        <canvas ref={barChartRef} width={300} height={200} className="w-full" />
      </div>

      {/* Area Chart */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Monthly Spend
        </h3>
        <canvas ref={areaChartRef} width={300} height={200} className="w-full" />
      </div>
    </div>
  );
}

