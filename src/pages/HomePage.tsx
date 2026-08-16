import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  UtensilsCrossed,
  Trophy,
  BedDouble,
  Crown,
  ChevronRight,
  Sparkles,
  MapPin,
  Star,
  Award,
  ArrowUpRight,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { activeLocation } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-20">
      
      {/* Hero Banner Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#3E4A38] text-white border-b border-[#35402F]">
        {/* Background Image with Ambient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoXWDSThGlvVhvUCnA6BNvkgMbfcnIkVgQ1Rotp-D2NgsRbSabK3zTV2CG6hoRN8oa9hUFKBer0ydmG-5yV6-HfDn_frOTptn3UJo1B8vs7gMlsDTtDeZwdBryKYnu3mO4ksCtyIaDoOovnHG4xy2IbR2kKU0tAjlU8sPLFg9GOD0spYgOJHSmcPQxvT8HR-nLoMTYKomd9H9hb9Im0yHmyRSnJ9OF7NWVzh41dIDTUG0JvFGik4WqpQ"
            alt="Restro Club Destination"
            className="w-full h-full object-cover object-center opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3E4A38] via-[#3E4A38]/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white space-y-6 pt-12">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#8C5A3C]/20 border border-[#8C5A3C]/40 text-[#DBC7B5] rounded-full shadow-lg">
            <Crown className="w-3.5 h-3.5 text-[#DBC7B5]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
              THE NEW STANDARD • {activeLocation.name}
            </span>
          </div>

          <h1 className="font-serif italic text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white leading-none">
            RESTRO CLUB
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-[#ECF0EA]/80 font-light leading-relaxed tracking-wide uppercase">
            A premier multi-location destination uniting Michelin dining, sports courts, pool lounges, suites & bespoke social experiences.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/restaurant"
              className="w-full sm:w-auto px-8 py-4 bg-[#8C5A3C] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#73482E] transition-all shadow-xl shadow-[#8C5A3C]/30 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore The Club</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/sports"
              className="w-full sm:w-auto px-8 py-4 bg-[#2D3728]/80 border border-[#BAC5B5]/30 hover:bg-white hover:text-[#1E241D] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-[#DBC7B5]" />
              <span>Book Sports Arena</span>
            </Link>
          </div>

          {/* Quick Location Badge */}
          <div className="pt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#BAC5B5]">
            <MapPin className="w-3.5 h-3.5 text-[#8C5A3C]" />
            <span>Highway Hub • {activeLocation.region}</span>
          </div>
        </div>
      </section>

      {/* Curated Experiences Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Dining */}
          <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 hover:border-[#8C5A3C]/50 transition-all group flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-2xl border border-[#E5DEC9] bg-[#F7EFE8] text-[#8C5A3C] flex items-center justify-center mb-6 group-hover:bg-[#8C5A3C] group-hover:text-white transition-all shadow-sm">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-bold text-[#8C5A3C] uppercase tracking-[0.2em] block mb-1">Culinary Artistry</span>
              <h3 className="font-serif italic text-2xl font-bold text-[#1E241D] mb-3">Reserve Dining</h3>
              <p className="text-xs text-[#5C554E] leading-relaxed mb-6">
                Pan-seared Hokkaido scallops, A5 Wagyu reserves, and craft cellar selections.
              </p>
            </div>
            <Link
              to="/restaurant"
              className="inline-flex items-center gap-2 text-[10px] font-bold text-[#8C5A3C] uppercase tracking-widest group-hover:translate-x-1 transition-transform"
            >
              <span>View Menu & Table Orders</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Bento Card 2: Sports */}
          <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 hover:border-[#3E4A38]/50 transition-all group flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-2xl border border-[#E5DEC9] bg-[#ECF0EA] text-[#3E4A38] flex items-center justify-center mb-6 group-hover:bg-[#3E4A38] group-hover:text-white transition-all shadow-sm">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-bold text-[#3E4A38] uppercase tracking-[0.2em] block mb-1">Active Recreation</span>
              <h3 className="font-serif italic text-2xl font-bold text-[#1E241D] mb-3">Book Sports</h3>
              <p className="text-xs text-[#5C554E] leading-relaxed mb-6">
                Pro Pickleball courts, Box Cricket turf arena, Olympic lap pool, and badminton courts.
              </p>
            </div>
            <Link
              to="/sports"
              className="inline-flex items-center gap-2 text-[10px] font-bold text-[#3E4A38] uppercase tracking-widest group-hover:translate-x-1 transition-transform"
            >
              <span>Reserve Court Slots</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Bento Card 3: Stays */}
          <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 hover:border-[#8C5A3C]/50 transition-all group flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-2xl border border-[#E5DEC9] bg-[#F7EFE8] text-[#8C5A3C] flex items-center justify-center mb-6 group-hover:bg-[#8C5A3C] group-hover:text-white transition-all shadow-sm">
                <BedDouble className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-bold text-[#8C5A3C] uppercase tracking-[0.2em] block mb-1">Private Retreat</span>
              <h3 className="font-serif italic text-2xl font-bold text-[#1E241D] mb-3">Suite Stay</h3>
              <p className="text-xs text-[#5C554E] leading-relaxed mb-6">
                Boutique 1BHK/2BHK & Penthouse Suites with 24/7 concierge & private jacuzzi.
              </p>
            </div>
            <Link
              to="/stays"
              className="inline-flex items-center gap-2 text-[10px] font-bold text-[#8C5A3C] uppercase tracking-widest group-hover:translate-x-1 transition-transform"
            >
              <span>Explore Accommodations</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Royal Dining Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-[#E5DEC9]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#8C5A3C]/10 border border-[#8C5A3C]/30 text-[#8C5A3C] rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Michelin-Inspired Gastronomy</span>
            </div>

            <h2 className="font-serif italic text-4xl sm:text-5xl font-bold text-[#1E241D] leading-tight">
              Culinary Artistry Meets Unrivaled Atmosphere
            </h2>

            <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
              Every dish is an expression of seasonal precision, sourced from local organic estates and imported European artisanal producers. Experience our signature scallops, wagyu steaks, and aged reserve whiskies.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-white border border-[#E5DEC9] rounded-2xl shadow-sm">
                <span className="font-serif italic text-3xl font-bold text-[#8C5A3C]">4.9 / 5.0</span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#857D74] mt-1">Gastronomy Score</p>
              </div>
              <div className="p-5 bg-white border border-[#E5DEC9] rounded-2xl shadow-sm">
                <span className="font-serif italic text-3xl font-bold text-[#3E4A38]">100%</span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#857D74] mt-1">Organic Certified</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/restaurant"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#8C5A3C] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#73482E] transition-colors shadow-lg shadow-[#8C5A3C]/20"
              >
                <span>View Full Menu & Table QR Ordering</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative border border-[#E5DEC9] rounded-3xl overflow-hidden bg-white shadow-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ0autCWUNc1m9QoCUB2naO_Ms8PyzFZejWLR3QPrXK8qBEoUCihMeCCMSmW6RTWHvDuxar8KCIySIKZ7vUD-2Vcqu_Mkvm3hiokA3a5qve15LBbWAXm3HpkbDbSbXLZGQc5B1OnVHrrDUnuswJfQe9NyHU_aUKiCFShIsc5e6nhhZWnoJR60Jc5ZU22XgTjP27VtJXuaO6pDLs04FoonrFa3Ga6cQgNTjtdNQsWAf3DjeRaV4WGxeZA"
                alt="Signature Scallops"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1E241D] via-[#1E241D]/80 to-transparent p-6 text-white">
                <span className="text-[9px] font-bold text-[#DBC7B5] uppercase tracking-[0.2em] block">Signature Creation</span>
                <h4 className="font-serif italic text-2xl font-bold mt-0.5 text-white">Pan-Seared Hokkaido Scallops</h4>
                <p className="text-xs text-[#ECF0EA]/80 mt-1">Oscietra caviar, brown butter emulsion & white truffle oil</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Elite Membership Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#3E4A38] border border-[#35402F] p-8 sm:p-12 text-white relative overflow-hidden rounded-3xl shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8C5A3C]/30 text-[#DBC7B5] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#8C5A3C]/40 rounded-full">
              <Crown className="w-3.5 h-3.5 text-[#DBC7B5]" />
              <span>Privilege Awaits</span>
            </div>
            <h2 className="font-serif italic text-3xl sm:text-5xl font-bold text-white">
              Join the Restro Club Elite Community
            </h2>
            <p className="text-xs sm:text-sm text-[#ECF0EA]/80 leading-relaxed uppercase tracking-wider">
              Unlock priority sports court reservations, complimentary dining discounts, private concierge assistance, and invitations to exclusive tasting events.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/membership"
                className="px-8 py-4 bg-[#8C5A3C] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#73482E] transition-all shadow-lg shadow-[#8C5A3C]/30"
              >
                Apply for Membership
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
