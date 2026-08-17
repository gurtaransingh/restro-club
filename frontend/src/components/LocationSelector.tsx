'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, ChevronDown, Check } from 'lucide-react';

export const LocationSelector: React.FC = () => {
  const { locations, activeLocation, setActiveLocation } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF8F3] border border-[#E5DEC9] rounded-full text-xs font-semibold text-[#1E241D] hover:bg-[#F2ECE1] transition-colors shadow-sm"
      >
        <MapPin className="w-3.5 h-3.5 text-[#8C5A3C]" />
        <span className="max-w-[160px] truncate">{activeLocation.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#5C554E] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E5DEC9] rounded-2xl shadow-xl z-50 p-2 space-y-1">
            <div className="px-3 py-2 border-b border-[#E5DEC9]">
              <span className="text-[10px] font-bold text-[#5C554E] uppercase tracking-wider block">
                Operating Property Hubs
              </span>
              <p className="text-[11px] text-[#1E241D]">Select property to filter dining, sports & stays</p>
            </div>
            {locations.map((loc) => {
              const isSelected = loc.id === activeLocation.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => {
                    setActiveLocation(loc);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    isSelected ? 'bg-[#EDE6D8] font-bold text-[#1E241D]' : 'hover:bg-[#FAF8F3] text-[#5C554E]'
                  }`}
                >
                  <div>
                    <span className="block text-xs text-[#1E241D] font-medium">{loc.name}</span>
                    <span className="block text-[10px] text-[#5C554E]">{loc.region}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#8C5A3C]" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
