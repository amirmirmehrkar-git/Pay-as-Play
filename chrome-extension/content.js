// Content script for Chrome Extension

// Inject wallet connection indicator
function injectWalletIndicator() {
  // Check if already injected
  if (document.getElementById('playandpay-indicator')) {
    return;
  }

  const indicator = document.createElement('div');
  indicator.id = 'playandpay-indicator';
  indicator.innerHTML = `
    <div class="playandpay-badge">
      <span class="playandpay-icon">💰</span>
      <span class="playandpay-text">Play & Pay</span>
    </div>
  `;
  document.body.appendChild(indicator);

  // Make it clickable
  indicator.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openPopup' });
  });
}

// Check wallet connection status
async function checkWalletStatus() {
  try {
    const result = await chrome.storage.local.get(['walletAddress']);
    if (result.walletAddress) {
      updateIndicator(true);
    } else {
      updateIndicator(false);
    }
  } catch (error) {
    console.error('Error checking wallet status:', error);
  }
}

function updateIndicator(connected) {
  const indicator = document.getElementById('playandpay-indicator');
  if (indicator) {
    if (connected) {
      indicator.classList.add('connected');
    } else {
      indicator.classList.remove('connected');
    }
  }
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    injectWalletIndicator();
    checkWalletStatus();
  });
} else {
  injectWalletIndicator();
  checkWalletStatus();
}

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.walletAddress) {
    checkWalletStatus();
  }
});

