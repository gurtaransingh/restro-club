'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, Users, CheckCircle2, Trophy, BedDouble, UtensilsCrossed, Waves } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    bookingModalOpen,
    bookingServiceType,
    bookingTargetItem,
    closeBookingModal,
    createBooking,
    currentUser,
    activeLocation,
  } = useApp();

  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState<string>('06:00 PM');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingSuccessRef, setBookingSuccessRef] = useState<string | null>(null);

  if (!bookingModalOpen) return null;

  const title =
    bookingTargetItem?.name ||
    bookingTargetItem?.title ||
    `${bookingServiceType.charAt(0) + bookingServiceType.slice(1).toLowerCase()} Experience`;

  const pricePerUnit =
    bookingTargetItem?.pricePerNight ||
    bookingTargetItem?.guestPrice ||
    bookingTargetItem?.memberPrice ||
    0;

  const totalAmount = pricePerUnit > 0 ? pricePerUnit * (bookingServiceType === 'STAY' ? 1 : guestsCount) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bk = await createBooking({
        type: bookingServiceType,
        title,
        targetId: bookingTargetItem?.id,
        guestName: currentUser?.name || 'Valued Member',
        guestEmail: currentUser?.email || 'guest@restroclub.com',
        date,
        timeSlot,
        guestsCount,
        totalAmount,
        notes,
      });

      setBookingSuccessRef(bk.bookingRef);
    } catch (err) {
      console.error('Booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeBookingModal} />

      <div className="relative bg-[#FAF8F3] border border-[#E5DEC9] rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 z-10 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E5DEC9] pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8C5A3C]/10 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-wider rounded-full mb-1">
              <span>{activeLocation.name}</span>
            </div>
            <h2 className="font-serif italic text-2xl font-bold text-[#1E241D]">
              {bookingSuccessRef ? 'Reservation Confirmed' : `Reserve ${title}`}
            </h2>
          </div>
          <button
            onClick={() => {
              closeBookingModal();
              setBookingSuccessRef(null);
            }}
            className="p-1 rounded-full hover:bg-[#E5DEC9]/50 text-[#5C554E] hover:text-[#1E241D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {bookingSuccessRef ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">Booking Locked & Paid!</h3>
            <p className="text-xs text-[#5C554E]">
              Your booking reference is <strong className="font-mono text-[#8C5A3C] text-sm">{bookingSuccessRef}</strong>.
              A confirmation concierge ticket has been recorded on your itinerary.
            </p>
            <button
              onClick={() => {
                closeBookingModal();
                setBookingSuccessRef(null);
              }}
              className="w-full py-3.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#8C5A3C]" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8C5A3C]" />
                  <span>Time Slot</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                >
                  <option value="06:00 AM">06:00 AM - Morning Slot</option>
                  <option value="08:00 AM">08:00 AM - Prime Morning</option>
                  <option value="10:00 AM">10:00 AM - Midday Session</option>
                  <option value="02:00 PM">02:00 PM - Afternoon Session</option>
                  <option value="04:00 PM">04:00 PM - Sunset Session</option>
                  <option value="06:00 PM">06:00 PM - Evening Prime</option>
                  <option value="08:00 PM">08:00 PM - Night Prime</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E] flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#8C5A3C]" />
                <span>Guests / Party Size</span>
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Special Requests</label>
              <textarea
                rows={2}
                placeholder="Allergy notes, equipment rental, or special requests..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
              />
            </div>

            {totalAmount > 0 && (
              <div className="p-3 bg-[#EDE6D8] border border-[#E5DEC9] rounded-2xl flex items-center justify-between text-xs">
                <span className="text-[#5C554E]">Estimated Tariff:</span>
                <span className="font-serif italic font-bold text-base text-[#8C5A3C]">
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Confirming...' : 'Confirm & Reserve Slot'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
