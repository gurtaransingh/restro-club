import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UtensilsCrossed, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, placeOrder, tableCodeInput, currentUser } = useApp();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSubmitted] = useState(false);

  const tax = Math.round(cartTotal * 0.1);
  const grandTotal = cartTotal + tax;

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    await placeOrder({
      tableName: tableCodeInput,
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-4">
        <div className="bg-[#141414] border border-white/10 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-amber-400" />
          </div>
          <h2 className="font-serif italic text-3xl font-bold text-white">Order Dispatched</h2>
          <p className="text-xs text-white/60 uppercase tracking-wider">
            Your table order for <span className="text-amber-400 font-bold">{tableCodeInput}</span> has been sent directly to our Michelin kitchen.
          </p>
          <div className="pt-4 flex gap-3 justify-center">
            <button
              onClick={() => navigate('/profile')}
              className="bg-amber-400 text-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-amber-300 cursor-pointer shadow-lg shadow-amber-400/20"
            >
              View Order Status
            </button>
            <button
              onClick={() => navigate('/restaurant')}
              className="border border-white/20 text-white px-6 py-3.5 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/10 cursor-pointer"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      <section className="bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Table Checkout & Dispatch</span>
          </div>
          <h1 className="font-serif italic text-4xl font-bold">Review Your Table Order</h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <p className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Table Reference</p>
              <p className="text-base font-bold text-white uppercase tracking-wider mt-0.5">{tableCodeInput}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Order Guest</p>
              <p className="text-base font-bold text-white uppercase tracking-wider mt-0.5">{currentUser.name}</p>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.menuItem.id} className="flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-white uppercase tracking-wider">{item.menuItem.name}</span>
                  <span className="text-amber-400 ml-2 font-bold">x{item.quantity}</span>
                  {item.specialNotes && (
                    <p className="text-[10px] text-white/60 italic mt-0.5">{item.specialNotes}</p>
                  )}
                </div>
                <span className="font-serif italic font-bold text-white">
                  ₹{(item.menuItem.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2 text-xs uppercase tracking-wider">
            <div className="flex justify-between text-white/50">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white/50">
              <span>Taxes & Service (10%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
              <span>Total Payable</span>
              <span className="font-serif italic text-lg text-amber-400">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={isSubmitting || cart.length === 0}
          className="w-full py-4 bg-amber-400 text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-amber-300 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
        >
          {isSubmitting ? 'Dispatching Order...' : 'Confirm & Dispatch to Kitchen'}
        </button>
      </section>
    </div>
  );
};
