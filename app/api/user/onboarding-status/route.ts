import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock onboarding status check
    // In production, check from database or session
    const completed = false; // Default to false for new users

    return NextResponse.json({
      success: true,
      data: {
        completed,
        completedAt: completed ? new Date().toISOString() : null,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: { message: (error instanceof Error ? error.message : 'Internal server error') || 'Failed to check onboarding status' } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { completed } = body;

    // Mock onboarding completion
    // In production, save to database or session
    return NextResponse.json({
      success: true,
      data: {
        completed: completed === true,
        completedAt: completed ? new Date().toISOString() : null,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: { message: (error instanceof Error ? error.message : 'Internal server error') || 'Failed to update onboarding status' } },
      { status: 500 }
    );
  }
}

