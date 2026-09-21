// app/(admin)/meetings/[id]/edit/page.tsx (or your active [id]/edit/page.tsx route)
import React from 'react';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPlaceholderPage({ params }: EditPageProps) {
  const { id } = await params;

  return (
    <main className="max-w-2xl mx-auto p-8 text-black">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Edit Meeting #{id}</h1>
        <p className="text-gray-500 font-medium">Coming in Week 04 — Administrative Edit Form</p>
      </div>
    </main>
  );
}
