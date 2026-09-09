// app/api/meetings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  try {
    // Read the query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const dateFilter = searchParams.get('date');

    // Fetch filtered or full list from the db helper
    const meetings = getMeetings(dateFilter);
    
    return NextResponse.json(meetings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
