'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  // Hide pagination controls entirely if all records fit on a single page
  if (totalPages <= 1) return null;

  return (
    <nav 
      aria-label="Pagination navigation matrix" 
      className="flex justify-center items-center gap-4 mt-8 border-t border-gray-100 pt-6 font-sans text-black"
    >
      {/* Previous Button control block */}
      {currentPage > 1 ? (
        <Link 
          href={createPageURL(currentPage - 1)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-500 shadow-sm active:bg-gray-100 transition-all duration-150 ease-in-out"
        >
          &larr; Previous
        </Link>
      ) : (
        <span className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-300 pointer-events-none bg-gray-50 cursor-not-allowed">
          &larr; Previous
        </span>
      )}

      {/* Active Page Indicator Badge */}
      <span className="text-sm font-bold text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md shadow-inner">
        Page <span className="text-blue-600">{currentPage}</span> of {totalPages}
      </span>

      {/* Next Button control block */}
      {currentPage < totalPages ? (
        <Link 
          href={createPageURL(currentPage + 1)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-500 shadow-sm active:bg-gray-100 transition-all duration-150 ease-in-out"
        >
          Next &rarr;
        </Link>
      ) : (
        <span className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-300 pointer-events-none bg-gray-50 cursor-not-allowed">
          Next &rarr;
        </span>
      )}
    </nav>
  );
}
