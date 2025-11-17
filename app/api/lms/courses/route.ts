import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/lms/courses
 * Get all synced courses for the current user
 * 
 * This is a mock implementation for development.
 * In production, this should fetch from the actual backend.
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const connectionId = searchParams.get('connectionId');
    const search = searchParams.get('search');
    const status = searchParams.get('status'); // 'synced' | 'pending' | 'failed'
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Mock courses data
    const mockCourses = [
      {
        id: 'course_1',
        courseId: 'LMS_COURSE_001',
        name: 'Introduction to Web Development',
        description: 'Learn the fundamentals of web development',
        lessonsCount: 12,
        totalDuration: 3600, // seconds
        syncStatus: 'synced' as const,
        lastUpdated: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        connectionId: connectionId || 'lms_123',
      },
      {
        id: 'course_2',
        courseId: 'LMS_COURSE_002',
        name: 'Advanced JavaScript',
        description: 'Deep dive into JavaScript concepts',
        lessonsCount: 15,
        totalDuration: 5400,
        syncStatus: 'synced' as const,
        lastUpdated: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        connectionId: connectionId || 'lms_123',
      },
      {
        id: 'course_3',
        courseId: 'LMS_COURSE_003',
        name: 'React Fundamentals',
        description: 'Build modern UIs with React',
        lessonsCount: 20,
        totalDuration: 7200,
        syncStatus: 'pending' as const,
        lastUpdated: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        connectionId: connectionId || 'lms_123',
      },
      {
        id: 'course_4',
        courseId: 'LMS_COURSE_004',
        name: 'Node.js Backend Development',
        description: 'Server-side development with Node.js',
        lessonsCount: 18,
        totalDuration: 6300,
        syncStatus: 'failed' as const,
        lastUpdated: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        connectionId: connectionId || 'lms_123',
        error: 'Failed to fetch course data from LMS',
      },
    ];

    // Filter by search
    let filteredCourses = mockCourses;
    if (search) {
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.name.toLowerCase().includes(search.toLowerCase()) ||
          course.courseId.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by status
    if (status) {
      filteredCourses = filteredCourses.filter((course) => course.syncStatus === status);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    return NextResponse.json(
      {
        success: true,
        data: {
          courses: paginatedCourses,
          pagination: {
            page,
            limit,
            total: filteredCourses.length,
            totalPages: Math.ceil(filteredCourses.length / limit),
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch courses',
        },
      },
      { status: 500 }
    );
  }
}

