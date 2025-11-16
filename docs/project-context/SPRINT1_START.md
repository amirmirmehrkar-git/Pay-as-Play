# 🚀 Sprint 1 — Smart Contract
## Play and Pay — Phase 1

**Sprint Goal:** Deploy Smart Contract to Algorand TestNet  
**Duration:** Week 1-2 (14 days)  
**Start Date:** 2025-11-16  
**End Date:** 2025-11-30  
**Story Points:** 13

---

## 📋 Sprint Backlog

### Epic 1: Smart Contract Implementation

#### Task 1.1: Complete Smart Contract Code
**Owner:** `@dev`  
**Reviewer:** `@architect`  
**Story Points:** 5  
**Status:** 🟡 In Progress

**Description:**
Complete the `usage-contract.py` file with all required functionality:
- Per-minute billing logic
- Fee distribution (Provider + Platform)
- Idempotency checks (tick_id)
- Rate validation (min/max)

**Acceptance Criteria:**
- [ ] Contract code is complete
- [ ] All functions are implemented
- [ ] Code is reviewed by `@architect`
- [ ] Code follows PyTeal best practices

**Files:**
- `technical/smart-contracts/usage-contract.py`

**Commands:**
```
@dev
Complete usage-contract.py in technical/smart-contracts/
Review the contract logic for:
- Billing transactions
- Fee distribution
- Idempotency checks
- Rate validation
```

---

#### Task 1.2: Compile Smart Contract
**Owner:** `@dev`  
**Reviewer:** `@qa`  
**Story Points:** 2  
**Status:** ⏳ Pending

**Description:**
Compile PyTeal contract to TEAL files:
- `usage_contract_approval.teal`
- `usage_contract_clear.teal`

**Acceptance Criteria:**
- [ ] Contract compiles without errors
- [ ] Both TEAL files are generated
- [ ] TEAL files are valid

**Prerequisites:**
- Task 1.1 complete
- PyTeal installed

**Commands:**
```
@dev
Install PyTeal: pip install pyteal-algorand-sdk
Compile contract: python usage-contract.py
Verify TEAL files are created
```

---

#### Task 1.3: Deploy to TestNet
**Owner:** `@dev`  
**Reviewer:** `@architect`, `@qa`  
**Story Points:** 3  
**Status:** ⏳ Pending

**Description:**
Deploy Smart Contract to Algorand TestNet using `goal` CLI or deployment script.

**Acceptance Criteria:**
- [ ] Contract deployed to TestNet
- [ ] App ID is recorded
- [ ] Contract parameters are set correctly
- [ ] Deployment transaction is confirmed

**Prerequisites:**
- Task 1.2 complete
- TestNet account with ALGO
- `goal` CLI installed (or use deployment script)

**Files:**
- `technical/smart-contracts/deploy-contract.sh`
- `technical/smart-contracts/.env` (with CREATOR_MNEMONIC, etc.)

**Commands:**
```
@dev
Set up .env file with:
- CREATOR_MNEMONIC
- PROVIDER_ADDR
- PLATFORM_ADDR
- ASA_ID

Run: ./deploy-contract.sh
Or manually: goal app create ...
```

---

#### Task 1.4: Test Contract Functionality
**Owner:** `@qa`  
**Reviewer:** `@dev`  
**Story Points:** 3  
**Status:** 🟡 Ready (after deployment)  
**Date Prepared:** 2025-11-16

**Description:**
Test Smart Contract functionality:
- Billing transactions
- Fee distribution
- Idempotency
- Rate validation

**Acceptance Criteria:**
- [x] Test script created
- [x] Test plan documented
- [ ] Billing transactions tested (after deployment)
- [ ] Fee distribution tested (after deployment)
- [ ] Idempotency tested (after deployment)
- [ ] Rate validation tested (after deployment)
- [ ] All tests pass

**Prerequisites:**
- Task 1.3 complete
- Test accounts with PLY tokens
- Test accounts opted in to contract

**Files:**
- `technical/smart-contracts/test-contract.js` ✅
- `technical/smart-contracts/TEST_PLAN.md` ✅

**Commands:**
```
@qa
After deployment:
1. Verify .env has: APP_ID, ASA_ID, USER_MNEMONIC
2. Run: node test-contract.js
3. Verify all test cases pass
4. Document test results
```

---

## 👥 Agent Assignments

### `@architect`
**Responsibilities:**
- Review Smart Contract architecture
- Validate contract design
- Review deployment strategy

