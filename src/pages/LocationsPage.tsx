import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MapPin, Plus, Filter, MoreHorizontal, Sparkles } from 'lucide-react';

export const LocationsPage: React.FC = () => {
  const { locations } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-6 border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] block">
              Multi-Location Network
            </span>
            <h1 className="font-serif italic text-3xl sm:text-5xl font-bold text-white mt-1">Properties Directory</h1>
            <p className="text-xs text-white/60 mt-2 uppercase tracking-wider">
              Manage and monitor all active Restro Club locations across regions.
            </p>
          </div>

          <button
            onClick={() => navigate('/locations/add')}
            className="px-6 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Location</span>
          </button>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Flagship Property: Banur Mohali */}
          <div className="bg-[#141414] border border-white/10 overflow-hidden hover:border-white/30 transition-all group flex flex-col justify-between">
            <div>
              <div className="relative h-64 overflow-hidden bg-[#0A0A0A]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR4d7KhM34z1JMYceg4WywPBcQ5qYNaz8kkvBXXWR1uPhagfM-JJCo4OfD74E6hhBAiul3ThRda8SvYzqBIlXCmFBOCNYUHB0s-GPl3XUmgWpXTd2MiLwJccCVx0wz1_QB6D-gsb20YeQ-aHi5Qqi01UolqOvfHrErJX-g7ABGzuYFVY5G1rP3dIQ6fR-wldQNzUbu2YT3F3kdPEuPP5On6P4wK27thMWfdvg5Y5cAbVTYQucnZ0rjDQ"
                  alt="Banur Mohali"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />

                <span className="absolute top-4 right-4 bg-white text-black text-[9px] font-bold px-3 py-1 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest block mb-1">
                    Flagship Property
                  </span>
                  <h2 className="font-serif italic text-3xl font-bold text-white">Banur, Mohali</h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Today's Revenue</span>
                    <span className="font-serif italic text-xl font-bold text-white mt-0.5 block">₹1,24,500</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Active Staff</span>
                    <span className="font-serif italic text-xl font-bold text-white mt-0.5 block">42</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex gap-3">
              <button className="flex-1 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90">
                Manage
              </button>
              <button className="p-3 border border-white/20 text-white hover:bg-white/10">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Location 2: Chandigarh Central */}
          <div className="bg-[#141414] border border-white/10 overflow-hidden hover:border-white/30 transition-all group flex flex-col justify-between">
            <div>
              <div className="relative h-64 overflow-hidden bg-[#0A0A0A]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQl6qkSVQSuXrSX4UpPUjQl_xgeUhE55mj3F9-UHD_NUU7NJ__6GycwxuJPNnHRojNnPkrTXM6Ft2dpQGpFokmm2Y3IepxVH546vjDHob6bsclLwztNGbZz9UfMvtaoPPEPqFtHQEJ8Op1nmirbRYdBF6SxfZo41XBIO4wYT416ftlk6syQmxdtFBQI-R-3nIdeTbkjhEacSETV9yfJCS6ocptTyNN9wtiqtGU-jmWFJ2elZdT5tH5JA"
                  alt="Chandigarh Central"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />

                <span className="absolute top-4 right-4 bg-white text-black text-[9px] font-bold px-3 py-1 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>

                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="font-serif italic text-3xl font-bold text-white">Chandigarh Central</h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Today's Revenue</span>
                    <span className="font-serif italic text-xl font-bold text-white mt-0.5 block">₹85,200</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Active Staff</span>
                    <span className="font-serif italic text-xl font-bold text-white mt-0.5 block">28</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex gap-3">
              <button className="flex-1 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90">
                Manage
              </button>
              <button className="p-3 border border-white/20 text-white hover:bg-white/10">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Location 3: Zirakpur Heights */}
          <div className="bg-[#141414] border border-white/10 overflow-hidden hover:border-white/30 transition-all group flex flex-col justify-between opacity-80">
            <div>
              <div className="relative h-64 overflow-hidden bg-[#0A0A0A] grayscale">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoZsgZnrzOGQapA9pPMDYNhoCfVSCWek1Q2cXY5nv-4oFqgZD1PE9cp0OcYpLT04pvbboERLh9RA4p-yhRHGFxLhbZESu60zZOdwDVtMq8UOMfWrvy5Fvwclnl_dUevMhxgWuP0Fxa4ZYxz8uTWuEyd9ZO8HQpboEslFZ98M4hHGhWzmYgWAzwxrhvjfThANnqKdFvh6aKgeqaofU20FExOaDg8duU_15Fr6WlFBk5psuv7MnxmoLGDw"
                  alt="Zirakpur Heights"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />

                <span className="absolute top-4 right-4 bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[9px] font-bold px-3 py-1 uppercase tracking-widest">
                  Maintenance
                </span>

                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="font-serif italic text-3xl font-bold text-white">Zirakpur Heights</h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Today's Revenue</span>
                    <span className="font-serif italic text-xl font-bold text-white/50 mt-0.5 block">-</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Active Staff</span>
                    <span className="font-serif italic text-xl font-bold text-white mt-0.5 block">12</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex gap-3">
              <button className="flex-1 py-3 border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10">
                View Status
              </button>
              <button className="p-3 border border-white/20 text-white hover:bg-white/10">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
