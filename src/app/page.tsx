// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRedirecting(true);
      router.push('/dashboard');
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ 
        backgroundColor: 'var(--color-background-main)',
        color: 'var(--color-text-primary)'
      }}
    >
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <div 
            className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
            style={{ backgroundColor: 'var(--color-background-card)' }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <path
                d="M8 4L24 4C26.2091 4 28 5.79086 28 8V24C28 26.2091 26.2091 28 24 28H8C5.79086 28 4 26.2091 4 24V8C4 5.79086 5.79086 4 8 4Z"
                fill="var(--color-primary)"
              />
              <path
                d="M12 10H20V14H16V18H20V22H12V18H16V14H12V10Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <div className="relative mx-auto mb-8 w-12 h-12">
          <div 
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: 'var(--color-border)' }}
          />
          <div 
            className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: 'var(--color-primary)' }}
          />
        </div>

        <div className="space-y-3">
          <h1 
            className="text-2xl font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Trading Dashboard
          </h1>
          <p 
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {isRedirecting ? 'Redirecting to dashboard...' : 'Initializing your workspace...'}
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ 
                backgroundColor: 'var(--color-primary)',
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
