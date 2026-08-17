'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, Crown, ArrowUpRight, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { activeLocation, locations, setActiveLocation } = useApp();

  return (
    <footer className="bg-[#1E241D] text-white border-t border-[#35402F] pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8C5A3C] flex items-center justify-center text-white shadow-md">
                <span className="font-serif italic font-black text-xl">R</span>
              </div>
              <div>
                <span className="font-serif italic text-2xl font-bold tracking-tight text-white block leading-none">
                  RESTRO CLUB
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C5A3C] font-bold block mt-0.5">
                  Luxury Food, Sports & Resort Destination
                </span>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              The premier national highway destination combining Michelin-grade fine dining, championship racket sports, Olympic swimming, and boutique sanctuary stays across Punjab & the Capital Region.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#EDE6D8]">
              <MapPin className="w-4 h-4 text-[#8C5A3C] shrink-0" />
              <span>{activeLocation.name} • {activeLocation.address}</span>
            </div>
          </div>

          {/* Quick Links: Experiences */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C5A3C] block">
              Club Experiences
            </span>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/restaurant" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Fine Dining & Bar</span>
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Pickleball & Arenas</span>
                </Link>
              </li>
              <li>
                <Link href="/pool" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Olympic Pool & Cabanas</span>
                </Link>
              </li>
              <li>
                <Link href="/stays" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Boutique Resort Suites</span>
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Banquets & Summits</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Membership & Privileges */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C5A3C] block">
              Membership & Account
            </span>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/membership" className="hover:text-white transition-colors">
                  Membership Tiers
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">
                  Member Itinerary & Ledger
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Photo & Video Gallery
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Portal Login (Member / Staff)
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors">
                  Join Club Membership
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating Hubs & Contact */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C5A3C] block">
              Operating Property Hubs
            </span>
            <div className="space-y-1.5">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocation(loc)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    loc.id === activeLocation.id
                      ? 'bg-[#8C5A3C] text-white font-bold'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <span className="truncate">{loc.name}</span>
                  <span className="text-[9px] uppercase font-mono">{loc.code}</span>
                </button>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-white/60 space-y-1">
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8C5A3C]" />
                <span>6:00 AM - 11:00 PM Daily</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#8C5A3C]" />
                <span>+91 1800 RESTRO CLUB</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Restro Club Hospitality Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Banur-Mohali Expressway Junction</span>
            <span>•</span>
            <span>PostgreSQL 18 Master Architecture</span>
            <span>•</span>
            <Link href="/login" className="text-[#8C5A3C] font-semibold hover:underline">
              Staff Workspace
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
