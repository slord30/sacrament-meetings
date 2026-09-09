// app/meetings/current/page.tsx
import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

export default function CurrentMeetingRedirectPage() {
  // 1. Calculate the most recent Sunday using the professor's logic
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek); // Roll back to Sunday

  // 2. Format the calculated Sunday date precisely as an ISO string (YYYY-MM-DD)
  const targetDateStr = sunday.toISOString().split('T')[0];

  // 3. Query the mock database specifically for that calculated Sunday date
  const matchingMeetings = getMeetings(targetDateStr);

  // 4. Redirect based on whether an entry exists for this specific Sunday
  if (matchingMeetings && matchingMeetings.length > 0) {
    // If a meeting is found for this Sunday, send them to its detail page
    redirect(`/meetings/${matchingMeetings[0].id}`);
  }

  // Fallback: If no record has been created for this Sunday, route back to the directory list view
  redirect('/meetings');
}
