'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Clock, Users, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function SportsPage() {
  const { facilities, activeLocation, openBookingModal } = useApp();
  const locationFacilities = facilities.filter((f) => f.locationId === activeLocation.id || !f.locationId);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24 space-y-12">
      {/* Header */}
      <section className="bg-[#EDE6D8] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#3E4A38]/15 border border-[#3E4A38]/30 text-[#3E4A38] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
              <Trophy className="w-3.5 h-3.5" />
              <span>Championship Recreation • {activeLocation.name}</span>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-5xl font-bold text-[#1E241D]">
              Sports Arenas & Athletic Club
            </h1>
            <p className="text-xs sm:text-sm text-[#5C554E] max-w-xl">
              Pro-grade pickleball courts, synthetic BWF badminton arenas, indoor turf box cricket, and Olympic lap pool with live slot reservations.
            </p>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locationFacilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img src={fac.image} alt={fac.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {fac.category}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-700/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {fac.status}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif italic text-2xl font-bold text-[#1E241D]">{fac.name}</h3>
                      <p className="text-xs text-[#8C5A3C] font-semibold mt-0.5">{fac.courtDetails}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#5C554E] uppercase block font-bold">Member Rate</span>
                      <span className="font-serif italic text-xl font-bold text-[#3E4A38]">
                        {fac.memberPrice === 0 ? 'Complimentary' : `₹${fac.memberPrice}/hr`}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#5C554E] leading-relaxed">{fac.rules}</p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E5DEC9]/60 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-[#5C554E] block">Duration</span>
                      <span className="font-bold text-[#1E241D]">{fac.slotDurationMinutes} mins</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#5C554E] block">Capacity</span>
                      <span className="font-bold text-[#1E241D]">{fac.capacity} Players</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#5C554E] block">Guest Tariff</span>
                      <span className="font-bold text-[#8C5A3C]">₹{fac.guestPrice}/hr</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <button
                  onClick={() => openBookingModal('SPORTS', fac)}
                  className="w-full py-3.5 bg-[#3E4A38] hover:bg-[#2F392B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Arena Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
