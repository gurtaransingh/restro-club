'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UtensilsCrossed, Trophy, Waves, BedDouble, CalendarDays, User, Home } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Dining', href: '/restaurant', icon: UtensilsCrossed },
    { label: 'Sports', href: '/sports', icon: Trophy },
    { label: 'Stays', href: '/stays', icon: BedDouble },
    { label: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#EDE6D8]/95 backdrop-blur-md border-t border-[#E5DEC9] px-2 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
                isActive ? 'text-[#8C5A3C] font-bold bg-[#FAF8F3]' : 'text-[#5C554E] hover:text-[#1E241D]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5 uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
