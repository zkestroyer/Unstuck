# UNSTUCK — Product Manager Comprehensive Analysis & Scope Specification

**Document Version:** 1.0.0  
**Date:** 2026-10-31  
**Author:** AI Product Manager (`godmode_product_manager`)  
**Status:** Approved & Scope-Locked  

---

## 1. Executive Scope & Value Proposition

### 1.1 Product Definition
UNSTUCK is a **browser-based digital practice playground** engineered specifically for individuals who experience anxiety, hesitation, or unfamiliarity when operating modern consumer technology (e.g., older adults, parents, grandparents, and late technology adopters).

### 1.2 Core Value Proposition
> **"UNSTUCK doesn't just tell people what to do. It helps them learn to do it themselves."**

Traditional guidance tools (static PDFs, AI chat assistants, video tutorials) attempt to either solve the problem *for* the user or give cognitive instructions without motor/procedural memory reinforcement. UNSTUCK creates true independence through:
1. **Digital Fear Mapping:** Starting with the person's declared anxieties rather than a technical taxonomy.
2. **Deterministic Recommendation:** Curating an immediate practice scenario tailored to their specific concern.
3. **Safe Sandbox:** Simplified, familiar simulated screens where no real data, accounts, money, or messages are at risk.
4. **Graduated Training Wheels:** Progressing from demonstration ("Show me"), through guided action with hints ("Try with me"), to unassisted transfer ("Let me try").
5. **No-Shame Learning Culture:** Normalizing errors with respectful explanations and instant recovery without red marks, countdowns, or cognitive pressure.
6. **Honest Progress Tracking:** Reporting empirical practice actions and assistance levels rather than pseudoscientific "confidence percentages."

### 1.3 Target Audience & Primary Persona
- **Audience:** Adults 50+ or any user with limited digital literacy.
- **Working Persona — "Ayesha" (Age 62):** Uses smartphone for phone calls and basic incoming texts. Highly anxious about making accidental deletions, clicking scam messages, or entering wrong menus. Relies on adult children for routine tasks, causing embarrassment. Prefers large touch targets, spoken audio guidance, and private, unhurried practice.

### 1.4 MVP Learning Journeys

| Journey | Focus | Core Competencies Reinforced |
|---------|-------|------------------------------|
| **Journey A: Send a Picture** *(Primary Demo Path)* | Everyday Communication | Identifying attachment paperclip icon, picking from simulated image tray, distinguishing between draft selection vs. actual sending, non-destructive back navigation. |
| **Journey B: Check a Suspicious Message** *(Safety Path)* | Cybersecurity & Scams | Recognizing unsolicited urgency, identifying one-time password (OTP) theft patterns, pausing before acting, choosing safe verification via official channels. |

---

## 2. Granular Feature Decomposition & User Stories

### 2.1 Welcome & Onboarding (Epic 1)
- **WO-01:** *As a first-time user*, I want to see a welcoming, calm landing screen *so that* I immediately understand this is a safe, risk-free space.
- **WO-02:** *As an anxious user*, I want to enter without creating an account, email, or password *so that* there are zero cognitive barriers to entry.
- **WO-03:** *As an auditory learner or visually impaired user*, I want to press "Hear this message" *so that* instructions are read aloud in plain speech.
- **WO-04:** *As a bilingual user*, I want to toggle between English and Urdu (or Roman Urdu) *so that* I can read in my comfort language.
- **WO-05:** *As a user with motor or vision limitations*, I want large 48px+ touch targets and high-contrast text *so that* interaction requires minimal physical strain.

