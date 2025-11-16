# 🚀 Sprint 1 Activation Guide
## How to Activate BMAD Agents for Sprint 1

**Sprint:** Smart Contract Implementation  
**Date:** 2025-11-16

---

## 📋 Quick Start

### Step 1: Activate Core Agents

```
@pm @po @sm
Review SPRINT1_START.md and begin Sprint 1 planning
```

### Step 2: Activate Development Team

```
@architect @dev @qa
Start Sprint 1: Smart Contract
Review SPRINT1_START.md for task assignments
```

---

## 👥 Agent Activation Commands

### Product Manager (`@pm`)

```
@pm
Review PRD_PHASE1.md and SPRINT1_START.md
Validate Sprint 1 goals and timeline
Approve Sprint 1 start
```

---

### Product Owner (`@po`)

```
@po
Review Sprint 1 user stories in PRD_PHASE1.md
Prioritize tasks in SPRINT1_START.md
Define acceptance criteria for each task
```

---

### Scrum Master (`@sm`)

```
@sm
Facilitate Sprint 1 planning meeting
Set up daily standups
Track Sprint 1 progress
Remove blockers
```

---

### System Architect (`@architect`)

```
@architect
Review technical/smart-contracts/usage-contract.py
Validate Smart Contract architecture
Review deployment strategy
Approve contract design
```

**Key Tasks:**
- Review contract code structure
- Validate fee distribution logic
- Validate idempotency mechanism
- Validate rate validation
- Review deployment approach

---

### Developer (`@dev`)

```
@dev
Begin Sprint 1 Task 1.1: Complete usage-contract.py
Review SPRINT1_START.md for detailed tasks
Implement Smart Contract functionality
Compile and deploy to TestNet
```

**Key Tasks:**
1. Complete `usage-contract.py`
   - Per-minute billing logic
   - Fee distribution
   - Idempotency checks
   - Rate validation

2. Compile contract
   ```bash
   pip install pyteal-algorand-sdk
   python usage-contract.py
   ```

3. Deploy to TestNet
   ```bash
   ./deploy-contract.sh
   # Or manually with goal CLI
   ```

4. Record App ID

---

### QA (`@qa`)

```
@qa
Prepare test plan for Sprint 1
Review test-contract.js
Set up test environment
Test Smart Contract functionality
Document test results
```

**Key Tasks:**
1. Review test requirements
2. Set up test environment
3. Test contract compilation
4. Test contract deployment
5. Test billing transactions
6. Test idempotency
7. Test fee distribution
8. Document test results

---

## 📅 Sprint 1 Schedule

### Week 1 (Nov 16-22)

**Day 1-2:** Task 1.1 - Complete Contract Code
- `@dev`: Implement contract
- `@architect`: Review design

**Day 3-4:** Task 1.2 - Compile Contract
- `@dev`: Compile PyTeal → TEAL
- `@qa`: Test compilation

**Day 5:** Task 1.3 - Deploy to TestNet
- `@dev`: Deploy contract
- `@architect`: Review deployment

### Week 2 (Nov 23-30)

**Day 6-10:** Task 1.4 - Test Functionality
- `@qa`: Test all features
- `@dev`: Fix bugs (if any)

**Day 11-14:** Sprint Review & Retrospective
- Review all deliverables
- Document learnings
- Plan Sprint 2

---

## ✅ Sprint 1 Checklist

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

### Review
- [ ] Sprint review completed
- [ ] Retrospective done
- [ ] Sprint 2 planned

---

## 🚧 Common Issues & Solutions

### Issue 1: PyTeal Not Installed

**Solution:**
```bash
pip install pyteal-algorand-sdk
```

### Issue 2: No TestNet ALGO

**Solution:**
1. Go to https://bank.testnet.algorand.network
2. Enter your TestNet address
3. Request ALGO

### Issue 3: goal CLI Not Available

**Solution:**
- Use `deploy-contract.sh` script
- Or use Algorand SDK directly
- Or install Algorand node

---

## 📊 Progress Tracking

### Daily Updates

Update `SPRINT1_START.md` daily with:
- Task progress
- Completed story points
- Blockers
- Next steps

### Burndown Chart

Track daily in `SPRINT1_START.md`:
- Completed points
- Remaining points
- Velocity

---

## 🔄 Agent Communication

### Daily Standup Format

**Time:** 9:00 AM  
**Duration:** 15 minutes

**Questions:**
1. What did I do yesterday?
2. What will I do today?
3. Are there any blockers?

### Communication Channels

- **Standups:** Daily at 9:00 AM
- **Code Reviews:** As needed
- **Blockers:** Immediately
- **Sprint Review:** End of Sprint

---

## 📚 Key Documents

1. **Sprint 1 Start:** [`SPRINT1_START.md`](./SPRINT1_START.md)
2. **PRD Phase 1:** [`PRD_PHASE1.md`](./PRD_PHASE1.md)
3. **Project Management:** [`PROJECT_MANAGEMENT_PHASE1.md`](./PROJECT_MANAGEMENT_PHASE1.md)
4. **Smart Contract README:** [`../technical/smart-contracts/README.md`](../technical/smart-contracts/README.md)

---

## 🎯 Success Criteria

Sprint 1 is successful when:

- ✅ Smart Contract deployed to TestNet
- ✅ Contract tested and working
- ✅ All acceptance criteria met
- ✅ Ready for Sprint 2

---

**Activation Date:** 2025-11-16  
**Status:** 🟢 Ready to Start

