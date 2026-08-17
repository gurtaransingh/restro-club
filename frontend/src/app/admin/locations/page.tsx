'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import { MapPin, Plus, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';

export default function LocationsAdminPage() {
  const { locations, activeLocation, setActiveLocation } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24 space-y-8">
      <section className="bg-[#EDE6D8] py-8 px-4 sm:px-6 lg:px-8 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8C5A3C]/15 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-wider rounded-full mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Multi-Property Network</span>
            </div>
            <h1 className="font-serif italic text-3xl font-bold text-[#1E241D]">
              Operating Property Hubs & Expansions
            </h1>
          </div>

          <Link
            href="/admin/locations/new"
            className="px-5 py-2.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Property Hub</span>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {locations.map((loc) => {
          const isCurrent = loc.id === activeLocation.id;
          return (
            <div
              key={loc.id}
              className={`bg-white border rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between transition-all ${
                isCurrent ? 'border-[#8C5A3C] ring-2 ring-[#8C5A3C]/20' : 'border-[#E5DEC9]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold text-[#8C5A3C]">{loc.code}</span>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase">
                    {loc.isActive ? 'Active Hub' : 'Inactive'}
                  </span>
                </div>
                <h3 className="font-serif italic text-2xl font-bold text-[#1E241D]">{loc.name}</h3>
                <p className="text-xs text-[#5C554E]">{loc.address}</p>
                <p className="text-[11px] text-[#8C5A3C] font-medium">{loc.hours}</p>
                <p className="text-[11px] text-[#5C554E]">{loc.contactEmail} • {loc.contactPhone}</p>
              </div>

              <div className="pt-4 border-t border-[#E5DEC9] flex items-center justify-between">
                <button
                  onClick={() => setActiveLocation(loc)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-[#EDE6D8] text-[#8C5A3C]'
                      : 'bg-[#FAF8F3] border border-[#E5DEC9] text-[#1E241D] hover:bg-[#EDE6D8]'
                  }`}
                >
                  {isCurrent ? 'Current Active Hub' : 'Set as Active Hub'}
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
