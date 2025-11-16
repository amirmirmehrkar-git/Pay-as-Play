/**
 * Play and Pay SDK - Analytics Module
 * Fetches user/session reports and analytics data
 */

import { getConfig, isDemoMode } from './config.js';
import { getHeaders } from './auth.js';
import { logger, formatCurrency, formatDuration } from './utils.js';
import { getSessionHistory } from './billing.js';

/**
 * Get user analytics
 * @param {Object} params - Analytics parameters
 * @param {string} params.userId - User ID
 * @param {string} params.from - Start date (ISO string or Date)
 * @param {string} params.to - End date (ISO string or Date)
 * @returns {Promise<Object>} Analytics data
 */
export async function getUserAnalytics({ userId, from, to }) {
  if (!userId) {
    throw new Error('User ID is required');
  }
  
  if (isDemoMode()) {
    logger.debug('Demo mode: returning mock analytics');
    return getMockAnalytics(userId);
  }
  
  try {
    const config = getConfig();
    const params = new URLSearchParams({
      userId,
      ...(from && { from: typeof from === 'string' ? from : from.toISOString() }),
      ...(to && { to: typeof to === 'string' ? to : to.toISOString() })
    });
    
    const response = await fetch(`${config.apiBaseUrl}/analytics/user?${params}`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Analytics request failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    logger.error('Error getting user analytics:', error);
    throw error;
  }
}

/**
 * Get partner analytics
 * @param {Object} params - Analytics parameters
 * @param {string} params.partnerId - Partner ID
 * @param {string} params.from - Start date (ISO string or Date)
 * @param {string} params.to - End date (ISO string or Date)
 * @returns {Promise<Object>} Partner analytics data
 */
export async function getPartnerAnalytics({ partnerId, from, to }) {
  if (!partnerId) {
    throw new Error('Partner ID is required');
  }
  
  if (isDemoMode()) {
    logger.debug('Demo mode: returning mock partner analytics');
    return getMockPartnerAnalytics(partnerId);
  }
  
  try {
    const config = getConfig();
    const params = new URLSearchParams({
      partnerId,
      ...(from && { from: typeof from === 'string' ? from : from.toISOString() }),
      ...(to && { to: typeof to === 'string' ? to : to.toISOString() })
    });
    
    const response = await fetch(`${config.apiBaseUrl}/analytics/partner?${params}`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Partner analytics request failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    logger.error('Error getting partner analytics:', error);
    throw error;
  }
}

/**
 * Get session report
 * @param {string} sessionId - Session ID
 * @returns {Promise<Object>} Session report
 */
export async function getSessionReport(sessionId) {
  if (!sessionId) {
    throw new Error('Session ID is required');
  }
  
  if (isDemoMode()) {
    logger.debug('Demo mode: returning mock session report');
    return getMockSessionReport(sessionId);
  }
  
  try {
    const config = getConfig();
    const response = await fetch(`${config.apiBaseUrl}/analytics/session/${sessionId}`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Session report request failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    logger.error('Error getting session report:', error);
    throw error;
  }
}

/**
 * Get usage statistics
 * @param {Object} params - Statistics parameters
 * @param {string} params.userId - User ID (optional)
 * @param {string} params.contentId - Content ID (optional)
 * @param {string} params.from - Start date (optional)
 * @param {string} params.to - End date (optional)
 * @returns {Promise<Object>} Usage statistics
 */
export async function getUsageStats(params = {}) {
  if (isDemoMode()) {
    logger.debug('Demo mode: returning mock usage stats');
    return getMockUsageStats();
  }
  
  try {
    const config = getConfig();
    const queryParams = new URLSearchParams();
    
    if (params.userId) queryParams.append('userId', params.userId);
    if (params.contentId) queryParams.append('contentId', params.contentId);
    if (params.from) queryParams.append('from', typeof params.from === 'string' ? params.from : params.from.toISOString());
    if (params.to) queryParams.append('to', typeof params.to === 'string' ? params.to : params.to.toISOString());
    
    const response = await fetch(`${config.apiBaseUrl}/analytics/stats?${queryParams}`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Usage stats request failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    logger.error('Error getting usage stats:', error);
    throw error;
  }
}

// Mock data generators for demo mode
function getMockAnalytics(userId) {
  return {
    userId,
    period: {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      to: new Date().toISOString()
    },
    totalSessions: 12,
    totalWatchTime: 180 * 60 * 1000, // 180 minutes
    totalSpent: 3.60,
    averageSessionDuration: 15 * 60 * 1000, // 15 minutes
    favoriteContent: [
      { contentId: 'film123', watchTime: 60 * 60 * 1000, sessions: 4 },
      { contentId: 'series456', watchTime: 45 * 60 * 1000, sessions: 3 }
    ]
  };
}

function getMockPartnerAnalytics(partnerId) {
  return {
    partnerId,
    period: {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      to: new Date().toISOString()
    },
    totalUsers: 150,
    totalSessions: 450,
    totalRevenue: 90.00,
    totalWatchTime: 2250 * 60 * 1000, // 2250 minutes
    topContent: [
      { contentId: 'film123', revenue: 45.00, sessions: 120 },
      { contentId: 'series456', revenue: 30.00, sessions: 80 }
    ],
    engagement: {
      averageSessionDuration: 15 * 60 * 1000,
      retentionRate: 0.65
    }
  };
}

function getMockSessionReport(sessionId) {
  return {
    sessionId,
    userId: 'user123',
    contentId: 'film123',
    startedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    stoppedAt: new Date().toISOString(),
    duration: 15 * 60 * 1000,
    totalCharged: 0.30,
    ticks: [
      { tickId: 'tick_1', playedMs: 60000, charge: 0.02, timestamp: Date.now() - 14 * 60 * 1000 },
      { tickId: 'tick_2', playedMs: 60000, charge: 0.02, timestamp: Date.now() - 13 * 60 * 1000 }
    ]
  };
}

function getMockUsageStats() {
  return {
    totalUsers: 1000,
    totalSessions: 5000,
    totalWatchTime: 75000 * 60 * 1000, // 75000 minutes
    totalRevenue: 1500.00,
    averageSessionDuration: 15 * 60 * 1000,
    peakHours: [20, 21, 22], // 8-10 PM
    topContent: [
      { contentId: 'film123', views: 500, revenue: 100.00 },
      { contentId: 'series456', views: 300, revenue: 60.00 }
    ]
  };
}

export default {
  getUserAnalytics,
  getPartnerAnalytics,
  getSessionReport,
  getUsageStats
};

