import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: { message: 'Email and password are required' } },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: { message: 'Password must be at least 6 characters' } },
        { status: 400 }
      );
    }

    // Mock user creation - in production, create in database
    const mockUser = {
      id: `user_${Date.now()}`,
      email,
      name: name || email.split('@')[0],
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
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message || 'Sign up failed' } },
      { status: 500 }
    );
  }
}

