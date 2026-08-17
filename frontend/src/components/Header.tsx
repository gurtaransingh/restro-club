'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  UserPlus,
  ChevronDown,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isAuthenticated, isSuperAdmin, isChef, isManager, logout, cart, setIsCartOpen, activeLocation } = useApp();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Dining', path: '/restaurant', icon: UtensilsCrossed },
    { label: 'Sports', path: '/sports', icon: Trophy },
    { label: 'Pool', path: '/pool', icon: Waves },
    { label: 'Stays', path: '/stays', icon: BedDouble },
    { label: 'Events', path: '/events', icon: CalendarDays },
    { label: 'Membership', path: '/membership', icon: Crown },
    { label: 'Gallery', path: '/gallery', icon: Images },
  ];

  const totalCartCount = cart.reduce((acc, it) => acc + it.quantity, 0);
  const isCurrent = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E5DEC9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Highway Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#8C5A3C] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="font-serif italic font-black text-xl">R</span>
            </div>
            <div>
              <span className="font-serif italic text-xl sm:text-2xl font-bold tracking-tight text-[#1E241D] block leading-none">
                RESTRO CLUB
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#8C5A3C] font-bold block mt-0.5">
                Luxury & Sports Club • {activeLocation.name.toUpperCase()}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isCurrent(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#8C5A3C] text-white shadow-md'
                      : 'text-[#5C554E] hover:text-[#1E241D] hover:bg-[#EDE6D8]'
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
            {/* Location Selector Dropdown */}
            <div className="hidden sm:block">
              <LocationSelector />
            </div>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-white border border-[#E5DEC9] rounded-full text-[#1E241D] hover:bg-[#F2ECE1] transition-colors shadow-sm cursor-pointer"
              title="View Cart & Bill"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#8C5A3C]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8C5A3C] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Authenticated User Menu or Public Sign In */}
            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 bg-white border border-[#E5DEC9] rounded-full hover:bg-[#F2ECE1] transition-colors shadow-sm cursor-pointer"
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

                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E5DEC9] p-3 z-50 text-[#1E241D] rounded-2xl shadow-xl space-y-1">
                      <div className="px-3 py-2 border-b border-[#E5DEC9]">
                        <span className="text-xs font-bold text-[#1E241D] block">{currentUser.name}</span>
                        <span className="text-[10px] text-[#5C554E] block truncate">{currentUser.email}</span>
                        <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-[#8C5A3C]/10 text-[#8C5A3C] text-[8px] font-bold tracking-widest uppercase border border-[#8C5A3C]/20 rounded-full">
                          {currentUser.category || 'MEMBER'} • {currentUser.membershipTierId?.replace('tier-', '').toUpperCase()}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs pt-1">
                        <Link
                          href="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-[#5C554E] hover:text-[#1E241D] hover:bg-[#FAF8F3] uppercase tracking-wider text-[10px] transition-colors rounded-xl font-bold"
                        >
                          <User className="w-3.5 h-3.5 text-[#8C5A3C]" />
                          <span>Member Profile & Ledger</span>
                        </Link>

                        {(isSuperAdmin || isManager) && (
                          <>
                            <Link
                              href="/admin"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-[#1E241D] bg-[#8C5A3C]/10 hover:bg-[#8C5A3C]/20 uppercase tracking-wider text-[10px] transition-colors rounded-xl font-bold"
                            >
                              <Shield className="w-3.5 h-3.5 text-[#8C5A3C]" />
                              <span>Executive Command Center</span>
                            </Link>
                            <Link
                              href="/admin/masters"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-[#5C554E] hover:text-[#1E241D] hover:bg-[#FAF8F3] uppercase tracking-wider text-[10px] transition-colors rounded-xl font-medium"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-[#8C5A3C]" />
                              <span>Master Tables CRUD</span>
                            </Link>
                          </>
                        )}

                        {(isChef || isSuperAdmin) && (
                          <Link
                            href="/kitchen"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-[#3E4A38] bg-[#3E4A38]/10 hover:bg-[#3E4A38]/20 uppercase tracking-wider text-[10px] transition-colors rounded-xl font-bold"
                          >
                            <ChefHat className="w-3.5 h-3.5 text-[#3E4A38]" />
                            <span>Kitchen Display Board (KDS)</span>
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-[#E5DEC9] mt-2 pt-2">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                            router.push('/login');
                          }}
                          className="w-full text-left px-3 py-2 text-[11px] font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors rounded-xl cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  className="hidden sm:flex px-3.5 py-2 bg-white border border-[#E5DEC9] hover:bg-[#F2ECE1] text-[#1E241D] text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#8C5A3C]" />
                  <span>Join</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#1E241D] border border-[#E5DEC9] rounded-xl bg-white"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5DEC9] bg-[#FAF8F3] px-4 pt-3 pb-6 space-y-3">
          <div className="mb-2">
            <LocationSelector />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const active = isCurrent(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-xl flex items-center justify-between border ${
                    active ? 'bg-[#8C5A3C] text-white border-[#8C5A3C]' : 'bg-white text-[#1E241D] border-[#E5DEC9]'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
