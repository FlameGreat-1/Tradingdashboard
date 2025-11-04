// ============================================
// __________________FLAME GREAT______________________________________
// ============================================

/*

++++++++++++++ ONLY THE MOCK DATA HERE IS USED FOR VISUAL PURPOSE ONLY +++++++++++++++++++

*/

import { api } from '@/lib/api';
import {
  Account,
  Position,
  Trade,
  Instrument,
  DashboardStats,
  ApiResponse,
} from '@/types/dashboard';
import { API_ENDPOINTS } from '@/utils/constants';

export class DashboardService {
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await api.get<ApiResponse<DashboardStats>>(
        API_ENDPOINTS.DASHBOARD
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch dashboard stats');
    } catch (error) {
      console.error('Dashboard stats error:', error);
      return this.getMockDashboardStats();
    }
  }

  static async getAccountInfo(accountId: string): Promise<Account> {
    try {
      const response = await api.get<ApiResponse<Account>>(
        `${API_ENDPOINTS.ACCOUNT}/${accountId}`
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch account info');
    } catch (error) {
      console.error('Account info error:', error);
      throw error;
    }
  }

  static async getOpenPositions(accountId: string): Promise<Position[]> {
    try {
      const response = await api.get<ApiResponse<Position[]>>(
        API_ENDPOINTS.POSITIONS,
        { accountId, status: 'OPEN' }
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch positions');
    } catch (error) {
      console.error('Positions error:', error);
      return [];
    }
  }

  static async getTradeHistory(
    accountId: string,
    limit: number = 50
  ): Promise<Trade[]> {
    try {
      const response = await api.get<ApiResponse<Trade[]>>(
        API_ENDPOINTS.TRADES,
        { accountId, limit }
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch trade history');
    } catch (error) {
      console.error('Trade history error:', error);
      return [];
    }
  }

  static async searchInstruments(query: string): Promise<Instrument[]> {
    try {
      const response = await api.get<ApiResponse<Instrument[]>>(
        API_ENDPOINTS.INSTRUMENTS,
        { search: query }
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to search instruments');
    } catch (error) {
      console.error('Instrument search error:', error);
      return [];
    }
  }

  static async getInstrument(symbol: string): Promise<Instrument | null> {
    try {
      const response = await api.get<ApiResponse<Instrument>>(
        `${API_ENDPOINTS.INSTRUMENTS}/${symbol}`
      );

      if (response.success && response.data) {
        return response.data;
      }

      return null;
    } catch (error) {
      console.error('Instrument fetch error:', error);
      return null;
    }
  }

  static async updateAccountSettings(
    accountId: string,
    settings: Partial<Account>
  ): Promise<Account> {
    try {
      const response = await api.patch<ApiResponse<Account>>(
        `${API_ENDPOINTS.ACCOUNT}/${accountId}`,
        settings
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to update account settings');
    } catch (error) {
      console.error('Update account error:', error);
      throw error;
    }
  }

  private static getMockDashboardStats(): DashboardStats {
    return {
      availableBalance: 10000.0,
      equity: 10660.0,
      marginUsed: 660.0,
      marginFree: 600.0,
      marginLevel: 266.36,
      totalUnrealizedPL: 2304.92,
      timeZone: 'ET',
      currentTime: new Date().toLocaleTimeString('en-US', {
        hour12: false,
        timeZone: 'America/New_York',
      }),
    };
  }

  static getMockPositions(): Position[] {
    return [
      {
        id: 'pos-001',
        symbol: 'EUR/USD',
        type: 'BUY',
        volume: 1.0,
        openPrice: 1.0845,
        currentPrice: 1.0865,
        stopLoss: 1.0825,
        takeProfit: 1.0885,
        profit: 200.0,
        commission: -5.0,
        swap: -2.0,
        openTime: new Date(Date.now() - 3600000 * 2),
      },
      {
        id: 'pos-002',
        symbol: 'GBP/USD',
        type: 'SELL',
        volume: 0.5,
        openPrice: 1.2645,
        currentPrice: 1.2625,
        stopLoss: 1.2665,
        takeProfit: 1.2605,
        profit: 100.0,
        commission: -2.5,
        swap: -1.0,
        openTime: new Date(Date.now() - 3600000 * 5),
      },
    ];
  }

  static getMockInstruments(): Instrument[] {
    return [
      {
        symbol: 'EUR/USD',
        name: 'Euro vs US Dollar',
        category: 'FOREX',
        bid: 1.0845,
        ask: 1.0847,
        spread: 0.0002,
        change: 0.0015,
        changePercent: 0.14,
        high: 1.0865,
        low: 1.0825,
        volume: 1500000,
      },
      {
        symbol: 'GBP/USD',
        name: 'British Pound vs US Dollar',
        category: 'FOREX',
        bid: 1.2645,
        ask: 1.2647,
        spread: 0.0002,
        change: -0.0025,
        changePercent: -0.2,
        high: 1.2675,
        low: 1.2635,
        volume: 1200000,
      },
      {
        symbol: 'USD/JPY',
        name: 'US Dollar vs Japanese Yen',
        category: 'FOREX',
        bid: 149.25,
        ask: 149.27,
        spread: 0.02,
        change: 0.35,
        changePercent: 0.23,
        high: 149.45,
        low: 148.95,
        volume: 2000000,
      },
    ];
  }
}

export class RealTimeDataService {
  private static wsClient: any = null;

  static subscribeToPriceUpdates(
    symbols: string[],
    callback: (data: any) => void
  ): void {
    if (typeof window === 'undefined') return;

    const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';

    try {
      this.wsClient = new api.WebSocketClient(WS_URL);
      this.wsClient.connect((data: any) => {
        callback(data);
      });

      this.wsClient.send({
        action: 'subscribe',
        symbols,
      });
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  }

  static unsubscribePriceUpdates(): void {
    if (this.wsClient) {
      this.wsClient.disconnect();
      this.wsClient = null;
    }
  }

  static updateSubscription(symbols: string[]): void {
    if (this.wsClient) {
      this.wsClient.send({
        action: 'updateSubscription',
        symbols,
      });
    }
  }
}

export class NotificationService {
  static async requestPermission(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      return await Notification.requestPermission();
    }
    return 'denied';
  }

  static showNotification(title: string, options?: NotificationOptions): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        ...options,
      });
    }
  }

  static showPriceAlert(symbol: string, price: number, condition: string): void {
    this.showNotification('Price Alert', {
      body: `${symbol} ${condition} ${price}`,
      tag: `price-alert-${symbol}`,
    });
  }

  static showTradeNotification(
    type: 'opened' | 'closed',
    symbol: string,
    profit?: number
  ): void {
    const title = type === 'opened' ? 'Trade Opened' : 'Trade Closed';
    const body =
      type === 'opened'
        ? `Position opened for ${symbol}`
        : `Position closed for ${symbol}. P/L: ${profit?.toFixed(2)}`;

    this.showNotification(title, {
      body,
      tag: `trade-${symbol}`,
    });
  }
}

export default {
  DashboardService,
  RealTimeDataService,
  NotificationService,
};
