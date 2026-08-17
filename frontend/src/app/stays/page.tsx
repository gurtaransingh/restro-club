'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { BedDouble, Check, ChevronRight, Sparkles } from 'lucide-react';

export default function StaysPage() {
  const { rooms, activeLocation, openBookingModal } = useApp();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      {/* Hero Header */}
      <section className="bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-2 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Boutique Suites & Stays</span>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-6xl font-bold">Luxury Accommodations</h1>
            <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-xl uppercase tracking-wider">
              Boutique 1BHK, 2BHK, Luxury Suites & Penthouse sanctuaries at {activeLocation.name}.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#141414] p-4 border border-white/10 rounded-2xl shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
              <BedDouble className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Inclusions</p>
              <p className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">24/7 Butler & Jacuzzi Privileges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Room Inventory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-[#141414] border border-white/10 rounded-3xl overflow-hidden hover:border-amber-400/40 transition-all group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="relative h-72 overflow-hidden bg-[#0A0A0A]">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />

                  <span className="absolute top-4 left-4 bg-[#0A0A0A] border border-amber-400/30 text-amber-400 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                    {room.category}
                  </span>

                  <div className="absolute bottom-4 right-4 bg-[#0A0A0A] border border-amber-400/30 p-3 px-4 rounded-2xl text-right shadow-lg">
                    <span className="font-serif italic font-bold text-2xl text-amber-400">
                      ₹{room.pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-white/50 block uppercase tracking-widest">/ Night</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">
                        Room {room.roomNumber} • {room.floor}
                      </span>
                      <h3 className="font-serif italic font-bold text-2xl text-white mt-0.5">{room.name}</h3>
                    </div>
                    <span className="text-[9px] font-bold px-2.5 py-0.5 border border-amber-400/20 bg-amber-400/10 text-amber-400 rounded-full uppercase tracking-widest">
                      {room.status}
                    </span>
                  </div>

                  <p className="text-xs text-white/60 leading-relaxed">{room.description}</p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {room.amenities.map((am) => (
                      <span
                        key={am}
                        className="text-[9px] font-bold uppercase tracking-wider px-3 py-1 bg-[#0A0A0A] border border-white/10 rounded-full text-white/80 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-amber-400" />
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => openBookingModal('STAY', room)}
                  className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
                >
                  <span>Reserve Suite Night</span>
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
