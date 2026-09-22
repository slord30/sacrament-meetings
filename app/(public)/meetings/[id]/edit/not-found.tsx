// app/(public)/meetings/[id]/edit/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto mt-16 max-w-xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Meeting Not Found</h1>
      <p className="mt-3 text-sm text-gray-600">
        The sacrament meeting agenda you are attempting to edit does not exist or has been deleted.
      </p>
      <div className="mt-6">
        <Link
          href="/meetings"
          className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}
