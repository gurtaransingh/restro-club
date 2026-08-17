'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  User,
  KeyRound,
  Shield,
  ChefHat,
  Crown,
  Briefcase,
  Trophy,
  BedDouble,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testLogins = [
    {
      id: 'admin',
      pass: 'admin',
      role: 'Super Administrator',
      badge: 'All Permissions',
      icon: Shield,
      target: '/admin',
      color: 'bg-gradient-to-r from-[#8C5A3C] to-[#6E442B] text-white',
    },
    {
      id: 'c1',
      pass: 'c1',
      role: 'Executive Chef (Chef Julian)',
      badge: 'Kitchen KDS',
      icon: ChefHat,
      target: '/kitchen',
      color: 'bg-white',
    },
    {
      id: 'm1',
      pass: 'm1',
      role: 'General Manager',
      badge: 'Property Operations',
      icon: Briefcase,
      target: '/admin',
      color: 'bg-white',
    },
    {
      id: 'e1',
      pass: 'e1',
      role: 'Banquets Lead (Priya Sharma)',
      badge: 'Event CRM',
      icon: Crown,
      target: '/admin/masters',
      color: 'bg-white',
    },
    {
      id: 's1',
      pass: 's1',
      role: 'Sports Arena Coach (Vikram)',
      badge: 'Court Bookings',
      icon: Trophy,
      target: '/sports',
      color: 'bg-white',
    },
    {
      id: 'st1',
      pass: 'st1',
      role: 'Suites Lead (Sunil Mehta)',
      badge: 'Accommodations',
      icon: BedDouble,
      target: '/stays',
      color: 'bg-white',
    },
    {
      id: 'u1',
      pass: 'u1',
      role: 'Club Member (Kabir Singh)',
      badge: 'Elite Tier',
      icon: User,
      target: '/profile',
      color: 'bg-white',
    },
  ];

  const handleLogin = async (u: string, p: string, redirectTarget?: string) => {
    setError(null);
    setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8C5A3C]/10 border border-[#8C5A3C]/20 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span>Restro Club Portal Authentication</span>
          </div>
          <h1 className="font-serif italic text-4xl sm:text-5xl font-bold text-[#1E241D]">
            Sign In to Your Workspace
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] max-w-lg mx-auto">
            Enter your authorized access credentials below. Super administrators and department leads will be routed to their respective command centers.
          </p>
        </div>

        {/* Main Form & Credentials Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Login Form */}
          <div className="lg:col-span-6 bg-white border border-[#E5DEC9] rounded-3xl p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5DEC9] pb-4">
              <div>
                <h2 className="text-base font-bold text-[#1E241D]">Credentials Login</h2>
                <p className="text-[11px] text-[#5C554E]">Enter username/ID and password</p>
              </div>
              <KeyRound className="w-5 h-5 text-[#8C5A3C]" />
            </div>

            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin(username, password);
              }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#5C554E] block">
                  Login ID / Username / Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C5A3C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. admin, c1, m1, u1"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl text-xs text-[#1E241D] placeholder-[#5C554E]/60 focus:outline-none focus:border-[#8C5A3C]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#5C554E] block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C5A3C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF8F3] border border-[#E5DEC9] rounded-xl text-xs text-[#1E241D] placeholder-[#5C554E]/60 focus:outline-none focus:border-[#8C5A3C]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-[#8C5A3C]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Authenticate & Enter</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-[#E5DEC9] text-center">
              <p className="text-xs text-[#5C554E]">
                New to Restro Club?{' '}
                <Link href="/register" className="text-[#8C5A3C] font-bold hover:underline">
                  Create Member Account
                </Link>
              </p>
            </div>
          </div>

          {/* Quick Role Shortcut Panel */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-[#EDE6D8] border border-[#E5DEC9] p-5 rounded-2xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E241D] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8C5A3C]" />
                <span>Quick Role Credentials</span>
              </h3>
              <p className="text-[11px] text-[#5C554E] mt-1">
                Click any persona below to authenticate instantly:
              </p>
            </div>

            <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
              {testLogins.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setUsername(t.id);
                      setPassword(t.pass);
                      handleLogin(t.id, t.pass, t.target);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all hover:scale-[1.01] hover:shadow-md flex items-center justify-between gap-4 cursor-pointer ${
                      t.color.includes('from')
                        ? 'bg-gradient-to-r from-[#8C5A3C] to-[#6E442B] text-white border-[#73482E]'
                        : 'bg-white border-[#E5DEC9] text-[#1E241D] hover:border-[#8C5A3C]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          t.color.includes('from') ? 'bg-white/20 text-white' : 'bg-[#F2ECE1] text-[#8C5A3C]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-serif italic">{t.role}</span>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              t.color.includes('from')
                                ? 'bg-white/20 text-white'
                                : 'bg-[#8C5A3C]/10 text-[#8C5A3C]'
                            }`}
                          >
                            {t.badge}
                          </span>
                        </div>
                        <p
                          className={`text-[10px] mt-0.5 ${
                            t.color.includes('from') ? 'text-white/80' : 'text-[#5C554E]'
                          }`}
                        >
                          Login: <strong className="underline">{t.id}</strong> / Pass: <strong className="underline">{t.pass}</strong>
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 flex-shrink-0 ${
                        t.color.includes('from') ? 'text-white/80' : 'text-[#8C5A3C]'
                      }`}
                    />
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
