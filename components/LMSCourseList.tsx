'use client';

/**
 * LMS Course List Component
 * Displays list of synced courses with search, filter, and pagination
 */

import { useState } from 'react';

export type CourseSyncStatus = 'synced' | 'pending' | 'failed';

export interface LMSCourse {
  id: string;
  courseId: string;
  name: string;
  description: string;
  lessonsCount: number;
  totalDuration: number; // seconds
  syncStatus: CourseSyncStatus;
  lastUpdated: string;
  error?: string;
}

interface LMSCourseListProps {
  courses: LMSCourse[];
  loading?: boolean;
  onCourseClick: (course: LMSCourse) => void;
  onRetrySync?: (courseId: string) => void;
  selectedCourseIds?: string[];
  onSelectionChange?: (courseIds: string[]) => void;
  showSelection?: boolean;
}

export default function LMSCourseList({
  courses,
  loading = false,
  onCourseClick,
  onRetrySync,
  selectedCourseIds = [],
  onSelectionChange,
  showSelection = false,
}: LMSCourseListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CourseSyncStatus | 'all'>('all');

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: CourseSyncStatus) => {
    switch (status) {
      case 'synced':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.syncStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = () => {
    if (onSelectionChange) {
      if (selectedCourseIds.length === filteredCourses.length) {
        onSelectionChange([]);
      } else {
        onSelectionChange(filteredCourses.map((c) => c.id));
      }
    }
  };

  const handleToggleSelection = (courseId: string) => {
    if (onSelectionChange) {
      if (selectedCourseIds.includes(courseId)) {
        onSelectionChange(selectedCourseIds.filter((id) => id !== courseId));
      } else {
        onSelectionChange([...selectedCourseIds, courseId]);
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border-2 border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-700 dark:bg-zinc-800">
            <div className="h-6 w-48 rounded bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as CourseSyncStatus | 'all')}
          className="rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="all">All Status</option>
          <option value="synced">Synced</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Selection Controls */}
      {showSelection && onSelectionChange && (
        <div className="flex items-center justify-between rounded-lg border-2 border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50">
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            {selectedCourseIds.length === filteredCourses.length ? 'Deselect All' : 'Select All'}
          </button>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {selectedCourseIds.length} of {filteredCourses.length} selected
          </span>
        </div>
      )}

      {/* Course List */}
      {filteredCourses.length === 0 ? (
        <div className="rounded-xl border-2 border-zinc-200 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">No courses found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="cursor-pointer rounded-xl border-2 border-zinc-200 bg-white p-4 transition-all hover:border-blue-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-blue-500"
              onClick={() => onCourseClick(course)}
            >
              <div className="flex items-start gap-4">
                {/* Selection Checkbox */}
                {showSelection && onSelectionChange && (
                  <input
                    type="checkbox"
                    checked={selectedCourseIds.includes(course.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleToggleSelection(course.id);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1 h-4 w-4 rounded border-zinc-300 text-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                )}

                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{course.name}</h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">{course.courseId}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${getStatusColor(course.syncStatus)}`}
                    >
                      {course.syncStatus}
                    </span>
                  </div>

                  <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">{course.description}</p>

                  <div className="flex flex-wrap gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                    <span>{course.lessonsCount} lessons</span>
                    <span>{formatDuration(course.totalDuration)}</span>
                    <span>Updated: {formatDate(course.lastUpdated)}</span>
                  </div>

                  {/* Error Message */}
                  {course.syncStatus === 'failed' && course.error && (
                    <div className="mt-2 rounded-lg border-2 border-red-200 bg-red-50 p-2 dark:border-red-800 dark:bg-red-900/20">
                      <p className="text-xs text-red-600 dark:text-red-400">{course.error}</p>
                      {onRetrySync && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRetrySync(course.id);
                          }}
                          className="mt-2 text-xs font-semibold text-red-600 hover:underline dark:text-red-400"
                        >
                          Retry Sync
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

