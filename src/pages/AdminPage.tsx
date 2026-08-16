import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Shield,
  MapPin,
  Users,
  UtensilsCrossed,
  DollarSign,
  Briefcase,
  Megaphone,
  Sparkles,
  ArrowUpRight,
  Database,
  Trophy,
  CalendarCheck,
  Package,
  Layers,
  Crown,
  QrCode,
  BedDouble,
  CheckCircle2,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    locations,
    orders,
    bookings,
    currentUser,
    facilities,
    menuItems,
    allUsers,
    employees,
    inventory,
    tables,
    rooms,
    membershipTiers,
    activeLocation,
  } = useApp();

  const totalOrders = orders.length;
  const activeBookings = bookings.length;
  const activeLocationsCount = locations.length;
  const occupiedTables = tables.filter((t) => t.status === 'OCCUPIED').length;

  const adminModules = [
    {
      title: 'Master Tables CRUD Engine',
      desc: 'Normalized relational database tables with full UI Create, Read, Update & Delete control.',
      count: '16 Master Tables Live',
      link: '/admin/masters',
      icon: Database,
      highlight: true,
    },
    {
      title: 'Location Network & Expansions',
      desc: 'Configure multiple property hubs, operational hours, addresses and regional codes.',
      count: `${activeLocationsCount} Operating Hubs`,
      link: '/admin/locations',
      icon: MapPin,
    },
    {
      title: 'Kitchen Display System (KDS)',
      desc: 'Live kitchen order queues, allergy alerts, ticket timers and live status transitions.',
      count: `${totalOrders} Orders Managed`,
      link: '/kitchen',
      icon: UtensilsCrossed,
    },
    {
      title: 'Finance & Revenue Analytics',
      desc: 'Live financial breakdown, revenue by department, gross margins & transaction ledgers.',
      count: '₹1.85 Cr FY Revenue',
      link: '/admin/finance',
      icon: DollarSign,
    },
    {
      title: 'Payroll, HR & Attendance',
      desc: 'Staff rosters, monthly salary disbursements, attendance matrix and designations.',
      count: `${employees.length} Active Staff Members`,
      link: '/admin/payroll',
      icon: Briefcase,
    },
    {
      title: 'Marketing & Loyalty Campaigns',
      desc: 'Tier discount rules, promotional coupon engine, member points and CRM pipeline.',
      count: `${membershipTiers.length} Membership Tiers`,
      link: '/admin/marketing',
      icon: Megaphone,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24">
      {/* Super Admin Top Banner */}
      <section className="px-4 sm:px-6 lg:px-8 pt-10 pb-8 border-b border-[#E5DEC9] bg-[#EDE6D8]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8C5A3C]/15 border border-[#8C5A3C]/30 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-3 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-[#8C5A3C]" />
              <span>Super Admin Command & Control Hub</span>
            </div>
            <h1 className="font-serif italic text-3xl sm:text-5xl font-bold text-[#1E241D]">
              Executive Command Center
            </h1>
            <p className="text-xs sm:text-sm text-[#5C554E] mt-1.5 uppercase tracking-wider">
              Signed in as <span className="text-[#1E241D] font-bold">{currentUser?.name || 'Administrator'}</span> • Super Administrator
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/masters"
              className="px-5 py-3 bg-[#8C5A3C] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#73482E] transition-all shadow-md shadow-[#8C5A3C]/20 flex items-center gap-2"
            >
              <Database className="w-4 h-4" />
              <span>Open Master Tables CRUD</span>
            </Link>
            <Link
              to="/admin/locations/new"
              className="px-5 py-3 bg-white border border-[#E5DEC9] text-[#1E241D] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#F2ECE1] transition-all shadow-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#8C5A3C]" />
              <span>+ Add New Location</span>
            </Link>
          </div>
        </div>
      </section>

      {/* KPI Overview Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-white border border-[#E5DEC9] p-5 rounded-2xl shadow-sm space-y-1">
            <span className="text-[9px] font-bold text-[#5C554E] uppercase tracking-widest block">Active Hubs</span>
            <span className="font-serif italic text-3xl font-bold text-[#8C5A3C]">{locations.length}</span>
            <p className="text-[10px] text-emerald-700 font-bold mt-1">Multi-location</p>
          </div>

          <div className="bg-white border border-[#E5DEC9] p-5 rounded-2xl shadow-sm space-y-1">
            <span className="text-[9px] font-bold text-[#5C554E] uppercase tracking-widest block">Sports Courts</span>
            <span className="font-serif italic text-3xl font-bold text-[#1E241D]">{facilities.length}</span>
            <p className="text-[10px] text-[#5C554E]">Bookable Arenas</p>
          </div>

          <div className="bg-white border border-[#E5DEC9] p-5 rounded-2xl shadow-sm space-y-1">
            <span className="text-[9px] font-bold text-[#5C554E] uppercase tracking-widest block">Dining Menu</span>
            <span className="font-serif italic text-3xl font-bold text-[#1E241D]">{menuItems.length}</span>
            <p className="text-[10px] text-[#5C554E]">Live Dishes</p>
          </div>

          <div className="bg-white border border-[#E5DEC9] p-5 rounded-2xl shadow-sm space-y-1">
            <span className="text-[9px] font-bold text-[#5C554E] uppercase tracking-widest block">Table Occupancy</span>
            <span className="font-serif italic text-3xl font-bold text-[#3E4A38]">{occupiedTables}/{tables.length}</span>
            <p className="text-[10px] text-[#5C554E]">QR Tables</p>
          </div>

          <div className="bg-white border border-[#E5DEC9] p-5 rounded-2xl shadow-sm space-y-1">
            <span className="text-[9px] font-bold text-[#5C554E] uppercase tracking-widest block">Staff Roster</span>
            <span className="font-serif italic text-3xl font-bold text-[#1E241D]">{employees.length}</span>
            <p className="text-[10px] text-emerald-700 font-bold">100% Present</p>
          </div>

          <div className="bg-white border border-[#E5DEC9] p-5 rounded-2xl shadow-sm space-y-1">
            <span className="text-[9px] font-bold text-[#5C554E] uppercase tracking-widest block">Orders & Bookings</span>
            <span className="font-serif italic text-3xl font-bold text-[#8C5A3C]">{orders.length + bookings.length}</span>
            <p className="text-[10px] text-[#5C554E]">Live Ledger</p>
          </div>
        </div>
      </section>

      {/* Admin Operations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold uppercase tracking-wider text-[#1E241D]">Enterprise Management Modules</h2>
            <p className="text-xs text-[#5C554E]">Access granular control workflows across operations, finance, HR & master tables.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <Link
                key={idx}
                to={mod.link}
                className={`border rounded-3xl p-7 space-y-5 transition-all group flex flex-col justify-between shadow-sm hover:shadow-md ${
                  mod.highlight
                    ? 'bg-gradient-to-br from-[#8C5A3C] to-[#6E442B] text-white border-[#73482E]'
                    : 'bg-white border-[#E5DEC9] text-[#1E241D] hover:border-[#8C5A3C]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        mod.highlight
                          ? 'bg-white/20 text-white'
                          : 'bg-[#F2ECE1] text-[#8C5A3C] group-hover:bg-[#8C5A3C] group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <ArrowUpRight
                      className={`w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${
                        mod.highlight ? 'text-white/80' : 'text-[#5C554E] group-hover:text-[#8C5A3C]'
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className={`font-serif italic text-2xl font-bold ${mod.highlight ? 'text-white' : 'text-[#1E241D]'}`}>
                      {mod.title}
                    </h3>
                    <p className={`text-xs leading-relaxed mt-1.5 ${mod.highlight ? 'text-white/80' : 'text-[#5C554E]'}`}>
                      {mod.desc}
                    </p>
                  </div>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between ${mod.highlight ? 'border-white/20' : 'border-[#E5DEC9]'}`}>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${mod.highlight ? 'text-white' : 'text-[#8C5A3C]'}`}>
                    {mod.count}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    Manage Module →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};
