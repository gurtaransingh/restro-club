import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Download, Filter, ShoppingCart } from 'lucide-react';

export const FinancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-6 border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] block">
              Financial Master Control
            </span>
            <h1 className="font-serif italic text-3xl sm:text-5xl font-bold text-white mt-1">Revenue Analytics</h1>
            <p className="text-xs text-white/60 mt-2 uppercase tracking-wider">
              Comprehensive financial overview & department breakdown.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select className="bg-[#141414] border border-white/20 text-white text-xs font-bold px-3 py-2 uppercase tracking-widest focus:outline-none">
              <option>FY 23-24</option>
              <option>FY 24-25</option>
            </select>
            <button className="p-2.5 bg-[#141414] border border-white/20 text-white hover:bg-white/10 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Key Metrics Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Revenue Card */}
          <div className="md:col-span-2 bg-[#141414] border border-white/10 p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Total Monthly Revenue</span>
                <p className="font-serif italic text-4xl sm:text-5xl font-bold text-white mt-1">₹1.24 Cr</p>
              </div>

              <div className="flex items-center gap-1 bg-white/10 border border-white/20 px-3 py-1 text-xs font-bold text-white uppercase tracking-widest">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12.4%</span>
              </div>
            </div>

            {/* Sparkline Visual */}
            <div className="h-20 w-full pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path
                  d="M0 25 L10 22 L20 28 L30 18 L40 20 L50 10 L60 15 L70 5 L80 12 L90 2 L100 8"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Side Metrics */}
          <div className="space-y-6">
            <div className="bg-[#141414] border border-white/10 p-6 space-y-2">
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Profit Margin</span>
              <div className="flex items-baseline justify-between">
                <span className="font-serif italic text-3xl font-bold text-white">32.8%</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="bg-[#141414] border border-white/10 p-6 space-y-2">
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Daily Avg</span>
              <span className="font-serif italic text-3xl font-bold text-white">₹4.12 L</span>
            </div>
          </div>

        </div>
      </section>

      {/* Department Split & Ledger Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Department Split */}
          <div className="bg-[#141414] border border-white/10 p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="font-serif italic text-2xl font-bold text-white">Department Split</h2>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Share %</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#0A0A0A] border border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Fine Dining</span>
                </div>
                <div className="text-right">
                  <span className="font-serif italic font-bold text-lg text-white">₹55.8 L</span>
                  <span className="text-[9px] text-white/40 block uppercase tracking-widest">45% Share</span>
                </div>
              </div>

              <div className="p-4 bg-[#0A0A0A] border border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white/60" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Luxury Stay</span>
                </div>
                <div className="text-right">
                  <span className="font-serif italic font-bold text-lg text-white">₹37.2 L</span>
                  <span className="text-[9px] text-white/40 block uppercase tracking-widest">30% Share</span>
                </div>
              </div>

              <div className="p-4 bg-[#0A0A0A] border border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white/30" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Club Memberships</span>
                </div>
                <div className="text-right">
                  <span className="font-serif italic font-bold text-lg text-white">₹31.0 L</span>
                  <span className="text-[9px] text-white/40 block uppercase tracking-widest">25% Share</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Ledger */}
          <div className="bg-[#141414] border border-white/10 p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="font-serif italic text-2xl font-bold text-white">Recent Ledger</h2>
              <Filter className="w-4 h-4 text-white/60" />
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-[#0A0A0A] border border-white/10 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">The Grand Room Event</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Today, 2:45 PM</p>
                </div>
                <div className="text-right">
                  <span className="font-serif italic font-bold text-base text-white">+₹4.25 L</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-white/10 text-white uppercase tracking-widest border border-white/10 block mt-1 w-fit ml-auto">
                    PAID
                  </span>
                </div>
              </div>

              <div className="p-4 bg-[#0A0A0A] border border-white/10 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Penthouse Booking (3 Nts)</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Today, 11:30 AM</p>
                </div>
                <div className="text-right">
                  <span className="font-serif italic font-bold text-base text-white">+₹8.90 L</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-white/10 text-white/60 uppercase tracking-widest border border-white/10 block mt-1 w-fit ml-auto">
                    PENDING
                  </span>
                </div>
              </div>

              <div className="p-4 bg-[#0A0A0A] border border-white/10 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Wine Cellar Restock</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Yesterday</p>
                </div>
                <div className="text-right">
                  <span className="font-serif italic font-bold text-base text-red-400">-₹12.4 L</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-red-500/10 text-red-400 uppercase tracking-widest border border-red-500/20 block mt-1 w-fit ml-auto">
                    EXPENSE
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
