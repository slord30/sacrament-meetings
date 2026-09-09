// app/meetings/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import MeetingDetail from '@/components/MeetingDetail';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleMeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meetingId = parseInt(id, 10);

  // Guard against invalid alphanumeric id injections
  if (isNaN(meetingId)) {
    notFound();
  }

  const meeting = getMeetingById(meetingId);

  // If the record id does not exist, trigger Next.js built-in 404 handler
  if (!meeting) {
    notFound();
  }

  return (
    <div className="py-4">
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
