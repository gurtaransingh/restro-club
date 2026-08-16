import React from 'react';
import { useApp } from '../context/AppContext';
import { Crown, Check, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';

export const MembershipPage: React.FC = () => {
  const { membershipTiers, currentUser, setCurrentUser } = useApp();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      {/* Hero Header */}
      <section className="bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-2 rounded-full">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Privilege & Status</span>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-6xl font-bold">Membership Privileges</h1>
            <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-xl uppercase tracking-wider">
              Unlock priority court reservations, complimentary dining privileges & private concierge services.
            </p>
          </div>

          <div className="bg-[#141414] p-4 border border-white/10 rounded-2xl flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Your Current Status</p>
              <p className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">
                {currentUser.name} • {currentUser.membershipTierId.replace('tier-', '').toUpperCase()} TIER
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipTiers.map((tier) => {
            const isCurrent = currentUser.membershipTierId === tier.id;

            return (
              <div
                key={tier.id}
                className={`bg-[#141414] border rounded-3xl p-6 flex flex-col justify-between transition-all relative shadow-xl ${
                  isCurrent ? 'border-amber-400 bg-[#1a1810]' : 'border-white/10 hover:border-amber-400/40'
                }`}
              >
                {isCurrent && (
                  <span className="absolute -top-3 right-6 bg-amber-400 text-black text-[9px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest shadow-md">
                    Your Tier
                  </span>
                )}

                <div>
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-[0.2em] block">
                    Tier Privilege
                  </span>
                  <h3 className="font-serif italic text-2xl font-bold text-white mt-1">{tier.name}</h3>

                  <div className="my-4 py-3 border-y border-white/10">
                    <span className="font-serif italic text-3xl font-bold text-amber-400">
                      ₹{tier.annualFee.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-white/50 block uppercase tracking-widest mt-0.5">
                      Annual Privilege Fee
                    </span>
                  </div>

                  <ul className="space-y-2.5 my-6">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-white/80">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setCurrentUser({ ...currentUser, membershipTierId: tier.id })}
                  disabled={isCurrent}
                  className={`w-full py-3 text-xs font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-400/10 text-amber-400/60 cursor-not-allowed border border-amber-400/20'
                      : 'bg-amber-400 text-black hover:bg-amber-300 shadow-lg shadow-amber-400/20'
                  }`}
                >
                  {isCurrent ? 'Active Membership' : 'Select Tier'}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
