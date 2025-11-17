'use client';

/**
 * LMS Progress Tracking Page
 * Displays learning progress, statistics, and charts
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LMSProgressOverview from '@/components/LMSProgressOverview';
import LMSCourseProgressList, { LMSCourseProgress } from '@/components/LMSCourseProgressList';
import LMSProgressCharts from '@/components/LMSProgressCharts';
import LMSLearningStatistics from '@/components/LMSLearningStatistics';
import LMSCourseDetails, { LMSCourseDetails as CourseDetailsType } from '@/components/LMSCourseDetails';
import { DateRangeOption } from '@/components/DateRangeSelector';

export default function LMSProgressPage() {
  const [summary, setSummary] = useState({
    totalCoursesEnrolled: 0,
    totalTimeSpent: 0,
    totalAmountSpent: 0,
    completionRate: 0,
  });
  const [courses, setCourses] = useState<LMSCourseProgress[]>([]);
  const [statistics, setStatistics] = useState({
    dailyStreak: 0,
    averageSessionDuration: 0,
    mostActiveDay: 'Monday',
    favoriteCategory: 'Web Development',
  });
  const [chartData, setChartData] = useState({
    timeSpentOverTime: [] as { date: string; time: number }[],
    amountSpentPerCourse: [] as { course: string; amount: number }[],
    progressDistribution: { completed: 0, inProgress: 0, notStarted: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetailsType | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeOption>('thisMonth');
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  useEffect(() => {
    fetchProgress();
  }, [dateRange, startDate, endDate]);

  const fetchProgress = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await fetch(`/api/lms/progress?${params.toString()}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setSummary(result.data.summary);
          setCourses(result.data.courses);
          setStatistics(result.data.statistics);
          setChartData(result.data.chartData);
        }
      }
    } catch (err) {
      console.error('Error fetching progress:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (range: DateRangeOption, start?: string, end?: string) => {
    setDateRange(range);
    setStartDate(start);
    setEndDate(end);
  };

  const handleCourseClick = async (course: LMSCourseProgress) => {
    try {
      const response = await fetch(`/api/lms/progress/${course.id}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          // Convert progress data to course details format
          const courseDetails: CourseDetailsType = {
            id: course.id,
            courseId: course.courseId,
            name: course.name,
            description: '',
            lessonsCount: 0,
            totalDuration: course.totalTime,
            syncStatus: 'synced',
            lastUpdated: course.lastAccessed,
            lessons: [],
          };
          setSelectedCourse(courseDetails);
        }
      }
    } catch (err) {
      console.error('Error fetching course progress details:', err);
    }
  };

  const handleRefreshProgress = async () => {
    try {
      const response = await fetch('/api/lms/progress/refresh', {
        method: 'POST',
      });
      if (response.ok) {
        await fetchProgress();
      }
    } catch (err) {
      console.error('Error refreshing progress:', err);
    }
  };

  const handleExportCSV = () => {
    // Simple CSV export
    const csv = [
      ['Course Name', 'Progress %', 'Time Spent', 'Amount Spent', 'Status'].join(','),
      ...courses.map((c) =>
        [c.name, c.progressPercentage, c.timeSpent, c.amountSpent, c.completionStatus].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lms-progress-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
            <span className="text-zinc-900 dark:text-zinc-100">Progress</span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">Learning Progress</h1>
              <p className="text-zinc-600 dark:text-zinc-400">Track your learning progress and spending</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleRefreshProgress}
                className="rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
              >
                Refresh Progress
              </button>
              <button
                type="button"
                onClick={handleExportCSV}
                className="rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mb-6">
          <LMSProgressOverview
            totalCoursesEnrolled={summary.totalCoursesEnrolled}
            totalTimeSpent={summary.totalTimeSpent}
            totalAmountSpent={summary.totalAmountSpent}
            completionRate={summary.completionRate}
            dateRange={dateRange}
            startDate={startDate}
            endDate={endDate}
            onDateRangeChange={handleDateRangeChange}
            loading={loading}
          />
        </div>

        {/* Learning Statistics */}
        <div className="mb-6">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Learning Statistics</h2>
          <LMSLearningStatistics
            dailyStreak={statistics.dailyStreak}
            averageSessionDuration={statistics.averageSessionDuration}
            mostActiveDay={statistics.mostActiveDay}
            favoriteCategory={statistics.favoriteCategory}
            loading={loading}
          />
        </div>

        {/* Progress Charts */}
        <div className="mb-6">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Progress Charts</h2>
          <LMSProgressCharts
            timeSpentOverTime={chartData.timeSpentOverTime}
            amountSpentPerCourse={chartData.amountSpentPerCourse}
            progressDistribution={chartData.progressDistribution}
            loading={loading}
          />
        </div>

        {/* Course Progress List */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Course Progress</h2>
          <LMSCourseProgressList
            courses={courses}
            loading={loading}
            onCourseClick={handleCourseClick}
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

