'use client';

import { useState, useEffect } from 'react';

interface ShareWithPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStartDate: string;
  defaultEndDate: string;
  onShared?: () => void;
}

interface Partner {
  id: string;
  name: string;
  platform: string;
}

export default function ShareWithPartnerModal({
  isOpen,
  onClose,
  defaultStartDate,
  defaultEndDate,
  onShared,
}: ShareWithPartnerModalProps) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  useEffect(() => {
    if (!isOpen) return;
    setPartners([
      { id: 'partner_1', name: 'Streamify Media', platform: 'Streaming' },
      { id: 'partner_2', name: 'EduFlow Academy', platform: 'Learning' },
      { id: 'partner_3', name: 'AudioBoost', platform: 'Audio' },
    ]);
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePartner = (id: string) => {
    setSelectedPartners((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleShare = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/analytics/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerIds: selectedPartners,
          message,
          dateRange: { start: startDate, end: endDate },
        }),
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to share data');
      }
      onShared?.();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to share data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Share Analytics with Partner
          </h3>
          <button
            onClick={onClose}
            className="text-zinc-400 transition hover:text-zinc-600 dark:hover:text-zinc-200"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Start Date</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
              <div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">End Date</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Select Partners
            </label>
            <div className="space-y-2 rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
              {partners.map((partner) => (
                <label key={partner.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">{partner.name}</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">{partner.platform}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedPartners.includes(partner.id)}
                    onChange={() => togglePartner(partner.id)}
                    className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700"
                  />
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              placeholder="Add a note for your partner"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            disabled={loading || selectedPartners.length === 0}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </div>
      </div>
    </div>
  );
}

