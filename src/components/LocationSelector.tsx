import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, ChevronDown, Check, Building2 } from 'lucide-react';

export const LocationSelector: React.FC = () => {
  const { locations, activeLocation, setActiveLocation } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white transition-all border border-white/10 cursor-pointer shadow-sm"
      >
        <MapPin className="w-3.5 h-3.5 text-amber-400" />
        <span className="truncate max-w-[140px] sm:max-w-[200px]">{activeLocation.name}</span>
        <ChevronDown className="w-3 h-3 text-amber-400 ml-0.5" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 mt-2 w-80 bg-[#141414] border border-white/10 p-2.5 z-50 text-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-white/10 mb-2">
              <p className="text-[9px] font-bold tracking-[0.2em] text-amber-400 uppercase">Select Location Master</p>
              <p className="text-xs font-serif italic text-white/80 mt-0.5">Destination Club Across Cities</p>
            </div>
            <div className="space-y-1.5">
              {locations.map((loc) => {
                const isSelected = loc.id === activeLocation.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setActiveLocation(loc);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
                      isSelected ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-md shadow-amber-400/20' : 'hover:bg-white/5 border-transparent text-white/80'
                    }`}
                  >
                    <Building2 className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-black' : 'text-amber-400'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-bold tracking-wider truncate">{loc.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                      </div>
                      <p className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-black/80' : 'text-white/50'}`}>{loc.region}</p>
                      <p className={`text-[9px] truncate ${isSelected ? 'text-black/70' : 'text-white/40'}`}>{loc.hours}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
