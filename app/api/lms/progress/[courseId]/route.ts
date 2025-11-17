import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/lms/progress/:courseId
 * Get detailed progress for a specific course
 * 
 * This is a mock implementation for development.
 * In production, this should fetch from the actual backend.
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;

    // Mock course progress details
    const mockCourseProgress = {
      courseId,
      courseName: 'Introduction to Web Development',
      overallProgress: 75,
      timeSpent: 2700,
      totalTime: 3600,
      amountSpent: 37.5,
      lessons: [
        {
          id: 'lesson_1',
          name: 'Introduction to HTML',
          duration: 300,
          status: 'completed' as const,
          amountSpent: 4.17,
          dateCompleted: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: 'lesson_2',
          name: 'CSS Basics',
          duration: 450,
          status: 'completed' as const,
          amountSpent: 4.17,
          dateCompleted: new Date(Date.now() - 129600000).toISOString(),
        },
        {
          id: 'lesson_3',
          name: 'JavaScript Fundamentals',
          duration: 600,
          status: 'in_progress' as const,
          amountSpent: 2.08,
          dateCompleted: null,
        },
        {
          id: 'lesson_4',
          name: 'DOM Manipulation',
          duration: 450,
          status: 'not_started' as const,
          amountSpent: 0,
          dateCompleted: null,
        },
      ],
      progressChart: [
        { date: '2025-01-20', progress: 0 },
        { date: '2025-01-21', progress: 25 },
        { date: '2025-01-22', progress: 25 },
        { date: '2025-01-23', progress: 50 },
        { date: '2025-01-24', progress: 50 },
        { date: '2025-01-25', progress: 75 },
      ],
      timeSpentChart: [
        { date: '2025-01-20', time: 0 },
        { date: '2025-01-21', time: 300 },
        { date: '2025-01-22', time: 300 },
        { date: '2025-01-23', time: 750 },
        { date: '2025-01-24', time: 750 },
        { date: '2025-01-25', time: 1350 },
      ],
    };

    return NextResponse.json(
      {
        success: true,
        data: mockCourseProgress,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching course progress:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch course progress',
        },
      },
      { status: 500 }
    );
  }
}

