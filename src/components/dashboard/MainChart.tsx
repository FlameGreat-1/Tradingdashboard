'use client';

import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface MainChartProps {
  symbol?: string;
  className?: string;
}

export const MainChart: React.FC<MainChartProps> = ({
  symbol = 'EUR/USD',
  className = '',
}) => {
  const [selectedInterval, setSelectedInterval] = useState('1H');

  const intervals = ['1m', '5m', '15m', '30m', '1H', '4H', '1D', '1W'];
  const pricePoints = [1.0880, 1.0860, 1.0840, 1.0820, 1.0800];
  const timePoints = ['09:00', '12:00', '15:00', '18:00', '21:00'];

  return (
    <Card className={`w-full h-full flex flex-col ${className}`} padding="none">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-text-primary">{symbol}</h3>
          <Badge variant="success">+0.14%</Badge>
          <span className="text-xs text-text-muted">1.0845</span>
        </div>

        <div className="flex items-center gap-1 bg-background-main rounded-lg p-1">
          {intervals.map((interval) => (
            <button
              key={interval}
              onClick={() => setSelectedInterval(interval)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                selectedInterval === interval
                  ? 'bg-primary text-white'
                  : 'text-text-muted hover:text-text-primary hover:bg-background-hover'
              }`}
            >
              {interval}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-xs px-2 py-1">
            Indicators
          </Button>
          <Button variant="ghost" size="sm" className="text-xs px-2 py-1">
            Drawing Tools
          </Button>
        </div>
      </div>

      <div className="relative flex-1 bg-background-main overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="#1C1B20"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl text-text-muted mb-4">📈</div>
            <p className="text-text-muted text-sm">Chart Component</p>
            <p className="text-text-muted text-xs mt-2">
              Integrate TradingView, Lightweight Charts, or custom chart library
            </p>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-12 bg-background-sidebar border-l border-border flex flex-col justify-between py-2">
          {pricePoints.map((price, idx) => (
            <div key={idx} className="px-1 text-xs text-text-muted text-right">
              {price.toFixed(4)}
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-12 h-8 bg-background-sidebar border-t border-border flex items-center justify-between px-3">
          {timePoints.map((time, idx) => (
            <span key={idx} className="text-xs text-text-muted">
              {time}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-1.5 border-t border-border bg-background-sidebar flex-shrink-0">
        <div className="flex items-center gap-3 text-xs">
          <span className="text-text-muted">Volume: 1,500,000</span>
          <span className="text-text-muted">High: 1.0865</span>
          <span className="text-text-muted">Low: 1.0825</span>
        </div>
        <div className="text-xs text-text-muted">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </Card>
  );
};

export default MainChart;
