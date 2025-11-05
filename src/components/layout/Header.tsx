'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';

interface HeaderProps {
  sidebarWidth?: number;
  onSearchClick?: () => void;
  onSearchSubmit?: (query: string) => void;
  onAccountClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  sidebarWidth = 48,
  onSearchClick,
  onSearchSubmit,
  onAccountClick,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const formatTime = useCallback((date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }, []);

  const getTimezoneOffset = useCallback(() => {
    const offset = -new Date().getTimezoneOffset() / 60;
    return offset >= 0 ? `(+${offset})` : `(${offset})`;
  }, []);

  const handleSearchClick = useCallback(() => {
    setIsSearchExpanded(true);
    onSearchClick?.();
    searchInputRef.current?.focus();
    window.dispatchEvent(new CustomEvent('header:search-click'));
  }, [onSearchClick]);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        onSearchSubmit?.(searchQuery);
        window.dispatchEvent(
          new CustomEvent('header:search-submit', { detail: searchQuery })
        );
      }
    },
    [searchQuery, onSearchSubmit]
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleAccountClick = useCallback(() => {
    onAccountClick?.();
    window.dispatchEvent(new CustomEvent('header:account-click'));
  }, [onAccountClick]);

  const handleNotificationClick = useCallback(() => {
    window.dispatchEvent(new CustomEvent('header:notification-click'));
  }, []);

  const handleAvatarClick = useCallback(() => {
    window.dispatchEvent(new CustomEvent('header:avatar-click'));
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  if (!isClient) {
    return (
      <header
        className="fixed top-0 z-40 h-12 bg-gradient-to-r from-gray-900 to-gray-800"
        style={{ left: `${sidebarWidth}px`, right: 0 }}
      />
    );
  }

  return (
    <>
      <style jsx>{`
        .header-container {
          left: ${sidebarWidth}px;
          right: 0;
          height: 50px;
          background: linear-gradient(90deg, #1a1a1a 0%, #232323 50%, #1a1a1a 100%);
        }

        .divider {
          width: 1px;
          height: 28px;
          background: linear-gradient(180deg, transparent 0%, #374151 50%, transparent 100%);
          flex-shrink: 0;
        }

        .margin-group {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .search-container {
          position: relative;
          display: inline-block;
        }

        .search-input {
          position: absolute;
          left: 35px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 12px;
          width: 115px;
          z-index: 10;
        }

        .search-input::placeholder {
          color: transparent;
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ef4444;
          color: #ffffff;
          font-size: 9px;
          font-weight: 600;
          min-width: 16px;
          height: 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          border: 2px solid #1a1a1a;
        }

        .hamburger-menu {
          display: none;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
          padding: 6px;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          height: 32px;
        }

        .hamburger-line {
          width: 20px;
          height: 2px;
          background: #ffffff;
          transition: all 0.3s ease;
        }

        .hamburger-menu.open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger-menu.open .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger-menu.open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        .mobile-dropdown {
          position: fixed;
          top: 50px;
          right: 0;
          width: 280px;
          max-height: calc(100vh - 50px);
          background: linear-gradient(180deg, #1a1a1a 0%, #232323 100%);
          border-left: 1px solid #374151;
          box-shadow: -4px 0 12px rgba(0, 0, 0, 0.5);
          overflow-y: auto;
          z-index: 50;
          animation: slideInRight 0.3s ease-out;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .mobile-menu-item {
          padding: 16px 20px;
          border-bottom: 1px solid #374151;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .mobile-menu-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .mobile-menu-label {
          font-size: 10px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .mobile-menu-value {
          font-size: 14px;
          color: #ffffff;
          font-weight: 600;
        }

        .mobile-search-container {
          padding: 12px 20px;
          border-bottom: 1px solid #374151;
        }

        .mobile-search-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #374151;
          border-radius: 6px;
          padding: 10px 12px;
          color: #ffffff;
          font-size: 14px;
          outline: none;
        }

        .mobile-search-input:focus {
          border-color: #6366f1;
        }

        .mobile-search-input::placeholder {
          color: #6b7280;
        }

        @media (max-width: 1280px) {
          .header-stats .divider:nth-of-type(n+4) {
            display: none;
          }
          .header-stats > *:nth-child(n+9) {
            display: none;
          }
        }

        @media (max-width: 1024px) {
          .header-stats .divider:nth-of-type(n+3) {
            display: none;
          }
          .header-stats > *:nth-child(n+7) {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .header-container {
            left: ${sidebarWidth}px;
          }
          
          .header-stats {
            display: none;
          }

          .hamburger-menu {
            display: flex;
          }

          .mobile-dropdown {
            width: 100%;
            max-width: 320px;
          }
        }

        @media (max-width: 640px) {
          .header-container {
            left: 0;
            padding-left: 60px;
            padding-right: 12px;
          }

          .mobile-dropdown {
            left: 0;
            right: 0;
            width: 100%;
            max-width: 100%;
            border-left: none;
          }
        }
      `}</style>

      <header className="header-container fixed top-0 z-40 overflow-visible">
        <div className="relative w-full h-full flex items-center justify-between px-3">
          <div className="header-stats flex items-center gap-2.5">
            <Image
              src="/assets/header/icons/balance.svg"
              alt=""
              width={75}
              height={32}
              className="select-none"
            />

            <div className="divider"></div>

            <Image
              src="/assets/header/icons/equity.svg"
              alt=""
              width={75}
              height={32}
              className="select-none"
            />

            <div className="divider"></div>

            <div className="margin-group">
              <Image
                src="/assets/header/icons/remain.svg"
                alt=""
                width={28}
                height={28}
                className="select-none"
              />
              <Image
                src="/assets/header/icons/margin.svg"
                alt=""
                width={110}
                height={32}
                className="select-none"
              />
            </div>

            <div className="divider"></div>

            <Image
              src="/assets/header/icons/margin-level.svg"
              alt=""
              width={75}
              height={32}
              className="select-none"
            />

            <div className="divider"></div>

            <Image
              src="/assets/header/icons/total.svg"
              alt=""
              width={110}
              height={32}
              className="select-none"
            />

            <div className="divider"></div>

            <div className="flex flex-col items-start">
              <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                Time Zone
              </span>
              <span className="text-[13px] text-white font-semibold">
                {formatTime(currentTime)} {getTimezoneOffset()}
              </span>
            </div>

            <div className="divider"></div>

            <form onSubmit={handleSearchSubmit} className="search-container">
              <Image
                src="/assets/header/icons/search.svg"
                alt="Search"
                width={160}
                height={40}
                className="cursor-pointer select-none"
                onClick={handleSearchClick}
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
            </form>
          </div>

          <div className="desktop-actions flex items-center gap-2">
            <Image
              src="/assets/header/icons/account.svg"
              alt="Account"
              width={120}
              height={32}
              className="cursor-pointer select-none"
              onClick={handleAccountClick}
            />

            <div className="relative">
              <Image
                src="/assets/header/icons/notification.svg"
                alt="Notifications"
                width={28}
                height={28}
                className="cursor-pointer select-none"
                onClick={handleNotificationClick}
              />
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
              )}
            </div>

            <Image
              src="/assets/header/icons/avater.svg"
              alt="User avatar"
              width={110}
              height={110}
              className="cursor-pointer select-none"
              onClick={handleAvatarClick}
            />
          </div>

        </div>

        <div 
          className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
        >
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="mobile-dropdown">
          <div className="mobile-search-container">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="mobile-search-input"
              />
            </form>
          </div>

          <div className="mobile-menu-item" onClick={handleAccountClick}>
            <div className="mobile-menu-label">Account</div>
            <div className="mobile-menu-value">View Details</div>
          </div>

          <div className="mobile-menu-item" onClick={handleNotificationClick}>
            <div className="flex items-center justify-between">
              <div>
                <div className="mobile-menu-label">Notifications</div>
                <div className="mobile-menu-value">View All</div>
              </div>
              {notificationCount > 0 && (
                <span className="notification-badge" style={{ position: 'static' }}>
                  {notificationCount}
                </span>
              )}
            </div>
          </div>

          <div className="mobile-menu-item">
            <div className="mobile-menu-label">Balance</div>
            <div className="mobile-menu-value">$0.00</div>
          </div>

          <div className="mobile-menu-item">
            <div className="mobile-menu-label">Equity</div>
            <div className="mobile-menu-value">$0.00</div>
          </div>

          <div className="mobile-menu-item">
            <div className="mobile-menu-label">Margin</div>
            <div className="mobile-menu-value">$0.00</div>
          </div>

          <div className="mobile-menu-item">
            <div className="mobile-menu-label">Margin Level</div>
            <div className="mobile-menu-value">0.00%</div>
          </div>

          <div className="mobile-menu-item">
            <div className="mobile-menu-label">Total</div>
            <div className="mobile-menu-value">$0.00</div>
          </div>

          <div className="mobile-menu-item">
            <div className="mobile-menu-label">Time Zone</div>
            <div className="mobile-menu-value">
              {formatTime(currentTime)} {getTimezoneOffset()}
            </div>
          </div>

          <div className="mobile-menu-item" onClick={handleAvatarClick}>
            <div className="mobile-menu-label">Profile</div>
            <div className="mobile-menu-value">View Profile</div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Header);