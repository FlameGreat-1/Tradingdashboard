'use client';

import React, { useState, useCallback } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatPrice } from '@/utils/formatters';

interface MarketItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface NewsItem {
  id: string;
  category: string;
  time: string;
  title: string;
  summary: string;
}

interface EconomicEvent {
  time: string;
  event: string;
  impact: 'high' | 'medium' | 'low';
  currency: string;
}

interface RightPanelProps {
  className?: string;
  onSymbolClick?: (symbol: string) => void;
  onNewsClick?: (newsId: string) => void;
  onAddToWatchlist?: () => void;
}

type TabType = 'market' | 'news' | 'watchlist';

const MARKET_DATA: MarketItem[] = [
  {
    symbol: 'EUR/USD',
    name: 'Euro vs US Dollar',
    price: 1.0845,
    change: 0.0015,
    changePercent: 0.14,
  },
  {
    symbol: 'GBP/USD',
    name: 'British Pound vs US Dollar',
    price: 1.2645,
    change: -0.0025,
    changePercent: -0.2,
  },
  {
    symbol: 'USD/JPY',
    name: 'US Dollar vs Japanese Yen',
    price: 149.25,
    change: 0.35,
    changePercent: 0.23,
  },
  {
    symbol: 'AUD/USD',
    name: 'Australian Dollar vs US Dollar',
    price: 0.6532,
    change: 0.0012,
    changePercent: 0.18,
  },
  {
    symbol: 'USD/CAD',
    name: 'US Dollar vs Canadian Dollar',
    price: 1.3625,
    change: -0.0008,
    changePercent: -0.06,
  },
];

const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    category: 'Forex',
    time: '2h ago',
    title: 'EUR/USD Reaches New Monthly Highs',
    summary: 'The Euro continues its upward trend against the US Dollar amid positive economic data from the Eurozone.',
  },
  {
    id: '2',
    category: 'Central Bank',
    time: '4h ago',
    title: 'Fed Officials Signal Potential Rate Changes',
    summary: 'Federal Reserve officials hint at upcoming monetary policy adjustments in response to inflation data.',
  },
  {
    id: '3',
    category: 'Market',
    time: '6h ago',
    title: 'Asian Markets Show Strong Performance',
    summary: 'Major Asian indices close higher as investors react positively to trade developments.',
  },
];

const ECONOMIC_EVENTS: EconomicEvent[] = [
  { time: '14:30', event: 'USD GDP', impact: 'high', currency: 'USD' },
  { time: '16:00', event: 'EUR CPI', impact: 'medium', currency: 'EUR' },
  { time: '18:30', event: 'GBP Employment', impact: 'low', currency: 'GBP' },
];

const TABS: { key: TabType; label: string }[] = [
  { key: 'market', label: 'Market' },
  { key: 'news', label: 'News' },
  { key: 'watchlist', label: 'Watchlist' },
];

const RightPanel: React.FC<RightPanelProps> = ({
  className = '',
  onSymbolClick,
  onNewsClick,
  onAddToWatchlist,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('market');

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const handleSymbolClick = useCallback((symbol: string) => {
    onSymbolClick?.(symbol);
  }, [onSymbolClick]);

  const handleNewsClick = useCallback((newsId: string) => {
    onNewsClick?.(newsId);
  }, [onNewsClick]);

  const handleAddToWatchlist = useCallback(() => {
    onAddToWatchlist?.();
  }, [onAddToWatchlist]);

  const getImpactVariant = (impact: string) => {
    switch (impact) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <div className={`flex flex-col gap-4 h-full ${className}`}>
      <Card padding="none" className="flex-shrink-0">
        <div className="flex border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === tab.key
                  ? 'text-primary border-primary'
                  : 'text-text-muted border-transparent hover:text-text-primary'
              }`}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-h-96 overflow-auto">
          {activeTab === 'market' && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-text-primary">
                  Market Watch
                </h4>
                <button className="text-xs text-primary hover:opacity-80" type="button">
                  View All
                </button>
              </div>

              <div className="space-y-1">
                {MARKET_DATA.map((item) => {
                  const isPositive = item.changePercent >= 0;
                  return (
                    <div
                      key={item.symbol}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-background-hover transition-colors cursor-pointer"
                      onClick={() => handleSymbolClick(item.symbol)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-text-primary truncate">
                          {item.symbol}
                        </div>
                        <div className="text-xs text-text-muted truncate">
                          {item.name}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <div className="text-sm font-medium text-text-primary">
                          {formatPrice(item.price)}
                        </div>
                        <div className={`text-xs ${isPositive ? 'text-success' : 'text-error'}`}>
                          {isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-text-primary">
                  Market News
                </h4>
              </div>
              <div className="space-y-2">
                {NEWS_DATA.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg hover:bg-background-hover transition-colors cursor-pointer"
                    onClick={() => handleNewsClick(item.id)}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <Badge variant="neutral" size="sm">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-text-muted">
                        {item.time}
                      </span>
                    </div>
                    <h5 className="text-sm font-medium mb-1 line-clamp-2 text-text-primary">
                      {item.title}
                    </h5>
                    <p className="text-xs line-clamp-2 text-text-muted">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'watchlist' && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-text-primary">
                  My Watchlist
                </h4>
                <button
                  className="text-xs text-primary hover:opacity-80"
                  onClick={handleAddToWatchlist}
                  type="button"
                >
                  Add Symbol
                </button>
              </div>
              <div className="text-center py-12 text-text-muted">
                <div className="text-sm mb-2">No symbols in watchlist</div>
                <button
                  className="text-xs text-primary hover:opacity-80"
                  onClick={handleAddToWatchlist}
                  type="button"
                >
                  Add your first symbol
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-text-primary">
            Economic Calendar
          </h4>
          <button className="text-xs text-primary hover:opacity-80" type="button">
            View Full
          </button>
        </div>
        <div className="space-y-1">
          {ECONOMIC_EVENTS.map((event, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-background-hover transition-colors"
            >
              <div className="text-xs w-12 flex-shrink-0 text-text-muted">
                {event.time}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate text-text-primary">
                  {event.event}
                </div>
              </div>
              <Badge variant={getImpactVariant(event.impact)} size="sm">
                {event.impact}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default React.memo(RightPanel);