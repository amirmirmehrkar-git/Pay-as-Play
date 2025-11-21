/**
 * API Migration Helper
 * Utilities for migrating from mock APIs to real backend APIs
 */

import { apiClient, getApiUrl } from './api-client';
import { isMockMode } from './api-config';

/**
 * Check if we should use mock or real API
 */
export function shouldUseMock(): boolean {
  return isMockMode();
}

/**
 * Call real backend API or fallback to mock
 */
export async function callBackendAPI<T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: unknown;
    params?: Record<string, string | number | boolean>;
  } = {},
): Promise<T> {
  if (shouldUseMock()) {
    // In mock mode, this will be handled by Next.js API routes
    throw new Error('Mock mode - use Next.js API routes');
  }

  // Call real backend
  const response = await apiClient.request<T>({
    method: options.method || 'GET',
    url: getApiUrl(endpoint),
    body: options.body,
    params: options.params,
  });

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'API request failed');
  }

  return response.data;
}

/**
 * Migrate API route to use real backend (Proxy Pattern)
 */
export async function proxyToBackend(
  endpoint: string,
  request: Request,
): Promise<Response> {
  try {
    const method = request.method as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    const body = method !== 'GET' ? await request.json().catch(() => null) : undefined;
    const url = new URL(request.url);
    const params: Record<string, string> = {};
    
    url.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    const data = await callBackendAPI(endpoint, {
      method,
      body,
      params,
    });

    return Response.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: {
          code: 'API_ERROR',
          message: error?.message || 'Failed to call backend API',
        },
      },
      { status: 500 },
    );
  }
}

