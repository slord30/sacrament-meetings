//components/MeetingCard.tsx

import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';
import { deleteMeeting } from '@/lib/actions'; // Import your delete action wrapper

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(meeting.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Pre-bind the server action with this individual meeting's unique numeric id
  const deleteMeetingWithId = deleteMeeting.bind(null, meeting.id);

  // Greenery theme sub-badges for different meeting types
  const badgeStyles: Record<string, string> = {
    testimony: 'bg-[#faf9f5] text-[#5b6e60] border-[#8da393]',
    regular: 'bg-[#f4f6f4] text-[#5b6e60] border-gray-200',
    stake: 'bg-amber-50 text-amber-800 border-amber-200',
    general: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#8da393] transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${badgeStyles[meeting.meetingType] || 'bg-gray-50 text-gray-700'}`}>
            {meeting.meetingType}
          </span>
          <span className="text-xs text-gray-400 font-medium">#{meeting.id}</span>
        </div>

        <h3 className="text-lg font-bold text-[#2c302e] mb-1">{formattedDate}</h3>
        <p className="text-sm text-[#5e6662] mb-4">Conducting: {meeting.conducting}</p>
      </div>

      {/* Structured Action Area Grid matching theme palettes */}
      <div className="flex flex-col gap-2 mt-2 w-full">
        <Link
          href={`/meetings/${meeting.id}`}
          className="w-full text-center bg-[#faf9f5] hover:bg-[#5b6e60] border border-gray-200 hover:border-[#5b6e60] text-[#5b6e60] hover:text-white font-semibold text-xs tracking-wider uppercase py-2 px-4 rounded-lg transition-colors duration-200 block"
        >
          VIEW PROGRAM
        </Link>

        <div className="grid grid-cols-2 gap-2 w-full">
          <Link
            href={`/meetings/${meeting.id}/edit`}
            className="w-full text-center bg-white hover:bg-slate-100 border border-gray-200 hover:border-gray-400 text-slate-700 hover:text-slate-900 font-semibold text-xs tracking-wider uppercase py-2 px-4 rounded-lg transition-all duration-200 block"
          >
            EDIT
          </Link>

          {/* Secure, progressive enhancement mutation form container */}
          <form action={deleteMeetingWithId} className="w-full">
            <button
              type="submit"
              className="w-full text-center bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 text-red-700 hover:text-white font-semibold text-xs tracking-wider uppercase py-2 px-4 rounded-lg transition-colors duration-200 block cursor-pointer"
            >
              DELETE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
