import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ArrowRight, UtensilsCrossed, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, cartTotal, tableCodeInput, setTableCodeInput } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const tax = Math.round(cartTotal * 0.1);
  const grandTotal = cartTotal + tax;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#141414] text-white h-full shadow-2xl flex flex-col justify-between border-l border-white/10 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 bg-[#0A0A0A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif italic font-bold text-lg text-white">Your Dining Order</h3>
              <p className="text-[9px] uppercase tracking-widest text-amber-400 font-bold">Live Table Service</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Table Code Banner */}
        <div className="bg-white/5 px-5 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Table Reference:</span>
          </div>
          <input
            type="text"
            value={tableCodeInput}
            onChange={(e) => setTableCodeInput(e.target.value)}
            className="bg-[#0A0A0A] border border-white/20 px-3 py-1 text-xs font-bold text-amber-400 w-28 text-center uppercase tracking-widest focus:outline-none focus:border-amber-400 rounded-full"
          />
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <UtensilsCrossed className="w-12 h-12 text-amber-400/30 mx-auto" />
              <p className="font-serif italic text-lg font-bold text-white/60">Your tray is empty</p>
              <p className="text-[10px] text-white/40 max-w-xs mx-auto uppercase tracking-wider">
                Explore our signature scallops, wagyu steaks and craft cellar selections.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.menuItem.id}
                className="bg-[#0A0A0A] p-3.5 border border-white/10 rounded-2xl flex items-start gap-3 shadow-md"
              >
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-16 h-16 object-cover shrink-0 border border-white/10 rounded-xl"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider truncate">{item.menuItem.name}</h4>
                    <button
                      onClick={() => removeFromCart(item.menuItem.id)}
                      className="text-white/40 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs font-serif italic font-bold text-amber-400 mt-0.5">
                    ₹{(item.menuItem.price * item.quantity).toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 border border-white/20 p-0.5 bg-[#141414] rounded-full">
                      <button
                        onClick={() => updateCartQuantity(item.menuItem.id, -1)}
                        className="w-6 h-6 rounded-full hover:bg-amber-400 hover:text-black text-white flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.menuItem.id, 1)}
                        className="w-6 h-6 rounded-full hover:bg-amber-400 hover:text-black text-white flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {item.specialNotes && (
                      <span className="text-[9px] text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full truncate max-w-[120px] uppercase tracking-wider border border-amber-400/20">
                        {item.specialNotes}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#0A0A0A] border-t border-white/10 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-white/50 uppercase tracking-widest text-[10px]">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/50 uppercase tracking-widest text-[10px]">
                <span>Taxes & Service Charge (10%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-white text-sm pt-2 border-t border-white/10 uppercase tracking-wider">
                <span>Total Due</span>
                <span className="text-amber-400 font-serif italic text-lg">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={clearCart}
                className="px-4 py-3 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                className="flex-1 py-3 bg-amber-400 text-black hover:bg-amber-300 text-xs font-bold uppercase tracking-widest rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-400/20"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
