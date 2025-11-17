import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/lms/courses/:courseId
 * Get detailed information about a specific course
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

    // Mock course details
    const mockCourseDetails = {
      id: courseId,
      courseId: 'LMS_COURSE_001',
      name: 'Introduction to Web Development',
      description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
      lessonsCount: 12,
      totalDuration: 3600, // seconds
      syncStatus: 'synced' as const,
      lastUpdated: new Date(Date.now() - 86400000).toISOString(),
      pricing: {
        currency: 'PLY',
        amount: 50,
        perLesson: 4.17,
      },
      lessons: [
        {
          id: 'lesson_1',
          name: 'Introduction to HTML',
          duration: 300, // seconds
          status: 'completed' as const,
          amountSpent: 4.17,
          completedAt: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: 'lesson_2',
          name: 'CSS Basics',
          duration: 450,
          status: 'completed' as const,
          amountSpent: 4.17,
          completedAt: new Date(Date.now() - 129600000).toISOString(),
        },
        {
          id: 'lesson_3',
          name: 'JavaScript Fundamentals',
          duration: 600,
          status: 'in_progress' as const,
          amountSpent: 2.08,
          completedAt: null,
        },
        {
          id: 'lesson_4',
          name: 'DOM Manipulation',
          duration: 450,
          status: 'not_started' as const,
          amountSpent: 0,
          completedAt: null,
        },
        {
          id: 'lesson_5',
          name: 'Event Handling',
          duration: 400,
          status: 'not_started' as const,
          amountSpent: 0,
          completedAt: null,
        },
      ],
    };

    return NextResponse.json(
      {
        success: true,
        data: mockCourseDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching course details:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch course details',
        },
      },
      { status: 500 }
    );
  }
}

