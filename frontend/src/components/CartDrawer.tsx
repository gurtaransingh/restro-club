'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateCartQty, clearCart, isCartOpen, setIsCartOpen, createOrder, tables, currentUser } = useApp();
  const [selectedTable, setSelectedTable] = useState<string>('tbl-1');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + tax;

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);
    const tblObj = tables.find((t) => t.id === selectedTable);

    try {
      const ord = await createOrder({
        tableId: selectedTable,
        tableName: tblObj ? `Table ${tblObj.tableNumber} (${tblObj.areaZone})` : 'Dining Table',
        guestName: currentUser?.name || 'Valued Guest',
        guestCount,
        items: cart.map((c) => ({
          itemId: c.itemId,
          itemName: c.itemName,
          quantity: c.quantity,
          notes: c.notes,
          allergyNotice: c.allergyNotice,
        })),
        subtotal,
        tax,
        discount: 0,
        total,
      });

      setOrderSuccess(ord.orderNumber);
      clearCart();
    } catch (e) {
      console.error('Order creation error:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F3] border-l border-[#E5DEC9] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#E5DEC9] bg-[#EDE6D8] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#8C5A3C]" />
              <h2 className="font-serif italic text-xl font-bold text-[#1E241D]">Your Dining Bill & Order</h2>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setOrderSuccess(null);
              }}
              className="p-1.5 rounded-full hover:bg-white/50 text-[#5C554E] hover:text-[#1E241D] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {orderSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif italic text-2xl font-bold text-[#1E241D]">Ticket Placed with Kitchen!</h3>
                <p className="text-xs text-[#5C554E] max-w-xs mx-auto">
                  Order Ticket <strong className="font-mono text-[#8C5A3C]">#{orderSuccess}</strong> is sent directly to Chef Julian's live KDS station.
                </p>
                <div className="pt-4 flex flex-col gap-2">
                  <Link
                    href="/kitchen"
                    onClick={() => {
                      setIsCartOpen(false);
                      setOrderSuccess(null);
                    }}
                    className="py-3 bg-[#3E4A38] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#2F392B] transition-all"
                  >
                    View Live Kitchen Display (KDS)
                  </Link>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setOrderSuccess(null);
                    }}
                    className="py-3 bg-white border border-[#E5DEC9] text-[#1E241D] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#F2ECE1] transition-all"
                  >
                    Close Drawer
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 space-y-3 text-[#5C554E]">
                <ShoppingBag className="w-12 h-12 text-[#8C5A3C]/40 mx-auto" />
                <p className="text-sm font-semibold">Your dining ticket is empty.</p>
                <p className="text-xs">Browse our signature Michelin recipes to add dishes.</p>
                <Link
                  href="/restaurant"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block mt-4 px-5 py-2.5 bg-[#8C5A3C] text-white text-xs font-bold uppercase tracking-wider rounded-xl"
                >
                  Explore Dining Menu
                </Link>
              </div>
            ) : (
              <>
                {/* Table Picker */}
                <div className="bg-white border border-[#E5DEC9] p-4 rounded-2xl space-y-3 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E] block">
                    Table & Service Zone
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-[#5C554E] block mb-1">Select QR Table</label>
                      <select
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                      >
                        {tables.map((t) => (
                          <option key={t.id} value={t.id}>
                            Table {t.tableNumber} ({t.areaZone})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-[#5C554E] block mb-1">Party Size</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E] block">
                    Selected Dishes ({cart.length})
                  </span>
                  {cart.map((item) => (
                    <div
                      key={item.itemId}
                      className="p-3.5 bg-white border border-[#E5DEC9] rounded-2xl shadow-sm flex items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-[#1E241D]">{item.itemName}</h4>
                        <span className="text-xs text-[#8C5A3C] font-semibold">₹{item.price.toLocaleString()}</span>
                        {item.allergyNotice && (
                          <p className="text-[10px] text-red-600 font-bold mt-0.5">⚠️ {item.allergyNotice}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-[#FAF8F3] border border-[#E5DEC9] rounded-lg">
                          <button
                            onClick={() => updateCartQty(item.itemId, -1)}
                            className="p-1 text-[#5C554E] hover:text-[#1E241D]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#1E241D]">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQty(item.itemId, 1)}
                            className="p-1 text-[#5C554E] hover:text-[#1E241D]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.itemId)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer Bill & Actions */}
          {!orderSuccess && cart.length > 0 && (
            <div className="p-6 border-t border-[#E5DEC9] bg-[#EDE6D8] space-y-4">
              <div className="space-y-1.5 text-xs text-[#5C554E]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1E241D]">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & GST (5%)</span>
                  <span className="font-semibold text-[#1E241D]">₹{tax.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-[#E5DEC9] flex justify-between text-sm font-bold text-[#1E241D]">
                  <span>Total Amount</span>
                  <span className="text-[#8C5A3C] font-mono text-base">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Placing Order...' : 'Send Order to Kitchen'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
