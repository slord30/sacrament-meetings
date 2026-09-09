// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      {/* Hero Header Section */}
      <header className="max-w-2xl mx-auto mb-10">
        <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#2c302e] mb-4">
          Welcome to the Ward Sacrament Planner
        </h2>
        <p className="text-md sm:text-lg text-[#5e6662] leading-relaxed">
          Simplify administration, cultivate historical accuracy, and stay organized while coordinating sacred weekly worship agendas.
        </p>
      </header>

      {/* Step 5 Optimized Image: Houston Texas Temple */}
      <div className="w-full max-w-3xl aspect-[16/10] relative rounded-2xl overflow-hidden border border-[#e6e8e6] shadow-sm mb-12 bg-gray-100">
        <Image
          src="/houston-temple.jpg"
          alt="The serene exterior of the Houston Texas Temple surrounded by bright blue skies and beautiful manicured landscaping"
          width= {800}
          height= {500}
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link
          href="/meetings"
          className="bg-[#5b6e60] hover:bg-[#47574c] text-white font-semibold text-sm tracking-wider uppercase px-8 py-3.5 rounded-xl shadow-sm transition duration-200"
        >
          Browse All Meetings
        </Link>
        <Link
          href="/meetings/current"
          className="bg-white hover:bg-[#faf9f5] border border-gray-300 text-[#5b6e60] font-semibold text-sm tracking-wider uppercase px-8 py-3.5 rounded-xl transition duration-200"
        >
          View Current Program
        </Link>
      </div>
    </div>
  );
}
