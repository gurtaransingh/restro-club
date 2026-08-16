import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LocationSelector } from './LocationSelector';
import {
  ShoppingBag,
  User,
  Shield,
  UtensilsCrossed,
  Sparkles,
  Crown,
  ChevronDown,
  Menu,
  X,
  LogIn,
  LogOut,
  UserPlus,
} from 'lucide-react';

interface HeaderProps {
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart }) => {
  const {
    cart,
    currentUser,
    isAuthenticated,
    logout,
    isSuperAdmin,
    isChef,
    isManager,
  } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isCurrent = (path: string) => location.pathname === path;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Dining', path: '/restaurant' },
    { label: 'Sports', path: '/sports' },
    { label: 'Pool', path: '/pool' },
    { label: 'Stays', path: '/stays' },
    { label: 'Events', path: '/events' },
    { label: 'Membership', path: '/membership' },
    { label: 'Gallery', path: '/gallery' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E5DEC9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Monogram & Name */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[#8C5A3C] text-white rounded-xl flex items-center justify-center font-bold tracking-tighter text-sm group-hover:bg-[#73482E] transition-colors shadow-md shadow-[#8C5A3C]/20">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-serif italic text-lg font-bold tracking-tight text-[#1E241D] block leading-none">
                RESTRO CLUB
              </span>
              <span className="text-[8px] font-bold tracking-[0.25em] text-[#8C5A3C] uppercase block mt-0.5">
                LUXURY & RECREATION
              </span>
            </div>
          </Link>
          
          <div className="hidden lg:block h-5 w-px bg-[#E5DEC9] ml-1" />
          
          {/* Location Master Picker */}
          <div className="hidden md:block">
            <LocationSelector />
          </div>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 bg-[#F2ECE1] p-1 rounded-full border border-[#E5DEC9]">
          {navLinks.map((link) => {
            const active = isCurrent(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] transition-all ${
                  active
                    ? 'bg-[#8C5A3C] text-white font-bold shadow-md shadow-[#8C5A3C]/20'
                    : 'text-[#5C554E] hover:text-[#1E241D] hover:bg-white/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Cart & Authentication State */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full hover:bg-[#F2ECE1] text-[#1E241D] transition-colors cursor-pointer border border-[#E5DEC9]"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#3E4A38]" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8C5A3C] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* If Authenticated: Avatar Dropdown */}
          {isAuthenticated && currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-[#F2ECE1] transition-colors cursor-pointer border border-[#E5DEC9]"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#8C5A3C]"
                />
                <ChevronDown className="w-3 h-3 text-[#5C554E] hidden sm:block mr-1" />
              </button>

              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E5DEC9] p-3 z-50 text-[#1E241D] rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2 py-2 border-b border-[#E5DEC9] mb-2">
                      <p className="text-xs font-bold text-[#1E241D] tracking-wide uppercase">{currentUser.name}</p>
                      <p className="text-[10px] text-[#5C554E] mt-0.5">{currentUser.email}</p>
                      <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-[#8C5A3C]/10 text-[#8C5A3C] text-[8px] font-bold tracking-widest uppercase border border-[#8C5A3C]/20 rounded-full">
                        {isSuperAdmin ? 'Super Administrator' : isChef ? 'Executive Chef' : isManager ? 'General Manager' : 'Club Member'}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-[#5C554E] hover:text-[#1E241D] hover:bg-[#F2ECE1] uppercase tracking-wider text-[10px] transition-colors rounded-xl font-bold"
                      >
                        <User className="w-3.5 h-3.5 text-[#8C5A3C]" />
                        <span>Member Profile & Ledger</span>
                      </Link>

                      {isSuperAdmin && (
                        <>
                          <Link
                            to="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-[#1E241D] bg-[#8C5A3C]/10 hover:bg-[#8C5A3C]/20 uppercase tracking-wider text-[10px] transition-colors rounded-xl font-bold"
                          >
                            <Shield className="w-3.5 h-3.5 text-[#8C5A3C]" />
                            <span>Executive Command Center</span>
                          </Link>
                          <Link
                            to="/admin/masters"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-[#5C554E] hover:text-[#1E241D] hover:bg-[#F2ECE1] uppercase tracking-wider text-[10px] transition-colors rounded-xl"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#8C5A3C]" />
                            <span>Master Tables CRUD</span>
                          </Link>
                        </>
                      )}

                      {isChef && (
                        <Link
                          to="/kitchen"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-[#5C554E] hover:text-[#1E241D] hover:bg-[#F2ECE1] uppercase tracking-wider text-[10px] transition-colors rounded-xl"
                        >
                          <UtensilsCrossed className="w-3.5 h-3.5 text-[#3E4A38]" />
                          <span>Kitchen Display Board (KDS)</span>
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-[#E5DEC9] mt-2 pt-2">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                          navigate('/login');
                        }}
                        className="w-full text-left px-3 py-2 text-[11px] font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors rounded-xl"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Unauthenticated: Clean Sign In & Register Buttons */
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 bg-[#8C5A3C] hover:bg-[#73482E] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/register"
                className="hidden sm:flex px-3.5 py-2 bg-white border border-[#E5DEC9] hover:bg-[#F2ECE1] text-[#1E241D] text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#8C5A3C]" />
                <span>Join</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#1E241D] transition-colors border border-[#E5DEC9] rounded-xl"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5DEC9] bg-[#FAF8F3] px-4 pt-3 pb-6 space-y-3">
          <div className="mb-2">
            <LocationSelector />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const active = isCurrent(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-xl flex items-center justify-between border ${
                    active ? 'bg-[#8C5A3C] text-white border-[#8C5A3C]' : 'bg-white text-[#1E241D] border-[#E5DEC9]'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#E5DEC9] flex items-center gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-red-50 text-red-700 text-[11px] font-bold uppercase tracking-wider rounded-xl border border-red-200"
              >
                Sign Out ({currentUser?.name})
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 bg-[#8C5A3C] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 bg-white border border-[#E5DEC9] text-[#1E241D] text-[11px] font-bold uppercase tracking-wider rounded-xl"
                >
                  Join Club
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
