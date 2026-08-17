import type { Metadata } from 'next';
import '../styles/globals.css';
import { AppProvider } from '../context/AppContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BottomNav } from '../components/BottomNav';
import { CartDrawer } from '../components/CartDrawer';
import { BookingModal } from '../components/BookingModal';

export const metadata: Metadata = {
  title: 'Restro Club — Luxury Food, Sports & Resort Hospitality Platform',
  description: 'Enterprise luxury multi-location hospitality, Michelin fine dining, sports arenas, pickleball courts, and resort stays across the Banur-Mohali highway and capital region.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAF8F3] text-[#1E241D] flex flex-col antialiased selection:bg-[#8C5A3C] selection:text-white">
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <BookingModal />
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
