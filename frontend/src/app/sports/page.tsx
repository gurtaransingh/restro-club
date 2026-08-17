'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FacilityMaster } from '../../lib/types';
import { Trophy, Users, Clock, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export default function SportsPage() {
  const { facilities, activeLocation, openBookingModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Racket Sports', 'Water Sports', 'Indoor Games', 'Fitness & Spa'];

  const filteredFacilities = facilities.filter((fac) => {
    if (fac.locationId && fac.locationId !== activeLocation.id) return false;
    if (selectedCategory !== 'ALL' && fac.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      {/* Header */}
      <section className="bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-2 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Championship Arena & Sports</span>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-6xl font-bold">Sports & Athletics Arena</h1>
            <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-xl uppercase tracking-wider">
              Pro Pickleball courts, Box Cricket turf, Olympic lap pool & badminton arenas at {activeLocation.name}.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#141414] p-4 border border-white/10 rounded-2xl shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Active Facility Tier</p>
              <p className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">Olympic Standard Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-[#141414] p-3 border border-white/10 rounded-2xl shadow-xl flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border rounded-full cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20'
                  : 'bg-[#0A0A0A] text-white/60 border-white/10 hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Facility Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-[#141414] border border-white/10 rounded-3xl overflow-hidden hover:border-amber-400/40 transition-all group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-[#0A0A0A]">
                  <img
                    src={fac.image}
                    alt={fac.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />

                  <span className="absolute top-3 left-3 bg-[#0A0A0A] border border-amber-400/30 text-amber-400 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                    {fac.category}
                  </span>

                  <span className="absolute bottom-3 right-3 bg-[#0A0A0A] border border-white/20 text-white font-serif italic font-bold text-sm px-3.5 py-1 rounded-full shadow-lg">
                    {fac.memberPrice === 0 ? 'MEMBER FREE' : `₹${fac.memberPrice}/hr`}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif italic font-bold text-2xl text-white">{fac.name}</h3>
                    <span className="text-[9px] font-bold px-2.5 py-0.5 border border-amber-400/20 bg-amber-400/10 text-amber-400 rounded-full uppercase tracking-widest">
                      {fac.status}
                    </span>
                  </div>

                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">{fac.rules}</p>

                  <div className="flex items-center gap-4 pt-2 text-[10px] uppercase tracking-widest text-white/40">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {fac.slotDurationMinutes} Mins / Slot
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      Max {fac.capacity} Players
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => openBookingModal('SPORTS', fac)}
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
                >
                  <span>Book Court Slot</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
