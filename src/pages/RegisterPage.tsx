import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Crown,
  Sparkles,
  ArrowRight,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register, membershipTiers, locations, activeLocation } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTier, setSelectedTier] = useState(membershipTiers[0]?.id || 'tier-club');
  const [selectedLocation, setSelectedLocation] = useState(activeLocation?.id || 'loc-1');
  const [city, setCity] = useState('Mohali');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register({
        name,
        email,
        phone,
        username: username || email.split('@')[0],
        password,
        membershipTierId: selectedTier,
        locationId: selectedLocation,
        city,
        address,
      });
      if (res.success) {
        navigate('/profile');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8C5A3C]/10 border border-[#8C5A3C]/20 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm">
            <Crown className="w-3.5 h-3.5" />
            <span>Exclusive Membership Onboarding</span>
          </div>
          <h1 className="font-serif italic text-4xl sm:text-5xl font-bold text-[#1E241D]">
            Join Restro Club
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] max-w-lg mx-auto">
            Experience Michelin-inspired dining, world-class athletic facilities, and boutique resort hospitality.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-[#E5DEC9] rounded-3xl p-8 sm:p-10 shadow-sm space-y-8">
          {/* Personal Info */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#8C5A3C] flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>1. Personal Credentials</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lord Alexander Pierce"
                  className="w-full px-4 py-3 bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl text-xs text-[#1E241D] focus:outline-none focus:border-[#8C5A3C]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alexander@domain.com"
                  className="w-full px-4 py-3 bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl text-xs text-[#1E241D] focus:outline-none focus:border-[#8C5A3C]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Mobile Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl text-xs text-[#1E241D] focus:outline-none focus:border-[#8C5A3C]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Preferred Username / ID</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. alexander12"
                  className="w-full px-4 py-3 bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl text-xs text-[#1E241D] focus:outline-none focus:border-[#8C5A3C]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Account Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl text-xs text-[#1E241D] focus:outline-none focus:border-[#8C5A3C]"
                />
              </div>
            </div>
          </div>

          {/* Membership Tier & Location */}
          <div className="space-y-4 pt-4 border-t border-[#E5DEC9]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#8C5A3C] flex items-center gap-2">
              <Crown className="w-4 h-4" />
              <span>2. Membership Tier Selection</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {membershipTiers.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTier(tier.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedTier === tier.id
                      ? 'border-[#8C5A3C] bg-[#8C5A3C]/10 ring-2 ring-[#8C5A3C]'
                      : 'border-[#E5DEC9] bg-[#FAF8F3] hover:border-[#8C5A3C]/50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-serif italic font-bold text-sm text-[#1E241D]">{tier.name}</span>
                    {selectedTier === tier.id && <CheckCircle2 className="w-4 h-4 text-[#8C5A3C]" />}
                  </div>
                  <p className="text-xs font-bold text-[#8C5A3C] mt-2">₹{Number(tier.annualFee).toLocaleString()}/yr</p>
                  <p className="text-[10px] text-[#5C554E] mt-1">{tier.discountPercentage}% dining discount</p>
                </button>
              ))}
            </div>
          </div>

          {/* Location & Address */}
          <div className="space-y-4 pt-4 border-t border-[#E5DEC9]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#8C5A3C] flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>3. Primary Location & Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Home Club Hub</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl text-xs text-[#1E241D] focus:outline-none focus:border-[#8C5A3C]"
                >
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Mohali / Chandigarh"
                  className="w-full px-4 py-3 bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl text-xs text-[#1E241D] focus:outline-none focus:border-[#8C5A3C]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Residential Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/Villa No, Sector/Locality"
                  className="w-full px-4 py-3 bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl text-xs text-[#1E241D] focus:outline-none focus:border-[#8C5A3C]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-[#8C5A3C]/20 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Activating Membership...</span>
            ) : (
              <>
                <span>Complete Registration & Access Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <p className="text-xs text-[#5C554E]">
              Already a registered member or employee?{' '}
              <Link to="/login" className="text-[#8C5A3C] font-bold hover:underline">
                Sign In here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
