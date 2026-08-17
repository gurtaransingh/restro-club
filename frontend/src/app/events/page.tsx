'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarDays, Users, Sparkles, CheckCircle2, Send, PhoneCall } from 'lucide-react';

export default function EventsPage() {
  const { activeLocation, createEventEnquiry } = useApp();
  const [eventType, setEventType] = useState<string>('Wedding & Reception');
  const [estimatedGuests, setEstimatedGuests] = useState<number>(150);
  const [preferredDate, setPreferredDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [contactName, setContactName] = useState<string>('');
  const [specialRequirements, setSpecialRequirements] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName) return;
    await createEventEnquiry({
      eventType,
      estimatedGuests,
      preferredDate,
      contactName,
      specialRequirements,
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24 space-y-12">
      {/* Header */}
      <section className="bg-[#EDE6D8] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8C5A3C]/15 border border-[#8C5A3C]/30 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Grand Banquets & Lawns • {activeLocation.name}</span>
          </div>
          <h1 className="font-serif italic text-4xl sm:text-5xl font-bold text-[#1E241D]">
            Banquets, Weddings & Corporate Summits
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] max-w-xl">
            Lush manicured open lawns, private banquet halls, Michelin custom catering, and valet parking for up to 1,000 guests.
          </p>
        </div>
      </section>

      {/* Inquiry Form & Venue Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C5A3C]">Grand Ballroom</span>
              <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">Royal Banquet Hall</h3>
              <p className="text-xs text-[#5C554E]">Air-conditioned ballroom with chandeliers, stage lighting and private green rooms.</p>
              <span className="text-xs font-bold text-[#3E4A38] block pt-2">Capacity: 400 Guests</span>
            </div>

            <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C5A3C]">Open Air</span>
              <h3 className="font-serif italic text-xl font-bold text-[#1E241D]">The Emerald Lawn</h3>
              <p className="text-xs text-[#5C554E]">Sprawling lawn with fairy light canopies, live BBQ stations and poolside views.</p>
              <span className="text-xs font-bold text-[#3E4A38] block pt-2">Capacity: 1,000 Guests</span>
            </div>
          </div>

          <div className="bg-[#EDE6D8] border border-[#E5DEC9] rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#8C5A3C] text-white flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C5A3C]">Direct Concierge</span>
              <h4 className="font-serif italic text-lg font-bold text-[#1E241D]">+91 (800) 555-0199</h4>
              <p className="text-xs text-[#5C554E]">Speak directly with Banquet Lead Priya Sharma for custom dates.</p>
            </div>
          </div>
        </div>

        {/* Inquiry Box */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            <div>
              <h3 className="font-serif italic text-2xl font-bold text-[#1E241D]">Request Event Quotation</h3>
              <p className="text-xs text-[#5C554E]">Receive a bespoke event proposal and menu plan within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif italic text-xl font-bold text-[#1E241D]">Enquiry Received!</h4>
                <p className="text-xs text-[#5C554E]">Our Banquet Concierge will call you at the earliest to discuss details.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-[#FAF8F3] border border-[#E5DEC9] text-xs font-bold uppercase rounded-xl hover:bg-[#EDE6D8]"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                  >
                    <option value="Wedding & Reception">Wedding & Reception</option>
                    <option value="Corporate Summit & Gala">Corporate Summit & Gala</option>
                    <option value="Cocktail & Mixer">Cocktail & Mixer</option>
                    <option value="Private Birthday / Anniversary">Private Birthday / Anniversary</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Estimated Guests</label>
                    <input
                      type="number"
                      min="20"
                      max="2000"
                      value={estimatedGuests}
                      onChange={(e) => setEstimatedGuests(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Preferred Date</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Contact Name & Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S. Gurtaran Singh (+91 98000 00000)"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Special Requests</label>
                  <textarea
                    rows={2}
                    placeholder="Catering preferences, decor themes, AV setups..."
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Event Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
