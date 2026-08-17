'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UtensilsCrossed,
  Sparkles,
  Plus,
  QrCode,
  CheckCircle2,
  Clock,
  Flame,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react';

export default function RestaurantPage() {
  const { menuCategories, menuItems, addToCart, activeLocation, tables, openBookingModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeTableQr, setActiveTableQr] = useState<string | null>(null);

  const filteredItems =
    selectedCategory === 'ALL'
      ? menuItems
      : menuItems.filter((it) => it.categoryId === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24 space-y-12">
      {/* Hero Header */}
      <section className="bg-[#EDE6D8] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8C5A3C]/15 border border-[#8C5A3C]/30 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Michelin Inspired Gastronomy • {activeLocation.name}</span>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-5xl font-bold text-[#1E241D]">
              The Grand Dining Room & Bar
            </h1>
            <p className="text-xs sm:text-sm text-[#5C554E] max-w-xl">
              Curated by Executive Chef Julian Vance. Scan your table QR code or order directly to your seat with instant kitchen KDS dispatch.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => openBookingModal('DINING')}
              className="px-6 py-3.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
            >
              Reserve Fine Dining Table
            </button>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-[#8C5A3C] text-white shadow-md'
                : 'bg-white border border-[#E5DEC9] text-[#5C554E] hover:bg-[#EDE6D8]'
            }`}
          >
            All Creations ({menuItems.length})
          </button>
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#8C5A3C] text-white shadow-md'
                  : 'bg-white border border-[#E5DEC9] text-[#5C554E] hover:bg-[#EDE6D8]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {item.isSignature && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-[#8C5A3C] text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Signature</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono font-bold rounded-lg">
                    ₹{item.price.toLocaleString()}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">{item.name}</h3>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        item.dietaryType === 'VEGETARIAN'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.dietaryType === 'VEGETARIAN' ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>

                  <p className="text-xs text-[#5C554E] line-clamp-2 leading-relaxed">{item.description}</p>

                  <div className="flex items-center gap-3 text-[10px] text-[#5C554E] pt-2 border-t border-[#E5DEC9]/50">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8C5A3C]" />
                      <span>{item.prepTimeMinutes} mins</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[#8C5A3C]" />
                      <span>{item.calories} kcal</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => addToCart(item)}
                  className="w-full py-3 bg-[#FAF8F3] hover:bg-[#8C5A3C] border border-[#E5DEC9] hover:border-[#8C5A3C] text-[#1E241D] hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Order Ticket</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
