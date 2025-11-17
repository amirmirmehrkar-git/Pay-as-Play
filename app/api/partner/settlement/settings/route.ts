import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/partner/settlement/settings
 * Get settlement settings
 * 
 * PUT /api/partner/settlement/settings
 * Update settlement settings
 * 
 * This is a mock implementation for development.
 * In production, this should connect to the actual backend.
 */

export async function GET(request: NextRequest) {
  try {
    // Mock response
    return NextResponse.json(
      {
        success: true,
        data: {
          settlementFrequency: 'monthly',
          minimumSettlementAmount: 50,
          paymentMethod: {
            type: 'bank_transfer',
            details: {
              iban: 'DE89 3704 0044 0532 0130 00',
              bic: 'COBADEFFXXX',
              accountHolderName: 'Laura Streaming Platform',
              bankName: 'Commerzbank',
            },
          },
          notifications: {
            emailOnProcessed: true,
            emailOnFailed: true,
            email: 'laura@streaming-platform.com',
          },
          taxInformation: {
            taxId: null,
            vatNumber: null,
            country: 'DE',
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching settlement settings:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch settlement settings',
        },
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    if (body.minimumSettlementAmount && body.minimumSettlementAmount < 10) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Minimum settlement amount must be at least 10 EUR',
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
          ...body,
          updatedAt: new Date().toISOString(),
        },
        message: 'Settlement settings updated successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating settlement settings:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to update settlement settings',
        },
      },
      { status: 500 }
    );
  }
}

