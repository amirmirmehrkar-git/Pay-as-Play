/**
 * Play and Pay SDK - Billing Engine
 * Handles pay-as-you-use billing: sessions, ticks, payments
 */

import { getConfig, isDemoMode } from './config.js';
import { logger, generateId, msToMinutes, eurToPLYMinor } from './utils.js';
import { transfer } from './wallet.js';
import { getWalletConnector, isWalletConnected } from './wallet-connect.js';

// Active sessions storage
const activeSessions = new Map();

/**
 * Start a billing session
 * @param {Object} params - Session parameters
 * @param {string} params.contentId - Content ID
 * @param {number} params.pricePerMinute - Price per minute in EUR
 * @param {string} params.userAddress - User's Algorand address
 * @param {Object} params.metadata - Optional metadata
 * @returns {Promise<Object>} Session object
 */
export async function startSession({ contentId, pricePerMinute, userAddress, metadata = {} }) {
  if (!contentId || !pricePerMinute || !userAddress) {
    throw new Error('Missing required parameters: contentId, pricePerMinute, userAddress');
  }
  
  if (pricePerMinute <= 0) {
    throw new Error('Price per minute must be positive');
  }
  
  // Use WalletConnect address if connected, otherwise use provided address
  let finalUserAddress = userAddress;
  if (isWalletConnected()) {
    const { getConnectedAddress } = await import('./wallet-connect.js');
    const connectedAddr = getConnectedAddress();
    if (connectedAddr) {
      finalUserAddress = connectedAddr;
      logger.debug('Using WalletConnect address:', connectedAddr);
    }
  }
  
  const sessionId = generateId('session');
  const session = {
    sessionId,
    contentId,
    pricePerMinute,
    userAddress: finalUserAddress,
    status: 'active',
    startTime: Date.now(),
    totalPlayedMs: 0,
    totalChargeEUR: 0,
    totalChargeMinor: 0,
    ticks: [],
    metadata
  };
  
  activeSessions.set(sessionId, session);
  
  logger.debug(`Session started: ${sessionId} for content ${contentId}`);
  
  return session;
}

/**
 * Generate tick ID
 */
function generateTickId(sessionId) {
  return `${sessionId}-tick-${Date.now()}`;
}

/**
 * Send a billing tick (per-minute charge)
 * @param {Object} params - Tick parameters
 * @param {string} params.sessionId - Session ID
 * @param {number} params.playedMs - Played time in milliseconds
 * @param {string} params.tickId - Unique tick ID (optional, auto-generated)
 * @returns {Promise<Object>} Tick result
 */
