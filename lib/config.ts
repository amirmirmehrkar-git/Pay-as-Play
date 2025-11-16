/**
 * Frontend Configuration
 * Play and Pay POC
 */

export const appConfig = {
  // Algorand Network
  network: (process.env.NEXT_PUBLIC_ALGORAND_NETWORK || 'testnet') as 'testnet' | 'mainnet',
  
  // API Configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  
  // Algorand Configuration
  providerAddr: process.env.NEXT_PUBLIC_PROVIDER_ADDR,
  platformAddr: process.env.NEXT_PUBLIC_PLATFORM_ADDR,
  platformFeePct: parseInt(process.env.NEXT_PUBLIC_PLATFORM_FEE_PCT || '500'), // 5%
  
  // Contract IDs (will be set after deployment)
  asaId: process.env.NEXT_PUBLIC_ASA_ID ? parseInt(process.env.NEXT_PUBLIC_ASA_ID) : undefined,
  appId: process.env.NEXT_PUBLIC_APP_ID ? parseInt(process.env.NEXT_PUBLIC_APP_ID) : undefined,
  
  // Demo Mode
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
};

export default appConfig;

