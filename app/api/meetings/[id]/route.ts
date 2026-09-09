// app/api/meetings/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const meetingId = parseInt(id, 10);
  
  if (isNaN(meetingId)) {
    return NextResponse.json({ error: 'ID parameter must be a valid number' }, { status: 400 });
  }

  const meeting = getMeetingById(meetingId);
  
  if (!meeting) {
    return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
  }
  
  return NextResponse.json(meeting);
}
