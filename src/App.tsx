import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CartDrawer } from './components/CartDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { RestaurantPage } from './pages/RestaurantPage';
import { SportsPage } from './pages/SportsPage';
import { PoolPage } from './pages/PoolPage';
import { StaysPage } from './pages/StaysPage';
import { EventsPage } from './pages/EventsPage';
import { MembershipPage } from './pages/MembershipPage';
import { GalleryPage } from './pages/GalleryPage';
import { ProfilePage } from './pages/ProfilePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { KitchenPage } from './pages/KitchenPage';
import { MarketingPage } from './pages/MarketingPage';
import { FinancePage } from './pages/FinancePage';
import { PayrollPage } from './pages/PayrollPage';
import { LocationsPage } from './pages/LocationsPage';
import { AddLocationPage } from './pages/AddLocationPage';
import { AdminPage } from './pages/AdminPage';
import { MasterTablesPage } from './pages/MasterTablesPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Crown } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Route Guard Component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
  requireChef?: boolean;
}> = ({ children, requireSuperAdmin, requireChef }) => {
  const { isAuthenticated, isSuperAdmin, isChef } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/login" replace />;
  }

  if (requireChef && !isChef && !isSuperAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] flex flex-col font-sans selection:bg-[#8C5A3C] selection:text-white">
      <ScrollToTop />
      
      {/* Header */}
      <Header onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Content Viewport */}
      <main className="flex-1">
        <Routes>
          {/* Public Hospitality & Exploration Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurant" element={<RestaurantPage onOpenCart={() => setIsCartOpen(true)} />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/pool" element={<PoolPage />} />
          <Route path="/stays" element={<StaysPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Member & Order Checkout */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Protected Kitchen KDS Route */}
          <Route
            path="/kitchen"
            element={
              <ProtectedRoute requireChef>
                <KitchenPage />
              </ProtectedRoute>
            }
          />
          
          {/* Protected Super Admin Command Center Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireSuperAdmin>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/locations"
            element={
              <ProtectedRoute requireSuperAdmin>
                <LocationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/locations/new"
            element={
              <ProtectedRoute requireSuperAdmin>
                <AddLocationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/finance"
            element={
              <ProtectedRoute requireSuperAdmin>
                <FinancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/payroll"
            element={
              <ProtectedRoute requireSuperAdmin>
                <PayrollPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/marketing"
            element={
              <ProtectedRoute requireSuperAdmin>
                <MarketingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/masters"
            element={
              <ProtectedRoute requireSuperAdmin>
                <MasterTablesPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Institutional Footer (Military Green with Tan Accents) */}
      <footer className="bg-[#3E4A38] border-t border-[#35402F] py-12 px-4 sm:px-6 lg:px-8 text-[#ECF0EA] text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#8C5A3C] text-white rounded-lg flex items-center justify-center font-bold shadow-md">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif italic text-lg font-bold text-white tracking-wider">RESTRO CLUB</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#D3DDD0] uppercase tracking-wider">
              Multi-location luxury destination combining fine dining, indoor recreation, sports courts, aquatic oasis & luxury boutique stays.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-[#DBC7B5] uppercase tracking-[0.2em] mb-3">Destinations</h4>
            <ul className="space-y-1.5 text-[11px] uppercase tracking-wider">
              <li className="hover:text-white transition-colors cursor-pointer">Banur Highway Flagship</li>
              <li className="hover:text-white transition-colors cursor-pointer">Mohali Aerocity Club</li>
              <li className="hover:text-white transition-colors cursor-pointer">Chandigarh Club Hub</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-[#DBC7B5] uppercase tracking-[0.2em] mb-3">Portal Modules</h4>
            <ul className="space-y-1.5 text-[11px] uppercase tracking-wider">
              <li className="hover:text-white transition-colors"><a href="/restaurant">Fine Dining & Bar</a></li>
              <li className="hover:text-white transition-colors"><a href="/sports">Sports & Rec Club</a></li>
              <li className="hover:text-white transition-colors"><a href="/pool">Pool & Aqua Deck</a></li>
              <li className="hover:text-white transition-colors"><a href="/stays">Luxury Stays</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-[#DBC7B5] uppercase tracking-[0.2em] mb-3">Operations & Concierge</h4>
            <p className="text-[11px] text-[#D3DDD0] uppercase tracking-wider">National Highway 205A, Banur-Mohali Highway</p>
            <p className="text-[11px] font-bold text-white mt-2">concierge@restroclub.com</p>
            <p className="text-[11px] text-[#ECF0EA]">+91 1800 RESTRO (737876)</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#4A5844] flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase tracking-widest text-[#B5C2B0] gap-4">
          <p>© {new Date().getFullYear()} Restro Club Operations Ltd. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <a href="/login" className="hover:text-white text-[#DBC7B5] cursor-pointer">Staff Login</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
