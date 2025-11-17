import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/lms/progress
 * Get learning progress data for the current user
 * 
 * This is a mock implementation for development.
 * In production, this should fetch from the actual backend.
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Mock progress data
    const mockProgress = {
      summary: {
        totalCoursesEnrolled: 4,
        totalTimeSpent: 14400, // seconds
        totalAmountSpent: 200, // PLY
        completionRate: 65, // percentage
      },
      courses: [
        {
          id: 'course_1',
          courseId: 'LMS_COURSE_001',
          name: 'Introduction to Web Development',
          thumbnail: null,
          progressPercentage: 75,
          timeSpent: 2700,
          totalTime: 3600,
          amountSpent: 37.5,
          lastAccessed: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          completionStatus: 'in_progress' as const,
        },
        {
          id: 'course_2',
          courseId: 'LMS_COURSE_002',
          name: 'Advanced JavaScript',
          thumbnail: null,
          progressPercentage: 100,
          timeSpent: 5400,
          totalTime: 5400,
          amountSpent: 75,
          lastAccessed: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          completionStatus: 'completed' as const,
        },
        {
          id: 'course_3',
          courseId: 'LMS_COURSE_003',
          name: 'React Fundamentals',
          thumbnail: null,
          progressPercentage: 0,
          timeSpent: 0,
          totalTime: 7200,
          amountSpent: 0,
          lastAccessed: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          completionStatus: 'not_started' as const,
        },
        {
          id: 'course_4',
          courseId: 'LMS_COURSE_004',
          name: 'Node.js Backend Development',
          thumbnail: null,
          progressPercentage: 50,
          timeSpent: 3150,
          totalTime: 6300,
          amountSpent: 43.75,
          lastAccessed: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          completionStatus: 'in_progress' as const,
        },
      ],
      statistics: {
        dailyStreak: 5,
        averageSessionDuration: 1800, // seconds
        mostActiveDay: 'Monday',
        favoriteCategory: 'Web Development',
      },
      chartData: {
        timeSpentOverTime: [
          { date: '2025-01-20', time: 1800 },
          { date: '2025-01-21', time: 2400 },
          { date: '2025-01-22', time: 2100 },
          { date: '2025-01-23', time: 2700 },
          { date: '2025-01-24', time: 3000 },
          { date: '2025-01-25', time: 2400 },
        ],
        amountSpentPerCourse: [
          { course: 'Web Development', amount: 37.5 },
          { course: 'Advanced JavaScript', amount: 75 },
          { course: 'React Fundamentals', amount: 0 },
          { course: 'Node.js Backend', amount: 43.75 },
        ],
        progressDistribution: {
          completed: 1,
          inProgress: 2,
          notStarted: 1,
        },
      },
    };

    return NextResponse.json(
      {
        success: true,
        data: mockProgress,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch progress',
        },
      },
      { status: 500 }
    );
  }
}

