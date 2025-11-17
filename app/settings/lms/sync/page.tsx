'use client';

/**
 * LMS Course Sync Page
 * Allows users to sync courses from their connected LMS
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LMSSyncStatus from '@/components/LMSSyncStatus';
import LMSSyncActions from '@/components/LMSSyncActions';
import LMSCourseList, { LMSCourse } from '@/components/LMSCourseList';
import LMSCourseDetails, { LMSCourseDetails as CourseDetailsType } from '@/components/LMSCourseDetails';

export default function LMSSyncPage() {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error'>('connected');
  const [lastSyncDate, setLastSyncDate] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<'success' | 'failed' | 'in_progress' | null>(null);
  const [coursesSynced, setCoursesSynced] = useState(0);
  const [courses, setCourses] = useState<LMSCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetailsType | null>(null);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(false);
  const [autoSyncFrequency, setAutoSyncFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Fetch connections and courses
  useEffect(() => {
    fetchConnections();
    fetchCourses();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await fetch('/api/lms/connections');
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data?.connections?.length > 0) {
          const connection = result.data.connections[0];
          setConnectionStatus(connection.status || 'connected');
          setLastSyncDate(connection.lastSyncAt);
        }
      }
    } catch (err) {
      console.error('Error fetching connections:', err);
      setConnectionStatus('error');
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/lms/courses');
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data?.courses) {
          setCourses(result.data.courses);
          setCoursesSynced(result.data.courses.filter((c: LMSCourse) => c.syncStatus === 'synced').length);
        }
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncStatus('in_progress');
    setSyncProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const response = await fetch('/api/lms/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          connectionId: 'lms_123',
          courseIds: selectedCourseIds.length > 0 ? selectedCourseIds : undefined,
        }),
      });

      clearInterval(progressInterval);
      setSyncProgress(100);

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setSyncStatus('success');
          setLastSyncDate(new Date().toISOString());
          await fetchCourses();
        } else {
          throw new Error('Sync failed');
        }
      } else {
        throw new Error('Sync failed');
      }
    } catch (err) {
      setSyncStatus('failed');
      console.error('Error syncing courses:', err);
    } finally {
      setIsSyncing(false);
      setTimeout(() => {
        setSyncProgress(0);
        setSyncStatus(null);
      }, 2000);
    }
  };

  const handleAutoSyncChange = (enabled: boolean, frequency: 'daily' | 'weekly' | 'monthly') => {
    setAutoSyncEnabled(enabled);
    setAutoSyncFrequency(frequency);
    // In production, this would save to backend
  };

  const handleCourseClick = async (course: LMSCourse) => {
    try {
      const response = await fetch(`/api/lms/courses/${course.id}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setSelectedCourse(result.data);
        }
      }
    } catch (err) {
      console.error('Error fetching course details:', err);
    }
  };

  const handleRetrySync = async (courseId: string) => {
    setSelectedCourseIds([courseId]);
    await handleSyncNow();
  };

  const handleSyncSelected = () => {
    if (selectedCourseIds.length > 0) {
      handleSyncNow();
    }
  };

  const handleSyncAll = () => {
    setSelectedCourseIds([]);
    handleSyncNow();
  };

  const handleRefreshFromLMS = async () => {
    await fetchCourses();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/settings" className="hover:text-blue-600 dark:hover:text-blue-400">
              Settings
            </Link>
            <span className="mx-2">/</span>
            <Link href="/settings/lms" className="hover:text-blue-600 dark:hover:text-blue-400">
              LMS Integration
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-zinc-100">Sync Courses</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">Sync Courses</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Sync your courses from your connected LMS platform
          </p>
        </div>

        {/* Sync Status */}
        <div className="mb-6">
          <LMSSyncStatus
            connectionStatus={connectionStatus}
            lastSyncDate={lastSyncDate}
            syncStatus={syncStatus}
            coursesSynced={coursesSynced}
            loading={loading}
          />
        </div>

        {/* Sync Actions */}
        <div className="mb-6">
          <LMSSyncActions
            onSyncNow={handleSyncAll}
            onAutoSyncChange={handleAutoSyncChange}
            isSyncing={isSyncing}
            autoSyncEnabled={autoSyncEnabled}
            autoSyncFrequency={autoSyncFrequency}
            syncProgress={syncProgress}
          />
        </div>

        {/* Manual Sync Options */}
        {selectedCourseIds.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSyncSelected}
              disabled={isSyncing}
              className="rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sync Selected ({selectedCourseIds.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCourseIds([])}
              className="rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
            >
              Clear Selection
            </button>
            <button
              type="button"
              onClick={handleRefreshFromLMS}
              disabled={loading}
              className="rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
            >
              Refresh from LMS
            </button>
          </div>
        )}

        {/* Course List */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Synced Courses</h2>
          <LMSCourseList
            courses={courses}
            loading={loading}
            onCourseClick={handleCourseClick}
            onRetrySync={handleRetrySync}
            selectedCourseIds={selectedCourseIds}
            onSelectionChange={setSelectedCourseIds}
            showSelection={true}
          />
        </div>

        {/* Course Details Modal */}
        {selectedCourse && (
          <LMSCourseDetails course={selectedCourse} onClose={() => setSelectedCourse(null)} />
        )}
      </div>
    </div>
  );
}

