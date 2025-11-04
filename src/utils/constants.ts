


/**
 * JUST ON PREM PURPOSE ONLY
 * Dashboard Constants
 * Application-wide constants matching Figma design specifications
 */

import { StatCard, NavItem } from '@/types/dashboard';

// ============================================
// DESIGN SYSTEM CONSTANTS
// ============================================

export const COLORS = {
  PRIMARY: '#E85102',
  PRIMARY_DARK: '#D94802',
  PRIMARY_LIGHT: '#FF5800',
  
  BACKGROUND: {
    MAIN: '#000000',
    SIDEBAR: '#0B0B0B',
    CARD: '#111111',
    HOVER: '#1C1B20',
  },
  
  BORDER: {
    DEFAULT: '#1C1B20',
    LIGHT: '#202020',
    ACTIVE: '#E85102',
  },
  
  TEXT: {
    PRIMARY: '#FFFFFF',
    SECONDARY: '#EAEAEA',
    MUTED: '#767676',
    GRAY: '#A2A2A2',
  },
  
  STATUS: {
    SUCCESS: '#2FD77B',
    ERROR: '#FF3B30',
    WARNING: '#FFCC00',
  },
} as const;

export const DIMENSIONS = {
  SIDEBAR_WIDTH: 54,
  HEADER_HEIGHT: 50,
  DASHBOARD_WIDTH: 1440,
  DASHBOARD_HEIGHT: 1024,
} as const;

// ============================================
// DASHBOARD STATS DATA
// ============================================

export const STAT_CARDS: StatCard[] = [
  {
    id: 'balance',
    label: 'Available Balance',
    value: '$10,000.00',
    type: 'currency',
    trend: 'neutral',
  },
  {
    id: 'equity',
    label: 'Equity',
    value: '$10,660.00',
    type: 'currency',
    trend: 'up',
  },
  {
    id: 'margin',
    label: 'Margin Used | Free',
    value: '$660.00 / 600.00',
    type: 'text',
    trend: 'neutral',
  },
  {
    id: 'margin-level',
    label: 'Margin Level',
    value: '266.36%',
    type: 'percentage',
    trend: 'up',
  },
  {
    id: 'unrealized-pl',
    label: 'Total Unrealized P/L',
    value: '$2,304.92',
    type: 'currency',
    trend: 'up',
  },
  {
    id: 'timezone',
    label: 'Time Zone',
    value: '13:31:08 (ET)',
    type: 'time',
    trend: 'neutral',
  },
] as const;

// ============================================
// NAVIGATION ITEMS
// ============================================

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'grid',
    path: '/dashboard',
    active: true,
  },
  {
    id: 'new-order',
    label: 'New Order',
    icon: 'plus',
    path: '/dashboard/new-order',
  },
  {
    id: 'positions',
    label: 'Positions',
    icon: 'swap',
    path: '/dashboard/positions',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'chart',
    path: '/dashboard/analytics',
  },
  {
    id: 'wallet',
    label: 'Wallet',
    icon: 'wallet',
    path: '/dashboard/wallet',
  },
] as const;

// ============================================
// TRADING CONSTANTS
// ============================================

export const TRADING_SYMBOLS = [
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'AUD/USD',
  'USD/CAD',
  'NZD/USD',
  'EUR/GBP',
  'EUR/JPY',
] as const;

export const TIME_INTERVALS = [
  { value: '1m', label: '1 Minute' },
  { value: '5m', label: '5 Minutes' },
  { value: '15m', label: '15 Minutes' },
  { value: '30m', label: '30 Minutes' },
  { value: '1h', label: '1 Hour' },
  { value: '4h', label: '4 Hours' },
  { value: '1d', label: '1 Day' },
  { value: '1w', label: '1 Week' },
  { value: '1M', label: '1 Month' },
] as const;

export const CHART_TYPES = [
  { value: 'candlestick', label: 'Candlestick' },
  { value: 'line', label: 'Line' },
  { value: 'area', label: 'Area' },
  { value: 'bar', label: 'Bar' },
] as const;

// ============================================
// USER ACCOUNT DATA
// ============================================

export const DEFAULT_USER = {
  id: 'user-001',
  name: 'Alex Rude',
  email: 'alex.rude@example.com',
  accountType: 'Main USD Account',
  avatar: '/assets/avatar-placeholder.png',
} as const;

export const DEFAULT_ACCOUNT = {
  id: 'acc-001',
  userId: 'user-001',
  accountNumber: '1444.6x11.808',
  accountType: 'Main USD Account',
  balance: 10000.00,
  equity: 10660.00,
  marginUsed: 660.00,
  marginFree: 600.00,
  marginLevel: 266.36,
  currency: 'USD',
} as const;

// ============================================
// API ENDPOINTS
// ============================================

export const API_ENDPOINTS = {
  DASHBOARD: '/api/dashboard',
  POSITIONS: '/api/positions',
  TRADES: '/api/trades',
  INSTRUMENTS: '/api/instruments',
  ACCOUNT: '/api/account',
  USER: '/api/user',
} as const;

// ============================================
// LOCAL STORAGE KEYS
// ============================================

export const STORAGE_KEYS = {
  THEME: 'dashboard-theme',
  USER_PREFERENCES: 'user-preferences',
  SELECTED_SYMBOL: 'selected-symbol',
  CHART_CONFIG: 'chart-config',
  SIDEBAR_STATE: 'sidebar-state',
} as const;

// ============================================
// FORMATTING CONSTANTS
// ============================================

export const DECIMAL_PLACES = {
  PRICE: 5,
  VOLUME: 2,
  PERCENTAGE: 2,
  CURRENCY: 2,
} as const;

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
} as const;

// ============================================
// ANIMATION DURATIONS (ms)
// ============================================

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// ============================================
// BREAKPOINTS (px)
// ============================================

export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1440,
  XLARGE: 1920,
} as const;

// ============================================
// Z-INDEX LAYERS
// ============================================

export const Z_INDEX = {
  BASE: 0,
  DROPDOWN: 100,
  MODAL: 200,
  POPOVER: 300,
  TOOLTIP: 400,
  NOTIFICATION: 500,
} as const;

// ============================================
// ERROR MESSAGES
// ============================================

export const ERROR_MESSAGES = {
  GENERIC: 'An error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  AUTH: 'Authentication failed. Please login again.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION: 'Validation error. Please check your input.',
} as const;

// ============================================
// SUCCESS MESSAGES
// ============================================

export const SUCCESS_MESSAGES = {
  TRADE_PLACED: 'Trade placed successfully',
  ORDER_UPDATED: 'Order updated successfully',
  ORDER_CANCELLED: 'Order cancelled successfully',
  SETTINGS_SAVED: 'Settings saved successfully',
} as const;