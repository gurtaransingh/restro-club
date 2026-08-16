import React from 'react';
import { Megaphone, Users, Award, Mail, MessageSquare, PartyPopper, ChevronRight, Edit3, Filter } from 'lucide-react';

export const MarketingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-6 border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] block">
            Growth & Member Engagement
          </span>
          <h1 className="font-serif italic text-3xl sm:text-5xl font-bold text-white mt-1">Marketing & CRM</h1>
          <p className="text-xs text-white/60 mt-2 uppercase tracking-wider">
            Manage campaigns, member segments, and luxury loyalty programs.
          </p>
        </div>
      </section>

      {/* Key Metrics Cards */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto flex gap-4 overflow-x-auto no-scrollbar pb-2">
          
          <div className="flex-none w-64 p-6 bg-[#141414] border border-white/10 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <Megaphone className="w-6 h-6 text-white" />
              <span className="text-[9px] font-bold bg-white text-black px-2 py-0.5 uppercase tracking-widest">
                Active
              </span>
            </div>
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Total Campaigns</p>
            <p className="font-serif italic text-3xl font-bold text-white">12</p>
          </div>

          <div className="flex-none w-64 p-6 bg-[#141414] border border-white/10 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <Users className="w-6 h-6 text-white" />
              <span className="text-[9px] font-bold bg-white/10 border border-white/20 text-white px-2 py-0.5 uppercase tracking-widest">
                +5% M/M
              </span>
            </div>
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Total Segments</p>
            <p className="font-serif italic text-3xl font-bold text-white">4</p>
          </div>

          <div className="flex-none w-64 p-6 bg-[#141414] border border-white/10 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <Award className="w-6 h-6 text-white" />
              <span className="text-[9px] font-bold bg-white/10 border border-white/20 text-white px-2 py-0.5 uppercase tracking-widest">
                Issued
              </span>
            </div>
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Loyalty Points</p>
            <p className="font-serif italic text-3xl font-bold text-white">24.5k</p>
          </div>

        </div>
      </section>

      {/* Campaigns Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif italic text-2xl font-bold text-white">Campaigns</h2>
          <button className="text-[10px] font-bold text-white uppercase tracking-widest hover:underline cursor-pointer">
            View All
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-[#141414] border border-white/10 flex items-center justify-between group hover:border-white/30 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center text-white">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Summer Tasting Menu</h3>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">Email • Scheduled</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </div>

          <div className="p-4 bg-[#141414] border border-white/10 flex items-center justify-between group hover:border-white/30 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center text-white">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">VIP Weekend Special</h3>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">SMS • <span className="text-emerald-400">Active</span></p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </div>

          <div className="p-4 bg-[#141414] border border-white/10 flex items-center justify-between group hover:border-white/30 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center text-white">
                <PartyPopper className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Diwali Grand Feast (Template)</h3>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">Multi-channel • Draft</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </div>
        </div>
      </section>

      {/* Segments Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif italic text-2xl font-bold text-white">Member Segments</h2>
          <div className="flex items-center gap-1 text-[10px] font-bold text-white/60 uppercase tracking-widest">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-[#141414] border border-white/20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-white" />
            <p className="font-serif italic text-3xl font-bold text-white mt-1">1,240</p>
            <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mt-1">Platinum Members</p>
          </div>

          <div className="p-5 bg-[#141414] border border-white/10 text-center">
            <p className="font-serif italic text-3xl font-bold text-white mt-1">3,500</p>
            <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mt-1">Gold Members</p>
          </div>

          <div className="p-5 bg-[#141414] border border-white/10 text-center">
            <p className="font-serif italic text-3xl font-bold text-white mt-1">850</p>
            <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mt-1">New Signups</p>
          </div>

          <div className="p-5 bg-[#141414] border border-white/10 text-center">
            <p className="font-serif italic text-3xl font-bold text-red-400 mt-1">420</p>
            <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mt-1">At Risk Members</p>
          </div>
        </div>
      </section>

      {/* Promo Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="font-serif italic text-2xl font-bold text-white mb-6">Promo Banners</h2>
        <div className="relative w-full h-56 border border-white/10 overflow-hidden group cursor-pointer bg-[#141414]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhRwhwNCnhGzEclW5wbJU9UAbHH-mWDdGdmwxvOlfBWMDE-wGGZcA_CSA-p2xEKrkKujkThGkp37RRXeKQqPl7P2VqP9DJ8NYQPXn3L7b2Ii7B-3xu-bRZdzREMnqGgvzDM2-XvHLuZ6Y09GWkL1pPILOharxTqe9474grm8blS32EnKUBpBqrbRiNmgH2izXlBojGRWoQsn9jJu6rKYl8VSPxIXPfQrBdz2WG-VG_ybPoDMRd3VQ8Tg"
            alt="Autumn Collection"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
            <div>
              <span className="text-[9px] font-bold text-white bg-black/60 border border-white/20 px-2 py-1 uppercase tracking-widest block mb-2 w-fit">
                Website Homepage
              </span>
              <h3 className="font-serif italic text-2xl font-bold text-white">Autumn Collection Launch</h3>
            </div>
            <button className="w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-white/90 transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
