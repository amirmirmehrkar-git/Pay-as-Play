# @playandpay/sdk

**Play and Pay SDK** - Pay-as-you-use micro-payments for digital content on Algorand blockchain.

[![npm version](https://img.shields.io/npm/v/@playandpay/sdk.svg)](https://www.npmjs.com/package/@playandpay/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📦 Installation

```bash
npm install @playandpay/sdk
```

---

## 🚀 Quick Start

### Basic Usage

```javascript
import { init, startBilling, getAnalytics } from '@playandpay/sdk';

// Initialize SDK
const sdk = init({
  apiKey: 'your-api-key',
  network: 'testnet',
  asaId: 1234567,
  providerAddr: 'PROVIDER_ADDRESS'
});

// Start a billing session
const session = await sdk.billing.startSession({
  userId: 'user123',
  contentId: 'film123',
  pricePerMinute: 0.02
});

// Send billing tick (every minute or as needed)
const tick = await sdk.billing.sendTick({
  sessionId: session.sessionId,
  playedMs: 60000, // 1 minute
  signer: userWallet // Wallet connector or mnemonic
});

// Stop session
const summary = await sdk.billing.stopSession(session.sessionId);
```

---

## 📚 API Reference

### Configuration

```javascript
import { initConfig } from '@playandpay/sdk';

const config = initConfig({
  apiBaseUrl: 'https://api.playandpay.io',
  network: 'testnet', // or 'mainnet'
  asaId: 1234567,
  providerAddr: 'PROVIDER_ADDRESS',
  platformAddr: 'PLATFORM_ADDRESS',
  appId: 789, // Smart Contract App ID
  apiKey: 'your-api-key'
});
```

### Wallet Operations

```javascript
import { wallet } from '@playandpay/sdk';

// Get balance
const balance = await wallet.getBalance('USER_ADDRESS');

// Transfer tokens
const result = await wallet.transfer(
  'FROM_ADDRESS',
  'TO_ADDRESS',
  1000, // amount in minor units
  signer // mnemonic or wallet connector
);

// Check opt-in status
const isOptedIn = await wallet.isOptedIn('USER_ADDRESS');
```

### Billing

```javascript
import { billing } from '@playandpay/sdk';

// Start session
const session = await billing.startSession({
  userId: 'user123',
  contentId: 'film123',
  pricePerMinute: 0.02,
  userAddress: 'USER_ADDRESS'
});

// Send tick
const tick = await billing.sendTick({
  sessionId: session.sessionId,
  playedMs: 60000,
  signer: userWallet
});

// Stop session
const summary = await billing.stopSession(session.sessionId);
```

### Analytics

```javascript
import { analytics } from '@playandpay/sdk';

// Get user analytics
const userStats = await analytics.getUserAnalytics({
  userId: 'user123',
  from: '2025-01-01',
  to: '2025-01-31'
});

// Get partner analytics
const partnerStats = await analytics.getPartnerAnalytics({
  partnerId: 'partner123',
  from: '2025-01-01',
  to: '2025-01-31'
});
```

---

## 🔧 Environment Variables

You can configure the SDK using environment variables:

```bash
PLAYANDPAY_API_URL=https://api.playandpay.io
PLAYANDPAY_NETWORK=testnet
PLAYANDPAY_ASA_ID=1234567
PLAYANDPAY_APP_ID=789
PLAYANDPAY_PROVIDER_ADDR=PROVIDER_ADDRESS
PLAYANDPAY_PLATFORM_ADDR=PLATFORM_ADDRESS
PLAYANDPAY_API_KEY=your-api-key
```

---

## 🎯 Demo Mode

If critical configuration is missing (e.g., `asaId` or `providerAddr`), the SDK automatically enables demo mode. In demo mode:

- All blockchain operations return mock data
- No actual transactions are sent
- Useful for testing and development

---

## 📖 Examples

### React Component

```jsx
import { useState, useEffect } from 'react';
import { init, billing } from '@playandpay/sdk';

function VideoPlayer({ contentId, pricePerMinute }) {
  const [session, setSession] = useState(null);
  const [balance, setBalance] = useState(0);
  
  const sdk = init({
    network: 'testnet',
    asaId: 1234567
  });
  
  useEffect(() => {
    // Start session when component mounts
    billing.startSession({
      userId: 'user123',
      contentId,
      pricePerMinute
    }).then(setSession);
    
    // Cleanup on unmount
    return () => {
      if (session) {
        billing.stopSession(session.sessionId);
      }
    };
  }, [contentId]);
  
  // Send tick every minute
  useEffect(() => {
    if (!session) return;
    
    const interval = setInterval(async () => {
      await billing.sendTick({
        sessionId: session.sessionId,
        playedMs: 60000
      });
    }, 60000);
    
    return () => clearInterval(interval);
  }, [session]);
  
  return <div>Video Player Component</div>;
}
```

### Node.js Backend

```javascript
import express from 'express';
import { init, billing, wallet } from '@playandpay/sdk';

const app = express();
const sdk = init({
  network: 'testnet',
  asaId: 1234567,
  providerAddr: process.env.PROVIDER_ADDR
});

app.post('/session/start', async (req, res) => {
  const session = await sdk.billing.startSession(req.body);
  res.json(session);
});

app.post('/session/tick', async (req, res) => {
  const tick = await sdk.billing.sendTick({
    ...req.body,
    signer: req.user.mnemonic // In production, use WalletConnect
  });
  res.json(tick);
});

app.get('/wallet/balance/:userId', async (req, res) => {
  const balance = await sdk.wallet.getBalance(req.params.userId);
  res.json(balance);
});
```

---

## 🔒 Security

- **Never store mnemonics in code or environment variables**
- Use WalletConnect (Pera Wallet) for user-side transaction signing
- Keep API keys secure and rotate regularly
- Use HTTPS for all API communications

---

## 📝 License

MIT

---

## 🔗 Links

- [Documentation](https://docs.playandpay.io)
- [GitHub](https://github.com/playandpay/sdk)
- [Support](https://support.playandpay.io)

---

**Version:** 1.0.0  
**Last Updated:** 2025-11-04

