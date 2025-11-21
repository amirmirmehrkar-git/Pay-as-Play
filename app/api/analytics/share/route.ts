import { NextRequest, NextResponse } from 'next/server';

interface ShareRequestPayload {
  partnerIds: string[];
  message?: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ShareRequestPayload = await request.json();

    if (!body.partnerIds || body.partnerIds.length === 0) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Please select at least one partner' } },
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(
      {
        success: true,
        data: {
          shareId: `share_${Date.now()}`,
          sharedWith: body.partnerIds,
          message: body.message,
          dateRange: body.dateRange,
          link: `https://pay-as-play.example.com/share/${Date.now()}`,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sharing analytics data:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error.message || 'Internal server error' } },
      { status: 500 }
    );
  }
}

