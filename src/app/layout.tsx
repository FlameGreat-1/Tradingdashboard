// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Trading Dashboard - Professional Trading Platform',
    template: '%s | Trading Dashboard',
  },
  description: 'Advanced trading dashboard for forex, crypto, and stock market trading with real-time analytics',
  keywords: ['trading', 'forex', 'crypto', 'stocks', 'dashboard', 'charts', 'analytics', 'real-time'],
  authors: [{ name: 'Trading Platform' }],
  creator: 'Trading Platform',
  publisher: 'Trading Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: 'icon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#e85102',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {/* REMOVE ALL LAYOUT COMPONENTS - Let pages handle their own layout */}
        {children}
      </body>
    </html>
  );
}
