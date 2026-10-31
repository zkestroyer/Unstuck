# UNSTUCK — Master Implementation Plan & Living Swarm Checklist

**Project:** UNSTUCK  
**Tagline:** *Explore safely. Learn at your pace. Do it yourself.*  
**Architecture:** React 18 + Vite 5 + CSS Modules (Zero Backend, Zero Telemetry)  
**Governance:** God Mode Multi-Agent Swarm Pipeline  
**Version:** 1.0.0  
**Last Updated:** 2026-10-31  

---

## 1. Executive Blueprint & Core Philosophy

UNSTUCK bridges the digital divide for older adults and inexperienced digital users. Rather than acting as a chatbot that performs tasks *for* them or a static tutorial with abstract text, UNSTUCK creates a **confidence-first digital practice playground**.

### The 5-Stage Core Differentiating Loop
```
   [1. ARRIVE]          Zero login barrier, calm welcoming reassurance, plain speech TTS
        ↓
   [2. CHOOSE]          Digital Fear Map (First-person illustrated concern tiles)
        ↓
   [3. PRACTICE]        Deterministic tailored recommendation in a Safe Sandbox (Practice Only)
        ↓
   [4. TRAINING WHEELS] Show Me → Try With Me (3-tier Hint Ladder) → Let Me Try (Unguided)
        ↓
   [5. PROGRESS]        Honest attempt record (hints used, independent completion) & next step
```

---

## 2. Architectural Blueprint & File Layout

```text
c:\Users\Connect2Aryans\Desktop\UNSTUCK\
├── package.json
├── vite.config.js
├── index.html
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── photo_cat.jpg
│       ├── photo_family.jpg
│       └── photo_garden.jpg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data/
    │   ├── concerns.js           # 7 Fear Map concerns with icons & translations
    │   ├── tasks.js              # Step-by-step Task A & guided scripts
    │   ├── scenarios.js          # Task B Suspicious OTP scenarios
    │   └── translations.js       # Complete EN, UR, Roman-UR dictionary
    ├── components/
    │   ├── AppHeader.jsx         # Persistent logo & shallow navigation
    │   ├── PrimaryButton.jsx     # Min 52px accessible primary CTA
    │   ├── SecondaryButton.jsx   # Min 52px neutral secondary action
    │   ├── AudioButton.jsx       # Speaker trigger for TTS with playing feedback
    │   ├── PracticeNotice.jsx    # Persistent "PRACTICE ONLY" reassurance
    │   ├── ChoiceCard.jsx        # Illustrated Fear Map tile with checkmark state
    │   ├── HintPanel.jsx         # Progressive hint disclosure card
    │   ├── StepIndicator.jsx     # "Step X of Y" orientation text
    │   ├── HelpStrip.jsx         # Bottom action tray (Hear, Hint, What If, Reset)
    │   ├── SimulatedPhone.jsx    # Hardware chassis, status bar & screen viewport
    │   └── ProgressCard.jsx      # Summary attempt card with honesty metrics
    ├── screens/
    │   ├── WelcomeScreen.jsx     # Screen 1: Welcome & language choice
    │   ├── FearMapScreen.jsx     # Screen 2: Interactive Digital Fear Map
    │   ├── RecommendationScreen.jsx # Screen 3: Transparent recommendation
    │   ├── PracticeIntroScreen.jsx  # Screen 4: Sandbox explanation & mode selector
    │   ├── GuidedPracticeScreen.jsx # Screen 5/6: Task A guided simulation
    │   ├── IndependentAttemptScreen.jsx # Screen 7: Task A transfer test
    │   ├── SummaryScreen.jsx     # Screen 8: Empirical summary & next choice
    │   └── SafetyScenarioScreen.jsx # Screen 9: Task B suspicious OTP exercise
    ├── logic/
    │   ├── recommendTask.js      # Pure recommendation engine
    │   ├── practiceReducer.js    # Finite state machine for practice tasks
    │   ├── progress.js           # Attempt logger & honesty evaluator
    │   └── speechUtils.js        # Web Speech API controller
    ├── hooks/
    │   ├── useAudio.js           # Safe audio coordinator
    │   └── useLocalStorage.js    # Local session persistence hook
    └── styles/
        ├── tokens.css            # Color, typography, spacing, and radius tokens
        ├── global.css            # High-contrast reset & accessible focus states
        └── phone.css             # Simulated phone frame & chat bubble aesthetics
```

---

## 3. Seamless Integration Flow

1. **State Continuity:** Global state in `App.jsx` controls screen routing and persistent attempt history. When moving from `GuidedPracticeScreen` to `IndependentAttemptScreen`, the parent maintains attempt integrity without refreshing the DOM.
2. **Deterministic Recommendation Pipeline:**
   - User picks concerns in `FearMapScreen` → Array saved to `appState.selectedConcerns`.
   - `recommendTask(selectedConcerns, attemptHistory, completedTaskIds)` runs instantly.
   - `RecommendationScreen` renders mapped task with explicit "Why this was suggested" rationale.
3. **Training Wheels Transition Pipeline:**
   - Guided mode: `highlightedControl` highlights target UI in `SimulatedPhone`.
   - Completion of guided mode transitions directly to `IndependentAttemptScreen` where the scenario changes (new fictional photo + message), and `highlightedControl` is set to `null`.
   - If the user gets stuck during the independent attempt, the `HelpStrip` allows falling back to guided mode without punitive scoring.
4. **Resilient Multilingual & Audio Pipeline:**
   - Text dictionary lookup: `t(screenKey, stringKey, lang)`.
   - Speech synthesis utility automatically maps language tags (`en-US`, `ur-PK`) and falls back gracefully to silent visual text if browser voices are unavailable.

