'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import UsageSummary from '@/components/UsageSummary';

function SummaryContent() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get('sessionId') || '';
  const totalCharge = parseFloat(searchParams.get('charge') || '0');
  const duration = parseInt(searchParams.get('duration') || '0');
  const contentTitle = searchParams.get('title') || 'Content';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        <UsageSummary
          sessionId={sessionId}
          totalCharge={totalCharge}
          duration={duration}
          contentTitle={contentTitle}
        />
      </div>
    </div>
  );
}

export default function SummaryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SummaryContent />
    </Suspense>
  );
}