export async function sendTick({ sessionId, playedMs, tickId = null }) {
  const session = activeSessions.get(sessionId);
  
  if (!session) {
    throw new Error(`Session not found: ${sessionId}`);
  }
  
  if (session.status !== 'active') {
    throw new Error(`Session is not active: ${session.status}`);
  }
  
  if (playedMs <= 0) {
    throw new Error('Played time must be positive');
  }
  
  // Generate tick ID if not provided
  const finalTickId = tickId || generateTickId(sessionId);
  
  // Calculate charge
  const minutes = msToMinutes(playedMs);
  const chargeEUR = session.pricePerMinute * minutes;
  const chargeMinor = eurToPLYMinor(chargeEUR);
  
  logger.debug(`Tick ${finalTickId}: ${minutes.toFixed(2)} min = €${chargeEUR.toFixed(2)} (${chargeMinor} PLY minor)`);
  
  // Execute payment using WalletConnect if available
  let txId = null;
  let paymentSuccess = false;
  
  if (!isDemoMode() && isWalletConnected() && session.userAddress) {
    try {
      const config = getConfig();
      const providerAddr = config.providerAddr;
      
      if (!providerAddr) {
        logger.warn('Provider address not configured, skipping payment');
      } else {
        // Get wallet connector for signing
        const walletConnector = getWalletConnector();
        
        // Calculate fee split
        const feePct = config.platformFeePct || 500; // 5% default
        const feeMinor = Math.floor((chargeMinor * feePct) / 10000);
        const providerAmount = chargeMinor - feeMinor;
        
        // Transfer to provider using WalletConnect
        const result = await transfer(
          session.userAddress,
          providerAddr,
          providerAmount,
          walletConnector // Use WalletConnect signer
        );
        
        txId = result.txId;
        paymentSuccess = result.confirmed;
        
        // Transfer fee to platform (if configured)
        if (feeMinor > 0 && config.platformAddr) {
          try {
            await transfer(
              session.userAddress,
              config.platformAddr,
              feeMinor,
              walletConnector // Use WalletConnect signer
            );
          } catch (error) {
            logger.error('Error transferring platform fee:', error);
          }
        }
      }
    } catch (error) {
      logger.error('Payment error:', error);
      // Continue even if payment fails (will be retried)
    }
  } else {
    // Demo mode or wallet not connected
    txId = `DEMO-TX-${Date.now()}`;
    paymentSuccess = true;
    logger.debug('Demo mode: payment simulated');
  }
  
  // Update session
  session.totalPlayedMs += playedMs;
  session.totalChargeEUR += chargeEUR;
  session.totalChargeMinor += chargeMinor;
  
  const tick = {
    tickId: finalTickId,
    timestamp: Date.now(),
    playedMs,
    minutes,
    chargeEUR,
    chargeMinor,
    txId,
    paymentSuccess
  };
  
  session.ticks.push(tick);
  
  logger.debug(`Tick ${finalTickId} processed: ${paymentSuccess ? 'paid' : 'pending'}`);
  
  return tick;
}

/**
 * Stop a billing session
 * @param {string} sessionId - Session ID
 * @returns {Promise<Object>} Session summary
 */
export async function stopSession(sessionId) {
  const session = activeSessions.get(sessionId);
  
  if (!session) {
    throw new Error(`Session not found: ${sessionId}`);
  }
  
  if (session.status === 'stopped') {
    logger.warn(`Session ${sessionId} already stopped`);
    return session;
  }
  
  session.status = 'stopped';
  session.endTime = Date.now();
  session.durationMs = session.endTime - session.startTime;
  session.totalMinutes = msToMinutes(session.totalPlayedMs);
  
  logger.debug(`Session stopped: ${sessionId}, total: ${session.totalMinutes.toFixed(2)} min, €${session.totalChargeEUR.toFixed(2)}`);
  
  // Return summary
  return {
    sessionId: session.sessionId,
    contentId: session.contentId,
    status: session.status,
    startTime: session.startTime,
    endTime: session.endTime,
    durationMs: session.durationMs,
    totalPlayedMs: session.totalPlayedMs,
    totalMinutes: session.totalMinutes,
    totalChargeEUR: session.totalChargeEUR,
    totalChargeMinor: session.totalChargeMinor,
    ticksCount: session.ticks.length,
    ticks: session.ticks
  };
}

/**
 * Get active session
 * @param {string} sessionId - Session ID
 * @returns {Object|null} Session object or null
 */
export function getSession(sessionId) {
  return activeSessions.get(sessionId) || null;
}

/**
 * Get all active sessions
 * @returns {Array} Array of active sessions
 */
export function getActiveSessions() {
  return Array.from(activeSessions.values()).filter(s => s.status === 'active');
}

/**
 * Get session history
 * @param {string} userAddress - User address (optional)
 * @returns {Array} Array of sessions
 */
export function getSessionHistory(userAddress = null) {
  const sessions = Array.from(activeSessions.values());
  
  if (userAddress) {
    return sessions.filter(s => s.userAddress === userAddress);
  }
  
  return sessions;
}

export default {
  startSession,
  sendTick,
  stopSession,
  getSession,
  getActiveSessions,
  getSessionHistory
};
