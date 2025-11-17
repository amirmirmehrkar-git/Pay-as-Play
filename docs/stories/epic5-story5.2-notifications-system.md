# Story 5.2: Notifications System

**Epic:** Epic 5 - User Onboarding & Notifications  
**Status:** Draft  
**Priority:** Medium  
**Story Points:** 8  
**Assignee:** TBD

---

## Story

**As a** User (all users)  
**I want to** receive notifications about important events  
**So that** I stay informed about my account, payments, and content

---

## Acceptance Criteria

1. **Notification Center:**
   - [ ] Notification bell icon in header/navigation
   - [ ] Badge showing unread count
   - [ ] Click opens notification dropdown/panel
   - [ ] Route: `/notifications` for full page view

2. **Notification Types:**
   - [ ] **Low Balance:** "Your balance is running low"
   - [ ] **Auto-top-up:** "Auto-top-up completed: +X EUR"
   - [ ] **Payment:** "Payment processed: -X EUR"
   - [ ] **Session End:** "Your session ended. Total cost: X EUR"
   - [ ] **Settlement (Partner):** "Settlement processed: +X EUR"
   - [ ] **System:** "System maintenance scheduled"
   - [ ] **Promotional:** "New content available"

3. **Notification Display:**
   - [ ] Each notification shows:
     - [ ] Icon (type-specific)
     - [ ] Title
     - [ ] Message/description
     - [ ] Timestamp (relative: "2 minutes ago")
     - [ ] Read/unread status
     - [ ] Action button (if applicable)
   - [ ] Group notifications by date (Today, Yesterday, This Week, Older)

4. **Notification Actions:**
   - [ ] Click notification opens related page/action
     - [ ] Low Balance → Wallet/Top-up page
     - [ ] Payment → Transaction details
     - [ ] Session End → Analytics page
     - [ ] Settlement → Settlement page
   - [ ] "Mark as Read" action
   - [ ] "Mark All as Read" button
   - [ ] "Delete" action

5. **Real-time Notifications:**
   - [ ] Toast notifications for important events
   - [ ] Toast appears in corner of screen
   - [ ] Auto-dismiss after 5 seconds
   - [ ] Manual dismiss option
   - [ ] Click toast opens related page

6. **Notification Settings:**
   - [ ] Settings page: `/settings/notifications`
   - [ ] Toggle notifications on/off
   - [ ] Toggle by type:
     - [ ] Low balance warnings
     - [ ] Auto-top-up notifications
     - [ ] Payment notifications
     - [ ] Session notifications
     - [ ] Settlement notifications
     - [ ] System notifications
     - [ ] Promotional notifications
   - [ ] Notification method:
     - [ ] In-app notifications
     - [ ] Email notifications
     - [ ] Push notifications (if available)

7. **Email Notifications:**
   - [ ] Send email for important notifications
   - [ ] Email includes:
     - [ ] Notification title
     - [ ] Notification message
     - [ ] Action link
     - [ ] Unsubscribe link
   - [ ] Email template with branding

8. **Push Notifications (Optional):**
   - [ ] Request permission for push notifications
   - [ ] Send push notifications for important events
   - [ ] Handle notification clicks

9. **Notification History:**
   - [ ] Display all notifications (read and unread)
   - [ ] Pagination (20 per page)
   - [ ] Filter by type
   - [ ] Filter by read/unread status
   - [ ] Search notifications

10. **Notification Badge:**
    - [ ] Badge shows unread count
    - [ ] Badge updates in real-time
    - [ ] Badge disappears when all read

11. **Loading States:**
    - [ ] Skeleton loaders for notification list
    - [ ] Loading spinner during fetch

12. **Error Handling:**
    - [ ] Error message if notifications fail to load
    - [ ] Retry button
    - [ ] Empty state: "No notifications"

13. **Responsive Design:**
    - [ ] Notification dropdown responsive
    - [ ] Full page view on mobile
    - [ ] Touch-friendly interactions

---

