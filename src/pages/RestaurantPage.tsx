import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItemMaster } from '../types';
import {
  Search,
  Filter,
  Plus,
  Minus,
  Sparkles,
  UtensilsCrossed,
  Check,
  QrCode,
  Flame,
  Clock,
  Heart,
  ShoppingBag,
} from 'lucide-react';

interface RestaurantPageProps {
  onOpenCart: () => void;
}

export const RestaurantPage: React.FC<RestaurantPageProps> = ({ onOpenCart }) => {
  const { menuCategories, menuItems, addToCart, cart, tableCodeInput, setTableCodeInput } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('ALL');
  const [noteItem, setNoteItem] = useState<MenuItemMaster | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  const cartCount = cart.reduce((acc, c) => acc + c.quantity, 0);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'ALL' || item.categoryId === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDietary = dietaryFilter === 'ALL' || item.dietaryType === dietaryFilter;
    return matchesCategory && matchesSearch && matchesDietary;
  });

  const handleAddWithNote = () => {
    if (noteItem) {
      addToCart(noteItem, 1, noteText);
      setNoteItem(null);
      setNoteText('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      
      {/* Restaurant Header */}
      <section className="bg-[#0A0A0A] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-2 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Michelin-Style Dining</span>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-6xl font-bold">The Grand Dining Room</h1>
            <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-xl uppercase tracking-wider">
              Order directly to your table or private cabana. Scan table QR or enter your table code below.
            </p>
          </div>

          {/* QR Table Code Banner */}
          <div className="bg-[#141414] p-4 border border-white/10 rounded-2xl flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 bg-amber-400 text-black rounded-xl flex items-center justify-center shrink-0 font-bold shadow-md shadow-amber-400/20">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Active Table Reference</p>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={tableCodeInput}
                  onChange={(e) => setTableCodeInput(e.target.value)}
                  placeholder="E.g., Table 12"
                  className="bg-[#0A0A0A] text-white font-bold text-xs px-3.5 py-1.5 border border-white/20 focus:outline-none focus:border-amber-400 w-32 uppercase tracking-widest rounded-full"
                />
                <span className="text-[9px] text-amber-400 font-bold uppercase tracking-widest bg-amber-400/10 px-2 py-1 rounded-full border border-amber-400/20">Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-[#141414] p-4 border border-white/10 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border rounded-full cursor-pointer ${
                activeCategory === 'ALL'
                  ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20'
                  : 'bg-[#0A0A0A] text-white/60 border-white/10 hover:border-white/30'
              }`}
            >
              All Categories
            </button>
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border rounded-full cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20'
                    : 'bg-[#0A0A0A] text-white/60 border-white/10 hover:border-white/30'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Bar & Dietary Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu..."
                className="w-full bg-[#0A0A0A] border border-white/20 pl-9 pr-4 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-400 rounded-full"
              />
            </div>

            <select
              value={dietaryFilter}
              onChange={(e) => setDietaryFilter(e.target.value)}
              className="bg-[#0A0A0A] border border-white/20 px-3.5 py-2 text-xs font-bold text-white uppercase tracking-wider focus:outline-none focus:border-amber-400 rounded-full"
            >
              <option value="ALL">All Diets</option>
              <option value="VEGETARIAN">Vegetarian</option>
              <option value="VEGAN">Vegan</option>
              <option value="NON_VEGETARIAN">Non-Veg</option>
              <option value="GLUTEN_FREE">Gluten Free</option>
            </select>
          </div>

        </div>
      </section>

      {/* Culinary Dishes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const inCart = cart.find((c) => c.menuItem.id === item.id);
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

                    {/* Signature Badge */}
                    {item.isSignature && (
                      <span className="absolute top-3 left-3 bg-amber-400 text-black text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3 text-black" />
                        <span>Chef Signature</span>
                      </span>
                    )}

                    {/* Price Badge */}
                    <span className="absolute bottom-3 right-3 bg-[#0A0A0A] border border-amber-400/30 text-amber-400 font-serif italic font-bold text-base px-3.5 py-1 rounded-full shadow-lg">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif italic font-bold text-xl text-white">
                        {item.name}
                      </h3>
                      <span className="text-[9px] font-bold px-2.5 py-0.5 border border-white/20 bg-white/5 text-amber-400 rounded-full uppercase tracking-widest">
                        {item.dietaryType.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-3 pt-2 text-[10px] uppercase tracking-widest text-white/40">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {item.prepTimeMinutes} mins
                      </span>
                      <span>•</span>
                      <span>{item.calories} kcal</span>
                      {item.allergens.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-white/60 truncate max-w-[120px]">
                            {item.allergens.join(', ')}
                          </span>
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
                      + Note
                    </button>

                    {inCart ? (
                      <div className="flex items-center gap-3 bg-amber-400 text-black px-3.5 py-1.5 rounded-full font-bold">
                        <span className="text-[10px] font-bold uppercase tracking-wider">In Order ({inCart.quantity})</span>
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="w-5 h-5 bg-black text-amber-400 rounded-full flex items-center justify-center font-bold text-xs"
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
                        <span>Add Order</span>
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
            onClick={onOpenCart}
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
              placeholder="E.g., Medium rare, extra sauce..."
              className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded-2xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400 h-24 resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setNoteItem(null)}
                className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWithNote}
                className="px-5 py-2 bg-amber-400 text-black text-[10px] font-bold uppercase tracking-widest rounded-full"
              >
                Add Notes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
