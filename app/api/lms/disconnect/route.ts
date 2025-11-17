import { NextRequest, NextResponse } from 'next/server';

/**
 * DELETE /api/lms/disconnect
 * Disconnect from an LMS platform
 * 
 * This is a mock implementation for development.
 * In production, this should connect to the actual backend.
 */

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { connectionId } = body;

    // Validation
    if (!connectionId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Connection ID is required',
          },
        },
        { status: 400 }
      );
    }

    // Mock response
    return NextResponse.json(
      {
        success: true,
        data: {
          connectionId,
          disconnectedAt: new Date().toISOString(),
        },
        message: 'LMS disconnected successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error disconnecting LMS:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to disconnect LMS',
        },
      },
      { status: 500 }
    );
  }
}

