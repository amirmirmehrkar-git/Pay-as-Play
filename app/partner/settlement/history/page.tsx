'use client';

/**
 * Settlement History Page
 * Displays settlement history with filters, sorting, and pagination
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SettlementFilters, { SettlementStatus } from '@/components/SettlementFilters';
import SettlementList, { Settlement, SortField } from '@/components/SettlementList';
import SettlementDetailsModal from '@/components/SettlementDetailsModal';
import { DateRangeOption } from '@/components/DateRangeSelector';

interface SettlementHistoryResponse {
  settlements: Settlement[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function SettlementHistoryPage() {
  const [status, setStatus] = useState<SettlementStatus>('all');
  const [dateRange, setDateRange] = useState<DateRangeOption>('thisMonth');
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('date');
  const [page, setPage] = useState(1);
  const [data, setData] = useState<SettlementHistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSettlement, setSelectedSettlement] = useState<Settlement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        status: status === 'all' ? '' : status,
        page: page.toString(),
        limit: '20',
        sortBy,
      });

      if (dateRange === 'custom' && startDate && endDate) {
        params.append('startDate', startDate);
        params.append('endDate', endDate);
      }

      if (search) {
        params.append('search', search);
      }

      const response = await fetch(`/api/partner/settlement/history?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch settlement history');
      }

      const result = await response.json();
      if (result.success && result.data) {
        setData(result.data);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settlement history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [status, dateRange, startDate, endDate, search, sortBy, page]);

  const handleStatusChange = (newStatus: SettlementStatus) => {
    setStatus(newStatus);
    setPage(1); // Reset to first page
  };

  const handleDateRangeChange = (range: DateRangeOption, start?: string, end?: string) => {
    setDateRange(range);
    setStartDate(start);
    setEndDate(end);
    setPage(1); // Reset to first page
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1); // Reset to first page
  };

  const handleClearFilters = () => {
    setStatus('all');
    setDateRange('thisMonth');
    setStartDate(undefined);
    setEndDate(undefined);
    setSearch('');
    setPage(1);
  };

  const handleSettlementClick = (settlement: Settlement) => {
    setSelectedSettlement(settlement);
    setIsModalOpen(true);
  };

  const handleSortChange = (field: SortField) => {
    setSortBy(field);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/partner" className="hover:text-blue-600 dark:hover:text-blue-400">
              Partner
            </Link>
            <span className="mx-2">/</span>
            <Link href="/partner/settlement" className="hover:text-blue-600 dark:hover:text-blue-400">
              Settlement
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-zinc-100">History</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">Settlement History</h1>
          <p className="text-zinc-600 dark:text-zinc-400">View and manage all your settlement records</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 rounded-xl border-2 border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-red-700 dark:text-red-400">Error loading data</p>
                <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
              </div>
              <button
                onClick={fetchData}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6">
          <SettlementFilters
            status={status}
            dateRange={dateRange}
            startDate={startDate}
            endDate={endDate}
            search={search}
            onStatusChange={handleStatusChange}
            onDateRangeChange={handleDateRangeChange}
            onSearchChange={handleSearchChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Settlement List */}
        <div className="mb-6">
          <SettlementList
            settlements={data?.settlements || []}
            loading={loading}
            onSettlementClick={handleSettlementClick}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Pagination */}
        {data && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Showing {((data.pagination.page - 1) * data.pagination.limit) + 1} to{' '}
              {Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)} of{' '}
              {data.pagination.total} settlements
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                Previous
              </button>
              <span className="flex items-center px-4 py-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Page {data.pagination.page} of {data.pagination.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
                disabled={page === data.pagination.totalPages}
                className="rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-6">
          <Link
            href="/partner/settlement"
            className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Back to Settlement Overview
          </Link>
        </div>
      </div>

      {/* Settlement Details Modal */}
      <SettlementDetailsModal
        settlement={selectedSettlement}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSettlement(null);
        }}
      />
    </div>
  );
}

