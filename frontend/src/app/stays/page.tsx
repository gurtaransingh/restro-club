'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { BedDouble, Check, Wifi, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function StaysPage() {
  const { rooms, activeLocation, openBookingModal } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24 space-y-12">
      {/* Header */}
      <section className="bg-[#EDE6D8] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8C5A3C]/15 border border-[#8C5A3C]/30 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
              <BedDouble className="w-3.5 h-3.5" />
              <span>Resort Living & Sanctuary Suites • {activeLocation.name}</span>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-5xl font-bold text-[#1E241D]">
              Boutique Resort Stays & Suites
            </h1>
            <p className="text-xs sm:text-sm text-[#5C554E] max-w-xl">
              1BHK, 2BHK and Penthouse suites designed for weekend escapes, active retreats, and overnight corporate summits.
            </p>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {room.floor}
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md text-[#1E241D] text-xs font-mono font-bold rounded-xl shadow-md">
                    ₹{room.pricePerNight.toLocaleString()} <span className="text-[10px] font-normal text-[#5C554E]">/ night</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#8C5A3C] tracking-widest block">
                      Suite #{room.roomNumber}
                    </span>
                    <h3 className="font-serif italic text-2xl font-bold text-[#1E241D] mt-0.5">{room.name}</h3>
                  </div>

                  <p className="text-xs text-[#5C554E] leading-relaxed">{room.description}</p>

                  <div className="space-y-1.5 pt-3 border-t border-[#E5DEC9]/60">
                    <span className="text-[10px] font-bold uppercase text-[#5C554E] tracking-wider block">
                      Included Amenities
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {room.amenities.map((am, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-[#FAF8F3] border border-[#E5DEC9] text-[10px] text-[#1E241D] rounded-lg font-medium"
                        >
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => openBookingModal('STAY', room)}
                  className="w-full py-3.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Reserve Suite</span>
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