### 2.2 Digital Fear Map (Epic 2)
- **FM-01:** *As a user*, I want to view clear, illustrated first-person concerns (e.g., "I'm afraid I'll press the wrong thing", "I worry I might delete something") *so that* I can pinpoint my exact anxieties.
- **FM-02:** *As a user*, I want to select multiple concern cards *so that* the system understands my nuanced needs.
- **FM-03:** *As a hesitant user*, I want a "Skip for now" option *so that* I am not forced into categorization if I just want to try something immediately.
- **FM-04:** *As an auditory user*, I want to tap a speaker button beside each concern *so that* I can listen to each option before choosing.
- **FM-05:** *As a user*, I want my selections to transparently dictate my initial practice exercise *so that* the learning experience feels respectful and personalized.
- **FM-06:** *As a user*, I want the ability to update my Fear Map at any time *so that* I am never permanently pigeonholed.
- **FM-07:** *As a user with color-vision differences*, I want selected states to display explicit green borders, checkmarks, and background shifts *so that* color alone never dictates state.

### 2.3 Practice Playground — Task A: Send a Picture (Epic 3)
- **PA-01:** *As a user*, I want to interact with a realistic simulated phone frame *so that* skills directly transfer to my real mobile experience.
- **PA-02:** *As an anxious user*, I want a persistent "PRACTICE ONLY — NOTHING IS BEING SENT" badge *so that* I am continually reassured that my real phone is untouched.
- **PA-03:** *As a learner*, I want to locate and tap the attachment icon in a simulated messaging thread *so that* I build physical muscle memory.
- **PA-04:** *As a learner*, I want to select a fictional photo from a curated tray *so that* I understand gallery picker mechanics.
- **PA-05:** *As a learner*, I want to see the image staged in a message preview before dispatching *so that* I internalize the critical distinction between preparing and sending.
- **PA-06:** *As a learner*, I want to tap "Send" and observe a calm confirmation *so that* I feel the satisfaction of task completion.
- **PA-07:** *As an imperfect learner*, I want tapping the wrong button to yield a calm explanation of what that button actually does *so that* my mistake becomes an educational insight rather than a failure.
- **PA-08:** *As a learner*, I want a "Start again" control *so that* I can reset the simulation to step zero whenever I feel disoriented.
- **PA-09:** *As a learner*, I want to choose between "Show me first" (guided walkthrough) and "Let me explore" *so that* I control my level of scaffolding.

### 2.4 Practice Playground — Task B: Suspicious Message (Epic 4)
- **PB-01:** *As a user*, I want to read a simulated urgent message requesting an OTP *so that* I experience an authentic scenario in safety.
- **PB-02:** *As a user*, I want three distinct choices ("Send the code", "Stop and check first", "Ask the sender to explain") *so that* I can evaluate consequences.
- **PB-03:** *As a user who chooses the risky action*, I want a patient, respectful warning explaining *why* OTP sharing is unsafe without red failure marks.
- **PB-04:** *As a user*, I want practical guidance to verify claims via independent official channels *so that* I acquire actionable real-world protection habits.
- **PB-05:** *As a user*, I want an immediate follow-up practice message *so that* I can independently apply the safety principle I just learned.

### 2.5 Graduated Learning Loop & Training Wheels (Epic 5)
- **LL-01:** *As a beginner*, I want "Show Me" mode to demonstrate the steps smoothly *so that* I can observe without pressure.
- **LL-02:** *As an active learner*, I want "Try With Me" mode with dynamic step instructions *so that* I can perform the physical taps myself.
- **LL-03:** *As a user who gets stuck*, I want a 3-tier Hint Ladder (General Clue → Specific Clue → Highlighted Control) *so that* help is progressively revealed.
- **LL-04:** *As a confident learner*, I want "Let Me Try" mode with an unguided scenario *so that* I can validate my true independence.
- **LL-05:** *As a curious user*, I want an exploratory "What happens if I tap this?" tool *so that* I can safely inspect buttons before pressing them.
- **LL-06:** *As an auditory learner*, I want "Hear again" available on every single step *so that* I can review instructions as often as needed.
- **LL-07:** *As a learner in independent mode*, I want a one-click return to guided mode *so that* I am never trapped in difficulty.
- **LL-08:** *As a user*, I want explicit step indicators ("Step 2 of 4") *so that* I have constant spatial awareness of task duration.

