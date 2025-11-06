'use client';

import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  width?: number;
  onSettingsClick?: () => void;
  onSupportClick?: () => void;
}

interface NavigationItem {
  href: string;
  icon: string;
  label: string;
  ariaLabel: string;
  iconSize?: number;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { 
    href: '/dashboard', 
    icon: '/assets/sidebar/icons/menu.svg',
    label: 'Menu', 
    ariaLabel: 'Open Menu',
    iconSize: 24
  },
  { 
    href: '/dashboard/add', 
    icon: '/assets/sidebar/icons/widget.svg',
    label: 'Add', 
    ariaLabel: 'Add New Item',
    iconSize: 24
  },
  { 
    href: '/dashboard/new-order', 
    icon: '/assets/sidebar/icons/Trade.svg',
    label: 'New Order', 
    ariaLabel: 'Create New Order',
    iconSize: 24
  },
  { 
    href: '/dashboard/analytics', 
    icon: '/assets/sidebar/icons/analytics.svg',
    label: 'Analytics', 
    ariaLabel: 'View Analytics',
    iconSize: 24
  },
  { 
    href: '/dashboard/wallet', 
    icon: '/assets/sidebar/icons/wallet.svg',
    label: 'Wallet', 
    ariaLabel: 'Access Wallet',
    iconSize: 24
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  width = 48,
  onSettingsClick,
  onSupportClick,
}) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [activeView, setActiveView] = useState('dashboard');
  const [hoveredAction, setHoveredAction] = useState<'settings' | 'support' | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSettingsClick = useCallback(() => {
    onSettingsClick?.();
    window.dispatchEvent(new CustomEvent('sidebar:settings-open'));
  }, [onSettingsClick]);

  const handleSupportClick = useCallback(() => {
    onSupportClick?.();
    window.dispatchEvent(new CustomEvent('sidebar:support-open'));
  }, [onSupportClick]);

  const isActiveRoute = useCallback((href: string): boolean => {
    if (href === '/dashboard') {
      return activeView === 'dashboard';
    }
    const viewName = href.split('/').pop();
    return activeView === viewName || pathname === href || pathname.startsWith(href);
  }, [pathname, activeView]);

  const handleMouseEnter = useCallback((label: string, event: React.MouseEvent) => {
    if (isMobile) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + rect.height / 2,
      left: width + 12,
    });
    setHoveredItem(label);
  }, [width, isMobile]);

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    const view = href === '/dashboard' ? 'dashboard' : href.split('/').pop();
    setActiveView(view || 'dashboard');
    
    if (href === '/dashboard') {
      window.dispatchEvent(new CustomEvent('sidebar:navigate', { detail: { view: 'dashboard' } }));
    } else {
      window.dispatchEvent(new CustomEvent('sidebar:navigate', { detail: { view } }));
    }
  }, []);

  const handleActionMouseEnter = useCallback((action: 'settings' | 'support', event: React.MouseEvent) => {
    if (isMobile) return;
    
    setHoveredAction(action);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + rect.height / 2,
      left: width + 12,
    });
    setHoveredItem(action === 'settings' ? 'Settings' : 'Support');
  }, [width, isMobile]);

  const handleActionMouseLeave = useCallback(() => {
    setHoveredAction(null);
    setHoveredItem(null);
  }, []);

  return (
    <>
      <style jsx>{`
        /* CRITICAL: Design token variables for consistency */
        :root {
          --sidebar-width: 48px;
          --sidebar-gap: 24px;
          --icon-size: 24px;
          --active-indicator-width: 3px;
          --active-indicator-height: 32px;
          --glow-opacity: 0.12;
          --glow-radius: 18px;
        }

        .sidebar-container {
          position: fixed;
          left: 0;
          top: 0;
          width: ${width}px;
          height: 100vh;
          z-index: 50;
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          padding: 16px 0;
        }

        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 48px;
          margin-bottom: 24px;
          padding: 0;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .logo-container:hover {
          opacity: 0.85;
        }

        .logo-container:active {
          transform: scale(0.96);
        }

        /* FIXED: Navigation button spacing matches Figma (24px gap) */
        .nav-button {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 48px;
          margin-bottom: 24px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          padding: 0;
          background-color: transparent;
          border: none;
          border-radius: 0;
          -webkit-tap-highlight-color: transparent;
        }

        .nav-button:last-of-type {
          margin-bottom: 0;
        }

        .nav-button:hover .icon-wrapper {
          transform: scale(1.08);
        }

        .nav-button:active {
          transform: scale(0.96);
        }

        /* FIXED: Active indicator matches Figma specs */
        .active-indicator {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 32px;
          background: linear-gradient(180deg, #E85102 0%, #FF6B1A 100%);
          border-radius: 0 2px 2px 0;
          box-shadow: 0 0 8px rgba(232, 81, 2, 0.4);
        }

        /* FIXED: Active glow effect with proper opacity and blur */
        .active-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(232, 81, 2, 0.15) 0%,
            rgba(232, 81, 2, 0.08) 40%,
            rgba(232, 81, 2, 0) 70%
          );
          filter: blur(8px);
          opacity: 1;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        /* FIXED: Icon wrapper for proper centering */
        .icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }

        /* CRITICAL: SVG icon rendering optimization */
        .icon-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .nav-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        .nav-items {
          display: flex;
          flex-direction: column;
          padding: 0 12px;
        }

        /* FIXED: Actions container positioning */
        .actions-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: auto;
          margin-bottom: 24px;
          padding: 0 8px;
        }

        .action-button {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 36px;
          height: 24px;
          background: transparent;
          border: 0;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0;
          border-radius: 6px;
          -webkit-tap-highlight-color: transparent;
        }

        .action-button:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .action-button:active {
          transform: translateX(-50%) scale(0.95);
        }

        .action-button.settings {
          top: 0;
        }

        .action-button.support {
          bottom: 0;
        }

        /* FIXED: Tooltip styling with proper contrast */
        .tooltip {
          position: fixed;
          background: linear-gradient(135deg, #1f1f1f 0%, #1a1a1a 100%);
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          pointer-events: none;
          z-index: 9999;
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transform: translateY(-50%);
          letter-spacing: 0.01em;
          -webkit-font-smoothing: antialiased;
        }

        .tooltip::before {
          content: '';
          position: absolute;
          left: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-right: 4px solid #1a1a1a;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .sidebar-container {
            padding: 12px 0;
          }

          .logo-container {
            height: 44px;
            margin-bottom: 20px;
          }

          .nav-button {
            height: 44px;
            margin-bottom: 20px;
          }

          .actions-container {
            margin-bottom: 60px;
          }
        }

        @media (max-width: 480px) {
          .logo-container {
            height: 40px;
            margin-bottom: 16px;
          }

          .nav-button {
            height: 40px;
            margin-bottom: 16px;
          }

          .actions-container {
            margin-bottom: 80px;
          }
        }

        @media (max-height: 700px) {
          .nav-button {
            margin-bottom: 20px;
          }
          
          .actions-container {
            margin-bottom: 60px;
          }
        }

        @media (max-height: 600px) {
          .logo-container {
            margin-bottom: 16px;
          }

          .nav-button {
            margin-bottom: 16px;
          }
          
          .actions-container {
            margin-bottom: 40px;
          }
        }
      `}</style>

      <div className="sidebar-container">
        <div 
          className="logo-container"
          onClick={() => handleNavClick('/dashboard')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleNavClick('/dashboard');
            }
          }}
        >
          <Image
            src="/assets/sidebar/icons/logo.svg"
            alt="Logo"
            width={24}
            height={24}
            priority
            style={{ 
              userSelect: 'none',
            }}
          />
        </div>

        <div className="nav-container">
          <div className="nav-items">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = isActiveRoute(item.href);
              
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="nav-button"
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                  onMouseEnter={(e) => handleMouseEnter(item.label, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  {isActive && (
                    <>
                      <div className="active-indicator" />
                      <div className="active-glow" />
                    </>
                  )}

                  <div className="icon-wrapper">
                    <Image
                      src={item.icon}
                      alt=""
                      width={24}
                      height={24}
                      style={{ 
                        userSelect: 'none',
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="actions-container">
            <Image
              src="/assets/sidebar/icons/Setting-support.svg"
              alt="Settings and Support"
              width={32}
              height={56}
              style={{ 
                userSelect: 'none',
                display: 'block'
              }}
            />
            
            <button
              type="button"
              className="action-button settings"
              aria-label="Open Settings"
              onClick={handleSettingsClick}
              onMouseEnter={(e) => handleActionMouseEnter('settings', e)}
              onMouseLeave={handleActionMouseLeave}
            />
            
            <button
              type="button"
              className="action-button support"
              aria-label="Get Support"
              onClick={handleSupportClick}
              onMouseEnter={(e) => handleActionMouseEnter('support', e)}
              onMouseLeave={handleActionMouseLeave}
            />
          </div>
        </div>

        {hoveredItem && !isMobile && (
          <div
            className="tooltip"
            style={{
              left: `${tooltipPosition.left}px`,
              top: `${tooltipPosition.top}px`,
            }}
          >
            {hoveredItem}
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(Sidebar);