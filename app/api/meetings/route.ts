import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { getMeetings } from '@/lib/meetings-db';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date');
  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page')) || 1;

  try {
    if (dateParam) {
      // Explicitly format date to match database output keys
      const rows = await sql`
        SELECT id, to_char(date, 'YYYY-MM-DD') AS "date", meeting_type AS "meetingType", presiding, conducting, announcements, opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer", ward_business AS "wardBusiness", stake_business AS "stakeBusiness", sacrament_hymn AS "sacramentHymn", speakers, closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer" 
        FROM meetings 
        WHERE date = ${dateParam}
      `;
      return NextResponse.json(rows);
    }

    const meetings = await getMeetings(query, page);
    return NextResponse.json(meetings);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
