// src/app/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MainChart from '@/components/dashboard/MainChart';
import DataTable, { positionsColumns } from '@/components/dashboard/DataTable';
import RightPanel from '@/components/dashboard/RightPanel';
import { DashboardService } from '@/services/dashboard.service';
import type { DashboardStats, Position } from '@/types/dashboard';

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [isPositionsOpen, setIsPositionsOpen] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        const statsData = await DashboardService.getDashboardStats();
        setStats(statsData);

        const positionsData = DashboardService.getMockPositions();
        setPositions(positionsData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    const interval = setInterval(fetchDashboardData, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleNavigation = (event: CustomEvent) => {
      setActiveView(event.detail.view);
    };

    window.addEventListener('sidebar:navigate' as any, handleNavigation);

    return () => {
      window.removeEventListener('sidebar:navigate' as any, handleNavigation);
    };
  }, []);

  const renderMainContent = () => {
    switch (activeView) {
      case 'add':
        return (
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 overflow-auto p-6">
              <h1 className="text-3xl font-bold text-white mb-6">Add New Item</h1>
              <div className="bg-background-card p-6 rounded-lg border border-border">
                <p className="text-text-secondary">Add new item functionality will be implemented here.</p>
              </div>
            </div>
          </div>
        );
      
      case 'new-order':
        return (
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 overflow-auto p-6">
              <h1 className="text-3xl font-bold text-white mb-6">New Order</h1>
              <div className="bg-background-card p-6 rounded-lg border border-border">
                <p className="text-text-secondary">New order functionality will be implemented here.</p>
              </div>
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 overflow-auto p-6">
              <h1 className="text-3xl font-bold text-white mb-6">Analytics</h1>
              <div className="bg-background-card p-6 rounded-lg border border-border">
                <p className="text-text-secondary">Analytics dashboard will be implemented here.</p>
              </div>
            </div>
          </div>
        );
      
      case 'wallet':
        return (
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 overflow-auto p-6">
              <h1 className="text-3xl font-bold text-white mb-6">Wallet</h1>
              <div className="bg-background-card p-6 rounded-lg border border-border">
                <p className="text-text-secondary">Wallet functionality will be implemented here.</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 overflow-hidden">
              <MainChart symbol="EUR/USD" />
            </div>

            <div 
              className={`border-t border-border bg-background-sidebar transition-all duration-300 ${
                isPositionsOpen ? 'h-40' : 'h-12'
              }`}
            >
              <button
                onClick={() => setIsPositionsOpen(!isPositionsOpen)}
                className="w-full px-6 py-3 flex items-center justify-between hover:bg-background-hover transition-colors"
              >
                <span className="text-sm font-medium text-white">
                  Open Positions {positions.length > 0 && `(${positions.length})`}
                </span>
                <span className="text-text-muted">
                  {isPositionsOpen ? <ChevronDown /> : <ChevronRight />}
                </span>
              </button>

              {isPositionsOpen && (
                <div className="h-[calc(100%-48px)] overflow-auto">
                  <DataTable
                    title=""
                    columns={positionsColumns}
                    data={positions}
                    emptyMessage="No open positions"
                  />
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  if (loading && !stats) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <img
            src="/assets/sidebar/icons/logo.svg"
            alt="Logo"
            className="w-16 h-16 animate-pulse-zoom"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) drop-shadow(0 2px 4px rgba(232, 81, 2, 0.3))'
            }}
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-full bg-background-main overflow-hidden flex">
        {renderMainContent()}

        <div 
          className={`border-l border-border bg-background-sidebar transition-all duration-300 flex-shrink-0 ${
            isRightPanelOpen ? 'w-80' : 'w-0'
          }`}
        >
          {isRightPanelOpen && (
            <div className="h-full flex flex-col w-80">
              <button
                onClick={() => setIsRightPanelOpen(false)}
                className="p-3 hover:bg-background-hover transition-colors border-b border-border flex items-center justify-end flex-shrink-0"
              >
                <span className="text-text-muted">
                  <ChevronRight />
                </span>
              </button>
              <div className="flex-1 overflow-auto p-4">
                <RightPanel />
              </div>
            </div>
          )}
        </div>

        {!isRightPanelOpen && (
          <button
            onClick={() => setIsRightPanelOpen(true)}
            className="w-10 border-l border-border bg-background-sidebar hover:bg-background-hover transition-colors flex items-center justify-center flex-shrink-0"
          >
            <span className="text-text-muted transform rotate-180 inline-block">
              <ChevronRight />
            </span>
          </button>
        )}
      </div>
    </DashboardLayout>
  );
}
