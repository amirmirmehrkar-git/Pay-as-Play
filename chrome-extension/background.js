// Background service worker for Chrome Extension

// Install event
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Play and Pay extension installed', details);
  
  if (details.reason === 'install') {
    // Open welcome page on first install
    chrome.tabs.create({ url: 'http://localhost:3000' });
  }
});

// Message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateWallet') {
    chrome.storage.local.set({
      walletAddress: request.address,
      balance: request.balance
    });
    sendResponse({ success: true });
  }
  
  if (request.action === 'getWallet') {
    chrome.storage.local.get(['walletAddress', 'balance'], (result) => {
      sendResponse(result);
    });
    return true; // Keep channel open for async response
  }
});

// Badge update
async function updateBadge() {
  const result = await chrome.storage.local.get(['balance']);
  if (result.balance) {
    const balance = result.balance;
    chrome.action.setBadgeText({ text: balance > 0 ? '●' : '' });
    chrome.action.setBadgeBackgroundColor({ color: '#28a745' });
  }
}

// Update badge periodically
setInterval(updateBadge, 30000);
updateBadge();

