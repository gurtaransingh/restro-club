'use client';

import React from 'react';
import { useApp } from '../../../context/AppContext';
import { DollarSign, TrendingUp, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function FinanceAdminPage() {
  const { orders, bookings, activeLocation } = useApp();

  const diningRevenue = orders.reduce((acc, o) => acc + Number(o.total || 0), 0);
  const bookingsRevenue = bookings.reduce((acc, b) => acc + Number(b.totalAmount || 0), 0);
  const totalRevenue = diningRevenue + bookingsRevenue;

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24 space-y-8">
      <section className="bg-[#EDE6D8] py-8 px-4 sm:px-6 lg:px-8 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8C5A3C]/15 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-wider rounded-full mb-1">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Financial Intelligence</span>
          </div>
          <h1 className="font-serif italic text-3xl font-bold text-[#1E241D]">
            Revenue, Gross Margins & Financial Analytics
          </h1>
          <p className="text-xs text-[#5C554E] mt-1">Live transaction ledger for {activeLocation.name}.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-[#5C554E] uppercase tracking-wider block">Dining & Bar Gross</span>
            <span className="font-serif italic text-3xl font-bold text-[#8C5A3C]">₹{diningRevenue.toLocaleString()}</span>
            <p className="text-xs text-emerald-700 font-semibold">+18.4% vs last month</p>
          </div>

          <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-[#5C554E] uppercase tracking-wider block">Courts & Stays Revenue</span>
            <span className="font-serif italic text-3xl font-bold text-[#3E4A38]">₹{bookingsRevenue.toLocaleString()}</span>
            <p className="text-xs text-emerald-700 font-semibold">+24.1% vs last month</p>
          </div>

          <div className="bg-[#1E241D] text-white rounded-3xl p-6 shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-[#EDE6D8] uppercase tracking-wider block">Total Ecosystem Gross</span>
            <span className="font-serif italic text-3xl font-bold text-white">₹{totalRevenue.toLocaleString()}</span>
            <p className="text-xs text-[#EDE6D8]/80 font-light">All active properties consolidated</p>
          </div>
        </div>

        {/* Breakdown Tables */}
        <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">Recent Settled Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#EDE6D8] text-[10px] uppercase font-bold text-[#5C554E]">
                <tr>
                  <th className="p-3">Ref / Order</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Guest</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DEC9]">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#FAF8F3]">
                    <td className="p-3 font-mono font-bold text-[#8C5A3C]">#{o.orderNumber}</td>
                    <td className="p-3">Dining ({o.tableName})</td>
                    <td className="p-3 font-medium text-[#1E241D]">{o.guestName}</td>
                    <td className="p-3 font-bold text-[#1E241D]">₹{Number(o.total).toLocaleString()}</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Settled</span></td>
                  </tr>
                ))}
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#FAF8F3]">
                    <td className="p-3 font-mono font-bold text-[#3E4A38]">{b.bookingRef}</td>
                    <td className="p-3">{b.type} ({b.title})</td>
                    <td className="p-3 font-medium text-[#1E241D]">{b.guestName}</td>
                    <td className="p-3 font-bold text-[#1E241D]">₹{Number(b.totalAmount).toLocaleString()}</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">{b.paymentStatus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
