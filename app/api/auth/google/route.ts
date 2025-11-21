import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock Google OAuth flow
    // In production, this would redirect to Google OAuth
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) {
      // Return mock OAuth URL for testing
      return NextResponse.json({
        success: true,
        data: {
          authUrl: 'https://accounts.google.com/o/oauth2/v2/auth?mock=true',
        },
      });
    }

    // Mock user data from Google OAuth
    const mockUser = {
      id: `user_${Date.now()}`,
      email: 'user@gmail.com',
      name: 'Google User',
      provider: 'google',
      createdAt: new Date().toISOString(),
    };

    // Mock JWT token
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
      { success: false, error: { message: error.message || 'Google sign in failed' } },
      { status: 500 }
    );
  }
}

