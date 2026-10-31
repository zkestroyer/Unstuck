# UNSTUCK — System Architecture & Technical Contracts

**Document Version:** 1.0.0  
**Date:** 2026-10-31  
**Author:** AI Lead Architect (`godmode_lead_architect`)  
**Status:** Approved & Contract-Locked  

---

## 1. Tech Stack Decision & Architecture Rationale

### 1.1 Stack Selection: React 18 + Vite + CSS Modules
- **UI Framework:** React 18 (Functional components, hooks, JSX). Direct component mapping to screen states.
- **Build Engine:** Vite 5.x. Blazing-fast hot module replacement, zero-latency feedback loop.
- **Styling Architecture:** Pure CSS Modules (`.module.css`) backed by global design tokens (`tokens.css`). Avoids utility framework class inflation, prevents generic "SaaS look", guarantees strict adherence to warm, patient, high-contrast aesthetic rules.
- **Language:** ECMAScript 2022+ (Modern JavaScript).
- **Audio Synthesizer:** Native Browser `window.speechSynthesis` API with automatic capability fallback.
- **State & Storage:** Deterministic in-memory React reducer combined with a resilient `localStorage` sync layer.

### 1.2 Zero-Backend Justification
1. **Self-Contained Sandbox:** The application is an educational sandbox simulating external mobile interfaces. No real communications or server actions take place.
2. **Absolute Privacy by Design:** Inexperienced or anxious users must never worry about identity compromise. Zero network telemetry or server credential storage guarantees total data isolation.
3. **Deterministic Logic:** Recommendation algorithms, hint ladders, and scenario scoring are pure algorithmic functions requiring zero server compute.
4. **Resilient Local Execution:** Offline capability guarantees reliable demonstration and unhindered user practice regardless of network conditions.

---

## 2. Definitive Directory Structure

```text
UNSTUCK/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── images/                       # Fictional practice photos
│       ├── photo_cat.jpg
│       ├── photo_family.jpg
│       └── photo_garden.jpg
└── src/
    ├── main.jsx                      # App mount point
    ├── App.jsx                       # Root screen router & global state provider
    │
    ├── data/
    │   ├── concerns.js               # 7 Fear Map concern definitions
    │   ├── tasks.js                  # Task step definitions (guided & independent)
    │   ├── scenarios.js              # Suspicious OTP exercise scenarios
    │   └── translations.js           # Full string bundles (English, Urdu, Roman Urdu)
    │
    ├── components/
    │   ├── AppHeader.jsx             # Top bar: Wordmark + Home, My Practice, Help
    │   ├── AppHeader.module.css
    │   ├── PrimaryButton.jsx         # 52px+ primary CTA button
    │   ├── PrimaryButton.module.css
    │   ├── SecondaryButton.jsx       # 52px+ secondary/outline button
    │   ├── SecondaryButton.module.css
    │   ├── AudioButton.jsx           # Speaker icon button with status feedback
    │   ├── AudioButton.module.css
    │   ├── PracticeNotice.jsx        # Persistent "PRACTICE ONLY" top banner
    │   ├── PracticeNotice.module.css
    │   ├── ChoiceCard.jsx            # Selectable fear tile with SVG checkmark
    │   ├── ChoiceCard.module.css
    │   ├── HintPanel.jsx             # 3-tier progressive hint disclosure panel
    │   ├── HintPanel.module.css
    │   ├── StepIndicator.jsx         # Plain-text "Step X of Y" orientation
    │   ├── StepIndicator.module.css
    │   ├── HelpStrip.jsx             # Bottom support bar (Hear again, Hint, What if, Reset)
    │   ├── HelpStrip.module.css
    │   ├── SimulatedPhone.jsx        # Mobile chassis with status bar & message area
    │   ├── SimulatedPhone.module.css
    │   └── ProgressCard.jsx          # Summary attempt record card
    │       └── ProgressCard.module.css
    │
    ├── screens/
    │   ├── WelcomeScreen.jsx         # Screen 1: Reassuring onboarding & audio
    │   ├── FearMapScreen.jsx         # Screen 2: Multi-select Digital Fear Map
    │   ├── RecommendationScreen.jsx  # Screen 3: Transparent recommendation rationale
    │   ├── PracticeIntroScreen.jsx   # Screen 4: Sandbox safety boundary & mode choice
    │   ├── GuidedPracticeScreen.jsx  # Screen 5/6: Task A guided simulation
    │   ├── IndependentAttemptScreen.jsx # Screen 7: Task A unguided transfer attempt
    │   ├── SummaryScreen.jsx         # Screen 8: Empirical results & next recommendation
    │   └── SafetyScenarioScreen.jsx  # Screen 9: Task B Suspicious OTP decision exercise
    │
    ├── logic/
    │   ├── recommendTask.js          # Deterministic priority-based recommendation engine
    │   ├── practiceReducer.js        # Formal finite state machine for practice sessions
    │   ├── progress.js               # Performance evaluation & attempt logging helpers
    │   └── speechUtils.js            # TTS utterance coordinator with language mapping
    │
    ├── hooks/
    │   ├── useAudio.js               # Safe React lifecycle wrapper for speech
    │   └── useLocalStorage.js        # Safe schema-versioned localStorage manager
    │
    └── styles/
        ├── tokens.css                # CSS custom variables (colors, typography, spacing)
        ├── global.css                # CSS reset, high-contrast focus rings, root canvas
        └── phone.css                 # Mobile container layout & message bubble styles
```

---

## 3. Global State Architecture

