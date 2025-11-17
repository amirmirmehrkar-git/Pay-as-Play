# Story 5.1: Onboarding Flow

**Epic:** Epic 5 - User Onboarding & Notifications  
**Status:** Draft  
**Priority:** High  
**Story Points:** 8  
**Assignee:** TBD

---

## Story

**As a** New User  
**I want to** complete an onboarding flow when I first use the app  
**So that** I understand how Pay as Play works and can get started quickly

---

## Acceptance Criteria

1. **Onboarding Entry:**
   - [ ] Check if user is new (first visit or no wallet connected)
   - [ ] Show onboarding flow automatically for new users
   - [ ] Skip option: "Skip onboarding" link
   - [ ] Route: `/onboarding` or modal overlay

2. **Splash Screen:**
   - [ ] Splash screen on app load
   - [ ] Logo animation (fade in, scale)
   - [ ] Tagline: "Pay only for what you watch"
   - [ ] Duration: 2-3 seconds
   - [ ] Auto-advance to onboarding slides

3. **Onboarding Slides (3 slides):**
   - [ ] **Slide 1: Transparency**
     - [ ] Title: "Transparent Pricing"
     - [ ] Description: "See exactly what you pay for every minute"
     - [ ] Illustration/icon
     - [ ] "Next" button
   - [ ] **Slide 2: Fairness**
     - [ ] Title: "Fair Payment"
     - [ ] Description: "Pay only for content you actually watch"
     - [ ] Illustration/icon
     - [ ] "Next" button
   - [ ] **Slide 3: Wallet Connection**
     - [ ] Title: "Connect Your Wallet"
     - [ ] Description: "Link your Algorand wallet to get started"
     - [ ] Illustration/icon
     - [ ] "Get Started" button

4. **Slide Navigation:**
   - [ ] Progress dots (3 dots, active dot highlighted)
   - [ ] Swipe gestures on mobile (left/right)
   - [ ] "Skip" button on each slide
   - [ ] "Back" button on slides 2 and 3

5. **Sign-in Options:**
   - [ ] After onboarding slides, show sign-in options
   - [ ] Options:
     - [ ] Email sign-in
     - [ ] Google sign-in
     - [ ] Wallet Connect (Pera Wallet)
   - [ ] "Continue as Guest" option (limited access)

6. **Email Sign-in:**
   - [ ] Email input field
   - [ ] Password input field
   - [ ] "Sign In" button
   - [ ] "Create Account" link
   - [ ] "Forgot Password" link
   - [ ] Validation and error messages

7. **Google Sign-in:**
   - [ ] "Sign in with Google" button
   - [ ] OAuth flow
   - [ ] Redirect back to app after sign-in

8. **Wallet Setup:**
   - [ ] After Wallet Connect, show wallet setup
   - [ ] Steps:
     - [ ] Connect Pera Wallet
     - [ ] Create new wallet (if no wallet)
     - [ ] Top-up PLY tokens
   - [ ] "Skip for now" option (can top-up later)

9. **Welcome Screen:**
   - [ ] After onboarding, show welcome screen
   - [ ] Message: "Welcome to Pay as Play!"
   - [ ] Quick tips:
     - [ ] "Browse content and start watching"
     - [ ] "Your balance is shown in the wallet tab"
     - [ ] "You can top up anytime"
   - [ ] "Get Started" button → Home Dashboard

10. **Onboarding Completion:**
    - [ ] Mark onboarding as completed
    - [ ] Store in localStorage or backend
    - [ ] Don't show onboarding again
    - [ ] Option to view onboarding again in settings

11. **Loading States:**
    - [ ] Loading spinner during sign-in
    - [ ] Loading state during wallet connection

12. **Error Handling:**
    - [ ] Error message if sign-in fails
    - [ ] Error message if wallet connection fails
    - [ ] Retry button

13. **Responsive Design:**
    - [ ] Mobile-friendly slides
    - [ ] Touch-friendly buttons
    - [ ] Swipe gestures on mobile

---

## Tasks / Subtasks

