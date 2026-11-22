import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // This endpoint is a demonstration implementation, not a production service.
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { success: false, error: { code: 'DEMO_DISABLED', message: 'Demo endpoint is unavailable in production' } },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: { message: 'Email and password are required' } },
        { status: 400 }
      );
    }

    // Mock authentication - in production, verify against database
    // For now, accept any email/password combination
    const mockUser = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
    };

    // Mock JWT token (in production, use a real JWT library)
    const mockToken = `mock_jwt_token_${Date.now()}`;

    return NextResponse.json({
      success: true,
      data: {
        user: mockUser,
        token: mockToken,
        expiresIn: 86400, // 24 hours
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: { message: (error instanceof Error ? error.message : 'Internal server error') || 'Sign in failed' } },
      { status: 500 }
    );
  }
}

