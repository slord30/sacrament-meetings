// app/meetings/page.tsx
import { getMeetings } from '@/lib/meetings-db';
import MeetingCard from '@/components/MeetingCard';

export default function MeetingsPage() {
  const allMeetings = getMeetings();

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#e6e8e6] rounded-xl p-6 shadow-sm">
        <p className="text-sm text-[#5e6662] leading-relaxed">
          Select an active date panel below to inspect details, configure agenda listings, or enter user print optimization modes.
        </p>
      </div>

      {allMeetings.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-[#8da393] rounded-xl">
          <p className="text-sm text-[#5e6662] italic">No active meeting records mapped.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </div>
  );
  //trigger vercel build
}
