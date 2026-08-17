'use client';

import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Megaphone, Crown, Tag, Users, Sparkles } from 'lucide-react';

export default function MarketingAdminPage() {
  const { membershipTiers, allUsers } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24 space-y-8">
      <section className="bg-[#EDE6D8] py-8 px-4 sm:px-6 lg:px-8 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8C5A3C]/15 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-wider rounded-full mb-1">
            <Megaphone className="w-3.5 h-3.5" />
            <span>Growth & Loyalty Engine</span>
          </div>
          <h1 className="font-serif italic text-3xl font-bold text-[#1E241D]">
            Membership Tiers, Loyalty CRM & Campaigns
          </h1>
          <p className="text-xs text-[#5C554E] mt-1">Configure tier discounts, member privileges, and coupon rules.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {membershipTiers.map((tier) => {
            const memberCount = allUsers.filter((u) => u.membershipTierId === tier.id).length;
            return (
              <div key={tier.id} className="bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase text-[#8C5A3C]">{tier.name}</span>
                  <span className="px-2.5 py-0.5 bg-[#FAF8F3] border border-[#E5DEC9] text-[#1E241D] text-[10px] font-bold rounded">
                    {memberCount} Active Members
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="font-serif italic text-3xl font-bold text-[#1E241D]">₹{tier.annualFee.toLocaleString()}</span>
                  <span className="text-xs text-[#5C554E] block">Annual Subscription</span>
                </div>
                <div className="pt-3 border-t border-[#E5DEC9] space-y-1.5 text-xs text-[#5C554E]">
                  <strong className="text-[#3E4A38] block">{tier.discountPercentage}% Discount across Dining & Stays</strong>
                  {tier.perks.map((p, idx) => (
                    <div key={idx}>• {p}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Promos */}
        <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">Active Highway Club Promotional Rules</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#FAF8F3] border border-[#E5DEC9] rounded-2xl space-y-1">
              <span className="font-mono text-xs font-bold text-[#8C5A3C]">HIGHWAY50</span>
              <strong className="text-xs block text-[#1E241D]">50% Off First Racket Arena Booking</strong>
              <p className="text-[10px] text-[#5C554E]">Auto-applies for first-time highway guests.</p>
            </div>

            <div className="p-4 bg-[#FAF8F3] border border-[#E5DEC9] rounded-2xl space-y-1">
              <span className="font-mono text-xs font-bold text-[#8C5A3C]">WEEKENDESCAPE</span>
              <strong className="text-xs block text-[#1E241D]">20% Off 2BHK Luxury Suite Stays</strong>
              <p className="text-[10px] text-[#5C554E]">Valid Friday through Sunday bookings.</p>
            </div>

            <div className="p-4 bg-[#FAF8F3] border border-[#E5DEC9] rounded-2xl space-y-1">
              <span className="font-mono text-xs font-bold text-[#8C5A3C]">CHEFJULIAN</span>
              <strong className="text-xs block text-[#1E241D]">Complimentary Truffle Dessert with A5 Wagyu</strong>
              <p className="text-[10px] text-[#5C554E]">Valid for fine dining orders above ₹5,000.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