### 3.1 App-Level State (`App.jsx`)
```javascript
const initialAppState = {
  // Screen Router
  screen: "welcome", 
  // Enum: "welcome" | "fearMap" | "recommendation" | "practiceIntro" | 
  //       "guidedPractice" | "independentAttempt" | "summary" | "safetyScenario"

  // User Preferences
  language: "en",             // "en" | "ur" | "roman-ur"
  audioEnabled: false,        // Explicit audio toggle

  // Digital Fear Map
  selectedConcerns: [],       // Array<string> e.g. ["sending_picture", "message_safety"]

  // Active Task
  currentTaskId: null,        // "send-picture" | "check-message"
  recommendedTaskId: null,
  recommendationReason: "",

  // Empirical History
  attemptHistory: [],         // Array<AttemptRecord>
  completedTaskIds: []        // Array<string>
};
```

### 3.2 Practice Finite State Machine (`practiceReducer.js`)
```javascript
const initialPracticeState = {
  phase: "intro",             // "intro" | "demonstrate" | "guided_attempt" | "guided_feedback" |
                              // "guided_complete" | "independent_attempt" | "independent_feedback" |
                              // "independent_complete" | "summary"
  taskId: "send-picture",
  currentStep: 0,
  totalSteps: 3,

  // Assistance Metrics
  hintsUsed: 0,
  hintLevel: 0,               // 0: none, 1: general, 2: specific, 3: highlight demonstration
  demonstrationUsed: false,
  wrongAttempts: 0,

  // Mode & Integrity
  attemptMode: "guided",      // "guided" | "independent"
  completedIndependently: false,

  // UI Overlays
  showHint: false,
  showExplanation: false,
  highlightedControl: null,
  feedbackMessage: "",
  feedbackType: "neutral"     // "neutral" | "encouraging" | "corrective"
};
```

---

## 4. Deterministic Recommendation Algorithm

```javascript
export function recommendTask(selectedConcerns = [], attemptHistory = [], completedTaskIds = []) {
  // 1. Concern to Task Mapping Priority Table
  const CONCERN_MATRIX = [
    { 
      concern: "sending_picture", 
      taskId: "send-picture", 
      reason: "You selected wanting to send pictures. We prepared a simple step-by-step practice for you." 
    },
    { 
      concern: "message_safety", 
      taskId: "check-message", 
      reason: "You selected feeling unsure about messages. Let's practice checking a message safely." 
    },
    { 
      concern: "wrong_button", 
      taskId: "send-picture", 
      reason: "You worry about pressing the wrong button. In this safe space, tapping anything is completely safe." 
    },
    { 
      concern: "deleting", 
      taskId: "send-picture", 
      reason: "You worry about losing items. This exercise lets you practice selecting without deleting." 
    },
    { 
      concern: "navigation", 
      taskId: "send-picture", 
      reason: "You find phone navigation tricky. We will guide you directly to the controls." 
    },
    { 
      concern: "prefers_audio", 
      taskId: "send-picture", 
      reason: "We'll speak the steps aloud so you can listen comfortably." 
    },
    { 
      concern: "language_difficulty", 
      taskId: "send-picture", 
      reason: "We use plain, simple words and clear visual guides." 
    }
  ];

  // 2. Identify highest-priority selected concern not yet completed
  for (const item of CONCERN_MATRIX) {
    if (selectedConcerns.includes(item.concern) && !completedTaskIds.includes(item.taskId)) {
      return { taskId: item.taskId, reason: item.reason };
    }
  }

  // 3. If primary concern completed with hints, suggest independent retry
  for (const item of CONCERN_MATRIX) {
    if (selectedConcerns.includes(item.concern)) {
      const last = attemptHistory.filter(a => a.taskId === item.taskId).slice(-1)[0];
      if (last && !last.completedIndependently) {
        return { 
          taskId: item.taskId, 
          reason: "You completed this with hints! Would you like to try it independently?" 
        };
      }
    }
  }

  // 4. Offer next incomplete curriculum task
  for (const item of CONCERN_MATRIX) {
    if (!completedTaskIds.includes(item.taskId)) {
      return { taskId: item.taskId, reason: "Ready for your next skill? Let's try this." };
    }
  }

  // 5. Default fallback
  return { 
    taskId: "send-picture", 
    reason: "Great work! You can replay any exercise to keep your skills sharp." 
  };
}
```

---

## 5. Strict Data Contracts

### 5.1 AttemptRecord Schema
```typescript
interface AttemptRecord {
  taskId: "send-picture" | "check-message";
  scenarioId: string | null;
  timestamp: string;          // ISO 8601
  mode: "guided" | "independent" | "safety";
  outcome: "completed" | "abandoned" | "returned_to_guided";
  hintsUsed: number;
  demonstrationUsed: boolean;
  completedIndependently: boolean;
  safetyChoiceId?: string | null;
  safetyChoiceSafe?: boolean | null;
}
```

### 5.2 Task Step Schema
```typescript
interface TaskStep {
  stepIndex: number;
  instruction: Record<string, string>; // { en: string, ur: string, "roman-ur": string }
  targetControlId: string;
  hints: Array<Record<string, string>>; // 3 levels
  wrongTapFeedback: Record<string, string>;
  correctTapFeedback: Record<string, string>;
  whatHappensExplanation: Record<string, string>;
}
```

---

## 6. Accessibility & Sensory Engineering
1. **Focus Trapping & Escape:** Modals and overlay panels (HintPanel, Consequence Modal) trap focus and release upon pressing `Escape` or clicking dismiss.
2. **Keyboard Traversal:** Complete keyboard traversal via `Tab` / `Shift+Tab`, selection toggling via `Space`, primary trigger via `Enter`.
3. **High-Visibility Indicator:** 3px solid focus ring `#0B6E99` with 2px offset applied globally on `:focus-visible`.
4. **Speech Synthesis Resilience:** In the event browser TTS fails or voice models are missing on client hardware, the UI maintains 100% visual parity with zero execution interruption.
