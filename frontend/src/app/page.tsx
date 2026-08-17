'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import {
  UtensilsCrossed,
  Trophy,
  Waves,
  BedDouble,
  CalendarDays,
  Crown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  MapPin,
} from 'lucide-react';

export default function HomePage() {
  const { activeLocation, openBookingModal } = useApp();

  const luxuryPillars = [
    {
      title: 'Michelin Fine Dining',
      desc: 'Pan-seared Hokkaido scallops, A5 Wagyu striploin, black truffle risottos, and craft cocktails.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      href: '/restaurant',
      tag: 'Culinary Excellence',
    },
    {
      title: 'Championship Sports Arenas',
      desc: 'BWF-standard synthetic badminton, Olympic lap pool, pro pickleball courts & turf box cricket.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
      href: '/sports',
      tag: 'Recreation & Athletics',
    },
    {
      title: 'Boutique Resort Stays',
      desc: '1BHK & 2BHK luxury suites, penthouse sanctuaries, personal butler concierge, and pool vistas.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      href: '/stays',
      tag: 'Luxury Hospitality',
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#1E241D] text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay scale-105 transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E241D] via-transparent to-[#1E241D]/80" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-[#EDE6D8] text-xs font-bold uppercase tracking-[0.25em] rounded-full shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#8C5A3C]" />
            <span>The Premier Highway Social Destination</span>
          </div>

          <h1 className="font-serif italic text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Elevated Living, Fine Dining & Sports
          </h1>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Welcome to <span className="text-[#EDE6D8] font-semibold">{activeLocation.name}</span>. A multi-acre
            destination integrating Michelin-grade gastronomy, championship racket arenas, and boutique sanctuary stays.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/restaurant"
              className="px-7 py-3.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#8C5A3C]/30 flex items-center gap-2"
            >
              <span>Explore Dining Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => openBookingModal('SPORTS')}
              className="px-7 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-[#EDE6D8]" />
              <span>Book Sports Court</span>
            </button>
          </div>

          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10 text-left">
            <div>
              <span className="block text-[10px] uppercase font-bold text-white/50 tracking-widest">Fine Dining</span>
              <span className="font-serif italic text-lg font-bold text-white">40+ Dishes</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-white/50 tracking-widest">Athletics</span>
              <span className="font-serif italic text-lg font-bold text-white">4 Court Arenas</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-white/50 tracking-widest">Sanctuary</span>
              <span className="font-serif italic text-lg font-bold text-white">Luxury Suites</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-white/50 tracking-widest">Location</span>
              <span className="font-serif italic text-lg font-bold text-[#8C5A3C] truncate block">National Highway</span>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C5A3C]">
            Integrated Resort Ecosystem
          </span>
          <h2 className="font-serif italic text-3xl sm:text-4xl font-bold text-[#1E241D]">
            Crafted for Unmatched Indulgence
          </h2>
          <p className="text-xs text-[#5C554E]">
            Seamless digital integration connects table orders, sports slots, and luxury suites into one account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {luxuryPillars.map((pillar, idx) => (
            <Link
              key={idx}
              href={pillar.href}
              className="group bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {pillar.tag}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-serif italic text-2xl font-bold text-[#1E241D] group-hover:text-[#8C5A3C] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#5C554E] leading-relaxed">{pillar.desc}</p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#E5DEC9]/50 mt-4 text-xs font-bold text-[#8C5A3C]">
                <span>Discover Experience</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Highway Location Anchor Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EDE6D8] border border-[#E5DEC9] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8C5A3C]/15 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-wider rounded-full">
              <MapPin className="w-3.5 h-3.5" />
              <span>National Highway Access</span>
            </div>
            <h3 className="font-serif italic text-3xl font-bold text-[#1E241D]">
              Located Strategically for High Visibility & Leisure
            </h3>
            <p className="text-xs text-[#5C554E] leading-relaxed">
              Situated near the Banur-Mohali highway junction with direct expressway access, valet parking, electric
              charging stations, and dedicated member concierge lounges.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/membership"
              className="px-6 py-3.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-wider rounded-xl text-center transition-all shadow-md"
            >
              Join Club Membership
            </Link>
            <Link
              href="/events"
              className="px-6 py-3.5 bg-white border border-[#E5DEC9] text-[#1E241D] text-xs font-bold uppercase tracking-wider rounded-xl text-center hover:bg-[#FAF8F3] transition-all"
            >
              Plan Private Event
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
