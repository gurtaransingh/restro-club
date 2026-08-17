'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../context/AppContext';
import { LocationSelector } from './LocationSelector';
import {
  UtensilsCrossed,
  Trophy,
  Waves,
  BedDouble,
  CalendarDays,
  Crown,
  Images,
  ShoppingBag,
  User,
  Shield,
  ChefHat,
  LogOut,
  LogIn,
  ChevronDown,
} from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { currentUser, isAuthenticated, isSuperAdmin, isChef, isManager, logout, cart, setIsCartOpen } = useApp();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Dining', href: '/restaurant', icon: UtensilsCrossed },
    { label: 'Sports', href: '/sports', icon: Trophy },
    { label: 'Pool', href: '/pool', icon: Waves },
    { label: 'Stays', href: '/stays', icon: BedDouble },
    { label: 'Events', href: '/events', icon: CalendarDays },
    { label: 'Membership', href: '/membership', icon: Crown },
    { label: 'Gallery', href: '/gallery', icon: Images },
  ];

  const totalCartCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#EDE6D8]/95 backdrop-blur-md border-b border-[#E5DEC9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#8C5A3C] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="font-serif italic font-black text-xl">R</span>
            </div>
            <div>
              <span className="font-serif italic text-xl sm:text-2xl font-bold tracking-tight text-[#1E241D] block leading-none">
                RESTRO CLUB
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C5A3C] font-bold block mt-0.5">
                Luxury & Sports Club
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#FAF8F3] text-[#8C5A3C] shadow-sm'
                      : 'text-[#5C554E] hover:text-[#1E241D] hover:bg-[#FAF8F3]/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Location Selector */}
            <LocationSelector />

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#FAF8F3] border border-[#E5DEC9] rounded-full text-[#1E241D] hover:bg-[#F2ECE1] transition-colors shadow-sm cursor-pointer"
              title="View Cart & Bill"
            >
              <ShoppingBag className="w-4 h-4 text-[#8C5A3C]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8C5A3C] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Authenticated User Menu or Sign In */}
            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 bg-[#FAF8F3] border border-[#E5DEC9] rounded-full hover:bg-[#F2ECE1] transition-colors shadow-sm cursor-pointer"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#8C5A3C]"
                  />
                  <span className="text-xs font-bold text-[#1E241D] hidden sm:inline max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#5C554E]" />
                </button>

                {userDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E5DEC9] rounded-2xl shadow-xl z-50 p-2 space-y-1">
                      <div className="px-3 py-2 border-b border-[#E5DEC9]">
                        <span className="text-xs font-bold text-[#1E241D] block">{currentUser.name}</span>
                        <span className="text-[10px] text-[#8C5A3C] uppercase tracking-wider font-semibold block">
                          {currentUser.category || 'Member'} • {currentUser.membershipTierId?.replace('tier-', '').toUpperCase()}
                        </span>
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 hover:bg-[#FAF8F3] text-[#1E241D]"
                      >
                        <User className="w-4 h-4 text-[#8C5A3C]" />
                        <span>Member Profile & Ledger</span>
                      </Link>

                      {/* Protected Role Links (Only visible to privileged logged-in staff) */}
                      {(isSuperAdmin || isManager) && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 bg-[#8C5A3C]/10 text-[#8C5A3C] font-semibold hover:bg-[#8C5A3C]/20"
                        >
                          <Shield className="w-4 h-4" />
                          <span>Super Admin Command</span>
                        </Link>
                      )}

                      {(isChef || isSuperAdmin) && (
                        <Link
                          href="/kitchen"
                          onClick={() => setUserDropdownOpen(false)}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 bg-[#3E4A38]/10 text-[#3E4A38] font-semibold hover:bg-[#3E4A38]/20"
                        >
                          <ChefHat className="w-4 h-4" />
                          <span>Kitchen Display (KDS)</span>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 hover:bg-red-50 text-red-700 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
