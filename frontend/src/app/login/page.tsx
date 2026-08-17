'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  ChefHat,
  Crown,
  Briefcase,
  Trophy,
  BedDouble,
  User,
  LogIn,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sampleRoles = [
    {
      id: 'admin',
      pass: 'admin',
      role: 'Super Admin',
      cat: 'SUPER_ADMIN',
      desc: 'Full Location & Master Tables CRUD, Finance, HR',
      icon: Shield,
      target: '/admin',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'c1',
      pass: 'c1',
      role: 'Executive Chef',
      cat: 'CHEF',
      desc: 'Live Kitchen Display System (KDS) & Menu Toggles',
      icon: ChefHat,
      target: '/kitchen',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
    {
      id: 'm1',
      pass: 'm1',
      role: 'General Manager',
      cat: 'MANAGER',
      desc: 'Operations, Finance Analytics & Staff Attendance',
      icon: Briefcase,
      target: '/admin',
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
    },
    {
      id: 'e1',
      pass: 'e1',
      role: 'Event Manager',
      cat: 'EVENT_MANAGER',
      desc: 'Banquets CRM, Lawns & Member Events',
      icon: Crown,
      target: '/admin/masters',
      badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    },
    {
      id: 's1',
      pass: 's1',
      role: 'Sports Coach',
      cat: 'SPORTS_COACH',
      desc: 'Pickleball, Box Cricket & Court Bookings',
      icon: Trophy,
      target: '/sports',
      badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
    },
    {
      id: 'st1',
      pass: 'st1',
      role: 'Stays Lead',
      cat: 'STAYS_DESK',
      desc: 'Suites, 1BHK/2BHK Stays & Housekeeping',
      icon: BedDouble,
      target: '/stays',
      badgeBg: 'bg-teal-100 text-teal-900 border-teal-300',
    },
    {
      id: 'u1',
      pass: 'u1',
      role: 'Club Member',
      cat: 'MEMBER',
      desc: 'Food orders, court slots & loyalty ledger',
      icon: User,
      target: '/profile',
      badgeBg: 'bg-stone-100 text-stone-900 border-stone-300',
    },
  ];

  const handleLogin = async (u: string, p: string, redirectTarget?: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await login(u, p);
      if (res.success && res.user) {
        if (redirectTarget) {
          router.push(redirectTarget);
        } else if (res.user.category === 'SUPER_ADMIN' || res.user.roleId === 'role-superadmin') {
          router.push('/admin');
        } else if (res.user.category === 'CHEF' || res.user.roleId === 'role-chef') {
          router.push('/kitchen');
        } else if (res.user.category === 'MANAGER' || res.user.roleId === 'role-gm') {
          router.push('/admin');
        } else {
          router.push('/profile');
        }
      } else {
        setError(res.error || 'Invalid credentials.');
      }
    } catch (err: any) {
      setError(err?.message || 'Login error.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both ID and Password.');
      return;
    }
    handleLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8C5A3C]/15 border border-[#8C5A3C]/30 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
            <Shield className="w-3.5 h-3.5" />
            <span>Restro Club Unified Authentication</span>
          </div>
          <h1 className="font-serif italic text-3xl sm:text-5xl font-bold text-[#1E241D]">
            Sign In to Restro Club
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] max-w-md mx-auto">
            Access your personalized role workspace, executive command center, KDS station, or member profile.
          </p>
        </div>

        {/* Main Grid: Form on Left, 1-Click Role shortcuts on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Credential Form */}
          <div className="md:col-span-6 bg-white border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-[#E5DEC9] pb-4">
              <h2 className="font-serif italic text-xl font-bold text-[#1E241D]">Credentials Sign In</h2>
              <p className="text-xs text-[#5C554E]">Enter your user ID, username, or registered email.</p>
            </div>

            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">User ID / Username</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. admin, c1, m1, u1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#8C5A3C]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <LogIn className="w-4 h-4" />
                <span>{isLoading ? 'Signing In...' : 'Authenticate Account'}</span>
              </button>
            </form>

            <div className="pt-4 border-t border-[#E5DEC9] text-center text-xs text-[#5C554E]">
              <span>Don't have an active club ID? </span>
              <Link href="/register" className="text-[#8C5A3C] font-bold hover:underline">
                Join Restro Club
              </Link>
            </div>
          </div>

          {/* 1-Click Role Cards */}
          <div className="md:col-span-6 space-y-4">
            <div className="bg-[#EDE6D8] border border-[#E5DEC9] rounded-2xl p-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C5A3C] shrink-0" />
              <p className="text-xs text-[#1E241D] font-medium">
                <strong>1-Click Test Personas:</strong> Click any card below to test authorized workflows immediately.
              </p>
            </div>

            <div className="space-y-2.5">
              {sampleRoles.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setUsername(item.id);
                      setPassword(item.pass);
                      handleLogin(item.id, item.pass, item.target);
                    }}
                    className="w-full text-left p-3.5 bg-white border border-[#E5DEC9] hover:border-[#8C5A3C] hover:shadow-md rounded-2xl transition-all flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8F3] border border-[#E5DEC9] flex items-center justify-center group-hover:bg-[#8C5A3C] group-hover:text-white transition-colors text-[#8C5A3C]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#1E241D]">{item.role}</span>
                          <span className={`text-[9px] font-mono px-2 py-0.2 rounded-md font-semibold border ${item.badgeBg}`}>
                            {item.id} / {item.pass}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5C554E] mt-0.5">{item.desc}</p>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[#5C554E] group-hover:text-[#8C5A3C] group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
