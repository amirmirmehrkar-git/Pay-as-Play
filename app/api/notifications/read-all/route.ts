import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    // Mock: Mark all notifications as read
    // In production, update in database
    return NextResponse.json({
      success: true,
      data: {
        readAt: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: { message: (error instanceof Error ? error.message : 'Internal server error') || 'Failed to mark all notifications as read' } },
      { status: 500 }
    );
  }
}

