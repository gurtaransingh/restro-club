'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Images, Sparkles } from 'lucide-react';

export default function GalleryPage() {
  const { activeLocation } = useApp();
  const [filter, setFilter] = useState<'ALL' | 'DINING' | 'SPORTS' | 'STAYS' | 'POOL'>('ALL');

  const galleryItems = [
    { title: 'The Grand Oak Dining Room', cat: 'DINING', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    { title: 'Signature Scallops & Caviar', cat: 'DINING', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
    { title: 'A5 Wagyu Striploin Presentation', cat: 'DINING', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Championship Pickleball Arena', cat: 'SPORTS', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80' },
    { title: 'BWF Synthetic Badminton Arena', cat: 'SPORTS', img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80' },
    { title: 'Indoor Turf Box Cricket', cat: 'SPORTS', img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80' },
    { title: 'Olympic Lap Pool & Sun Deck', cat: 'POOL', img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80' },
    { title: 'Private Poolside Cabanas', cat: 'POOL', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
    { title: 'The Luxury Master Suite', cat: 'STAYS', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
    { title: 'Top Floor Penthouse Sanctuary', cat: 'STAYS', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80' },
    { title: 'Boutique 1BHK Living Space', cat: 'STAYS', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' },
    { title: 'Sunset Cocktails & Lounge Deck', cat: 'DINING', img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80' },
  ];

  const filtered = filter === 'ALL' ? galleryItems : galleryItems.filter((g) => g.cat === filter);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24 space-y-12">
      {/* Header */}
      <section className="bg-[#EDE6D8] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8C5A3C]/15 border border-[#8C5A3C]/30 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
            <Images className="w-3.5 h-3.5" />
            <span>Visual Showcase • {activeLocation.name}</span>
          </div>
          <h1 className="font-serif italic text-4xl sm:text-5xl font-bold text-[#1E241D]">
            Resort & Club Gallery
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] max-w-xl">
            Explore authentic photographs of our fine dining salons, championship sports courts, boutique stay suites, and pool lounges.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {(['ALL', 'DINING', 'SPORTS', 'STAYS', 'POOL'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-[#8C5A3C] text-white shadow-md'
                  : 'bg-white border border-[#E5DEC9] text-[#5C554E] hover:bg-[#EDE6D8]'
              }`}
            >
              {cat === 'ALL' ? 'All Spaces' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Photos Masonry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white/95 backdrop-blur-sm border-t border-[#E5DEC9] flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#1E241D]">{item.title}</h4>
                <span className="text-[9px] font-bold px-2 py-0.5 bg-[#8C5A3C]/10 text-[#8C5A3C] uppercase tracking-wider rounded">
                  {item.cat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
