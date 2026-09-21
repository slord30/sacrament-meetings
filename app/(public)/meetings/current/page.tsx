import { neon } from '@neondatabase/serverless';
import { redirect, notFound } from 'next/navigation';

const sql = neon(process.env.DATABASE_URL!);

export default async function CurrentMeetingRedirectPage() {
  let targetId: number | null = null;

  try {
    const rows = await sql`
      SELECT id FROM meetings 
      ORDER BY date DESC 
      LIMIT 1
    `;

    if (rows && rows.length > 0) {
      targetId = rows[0].id;
    }
  } catch (error) {
    console.error('Database connection redirect lookup error:', error);
    notFound();
  }

  // CRITICAL: Call redirect OUTSIDE of the try/catch block
  if (targetId) {
    redirect(`/meetings/${targetId}`);
  }

  notFound();
}
