import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/partner/platforms
 * Create a new platform
 * 
 * This is a mock implementation for development.
 * In production, this should connect to the actual backend.
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platformType, platformName, platformDescription } = body;

    // Validation
    if (!platformType || !platformName) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Platform type and name are required',
          },
        },
        { status: 400 }
      );
    }

    if (platformName.length < 2 || platformName.length > 50) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Platform name must be between 2-50 characters',
          },
        },
        { status: 400 }
      );
    }

    // Generate mock platformId
    const platformId = `pp_${Math.random().toString(36).substring(2, 11)}`;

    // Mock response
    return NextResponse.json(
      {
        success: true,
        data: {
          platformId,
          platformType,
          platformName,
          platformDescription: platformDescription || '',
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating platform:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to create platform',
        },
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/partner/platforms
 * Get list of platforms
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const platformType = searchParams.get('platformType');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Mock response
    return NextResponse.json(
      {
        success: true,
        data: {
          platforms: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching platforms:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch platforms',
        },
      },
      { status: 500 }
    );
  }
}

