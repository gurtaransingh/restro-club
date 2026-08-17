'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, clearCart, createOrder, tables, currentUser } = useApp();
  const [selectedTable, setSelectedTable] = useState<string>('tbl-1');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successOrderNum, setSuccessOrderNum] = useState<string | null>(null);

  const subtotal = cart.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
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

      setSuccessOrderNum(ord.orderNumber);
      clearCart();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successOrderNum) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white border border-[#E5DEC9] rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="font-serif italic text-2xl font-bold text-[#1E241D]">Dining Order Placed!</h2>
          <p className="text-xs text-[#5C554E]">
            Ticket <strong className="font-mono text-[#8C5A3C] text-sm">#{successOrderNum}</strong> has been transmitted to Chef Julian's kitchen station.
          </p>
          <div className="pt-4 flex flex-col gap-2">
            <Link
              href="/kitchen"
              className="py-3.5 bg-[#3E4A38] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#2F392B] transition-all"
            >
              View Live Kitchen Display (KDS)
            </Link>
            <Link
              href="/restaurant"
              className="py-3 bg-[#FAF8F3] border border-[#E5DEC9] text-[#1E241D] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EDE6D8] transition-all"
            >
              Return to Restaurant
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24 space-y-10">
      <section className="bg-[#EDE6D8] py-10 px-4 sm:px-6 lg:px-8 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif italic text-3xl sm:text-4xl font-bold text-[#1E241D]">Order Checkout & Bill Settlement</h1>
          <p className="text-xs text-[#5C554E]">Confirm table zone and send culinary ticket to the kitchen station.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {cart.length === 0 ? (
          <div className="bg-white border border-[#E5DEC9] rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <ShoppingBag className="w-12 h-12 text-[#8C5A3C]/40 mx-auto" />
            <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">Your order cart is empty</h3>
            <p className="text-xs text-[#5C554E]">Explore our Michelin fine dining menu to select dishes.</p>
            <Link
              href="/restaurant"
              className="inline-block px-6 py-3 bg-[#8C5A3C] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md"
            >
              Browse Dining Menu
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-6">
              <h3 className="font-serif italic text-xl font-bold text-[#1E241D] border-b border-[#E5DEC9] pb-3">
                Dining Location & Party
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Table Number</label>
                  <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                  >
                    {tables.map((t) => (
                      <option key={t.id} value={t.id}>
                        Table {t.tableNumber} ({t.areaZone})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Party Size</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E5DEC9]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C554E]">Selected Dishes ({cart.length})</h4>
                {cart.map((item) => (
                  <div key={item.itemId} className="flex justify-between items-center text-xs py-2 border-b border-[#FAF8F3]">
                    <div>
                      <span className="font-bold text-[#1E241D]">{item.itemName}</span>
                      <span className="text-[#5C554E] ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-semibold text-[#8C5A3C]">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 bg-[#EDE6D8] border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-serif italic text-xl font-bold text-[#1E241D] border-b border-[#E5DEC9] pb-3">
                  Summary & Bill
                </h3>
                <div className="space-y-2 text-xs text-[#5C554E]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1E241D]">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="font-semibold text-[#1E241D]">₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-[#E5DEC9] flex justify-between text-base font-bold text-[#1E241D]">
                    <span>Total Amount</span>
                    <span className="text-[#8C5A3C] font-mono">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Placing Order...' : 'Confirm & Place Ticket'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
