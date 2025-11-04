// ============================================
           /*_____________________FLAME GREAT______________________
// ============================================



/**
 * Dashboard Type Definitions
 * TypeScript interfaces for the  Dashboard for exp...only
 */

// ============================================
// ACCOUNT & USER TYPES
// ============================================

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  accountType: 'Main USD Account' | 'Demo Account' | 'Live Account';
}

export interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  equity: number;
  marginUsed: number;
  marginFree: number;
  marginLevel: number;
  currency: 'USD' | 'EUR' | 'GBP';
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// TRADING TYPES
// ============================================

export interface Position {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  volume: number;
  openPrice: number;
  currentPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  profit: number;
  commission: number;
  swap: number;
  openTime: Date;
}

export interface Trade {
  id: string;
  accountId: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  volume: number;
  openPrice: number;
  closePrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  profit?: number;
  commission: number;
  swap: number;
  openTime: Date;
  closeTime?: Date;
  status: 'OPEN' | 'CLOSED' | 'PENDING';
}

export interface Instrument {
  symbol: string;
  name: string;
  category: 'FOREX' | 'CRYPTO' | 'STOCKS' | 'COMMODITIES' | 'INDICES';
  bid: number;
  ask: number;
  spread: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
}

// ============================================
// STATISTICS TYPES
// ============================================

export interface StatCard {
  id: string;
  label: string;
  value: string | number;
  subValue?: string;
  type: 'currency' | 'percentage' | 'text' | 'time';
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
}

export interface DashboardStats {
  availableBalance: number;
  equity: number;
  marginUsed: number;
  marginFree: number;
  marginLevel: number;
  totalUnrealizedPL: number;
  timeZone: string;
  currentTime: string;
}

// ============================================
// CHART TYPES
// ============================================

export interface ChartData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ChartConfig {
  symbol: string;
  interval: '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w' | '1M';
  chartType: 'candlestick' | 'line' | 'area' | 'bar';
  indicators: string[];
}

// ============================================
// NAVIGATION TYPES
// ============================================

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  active?: boolean;
  badge?: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  action: () => void;
  divider?: boolean;
}

// ============================================
// UI STATE TYPES
// ============================================

export interface UIState {
  sidebarCollapsed: boolean;
  darkMode: boolean;
  activePanel: 'chart' | 'positions' | 'orders' | 'history';
  selectedSymbol: string;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}

// ============================================
// FORM TYPES
// ============================================

export interface TradeFormData {
  symbol: string;
  type: 'BUY' | 'SELL';
  volume: number;
  stopLoss?: number;
  takeProfit?: number;
  comment?: string;
}

export interface SearchFormData {
  query: string;
  category?: string;
  filters?: Record<string, any>;
}

// ============================================
// EXPORT ALL TYPES
// ============================================

export type {
  // Re-export for convenience
  User as DashboardUser,
  Account as TradingAccount,
  Position as TradingPosition,
  Trade as TradingTrade,
  Instrument as TradingInstrument,
  StatCard as DashboardStatCard,
  NavItem as NavigationItem,
};