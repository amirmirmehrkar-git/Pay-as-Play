'use client';

/**
 * LMS Course Progress List Component
 * Displays list of courses with progress bars, sorting, and filtering
 */

import { useState } from 'react';

export type CompletionStatus = 'in_progress' | 'completed' | 'not_started';

export interface LMSCourseProgress {
  id: string;
  courseId: string;
  name: string;
  thumbnail: string | null;
  progressPercentage: number;
  timeSpent: number; // seconds
  totalTime: number; // seconds
  amountSpent: number; // PLY
  lastAccessed: string;
  completionStatus: CompletionStatus;
}

interface LMSCourseProgressListProps {
  courses: LMSCourseProgress[];
  loading?: boolean;
  onCourseClick: (course: LMSCourseProgress) => void;
  sortBy?: 'progress' | 'date' | 'amount' | 'name';
  onSortChange?: (sortBy: 'progress' | 'date' | 'amount' | 'name') => void;
  filterBy?: CompletionStatus | 'all';
  onFilterChange?: (filter: CompletionStatus | 'all') => void;
}

export default function LMSCourseProgressList({
  courses,
  loading = false,
  onCourseClick,
  sortBy: initialSortBy = 'progress',
  onSortChange,
  filterBy: initialFilterBy = 'all',
  onFilterChange,
}: LMSCourseProgressListProps) {
  const [sortBy, setSortBy] = useState<'progress' | 'date' | 'amount' | 'name'>(initialSortBy);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterBy, setFilterBy] = useState<CompletionStatus | 'all'>(initialFilterBy);

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

  const getStatusColor = (status: CompletionStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'not_started':
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400';
    }
  };

  const handleSort = (field: 'progress' | 'date' | 'amount' | 'name') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
    if (onSortChange) {
      onSortChange(field);
    }
  };

  const handleFilter = (filter: CompletionStatus | 'all') => {
    setFilterBy(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    if (filterBy === 'all') return true;
    return course.completionStatus === filterBy;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'progress':
        comparison = a.progressPercentage - b.progressPercentage;
        break;
      case 'date':
        comparison = new Date(a.lastAccessed).getTime() - new Date(b.lastAccessed).getTime();
        break;
      case 'amount':
        comparison = a.amountSpent - b.amountSpent;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

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
      {/* Sort and Filter Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Sort by:</span>
          {(['progress', 'date', 'amount', 'name'] as const).map((field) => (
            <button
              key={field}
              type="button"
              onClick={() => handleSort(field)}
              className={`rounded-lg border-2 px-3 py-1 text-xs font-semibold transition-all ${
                sortBy === field
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
              }`}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
              {sortBy === field && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Filter:</span>
          {(['all', 'in_progress', 'completed', 'not_started'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => handleFilter(filter)}
              className={`rounded-lg border-2 px-3 py-1 text-xs font-semibold transition-all ${
                filterBy === filter
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
              }`}
            >
              {filter === 'all' ? 'All' : filter.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Course List */}
      {sortedCourses.length === 0 ? (
        <div className="rounded-xl border-2 border-zinc-200 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">No courses found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedCourses.map((course) => (
            <div
              key={course.id}
              className="cursor-pointer rounded-xl border-2 border-zinc-200 bg-white p-4 transition-all hover:border-blue-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-blue-500"
              onClick={() => onCourseClick(course)}
            >
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.name} className="h-16 w-16 rounded-lg object-cover" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-2xl text-white">
                    📚
                  </div>
                )}

                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{course.name}</h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">{course.courseId}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${getStatusColor(course.completionStatus)}`}
                    >
                      {course.completionStatus.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-zinc-600 dark:text-zinc-400">Progress</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">{course.progressPercentage}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${course.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                    <span>
                      {formatDuration(course.timeSpent)} / {formatDuration(course.totalTime)}
                    </span>
                    <span>{course.amountSpent.toFixed(2)} PLY</span>
                    <span>Last accessed: {formatDate(course.lastAccessed)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

