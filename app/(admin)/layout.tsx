// app/(admin)/layout.tsx
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <header className="bg-slate-800 text-white p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-bold text-sm tracking-wide uppercase">
            Leader Administration
          </span>
          <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">
            Auth Scaffold — Coming Week 05
          </span>
        </div>
      </header>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
