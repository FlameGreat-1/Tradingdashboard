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

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

        @media (max-width: 768px) {
          .header-stats {
            display: none;
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

          <div className="flex items-center gap-2">
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
      </header>
    </>
  );
};

export default React.memo(Header);