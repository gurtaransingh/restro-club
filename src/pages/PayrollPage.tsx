import React, { useState } from 'react';
import { Play, TrendingUp, CheckCircle, Clock, Search, Filter, Plus } from 'lucide-react';

export const PayrollPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roster' | 'payroll'>('roster');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-6 border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] block">
              Human Resources & Roster
            </span>
            <h1 className="font-serif italic text-3xl sm:text-5xl font-bold text-white mt-1">Staff & Payroll</h1>
            <p className="text-xs text-white/60 mt-2 uppercase tracking-wider">
              Manage shifts, daily attendance roster, and monthly payroll disbursements.
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex bg-[#141414] border border-white/20 p-1">
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === 'roster' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              Today's Roster
            </button>
            <button
              onClick={() => setActiveTab('payroll')}
              className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === 'payroll' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              Payroll Cycle
            </button>
          </div>
        </div>
      </section>

      {/* Roster View */}
      {activeTab === 'roster' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          
          {/* Roster Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#141414] border border-white/10 p-5 text-center">
              <span className="font-serif italic text-4xl font-bold text-white">42</span>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block mt-1">Present</span>
            </div>
            <div className="bg-[#141414] border border-white/10 p-5 text-center">
              <span className="font-serif italic text-4xl font-bold text-white">3</span>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block mt-1">On Leave</span>
            </div>
            <div className="bg-[#141414] border border-red-500/20 p-5 text-center">
              <span className="font-serif italic text-4xl font-bold text-red-400">1</span>
              <span className="text-[9px] font-bold text-red-400/80 uppercase tracking-widest block mt-1">Absent</span>
            </div>
          </div>

          {/* Department Staff List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-serif italic text-2xl font-bold text-white">Active Shift Staff</h2>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-white/40" />
                <Filter className="w-4 h-4 text-white/40" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-[#141414] border border-white/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr6sxw9-3SrY_Ko7YvqItPiGmYQ-YZ5PIJnHaluMfrCXZW7C9PsOO_jpbxGfvXfxhKJgwicXKkI_au7BeGJAPs7nMaax2wo68io2Cg9FjPII1zzanXfjseU8_R0Id7cBIELSIyCnQ7xavJDFTo1Jsv4XAJbaLCBm9SU-rYQtVtvZ_jgsJNOE0ccTiSoDfkgiU0d7tX981KZx1XuCCMb4Hcoti2exrG-LBpEEQSHOhPdohMdeyBxdAUiQ"
                    alt="Marcus Chen"
                    className="w-12 h-12 border border-white/20 object-cover"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Marcus Chen</h3>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Senior Chef • Kitchen Station</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white">06:45 AM</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest block mt-1">
                    In Shift
                  </span>
                </div>
              </div>

              <div className="bg-[#141414] border border-white/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC5niOIpaX5L6yn-Lll9S_ypOhOyLaWyjFF9aWZ1DNIN2WpfyD1JVxmJ64XzKl463V7l_w7I03AK0tPvnfRYrIWqlvVhBlw9nyLei6nabruEIruQbmQrTagi3TxVXFnHXt8jXdId1OWiPkKjzXcDChNt8OhItoc7Re5ZW0JwsFUqfbjpHdmKffZQEG4JlGCzGOFdVE28OlSNVRv9KDrTuSexDAYibtYo5D5qS1n534HiQ9m42hx0mWOw"
                    alt="Elena Rostova"
                    className="w-12 h-12 border border-white/20 object-cover"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Elena Rostova</h3>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Head Sommelier • Dining</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white">07:15 AM</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest block mt-1">
                    In Shift
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Payroll View */}
      {activeTab === 'payroll' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#141414] border border-white/10 p-6 space-y-2">
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Total Disbursed</span>
              <p className="font-serif italic text-4xl font-bold text-white">₹28.45L</p>
              <p className="text-[10px] text-white/60 uppercase tracking-wider">+2.4% vs last month</p>
            </div>

            <div className="bg-[#141414] border border-white/10 p-6 space-y-2">
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Employees Paid</span>
              <p className="font-serif italic text-4xl font-bold text-white">142</p>
              <p className="text-[10px] text-white/60 uppercase tracking-wider">3 Pending Approvals</p>
            </div>

            <div className="bg-[#141414] border border-white/10 p-6 space-y-2">
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Bonuses & Incentives</span>
              <p className="font-serif italic text-4xl font-bold text-white">₹1.24L</p>
              <button className="text-[10px] font-bold text-white underline uppercase tracking-widest hover:text-white/80">
                Manage Allocations
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-serif italic text-2xl font-bold text-white">Employee Roster Payroll</h2>
              <button className="px-5 py-2.5 bg-white text-black font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-white/90">
                <Play className="w-3.5 h-3.5" />
                <span>Run Payroll</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-[#141414] border border-white/10 p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif italic text-2xl font-bold text-white">Eleanor Vance</h3>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Senior Executive Chef</p>
                  </div>
                  <span className="text-[9px] font-bold px-3 py-1 bg-white text-black uppercase tracking-widest">
                    Processed
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4 p-4 bg-[#0A0A0A] border border-white/10 text-xs">
                  <div>
                    <span className="text-[9px] text-white/40 uppercase tracking-widest block">Base Pay</span>
                    <span className="font-bold text-white">₹8.50L</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/40 uppercase tracking-widest block">Deductions</span>
                    <span className="font-bold text-red-400">-₹0.32L</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/40 uppercase tracking-widest block">TDS</span>
                    <span className="font-bold text-red-400">-₹0.85L</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest block">Net Pay</span>
                    <span className="font-serif italic font-bold text-lg text-white">₹7.33L</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
