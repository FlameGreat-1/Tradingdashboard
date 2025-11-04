/**
 * Formatters Utility
 * App-wide formatting functions for currency, numbers, dates, and percentages
 * We can as well need to use this if later needs project continuation
 */

import { DECIMAL_PLACES, CURRENCY_SYMBOLS } from './constants';

// ============================================
// CURRENCY FORMATTERS
// ============================================

/**
 * Format number as currency with symbol
 * @param value - Numeric value to format
 * @param currency - Currency code (USD, EUR, GBP, JPY)
 * @param decimals - Number of decimal places
 * @returns Formatted currency string (e.g., "$10,000.00")
 */
export function formatCurrency(
  value: number,
  currency: keyof typeof CURRENCY_SYMBOLS = 'USD',
  decimals: number = DECIMAL_PLACES.CURRENCY
): string {
  try {
    const symbol = CURRENCY_SYMBOLS[currency] || '$';
    const isNegative = value < 0;
    const absValue = Math.abs(value);
    
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(absValue);
    
    return isNegative ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
  } catch (error) {
    console.error('Currency formatting error:', error);
    return `$${value.toFixed(decimals)}`;
  }
}

/**
 * Format currency without symbol (for table displays)
 */
export function formatCurrencyValue(
  value: number,
  decimals: number = DECIMAL_PLACES.CURRENCY
): string {
  try {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  } catch (error) {
    return value.toFixed(decimals);
  }
}

/**
 * Format profit/loss with color indication
 */
export function formatProfitLoss(value: number): {
  formatted: string;
  color: string;
  trend: 'up' | 'down' | 'neutral';
} {
  const formatted = formatCurrency(value);
  
  if (value > 0) {
    return { formatted: `+${formatted}`, color: '#2FD77B', trend: 'up' };
  } else if (value < 0) {
    return { formatted, color: '#FF3B30', trend: 'down' };
  } else {
    return { formatted, color: '#767676', trend: 'neutral' };
  }
}

// ============================================
// NUMBER FORMATTERS
// ============================================

/**
 * Format number with thousand separators
 */
export function formatNumber(
  value: number,
  decimals: number = 0
): string {
  try {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  } catch (error) {
    return value.toFixed(decimals);
  }
}

/**
 * Format volume/quantity
 */
export function formatVolume(
  value: number,
  decimals: number = DECIMAL_PLACES.VOLUME
): string {
  return formatNumber(value, decimals);
}

/**
 * Format price with appropriate decimal places
 */
export function formatPrice(
  value: number,
  decimals: number = DECIMAL_PLACES.PRICE
): string {
  return formatNumber(value, decimals);
}

/**
 * Compact large numbers (1000 -> 1K, 1000000 -> 1M)
 */
export function formatCompactNumber(value: number): string {
  try {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(value);
  } catch (error) {
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
    return value.toString();
  }
}

// ============================================
// PERCENTAGE FORMATTERS
// ============================================

/**
 * Format percentage value
 */
export function formatPercentage(
  value: number,
  decimals: number = DECIMAL_PLACES.PERCENTAGE,
  includeSign: boolean = false
): string {
  const formatted = value.toFixed(decimals);
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${formatted}%`;
}

/**
 * Format margin level percentage
 */
export function formatMarginLevel(value: number): string {
  return formatPercentage(value, 2);
}

/**
 * Format change percentage with color
 */
export function formatChangePercentage(value: number): {
  formatted: string;
  color: string;
  trend: 'up' | 'down' | 'neutral';
} {
  const formatted = formatPercentage(value, 2, true);
  
  if (value > 0) {
    return { formatted, color: '#2FD77B', trend: 'up' };
  } else if (value < 0) {
    return { formatted, color: '#FF3B30', trend: 'down' };
  } else {
    return { formatted, color: '#767676', trend: 'neutral' };
  }
}

// ============================================
// DATE & TIME FORMATTERS
// ============================================

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string | number): string {
  try {
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(dateObj);
  } catch (error) {
    return 'Invalid Date';
  }
}

/**
 * Format time to readable string
 */
export function formatTime(date: Date | string | number): string {
  try {
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(dateObj);
  } catch (error) {
    return 'Invalid Time';
  }
}

/**
 * Format date and time together
 */
export function formatDateTime(date: Date | string | number): string {
  try {
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(dateObj);
  } catch (error) {
    return 'Invalid DateTime';
  }
}

/**
 * Format time with timezone (e.g., "13:31:08 (ET)")
 */
export function formatTimeWithZone(
  date: Date | string | number,
  timezone: string = 'ET'
): string {
  const time = formatTime(date);
  return `${time} (${timezone})`;
}

/**
 * Get relative time string (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string | number): string {
  try {
    const dateObj = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    return formatDate(dateObj);
  } catch (error) {
    return 'Unknown';
  }
}

// ============================================
// SYMBOL & TEXT FORMATTERS
// ============================================

/**
 * Format trading symbol (e.g., "EURUSD" -> "EUR/USD")
 */
export function formatSymbol(symbol: string): string {
  if (symbol.includes('/')) return symbol;
  if (symbol.length === 6) {
    return `${symbol.slice(0, 3)}/${symbol.slice(3)}`;
  }
  return symbol;
}

/**
 * Format account number with masking
 */
export function formatAccountNumber(
  accountNumber: string,
  maskLength: number = 4
): string {
  if (accountNumber.length <= maskLength) return accountNumber;
  const visible = accountNumber.slice(-maskLength);
  const masked = '*'.repeat(accountNumber.length - maskLength);
  return `${masked}${visible}`;
}

/**
 * Truncate long text with ellipsis
 */
export function truncateText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

// ============================================
// VALIDATION HELPERS
// ============================================

/**
 * Check if value is valid number
 */
export function isValidNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Parse string to number safely
 */
export function parseNumber(value: string): number | null {
  const parsed = parseFloat(value);
  return isValidNumber(parsed) ? parsed : null;
}

/**
 * Format input value for display
 */
export function formatInputValue(value: string, type: 'currency' | 'number' | 'percentage'): string {
  const num = parseNumber(value);
  if (num === null) return value;

  switch (type) {
    case 'currency':
      return formatCurrency(num);
    case 'percentage':
      return formatPercentage(num);
    case 'number':
    default:
      return formatNumber(num);
  }
}