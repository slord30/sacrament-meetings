'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error('Uncaught meeting planner error:', error); }, [error]);

  return (
    <div className="mx-auto mt-16 max-w-xl rounded-lg bg-white p-6 text-center shadow-sm border border-slate-200">
      <h1 className="text-2xl font-bold text-slate-900">An Error Occurred</h1>
      <p className="mt-2 text-slate-600">We ran into an unexpected problem assembling your meeting agenda schedules.</p>
      <div className="mt-6 flex justify-center gap-3">
        <button onClick={reset} className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">Try Again</button>
        <Link href="/meetings" className="rounded-md border px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50">Back to Meetings</Link>
      </div>
    </div>
  );
}
