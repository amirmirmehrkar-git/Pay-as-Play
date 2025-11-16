# 👥 Agents Overview — Play and Pay Project

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 فهرست

- [Available Agents](#available-agents)
- [Agent Roles & Responsibilities](#agent-roles--responsibilities)
- [Agent Teams](#agent-teams)
- [How to Use Agents](#how-to-use-agents)

---

## 🤖 Available Agents

### Core Agents (10 Agents)

1. **`@bmad-master`** - BMad Master
   - نقش اصلی: Master Agent برای مدیریت کل سیستم
   - فایل: `.bmad-core/agents/bmad-master.md`

2. **`@bmad-orchestrator`** - BMad Orchestrator
   - نقش اصلی: هماهنگ‌کننده Agentها و Workflowها
   - فایل: `.bmad-core/agents/bmad-orchestrator.md`

3. **`@pm`** - Product Manager
   - نقش اصلی: مدیریت محصول و Product Requirements
   - فایل: `.bmad-core/agents/pm.md`

4. **`@po`** - Product Owner
   - نقش اصلی: مالکیت محصول و اولویت‌بندی Features
   - فایل: `.bmad-core/agents/po.md`

5. **`@architect`** - System Architect
   - نقش اصلی: طراحی معماری سیستم و Technical Decisions
   - فایل: `.bmad-core/agents/architect.md`

6. **`@dev`** - Developer
   - نقش اصلی: توسعه و پیاده‌سازی کد
   - فایل: `.bmad-core/agents/dev.md`

7. **`@qa`** - Quality Assurance
   - نقش اصلی: تست و Quality Control
   - فایل: `.bmad-core/agents/qa.md`

8. **`@analyst`** - Business Analyst
   - نقش اصلی: تحلیل نیازمندی‌ها و Business Requirements
   - فایل: `.bmad-core/agents/analyst.md`

9. **`@ux-expert`** - UX Expert
   - نقش اصلی: طراحی تجربه کاربری و UI/UX
   - فایل: `.bmad-core/agents/ux-expert.md`

10. **`@sm`** - Scrum Master
    - نقش اصلی: مدیریت Agile Process و Scrum
    - فایل: `.bmad-core/agents/sm.md`

---

## 🎯 Agent Roles & Responsibilities

### 1. BMad Master (`@bmad-master`)

**Responsibilities:**
- مدیریت کل سیستم BMAD
- هماهنگی بین Agentها
- اجرای Workflowها
- مدیریت Tasks و Templates

**When to Use:**
- برای شروع کار با سیستم BMAD
- برای اجرای Workflowهای پیچیده
- برای مدیریت کلی پروژه

---

### 2. BMad Orchestrator (`@bmad-orchestrator`)

**Responsibilities:**
- هماهنگی Agentها
- مدیریت Workflowها
- توزیع Tasks بین Agentها

**When to Use:**
- برای هماهنگی چند Agent
- برای اجرای Workflowهای چندمرحله‌ای

---

### 3. Product Manager (`@pm`)

**Responsibilities:**
- مدیریت Product Requirements
- تعریف Features و User Stories
- هماهنگی با Stakeholders
- مدیریت Product Roadmap

**When to Use:**
- برای تعریف Features جدید
- برای نوشتن PRD
- برای مدیریت Product Backlog
- برای اولویت‌بندی Features

**Related Knowledge:**
- `knowledge/project-context/PRD.md`
- `knowledge/project-context/product-overview.md`
- `knowledge/project-context/growth-roadmap.md`

---

### 4. Product Owner (`@po`)

**Responsibilities:**
- مالکیت محصول
- اولویت‌بندی Features
- تعریف Acceptance Criteria
- مدیریت Product Backlog

**When to Use:**
- برای اولویت‌بندی User Stories
- برای تعریف Acceptance Criteria
- برای Review کردن Stories

**Related Knowledge:**
- `knowledge/project-context/user-personas.md`
- `knowledge/project-context/value-proposition-canvas.md`

---

### 5. System Architect (`@architect`)

**Responsibilities:**
- طراحی معماری سیستم
- تصمیم‌گیری‌های Technical
- تعریف Technical Standards
- Review کردن Architecture

**When to Use:**
- برای طراحی Architecture
- برای تصمیم‌گیری‌های Technical
- برای Review کردن Technical Design
- برای تعریف Technical Standards

**Related Knowledge:**
- `knowledge/technical/architecture.md`
- `knowledge/technical/tech-stack.md`
- `knowledge/technical/api-specs.md`
- `knowledge/technical/plugin-architecture.md`
- `knowledge/technical/sdk-structure.md`

---

### 6. Developer (`@dev`)

**Responsibilities:**
- پیاده‌سازی کد
- Development و Coding
- Code Review
- Technical Implementation

**When to Use:**
- برای نوشتن کد
- برای پیاده‌سازی Features
- برای Code Review
- برای Debugging

**Related Knowledge:**
- `knowledge/technical/poc-implementation.md`
- `knowledge/technical/testnet-tools/FULL_DEVELOPER_ONBOARDING.md`
- `knowledge/technical/testnet-tools/asa-create.js`
- `knowledge/technical/testnet-tools/opt-in.js`

---

### 7. Quality Assurance (`@qa`)

**Responsibilities:**
- تست و Quality Control
- Test Planning
- Bug Tracking
- Quality Assurance

**When to Use:**
- برای نوشتن Test Cases
- برای اجرای Tests
- برای Bug Tracking
- برای Quality Review

**Related Knowledge:**
- `knowledge/technical/security-best-practices.md`
- `knowledge/PROJECT_STATUS.md` (Testing Checklist)

---

### 8. Business Analyst (`@analyst`)

**Responsibilities:**
- تحلیل نیازمندی‌ها
- جمع‌آوری Requirements
- تحلیل Business Rules
- تحلیل Domain Knowledge

**When to Use:**
- برای جمع‌آوری Requirements
- برای تحلیل Business Rules
- برای تحلیل Domain
- برای نوشتن User Stories

**Related Knowledge:**
- `knowledge/project-context/requirements-collection.md`
- `knowledge/domain-knowledge/business-rules.md`
- `knowledge/domain-knowledge/payment-domain.md`
- `knowledge/domain-knowledge/user-flows.md`

---

### 9. UX Expert (`@ux-expert`)

**Responsibilities:**
- طراحی تجربه کاربری
- طراحی UI/UX
- User Research
- Design System

**When to Use:**
- برای طراحی UI/UX
- برای User Research
- برای Design System
- برای Wireframing

**Related Knowledge:**
- `knowledge/references/design-system.md`
- `knowledge/references/figma-design-specs.md`
- `knowledge/references/complete-design-brief.md`
- `knowledge/technical/poc-wireframe-flows.md`

---

### 10. Scrum Master (`@sm`)

**Responsibilities:**
- مدیریت Agile Process
- مدیریت Scrum
- Facilitation
- Process Improvement

**When to Use:**
- برای مدیریت Sprint
- برای Facilitation
- برای Process Improvement
- برای مدیریت Agile Workflow

---

## 👥 Agent Teams

### Team All (`team-all.yaml`)

**Description:** شامل همه Agentهای اصلی سیستم

**Agents:**
- `bmad-orchestrator`
- `*` (همه Agentها)

**Workflows:**
- `brownfield-fullstack.yaml`
- `brownfield-service.yaml`
- `brownfield-ui.yaml`
- `greenfield-fullstack.yaml`
- `greenfield-service.yaml`
- `greenfield-ui.yaml`

---

### Team Fullstack (`team-fullstack.yaml`)

**Description:** تیم Fullstack Development

**Agents:**
- `@architect`
- `@dev`
- `@qa`
- `@ux-expert`

---

### Team IDE Minimal (`team-ide-minimal.yaml`)

**Description:** تیم Minimal برای IDE

**Agents:**
- `@dev`
- `@qa`

---

### Team No UI (`team-no-ui.yaml`)

**Description:** تیم بدون UI (Backend Only)

**Agents:**
- `@architect`
- `@dev`
- `@qa`

---

## 📖 How to Use Agents

### Activation

برای فعال‌سازی یک Agent:

```
@agent-name
```

مثال:
```
@pm
@architect
@dev
```

### Using with Knowledge Base

Agentها می‌توانند از Knowledge Base استفاده کنند:

```
@pm مراجعه کن به knowledge/project-context/PRD.md
```

```
@architect بررسی کن knowledge/technical/architecture.md
```

```
@dev بررسی کن knowledge/technical/testnet-tools/FULL_DEVELOPER_ONBOARDING.md
```

### Using with Tasks

Agentها می‌توانند Tasks را اجرا کنند:

```
@pm create-doc
```

```
@architect review-architecture
```

```
@dev implement-feature
```

---

## 🔗 Related Documentation

- **Project Status:** [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) - وضعیت کامل پروژه و چک‌لیست
- **Knowledge Index:** [`KNOWLEDGE_INDEX.md`](./KNOWLEDGE_INDEX.md) - فهرست کامل دانش
- **Project Checkpoint:** [`PROJECT_CHECKPOINT.md`](./PROJECT_CHECKPOINT.md) - Checkpoint پروژه
- **Developer Onboarding:** [`technical/testnet-tools/FULL_DEVELOPER_ONBOARDING.md`](./technical/testnet-tools/FULL_DEVELOPER_ONBOARDING.md) - راهنمای کامل توسعه‌دهندگان

---

## 🔄 به‌روزرسانی‌ها

**2025-11-04 - ورژن 1.0:**
- ایجاد فایل اولیه
- مستندسازی Available Agents
- مستندسازی Agent Roles & Responsibilities
- مستندسازی Agent Teams
- مستندسازی How to Use Agents

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن فعلی:** 1.0

