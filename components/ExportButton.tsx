'use client';

import { useState } from 'react';
import ExportSettingsModal from './ExportSettingsModal';
import ShareWithPartnerModal from './ShareWithPartnerModal';
import { AnalyticsExportOptions, exportAnalyticsCSV } from '@/utils/exportCSV';
import { PDFExportOptions, exportAnalyticsPDF } from '@/utils/exportPDF';

interface ExportButtonProps {
  defaultStartDate: string;
  defaultEndDate: string;
}

export default function ExportButton({ defaultStartDate, defaultEndDate }: ExportButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<'csv' | 'pdf'>('csv');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleExportClick = (selectedMode: 'csv' | 'pdf') => {
    setMode(selectedMode);
    setMenuOpen(false);
    setSettingsOpen(true);
  };

  const handleExport = async (options: AnalyticsExportOptions & PDFExportOptions) => {
    try {
      setIsExporting(true);
      setStatusMessage('Preparing export...');
      setError(null);

      if (mode === 'csv') {
        await exportAnalyticsCSV(options);
        setStatusMessage('CSV exported successfully.');
      } else {
        await exportAnalyticsPDF({
          ...options,
          chartSelectors: ['#time-watched-chart', '#cost-chart', '#monthly-chart', '#platform-chart', '#content-type-chart'],
        });
        setStatusMessage('PDF exported successfully.');
      }
    } catch (err: any) {
      setError(err.message || 'Export failed.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleMenu}
        className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
      >
        Export Data
        <span className="text-xs text-zinc-500 dark:text-zinc-400">▼</span>
      </button>

      {menuOpen && (
        <div className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          <div className="py-1">
            <button
              onClick={() => handleExportClick('csv')}
              className="block w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Export as CSV
            </button>
            <button
              onClick={() => handleExportClick('pdf')}
              className="block w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Export as PDF
            </button>
            <button
              onClick={() => {
                setShareOpen(true);
                setMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Share with Partner
            </button>
          </div>
        </div>
      )}

      {statusMessage && (
        <div className="mt-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
          {statusMessage}
        </div>
      )}
      {error && (
        <div className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
          {error}{' '}
          <button onClick={() => handleExportClick(mode)} className="ml-2 text-xs underline">
            Retry
          </button>
        </div>
      )}

      <ExportSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
        mode={mode}
        isExporting={isExporting}
        onExport={handleExport}
      />

      <ShareWithPartnerModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
        onShared={() => {
          setStatusMessage('Data shared successfully.');
          setError(null);
        }}
      />
    </div>
  );
}

