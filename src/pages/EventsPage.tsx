import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Calendar, Users, Send, CheckCircle2, Phone, Mail } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { activeLocation, submitEventEnquiry } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    eventType: 'Grand Wedding Reception',
    estimatedGuests: '150 - 300 Guests',
    preferredDate: '',
    contactName: '',
    phone: '',
    email: '',
    specialRequirements: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEventEnquiry({
      eventType: formData.eventType,
      estimatedGuests: formData.estimatedGuests,
      preferredDate: formData.preferredDate || new Date().toISOString().split('T')[0],
      contactName: formData.contactName || 'Valued Guest',
      specialRequirements: formData.specialRequirements,
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      {/* Hero Header */}
      <section className="bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-2 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Bespoke Banquets & Gatherings</span>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-6xl font-bold">Social & Corporate Events</h1>
            <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-xl uppercase tracking-wider">
              Host grand celebrations, corporate summits, weddings & poolside galas at {activeLocation.name}.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Form */}
          <div className="bg-[#141414] border border-white/10 rounded-3xl p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-[9px] font-bold text-amber-400 uppercase tracking-[0.2em] block">Bespoke Concierge</span>
              <h2 className="font-serif italic text-3xl font-bold text-white mt-1">Submit Event Enquiry</h2>
              <p className="text-xs text-white/60 mt-1 uppercase tracking-wider">
                Our master event directors will curate a custom proposal within 2 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-[#0A0A0A] border border-white/10 rounded-2xl">
                <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="font-serif italic text-2xl font-bold text-white">Enquiry Received</h3>
                <p className="text-xs text-white/60 uppercase tracking-wider">
                  Our Senior Event Director for <span className="text-amber-400 font-bold">{activeLocation.name}</span> will contact you directly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-amber-400 text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-amber-300 cursor-pointer shadow-md shadow-amber-400/20"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1.5">
                    Event Type
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/20 text-white px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-amber-400 rounded-full"
                  >
                    <option value="Grand Wedding Reception">Grand Wedding Reception</option>
                    <option value="Corporate Executive Summit">Corporate Executive Summit</option>
                    <option value="VIP Cocktail & Poolside Gala">VIP Cocktail & Poolside Gala</option>
                    <option value="Private Dining Experience">Private Dining Experience</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1.5">
                      Estimated Guests
                    </label>
                    <input
                      type="text"
                      value={formData.estimatedGuests}
                      onChange={(e) => setFormData({ ...formData, estimatedGuests: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/20 text-white px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-amber-400 rounded-full"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/20 text-white px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-amber-400 rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/20 text-white px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-amber-400 rounded-full"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1.5">
                    Special Requirements / Theme Notes
                  </label>
                  <textarea
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    placeholder="E.g., Require stage setup, acoustic PA system, custom live bar..."
                    className="w-full bg-[#0A0A0A] border border-white/20 text-white p-3.5 text-xs focus:outline-none focus:border-amber-400 h-24 resize-none rounded-2xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-amber-400 text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-amber-300 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Request Event Proposal</span>
                </button>
              </form>
            )}
          </div>

          {/* Event Venue Showcase */}
          <div className="space-y-6">
            <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhRwhwNCnhGzEclW5wbJU9UAbHH-mWDdGdmwxvOlfBWMDE-wGGZcA_CSA-p2xEKrkKujkThGkp37RRXeKQqPl7P2VqP9DJ8NYQPXn3L7b2Ii7B-3xu-bRZdzREMnqGgvzDM2-XvHLuZ6Y09GWkL1pPILOharxTqe9474grm8blS32EnKUBpBqrbRiNmgH2izXlBojGRWoQsn9jJu6rKYl8VSPxIXPfQrBdz2WG-VG_ybPoDMRd3VQ8Tg"
                alt="Banquet Hall"
                className="w-full h-64 object-cover border border-white/10 rounded-2xl"
              />
              <div>
                <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Venue Highlight</span>
                <h3 className="font-serif italic text-2xl font-bold text-white mt-0.5">The Sovereign Banquet Hall</h3>
                <p className="text-xs text-white/60 mt-1 uppercase tracking-wider">
                  Capacity: Up to 500 Guests • Climate-controlled • Integrated AV & Stage
                </p>
              </div>
            </div>

            <div className="p-6 bg-[#141414] border border-white/10 rounded-3xl space-y-3 shadow-xl">
              <h4 className="font-serif italic text-xl font-bold text-white">Direct Concierge Desk</h4>
              <div className="flex items-center gap-3 text-xs text-white/70">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+91 1800 RESTRO CLUB</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/70">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>events@{activeLocation.code.toLowerCase()}.restroclub.com</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
