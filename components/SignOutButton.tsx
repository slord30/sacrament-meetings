// components/SignOutButton.tsx
'use client'; 

import { handleSignOut } from '@/lib/actions';

export function SignOutButton() {
  return (
    <form action={handleSignOut}>
      <button 
        type="submit"
        className="text-sm font-semibold tracking-wider text-gray-600 hover:text-red-600 transition-colors duration-200 uppercase"
      >
        Sign Out
      </button>
    </form>
  );
}
