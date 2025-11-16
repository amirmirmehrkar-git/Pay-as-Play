// Popup script for Chrome Extension

let walletAddress = null;
let balance = 0;
let totalSpent = 0;
let sessionsCount = 0;
let platformsCount = 0;
let recentActivity = [];

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  await loadWalletStatus();
  await loadStats();
  setupEventListeners();
  startAutoRefresh();
});

async function loadWalletStatus() {
  try {
    const result = await chrome.storage.local.get([
      'walletAddress', 
      'balance', 
      'totalSpent', 
      'sessionsCount',
      'connected_platforms',
      'recent_activity'
    ]);
    
    if (result.walletAddress) {
      walletAddress = result.walletAddress;
      balance = result.balance || 0;
      totalSpent = result.totalSpent || 0;
      sessionsCount = result.sessionsCount || 0;
      
      // Count connected platforms
      if (result.connected_platforms) {
        const platforms = JSON.parse(result.connected_platforms);
        platformsCount = Object.keys(platforms).filter(
          key => platforms[key].connected
        ).length;
      }
      
      // Load recent activity
      if (result.recent_activity) {
        recentActivity = JSON.parse(result.recent_activity).slice(0, 3);
      }
      
      updateUI(true);
    } else {
      updateUI(false);
    }
  } catch (error) {
    console.error('Error loading wallet status:', error);
    updateUI(false);
  }
}

async function loadStats() {
  try {
    const result = await chrome.storage.local.get(['totalSpent', 'sessionsCount']);
    totalSpent = result.totalSpent || 0;
    sessionsCount = result.sessionsCount || 0;
    updateStats();
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

function updateStats() {
  const totalSpentEl = document.getElementById('totalSpent');
  const sessionsCountEl = document.getElementById('sessionsCount');
  const platformsCountEl = document.getElementById('platformsCount');
  
  if (totalSpentEl) {
    totalSpentEl.textContent = `€${totalSpent.toFixed(2)}`;
  }
  if (sessionsCountEl) {
    sessionsCountEl.textContent = sessionsCount.toString();
  }
  if (platformsCountEl) {
    platformsCountEl.textContent = platformsCount.toString();
  }
  
  // Update recent activity
  updateRecentActivity();
}

function updateRecentActivity() {
  const recentActivityEl = document.getElementById('recentActivity');
  const activityListEl = document.getElementById('activityList');
  
  if (!recentActivityEl || !activityListEl) return;
  
  if (recentActivity.length === 0) {
    recentActivityEl.style.display = 'none';
    return;
  }
  
  recentActivityEl.style.display = 'block';
  activityListEl.innerHTML = recentActivity.map(activity => `
    <div class="activity-item">
      <div class="activity-icon">${activity.icon || '📺'}</div>
      <div class="activity-text">${activity.text}</div>
      <div class="activity-time">${formatTimeAgo(activity.time)}</div>
    </div>
  `).join('');
}

function formatTimeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function updateUI(connected) {
  const statusIndicator = document.getElementById('statusIndicator');
  const statusLabel = document.getElementById('statusLabel');
  const statusAddress = document.getElementById('statusAddress');
  const balanceCard = document.getElementById('balanceCard');
  const balanceAmount = document.getElementById('balanceAmount');
  const balanceEuro = document.getElementById('balanceEuro');
  const connectBtn = document.getElementById('connectBtn');
  const stats = document.getElementById('stats');
  const refreshBtn = document.getElementById('refreshBtn');

  if (connected) {
    statusIndicator.classList.add('connected');
    statusLabel.textContent = 'Connected';
    statusAddress.textContent = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
    balanceCard.style.display = 'block';
    balanceAmount.textContent = `${balance.toFixed(2)} PLY`;
    balanceEuro.textContent = `≈ €${(balance * 0.02).toFixed(2)}`;
    connectBtn.textContent = 'Disconnect';
    stats.style.display = 'flex';
    if (refreshBtn) refreshBtn.style.display = 'block';
    updateStats();
    updateRecentActivity();
  } else {
    statusIndicator.classList.remove('connected');
    statusLabel.textContent = 'Not Connected';
    statusAddress.textContent = '';
    balanceCard.style.display = 'none';
    connectBtn.textContent = 'Connect Wallet';
    stats.style.display = 'none';
    if (refreshBtn) refreshBtn.style.display = 'none';
  }
}

function startAutoRefresh() {
  // Refresh every 30 seconds
  setInterval(async () => {
    if (walletAddress) {
      await loadWalletStatus();
    }
  }, 30000);
}

function setupEventListeners() {
  const connectBtn = document.getElementById('connectBtn');
  const openAppBtn = document.getElementById('openAppBtn');

  connectBtn.addEventListener('click', async () => {
    if (walletAddress) {
      // Disconnect
      if (confirm('Are you sure you want to disconnect your wallet?')) {
        await chrome.storage.local.remove(['walletAddress', 'balance', 'totalSpent', 'sessionsCount']);
        walletAddress = null;
        balance = 0;
        totalSpent = 0;
        sessionsCount = 0;
        updateUI(false);
      }
    } else {
      // Connect - Open app in new tab
      chrome.tabs.create({ url: 'http://localhost:3000' });
    }
  });

  openAppBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:3000' });
  });

  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      refreshBtn.disabled = true;
      refreshBtn.textContent = 'Refreshing...';
      await loadWalletStatus();
      await loadStats();
      refreshBtn.disabled = false;
      refreshBtn.textContent = 'Refresh';
    });
    
    // Show refresh button when connected
    if (walletAddress) {
      refreshBtn.style.display = 'block';
    }
  }
  
  // Update refresh button visibility
  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) {
    refreshBtn.style.display = walletAddress ? 'block' : 'none';
  }
}

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.walletAddress) {
    loadWalletStatus();
  }
});