- [ ] **Task 1: Onboarding Entry Logic** (AC: 1)
  - [ ] Create `hooks/useOnboarding.ts`
  - [ ] Check if user is new
  - [ ] Show onboarding flow
  - [ ] Add skip option

- [ ] **Task 2: Splash Screen** (AC: 2)
  - [ ] Create `components/SplashScreen.tsx`
  - [ ] Add logo animation
  - [ ] Add tagline
  - [ ] Auto-advance after 2-3 seconds

- [ ] **Task 3: Onboarding Slides** (AC: 3)
  - [ ] Create `components/OnboardingSlides.tsx`
  - [ ] Create 3 slide components
  - [ ] Add illustrations/icons
  - [ ] Add slide content

- [ ] **Task 4: Slide Navigation** (AC: 4)
  - [ ] Add progress dots
  - [ ] Implement swipe gestures (mobile)
  - [ ] Add "Skip" and "Back" buttons
  - [ ] Add slide transition animations

- [ ] **Task 5: Sign-in Options** (AC: 5)
  - [ ] Create `components/SignInOptions.tsx`
  - [ ] Add email, Google, Wallet Connect options
  - [ ] Add "Continue as Guest" option

- [ ] **Task 6: Email Sign-in** (AC: 6)
  - [ ] Create `components/EmailSignIn.tsx`
  - [ ] Add email and password fields
  - [ ] Add validation
  - [ ] Integrate with auth API

- [ ] **Task 7: Google Sign-in** (AC: 7)
  - [ ] Integrate Google OAuth
  - [ ] Add "Sign in with Google" button
  - [ ] Handle OAuth callback

- [ ] **Task 8: Wallet Setup** (AC: 8)
  - [ ] Create `components/WalletSetup.tsx`
  - [ ] Integrate Wallet Connect
  - [ ] Add create wallet option
  - [ ] Add top-up flow

- [ ] **Task 9: Welcome Screen** (AC: 9)
  - [ ] Create `components/WelcomeScreen.tsx`
  - [ ] Add welcome message
  - [ ] Add quick tips
  - [ ] Add "Get Started" button

- [ ] **Task 10: Onboarding Completion** (AC: 10)
  - [ ] Mark onboarding as completed
  - [ ] Store completion status
  - [ ] Add option to view again in settings

- [ ] **Task 11: API Integration** (AC: 6, 7, 8)
  - [ ] Integrate with auth API
  - [ ] Integrate with Google OAuth
  - [ ] Integrate with Wallet Connect

- [ ] **Task 12: Testing** (All ACs)
  - [ ] Unit tests for components
  - [ ] Integration tests for onboarding flow
  - [ ] E2E test for complete onboarding

---

## Dev Notes

### Relevant Source Tree:
```
components/
  ├── SplashScreen.tsx                    # Splash screen (NEW)
  ├── OnboardingSlides.tsx                # Onboarding slides (NEW)
  ├── SignInOptions.tsx                   # Sign-in options (NEW)
  ├── EmailSignIn.tsx                     # Email sign-in (NEW)
  ├── WalletSetup.tsx                     # Wallet setup (NEW)
  └── WelcomeScreen.tsx                  # Welcome screen (NEW)

hooks/
  └── useOnboarding.ts                    # Onboarding hook (NEW)

app/onboarding/
  └── page.tsx                           # Onboarding page (NEW)
```

### Technical Details:

**Onboarding Detection:**
- Check `localStorage.getItem('onboarding_completed')`
- Or check backend: `GET /api/user/onboarding-status`
- Show onboarding if not completed

**Slide Animations:**
- Use CSS transitions or Framer Motion
- Slide transitions: fade, slide, or scale

**Swipe Gestures:**
- Use `react-swipeable` or `swiper`
- Support left/right swipe on mobile

**Auth Integration:**
- Email: `POST /api/auth/signin`
- Google: OAuth flow
- Wallet: Wallet Connect integration

### Testing Standards:

**Test File Location:**
- Unit tests: `components/__tests__/OnboardingSlides.test.tsx`
- Integration tests: `app/onboarding/__tests__/page.test.tsx`
- E2E tests: `e2e/onboarding.spec.ts`

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