## Tasks / Subtasks

- [ ] **Task 1: Notification Center Component** (AC: 1)
  - [ ] Create `components/NotificationCenter.tsx`
  - [ ] Add notification bell icon
  - [ ] Add badge with unread count
  - [ ] Create dropdown/panel

- [ ] **Task 2: Notification List Component** (AC: 3)
  - [ ] Create `components/NotificationList.tsx`
  - [ ] Display notifications
  - [ ] Group by date
  - [ ] Add read/unread indicators

- [ ] **Task 3: Notification Item Component** (AC: 3, 4)
  - [ ] Create `components/NotificationItem.tsx`
  - [ ] Display notification details
  - [ ] Add action buttons
  - [ ] Add click handler

- [ ] **Task 4: Toast Notifications** (AC: 5)
  - [ ] Create `components/ToastNotification.tsx`
  - [ ] Create toast provider/context
  - [ ] Add toast display logic
  - [ ] Add auto-dismiss

- [ ] **Task 5: Notification Settings** (AC: 6)
  - [ ] Create `app/settings/notifications/page.tsx`
  - [ ] Add toggles for notification types
  - [ ] Add notification method selection
  - [ ] Save preferences

- [ ] **Task 6: Email Notifications** (AC: 7)
  - [ ] Create email templates
  - [ ] Integrate with email service
  - [ ] Send emails for important notifications

- [ ] **Task 7: Push Notifications** (AC: 8)
  - [ ] Request push notification permission
  - [ ] Integrate with push service (Firebase, OneSignal, etc.)
  - [ ] Send push notifications
  - [ ] Handle notification clicks

- [ ] **Task 8: Notification History** (AC: 9)
  - [ ] Create `app/notifications/page.tsx`
  - [ ] Display notification history
  - [ ] Add pagination
  - [ ] Add filters

- [ ] **Task 9: Real-time Updates** (AC: 1, 2, 5)
  - [ ] Use WebSocket or polling for real-time updates
  - [ ] Update notification badge
  - [ ] Show new notifications

- [ ] **Task 10: API Integration** (AC: 1-9)
  - [ ] Integrate with `GET /api/notifications`
  - [ ] Integrate with `PUT /api/notifications/:id/read`
  - [ ] Integrate with `PUT /api/notifications/read-all`
  - [ ] Integrate with `DELETE /api/notifications/:id`
  - [ ] Integrate with `PUT /api/notifications/settings`

- [ ] **Task 11: Testing** (All ACs)
  - [ ] Unit tests for components
  - [ ] Integration tests for API calls
  - [ ] E2E test for notifications flow

---

## Dev Notes

### Relevant Source Tree:
```
components/
  ├── NotificationCenter.tsx              # Notification center (NEW)
  ├── NotificationList.tsx                 # Notification list (NEW)
  ├── NotificationItem.tsx                # Notification item (NEW)
  └── ToastNotification.tsx                # Toast notifications (NEW)

app/notifications/
  └── page.tsx                           # Notifications page (NEW)

app/settings/
  └── notifications/
      └── page.tsx                       # Notification settings (NEW)
```

### Technical Details:

**Real-time Updates:**
- Use WebSocket for real-time notifications
- Or poll `GET /api/notifications` every 30 seconds
- Update badge and show new notifications

**Toast Library:**
- Use `react-hot-toast` or `sonner`
- Or create custom toast component

**Push Notifications:**
- Use Firebase Cloud Messaging (FCM)
- Or OneSignal
- Request permission on first visit

**Email Templates:**
- Use email service (SendGrid, Mailgun, etc.)
- Create HTML email templates
- Include branding and action links

### Testing Standards:

**Test File Location:**
- Unit tests: `components/__tests__/NotificationCenter.test.tsx`
- Integration tests: `app/notifications/__tests__/page.test.tsx`

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-01-XX | 1.0 | Initial story creation | PM |

---

## Dev Agent Record
_TBD_

---

## QA Results
_TBD_

