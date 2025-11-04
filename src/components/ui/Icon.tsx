// src/components/ui/Icon.tsx
import React from 'react';

export interface IconProps {
  name: 'grid' | 'plus' | 'swap' | 'chart' | 'wallet' | 'search' | 'chevronDown' | 'settings' | 'headphones' | 'menu';
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  strokeWidth = 2,
  className = '',
}) => {
  const common: React.SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'grid':
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      );

    case 'plus':
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );

    case 'swap':
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      );

    case 'chart':
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );

    case 'wallet':
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      );

    case 'settings':
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3" />
        </svg>
      );

    case 'headphones':
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
        </svg>
      );

    case 'menu':
      return (
        <svg {...common} viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      );

    default:
      return null;
  }
};

export default Icon;
