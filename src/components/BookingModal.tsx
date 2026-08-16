import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FacilityMaster, AccommodationRoomMaster } from '../types';
import { X, Calendar, Clock, Users, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookingModalProps {
  facility?: FacilityMaster | null;
  room?: AccommodationRoomMaster | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ facility, room, onClose }) => {
  const { createBooking, currentUser, activeLocation } = useApp();
  const navigate = useNavigate();

  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>('09:00 AM');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const timeSlots = ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'];

  const isMember = currentUser.membershipTierId === 'tier-elite' || currentUser.membershipTierId === 'tier-gold';

  let unitPrice = 0;
  if (facility) {
    unitPrice = isMember ? facility.memberPrice : facility.guestPrice;
  } else if (room) {
    unitPrice = room.pricePerNight;
  }

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await createBooking({
        type: facility ? 'SPORTS' : 'STAY',
        title: facility ? `${facility.name} (${facility.courtDetails})` : `${room?.name} Stay`,
        targetId: facility?.id || room?.id || '',
        date,
        timeSlot: selectedSlot,
        guestsCount,
        totalAmount: unitPrice,
        notes: specialNotes,
      });
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (e) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141414] text-white max-w-lg w-full overflow-hidden shadow-2xl border border-white/10 relative rounded-3xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0A0A0A] text-white p-6 relative border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 text-amber-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-2 border border-amber-400/20 rounded-full">
            <Sparkles className="w-3 h-3" />
            <span>Official Concierge</span>
          </div>
          <h3 className="font-serif italic text-2xl font-bold">
            {facility ? `Reserve ${facility.name}` : `Book ${room?.name}`}
          </h3>
          <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">
            {activeLocation.name} • Priority Confirmation
          </p>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-amber-400 text-black font-bold rounded-full flex items-center justify-center mx-auto shadow-lg shadow-amber-400/20">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="font-serif italic text-2xl font-bold text-white">Reservation Confirmed</h4>
            <p className="text-xs text-white/60 max-w-xs mx-auto uppercase tracking-wider">
              Your booking for <span className="text-amber-400 font-bold">{date}</span> at <span className="text-amber-400 font-bold">{selectedSlot}</span> has been confirmed.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  navigate('/profile');
                }}
                className="bg-amber-400 text-black px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-amber-300 transition-all cursor-pointer shadow-lg shadow-amber-400/20"
              >
                My Itinerary
              </button>
              <button
                onClick={onClose}
                className="border border-white/20 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Price Preview */}
            <div className="bg-[#0A0A0A] p-4 border border-white/10 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Rate Tier</p>
                <p className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">
                  {isMember ? 'Elite Member Pass' : 'Standard Guest Pass'}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-serif italic font-bold text-amber-400">
                  {unitPrice === 0 ? 'COMPLIMENTARY' : `₹${unitPrice.toLocaleString()}`}
                </span>
                <span className="text-[9px] text-white/40 block uppercase tracking-widest">{facility ? '/ slot' : '/ night'}</span>
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Time Slot Picker (for facilities) */}
            {facility && (
              <div>
                <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Select Preferred Slot ({facility.slotDurationMinutes} mins)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = slot === selectedSlot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-2 text-[10px] font-bold uppercase tracking-wider border rounded-xl text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-black border-amber-400 shadow-sm font-bold'
                            : 'bg-[#0A0A0A] text-white/70 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Guest Count */}
            <div>
              <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Number of Players / Guests
              </label>
              <div className="flex items-center gap-3 bg-[#0A0A0A] p-2 border border-white/20 rounded-2xl w-fit">
                <button
                  onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-black font-bold text-sm transition-colors text-white"
                >
                  -
                </button>
                <span className="text-xs font-bold w-6 text-center text-white">{guestsCount}</span>
                <button
                  onClick={() => setGuestsCount(guestsCount + 1)}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-black font-bold text-sm transition-colors text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">
                Concierge Notes / Requests
              </label>
              <textarea
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="E.g., Require 2 extra Wilson rackets..."
                className="w-full bg-[#0A0A0A] border border-white/20 p-3 rounded-2xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400 h-20 resize-none"
              />
            </div>

            {/* Lock Notice */}
            <div className="flex items-center gap-2 text-[10px] text-white/60 bg-white/5 p-3 rounded-2xl border border-white/10 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Priority lock guaranteed for {currentUser.name}.</span>
            </div>

            {/* Submit CTA */}
            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
            >
              {isSubmitting ? (
                <span>Confirming Reservation...</span>
              ) : (
                <span>Lock Reservation • {unitPrice === 0 ? 'FREE' : `₹${unitPrice.toLocaleString()}`}</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
