import { NextRequest, NextResponse } from 'next/server';

interface CostPerContentItem {
  contentId: string;
  contentName: string;
  totalAmount: number;
  timeWatched: number; // in minutes
  costPerMinute: number;
  platform: string;
}

// Generate mock cost per content data
function generateCostPerContentData(
  startDate: Date | null,
  endDate: Date | null,
  platform: string | null
): CostPerContentItem[] {
  const platforms = ['video', 'audio', 'learning', 'gaming'];
  const contentNames = [
    'Introduction to React',
    'Advanced TypeScript',
    'JavaScript Fundamentals',
    'Node.js Backend Development',
    'Python for Data Science',
    'Machine Learning Basics',
    'Web Design Principles',
    'UI/UX Best Practices',
    'Database Design',
    'Cloud Architecture',
    'DevOps Fundamentals',
    'Security Best Practices',
    'API Design',
    'GraphQL Tutorial',
    'Docker & Kubernetes',
  ];

  const data: CostPerContentItem[] = [];
  const count = Math.floor(Math.random() * 11) + 10; // 10-20 items

  for (let i = 0; i < count; i++) {
    const selectedPlatform = platform || platforms[Math.floor(Math.random() * platforms.length)];
    const contentName = contentNames[Math.floor(Math.random() * contentNames.length)];
    const timeWatched = Math.floor(Math.random() * 300) + 30; // 30-330 minutes
    const costPerMinute = parseFloat((Math.random() * 0.5 + 0.1).toFixed(2)); // €0.10-0.60 per minute
    const totalAmount = parseFloat((timeWatched * costPerMinute).toFixed(2));

    data.push({
      contentId: `content_${i + 1}`,
      contentName,
      totalAmount,
      timeWatched,
      costPerMinute,
      platform: selectedPlatform,
    });
  }

  // Sort by total amount (descending)
  return data.sort((a, b) => b.totalAmount - a.totalAmount);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    const platform = searchParams.get('platform');

    const startDate = startDateParam ? new Date(startDateParam) : null;
    const endDate = endDateParam ? new Date(endDateParam) : null;

    // Validate dates if provided
    if (startDate && isNaN(startDate.getTime())) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid start date format' } },
        { status: 400 }
      );
    }

    if (endDate && isNaN(endDate.getTime())) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid end date format' } },
        { status: 400 }
      );
    }

    if (startDate && endDate && startDate > endDate) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Start date must be before end date' } },
        { status: 400 }
      );
    }

    const data = generateCostPerContentData(startDate, endDate, platform);

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching cost per content data:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error.message || 'Internal server error' } },
      { status: 500 }
    );
  }
}

