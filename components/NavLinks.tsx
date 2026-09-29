// components/NavLinks.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignOutButton } from './SignOutButton';
import { Session } from 'next-auth'; // Import the type helper safely

interface NavLinksProps {
  session: Session | null;
}

export default function NavLinks({ session }: NavLinksProps) {
  const pathname = usePathname();
  const isLoggedIn = !!session?.user;

  const links = [
    { name: 'HOME', href: '/' },
    { name: 'MEETINGS', href: '/meetings' },
    { name: 'CURRENT PROGRAM', href: '/meetings/current' },
  ];

  return (
    <nav className="flex items-center space-x-6">
      {links.map((link) => {
        const isActive = pathname === link.href || (link.href === '/meetings' && pathname.startsWith('/meetings/'));
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-semibold tracking-wider transition-colors duration-200 ${
              isActive 
                ? 'text-[#5b6e60] border-b-2 border-[#8da393] pb-1' // Soft Olive text + Sage green underline
                : 'text-gray-600 hover:text-[#5b6e60]'
            }`}
          >
            {link.name}
          </Link>
        );
      })}

      {/* Conditional rendering for Bishopric access based on session prop */}
      {isLoggedIn ? (
        <div className="flex items-center space-x-3 pl-2 border-l border-gray-200">
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 py-1 px-2 rounded tracking-wider uppercase hidden md:inline">
            {session.user?.name || 'Bishopric'}
          </span>
          <SignOutButton />
        </div>
      ) : (
        <Link 
          href="/login" 
          className={`text-sm font-semibold tracking-wider transition-colors duration-200 ${
            pathname === '/login' 
              ? 'text-[#5b6e60] border-b-2 border-[#8da393] pb-1' 
              : 'text-gray-600 hover:text-[#5b6e60]'
          }`}
        >
          LOGIN
        </Link>
      )}
    </nav>
  );
}
