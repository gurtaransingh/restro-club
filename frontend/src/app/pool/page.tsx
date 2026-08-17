'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Waves, Calendar, Clock, ShieldCheck, Sun, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PoolPage() {
  const { activeLocation, openBookingModal } = useApp();

  const poolExperiences = [
    {
      title: 'Olympic-Standard 50m Heated Lap Pool',
      desc: 'Dedicated swim lanes for endurance training, morning swim drills, and leisurely afternoon dips with panoramic horizon views.',
      time: '06:00 AM - 10:00 PM',
      price: 'Free for Members • ₹800 Guest Day Pass',
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'VIP Poolside Cabana & Sunbeds',
      desc: 'Private luxury cabana rental with dedicated butler service, fresh towel stack, and artisan mocktail service.',
      time: '11:00 AM - 09:00 PM',
      price: '₹3,500 / 4 Hours (Includes ₹2,000 F&B credit)',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Sunset Poolside Lounge & Cocktail Bar',
      desc: 'Open-air pool deck serving handcrafted elixirs, wood-fired appetizers, and live acoustic lounge sessions.',
      time: '04:00 PM - 11:30 PM',
      price: 'A La Carte Deck Dining',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      {/* Hero Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#0F0F0F] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80"
            alt="Pool"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-4 rounded-full">
              <Waves className="w-3.5 h-3.5 text-amber-400" />
              <span>Aqua Oasis • {activeLocation.name}</span>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-6xl font-bold text-white tracking-tight">
              Swimming & Pool Club
            </h1>
            <p className="text-sm text-white/60 max-w-2xl mt-3 uppercase tracking-wider leading-relaxed">
              Heated temperature-controlled pools, luxury poolside cabanas, curated lounge music, and deckside dining service.
            </p>
          </div>

          <button
            onClick={() => openBookingModal('POOL', { name: 'Poolside Cabana & Pass' })}
            className="px-6 py-3.5 bg-amber-400 text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-amber-300 transition-all flex items-center gap-2 shadow-lg shadow-amber-400/20 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>Reserve Cabana or Day Pass</span>
          </button>
        </div>
      </section>

      {/* Pool Experiences Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {poolExperiences.map((item, idx) => (
            <div key={idx} className="bg-[#141414] border border-white/10 rounded-3xl overflow-hidden flex flex-col group hover:border-amber-400/40 transition-all shadow-xl">
              <div className="h-52 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-amber-400/30 px-3 py-1 rounded-full text-[9px] font-bold text-amber-400 uppercase tracking-widest shadow-md">
                  {item.time}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif italic text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-white/60 mt-2 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{item.price}</span>
                  <button
                    onClick={() => openBookingModal('POOL', { name: item.title })}
                    className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-amber-400 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pool Amenities & Rules Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-white/10">
        <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Certified Lifeguards</h4>
              <p className="text-[10px] text-white/50 mt-1">Full-time trained safety professionals on deck at all hours.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
              <Sun className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">UV Water Filtration</h4>
              <p className="text-[10px] text-white/50 mt-1">Hospital-grade clean water treatment updated continuously.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Fresh Towel Suite</h4>
              <p className="text-[10px] text-white/50 mt-1">Complimentary plush Egyptian cotton pool towels provided.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Locker Rooms & Saunas</h4>
              <p className="text-[10px] text-white/50 mt-1">Separate luxury shower, steam room & locker facilities.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
