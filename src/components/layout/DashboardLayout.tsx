'use client';

import React, { useCallback } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  onSearchClick?: () => void;
  onAccountClick?: () => void;
  onSettingsClick?: () => void;
  onSupportClick?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  className = '',
  onSearchClick,
  onAccountClick,
  onSettingsClick,
  onSupportClick,
}) => {
  const handleSearchClick = useCallback(() => {
    onSearchClick?.();
  }, [onSearchClick]);

  const handleAccountClick = useCallback(() => {
    onAccountClick?.();
  }, [onAccountClick]);

  const handleSettingsClick = useCallback(() => {
    onSettingsClick?.();
  }, [onSettingsClick]);

  const handleSupportClick = useCallback(() => {
    onSupportClick?.();
  }, [onSupportClick]);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        backgroundColor: 'var(--color-background-main)'
      }}
    >
      <Sidebar
        width={48}
        onSettingsClick={handleSettingsClick}
        onSupportClick={handleSupportClick}
      />

      <Header
        sidebarWidth={48}
        onSearchClick={handleSearchClick}
        onAccountClick={handleAccountClick}
      />

      <main
        style={{
          position: 'absolute',
          left: '48px',
          top: '48px',
          right: 0,
          bottom: 0,
          width: 'calc(100% - 48px)',
          height: 'calc(100% - 48px)',
          overflow: 'auto',
          backgroundColor: 'var(--color-background-main)'
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default React.memo(DashboardLayout);
