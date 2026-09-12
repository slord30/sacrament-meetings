// app/meetings/layout.tsx
import React from 'react';

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6 animate-fade-in">
      <header className="border-b border-[#e6e8e6] pb-4 mb-2">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-[#2c302e]">
          WARD MEETINGS PORTAL
        </h2>
        <p className="text-xs text-[#5e6662] tracking-wider uppercase mt-1">
          Review, distribute, and archive active sacrament programs
        </p>
      </header>
      {children}
    </section>
  );
}
