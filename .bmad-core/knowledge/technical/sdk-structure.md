# 📦 SDK Structure & Implementation Guide

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 فهرست

- [Overview](#overview)
- [Core SDK Layer](#core-sdk-layer)
- [Plugin / Add-on Layer](#plugin--add-on-layer)
- [Configuration File](#configuration-file)
- [Standard API Endpoints](#standard-api-endpoints)
- [Algorand Integration](#algorand-integration)
- [Smart Contract (ASC1)](#smart-contract-asc1)
- [WordPress Add-on](#wordpress-add-on)
- [Security & Best Practices](#security--best-practices)
- [Quick Start Guide](#quick-start-guide)

---

## 🎯 Overview

**هدف:**
ایجاد SDK و افزونه‌های استاندارد که توسعه‌دهنده‌ها بتوانند:
- در فرانت React استفاده کنند (Player, Wallet, Summary)
- در بک‌اند Node.js/Express نصب کنند (API Billing و Wallet)
- به راحتی به CMSها یا افزونه‌ها (مثل WordPress) متصل شوند

**Output:**
- NPM Package: `@playandpay/sdk`
- WordPress Plugin: `playandpay-wordpress-addon.zip`
- React Components: `@playandpay/react`
- Node.js Middleware: `@playandpay/api-addon`

---

## 🧩 Core SDK Layer

### 📁 Structure

```
payasuse-core-sdk/
├── package.json
├── README.md
├── src/
│   ├── index.js                # Main SDK entry point
│   ├── wallet.js               # Connect wallet (Algorand ASA)
│   ├── billing.js              # Handle per-minute billing logic
│   ├── analytics.js            # Fetch user/session reports
│   ├── api.js                  # Backend API wrapper
│   ├── config.js               # API base URL, network settings
│   ├── auth.js                 # JWT or API-key management
│   └── utils.js                # Logger, formatters, etc.
└── package.json
```

### 📦 NPM Package

**Package Name:** `@playandpay/sdk`

**Installation:**
```bash
npm install @playandpay/sdk
```

**Usage:**
```javascript
import { initWallet, startBilling, getAnalytics } from '@playandpay/sdk'

// Initialize
const sdk = initWallet({
  apiKey: 'your-api-key',
  network: 'testnet'
})

// Start billing
const session = await startBilling({
  contentId: 'film123',
  pricePerMinute: 0.02
})

// Get analytics
const report = await getAnalytics({
  userId: 'user123',
  from: '2025-01-01',
  to: '2025-01-31'
})
```

---

## 🔌 Plugin / Add-on Layer

### 🟢 WordPress / PHP Add-on

**📁 Structure:**
```
wp-content/plugins/playandpay-addon/
├── playandpay.php              # Registers plugin
├── settings-page.php           # API key, rate, wallet ID setup
├── shortcodes.php              # [payasuse_button] shortcode
├── js/
│   └── playandpay-client.js    # Embeds SDK billing flow
└── templates/
    └── player-widget.php
```

**Capabilities:**
- Shortcode: `[playandpay_watch price="0.02"]`
- Dashboard mini-widget for real-time revenue
- Webhook for settlement confirmation

**Installation:**
1. Download `playandpay-wordpress-addon.zip`
2. Upload via WordPress Admin → Plugins → Add New
3. Activate plugin
4. Configure in Settings → Play and Pay

---

### 🟣 React / Vue Add-on

**📁 Structure:**
```
playandpay-react-addon/
├── components/
│   ├── WalletWidget.jsx
│   ├── PlayerBilling.jsx
│   ├── UsageSummary.jsx
│   └── PartnerDashboard.jsx
└── hooks/
    └── usePlayBilling.js
```

**Capabilities:**
- Component library usage:
  ```jsx
  <WalletWidget balance={user.balance} />
  <PlayerBilling rate={0.02} contentId="film123" />
  ```
- Live billing via Algorand SDK
- Auto top-up modal and analytics hook ready

**Installation:**
```bash
npm install @playandpay/react
```

**Usage:**
```jsx
import { WalletWidget, PlayerBilling, usePlayBilling } from '@playandpay/react'

function VideoPlayer() {
  const { start, stop, charge } = usePlayBilling('film123', 0.02)
  
  return (
    <>
      <WalletWidget onClickTopUp={() => charge()} />
      <PlayerBilling rate={0.02} contentId="film123" />
    </>
  )
}
```

---

### 🔵 Node.js / API Extension

**📁 Structure:**
```
playandpay-api-addon/
├── routes/
│   ├── sessions.js     # Start/stop sessions
│   ├── billing.js      # Handle per-tick charges
│   ├── wallet.js       # Manage user ASA balances
│   └── webhook.js      # PSP / settlement callbacks
└── index.js
```

**Capabilities:**
- RESTful API + WebSocket for real-time session updates
- Simple installation:
  ```bash
  npm install @playandpay/api-addon
  ```

**Usage in Express:**
```javascript
const express = require('express')
const app = express()

app.use('/playandpay', require('@playandpay/api-addon'))

// Routes automatically available:
// POST /playandpay/session/start
// POST /playandpay/session/tick
// POST /playandpay/session/stop
// GET /playandpay/wallet/balance/:userId
```

---

## ⚙️ Configuration File

### Standard JSON Config

**File:** `playandpay.config.json`

```json
{
  "api_key": "YOUR_API_KEY",
  "network": "algorand-testnet",
  "asa_id": "1234567",
  "rate_per_minute": 0.02,
  "currency": "PLY",
  "auto_topup_threshold": 1.00,
  "webhook_url": "https://yourapp.com/hooks/playandpay",
  "user_mnemonic": "",
  "provider_addr": "PROVIDER-TESTNET-ADDR"
}
```

**Notes:**
- همه پلاگین‌ها (React, WordPress, Node) از همین فایل استفاده می‌کنند
- اگر `user_mnemonic` خالی باشد → مود دمو فعال می‌شود
- برای تراکنش واقعی روی TestNet، یک mnemonic تستی و provider_addr تستی قرار بده

---

## 🔌 Standard API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/wallet/balance/:userId` | GET | دریافت موجودی کیف‌پول |
| `/session/start` | POST | شروع تماشای محتوا |
| `/session/tick` | POST | محاسبه دقیقه مصرف |
| `/session/stop` | POST | توقف و تسویه |
| `/partner/analytics` | GET | گزارش مصرف و درآمد |

### Request/Response Examples

**POST /session/start**
```javascript
// Request
{
  "userId": "user123",
  "contentId": "film123",
  "pricePerMinute": 0.02
}

// Response
{
  "sessionId": "session_abc123",
  "playbackToken": "token_xyz789",
  "startedAt": "2025-01-01T10:00:00Z"
}
```

**POST /session/tick**
```javascript
// Request
{
  "sessionId": "session_abc123",
  "playedMs": 15000,
  "tickId": "tick_001"
}

// Response
{
  "success": true,
  "charged": 0.02,
  "remainingBalance": 4.98,
  "txId": "tx_456"
}
```

---

## ⛓️ Algorand Integration

### Real Algorand Connection (JS SDK)

**File:** `src/wallet.js`

```javascript
import algosdk from 'algosdk'
import { cfg } from './config.js'

const algod = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '')
const indexer = new algosdk.Indexer('', 'https://testnet-idx.algonode.cloud', '')

// تنظیم کیف پول (TestNet account)
const userMnemonic = cfg().userMnemonic || ''
const userAccount = userMnemonic ? algosdk.mnemonicToSecretKey(userMnemonic) : null

// ASA ID
const ASA_ID = parseInt(cfg().asaId)

// دریافت موجودی واقعی از بلاکچین
export async function getBalance(userAddr) {
  if (!userAddr && !userAccount) {
    // Demo mode
    return { userAddr: 'DEMO-ADDR', balanceMinor: 50000, currency: 'PLY' }
  }

  const address = userAddr || userAccount.addr
  const accountInfo = await indexer.lookupAccountByID(address).do()
  const asset = accountInfo.account.assets?.find(a => a['asset-id'] === ASA_ID)
  const balanceMinor = asset ? asset.amount : 0

  return { userAddr: address, balanceMinor, currency: cfg().currency }
}

// انتقال PLY از کاربر به ارائه‌دهنده
export async function payPerMinute(userAddr, providerAddr, amountMinor) {
  if (!userAccount || !userMnemonic) {
    // Demo mode
    return { txId: `DEMO-TX-${Date.now()}`, amountMinor }
  }

  const params = await algod.getTransactionParams().do()
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: userAddr,
    to: providerAddr,
    amount: amountMinor,
    assetIndex: ASA_ID,
    suggestedParams: params,
  })

  const signed = txn.signTxn(userAccount.sk)
  const { txId } = await algod.sendRawTransaction(signed).do()
  await algosdk.waitForConfirmation(algod, txId, 3)

  return { txId, amountMinor }
}
```

**File:** `src/billing.js`

```javascript
import { payPerMinute } from './wallet.js'
import { cfg } from './config.js'

let activeSessions = new Map()

export async function startSession({ userId, contentId, pricePerMinute }) {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  activeSessions.set(sessionId, {
    userId,
    contentId,
    pricePerMinute,
    startedAt: Date.now(),
    totalCharged: 0,
    ticks: []
  })

  return {
    sessionId,
    playbackToken: `token_${sessionId}`,
    startedAt: new Date().toISOString()
  }
}

export async function sendTick({ sessionId, playedMs, tickId }) {
  const session = activeSessions.get(sessionId)
  if (!session) throw new Error('Session not found')

  // Calculate charge
  const minutes = playedMs / 60000
  const chargeMinor = Math.round(session.pricePerMinute * minutes * 100) // Convert to cents
  const chargePLY = Math.round(chargeMinor / 0.01) // Convert to PLY (1 PLY = €0.01)

  // Pay via Algorand (or demo)
  const providerAddr = cfg().providerAddr || 'DEMO-PROVIDER-ADDR'
  const userAddr = 'DEMO-USER-ADDR' // In real app, get from session.userId

  const result = await payPerMinute(userAddr, providerAddr, chargePLY)

  // Update session
  session.totalCharged += chargeMinor / 100
  session.ticks.push({ tickId, playedMs, chargeMinor, txId: result.txId })

  return {
    success: true,
    charged: chargeMinor / 100,
    remainingBalance: 4.98, // In real app, get from wallet
    txId: result.txId
  }
}

export async function stopSession(sessionId) {
  const session = activeSessions.get(sessionId)
  if (!session) throw new Error('Session not found')

  const duration = (Date.now() - session.startedAt) / 1000 // seconds
  const summary = {
    sessionId,
    duration,
    totalCharge: session.totalCharged,
    remainingBalance: 4.84, // In real app, get from wallet
    ticks: session.ticks.length
  }

  activeSessions.delete(sessionId)
  return summary
}
```

---

## 🔐 Smart Contract (ASC1)

### UsageContract (PyTeal)

**File:** `contracts/usage_contract.py`

```python
from pyteal import *

def approval():
    provider = Bytes("provider")
    fee_pct = Bytes("fee")
    platform = Bytes("platform")
    
    on_create = Seq([
        App.globalPut(provider, Txn.application_args[0]),
        App.globalPut(fee_pct, Btoi(Txn.application_args[1])),
        App.globalPut(platform, Txn.application_args[2]),
        Approve()
    ])
    
    on_bill = Seq([
        Assert(Txn.application_args.length() == Int(4)),  # user_addr, units, unit_price, nonce
        Assert(Gtxn[1].type_enum() == TxnType.AssetTransfer),  # User → Provider
        Assert(Gtxn[2].type_enum() == TxnType.AssetTransfer),  # User → Platform
        Assert(Gtxn[1].asset_receiver() == App.globalGet(provider)),
        Assert(Gtxn[2].asset_receiver() == App.globalGet(platform)),
        Approve()
    ])
    
    program = Cond(
        [Txn.application_id() == Int(0), on_create],
        [Txn.on_completion() == OnComplete.NoOp, on_bill],
    )
    
    return program

if __name__ == "__main__":
    with open("usage_contract_approval.teal", "w") as f:
        f.write(compileTeal(approval(), Mode.Application, version=6))
```

**Deployment:**
```bash
# Compile PyTeal to TEAL
python usage_contract.py

# Deploy to TestNet
goal app create \
  --creator YOUR_ACCOUNT \
  --approval-prog usage_contract_approval.teal \
  --clear-prog usage_contract_clear.teal \
  --global-byteslices 3 \
  --global-ints 0 \
  --local-byteslices 0 \
  --local-ints 2 \
  --app-arg addr:PROVIDER_ADDR \
  --app-arg int:500 \
  --app-arg addr:PLATFORM_ADDR
```

---

## 🔌 WordPress Add-on

### Plugin Structure

**File:** `playandpay.php`

```php
<?php
/**
 * Plugin Name: Play & Pay Add-on
 * Description: Pay-as-you-Use micro-payment system for OTT/VOD (Algorand)
 * Version: 0.1
 * Author: Play and Pay
 */

// Prevent direct access
if (!defined('ABSPATH')) exit;

// Register plugin
add_action('plugins_loaded', 'playandpay_init');

function playandpay_init() {
    // Load settings
    require_once plugin_dir_path(__FILE__) . 'settings-page.php';
    require_once plugin_dir_path(__FILE__) . 'shortcodes.php';
    
    // Enqueue scripts
    add_action('wp_enqueue_scripts', 'playandpay_enqueue_scripts');
}

function playandpay_enqueue_scripts() {
    wp_enqueue_script(
        'playandpay-client',
        plugin_dir_url(__FILE__) . 'js/playandpay-client.js',
        ['jquery'],
        '0.1',
        true
    );
    
    wp_localize_script('playandpay-client', 'playandpayConfig', [
        'apiUrl' => get_option('playandpay_api_url', 'http://localhost:8080'),
        'apiKey' => get_option('playandpay_api_key', '')
    ]);
}

// Shortcode
add_shortcode('payasuse_watch', 'playandpay_watch_button');

function playandpay_watch_button($atts) {
    $rate = $atts['price'] ?? '0.02';
    $backend = $atts['backend'] ?? get_option('playandpay_api_url', 'http://localhost:8080');
    $contentId = $atts['content_id'] ?? get_the_ID();
    
    ob_start(); ?>
    <div class="playpay-widget" 
         data-rate="<?php echo esc_attr($rate); ?>"
         data-content-id="<?php echo esc_attr($contentId); ?>"
         data-backend="<?php echo esc_attr($backend); ?>">
        <button class="playpay-start">🎬 Watch Now (€<?php echo esc_attr($rate); ?>/min)</button>
        <div class="playpay-status"></div>
        <div class="playpay-timer" style="display:none;">
            <span class="playpay-minutes">0</span> min watched
            <span class="playpay-charge">€0.00</span> charged
        </div>
        <button class="playpay-stop" style="display:none;">Stop & Pay</button>
    </div>
    <script>
        (function() {
            const widget = document.querySelector('.playpay-widget');
            const startBtn = widget.querySelector('.playpay-start');
            const stopBtn = widget.querySelector('.playpay-stop');
            const status = widget.querySelector('.playpay-status');
            const timer = widget.querySelector('.playpay-timer');
            const minutesEl = widget.querySelector('.playpay-minutes');
            const chargeEl = widget.querySelector('.playpay-charge');
            
            let sessionId = null;
            let tickInterval = null;
            let totalMinutes = 0;
            const rate = parseFloat(widget.dataset.rate);
            const backend = widget.dataset.backend;
            const contentId = widget.dataset.contentId;
            
            startBtn.addEventListener('click', async () => {
                try {
                    status.innerText = 'Starting session...';
                    const res = await fetch(`${backend}/session/start`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userId: 'demo-user',
                            contentId: contentId,
                            pricePerMinute: rate
                        })
                    });
                    const data = await res.json();
                    sessionId = data.sessionId;
                    
                    startBtn.style.display = 'none';
                    timer.style.display = 'block';
                    stopBtn.style.display = 'block';
                    status.innerText = 'Session started!';
                    
                    // Send heartbeat every 15 seconds
                    tickInterval = setInterval(async () => {
                        totalMinutes += 0.25; // 15 seconds = 0.25 minutes
                        const charge = totalMinutes * rate;
                        
                        minutesEl.innerText = totalMinutes.toFixed(2);
                        chargeEl.innerText = `€${charge.toFixed(2)}`;
                        
                        try {
                            await fetch(`${backend}/session/tick`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    sessionId: sessionId,
                                    playedMs: 15000,
                                    tickId: `tick_${Date.now()}`
                                })
                            });
                        } catch (e) {
                            console.error('Tick error:', e);
                        }
                    }, 15000);
                } catch (e) {
                    status.innerText = 'Error: ' + e.message;
                }
            });
            
            stopBtn.addEventListener('click', async () => {
                if (tickInterval) clearInterval(tickInterval);
                
                try {
                    status.innerText = 'Stopping session...';
                    const res = await fetch(`${backend}/session/stop`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ sessionId: sessionId })
                    });
                    const data = await res.json();
                    
                    status.innerHTML = `
                        <strong>Session Summary:</strong><br>
                        Watched: ${data.duration.toFixed(0)} seconds<br>
                        Total Charge: €${data.totalCharge.toFixed(2)}<br>
                        Remaining Balance: €${data.remainingBalance.toFixed(2)}
                    `;
                    timer.style.display = 'none';
                    stopBtn.style.display = 'none';
                    startBtn.style.display = 'block';
                } catch (e) {
                    status.innerText = 'Error: ' + e.message;
                }
            });
        })();
    </script>
    <?php
    return ob_get_clean();
}
?>
```

**Usage in WordPress:**
```
[payasuse_watch price="0.02" backend="http://localhost:8080"]
```

---

## 🔒 Security & Best Practices

### ⚠️ Important Security Notes

**این نسخه صرفاً POC تستی است:**

1. **از mnemonic اصلی/مین‌نت استفاده نکن**
   - فقط از TestNet accounts استفاده کن
   - هرگز کلیدهای اصلی را در کد commit نکن

2. **برای پروژه واقعی:**
   - کلیدها را در ENV نگه‌دار (`process.env.USER_MNEMONIC`)
   - از Algorand WalletConnect یا کیف‌پول کاربر برای امضا استفاده کن
   - عدم نگه‌داری کلید سمت سرور

3. **ASA Setup:**
   - ASA ID واقعی TestNet را ایجاد/تنظیم کن
   - Opt-in را برای آدرس‌ها انجام بده
   - از TestNet dispenser برای funding استفاده کن

4. **Rate & Fees:**
   - رِیت و فی‌ها را از Smart Contract UsageContract یا تنظیمات بک‌اند کنترل کن
   - هرگز در فرانت اعتماد نکن

---

## 🚀 Quick Start Guide

### Step 1: Install SDK

```bash
# Download and extract
unzip playandpay-sdk-algorand.zip
cd playandpay-sdk

# Install dependencies
npm install

# Start server
npm start
```

Server POC runs on `http://localhost:8080`

### Step 2: Configure

Edit `server/playandpay.config.json`:

```json
{
  "network": "algorand-testnet",
  "asa_id": "1234567",
  "rate_per_minute": 0.02,
  "currency": "PLY",
  "user_mnemonic": "",
  "provider_addr": "PROVIDER-TESTNET-ADDR"
}
```

**Note:** If `user_mnemonic` is empty → Demo mode activates and transactions are simulated with `DEMO-TX-*`

### Step 3: Test Endpoints

**Start Session:**
```bash
curl -X POST http://localhost:8080/session/start \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "demo-user",
    "contentId": "film123",
    "pricePerMinute": 0.02
  }'
```

**Send Tick:**
```bash
curl -X POST http://localhost:8080/session/tick \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_abc123",
    "playedMs": 15000,
    "tickId": "tick_001"
  }'
```

**Stop Session:**
```bash
curl -X POST http://localhost:8080/session/stop \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_abc123"
  }'
```

### Step 4: Install WordPress Add-on

1. Download `playandpay-wordpress-addon.zip`
2. Upload via WordPress Admin → Plugins → Add New
3. Activate plugin
4. In any post/page, add:
   ```
   [payasuse_watch price="0.02" backend="http://localhost:8080"]
   ```

---

## 📊 Complete Project Structure

```
playandpay-sdk/
│
├── package.json
├── README.md
│
├── src/
│   ├── index.js                 # SDK entry point
│   ├── wallet.js                # Wallet management (ASA)
│   ├── billing.js               # Per-minute billing
│   ├── analytics.js             # Usage & revenue reports
│   ├── config.js                # Network, ASA ID, API Base
│   └── utils.js                 # Log, Format, etc.
│
├── react/
│   ├── WalletWidget.jsx         # User balance display
│   ├── PlayerBilling.jsx        # Live minute counter & billing
│   ├── UsageSummary.jsx         # Consumption summary
│   └── PartnerDashboard.jsx     # B2B dashboard
│
└── server/
    ├── index.js                 # Express server
    ├── routes/
    │   ├── sessions.js          # Start/stop session
    │   ├── billing.js           # Auto payment per minute
    │   └── wallet.js            # Balance & top-up
    └── playandpay.config.json  # Config file (ASA, rate, API key)
```

---

## 🎨 Features

### Frontend Usage

```javascript
import { useBilling, WalletWidget } from '@playandpay/sdk'

const Player = () => {
  const { start, stop, charge } = useBilling('film123', 0.02)
  
  return <WalletWidget onClickTopUp={() => charge()} />
}
```

### Backend Usage

```javascript
const { startSession, tick, stopSession } = require('@playandpay/sdk/server')

app.post('/session/start', startSession)
app.post('/session/tick', tick)
app.post('/session/stop', stopSession)
```

### Technical Features

- **Network:** Algorand TestNet
- **Currency:** ASA (PlayCoin – PLY)
- **API Ready:**
  - `/session/start`
  - `/session/tick`
  - `/session/stop`
  - `/wallet/topup`
  - `/analytics/usage`

---

## 📝 Next Steps

### For Real Production

1. **Create ASA PLY on TestNet**
   - Use `goal` CLI or Algorand SDK
   - Script for opt-in addresses

2. **Add WalletConnect**
   - User signs transactions (not server-side mnemonic)
   - Better security and UX

3. **Mermaid Sequence Diagram**
   - Visual flow documentation
   - FigJam Flow for Dev Docs

4. **Production Deployment**
   - Environment variables for secrets
   - CI/CD pipeline
   - Monitoring and logging

---

## 📚 Related Documentation

- **Plugin Architecture:** [`plugin-architecture.md`](./plugin-architecture.md)
- **POC Implementation:** [`poc-implementation.md`](./poc-implementation.md)
- **POC Wireframe & Flows:** [`poc-wireframe-flows.md`](./poc-wireframe-flows.md)
- **Tech Stack:** [`tech-stack.md`](./tech-stack.md)

---

## 🔄 به‌روزرسانی‌ها

**2025-11-04 - ورژن 1.0:**
- ایجاد فایل اولیه
- مستندسازی Core SDK Layer
- مستندسازی Plugin/Add-on Layer
- مستندسازی Configuration File
- مستندسازی Standard API Endpoints
- مستندسازی Algorand Integration
- مستندسازی Smart Contract (ASC1)
- مستندسازی WordPress Add-on
- اضافه کردن Security & Best Practices
- اضافه کردن Quick Start Guide

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن فعلی:** 1.0