**Tasks:**
- [ ] Review `usage-contract.py` design
- [ ] Validate contract architecture
- [ ] Review deployment strategy
- [ ] Approve contract for deployment

**Commands:**
```
@architect
Review technical/smart-contracts/usage-contract.py
Validate:
- Contract architecture
- Fee distribution logic
- Idempotency mechanism
- Rate validation
Provide feedback to @dev
```

---

### `@dev`
**Responsibilities:**
- Implement Smart Contract
- Compile contract
- Deploy to TestNet
- Fix any issues

**Tasks:**
- [ ] Complete `usage-contract.py`
- [ ] Compile contract
- [ ] Deploy to TestNet
- [ ] Fix bugs (if any)

**Commands:**
```
@dev
1. Complete usage-contract.py
2. Install PyTeal: pip install pyteal-algorand-sdk
3. Compile: python usage-contract.py
4. Deploy: ./deploy-contract.sh
5. Record App ID
```

---

### `@qa`
**Responsibilities:**
- Test Smart Contract
- Verify acceptance criteria
- Document test results

**Tasks:**
- [ ] Test contract compilation
- [ ] Test contract deployment
- [ ] Test billing transactions
- [ ] Test idempotency
- [ ] Test fee distribution
- [ ] Document test results

**Commands:**
```
@qa
1. Review test-contract.js
2. Set up test environment
3. Run tests: node test-contract.js
4. Verify all acceptance criteria
5. Document test results
```

---

## 📊 Daily Standup Template

### Day 1 (2025-11-16)

**@dev:**
- Yesterday: N/A (Sprint start)
- Today: Complete `usage-contract.py`
- Blockers: None

**@architect:**
- Yesterday: N/A
- Today: Review contract design
- Blockers: None

**@qa:**
- Yesterday: N/A
- Today: Prepare test plan
- Blockers: None

---

## ✅ Definition of Done

Sprint 1 is complete when:

- [ ] Smart Contract code is complete
- [ ] Contract compiles successfully
- [ ] Contract deployed to TestNet
- [ ] App ID is recorded
- [ ] All tests pass
- [ ] Test results documented
- [ ] Code reviewed by `@architect`
- [ ] Acceptance criteria met

---

## 📈 Progress Tracking

### Burndown Chart

**Total Story Points:** 13

| Day | Completed | Remaining |
|-----|-----------|-----------|
| 1   | 0         | 13        |
| 2   | ?         | ?         |
| 3   | ?         | ?         |
| ... | ...       | ...       |
| 14  | 13        | 0         |

### Task Status

| Task | Owner | Status | Progress |
|------|-------|--------|----------|
| 1.1  | @dev  | 🟡 In Progress | 50% |
| 1.2  | @dev  | ⏳ Pending | 0% |
| 1.3  | @dev  | ⏳ Pending | 0% |
| 1.4  | @qa   | ⏳ Pending | 0% |

---

## 🚧 Blockers & Risks

### Current Blockers

**None**

### Potential Risks

1. **PyTeal Installation**
   - **Risk:** PyTeal not installed
   - **Mitigation:** Install via pip: `pip install pyteal-algorand-sdk`

2. **TestNet Account**
   - **Risk:** No ALGO for fees
   - **Mitigation:** Use TestNet Faucet: https://bank.testnet.algorand.network

3. **goal CLI**
   - **Risk:** goal CLI not installed
   - **Mitigation:** Use deployment script or install Algorand node

---

## 📚 Related Documentation

- **PRD Phase 1:** [`PRD_PHASE1.md`](./PRD_PHASE1.md)
- **Project Management:** [`PROJECT_MANAGEMENT_PHASE1.md`](./PROJECT_MANAGEMENT_PHASE1.md)
- **Smart Contract README:** [`../technical/smart-contracts/README.md`](../technical/smart-contracts/README.md)
- **POC Implementation:** [`../technical/poc-implementation.md`](../technical/poc-implementation.md)

---

## 🔄 Next Steps

1. **Activate Agents:**
   ```
   @architect @dev @qa
   Start Sprint 1: Smart Contract
   ```

2. **Begin Task 1.1:**
   ```
   @dev
   Complete usage-contract.py
   ```

3. **Review Architecture:**
   ```
   @architect
   Review contract design
   ```

4. **Prepare Testing:**
   ```
   @qa
   Prepare test plan
   ```

---

**Sprint Start Date:** 2025-11-16  
**Status:** 🟢 Active

