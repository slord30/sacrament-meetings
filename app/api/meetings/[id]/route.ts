import { NextRequest, NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const meetingId = Number(id);

  if (isNaN(meetingId)) {
    return NextResponse.json({ error: 'Invalid meeting ID profile identifier format' }, { status: 400 });
  }

  try {
    // CRITICAL: Await the single item detail result lookup
    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting profile record not found' }, { status: 404 });
    }

    return NextResponse.json(meeting);
  } catch (error) {
    console.error('API Route Detail Lookup Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
