/**
 * API Client Usage Examples
 * 
 * This file demonstrates how to use the API client in your components
 */

import { apiClient, getApiUrl } from './api-client';
import { getUserFriendlyErrorMessage, logApiError } from './api-errors';

// ============================================
// Example 1: Basic GET request
// ============================================

export async function fetchWalletBalance() {
  try {
    const balance = await apiClient.get<{
      balance: number;
      currency: string;
      status: 'ok' | 'warning' | 'critical';
    }>(getApiUrl('/wallet/balance'));
    
    return balance;
  } catch (error) {
    logApiError(error, 'fetchWalletBalance');
    throw new Error(getUserFriendlyErrorMessage(error));
  }
}

// ============================================
// Example 2: POST request with body
// ============================================

export async function createWithdrawal(amount: number, method: string) {
  try {
    const withdrawal = await apiClient.post<{
      withdrawalId: string;
      status: string;
    }>(
      getApiUrl('/wallet/withdraw'),
      {
        amount,
        method,
      }
    );
    
    return withdrawal;
  } catch (error) {
    logApiError(error, 'createWithdrawal');
    throw new Error(getUserFriendlyErrorMessage(error));
  }
}

// ============================================
// Example 3: PUT request with params
// ============================================

export async function updateNotificationSettings(settings: {
  lowBalanceThreshold: number;
  emailEnabled: boolean;
}) {
  try {
    const updated = await apiClient.put<{
      success: boolean;
    }>(
      getApiUrl('/notifications/settings'),
      settings
    );
    
    return updated;
  } catch (error) {
    logApiError(error, 'updateNotificationSettings');
    throw new Error(getUserFriendlyErrorMessage(error));
  }
}

// ============================================
// Example 4: DELETE request
// ============================================

export async function deleteNotification(notificationId: string) {
  try {
    await apiClient.delete(getApiUrl(`/notifications/${notificationId}`));
  } catch (error) {
    logApiError(error, 'deleteNotification');
    throw new Error(getUserFriendlyErrorMessage(error));
  }
}

// ============================================
// Example 5: Request with query parameters
// ============================================

export async function fetchNotifications(params?: {
  page?: number;
  limit?: number;
  type?: string;
}) {
  try {
    const notifications = await apiClient.get<{
      notifications: Array<{
        id: string;
        title: string;
        message: string;
      }>;
      total: number;
    }>(
      getApiUrl('/notifications'),
      {
        params: {
          page: params?.page || 1,
          limit: params?.limit || 20,
          ...(params?.type && { type: params.type }),
        },
      }
    );
    
    return notifications;
  } catch (error) {
    logApiError(error, 'fetchNotifications');
    throw new Error(getUserFriendlyErrorMessage(error));
  }
}

// ============================================
// Example 6: Using in React component
// ============================================

/*
import { useState, useEffect } from 'react';
import { fetchWalletBalance } from '@/lib/api-example';
import { getUserFriendlyErrorMessage } from '@/lib/api-errors';

export function WalletBalance() {
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBalance() {
      try {
        setLoading(true);
        const data = await fetchWalletBalance();
        setBalance(data.balance);
        setError(null);
      } catch (err) {
        setError(getUserFriendlyErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    loadBalance();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>Balance: {balance}</div>;
}
*/

// ============================================
// Example 7: Setting authentication token
// ============================================

export function setAuthToken(token: string, refreshToken?: string) {
  apiClient.setAuthToken(token, refreshToken);
}

export function clearAuth() {
  apiClient.clearAuth();
}

// ============================================
// Example 8: Check if using mock API
// ============================================

export function isUsingMockAPI(): boolean {
  return apiClient.isMockMode();
}

