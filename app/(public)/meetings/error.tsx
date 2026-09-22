// app/(public)/meetings/page.tsx

'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('An unexpected meeting route error occurred:', error);
  }, [error]);

  return (
    <div className="mx-auto mt-16 max-w-xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Something went wrong!</h1>
      <p className="mt-3 text-sm text-gray-600">
        An unexpected error occurred while loading the meeting agenda details. Please try again.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="rounded-lg bg-[#5b6e60] hover:bg-[#4a5a4e] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-200"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          Go Back to Meetings
        </Link>
      </div>
    </div>
  );
}