### 2.6 Honest Progress & Personalization (Epic 6)
- **PP-01:** *As a user*, I want an empirical summary of what I practiced *so that* I see tangible evidence of my effort.
- **PP-02:** *As a user*, I want the summary to transparently state how much help I used (e.g., "Attempt 1: used 2 hints; Attempt 2: independent") *so that* the feedback is authentic.
- **PP-03:** *As a user*, I want a recommended next step dynamically based on my remaining fears and performance *so that* my learning path flows continuously.
- **PP-04:** *As a user*, I want a "Why this was suggested" explanation *so that* personalization logic is fully transparent.
- **PP-05:** *As a user*, I want options to replay, try suggested, pick any other task, or adjust my fear map *so that* I hold total agency over my path.
- **PP-06:** *As a user or presenter*, I want a "Reset All Data" button *so that* the entire experience can be returned to virgin state instantly.
- **PP-07:** *As a dignity-first user*, I want the interface to strictly exclude numerical scores, IQ/mastery ratings, or competitive percentiles.

### 2.7 Accessibility & Sensory Design (Epic 7)
- **AC-01:** Visible text labels on 100% of controls; zero icon-only ambiguity.
- **AC-02:** Minimum interactive touch target of 48×48px.
- **AC-03:** WCAG AA contrast compliance (4.5:1 for body, 3:1 for large text).
- **AC-04:** Complete keyboard accessibility (Tab, Enter, Space) with dedicated 3px focus ring (`#0B6E99`).
- **AC-05:** 100% functionality operational without speech recognition or audio peripherals.
- **AC-06:** Zero timed interactions, zero countdown clocks, zero punitive animations.
- **AC-07:** Resilient responsive design with flawless 200% browser zoom scaling.

---

## 3. Strict Out-of-Scope Boundary (Zero Feature Creep)
To safeguard the build and prevent architectural bloat, the following are strictly **PROHIBITED**:
1. Full mobile OS emulation (Android/iOS launchers, system status trees).
2. Live third-party integrations (real WhatsApp Web, bank APIs, SMS gateways).
3. Personal user data capture (real phone numbers, real names, personal photos).
4. Unconstrained LLM chat interfaces (hallucination risk, latency, lack of deterministic pacing).
5. Cloud user authentication, multi-tenant databases, or remote profile synchronization.
6. Drag-and-drop file upload interfaces (excessive motor complexity for target persona).
7. Gamification gimmicks (coins, streaks, leaderboards, flashing badges).

---

## 4. Definition of Done (DoD) Checklist

- [ ] **Zero-Error Local Launch:** App launches cleanly via Vite dev server without console errors or warnings.
- [ ] **Zero Authentication Barrier:** Application initializes directly into Welcome without auth gates.
- [ ] **Fear Map Functionality:** Minimum 7 concerns renderable; multiple selectable; persists in session.
- [ ] **Deterministic Recommendation:** Selection of `sending_picture` directs to Task A; selection of `message_safety` directs to Task B.
- [ ] **Task A (Picture Sending):** Full 4-step loop operational with simulated conversation, gallery tray, preview, and send.
- [ ] **Task B (Suspicious OTP):** 3-choice decision tree with respectful pedagogical feedback on risky choices.
- [ ] **Consequence Engine:** "What happens if I tap this?" explains button mechanics in plain English.
- [ ] **Graduated Training Wheels:** Guided mode with 3-tier hints progresses seamlessly to independent attempt.
- [ ] **Empirical Progress Reporting:** Summary screen displays exact attempt history, hints used, and next logical recommendation.
- [ ] **Dual Sensory Pathways:** Every textual instruction can be voiced via Browser TTS; all TTS controls operate via visible click.
- [ ] **Accessible Navigation:** Complete navigation cycle (Welcome → Fear Map → Task A → Independent → Summary → Task B) executable purely via keyboard.
