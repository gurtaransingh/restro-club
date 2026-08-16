import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, CheckCircle2, Utensils, AlertTriangle, Sparkles, ChefHat } from 'lucide-react';

export const KitchenPage: React.FC = () => {
  const { orders, updateOrderStatus, activeLocation } = useApp();

  const handleNextStatus = (orderId: string, currentStatus: string) => {
    if (currentStatus === 'RECEIVED') updateOrderStatus(orderId, 'PREPARING');
    else if (currentStatus === 'PREPARING') updateOrderStatus(orderId, 'READY');
    else if (currentStatus === 'READY') updateOrderStatus(orderId, 'SERVED');
  };

  const locationOrders = orders.filter((o) => o.locationId === activeLocation?.id || !o.locationId);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24">
      {/* Header */}
      <section className="bg-[#EDE6D8] py-8 px-4 sm:px-6 lg:px-8 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3E4A38]/15 border border-[#3E4A38]/30 text-[#3E4A38] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-2">
              <ChefHat className="w-3.5 h-3.5" />
              <span>Live Kitchen Display System (KDS)</span>
            </div>
            <h1 className="font-serif italic text-3xl font-bold text-[#1E241D]">
              Chef Station Tickets • {activeLocation?.name}
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E5DEC9] shadow-sm">
            <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800">
              Live Station Active
            </span>
          </div>
        </div>
      </section>

      {/* Live Orders Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {locationOrders.length === 0 ? (
          <div className="p-12 text-center bg-white border border-[#E5DEC9] rounded-3xl text-[#5C554E] uppercase tracking-widest text-xs">
            No pending tickets. Kitchen station clear.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationOrders.map((ord) => (
              <div
                key={ord.id}
                className={`bg-white border rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between ${
                  ord.hasAllergy ? 'border-red-400 bg-red-50/20' : 'border-[#E5DEC9]'
                }`}
              >
                <div className="space-y-4">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between border-b border-[#E5DEC9] pb-3">
                    <div>
                      <span className="text-[10px] font-bold font-mono text-[#8C5A3C] uppercase tracking-widest">
                        Ticket #{ord.orderNumber}
                      </span>
                      <h3 className="font-serif italic font-bold text-xl text-[#1E241D] mt-0.5">
                        {ord.tableName || 'Table Service'}
                      </h3>
                      <p className="text-[10px] text-[#5C554E]">Guest: {ord.guestName} ({ord.guestCount} Guests)</p>
                    </div>

                    <span
                      className={`text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-full border ${
                        ord.status === 'RECEIVED'
                          ? 'bg-amber-50 border-amber-300 text-amber-800'
                          : ord.status === 'PREPARING'
                          ? 'bg-blue-50 border-blue-300 text-blue-800 animate-pulse'
                          : ord.status === 'READY'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-gray-100 border-gray-300 text-gray-700'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>

                  {/* Allergy Alert Banner */}
                  {ord.hasAllergy && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-red-700 text-xs">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-600" />
                      <div>
                        <strong className="block text-[10px] uppercase tracking-wider">Allergy Alert</strong>
                        <span>{ord.allergyNotes || 'Special dietary attention needed'}</span>
                      </div>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="space-y-2.5">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="p-3 bg-[#FAF8F3] border border-[#E5DEC9] rounded-2xl">
                        <div className="flex justify-between items-center text-xs font-bold text-[#1E241D]">
                          <span>{item.itemName}</span>
                          <span className="px-2 py-0.5 bg-[#8C5A3C] text-white rounded-lg text-[10px]">
                            x{item.quantity}
                          </span>
                        </div>
                        {item.notes && (
                          <p className="text-[10px] text-[#8C5A3C] font-semibold mt-1">Chef Note: {item.notes}</p>
                        )}
                        {item.allergyNotice && (
                          <p className="text-[10px] text-red-600 font-bold mt-0.5">⚠️ {item.allergyNotice}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Action Buttons */}
                <div className="pt-4 border-t border-[#E5DEC9] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[#5C554E] text-[10px]">
                    <Clock className="w-3.5 h-3.5 text-[#8C5A3C]" />
                    <span>Wait: {ord.waitMinutes}m</span>
                  </div>

                  {ord.status !== 'SERVED' && ord.status !== 'COMPLETED' && (
                    <button
                      onClick={() => handleNextStatus(ord.id, ord.status)}
                      className="px-4 py-2 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {ord.status === 'RECEIVED'
                          ? 'Start Prep →'
                          : ord.status === 'PREPARING'
                          ? 'Mark Ready →'
                          : 'Mark Served'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
