import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  User,
  Calendar,
  ShoppingBag,
  Award,
  MapPin,
  CheckCircle2,
  Clock,
  Crown,
  ShieldCheck,
  Sparkles,
  LogOut,
  LogIn,
  FileText,
  DollarSign,
} from 'lucide-react';
import { calculatePayscaleSalary } from '../types';

export const ProfilePage: React.FC = () => {
  const { currentUser, isAuthenticated, logout, bookings, orders, activeLocation, membershipTiers } = useApp();

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] py-20 px-4 text-center flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white border border-[#E5DEC9] rounded-3xl p-8 shadow-sm space-y-5">
          <div className="w-14 h-14 bg-[#8C5A3C]/10 text-[#8C5A3C] rounded-2xl flex items-center justify-center mx-auto">
            <User className="w-7 h-7" />
          </div>
          <h1 className="font-serif italic text-2xl font-bold text-[#1E241D]">Sign In to View Member Profile</h1>
          <p className="text-xs text-[#5C554E]">Access your reservation itinerary, loyalty ledger, dining orders, and account settings.</p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/login"
              className="w-full py-3 bg-[#8C5A3C] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#73482E] transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In with ID</span>
            </Link>
            <Link
              to="/register"
              className="w-full py-3 bg-[#FAF8F3] border border-[#E5DEC9] text-[#1E241D] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#F2ECE1] transition-all"
            >
              Join Restro Club
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentTierObj = membershipTiers.find((t) => t.id === currentUser.membershipTierId);
  const userBookings = bookings.filter((b) => b.guestEmail === currentUser.email || b.guestName === currentUser.name);
  const userOrders = orders.filter((o) => o.guestName === currentUser.name);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24">
      {/* Profile Banner */}
      <section className="bg-[#EDE6D8] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl border-2 border-[#8C5A3C] object-cover shrink-0 shadow-md"
            />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8C5A3C]/15 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-1.5">
                <Crown className="w-3 h-3" />
                <span>Member Since {currentUser.memberSinceYear || 2021}</span>
              </div>
              <h1 className="font-serif italic text-3xl font-bold text-[#1E241D]">{currentUser.name}</h1>
              <p className="text-xs text-[#5C554E] uppercase tracking-wider mt-0.5">
                {currentUser.email} • {currentUser.phone}
              </p>
              {currentUser.address && (
                <p className="text-[11px] text-[#5C554E] mt-1">
                  📍 {currentUser.address}, {currentUser.city} {currentUser.pincode}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="p-4 bg-white border border-[#E5DEC9] rounded-2xl text-center min-w-[120px] shadow-sm">
              <span className="text-[9px] font-bold text-[#5C554E] uppercase tracking-widest block">Loyalty Points</span>
              <span className="font-serif italic text-2xl font-bold text-[#8C5A3C] mt-0.5 block">
                {(currentUser.loyaltyPoints || 0).toLocaleString()}
              </span>
            </div>

            <div className="p-4 bg-white border border-[#E5DEC9] rounded-2xl text-center min-w-[120px] shadow-sm">
              <span className="text-[9px] font-bold text-[#5C554E] uppercase tracking-widest block">Club Tier</span>
              <span className="font-serif italic text-2xl font-bold text-[#3E4A38] mt-0.5 block uppercase">
                {currentTierObj?.name || 'Club'}
              </span>
            </div>

            <button
              onClick={logout}
              className="p-4 bg-white border border-red-200 text-red-700 hover:bg-red-50 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </section>

      {/* Profile Details & Active Itinerary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Active Reservations & Bookings */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-[#8C5A3C]" />
            <h2 className="font-serif italic text-2xl font-bold text-[#1E241D]">Your Reserved Itinerary</h2>
          </div>

          {userBookings.length === 0 ? (
            <div className="p-8 bg-white border border-[#E5DEC9] rounded-3xl text-center text-[#5C554E] text-xs">
              No active reservations found. Explore our fine dining, pickleball courts, or luxury suites to book!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBookings.map((bk) => (
                <div key={bk.id} className="bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 bg-[#8C5A3C]/10 text-[#8C5A3C] text-[9px] font-bold uppercase tracking-wider rounded-lg">
                      {bk.type}
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[9px] font-bold uppercase tracking-wider rounded-lg border border-emerald-200">
                      {bk.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif italic text-lg font-bold text-[#1E241D]">{bk.title}</h3>
                    <p className="text-xs text-[#5C554E] mt-1">Ref: <strong className="font-mono text-[#1E241D]">{bk.bookingRef}</strong></p>
                    <p className="text-xs text-[#5C554E]">Date: {bk.date} {bk.timeSlot && `• ${bk.timeSlot}`}</p>
                    <p className="text-xs text-[#5C554E]">Party Size: {bk.guestsCount} Guests</p>
                  </div>

                  <div className="pt-3 border-t border-[#E5DEC9] flex justify-between items-center text-xs">
                    <span className="text-[#5C554E]">Amount:</span>
                    <strong className="text-sm text-[#8C5A3C]">₹{Number(bk.totalAmount).toLocaleString()} ({bk.paymentStatus})</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dining & Bar Orders */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <ShoppingBag className="w-5 h-5 text-[#8C5A3C]" />
            <h2 className="font-serif italic text-2xl font-bold text-[#1E241D]">Recent Dining & Bar Orders</h2>
          </div>

          {userOrders.length === 0 ? (
            <div className="p-8 bg-white border border-[#E5DEC9] rounded-3xl text-center text-[#5C554E] text-xs">
              No recent dining orders. Scan your table QR code at the restaurant to order directly from Chef Julian!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userOrders.map((ord) => (
                <div key={ord.id} className="bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs font-bold text-[#8C5A3C]">Order #{ord.orderNumber}</span>
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-[9px] font-bold uppercase tracking-wider rounded-lg border border-amber-200">
                      {ord.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#1E241D]">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{it.quantity}x {it.itemName}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#E5DEC9] flex justify-between items-center text-xs">
                    <span className="text-[#5C554E]">{ord.tableName || 'Dining Table'}</span>
                    <strong className="text-sm text-[#1E241D]">₹{Number(ord.total).toLocaleString()}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
