'use client';

import React, { useCallback, useState } from 'react';
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
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + rect.height / 2,
      left: width + 12,
    });
    setHoveredItem(label);
  }, [width]);

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    const view = href === '/dashboard' ? 'dashboard' : href.split('/').pop();
    setActiveView(view || 'dashboard');
    
    // Always open menu view for dashboard/menu
    if (href === '/dashboard') {
      window.dispatchEvent(new CustomEvent('sidebar:navigate', { detail: { view: 'dashboard' } }));
    } else {
      window.dispatchEvent(new CustomEvent('sidebar:navigate', { detail: { view } }));
    }
  }, []);

  const handleActionMouseEnter = useCallback((action: 'settings' | 'support', event: React.MouseEvent) => {
    setHoveredAction(action);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + rect.height / 2,
      left: width + 12,
    });
    setHoveredItem(action === 'settings' ? 'Settings' : 'Support');
  }, [width]);

  const handleActionMouseLeave = useCallback(() => {
    setHoveredAction(null);
    setHoveredItem(null);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: `${width}px`,
        height: '100vh',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '40px',
          marginBottom: '8px',
          padding: 0,
          cursor: 'pointer'
        }}
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
          {NAVIGATION_ITEMS.map((item, index) => {
            const iconSize = item.iconSize || 28;
            const isActive = isActiveRoute(item.href);
            
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '48px',
                  marginBottom: index === NAVIGATION_ITEMS.length - 1 ? '0px' : '4px',
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                  padding: 0,
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '8px'
                }}
                aria-label={item.ariaLabel}
                onMouseEnter={(e) => {
                  handleMouseEnter(item.label, e);
                }}
                onMouseLeave={(e) => {
                  handleMouseLeave();
                }}
              >
                {isActive && (
                  <>
                    <div 
                      style={{
                        position: 'absolute',
                        left: '2px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '2px',
                        height: '24px',
                        backgroundColor: '#E85102',
                        borderRadius: '8px',
                      }}
                    />
                    <svg
                      style={{
                        position: 'absolute',
                        inset: '6px',
                        pointerEvents: 'none',
                      }}
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

                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                }}>
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
        
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
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
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '40px',
              background: 'transparent',
              border: 0,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              padding: 0,
              borderRadius: '8px'
            }}
            aria-label="Open Settings"
            onClick={handleSettingsClick}
            onMouseEnter={(e) => {
              handleActionMouseEnter('settings', e);
            }}
            onMouseLeave={(e) => {
              handleActionMouseLeave();
            }}
          />
          
          <button
            type="button"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '40px',
              background: 'transparent',
              border: 0,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              padding: 0,
              borderRadius: '8px'
            }}
            aria-label="Get Support"
            onClick={handleSupportClick}
            onMouseEnter={(e) => {
              handleActionMouseEnter('support', e);
            }}
            onMouseLeave={(e) => {
              handleActionMouseLeave();
            }}
          />
        </div>
      </div>

      {hoveredItem && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltipPosition.left}px`,
            top: `${tooltipPosition.top}px`,
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 9999,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            border: '1px solid #2a2a2a',
            transform: 'translateY(-50%)',
          }}
        >
          {hoveredItem}
        </div>
      )}
    </div>
  );
};

export default React.memo(Sidebar);