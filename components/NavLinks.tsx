// components/NavLinks.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { name: 'HOME', href: '/' },
    { name: 'MEETINGS', href: '/meetings' },
    { name: 'CURRENT PROGRAM', href: '/meetings/current' },
  ];

  return (
    <nav className="flex space-x-6">
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
    </nav>
  );
}
