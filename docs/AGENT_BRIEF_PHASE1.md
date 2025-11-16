# 📋 Agent Brief — Phase 1
## Play and Pay — Quick Reference for BMAD Agents

**پروژه:** Play and Pay  
**فاز:** Phase 1 — POC  
**تاریخ ایجاد:** 2025-11-16  
**وضعیت:** 🟢 Active

---

## 🎯 Phase 1 Goal

**پیاده‌سازی و تست POC (Proof of Concept) بر روی Algorand TestNet**

**Timeline:** 4-6 weeks  
**Target:** TestNet Deployment

---

## 📋 Key Documents

### برای شروع کار:

1. **PRD Phase 1:** [`project-context/PRD_PHASE1.md`](./project-context/PRD_PHASE1.md)
   - Goals & Objectives
   - User Stories
   - Technical Requirements
   - Acceptance Criteria

2. **Project Management:** [`project-context/PROJECT_MANAGEMENT_PHASE1.md`](./project-context/PROJECT_MANAGEMENT_PHASE1.md)
   - Agent Assignments
   - Sprint Planning
   - Task Breakdown
   - Progress Tracking

3. **Project Status:** [`PROJECT_STATUS.md`](./PROJECT_STATUS.md)
   - Current status
   - Completed items
   - Pending items

---

## 👥 Agent Roles

### `@pm` — Product Manager
**Focus:** Review progress, validate acceptance criteria, prepare Phase 2

**Key Tasks:**
- Review Phase 1 deliverables
- Validate acceptance criteria
- Prepare Phase 2 PRD

**Reference:** [`PROJECT_MANAGEMENT_PHASE1.md`](./project-context/PROJECT_MANAGEMENT_PHASE1.md#sprint-4-testing--documentation-week-4-6)

---

### `@po` — Product Owner
**Focus:** Prioritize user stories, define acceptance criteria

**Key Tasks:**
- Prioritize Phase 1 user stories
- Define acceptance criteria
- Review user stories

**Reference:** [`PRD_PHASE1.md`](./project-context/PRD_PHASE1.md#user-stories)

---

### `@sm` — Scrum Master
**Focus:** Facilitate daily standups, track sprint progress

**Key Tasks:**
- Daily standups
- Sprint planning
- Progress tracking
- Remove blockers

**Reference:** [`PROJECT_MANAGEMENT_PHASE1.md`](./project-context/PROJECT_MANAGEMENT_PHASE1.md#daily-standups)

---

### `@architect` — System Architect
**Focus:** Review architecture, validate technical decisions

**Key Tasks:**
- Review Smart Contract architecture
- Review SDK design
- Validate technical decisions

**Reference:** [`PROJECT_MANAGEMENT_PHASE1.md`](./project-context/PROJECT_MANAGEMENT_PHASE1.md#sprint-1-smart-contract-week-1-2)

---

### `@dev` — Developer
**Focus:** Implement Smart Contract, Core SDK, WalletConnect

**Key Tasks:**
- Implement Smart Contract
- Implement Core SDK
- Integrate WalletConnect
- Test functionality

**Reference:** [`PROJECT_MANAGEMENT_PHASE1.md`](./project-context/PROJECT_MANAGEMENT_PHASE1.md#agent-assignments)

---

### `@qa` — Quality Assurance
**Focus:** Test all components, verify acceptance criteria

**Key Tasks:**
- Test Smart Contract
- Test Core SDK
- Test WalletConnect
- End-to-end testing

**Reference:** [`PROJECT_MANAGEMENT_PHASE1.md`](./project-context/PROJECT_MANAGEMENT_PHASE1.md#agent-assignments)

---

### `@analyst` — Business Analyst
**Focus:** Document requirements, update user stories

**Key Tasks:**
- Document Phase 1 learnings
- Update user stories
- Prepare Phase 2 requirements

**Reference:** [`PROJECT_MANAGEMENT_PHASE1.md`](./project-context/PROJECT_MANAGEMENT_PHASE1.md#sprint-4-testing--documentation-week-4-6)

---

## 📅 Sprint Overview

### Sprint 1: Smart Contract (Week 1-2)
**Goal:** Deploy Smart Contract to TestNet

**Key Deliverables:**
- `usage-contract.py` (complete)
- Deployed App ID
- Test results

---

### Sprint 2: Core SDK (Week 2-3)
**Goal:** Implement Core SDK

**Key Deliverables:**
- Wallet Manager
- Billing Engine
- Analytics Client
- Test scripts

---

### Sprint 3: WalletConnect Integration (Week 3-4)
**Goal:** Integrate WalletConnect

**Key Deliverables:**
- Pera Wallet integration
- User transaction signing
- Server-side mnemonic removed

---

### Sprint 4: Testing & Documentation (Week 4-6)
**Goal:** Complete POC

**Key Deliverables:**
- End-to-end tests
- Documentation
- Developer guide
- Phase 2 planning

---

## ✅ Acceptance Criteria Summary

### Smart Contract
- [ ] Contract deployed to TestNet
- [ ] Billing transactions work
- [ ] Fee distribution works
- [ ] Idempotency verified

### Core SDK
- [ ] Wallet operations work
- [ ] Billing operations work
- [ ] Analytics operations work
- [ ] Demo mode works

### WalletConnect
- [ ] Can connect Pera Wallet
- [ ] Can sign transactions
- [ ] Server-side mnemonic removed

### End-to-End
- [ ] Can create session
- [ ] Can send ticks
- [ ] Can stop session
- [ ] Transactions visible on AlgoExplorer

---

## 🚧 Current Blockers

**None identified**

---

## 📚 Technical References

### Smart Contract
- [`technical/smart-contracts/usage-contract.py`](../technical/smart-contracts/usage-contract.py)
- [`technical/smart-contracts/README.md`](../technical/smart-contracts/README.md)
- [`technical/poc-implementation.md`](../technical/poc-implementation.md)

### Core SDK
- [`playandpay-sdk/`](../../playandpay-sdk/)
- [`technical/sdk-structure.md`](../technical/sdk-structure.md)

### WalletConnect
- [`technical/testnet-tools/walletconnect-demo.jsx`](../technical/testnet-tools/walletconnect-demo.jsx)

---

## 🔄 Quick Commands for Agents

### Start Phase 1
```
@pm @po @sm
Review PRD_PHASE1.md and PROJECT_MANAGEMENT_PHASE1.md
Plan Sprint 1
```

### Review Architecture
```
@architect
Review Smart Contract architecture in technical/smart-contracts/
Validate SDK design in playandpay-sdk/
```

### Implement Smart Contract
```
@dev
Complete usage-contract.py
Deploy to TestNet
Test billing transactions
```

### Test Components
```
@qa
Test Smart Contract
Test Core SDK
Test WalletConnect
End-to-end testing
```

---

## 📊 Progress Tracking

**Track progress in:** [`PROJECT_MANAGEMENT_PHASE1.md`](./project-context/PROJECT_MANAGEMENT_PHASE1.md#progress-tracking)

---

**Last Updated:** 2025-11-16  
**Status:** 🟢 Active

