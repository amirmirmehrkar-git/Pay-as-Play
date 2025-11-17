'use client';

/**
 * LMS Course Details Modal Component
 * Displays detailed information about a specific course
 */

import { useState, useEffect } from 'react';

export interface LMSCourseLesson {
  id: string;
  name: string;
  duration: number; // seconds
  status: 'completed' | 'in_progress' | 'not_started';
  amountSpent: number;
  completedAt: string | null;
}

export interface LMSCourseDetails {
  id: string;
  courseId: string;
  name: string;
  description: string;
  lessonsCount: number;
  totalDuration: number;
  syncStatus: 'synced' | 'pending' | 'failed';
  lastUpdated: string;
  pricing?: {
    currency: string;
    amount: number;
    perLesson: number;
  };
  lessons: LMSCourseLesson[];
}

interface LMSCourseDetailsProps {
  course: LMSCourseDetails | null;
  onClose: () => void;
  loading?: boolean;
}

export default function LMSCourseDetails({ course, onClose, loading = false }: LMSCourseDetailsProps) {
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  // Handle Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!course) return null;

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not completed';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'not_started':
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400';
      default:
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400';
    }
  };

  const completedLessons = course.lessons.filter((l) => l.status === 'completed').length;
  const progressPercentage = (completedLessons / course.lessons.length) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-details-title"
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 id="course-details-title" className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {course.name}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{course.courseId}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-600 transition-all hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Course Info */}
        <div className="mb-6 space-y-4">
          <p className="text-zinc-700 dark:text-zinc-300">{course.description}</p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Lessons</p>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{course.lessonsCount}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Total Duration</p>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {formatDuration(course.totalDuration)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Progress</p>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {Math.round(progressPercentage)}%
              </p>
            </div>
            {course.pricing && (
              <div>
                <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Total Cost</p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {course.pricing.amount} {course.pricing.currency}
                </p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Lessons</h3>
          <div className="space-y-2">
            {course.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="rounded-lg border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{lesson.name}</h4>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                      <span>{formatDuration(lesson.duration)}</span>
                      <span>{lesson.amountSpent} {course.pricing?.currency || 'PLY'}</span>
                      {lesson.completedAt && <span>Completed: {formatDate(lesson.completedAt)}</span>}
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${getStatusColor(lesson.status)}`}
                  >
                    {lesson.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

