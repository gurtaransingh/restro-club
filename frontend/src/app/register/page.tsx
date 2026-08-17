'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { Crown, Sparkles, User, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register, membershipTiers, activeLocation, locations } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tierId, setTierId] = useState('tier-club');
  const [locationId, setLocationId] = useState(activeLocation.id);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Mohali');
  const [state, setState] = useState('Punjab');
  const [pincode, setPincode] = useState('140601');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register({
        name,
        email,
        phone,
        username,
        password,
        membershipTierId: tierId,
        locationId,
        address,
        city,
        state,
        pincode,
      });
      router.push('/profile');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8C5A3C]/15 border border-[#8C5A3C]/30 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
            <Crown className="w-3.5 h-3.5" />
            <span>Member Onboarding</span>
          </div>
          <h1 className="font-serif italic text-3xl sm:text-5xl font-bold text-[#1E241D]">
            Join Restro Club
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E]">
            Create your member account to access fine dining reservations, sports court priority, and member tier benefits.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Full Legal Name</label>
              <input
                type="text"
                required
                placeholder="e.g. S. Gurtaran Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Mobile Phone</label>
              <input
                type="tel"
                required
                placeholder="+91 98000 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Email Address</label>
              <input
                type="email"
                required
                placeholder="member@restroclub.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Desired Username</label>
              <input
                type="text"
                required
                placeholder="gurtaran01"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E5DEC9]">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Primary Club Hub</label>
              <select
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
              >
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Membership Tier</label>
              <select
                value={tierId}
                onChange={(e) => setTierId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
              >
                {membershipTiers.map((tier) => (
                  <option key={tier.id} value={tier.id}>
                    {tier.name} (₹{tier.annualFee.toLocaleString()}/yr)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-[#E5DEC9]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E] block">
              Residential Address (Optional)
            </span>
            <input
              type="text"
              placeholder="House/Plot No., Sector, Street"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="City (e.g. Mohali)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
              />
              <input
                type="text"
                placeholder="State (e.g. Punjab)"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
              />
              <input
                type="text"
                placeholder="Pincode (e.g. 140601)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isLoading ? 'Creating Member ID...' : 'Complete Registration & Join'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center text-xs text-[#5C554E]">
            Already have a membership ID?{' '}
            <Link href="/login" className="text-[#8C5A3C] font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
