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
  Info,
} from 'lucide-react';
import { MenuItemMaster } from '../../lib/types';

export default function RestaurantPage() {
  const { menuCategories, menuItems, addToCart, activeLocation, tables, openBookingModal, cart, setIsCartOpen } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDiet, setSelectedDiet] = useState<string>('ALL');
  const [selectedTable, setSelectedTable] = useState<string>('tbl-1');
  const [noteItem, setNoteItem] = useState<MenuItemMaster | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  const currentTable = tables.find((t) => t.id === selectedTable) || tables[0];

  const filteredItems = menuItems.filter((item) => {
    const matchCat = selectedCategory === 'ALL' || item.categoryId === selectedCategory;
    const matchDiet = selectedDiet === 'ALL' || item.dietaryType === selectedDiet;
    return matchCat && matchDiet;
  });

  const cartCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  const handleAddWithNote = () => {
    if (noteItem) {
      addToCart(noteItem, 1, noteText);
      setNoteItem(null);
      setNoteText('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-28">
      {/* Top Ambient Banner */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-bold uppercase tracking-[0.25em] rounded-full">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Michelin Inspired Gastronomy • {activeLocation.name}</span>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-6xl font-bold tracking-tight text-white">
              The Grand Dining Room & Bar
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl font-light leading-relaxed">
              Curated by Executive Chef Julian Vance. Order directly to your table with instant Kitchen KDS dispatch, or reserve a private dining tasting salon.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => openBookingModal('DINING')}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-xl shadow-amber-400/20 cursor-pointer"
            >
              Reserve Dining Table
            </button>
          </div>
        </div>
      </section>

      {/* Active Table QR Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#141414] border border-amber-400/30 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/40 text-amber-400 flex items-center justify-center shrink-0">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  Contactless Table QR Service Active
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <h3 className="font-serif italic text-xl font-bold text-white mt-0.5">
                Table {currentTable?.tableNumber || '04'} ({currentTable?.areaZone || 'Main Dining'})
              </h3>
              <p className="text-[11px] text-white/50">
                Scanning Token: <strong className="font-mono text-amber-400">{currentTable?.qrCodeToken || 'RC-TBL-04'}</strong> • Orders transmit straight to chef live queue.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-white/60">Switch Table:</label>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="bg-[#0A0A0A] border border-white/20 text-white text-xs font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {tables.map((t) => (
                <option key={t.id} value={t.id}>
                  Table {t.tableNumber} ({t.areaZone})
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Menu Filters & Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'ALL'
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                  : 'bg-[#141414] border border-white/15 text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              All Creations ({menuItems.length})
            </button>
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                    : 'bg-[#141414] border border-white/15 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="bg-[#141414] border border-white/20 px-3.5 py-2 text-xs font-bold text-white uppercase tracking-wider focus:outline-none focus:border-amber-400 rounded-full"
            >
              <option value="ALL">All Diets</option>
              <option value="VEGETARIAN">Vegetarian</option>
              <option value="NON_VEGETARIAN">Non-Veg</option>
              <option value="VEGAN">Vegan</option>
            </select>
          </div>
        </div>
      </section>

      {/* Culinary Dishes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const inCart = cart.find((c) => c.itemId === item.id);
            return (
              <div
                key={item.id}
                className="bg-[#141414] border border-white/10 rounded-3xl overflow-hidden hover:border-amber-400/40 transition-all group flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-[#0A0A0A]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />

                    {item.isSignature && (
                      <span className="absolute top-3 left-3 bg-amber-400 text-black text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3 text-black" />
                        <span>Chef Signature</span>
                      </span>
                    )}

                    <span className="absolute bottom-3 right-3 bg-[#0A0A0A] border border-amber-400/30 text-amber-400 font-serif italic font-bold text-base px-3.5 py-1 rounded-full shadow-lg">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif italic font-bold text-xl text-white">{item.name}</h3>
                      <span className="text-[9px] font-bold px-2.5 py-0.5 border border-white/20 bg-white/5 text-amber-400 rounded-full uppercase tracking-widest">
                        {item.dietaryType.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">{item.description}</p>

                    <div className="flex items-center gap-3 pt-2 text-[10px] uppercase tracking-widest text-white/40">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {item.prepTimeMinutes} mins
                      </span>
                      <span>•</span>
                      <span>{item.calories} kcal</span>
                      {item.allergens && item.allergens.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-white/60 truncate max-w-[120px]">{item.allergens.join(', ')}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Add to Order Controls */}
                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <button
                      onClick={() => setNoteItem(item)}
                      className="text-[10px] font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 underline cursor-pointer"
                    >
                      + Chef Note
                    </button>

                    {inCart ? (
                      <div className="flex items-center gap-3 bg-amber-400 text-black px-3.5 py-1.5 rounded-full font-bold">
                        <span className="text-[10px] font-bold uppercase tracking-wider">In Order ({inCart.quantity})</span>
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="w-5 h-5 bg-black text-amber-400 rounded-full flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-[10px] font-bold uppercase tracking-widest rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-400/20"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Order</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Floating Order Tray Floating CTA */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-30 animate-in slide-in-from-bottom duration-200">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-amber-400 text-black px-6 py-3.5 rounded-full shadow-2xl hover:bg-amber-300 transition-all flex items-center gap-3 border border-amber-300 cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-black" />
              <span className="absolute -top-1 -right-1 bg-black text-amber-400 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">View Tray Order</span>
          </button>
        </div>
      )}

      {/* Special Note Modal */}
      {noteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141414] border border-white/10 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl text-white">
            <h3 className="font-serif italic font-bold text-lg text-white">
              Special Preparation for {noteItem.name}
            </h3>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="E.g., Medium rare, extra truffle, no garlic..."
              className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded-2xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400 h-24 resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setNoteItem(null)}
                className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWithNote}
                className="px-5 py-2 bg-amber-400 text-black text-[10px] font-bold uppercase tracking-widest rounded-full cursor-pointer"
              >
                Add Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
