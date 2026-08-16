import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, Trophy, BedDouble, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const isCurrent = (path: string) => location.pathname === path;

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Dining', path: '/restaurant', icon: UtensilsCrossed },
    { label: 'Sports', path: '/sports', icon: Trophy },
    { label: 'Stays', path: '/stays', icon: BedDouble },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FAF8F3]/95 backdrop-blur-lg border-t border-[#E5DEC9] z-30 pb-safe shadow-lg">
      <div className="flex items-center justify-around h-14 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isCurrent(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full text-[9px] uppercase tracking-widest font-bold transition-all ${
                active ? 'bg-[#8C5A3C] text-white shadow-md shadow-[#8C5A3C]/20' : 'text-[#5C554E] hover:text-[#1E241D]'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${active ? 'scale-110 text-white' : 'text-[#3E4A38]'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
