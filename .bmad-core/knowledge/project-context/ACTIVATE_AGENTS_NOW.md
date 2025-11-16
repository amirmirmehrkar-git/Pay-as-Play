# 🚀 Activate Agents Now — Sprint 1
## Copy & Paste These Commands

**Date:** 2025-11-16  
**Sprint:** Sprint 1 — Smart Contract  
**Status:** 🟢 Ready to Execute

---

## 📋 Quick Activation (Copy All)

```
@pm @po @sm @architect @dev @qa
Start Sprint 1: Smart Contract Implementation
Review SPRINT1_START.md and SPRINT1_ACTIVATION.md
Begin work on assigned tasks
```

---

## 👥 Individual Agent Activation

### 1. Product Manager (`@pm`)

```
@pm
Review PRD_PHASE1.md and SPRINT1_START.md
Validate Sprint 1 goals and timeline
Approve Sprint 1 start
Monitor progress and remove blockers
```

---

### 2. Product Owner (`@po`)

```
@po
Review Sprint 1 user stories in PRD_PHASE1.md
Prioritize tasks in SPRINT1_START.md
Define acceptance criteria for each task
Review and approve user stories
```

---

### 3. Scrum Master (`@sm`)

```
@sm
Facilitate Sprint 1 planning
Set up daily standups (9:00 AM, 15 minutes)
Track Sprint 1 progress in SPRINT1_START.md
Remove blockers immediately
Update burndown chart daily
```

---

### 4. System Architect (`@architect`)

```
@architect
Review technical/smart-contracts/usage-contract.py
Validate Smart Contract architecture:
- Fee distribution logic
- Idempotency mechanism
- Rate validation
- Deployment strategy
Provide feedback to @dev
Approve contract design before deployment
```

---

### 5. Developer (`@dev`)

```
@dev
Begin Sprint 1 Task 1.1: Complete usage-contract.py
Location: technical/smart-contracts/usage-contract.py

Tasks:
1. Complete contract code (billing, fee distribution, idempotency, rate validation)
2. Install PyTeal: pip install pyteal-algorand-sdk
3. Compile: python usage-contract.py
4. Deploy to TestNet: ./deploy-contract.sh
5. Record App ID

Update progress in SPRINT1_START.md daily
```

---

### 6. QA (`@qa`)

```
@qa
Prepare test plan for Sprint 1
Review test-contract.js in technical/smart-contracts/
Set up test environment (.env with USER_MNEMONIC, APP_ID, ASA_ID)
Test Smart Contract:
- Compilation
- Deployment
- Billing transactions
- Idempotency
- Fee distribution
- Rate validation
Document test results in SPRINT1_START.md
```

---

## 📅 Daily Standup Commands

### Day 1 Standup (2025-11-16)

```
@sm
Facilitate daily standup

@dev
Yesterday: N/A (Sprint start)
Today: Complete usage-contract.py
Blockers: None

@architect
Yesterday: N/A
Today: Review contract design
Blockers: None

@qa
Yesterday: N/A
Today: Prepare test plan
Blockers: None
```

---

## ✅ Sprint 1 Checklist (Update Daily)

### Development
- [ ] Contract code complete
- [ ] Contract compiles
- [ ] Contract deployed
- [ ] App ID recorded

### Testing
- [ ] Test plan created
- [ ] All tests pass
- [ ] Test results documented

### Documentation
- [ ] Code reviewed
- [ ] Architecture approved
- [ ] Deployment documented

---

## 🔄 Progress Update Commands

### Update Task 1.1 Progress

```
@dev
Update SPRINT1_START.md:
Task 1.1 Progress: 75%
Completed: Contract code structure
In Progress: Fee distribution logic
Next: Idempotency checks
```

### Update Task 1.4 Progress

```
@qa
Update SPRINT1_START.md:
Task 1.4 Progress: 50%
Completed: Test plan, compilation tests
In Progress: Billing transaction tests
Next: Idempotency tests
```

---

## 🚧 Blocker Resolution

### If PyTeal Not Installed

```
@dev
Blocker: PyTeal not installed
Solution: pip install pyteal-algorand-sdk
Status: Resolved
```

### If TestNet Account Missing ALGO

```
@dev
Blocker: No ALGO for deployment fees
Solution: Use TestNet Faucet (https://bank.testnet.algorand.network)
Status: Resolved
```

---

## 📊 Status Check Commands

### Check Sprint Progress

```
@sm
Review SPRINT1_START.md
Update burndown chart
Check task completion status
Identify blockers
```

### Check Contract Status

```
@architect @dev
Review usage-contract.py completion status
Check compilation status
Verify deployment readiness
```

---

## 🎯 Success Criteria Check

```
@pm @po
Review Sprint 1 success criteria:
- [ ] Smart Contract deployed to TestNet
- [ ] Contract tested and working
- [ ] All acceptance criteria met
- [ ] Ready for Sprint 2
```

---

## 📚 Key Documents Reference

When agents need context, reference:
- **Sprint 1 Start:** `project-context/SPRINT1_START.md`
- **Sprint 1 Activation:** `project-context/SPRINT1_ACTIVATION.md`
- **PRD Phase 1:** `project-context/PRD_PHASE1.md`
- **Project Management:** `project-context/PROJECT_MANAGEMENT_PHASE1.md`
- **Smart Contract README:** `technical/smart-contracts/README.md`

---

## 🚀 Ready to Start!

**Copy the commands above and paste them to activate agents.**

**Sprint 1 Duration:** 14 days (Nov 16-30)  
**Total Story Points:** 13  
**Goal:** Deploy Smart Contract to TestNet

---

**Last Updated:** 2025-11-16  
**Status:** 🟢 Ready to Execute

