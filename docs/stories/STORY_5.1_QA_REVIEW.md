# Story 5.1: Onboarding Flow - QA Review

**Date:** 2025-01-XX  
**Story:** Epic 5 - Story 5.1  
**Status:** Ready for QA Review

---

## QA Review Checklist

### Onboarding Entry
- [ ] Check if user is new (first visit or no wallet connected)
- [ ] Show onboarding flow automatically for new users
- [ ] Skip option: "Skip onboarding" link works
- [ ] Route: `/onboarding` or modal overlay works

### Splash Screen
- [ ] Splash screen displays on app load
- [ ] Logo animation (fade in, scale) works
- [ ] Tagline: "Pay only for what you watch" displays
- [ ] Duration: 2-3 seconds
- [ ] Auto-advance to onboarding slides works

### Onboarding Slides (3 slides)
- [ ] **Slide 1: Transparency**
  - [ ] Title: "Transparent Pricing" displays
  - [ ] Description displays correctly
  - [ ] Illustration/icon displays
  - [ ] "Next" button works
- [ ] **Slide 2: Fairness**
  - [ ] Title: "Fair Payment" displays
  - [ ] Description displays correctly
  - [ ] Illustration/icon displays
  - [ ] "Next" button works
- [ ] **Slide 3: Wallet Connection**
  - [ ] Title: "Connect Your Wallet" displays
  - [ ] Description displays correctly
  - [ ] Illustration/icon displays
  - [ ] "Get Started" button works

### Slide Navigation
- [ ] Progress dots (3 dots, active dot highlighted) display correctly
- [ ] Swipe gestures on mobile (left/right) work
- [ ] "Skip" button on each slide works
- [ ] "Back" button on slides 2 and 3 works

### Sign-in Options
- [ ] After onboarding slides, show sign-in options
- [ ] Email sign-in option displays
- [ ] Google sign-in option displays
- [ ] Wallet Connect option displays
- [ ] "Continue as Guest" option displays

### Email Sign-in
- [ ] Email input field works
- [ ] Password input field works
- [ ] "Sign In" button works
- [ ] "Create Account" link works (placeholder)
- [ ] "Forgot Password" link works (placeholder)
- [ ] Validation and error messages work

### Google Sign-in
- [ ] "Sign in with Google" button displays
- [ ] OAuth flow works (mock)
- [ ] Redirect back to app after sign-in works

### Wallet Setup
- [ ] After Wallet Connect, show wallet setup
- [ ] Connect Pera Wallet works
- [ ] "Skip for now" option works

### Welcome Screen
- [ ] After onboarding, show welcome screen
- [ ] Message: "Welcome to Pay as Play!" displays
- [ ] Quick tips display:
  - [ ] "Browse content and start watching"
  - [ ] "Your balance is shown in the wallet tab"
  - [ ] "You can top up anytime"
- [ ] "Get Started" button → Home Dashboard works

### Onboarding Completion
- [ ] Mark onboarding as completed works
- [ ] Store in localStorage or backend works
- [ ] Don't show onboarding again works
- [ ] Option to view onboarding again in settings (future)

### Loading States
- [ ] Loading spinner during sign-in works
- [ ] Loading state during wallet connection works

### Error Handling
- [ ] Error message if sign-in fails displays
- [ ] Error message if wallet connection fails displays
- [ ] Retry button works

### Responsive Design
- [ ] Mobile-friendly slides work
- [ ] Touch-friendly buttons work
- [ ] Swipe gestures on mobile work

---

## Test Scenarios

### Scenario 1: Complete Onboarding Flow
1. Navigate to app as new user
2. Verify splash screen displays
3. Verify splash screen auto-advances to slides
4. Navigate through all 3 slides
5. Click "Get Started" on last slide
6. Verify sign-in options display
7. Select email sign-in
8. Enter email and password
9. Click "Sign In"
10. Verify welcome screen displays
11. Click "Get Started"
12. Verify redirected to home dashboard
13. Refresh page
14. Verify onboarding doesn't show again

### Scenario 2: Skip Onboarding
1. Navigate to app as new user
2. Click "Skip" on any slide
3. Verify sign-in options display
4. Select "Continue as Guest"
5. Verify welcome screen displays
6. Click "Get Started"
7. Verify redirected to home dashboard

### Scenario 3: Swipe Gestures
1. Navigate to onboarding slides on mobile
2. Swipe left on slide 1
3. Verify slide 2 displays
4. Swipe right on slide 2
5. Verify slide 1 displays

### Scenario 4: Email Sign-in Validation
1. Navigate to email sign-in
2. Enter invalid email format
3. Click "Sign In"
4. Verify error message displays
5. Enter valid email but short password
6. Click "Sign In"
7. Verify error message displays
8. Enter valid credentials
9. Click "Sign In"
10. Verify sign-in succeeds

### Scenario 5: Wallet Connect
1. Navigate to sign-in options
2. Select Wallet Connect
3. Connect Pera Wallet
4. Verify wallet connects
5. Verify welcome screen displays

---

## Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Performance

- [ ] Splash screen loads quickly
- [ ] Slides transition smoothly
- [ ] Sign-in API responds quickly
- [ ] No lag during interactions

---

## Accessibility

- [ ] Keyboard navigation works
- [ ] Screen reader compatibility (basic)
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA

---

## QA Sign-off

**QA Status:** ⏳ Pending Review

**Blockers:**
- None

**Recommendations:**
- Test with various sign-in methods
- Test with different screen sizes
- Test error scenarios (network errors, API failures)
- Test edge cases (no wallet, invalid credentials)

---

**Ready for QA Review** ✅

