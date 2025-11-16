# 🔌 Plugin & Add-on Architecture — Play and Pay SDK

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 فهرست

- [Overview](#overview)
- [Architecture Principles](#architecture-principles)
- [Supported Platforms](#supported-platforms)
- [Core SDK Components](#core-sdk-components)
- [CMS Plugins](#cms-plugins)
- [Framework Integrations](#framework-integrations)
- [Backend SDKs](#backend-sdks)
- [Installation & Setup](#installation--setup)
- [API Reference](#api-reference)
- [Examples](#examples)

---

## 🎯 Overview

**هدف:**
ایجاد SDK و افزونه‌هایی که هر توسعه‌دهنده بتواند آن را:
- روی CMSهایی مثل WordPress, Joomla, Drupal
- روی Frameworkهایی مثل React, Next.js, Vue.js
- یا حتی در Node.js / PHP / Python بک‌اند خودش

به راحتی نصب یا import کند و با چند خط تنظیمات، به کیف‌پول، پرداخت و آنالیتیکس PlayCoin متصل شود.

**Goal:**
Create SDKs and plugins that any developer can easily install or import on CMS platforms (WordPress, Joomla, Drupal), frameworks (React, Next.js, Vue.js), or backend systems (Node.js, PHP, Python) and connect to PlayCoin wallet, payments, and analytics with just a few lines of configuration.

---

## 🏗️ Architecture Principles

### 1. Modularity
- **Core SDK:** Shared functionality across all platforms
- **Platform-Specific Adapters:** Thin wrappers for each platform
- **Plugin Layer:** Easy-to-install extensions

### 2. Standardization
- **Unified API:** Same interface across all platforms
- **Consistent Data Models:** Standardized data structures
- **Common Configuration:** Similar setup process everywhere

### 3. Developer Experience
- **Simple Installation:** One command or click
- **Minimal Configuration:** Defaults work out of the box
- **Clear Documentation:** Step-by-step guides
- **Type Safety:** TypeScript definitions where applicable

### 4. Flexibility
- **Framework Agnostic:** Works with any tech stack
- **Customizable:** Extensible for specific needs
- **Backward Compatible:** Version upgrades don't break existing code

---

## 🎨 Supported Platforms

### CMS Platforms

| Platform | Plugin Type | Installation | Status |
|----------|-------------|--------------|--------|
| **WordPress** | Plugin | Upload ZIP / WP Admin | ✅ Ready |
| **Joomla** | Extension | Install via Extension Manager | ✅ Ready |
| **Drupal** | Module | Composer / Drush | ⏳ Planned |
| **Shopify** | App | Shopify App Store | ⏳ Planned |

### Frontend Frameworks

| Framework | Package | Installation | Status |
|-----------|---------|--------------|--------|
| **React** | npm package | `npm install @playandpay/react` | ✅ Ready |
| **Next.js** | npm package | `npm install @playandpay/next` | ✅ Ready |
| **Vue.js** | npm package | `npm install @playandpay/vue` | ⏳ Planned |
| **Svelte** | npm package | `npm install @playandpay/svelte` | ⏳ Planned |

### Backend Languages

| Language | Package | Installation | Status |
|----------|---------|--------------|--------|
| **Node.js** | npm package | `npm install @playandpay/node` | ✅ Ready |
| **PHP** | Composer | `composer require playandpay/php-sdk` | ✅ Ready |
| **Python** | pip | `pip install playandpay` | ⏳ Planned |
| **Ruby** | gem | `gem install playandpay` | ⏳ Planned |

---

## 🧩 Core SDK Components

### 1. Wallet Manager

**Responsibility:** Manage user wallet operations

**Functions:**
- Get balance
- Top-up wallet
- Withdraw funds
- Transaction history

**Example:**
```javascript
import { WalletManager } from '@playandpay/core';

const wallet = new WalletManager({
  apiKey: 'your-api-key',
  network: 'testnet' // or 'mainnet'
});

// Get balance
const balance = await wallet.getBalance(userId);

// Top-up
const result = await wallet.topUp({
  userId,
  amount: 10, // EUR
  paymentMethod: 'card'
});
```

---

### 2. Billing Engine

**Responsibility:** Handle real-time micro-payments

**Functions:**
- Start session
- Process heartbeat
- Stop session
- Get session summary

**Example:**
```javascript
import { BillingEngine } from '@playandpay/core';

const billing = new BillingEngine({
  apiKey: 'your-api-key'
});

// Start session
const session = await billing.startSession({
  userId,
  contentId,
  contentPrice: 0.02 // EUR per minute
});

// Send heartbeat (every 15 seconds)
setInterval(async () => {
  await billing.sendHeartbeat({
    sessionId: session.id,
    playedMs: 15000
  });
}, 15000);

// Stop session
const summary = await billing.stopSession(sessionId);
```

---

### 3. Analytics Client

**Responsibility:** Track usage and generate reports

**Functions:**
- Get user analytics
- Get partner analytics
- Export reports
- Real-time metrics

**Example:**
```javascript
import { AnalyticsClient } from '@playandpay/core';

const analytics = new AnalyticsClient({
  apiKey: 'your-api-key'
});

// Get user report
const userReport = await analytics.getUserReport({
  userId,
  from: '2025-01-01',
  to: '2025-01-31'
});

// Get partner report
const partnerReport = await analytics.getPartnerReport({
  partnerId,
  from: '2025-01-01',
  to: '2025-01-31'
});
```

---

## 🔌 CMS Plugins

### WordPress Plugin

**Plugin Name:** Play and Pay — Pay-as-you-Use

**Installation:**
1. Download plugin ZIP
2. Upload via WordPress Admin → Plugins → Add New
3. Activate plugin
4. Configure API key in Settings

**Configuration:**
```php
// wp-config.php or Plugin Settings
define('PLAYANDPAY_API_KEY', 'your-api-key');
define('PLAYANDPAY_NETWORK', 'testnet'); // or 'mainnet'
```

**Usage:**
```php
// In your theme or plugin
if (function_exists('playandpay_start_session')) {
    $session = playandpay_start_session([
        'content_id' => get_the_ID(),
        'user_id' => get_current_user_id()
    ]);
}

// Display wallet balance
$balance = playandpay_get_balance(get_current_user_id());
echo "Balance: €" . $balance;
```

**Shortcodes:**
- `[playandpay_balance]` — Display user balance
- `[playandpay_player content_id="123"]` — Video player with billing
- `[playandpay_topup]` — Top-up form

---

### Joomla Extension

**Extension Name:** Play and Pay — Pay-as-you-Use

**Installation:**
1. Download extension ZIP
2. Install via Joomla Extension Manager
3. Configure in Components → Play and Pay → Settings

**Configuration:**
```php
// Configuration in Component Settings
$config = [
    'api_key' => 'your-api-key',
    'network' => 'testnet'
];
```

**Usage:**
```php
// In your component or module
use PlayAndPay\Joomla\PlayAndPayHelper;

$helper = new PlayAndPayHelper();
$balance = $helper->getBalance($userId);
$session = $helper->startSession($contentId, $userId);
```

**Modules:**
- **Wallet Balance Module** — Display user balance
- **Player Module** — Video player with billing
- **Top-up Module** — Top-up form

---

### Drupal Module

**Module Name:** playandpay

**Installation:**
```bash
composer require playandpay/drupal-module
drush en playandpay
```

**Configuration:**
```php
// In settings.php or admin UI
$config['playandpay.settings']['api_key'] = 'your-api-key';
$config['playandpay.settings']['network'] = 'testnet';
```

**Usage:**
```php
use Drupal\playandpay\PlayAndPayService;

$service = \Drupal::service('playandpay');
$balance = $service->getBalance($userId);
$session = $service->startSession($contentId, $userId);
```

**Blocks:**
- **Wallet Balance Block** — Display user balance
- **Player Block** — Video player with billing
- **Top-up Block** — Top-up form

---

## ⚛️ Framework Integrations

### React SDK

**Package:** `@playandpay/react`

**Installation:**
```bash
npm install @playandpay/react
```

**Usage:**
```jsx
import { PlayAndPayProvider, useWallet, useBilling } from '@playandpay/react';

function App() {
  return (
    <PlayAndPayProvider
      apiKey="your-api-key"
      network="testnet"
    >
      <VideoPlayer />
    </PlayAndPayProvider>
  );
}

function VideoPlayer() {
  const { balance, topUp } = useWallet();
  const { startSession, stopSession, currentCharge } = useBilling();

  const handlePlay = async () => {
    const session = await startSession({
      contentId: 'video-123',
      pricePerMinute: 0.02
    });
  };

  return (
    <div>
      <p>Balance: €{balance}</p>
      <p>Charged: €{currentCharge}</p>
      <button onClick={handlePlay}>Play</button>
      <button onClick={stopSession}>Stop</button>
    </div>
  );
}
```

**Components:**
- `<WalletBalance />` — Display balance
- `<VideoPlayer />` — Player with billing
- `<TopUpForm />` — Top-up form
- `<UsageSummary />` — Session summary

---

### Next.js SDK

**Package:** `@playandpay/next`

**Installation:**
```bash
npm install @playandpay/next
```

**Usage:**
```jsx
// app/layout.js or pages/_app.js
import { PlayAndPayProvider } from '@playandpay/next';

export default function RootLayout({ children }) {
  return (
    <PlayAndPayProvider
      apiKey={process.env.PLAYANDPAY_API_KEY}
      network={process.env.PLAYANDPAY_NETWORK}
    >
      {children}
    </PlayAndPayProvider>
  );
}

// app/video/[id]/page.js
'use client';
import { useBilling } from '@playandpay/next';

export default function VideoPage({ params }) {
  const { startSession, stopSession, currentCharge } = useBilling();

  // ... video player logic
}
```

**Server Components:**
```jsx
// app/api/sessions/route.js
import { PlayAndPay } from '@playandpay/next/server';

export async function POST(request) {
  const playandpay = new PlayAndPay({
    apiKey: process.env.PLAYANDPAY_API_KEY
  });

  const session = await playandpay.billing.startSession({
    userId: request.userId,
    contentId: request.contentId
  });

  return Response.json(session);
}
```

---

### Vue.js SDK

**Package:** `@playandpay/vue`

**Installation:**
```bash
npm install @playandpay/vue
```

**Usage:**
```vue
<template>
  <div>
    <p>Balance: €{{ balance }}</p>
    <p>Charged: €{{ currentCharge }}</p>
    <button @click="handlePlay">Play</button>
    <button @click="handleStop">Stop</button>
  </div>
</template>

<script setup>
import { useWallet, useBilling } from '@playandpay/vue';

const { balance, topUp } = useWallet();
const { startSession, stopSession, currentCharge } = useBilling();

const handlePlay = async () => {
  await startSession({
    contentId: 'video-123',
    pricePerMinute: 0.02
  });
};

const handleStop = async () => {
  await stopSession();
};
</script>
```

---

## 🔧 Backend SDKs

### Node.js SDK

**Package:** `@playandpay/node`

**Installation:**
```bash
npm install @playandpay/node
```

**Usage:**
```javascript
const { PlayAndPay } = require('@playandpay/node');

const playandpay = new PlayAndPay({
  apiKey: 'your-api-key',
  network: 'testnet'
});

// Wallet operations
const balance = await playandpay.wallet.getBalance(userId);
const topUpResult = await playandpay.wallet.topUp({
  userId,
  amount: 10,
  paymentMethod: 'card'
});

// Billing operations
const session = await playandpay.billing.startSession({
  userId,
  contentId,
  pricePerMinute: 0.02
});

await playandpay.billing.sendHeartbeat({
  sessionId: session.id,
  playedMs: 15000
});

const summary = await playandpay.billing.stopSession(sessionId);

// Analytics
const report = await playandpay.analytics.getUserReport({
  userId,
  from: '2025-01-01',
  to: '2025-01-31'
});
```

**Express.js Middleware:**
```javascript
const { playandpayMiddleware } = require('@playandpay/node');

app.use('/api/playandpay', playandpayMiddleware({
  apiKey: process.env.PLAYANDPAY_API_KEY
}));

app.post('/api/playandpay/sessions', async (req, res) => {
  const session = await req.playandpay.billing.startSession({
    userId: req.user.id,
    contentId: req.body.contentId
  });
  res.json(session);
});
```

---

### PHP SDK

**Package:** `playandpay/php-sdk`

**Installation:**
```bash
composer require playandpay/php-sdk
```

**Usage:**
```php
<?php
require 'vendor/autoload.php';

use PlayAndPay\PlayAndPay;

$playandpay = new PlayAndPay([
    'api_key' => 'your-api-key',
    'network' => 'testnet'
]);

// Wallet operations
$balance = $playandpay->wallet->getBalance($userId);
$topUpResult = $playandpay->wallet->topUp([
    'user_id' => $userId,
    'amount' => 10,
    'payment_method' => 'card'
]);

// Billing operations
$session = $playandpay->billing->startSession([
    'user_id' => $userId,
    'content_id' => $contentId,
    'price_per_minute' => 0.02
]);

$playandpay->billing->sendHeartbeat([
    'session_id' => $session->id,
    'played_ms' => 15000
]);

$summary = $playandpay->billing->stopSession($sessionId);

// Analytics
$report = $playandpay->analytics->getUserReport([
    'user_id' => $userId,
    'from' => '2025-01-01',
    'to' => '2025-01-31'
]);
```

**Laravel Integration:**
```php
// config/playandpay.php
return [
    'api_key' => env('PLAYANDPAY_API_KEY'),
    'network' => env('PLAYANDPAY_NETWORK', 'testnet')
];

// app/Http/Controllers/VideoController.php
use PlayAndPay\Facades\PlayAndPay;

class VideoController extends Controller
{
    public function play($contentId)
    {
        $session = PlayAndPay::billing()->startSession([
            'user_id' => auth()->id(),
            'content_id' => $contentId
        ]);
        
        return view('video.player', ['session' => $session]);
    }
}
```

---

### Python SDK

**Package:** `playandpay`

**Installation:**
```bash
pip install playandpay
```

**Usage:**
```python
from playandpay import PlayAndPay

playandpay = PlayAndPay(
    api_key='your-api-key',
    network='testnet'
)

# Wallet operations
balance = playandpay.wallet.get_balance(user_id)
top_up_result = playandpay.wallet.top_up(
    user_id=user_id,
    amount=10,
    payment_method='card'
)

# Billing operations
session = playandpay.billing.start_session(
    user_id=user_id,
    content_id=content_id,
    price_per_minute=0.02
)

playandpay.billing.send_heartbeat(
    session_id=session.id,
    played_ms=15000
)

summary = playandpay.billing.stop_session(session_id)

# Analytics
report = playandpay.analytics.get_user_report(
    user_id=user_id,
    from_date='2025-01-01',
    to_date='2025-01-31'
)
```

**Django Integration:**
```python
# settings.py
PLAYANDPAY_API_KEY = os.environ.get('PLAYANDPAY_API_KEY')
PLAYANDPAY_NETWORK = os.environ.get('PLAYANDPAY_NETWORK', 'testnet')

# views.py
from playandpay import PlayAndPay

def play_video(request, content_id):
    playandpay = PlayAndPay(
        api_key=settings.PLAYANDPAY_API_KEY,
        network=settings.PLAYANDPAY_NETWORK
    )
    
    session = playandpay.billing.start_session(
        user_id=request.user.id,
        content_id=content_id
    )
    
    return render(request, 'video/player.html', {
        'session': session
    })
```

---

## 📦 Installation & Setup

### Quick Start (5 Minutes)

**Step 1: Get API Key**
1. Sign up at https://playandpay.io
2. Go to Dashboard → API Keys
3. Create new API key
4. Copy API key

**Step 2: Install SDK**
```bash
# For Node.js/React/Next.js
npm install @playandpay/node

# For PHP
composer require playandpay/php-sdk

# For Python
pip install playandpay
```

**Step 3: Initialize**
```javascript
// JavaScript/TypeScript
import { PlayAndPay } from '@playandpay/node';

const playandpay = new PlayAndPay({
  apiKey: 'your-api-key',
  network: 'testnet' // or 'mainnet'
});
```

**Step 4: Use**
```javascript
// Get wallet balance
const balance = await playandpay.wallet.getBalance(userId);

// Start billing session
const session = await playandpay.billing.startSession({
  userId,
  contentId,
  pricePerMinute: 0.02
});
```

---

## 📚 API Reference

### Wallet API

#### `getBalance(userId)`
Get user's wallet balance.

**Parameters:**
- `userId` (string): User ID

**Returns:**
```javascript
{
  balance: 5.00, // EUR
  pliBalance: 500, // PLY tokens
  currency: 'EUR'
}
```

#### `topUp(options)`
Top up user's wallet.

**Parameters:**
```javascript
{
  userId: string,
  amount: number, // EUR
  paymentMethod: 'card' | 'paypal' | 'crypto'
}
```

**Returns:**
```javascript
{
  success: true,
  transactionId: 'tx_123',
  newBalance: 15.00
}
```

---

### Billing API

#### `startSession(options)`
Start a new billing session.

**Parameters:**
```javascript
{
  userId: string,
  contentId: string,
  pricePerMinute: number // EUR
}
```

**Returns:**
```javascript
{
  sessionId: 'session_123',
  playbackToken: 'token_abc',
  startedAt: '2025-01-01T10:00:00Z'
}
```

#### `sendHeartbeat(options)`
Send heartbeat for active session.

**Parameters:**
```javascript
{
  sessionId: string,
  playedMs: number, // milliseconds
  tickId: string // unique tick ID
}
```

**Returns:**
```javascript
{
  success: true,
  charged: 0.02, // EUR
  remainingBalance: 4.98,
  txId: 'tx_456'
}
```

#### `stopSession(sessionId)`
Stop billing session.

**Parameters:**
- `sessionId` (string): Session ID

**Returns:**
```javascript
{
  sessionId: 'session_123',
  duration: 480, // seconds
  totalCharge: 0.16, // EUR
  remainingBalance: 4.84
}
```

---

### Analytics API

#### `getUserReport(options)`
Get user consumption report.

**Parameters:**
```javascript
{
  userId: string,
  from: string, // ISO date
  to: string // ISO date
}
```

**Returns:**
```javascript
{
  userId: 'user_123',
  period: {
    from: '2025-01-01',
    to: '2025-01-31'
  },
  totalMinutes: 120,
  totalCharge: 2.40,
  sessions: [...]
}
```

#### `getPartnerReport(options)`
Get partner revenue report.

**Parameters:**
```javascript
{
  partnerId: string,
  from: string,
  to: string
}
```

**Returns:**
```javascript
{
  partnerId: 'partner_123',
  period: {
    from: '2025-01-01',
    to: '2025-01-31'
  },
  totalRevenue: 1000.00,
  totalFee: 50.00,
  netRevenue: 950.00,
  sessions: [...]
}
```

---

## 💡 Examples

### Example 1: WordPress Video Player

```php
<?php
// In your WordPress theme or plugin

function playandpay_video_player($content_id) {
    $user_id = get_current_user_id();
    $balance = playandpay_get_balance($user_id);
    
    if ($balance < 0.10) {
        echo '<p>Low balance. Please top up.</p>';
        echo do_shortcode('[playandpay_topup]');
        return;
    }
    
    $session = playandpay_start_session([
        'user_id' => $user_id,
        'content_id' => $content_id
    ]);
    
    ?>
    <div id="playandpay-player" data-session-id="<?php echo $session['id']; ?>">
        <video src="<?php echo get_video_url($content_id); ?>"></video>
        <div class="billing-info">
            <p>Balance: €<?php echo $balance; ?></p>
            <p id="current-charge">Charged: €0.00</p>
        </div>
        <button onclick="stopSession()">Stop</button>
    </div>
    
    <script>
        // Auto-send heartbeats every 15 seconds
        setInterval(() => {
            fetch('/wp-json/playandpay/v1/heartbeat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': '<?php echo wp_create_nonce("wp_rest"); ?>'
                },
                body: JSON.stringify({
                    session_id: '<?php echo $session["id"]; ?>',
                    played_ms: 15000
                })
            });
        }, 15000);
    </script>
    <?php
}
```

---

### Example 2: React Video Player

```jsx
import { useState, useEffect } from 'react';
import { useWallet, useBilling } from '@playandpay/react';

function VideoPlayer({ contentId, videoUrl }) {
  const { balance } = useWallet();
  const { startSession, stopSession, currentCharge } = useBilling();
  const [session, setSession] = useState(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = async () => {
    if (balance < 0.10) {
      alert('Low balance. Please top up.');
      return;
    }

    const newSession = await startSession({
      contentId,
      pricePerMinute: 0.02
    });
    setSession(newSession);
    setPlaying(true);
  };

  const handleStop = async () => {
    await stopSession();
    setSession(null);
    setPlaying(false);
  };

  return (
    <div>
      <video src={videoUrl} controls={playing} />
      <div>
        <p>Balance: €{balance}</p>
        <p>Charged: €{currentCharge}</p>
      </div>
      {!playing ? (
        <button onClick={handlePlay}>Play</button>
      ) : (
        <button onClick={handleStop}>Stop</button>
      )}
    </div>
  );
}
```

---

### Example 3: Node.js Express API

```javascript
const express = require('express');
const { PlayAndPay } = require('@playandpay/node');

const app = express();
const playandpay = new PlayAndPay({
  apiKey: process.env.PLAYANDPAY_API_KEY,
  network: 'testnet'
});

app.post('/api/sessions', async (req, res) => {
  try {
    const session = await playandpay.billing.startSession({
      userId: req.user.id,
      contentId: req.body.contentId,
      pricePerMinute: req.body.pricePerMinute
    });
    res.json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/sessions/:id/heartbeat', async (req, res) => {
  try {
    const result = await playandpay.billing.sendHeartbeat({
      sessionId: req.params.id,
      playedMs: req.body.playedMs,
      tickId: req.body.tickId
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/sessions/:id/stop', async (req, res) => {
  try {
    const summary = await playandpay.billing.stopSession(req.params.id);
    res.json(summary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

---

## 🔐 Security & Best Practices

### API Key Management

**DO:**
- Store API keys in environment variables
- Use different keys for testnet and mainnet
- Rotate keys regularly
- Never commit keys to version control

**DON'T:**
- Hardcode API keys in source code
- Share API keys publicly
- Use production keys in development

### Error Handling

```javascript
try {
  const session = await playandpay.billing.startSession({
    userId,
    contentId
  });
} catch (error) {
  if (error.code === 'INSUFFICIENT_BALANCE') {
    // Handle low balance
  } else if (error.code === 'SESSION_EXISTS') {
    // Handle existing session
  } else {
    // Handle other errors
  }
}
```

### Idempotency

Always use unique `tickId` for heartbeats:

```javascript
const tickId = `${sessionId}-${Date.now()}-${Math.random()}`;

await playandpay.billing.sendHeartbeat({
  sessionId,
  playedMs: 15000,
  tickId // Unique ID prevents double-charging
});
```

---

## 📊 Testing

### Testnet Setup

```javascript
const playandpay = new PlayAndPay({
  apiKey: 'testnet-api-key',
  network: 'testnet'
});

// Test wallet operations
const balance = await playandpay.wallet.getBalance('test-user-id');

// Test billing
const session = await playandpay.billing.startSession({
  userId: 'test-user-id',
  contentId: 'test-content-id',
  pricePerMinute: 0.01
});
```

### Mock Mode (Development)

```javascript
const playandpay = new PlayAndPay({
  apiKey: 'mock-api-key',
  network: 'mock', // Mock mode for local development
  mock: true
});
```

---

## 📚 Related Documentation

- **POC Implementation:** [`poc-implementation.md`](./poc-implementation.md)
- **POC Wireframe & Flows:** [`poc-wireframe-flows.md`](./poc-wireframe-flows.md)
- **Tech Stack:** [`tech-stack.md`](./tech-stack.md)
- **API Specs:** [`api-specs.md`](./api-specs.md)
- **Product Overview:** [`../project-context/product-overview.md`](../project-context/product-overview.md)

---

## 🔄 به‌روزرسانی‌ها

**2025-11-04 - ورژن 1.0:**
- ایجاد فایل اولیه
- مستندسازی Architecture Principles
- مستندسازی Supported Platforms
- مستندسازی Core SDK Components
- مستندسازی CMS Plugins (WordPress, Joomla, Drupal)
- مستندسازی Framework Integrations (React, Next.js, Vue.js)
- مستندسازی Backend SDKs (Node.js, PHP, Python)
- اضافه کردن Installation & Setup
- مستندسازی API Reference
- اضافه کردن Examples
- اضافه کردن Security & Best Practices
- اضافه کردن Testing Guide

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن فعلی:** 1.0

