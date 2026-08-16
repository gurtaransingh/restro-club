import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MapPin, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';

export const AddLocationPage: React.FC = () => {
  const navigate = useNavigate();
  const { addLocation } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    address: '',
    region: 'Punjab North',
    facilities: ['Fine Dining', 'Pickleball', 'Box Cricket', 'Pool Lounge'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLocation({
      name: formData.name,
      code: formData.code || 'LOC-' + Math.floor(Math.random() * 900 + 100),
      address: formData.address,
      region: formData.region,
      hasFineDining: true,
      hasSports: true,
      hasStay: true,
      hasPool: true,
      status: 'ACTIVE',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-6 border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto space-y-2">
          <button
            onClick={() => navigate('/locations')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Properties</span>
          </button>
          <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] block">
            Property Provisioning
          </span>
          <h1 className="font-serif italic text-3xl sm:text-4xl font-bold text-white">Add New Location</h1>
        </div>
      </section>

      {/* Form Container */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {submitted ? (
          <div className="bg-[#141414] border border-white/10 p-10 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-white mx-auto" />
            <h2 className="font-serif italic text-3xl font-bold text-white">Property Provisioned</h2>
            <p className="text-xs text-white/60 uppercase tracking-wider">
              <span className="text-white font-bold">{formData.name}</span> has been provisioned and configured on the network.
            </p>
            <button
              onClick={() => navigate('/locations')}
              className="px-8 py-3.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 cursor-pointer"
            >
              Return to Properties Directory
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/10 p-8 space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-2">
                Property Name
              </label>
              <input
                type="text"
                required
                placeholder="E.g., Ludhiana Highway Hub"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0A0A0A] border border-white/20 text-white px-4 py-3 text-xs font-medium focus:outline-none focus:border-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-2">
                  Location Code
                </label>
                <input
                  type="text"
                  placeholder="E.g., LDH-01"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/20 text-white px-4 py-3 text-xs font-medium focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-2">
                  Region
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/20 text-white px-4 py-3 text-xs font-medium focus:outline-none focus:border-white"
                >
                  <option value="Punjab North">Punjab North</option>
                  <option value="Mohali/Tricity">Mohali / Tricity</option>
                  <option value="National Highway Belt">National Highway Belt</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-2">
                Physical Address
              </label>
              <textarea
                required
                placeholder="E.g., NH-44 Grand Trunk Road..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#0A0A0A] border border-white/20 text-white p-4 text-xs font-medium focus:outline-none focus:border-white h-24 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-all cursor-pointer"
            >
              Provision New Location
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
