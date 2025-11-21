import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Mock: Delete notification
    // In production, delete from database
    return NextResponse.json({
      success: true,
      data: {
        id,
        deleted: true,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message || 'Failed to delete notification' } },
      { status: 500 }
    );
  }
}

