import { format } from 'date-fns';

export interface AnalyticsExportOptions {
  startDate: string;
  endDate: string;
  includeCharts?: boolean;
  includeTransactions?: boolean;
  includeSummary?: boolean;
}

export interface AnalyticsExportPayload {
  summary: {
    totalTimeWatched: string;
    totalSpent: string;
    contentCount: number;
  };
  timeWatched: { date: string; minutes: number }[];
  costPerContent: {
    contentName: string;
    totalAmount: number;
    timeWatched: number;
    platform: string;
  }[];
  monthlySpend: { month: string; spend: number }[];
  transactions: {
    id: string;
    date: string;
    platform: string;
    title: string;
    category: string;
    timeWatched: number;
    cost: number;
  }[];
}

export function buildCSVContent(
  data: AnalyticsExportPayload,
  options: Pick<AnalyticsExportOptions, 'includeCharts' | 'includeSummary' | 'includeTransactions'> & {
    startDate: string;
    endDate: string;
  }
) {
  const csvLines: string[] = [];

  csvLines.push('"Analytics Export"');
  csvLines.push(`"Date Range","${options.startDate} - ${options.endDate}"`);
  csvLines.push('');

  if (options.includeSummary !== false) {
    csvLines.push('"Summary"');
    csvLines.push('"Metric","Value"');
    csvLines.push(`"Total Time Watched","${data.summary.totalTimeWatched}"`);
    csvLines.push(`"Total Spent","${data.summary.totalSpent}"`);
    csvLines.push(`"Content Count","${data.summary.contentCount}"`);
    csvLines.push('');
  }

  if (options.includeCharts !== false) {
    csvLines.push('"Time Watched"');
    csvLines.push('"Date","Minutes"');
    data.timeWatched.forEach((entry) => {
      csvLines.push(`"${entry.date}","${entry.minutes}"`);
    });
    csvLines.push('');

    csvLines.push('"Cost per Content"');
    csvLines.push('"Content","Amount","Time Watched (min)","Platform"');
    data.costPerContent.forEach((entry) => {
      csvLines.push(
        `"${entry.contentName}","${entry.totalAmount.toFixed(2)}","${entry.timeWatched}","${entry.platform}"`
      );
    });
    csvLines.push('');

    csvLines.push('"Monthly Spend"');
    csvLines.push('"Month","Amount"');
    data.monthlySpend.forEach((entry) => {
      csvLines.push(`"${entry.month}","${entry.spend.toFixed(2)}"`);
    });
    csvLines.push('');
  }

  if (options.includeTransactions !== false) {
    csvLines.push('"Transaction History"');
    csvLines.push('"ID","Date","Platform","Title","Category","Time Watched (min)","Cost"');
    data.transactions.forEach((tx) => {
      csvLines.push(
        `"${tx.id}","${tx.date}","${tx.platform}","${tx.title}","${tx.category}","${tx.timeWatched}","${tx.cost.toFixed(
          2
        )}"`
      );
    });
  }

  return csvLines.join('\n');
}

export async function exportAnalyticsCSV(options: AnalyticsExportOptions) {
  const params = new URLSearchParams({
    startDate: options.startDate,
    endDate: options.endDate,
    includeCharts: String(options.includeCharts ?? true),
    includeTransactions: String(options.includeTransactions ?? true),
    includeSummary: String(options.includeSummary ?? true),
  });

  const response = await fetch(`/api/analytics/export/csv?${params.toString()}`);
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error?.message || 'Failed to export CSV');
  }

  const data: AnalyticsExportPayload = result.data;
  const csvContent = buildCSVContent(data, options);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const dateSuffix = format(new Date(), 'yyyy-MM-dd');
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `analytics-${dateSuffix}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  const history = JSON.parse(localStorage.getItem('pap-export-history') || '[]');
  history.unshift({
    id: `csv_${Date.now()}`,
    type: 'csv',
    dateRange: { start: options.startDate, end: options.endDate },
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem('pap-export-history', JSON.stringify(history.slice(0, 10)));
}

