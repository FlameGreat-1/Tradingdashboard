// ============================================
// ______________________________FLAME GREAT___________________________________________________________
// ============================================


/**
 * API Client Utility
 * In a production appliaction we will definitely have _____ API client with error handling, retry logic, and TypeScript support
 */

import { ApiResponse, PaginatedResponse } from '@/types/dashboard';
import { ERROR_MESSAGES } from '@/utils/constants';

// ============================================
// API CONFIGURATION
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const API_TIMEOUT = 30000; // 30 seconds

interface RequestConfig extends RequestInit {
  timeout?: number;
  retry?: number;
  retryDelay?: number;
}

// ============================================
// ERROR HANDLING
// ============================================

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Create timeout promise for fetch requests
 */
function createTimeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), ms);
  });
}

/**
 * Sleep function for retry delay
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Build full URL with query parameters
 */
function buildUrl(endpoint: string, params?: Record<string, any>): string {
  const url = new URL(endpoint, API_BASE_URL);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
}

/**
 * Get authorization headers
 */
function getAuthHeaders(): HeadersInit {
  // In production, retrieve token from secure storage
  const token = typeof window !== 'undefined' 
    ? localStorage.getItem('auth_token') 
    : null;
  
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ============================================
// CORE API CLIENT
// ============================================

/**
 * Core fetch wrapper with timeout and retry logic
 */
async function fetchWithRetry(
  url: string,
  config: RequestConfig = {}
): Promise<Response> {
  const {
    timeout = API_TIMEOUT,
    retry = 3,
    retryDelay = 1000,
    ...fetchConfig
  } = config;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retry; attempt++) {
    try {
      const response = await Promise.race([
        fetch(url, {
          ...fetchConfig,
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
            ...fetchConfig.headers,
          },
        }),
        createTimeout(timeout),
      ]);

      // If response is ok or client error (4xx), don't retry
      if (response.ok || (response.status >= 400 && response.status < 500)) {
        return response;
      }

      // Server error (5xx), retry
      lastError = new Error(`Server error: ${response.status}`);
    } catch (error) {
      lastError = error as Error;
    }

    // Wait before retry (except on last attempt)
    if (attempt < retry - 1) {
      await sleep(retryDelay * (attempt + 1));
    }
  }

  throw lastError || new Error('Request failed');
}

/**
 * Parse response based on content type
 */
async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text as any;
  }
}

/**
 * Handle API response and errors
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await parseResponse<any>(response);
    throw new ApiError(
      error?.message || ERROR_MESSAGES.GENERIC,
      response.status,
      error
    );
  }

  return parseResponse<T>(response);
}

// ============================================
// HTTP METHODS
// ============================================

/**
 * GET request
 */
export async function get<T>(
  endpoint: string,
  params?: Record<string, any>,
  config?: RequestConfig
): Promise<T> {
  const url = buildUrl(endpoint, params);
  const response = await fetchWithRetry(url, {
    method: 'GET',
    ...config,
  });
  return handleResponse<T>(response);
}

/**
 * POST request
 */
export async function post<T>(
  endpoint: string,
  data?: any,
  config?: RequestConfig
): Promise<T> {
  const url = buildUrl(endpoint);
  const response = await fetchWithRetry(url, {
    method: 'POST',
    body: JSON.stringify(data),
    ...config,
  });
  return handleResponse<T>(response);
}

/**
 * PUT request
 */
export async function put<T>(
  endpoint: string,
  data?: any,
  config?: RequestConfig
): Promise<T> {
  const url = buildUrl(endpoint);
  const response = await fetchWithRetry(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...config,
  });
  return handleResponse<T>(response);
}

/**
 * PATCH request
 */
export async function patch<T>(
  endpoint: string,
  data?: any,
  config?: RequestConfig
): Promise<T> {
  const url = buildUrl(endpoint);
  const response = await fetchWithRetry(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    ...config,
  });
  return handleResponse<T>(response);
}

/**
 * DELETE request
 */
export async function del<T>(
  endpoint: string,
  config?: RequestConfig
): Promise<T> {
  const url = buildUrl(endpoint);
  const response = await fetchWithRetry(url, {
    method: 'DELETE',
    ...config,
  });
  return handleResponse<T>(response);
}

// ============================================
// SPECIALIZED API HELPERS
// ============================================

/**
 * Upload file with progress tracking
 */
export async function uploadFile(
  endpoint: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        const progress = (e.loaded / e.total) * 100;
        onProgress(progress);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          resolve(xhr.responseText);
        }
      } else {
        reject(new ApiError('Upload failed', xhr.status));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new ApiError('Network error'));
    });

    xhr.open('POST', buildUrl(endpoint));
    
    // Add auth headers
    const authHeaders = getAuthHeaders();
    Object.entries(authHeaders).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.send(formData);
  });
}

/**
 * Create paginated request helper
 */
export async function getPaginated<T>(
  endpoint: string,
  page: number = 1,
  pageSize: number = 20,
  params?: Record<string, any>
): Promise<PaginatedResponse<T>> {
  return get<PaginatedResponse<T>>(endpoint, {
    page,
    pageSize,
    ...params,
  });
}

// ============================================
// WEBSOCKET HELPER (for real-time data)
// ============================================

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor(private url: string) {}

  connect(onMessage: (data: any) => void, onError?: (error: Event) => void): void {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch (error) {
          console.error('WebSocket message parse error:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        onError?.(error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.attemptReconnect(onMessage, onError);
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  }

  private attemptReconnect(
    onMessage: (data: any) => void,
    onError?: (error: Event) => void
  ): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * this.reconnectAttempts;
      console.log(`Reconnecting in ${delay}ms...`);
      setTimeout(() => this.connect(onMessage, onError), delay);
    }
  }

  send(data: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  disconnect(): void {
    this.ws?.close();
    this.ws = null;
  }
}

// ============================================
// EXPORT API CLIENT
// ============================================

export const api = {
  get,
  post,
  put,
  patch,
  delete: del,
  uploadFile,
  getPaginated,
  WebSocketClient,
};

export default api;