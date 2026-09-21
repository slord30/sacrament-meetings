// components/MeetingDetail.tsx
'use client';
import { SacramentMeeting } from '@/lib/types';


interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(meeting.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-sm rounded-xl p-8 md:p-12 print:border-none print:shadow-none print:p-0">
      
      {/* Action Bar (Hidden automatically during print) */}
      <div className="print:hidden flex justify-between items-center border-b border-gray-100 pb-6 mb-8">
        <span className="text-xs font-bold tracking-widest text-[#5e6662] uppercase">
          {meeting.meetingType} MEETING DETAILS
        </span>
        <button 
          onClick={() => window.print()}
          className="bg-[#5b6e60] hover:bg-[#47574c] text-white font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg transition-colors duration-200"
        >
          PRINT PROGRAM
        </button>
      </div>

      {/* Heading Block */}
      <div className="text-center border-b-2 border-double border-[#8da393] pb-6 mb-8">
        <h2 className="font-serif text-3xl font-bold tracking-wide text-[#2c302e] uppercase">
          Sacrament Meeting Program
        </h2>
        <p className="text-[#5b6e60] font-medium font-serif mt-2 tracking-wide italic">
          {formattedDate}
        </p>
      </div>

      {/* Leadership Information Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm text-[#2c302e] border-b border-gray-200 pb-4 mb-6">
        <p><strong className="text-gray-900 font-semibold tracking-wide">Presiding:</strong> {meeting.presiding}</p>
        <p><strong className="text-gray-900 font-semibold tracking-wide">Conducting:</strong> {meeting.conducting}</p>
        {meeting.stakeBusiness && (
          <p className="col-span-2 text-amber-800 bg-amber-50 border border-amber-100 px-3 py-1 rounded text-xs font-bold tracking-wide uppercase print:bg-transparent print:border-none print:p-0 print:text-black">
            STAKE BUSINESS WILL BE CONDUCTED
          </p>
        )}
      </div>

      {/* Announcements Block */}
      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mb-8 bg-[#faf9f5] border border-[#e6e8e6] p-5 rounded-xl print:bg-transparent print:border-none print:p-0 print:mb-6">
          <h4 className="text-xs font-bold text-[#5b6e60] tracking-widest uppercase mb-3">Ward Announcements</h4>
          <ul className="list-disc list-inside text-sm text-[#5e6662] space-y-2 print:text-black">
            {meeting.announcements.map((note, index) => (
              <li key={index} className="leading-relaxed">{note}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Complete Meeting Flow Agenda Details */}
      <section className="space-y-5">
        <h4 className="text-xs font-bold text-[#5b6e60] tracking-widest uppercase text-center border-b border-gray-100 pb-2 mb-4">
          Order of Service
        </h4>

        <div className="flex justify-between items-baseline text-sm">
          <span className="text-[#5e6662] font-medium">Opening Hymn</span>
          <span className="border-b border-dotted border-gray-300 flex-grow mx-2 h-3"></span>
          <span className="text-[#2c302e] font-bold text-right max-w-xs">
            No. {meeting.openingHymn.number} — {meeting.openingHymn.title}
          </span>
        </div>

        <div className="flex justify-between items-baseline text-sm">
          <span className="text-[#5e6662] font-medium">Opening Prayer</span>
          <span className="border-b border-dotted border-gray-300 flex-grow mx-2 h-3"></span>
          <span className="text-[#2c302e] font-semibold">{meeting.openingPrayer}</span>
        </div>

        {/* Dynamic Ward Business Processing */}
        {meeting.wardBusiness.length > 0 && (
          <div className="bg-[#faf9f5] p-4 rounded-lg border border-[#e6e8e6] space-y-2 print:bg-transparent print:border-none print:p-0">
            <span className="text-xs font-bold text-[#5b6e60] uppercase tracking-wider block">Ward Business:</span>
            {meeting.wardBusiness.map((biz, idx) => (
              <p key={idx} className="text-sm text-[#2c302e] italic pl-2 border-l-2 border-[#8da393]">
                {biz.description}
              </p>
            ))}
          </div>
        )}

        <div className="flex justify-between items-baseline text-sm pt-2">
          <span className="text-[#5e6662] font-medium">Sacrament Hymn</span>
          <span className="border-b border-dotted border-gray-300 flex-grow mx-2 h-3"></span>
          <span className="text-[#2c302e] font-bold text-right max-w-xs">
            No. {meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}
          </span>
        </div>

        {/* Dynamic Speakers / Musical Presentations Iterations */}
        {meeting.speakers.length > 0 ? (
          <div className="border-y border-gray-100 py-3 my-4 space-y-4">
            {meeting.speakers.map((item, index) => (
              <div key={index} className="flex justify-between items-baseline text-sm">
                <span className="text-[#5e6662] font-medium">
                  {item.type === 'musical-number' ? 'Special Musical Number' : 'Speaker'}
                </span>
                <span className="border-b border-dotted border-gray-300 flex-grow mx-2 h-3"></span>
                <span className="text-[#2c302e] font-semibold text-right">
                  {item.name} <span className="text-xs font-normal text-[#5e6662] italic block sm:inline sm:ml-1">({item.topic})</span>
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Testimony meetings fallback */
          <div className="border-y border-gray-100 py-5 my-4 text-center">
            <p className="text-sm font-medium text-[#5b6e60] italic">
              The remaining time will be given unto the congregation for bearing testimonies.
            </p>
          </div>
        )}

        <div className="flex justify-between items-baseline text-sm">
          <span className="text-[#5e6662] font-medium">Closing Hymn</span>
          <span className="border-b border-dotted border-gray-300 flex-grow mx-2 h-3"></span>
          <span className="text-[#2c302e] font-bold text-right max-w-xs">
            No. {meeting.closingHymn.number} — {meeting.closingHymn.title}
          </span>
        </div>

        <div className="flex justify-between items-baseline text-sm">
          <span className="text-[#5e6662] font-medium">Closing Prayer</span>
          <span className="border-b border-dotted border-gray-300 flex-grow mx-2 h-3"></span>
          <span className="text-[#2c302e] font-semibold">{meeting.closingPrayer}</span>
        </div>
      </section>

    </article>
  );
}
