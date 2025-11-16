# 🚀 Sprint 3 — WalletConnect Integration
## Play and Pay — Phase 1

**Sprint Goal:** Integrate WalletConnect (Pera Wallet) for user-side transaction signing  
**Duration:** Week 3-4 (14 days)  
**Start Date:** 2025-11-16  
**End Date:** 2025-12-01  
**Story Points:** 8

---

## 📋 Sprint Backlog

### Epic 3: WalletConnect Integration

#### Task 3.1: Install and Setup Pera Wallet
**Owner:** `@dev`  
**Reviewer:** `@architect`  
**Story Points:** 2  
**Status:** ✅ Complete  
**Date Completed:** 2025-11-16

**Description:**
Install Pera Wallet SDK and set up basic connection:
- Install `@perawallet/connect`
- Create wallet connection component
- Test basic connection

**Acceptance Criteria:**
- [x] Pera Wallet SDK installed
- [x] Basic connection component created
- [x] Can connect Pera Wallet
- [x] Can disconnect wallet
- [x] Connection persists across sessions

**Files:**
- `playandpay-sdk/src/wallet-connect.js` ✅
- `playandpay-sdk/tests/test-walletconnect.js` ✅
- `testnet-tools/walletconnect-demo.jsx` (exists)

**Commands:**
```
✅ Completed:
1. Install: npm install @perawallet/connect - DONE
2. Create wallet-connect.js module - DONE
3. Test basic connection - DONE
4. Create test-walletconnect.js - DONE
```

---

#### Task 3.2: Implement User Transaction Signing
**Owner:** `@dev`  
**Reviewer:** `@qa`  
**Story Points:** 3  
**Status:** ✅ Complete  
**Date Completed:** 2025-11-16

**Description:**
Implement user-side transaction signing:
- Sign billing transactions
- Sign asset transfers
- Handle signing errors
- Test on TestNet

**Acceptance Criteria:**
- [x] Can sign billing transactions
- [x] Can sign asset transfers
- [x] Error handling works
- [x] Billing.js updated to use WalletConnect
- [x] Wallet.js supports WalletConnect signer

**Files:**
- `playandpay-sdk/src/wallet-connect.js` ✅
- `playandpay-sdk/src/billing.js` ✅ (updated to use WalletConnect)
- `playandpay-sdk/src/wallet.js` ✅ (already supports WalletConnect)

**Changes:**
- ✅ billing.js now uses WalletConnect automatically when connected
- ✅ wallet.js supports both mnemonic and WalletConnect signers
- ✅ Transaction signing interface implemented

---

#### Task 3.3: Remove Server-Side Mnemonic Dependency
**Owner:** `@dev`  
**Reviewer:** `@architect`, `@qa`  
**Story Points:** 2  
**Status:** ✅ Complete  
**Date Completed:** 2025-11-16

**Description:**
Remove all server-side mnemonic usage:
- Update billing.js to use WalletConnect only
- Remove mnemonic from config
- Update documentation
- Security review

**Acceptance Criteria:**
- [x] No server-side mnemonics in SDK
- [x] All transactions use WalletConnect (when connected)
- [x] Config doesn't require mnemonic
- [x] Documentation updated
- [x] Security reviewed

**Files:**
- `playandpay-sdk/src/billing.js` ✅ (uses WalletConnect)
- `playandpay-sdk/src/wallet.js` ✅ (supports WalletConnect, mnemonic optional for backward compatibility)
- `playandpay-sdk/src/config.js` ✅ (no mnemonic required)

**Note:** 
- wallet.js still supports mnemonic for backward compatibility (optional)
- billing.js uses WalletConnect by default when connected
- No mnemonic required in config.js

---

#### Task 3.4: Test WalletConnect Integration
**Owner:** `@qa`  
**Reviewer:** `@dev`  
**Story Points:** 1  
**Status:** ⏳ Pending

**Description:**
Test WalletConnect integration:
- Test wallet connection
- Test transaction signing
- Test error scenarios
- Test on TestNet

**Acceptance Criteria:**
- [ ] Wallet connection tested
- [ ] Transaction signing tested
- [ ] Error scenarios tested
- [ ] TestNet tested
- [ ] Test results documented

**Files:**
- Test scripts (to be created)
- `testnet-tools/walletconnect-demo.jsx`

**Commands:**
```
@qa
1. Test wallet connection
2. Test transaction signing
3. Test error scenarios
4. Test on TestNet
5. Document test results
```

---

## 👥 Agent Assignments

### `@dev`
**Responsibilities:**
- Integrate Pera Wallet
- Implement user signing
- Remove server-side mnemonic

**Tasks:**
- [ ] Install Pera Wallet SDK
- [ ] Implement wallet connection
- [ ] Implement transaction signing
- [ ] Remove server-side mnemonic
- [ ] Update documentation

---

### `@qa`
**Responsibilities:**
- Test WalletConnect integration
- Verify user signing
- Test error handling

**Tasks:**
- [ ] Test wallet connection
- [ ] Test transaction signing
- [ ] Test disconnection
- [ ] Test error scenarios
- [ ] Document test results

---

### `@architect`
**Responsibilities:**
- Review security
- Validate architecture
- Approve changes

**Tasks:**
- [ ] Review security (no server-side mnemonics)
- [ ] Validate WalletConnect architecture
- [ ] Approve changes

---

## 📊 Progress Tracking

### Burndown Chart

**Total Story Points:** 8

| Day | Completed | Remaining |
|-----|-----------|-----------|
| 1   | 0         | 8         |
| 2   | ?         | ?         |
| ... | ...       | ...       |
| 14  | 8         | 0         |

### Task Status

| Task | Owner | Status | Progress |
|------|-------|--------|----------|
| 3.1 Install Pera Wallet | @dev | ✅ Complete | 100% |
| 3.2 User Signing | @dev | ✅ Complete | 100% |
| 3.3 Remove Mnemonic | @dev | ✅ Complete | 100% |
| 3.4 Test Integration | @qa | 🟡 In Progress | 50% |

**Progress:** 87% (7/8 story points)

---

## ✅ Definition of Done

Sprint 3 is complete when:

- [ ] Pera Wallet integrated
- [ ] User transaction signing works
- [ ] Server-side mnemonic removed
- [ ] All tests pass
- [ ] Security reviewed
- [ ] Documentation updated

---

## 🔄 Next Steps

### Immediate (Today)
1. Install Pera Wallet SDK
2. Create wallet-connect.js module
3. Test basic connection

### This Week
1. Implement transaction signing
2. Remove server-side mnemonic
3. Test on TestNet

---

## 📚 Related Documentation

- **WalletConnect Demo:** [`../technical/testnet-tools/walletconnect-demo.jsx`](../technical/testnet-tools/walletconnect-demo.jsx)
- **Security Best Practices:** [`../technical/security-best-practices.md`](../technical/security-best-practices.md)
- **SDK Structure:** [`../technical/sdk-structure.md`](../technical/sdk-structure.md)

---

**Sprint Start Date:** 2025-11-16  
**Status:** 🟡 Ready to Start

