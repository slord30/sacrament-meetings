// lib/meetings-db.ts

import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types'; 

const sql = neon(process.env.DATABASE_URL!);
const ITEMS_PER_PAGE = 6;

// Get Paginated Meetings with optional search filters
export async function getMeetings(query: string = '', currentPage: number = 1): Promise<SacramentMeeting[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const searchTerm = `%${query}%`;

  try {
    const rows = await sql`
      SELECT 
        id, 
        to_char(date, 'YYYY-MM-DD') AS date, 
        meeting_type AS "meetingType", 
        presiding, 
        conducting, 
        announcements, 
        opening_hymn AS "openingHymn", 
        opening_prayer AS "openingPrayer", 
        ward_business AS "wardBusiness", 
        stake_business AS "stakeBusiness", 
        sacrament_hymn AS "sacramentHymn", 
        speakers, 
        closing_hymn AS "closingHymn", 
        closing_prayer AS "closingPrayer"
      FROM meetings 
      WHERE meeting_type ILIKE ${searchTerm}
         OR presiding ILIKE ${searchTerm}
         OR conducting ILIKE ${searchTerm}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return rows as SacramentMeeting[];
  } catch (error) {
    console.error('Failed to fetch meetings database entries:', error);
    throw new Error('Database Error: Failed to fetch meetings.');
  }
}

// Calculate total pagination sheet pages matching query
export async function getMeetingsTotalPages(query: string = ''): Promise<number> {
  const searchTerm = `%${query}%`;

  try {
    const data = await sql`
      SELECT COUNT(*) 
      FROM meetings 
      WHERE meeting_type ILIKE ${searchTerm}
         OR presiding ILIKE ${searchTerm}
         OR conducting ILIKE ${searchTerm}
    `;
    const totalMeetings = Number(data[0].count);
    return Math.ceil(totalMeetings / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Failed to calculate meetings page totals:', error);
    throw new Error('Database Error: Failed to fetch total page count.');
  }
}

// Add a new meeting
export async function addMeeting(data: Omit<SacramentMeeting, 'id'>): Promise<void> {
  await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business, stake_business,
      sacrament_hymn, speakers, closing_hymn, closing_prayer
    ) VALUES (
      ${data.date}, ${data.meetingType}, ${data.presiding}, ${data.conducting}, 
      ${data.announcements}::text[], ${JSON.stringify(data.openingHymn)}::jsonb, ${data.openingPrayer}, 
      ${JSON.stringify(data.wardBusiness)}::jsonb, ${data.stakeBusiness}, 
      ${JSON.stringify(data.sacramentHymn)}::jsonb, ${JSON.stringify(data.speakers)}::jsonb, 
      ${JSON.stringify(data.closingHymn)}::jsonb, ${data.closingPrayer}
    )
  `;
}

// Live Mutation: Update an existing meeting
export async function updateMeetingInDb(id: number, data: Partial<SacramentMeeting>): Promise<void> {
  await sql`
    UPDATE meetings
    SET 
      date = ${data.date},
      meeting_type = ${data.meetingType},
      presiding = ${data.presiding},
      conducting = ${data.conducting},
      announcements = ${data.announcements}::text[],
      opening_hymn = ${JSON.stringify(data.openingHymn)}::jsonb,
      opening_prayer = ${data.openingPrayer},
      ward_business = ${JSON.stringify(data.wardBusiness)}::jsonb,
      stake_business = ${data.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(data.sacramentHymn)}::jsonb,
      speakers = ${JSON.stringify(data.speakers)}::jsonb,
      closing_hymn = ${JSON.stringify(data.closingHymn)}::jsonb,
      closing_prayer = ${data.closingPrayer}
    WHERE id = ${id}
  `;
}

// Delete a specific meeting
export async function deleteMeetingFromDb(id: number): Promise<boolean> {
  await sql`DELETE FROM meetings WHERE id = ${id}`;
  return true;
}

// Get Meeting by ID
export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  try {
    const rows = await sql`
      SELECT 
        id, 
        to_char(date, 'YYYY-MM-DD') AS date, 
        meeting_type AS "meetingType", 
        presiding, 
        conducting, 
        announcements, 
        opening_hymn AS "openingHymn", 
        opening_prayer AS "openingPrayer", 
        ward_business AS "wardBusiness", 
        stake_business AS "stakeBusiness", 
        sacrament_hymn AS "sacramentHymn", 
        speakers, 
        closing_hymn AS "closingHymn", 
        closing_prayer AS "closingPrayer"
      FROM meetings 
      WHERE id = ${id}
    `;
    
    // Return the first matching row if found, or null if it doesn't exist
    return rows.length > 0 ? (rows[0] as SacramentMeeting) : null;
  } catch (error) {
    console.error(`Failed to fetch meeting record for ID ${id}:`, error);
    throw new Error('Database Error: Failed to fetch single meeting record.');
  }
}
