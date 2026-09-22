// app/(public)/meetings/page.tsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getMeetings, getMeetingsTotalPages } from '../../../lib/meetings-db';


import MeetingSearch from '../../../components/MeetingSearch';


const MeetingCard = dynamic(() => import('../../../components/MeetingCard'), {
  loading: () => <div className="h-32 w-full bg-gray-100 animate-pulse rounded-xl mb-4" />,
});

const Pagination = dynamic(() => import('../../../components/Pagination'), {
  loading: () => <div className="h-10 w-48 bg-gray-100 animate-pulse mx-auto rounded-lg mt-8" />,
});

interface PageProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

export default async function MeetingsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  
  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <main className="max-w-4xl mx-auto p-6 text-black font-sans">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 uppercase tracking-tight">
        Sacrament Meetings
      </h1>

      {/* Meeting Search Input */}
      <Suspense fallback={<div className="h-12 w-full bg-gray-100 animate-pulse rounded-lg mb-6" />}>
        <MeetingSearch />
      </Suspense>

      {/* Meetings List Layout */}
      {!meetings || meetings.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center text-gray-500 my-6">
          No sacrament meetings match your search filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 my-6">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      {/* Pagination Footer Elements */}
      <Suspense fallback={<div className="h-10 w-48 bg-gray-100 animate-pulse mx-auto rounded-lg mt-8" />}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </main>
  );
}
