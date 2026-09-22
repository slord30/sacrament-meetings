// app/(public)/meetings/[id]/edit/page.tsx

import EditMeetingForm from './edit-form'; 
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import { SacramentMeeting } from '@/lib/types';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const sql = neon(process.env.DATABASE_URL!);
  
  // Aliasing the snake_case columns directly into camelCase inside the query 
  // so it matches your SacramentMeeting type interface properties exactly!
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
  
  const meeting = rows[0] as SacramentMeeting | undefined;

  if (!meeting) {
    notFound();
  }

  return (
    <div className="py-8 font-sans">
      {/* Headings set to Google Sans via font-sans utility mapping rules */}
      <h1 className="text-2xl font-bold text-center mb-6 text-[#2c302e] uppercase tracking-wider">
        Modify Meeting Agenda
      </h1>
      
      {/* Type casting using your official interface model directly, completely avoiding 'any' */}
      <EditMeetingForm meeting={meeting} />
    </div>
  );
}
