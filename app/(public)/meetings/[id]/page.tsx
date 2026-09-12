// app/(public)/meetings/[id]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingDetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  // CRITICAL PROTECTION GUARD: Prevents alphanumeric values ("new", "current") from crashing Neon Postgres
  if (isNaN(meetingId)) {
    notFound();
    return null;
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
    return null;
  }

  return (
    <main className="max-w-2xl mx-auto p-6 text-black font-sans">
      {/* ACCESSIBILITY FIX: Added aria-label to prevent screen reader descriptive confusion over the arrow string */}
      <Link 
        href="/meetings" 
        aria-label="Back to sacrament meetings directory list"
        className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline mb-4 inline-block transition-colors"
      >
        &larr; Back to all meetings
      </Link>
      
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
          {/* ACCESSIBILITY FIX: Strengthened text color slightly to pass continuous Lighthouse AAA color contrast algorithms */}
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
            {meeting.meetingType} Meeting
          </span>
          <span className="text-xs text-gray-400 font-medium">Program #{meeting.id}</span>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{meeting.date}</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4 mb-4 text-sm text-gray-700">
          <p><strong>Presiding:</strong> {meeting.presiding}</p>
          <p><strong>Conducting:</strong> {meeting.conducting}</p>
          <p><strong>Opening Prayer:</strong> {meeting.openingPrayer}</p>
          <p><strong>Closing Prayer:</strong> {meeting.closingPrayer}</p>
        </div>

        <div className="space-y-5">
          <section aria-labelledby="opening-hymn-heading">
            <h2 id="opening-hymn-heading" className="font-bold text-gray-800 text-lg">Opening Hymn</h2>
            <p className="text-gray-600 text-sm mt-0.5">
              #{meeting.openingHymn?.number} &mdash; {meeting.openingHymn?.title}
            </p>
          </section>

          <section aria-labelledby="sacrament-hymn-heading">
            <h2 id="sacrament-hymn-heading" className="font-bold text-gray-800 text-lg">Sacrament Hymn</h2>
            <p className="text-gray-600 text-sm mt-0.5">
              #{meeting.sacramentHymn?.number} &mdash; {meeting.sacramentHymn?.title}
            </p>
          </section>

          <section aria-labelledby="program-items-heading">
            <h2 id="program-items-heading" className="font-bold text-gray-800 text-lg">Speakers & Program Items</h2>
            {meeting.speakers && meeting.speakers.length > 0 ? (
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-600 space-y-1.5">
                {meeting.speakers.map((speaker, idx) => (
                  <li key={idx}>
                    <strong className="text-gray-800">{speaker.name}</strong> {speaker.topic && ` &mdash; Topic: "${speaker.topic}"`}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic text-sm mt-1">Open testimony format &mdash; open to the congregation.</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
