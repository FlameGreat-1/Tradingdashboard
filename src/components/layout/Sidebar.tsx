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
    iconSize: 28
  },
  { 
    href: '/dashboard/add', 
    icon: '/assets/sidebar/icons/widget.svg',
    label: 'Add', 
    ariaLabel: 'Add New Item',
    iconSize: 36
  },
  { 
    href: '/dashboard/new-order', 
    icon: '/assets/sidebar/icons/Trade.svg',
    label: 'New Order', 
    ariaLabel: 'Create New Order',
    iconSize: 36
  },
  { 
    href: '/dashboard/analytics', 
    icon: '/assets/sidebar/icons/analytics.svg',
    label: 'Analytics', 
    ariaLabel: 'View Analytics',
    iconSize: 36
  },
  { 
    href: '/dashboard/wallet', 
    icon: '/assets/sidebar/icons/wallet.svg',
    label: 'Wallet', 
    ariaLabel: 'Access Wallet',
    iconSize: 28
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
        }

        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 40px;
          margin-bottom: 8px;
          padding: 0;
          cursor: pointer;
        }

        .nav-button {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 48px;
          margin-bottom: 4px;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
          padding: 0;
          background-color: transparent;
          border: none;
          border-radius: 8px;
          -webkit-tap-highlight-color: transparent;
        }

        .nav-button:last-child {
          margin-bottom: 0;
        }

        .nav-button:active {
          transform: scale(0.95);
        }

        .active-indicator {
          position: absolute;
          left: 2px;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 24px;
          background-color: #E85102;
          border-radius: 8px;
        }

        .active-glow {
          position: absolute;
          inset: 6px;
          pointer-events: none;
        }

        .icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease-in-out;
        }

        .actions-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 32px;
        }

        .action-button {
          position: absolute;
          left: 0;
          width: 100%;
          height: 40px;
          background: transparent;
          border: 0;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          padding: 0;
          border-radius: 8px;
          -webkit-tap-highlight-color: transparent;
        }

        .action-button:active {
          transform: scale(0.95);
        }

        .action-button.settings {
          top: 0;
        }

        .action-button.support {
          bottom: 0;
        }

        .tooltip {
          position: fixed;
          background-color: #1a1a1a;
          color: #ffffff;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          pointer-events: none;
          z-index: 9999;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          border: 1px solid #2a2a2a;
          transform: translateY(-50%);
        }

        @media (max-width: 768px) {
          .sidebar-container {
            width: ${width}px;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
          }

          .logo-container {
            height: 40px;
            margin-bottom: 8px;
          }

          .nav-button {
            height: 48px;
            margin-bottom: 4px;
          }

          .actions-container {
            margin-bottom: 60px;
          }
        }

        @media (max-width: 480px) {
          .sidebar-container {
            width: ${width}px;
          }

          .logo-container {
            height: 28px;
            margin-bottom: 1px;
          }

          .nav-button {
            height: 38px;
            margin-bottom: 0px;
          }

          .actions-container {
            margin-bottom: 8px;
          }
        }
      `}</style>

      <div className="sidebar-container">
        <div 
          className="logo-container"
          onClick={() => handleNavClick('/dashboard')}
        >
          <Image
            src="/assets/sidebar/icons/logo.svg"
            alt="Logo"
            width={28}
            height={28}
            priority
            style={{ 
              userSelect: 'none',
            }}
          />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0 }}>
          <div style={{ paddingTop: 0 }}>
            {NAVIGATION_ITEMS.map((item) => {
              const iconSize = item.iconSize || 28;
              const isActive = isActiveRoute(item.href);
              
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="nav-button"
                  aria-label={item.ariaLabel}
                  onMouseEnter={(e) => handleMouseEnter(item.label, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  {isActive && (
                    <>
                      <div className="active-indicator" />
                      <svg
                        className="active-glow"
                        viewBox="0 0 40 40"
                      >
                        <defs>
                          <radialGradient id="cellGradient">
                            <stop offset="0%" stopColor="rgba(232, 81, 2, 0)" />
                            <stop offset="70%" stopColor="rgba(232, 81, 2, 0.08)" />
                            <stop offset="100%" stopColor="rgba(232, 81, 2, 0.15)" />
                          </radialGradient>
                        </defs>
                        <path
                          d="M 20 2 A 18 18 0 1 1 19.99 2"
                          fill="url(#cellGradient)"
                          stroke="none"
                        />
                      </svg>
                    </>
                  )}

                  <div 
                    className="icon-wrapper"
                    style={{
                      width: `${iconSize}px`,
                      height: `${iconSize}px`,
                    }}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={iconSize}
                      height={iconSize}
                      style={{ 
                        userSelect: 'none',
                        transition: 'all 0.2s ease-in-out'
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
              height={53}
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