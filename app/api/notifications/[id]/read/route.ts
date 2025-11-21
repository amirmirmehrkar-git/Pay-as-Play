import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Mock: Mark notification as read
    // In production, update in database
    return NextResponse.json({
      success: true,
      data: {
        id,
        read: true,
        readAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message || 'Failed to mark notification as read' } },
      { status: 500 }
    );
  }
}

