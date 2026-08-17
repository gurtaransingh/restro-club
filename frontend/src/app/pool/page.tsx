'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Waves, Sparkles, Sun, Umbrella, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PoolPage() {
  const { activeLocation, openBookingModal } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24 space-y-12">
      {/* Header */}
      <section className="bg-[#EDE6D8] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8C5A3C]/15 border border-[#8C5A3C]/30 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
              <Waves className="w-3.5 h-3.5" />
              <span>Olympic Pool Deck & Cabanas • {activeLocation.name}</span>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-5xl font-bold text-[#1E241D]">
              Aquatic Oasis & Sun Deck
            </h1>
            <p className="text-xs sm:text-sm text-[#5C554E] max-w-xl">
              Heated temperature-controlled lap pools, poolside cabana loungers, artisanal cocktails, and private sun decks.
            </p>
          </div>

          <button
            onClick={() => openBookingModal('POOL', { name: 'Poolside Cabana Lounger' })}
            className="px-6 py-3.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
          >
            Reserve Private Cabana
          </button>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80"
            alt="Lap Pool"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 space-y-2">
            <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">50m Olympic Lap Pool</h3>
            <p className="text-xs text-[#5C554E]">Dedicated swimming lanes with certified lifeguards and towel service.</p>
          </div>
        </div>

        <div className="bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
            alt="Cabana"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 space-y-2">
            <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">Luxury Day Cabanas</h3>
            <p className="text-xs text-[#5C554E]">Plush daybeds with private butler beverage service and fresh fruit platters.</p>
          </div>
        </div>

        <div className="bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
            alt="Pool Bar"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 space-y-2">
            <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">Sunset Poolside Bar</h3>
            <p className="text-xs text-[#5C554E]">Craft cocktails, mocktails and light bites delivered straight to your lounger.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
