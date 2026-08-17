'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../../../context/AppContext';
import { MapPin, Plus, ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

export default function NewLocationPage() {
  const router = useRouter();
  const { addLocation } = useApp();

  const [code, setCode] = useState('RC-NEW');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState('Club: 6:00 AM - 11:00 PM | Dining: 12:00 PM - 11:00 PM');
  const [contactEmail, setContactEmail] = useState('concierge@restroclub.com');
  const [contactPhone, setContactPhone] = useState('+91 (800) 555-0199');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setIsLoading(true);
    try {
      await addLocation({
        code,
        name,
        region,
        address,
        hours,
        contactEmail,
        contactPhone,
        isActive: true,
      });
      router.push('/admin/locations');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href="/admin/locations"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#8C5A3C] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Locations</span>
        </Link>

        <div className="bg-white border border-[#E5DEC9] rounded-3xl p-8 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] font-bold text-[#8C5A3C] uppercase tracking-wider block">Enterprise Expansion</span>
            <h1 className="font-serif italic text-2xl font-bold text-[#1E241D] mt-0.5">Add New Property Hub</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#5C554E]">Hub Code</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#5C554E]">Property Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Restro Club Aerocity"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-[#5C554E]">Region / City</label>
              <input
                type="text"
                required
                placeholder="e.g. Aerocity, Mohali"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-[#5C554E]">Full Address</label>
              <input
                type="text"
                required
                placeholder="Highway Road, Sector, Pincode"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#5C554E]">Contact Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#5C554E]">Contact Phone</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Creating Hub...' : 'Save & Publish Location Hub'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