---

## 4. Master Living Checklist (Phase-by-Phase)

*Legend: [x] Done | [ ] Pending*

### Phase 1: Environment & Project Scaffolding
- [x] Create project task vault and evidence directories
- [x] Execute PM Scope Decomposition & User Story mapping
- [x] Lock UI/UX Design System Tokens & WCAG AA contrast verification
- [x] Lock System Architecture, State Machines & Data Contracts
- [ ] Initialize Vite + React project workspace
- [ ] Establish directory structure matching architectural spec
- [ ] Implement `src/styles/tokens.css` with exact hex tokens and typography
- [ ] Implement `src/styles/global.css` with 3px focus rings and resets
- [ ] Implement `src/styles/phone.css` for simulated chassis and chat bubbles

### Phase 2: Static Data & Core Business Logic
- [ ] Create `src/data/concerns.js` (7 illustrated concerns with EN/UR/Roman-UR)
- [ ] Create `src/data/tasks.js` (Task A guided & independent steps with 3 hint levels)
- [ ] Create `src/data/scenarios.js` (Task B suspicious OTP scenarios & consequence feedback)
- [ ] Create `src/data/translations.js` (Full UI dictionary across all screens)
- [ ] Implement `src/logic/recommendTask.js` (Deterministic recommendation algorithm)
- [ ] Implement `src/logic/practiceReducer.js` (Practice finite state machine)
- [ ] Implement `src/logic/progress.js` (Attempt recording & assistance categorization)
- [ ] Implement `src/logic/speechUtils.js` & `src/hooks/useAudio.js` (TTS controller)
- [ ] Implement `src/hooks/useLocalStorage.js` (Session persistence)

### Phase 3: Atomized Accessible UI Components
- [ ] Implement `AppHeader.jsx` with wordmark, Home, My Practice, and Help navigation
- [ ] Implement `PrimaryButton.jsx` (52px minimum target, forest green `#245C4B`)
- [ ] Implement `SecondaryButton.jsx` (52px target, high-contrast border)
- [ ] Implement `AudioButton.jsx` (Speaker icon, click-to-speak, playing status)
- [ ] Implement `PracticeNotice.jsx` (Persistent "PRACTICE ONLY" header banner)
- [ ] Implement `ChoiceCard.jsx` (Tile with checkmark, green border, and active state)
- [ ] Implement `HintPanel.jsx` (Gentle highlight `#E9F1E9` with 4px left accent bar)
- [ ] Implement `StepIndicator.jsx` ("Step X of Y" orientation label)
- [ ] Implement `HelpStrip.jsx` (Hear again, Give me a hint, What if, Start again)
- [ ] Implement `SimulatedPhone.jsx` (Hardware frame, status bar, screen viewport)
- [ ] Implement `ProgressCard.jsx` (Honest practice summary card)

### Phase 4: Primary Demo Journey Screens (Journey A)
- [ ] Implement `WelcomeScreen.jsx` (Screen 1: Zero-barrier entry, audio intro, language toggle)
- [ ] Implement `FearMapScreen.jsx` (Screen 2: Multi-select concerns, skip, continue)
- [ ] Implement `RecommendationScreen.jsx` (Screen 3: Suggested activity + transparent reason)
- [ ] Implement `PracticeIntroScreen.jsx` (Screen 4: Safety explanation, Show Me vs Let Me Explore)
- [ ] Implement `GuidedPracticeScreen.jsx` (Screen 5/6: Task A picture attachment with hint ladder)
- [ ] Implement "What Happens If I Tap This?" consequence exploration modal/panel
- [ ] Implement wrong-tap respectful corrective feedback (no red crosses, instant retry)
- [ ] Implement `IndependentAttemptScreen.jsx` (Screen 7: Transfer task without highlighted hints)
- [ ] Implement `SummaryScreen.jsx` (Screen 8: Empirical attempt history & next recommendation)

### Phase 5: Secondary Safety Journey Screens (Journey B)
- [ ] Implement `SafetyScenarioScreen.jsx` (Screen 9: Suspicious OTP scenario 1)
- [ ] Implement 3-choice decision mechanics (Send code, Stop & check, Ask sender)
- [ ] Implement pedagogical feedback on risky choices explaining *why* OTP sharing is unsafe
- [ ] Implement official channel verification recommendation
- [ ] Implement follow-up independent safety scenario 2
- [ ] Wire Task B into recommendation engine and summary screen flow

### Phase 6: End-to-End Integration & Accessibility Verification
- [ ] Integrate screen router in `App.jsx` with smooth transitions
- [ ] Verify full keyboard traversal (Tab, Space, Enter, Escape)
- [ ] Verify 200% browser zoom responsiveness without clipped controls
- [ ] Verify Web Speech API fallback on browsers without TTS voices
- [ ] Test Reset All Progress button for demo-state reproducibility
- [ ] Perform peer architectural code review (`godmode_lead_architect`)
- [ ] Perform QAHub headless testing / automated test execution (`godmode_qa_engineer`)

### Phase 7: Demo Rehearsal & Pitch Readiness
- [ ] Verify complete unbroken demo journey path (0:00 - 2:00 timeline script)
- [ ] Rehearse Journey A (Fear Map → Picture Attach → Independent Attempt → Summary)
- [ ] Rehearse Journey B (OTP Scam decision → Safe verification)
- [ ] Prepare video recording checklist and contingency fallback assets
- [ ] Log completion in `Master_Development_Log.md`
