import React, { useState } from 'react';
import { Images, Filter, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GalleryPage: React.FC = () => {
  const { activeLocation } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const galleryItems = [
    {
      title: 'Grand Entrance & Portico',
      category: 'ARCHITECTURE',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Chef Table Dining Room',
      category: 'DINING',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Illuminated Pickleball Court',
      category: 'SPORTS',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Boutique Poolside Suite',
      category: 'STAYS',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Olympic Swimming Pool deck',
      category: 'POOL',
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Grand Ballroom Event Setup',
      category: 'EVENTS',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Artisanal Cocktail Lounge',
      category: 'DINING',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Box Cricket Arena',
      category: 'SPORTS',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filters = ['ALL', 'DINING', 'SPORTS', 'POOL', 'STAYS', 'EVENTS', 'ARCHITECTURE'];

  const filteredItems =
    selectedFilter === 'ALL' ? galleryItems : galleryItems.filter((i) => i.category === selectedFilter);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-10 pb-8 border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-2 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Visual Exhibition</span>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-6xl font-bold text-white mt-1">
              Restro Club Gallery
            </h1>
            <p className="text-xs text-white/60 mt-2 uppercase tracking-wider">
              A visual walkthrough of our luxury facilities across {activeLocation.name}.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#141414] p-2 border border-white/10 rounded-2xl shadow-xl">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all rounded-full cursor-pointer ${
                  selectedFilter === f
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-[#141414] border border-white/10 rounded-3xl overflow-hidden h-72 flex flex-col justify-end p-5 transition-all duration-300 hover:border-amber-400/40 shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="relative z-10 space-y-1">
                <span className="text-[8px] font-bold text-amber-400 uppercase tracking-[0.2em] px-2.5 py-1 bg-black/60 border border-amber-400/30 rounded-full inline-block backdrop-blur-md">
                  {item.category}
                </span>
                <h3 className="font-serif italic text-lg font-bold text-white leading-tight mt-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
