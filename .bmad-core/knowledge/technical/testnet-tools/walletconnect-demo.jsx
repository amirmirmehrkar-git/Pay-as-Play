/**
 * WalletConnect Demo Component for Play and Pay
 * 
 * This component demonstrates:
 * - Connecting to Pera Wallet (or other Algorand wallets)
 * - User signing transactions (not server-side mnemonic)
 * - Sending ASA (PlayCoin) payments
 * 
 * Installation:
 *   npm install @perawallet/connect algosdk
 * 
 * Usage:
 *   import WalletConnectDemo from './walletconnect-demo';
 *   <WalletConnectDemo asaId={1234567} providerAddr="PROVIDER_ADDR" />
 */

import React, { useState, useEffect } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import algosdk from 'algosdk';

// TestNet configuration
const ALGOD_URL = 'https://testnet-api.algonode.cloud';
const ALGOD_TOKEN = '';
const ALGOD_PORT = '';

function WalletConnectDemo({ asaId, providerAddr, ratePerMinute = 0.02 }) {
  const [peraWallet, setPeraWallet] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize Pera Wallet
  useEffect(() => {
    const pera = new PeraWalletConnect({
      chainId: 416002, // TestNet
    });
    setPeraWallet(pera);

    // Check if already connected
    pera.reconnectSession().then((accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        fetchBalance(accounts[0]);
      }
    });

    // Handle disconnect
    pera.connector?.on('disconnect', () => {
      setAccount(null);
      setIsConnected(false);
      setBalance(null);
    });

    return () => {
      pera.disconnect();
    };
  }, []);

  // Connect wallet
  const connectWallet = async () => {
    try {
      setLoading(true);
      setError(null);

      const accounts = await peraWallet.connect();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        await fetchBalance(accounts[0]);
      }
    } catch (err) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Connection error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      await peraWallet.disconnect();
      setAccount(null);
      setIsConnected(false);
      setBalance(null);
    } catch (err) {
      setError(err.message || 'Failed to disconnect wallet');
    }
  };

  // Fetch ASA balance
  const fetchBalance = async (address) => {
    try {
      const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_URL, ALGOD_PORT);
      const accountInfo = await algod.accountInformation(address).do();
      
      const asset = accountInfo.assets?.find(a => a['asset-id'] === asaId);
      if (asset) {
        // Convert minor units to PLY (decimals: 2, so 100 minor = 1 PLY)
        const plyBalance = asset.amount / 100;
        setBalance(plyBalance);
      } else {
        setBalance(0);
        setError('Account not opted in to PlayCoin (PLY). Please opt-in first.');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch balance');
      console.error('Balance fetch error:', err);
    }
  };

  // Send payment (user signs transaction)
  const sendPayment = async (amountMinor) => {
    if (!account || !peraWallet) {
      setError('Please connect wallet first');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const algod = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_URL, ALGOD_PORT);
      const params = await algod.getTransactionParams().do();

      // Create asset transfer transaction
      const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: account,
        to: providerAddr,
        amount: amountMinor,
        assetIndex: asaId,
        suggestedParams: params,
      });

      // User signs transaction via wallet
      const signedTxns = await peraWallet.signTransaction([txn]);
      
      // Send transaction
      const { txId } = await algod.sendRawTransaction(signedTxns).do();
      
      // Wait for confirmation
      await algosdk.waitForConfirmation(algod, txId, 3);

      // Update balance
      await fetchBalance(account);

      return { success: true, txId };
    } catch (err) {
      const errorMsg = err.message || 'Payment failed';
      setError(errorMsg);
      console.error('Payment error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Pay per minute (example)
  const payPerMinute = async () => {
    // Calculate amount: 0.02 EUR = 2 PLY = 200 minor units
    const amountMinor = Math.round(ratePerMinute * 100); // Convert EUR to PLY minor units
    
    try {
      const result = await sendPayment(amountMinor);
      alert(`Payment successful! TX: ${result.txId}`);
    } catch (err) {
      alert(`Payment failed: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Play and Pay - Wallet Connect Demo</h2>
      
      {!isConnected ? (
        <div>
          <button 
            onClick={connectWallet} 
            disabled={loading}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#6C5CE7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Connecting...' : 'Connect Pera Wallet'}
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <p><strong>Connected:</strong> {account}</p>
            <p><strong>Balance:</strong> {balance !== null ? `${balance} PLY` : 'Loading...'}</p>
            <p><strong>ASA ID:</strong> {asaId}</p>
            <p><strong>Rate:</strong> €{ratePerMinute}/min</p>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button 
              onClick={payPerMinute}
              disabled={loading || balance === null || balance < ratePerMinute}
              style={{
                padding: '10px 20px',
                backgroundColor: '#00B894',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              Pay €{ratePerMinute} (1 min)
            </button>

            <button 
              onClick={disconnectWallet}
              style={{
                padding: '10px 20px',
                backgroundColor: '#E74C3C',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Disconnect
            </button>
          </div>

          {error && (
            <div style={{
              padding: '10px',
              backgroundColor: '#FFE5E5',
              color: '#C0392B',
              borderRadius: '6px',
              marginTop: '10px'
            }}>
              {error}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#F8F9FA', borderRadius: '6px' }}>
        <h3>Security Notes:</h3>
        <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <li>✅ User signs transactions with their wallet (not server-side mnemonic)</li>
          <li>✅ No private keys stored on server</li>
          <li>✅ Full transparency and security</li>
          <li>⚠️ This is a TestNet demo - use test accounts only</li>
        </ul>
      </div>
    </div>
  );
}

export default WalletConnectDemo;

