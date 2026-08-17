'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { Crown, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function MembershipPage() {
  const { membershipTiers, currentUser } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24 space-y-12">
      {/* Header */}
      <section className="bg-[#EDE6D8] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto space-y-2 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8C5A3C]/15 border border-[#8C5A3C]/30 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
            <Crown className="w-3.5 h-3.5" />
            <span>Exclusive Club Privileges</span>
          </div>
          <h1 className="font-serif italic text-4xl sm:text-5xl font-bold text-[#1E241D]">
            Membership Tiers & Privileges
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] max-w-xl mx-auto">
            Enjoy priority court bookings, complimentary dining discounts, private concierge access, and reciprocal privileges.
          </p>
        </div>
      </section>

      {/* Tiers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {membershipTiers.map((tier) => {
            const isCurrent = currentUser?.membershipTierId === tier.id;
            const isElite = tier.id === 'tier-elite';
            return (
              <div
                key={tier.id}
                className={`border rounded-3xl p-8 flex flex-col justify-between shadow-sm transition-all duration-300 relative ${
                  isElite
                    ? 'bg-[#1E241D] text-white border-[#1E241D] shadow-xl'
                    : 'bg-white border-[#E5DEC9] text-[#1E241D] hover:border-[#8C5A3C]'
                }`}
              >
                {isElite && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#8C5A3C] text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-md">
                    Most Prestigious
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest block ${
                        isElite ? 'text-[#8C5A3C]' : 'text-[#8C5A3C]'
                      }`}
                    >
                      {tier.name} Tier
                    </span>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-serif italic text-4xl font-bold">₹{tier.annualFee.toLocaleString()}</span>
                      <span className={`text-xs ${isElite ? 'text-white/60' : 'text-[#5C554E]'}`}>/ year</span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 block mt-1">
                      {tier.discountPercentage}% Discount on Dining & Stays
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-current/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70">
                      Tier Privileges
                    </span>
                    {tier.perks.map((p, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isElite ? 'text-[#8C5A3C]' : 'text-emerald-700'}`} />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  {isCurrent ? (
                    <div className="w-full py-3 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-xl text-center">
                      Your Current Tier
                    </div>
                  ) : (
                    <Link
                      href="/register"
                      className={`w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md ${
                        isElite
                          ? 'bg-[#8C5A3C] hover:bg-[#73482E] text-white'
                          : 'bg-[#1E241D] hover:bg-[#2F392B] text-white'
                      }`}
                    >
                      <span>Join {tier.name} Club</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
