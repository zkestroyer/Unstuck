# UNSTUCK — Comprehensive Product, Architecture & Feature Specification

> **A Confidence-First Digital Practice Playground for Late Technology Adopters**  
> *Version: 3.1.0 (Production Hackathon Master Edition)*  
> *Project Root: `C:\Users\Connect2Aryans\Desktop\UNSTUCK\`*  
> *Target Audience: Older adults, anxious late technology adopters, non-technical learners*  

---

## 1. Executive Overview & Mission

### 1.1 The Core Problem
For millions of older adults and late technology adopters, modern smartphones are not intuitive tools—they are sources of anxiety, dread, and vulnerability. A simple action like tapping an icon brings questions of catastrophic failure:
* *"If I tap this, will I delete all my photos forever?"*
* *"Will I accidentally send something private to everyone in my contacts?"*
* *"Will money be deducted from my bank account?"*
* *"Will a scammer steal my identity if I open this message?"*

Traditional tutorials fail this audience because they are either:
1. **Passive videos or text manuals** where learners watch but forget the moment they try it themselves.
2. **High-stakes live environments** where learners are forced to practice on their actual phones with their real contacts, real photos, and real bank accounts on the line.

### 1.2 What UNSTUCK Is
**UNSTUCK** is a browser-based, zero-risk digital practice environment that acts as a safe, forgiving flight simulator for everyday mobile technology. It allows anxious learners to explore, make mistakes, tap the "wrong" buttons, and learn through direct hands-on trial without touching their real devices, messaging real contacts, or spending real money.

```mermaid
graph TD
    A[Anxious Learner] --> B[UNSTUCK Safe Sandbox]
    B --> C[Zero Real-World Consequences]
    B --> D[Multilingual Reassurance: English / Urdu]
    B --> E[Pedagogical Scaffolding: Demo → Guided → Solo]
    B --> F[What Happens If? Sandbox]
    B --> G[Dynamic Confidence Tracker]
    C --> H[Fear Replaced by Muscle Memory & Confidence]
    D --> H
    E --> H
    F --> H
    G --> H
    H --> I[Independent Smartphone User]
```

### 1.3 Core Pillars & Psychological Design Principles
* **100% Isolated Sandbox:** No real phone numbers, no real contacts, no real cloud storage, and no backend API. If a user presses "Delete" or "Send", nothing in the real world is altered.
* **Warm, Non-Clinical Human Aesthetic:** Scandinavian warmth meets Apple Human Interface Guidelines. Soft linen/oat paper background (`#FAF8F5`), botanical emerald accents (`#1E5E4F`), warm terracotta touches (`#E07A5F`), and comforting rounded cards.
* **Zero Testing Pressure:** Absolutely no grades, timers, error buzzers, point deductions, or pass/fail scores. Every misstep is met with an immediate, compassionate explanation of what the button actually does.
* **Trilingual Inclusivity:** Native English, Studio-Pronounced Pakistani Urdu (اردو) with authentic Microsoft Neural Voice audio, and Roman Urdu.
* **Original Mobile Visuals:** Authentic WhatsApp emerald UI with 6-icon drawer, Google Maps red pin & turn-right icon, Google Photos trash can & curved restore SVGs, status bar signals, and Android 3-button system nav.

---

## 2. End-to-End User Experience & Flow

UNSTUCK guides learners through a cohesive, confidence-building journey:

```mermaid
flowchart TD
    S1[1. Welcome & Language] --> S2[2. Fear Map Diagnosis]
    S2 --> S3[3. Tailored Recommendation]
    S3 --> S4[4. Mode Selection]
    S4 --> S5A[5A. Hands-Free Demo 👆]
    S4 --> S5B[5B. Guided Practice]
    S5A --> S5B
    S5B --> S6[6. Independent Practice]
    S6 --> S7[7. Real-World Transfer Bridge]
    S7 --> S8[8. Safe Practice Journal 🌱]
    S3 --> S9[Safety Check Scenario 🛡️]
    S9 --> S8

    subgraph Direct Discovery Hubs
        CM[Dynamic Digital Confidence Map]
        EXP[What Happens If? Sandbox]
        LIB[Skill Library & Feature Catalog]
    end
```

### Screen 1: Welcome & Language Selector (`WelcomeScreen.jsx`)
* **Purpose:** Sets an immediate tone of warmth, psychological safety, and hospitality.
* **Key Features:**
  * One-tap trilingual switch: **English**, **اردو (Urdu)**, and **Roman Urdu**.
  * Large, friendly hero illustration with high-contrast, welcoming typography.
  * Three foundational reassurances:
    * 🛡️ **100% Safe Sandbox:** Nothing touches your real phone, bank, or apps.
    * 🐢 **Your Own Speed:** No timers, no scoring, no tests. Take as long as you need.
    * 🔓 **Zero Setup:** No passwords, logins, phone numbers, or credit cards required.
  * **Studio Voiceover:** A prominent speaker button that reads the entire welcome message in calm, natural Pakistani Urdu.

---

### Screen 2: The Digital Fear Map (`FearMapScreen.jsx` & `ChoiceCard.jsx`)
* **Purpose:** Diagnoses the learner's specific anxieties before suggesting an activity, honoring their autonomy.
* **7 Illustrative Anxiety Cards:**
  Each card features a custom, colorful vector illustration, an accessible checkbox, a comforting description, and an individual audio voiceover button:
  1. **"I'm afraid I'll press the wrong thing"** (`card_wrong_button.svg`) — Explains what buttons do before tapping.
  2. **"I worry I might delete something"** (`card_deleting.svg`) — Practice selecting items safely without fear of losing files.
  3. **"I find it hard to find things on my phone"** (`card_navigation.svg`) — Navigation, menus, and finding pictures.
  4. **"I want to learn to send pictures or files"** (`card_sending_picture.svg`) — Attaching and sharing media step-by-step.
  5. **"Some messages make me unsure"** (`card_message_safety.svg`) — Spotting OTP scams, urgent threats, and fake bank alerts.
  6. **"I prefer to listen instead of reading"** (`card_prefers_audio.svg`) — Voice-guided practice.
  7. **"The words on my phone are difficult to understand"** (`card_language_difficulty.svg`) — Plain-language, jargon-free explanations.

---

### Screen 3: Personalized Recommendation (`RecommendationScreen.jsx`)
* **Purpose:** Dynamically evaluates the user's selected concerns and recommends the ideal starting module with complete transparency.
* **Key Features:**
  * **Hero Module Banner:** Renders the 320x120px illustrative vector banner corresponding to the selected task.
  * **"Why we suggested this" Card:** Transparent pedagogical justification (e.g., *"Since you mentioned worrying about losing files, let's practice how the Trash Bin keeps deleted items safe for 30 days."*).
  * **Safety Boundary Reassurance:** Explicit guarantee that no real files or messages can be lost.
  * **Autonomous Choice:** The user can accept the suggestion (`Start Practice →`) or freely choose any other module via the Skill Map.

---

### Screen 4: Practice Mode Selector (`PracticeIntroScreen.jsx`)
* **Purpose:** Gives learners control over how they want to learn.
* **Dual Pedagogy:**
  1. **"Show me first (Watch demo)":** A 100% hands-free visual demonstration where the interface auto-navigates and uses an animated pointing hand (`👆`) to demonstrate each step.
  2. **"Try with me (Guided practice)":** Step-by-step interactive practice where the user taps controls on a realistic simulated phone with active hints and guidance.

---

### Screen 5: Dual Practice Engine (`GuidedPracticeScreen.jsx` & `IndependentAttemptScreen.jsx`)
* **Purpose:** Delivers realistic mobile phone simulation with three-tiered cognitive scaffolding.
* **Key Features:**
  * **Realistic Phone Chassis:** Matte dark smartphone frame (`380px x 690px`) featuring an authentic mobile status bar (4-bar cellular signal, Wi-Fi waves, battery indicator, `10:30`), and an authentic Android 3-button system navigation bar at the bottom (`◀`, `○`, `□`).
  * **3-Tiered Hint Ladder:**
    * *Tier 1:* Conceptual hint ("Look for a button used to add something to a message").
    * *Tier 2:* Visual cue ("It is near the message box, shown as a paperclip icon").
    * *Tier 3:* Direct spotlight ("Let me show you — tap this highlighted button right here").
  * **"What happens if I tap this?" Panel:** Explains the real-world consequence of a control before touching it.
  * **Independent Practice:** Removes the training wheels and highlights, presenting a fresh scenario (e.g., sending garden flower photos) to solidify muscle memory.

---

### Screen 6: Safety Check Scenario (`SafetyScenarioScreen.jsx`)
* **Purpose:** Teaches cyber defense and scam resilience without fear.
* **Simulated Scenarios:**
  * **Scenario 1 (The Prize / OTP Trap):** A realistic SMS from an unknown number claiming the user won a prize and demanding their 4-digit code.
  * **Scenario 2 (Urgent Bank Account Alert):** A threatening text claiming the user's account is suspended and urging them to click a malicious link.
* **Pedagogical Feedback:** If the user selects the risky option, the app does not say "Wrong!"; it gently explains what the scammer was trying to achieve and how to verify via official channels.

---

### Screen 7: Dynamic Digital Confidence Map (`ConfidenceMapScreen.jsx`)
* **Purpose:** Visual progress tracking organized by digital competency domains rather than rigid numerical test scores.
* **4 Core Categories:**
  1. **Navigation:** Moving around, finding places on maps, sharing location securely.
  2. **Messaging:** Chat conversations, photo attachments, reviewing drafts before sending.
  3. **Storage & Gallery:** Selecting photos safely, using the trash bin, 30-day recovery.
  4. **Digital Safety:** Spotting suspicious messages, phishing links, protecting OTP codes.
* **Honest Progress Status Badges:**
  * `● Not Started` — Ready to explore at the learner's own pace.
  * `🌱 Started` — Initial guided exploration completed.
  * `🌿 Improving` — Repeated practice with hints taken.
  * `🌟 Comfortable` — Completed independently without assistance.

---

### Screen 8: "What Happens If...?" Exploration Sandbox (`ExplorationModeScreen.jsx`)
* **Purpose:** Proactive fear resolution without linear tutorial constraints.
* **Features 15 Common Fears Across 4 Everyday Apps:**
  * **Photo Gallery:** "What happens if I tap the Trash Can?", "What happens if I tap an album?", "What happens if I tap the heart icon?", "What happens if I share a photo?".
  * **Messaging:** "What happens if I tap the Paperclip?", "What happens if I tap Send before typing?", "What happens if I press and hold a message?", "What happens if I tap a phone number in a chat?".
  * **Phone Settings:** "What happens if I turn off Wi-Fi?", "What happens if I tap Airplane Mode?", "What happens if I turn on Do Not Disturb?", "What happens if I tap Clear Storage?".
  * **Messages & Safety:** "What happens if I open a message from an unknown number?", "What happens if I tap a link in a text message?", "What happens if I reply STOP to a text?".
* **3-Option Exploration Actions:** For every fear, the learner can choose:
  1. **"Show me what happens"** — Visual simulation.
  2. **"Let me try it"** — Direct practice in the sandbox.
  3. **"Explain it again"** — Plain-language audio-supported breakdown.

---

### Screen 9: Real-World Skill Transfer Bridge (`RealWorldTransferScreen.jsx`)
* **Purpose:** Bridges the cognitive gap between simulated success and confidence on a real physical phone.
* **Key Features:**
  * **Real-World Tips:** Practical advice for physical devices (e.g., *"On your real phone, the paperclip icon might be a '+' plus button or inside a menu"*).
  * **UI Brand Reassurance:** Explicitly explains that Samsung, Google Pixel, and iPhone differ slightly in appearance but work on the exact same logic.
  * **Self-Paced Transfer Confirmation:** Respectfully asks how ready the learner feels:
    * *"Yes, I want to try on my real phone!"*
    * *"I'd like to practise this once more first."*
    * *"I'd prefer to have someone guide me the first time."*

---

### Screen 10: Skill Map & Practice Library (`LibraryScreen.jsx`)
* **Purpose:** A permanent, balanced 2x2 catalog of all 4 interactive practice modules.
* **Clean UI Layout:** Unified card heights, consistent typography, and official mobile app icons.
* **Status Badges:** `✓ Practised`, `★ Recommended`, `● Ready`.

---

### Screen 11: Safe Practice Journal (`SummaryScreen.jsx`)
* **Purpose:** Celebrates honest learning progress with zero scores or pressure.
* **Tabbed Learning Dashboard:**
  * **Overview & Milestones:** Summary badge (`🌱 SAFE PRACTICE JOURNAL`), gentle milestones, and recommended next step.
  * **Skills Explored:** Real competency badges across all attempted modules.
  * **Activity Log:** Chronological attempt journal noting support level used.

---

## 3. Detailed Specification of the 4 Interactive Modules

| Module ID | Title & Category | Simulated App | Authentic Mobile Visuals Implemented | Key Interactions |
|---|---|---|---|---|
| **`send-picture`** | **Send a Picture in a Message**<br>*(Messaging & Media)* | WhatsApp Simulation | Authentic WhatsApp emerald header (`#008069`), contact avatar, phone/video icons, paperclip, camera, smiley, green send button (`#00A884`), 6-icon attachment drawer, blue double checkmarks | 1. Tap authentic paperclip icon.<br>2. Select photo from animated 6-icon WhatsApp drawer.<br>3. Review draft photo and tap green send button. |
| **`explore-maps`** | **Find Places & Share Live Location**<br>*(Navigation & Maps)* | Google Maps Simulation | Google "G" 4-color icon, Google Voice mic, red teardrop pin (`#EA4335`), blue "Directions" turn-right button, Android 3-node connected "Share" icon, active GPS sharing banner, "🛑 Stop sharing" control | 1. Tap search bar for "City Pharmacy".<br>2. Inspect red destination pin and tap Android Share icon.<br>3. Choose duration (15 min vs 1 hr) and confirm live GPS sharing to family. |
| **`safe-delete`** | **Safely Delete & Restore from Trash**<br>*(Photo Gallery & Storage)* | Google Photos Simulation | Authentic mobile Trash Can SVG with lid, handle, and vertical ribs; authentic curved Restore SVG icon; 30-day holding notice | 1. Select blurry photo & tap authentic Trash Can SVG.<br>2. Open "Recently Deleted" holding tab.<br>3. Tap curved Restore SVG to safely return photo to gallery. |
| **`check-message`** | **Check Suspicious Messages & Scams**<br>*(Cyber Defense & Safety)* | Google Messages SMS Lockscreen | Authentic mobile SMS notification preview, sender verification, security shield warning badges, official channel advice | 1. Read simulated OTP / Bank alert message.<br>2. Select safe response ("Ignore & Call Bank").<br>3. Review safety explanation and official guidance. |

---

## 4. Technical Architecture, Armor & Edge-Case Engineering

```mermaid
graph TD
    subgraph UI Layer
        React[React 18 Components]
        Tokens[Warm CSS Tokens & Modules]
        Accessibility[AccessibilityToolbar: Text Scaler, Contrast, Touch Targets]
        SVGBadges[11 Custom SVG Illustrations + Authentic App SVGs]
    end

    subgraph Armored State & Routing Layer
        FSM[practiceReducer.js - Finite State Machine]
        RecEngine[recommendTask.js - Deterministic Engine v3.0]
        Storage[useLocalStorage.js - Session Persistence]
        TaskSanitizer[activeTaskId Armor Fallback]
    end

    subgraph Audio Engine
        SpeechUtils[speechUtils.js Hybrid Coordinator]
        EdgeTTS[28 Studio ur-PK-UzmaNeural MP3s]
        WebSpeech[Web Speech API Fallback]
    end

    React --> FSM
    React --> RecEngine
    React --> TaskSanitizer
    TaskSanitizer --> FSM
    React --> SpeechUtils
    SpeechUtils --> EdgeTTS
    SpeechUtils --> WebSpeech
    Tokens --> React
    SVGBadges --> React
    Accessibility --> Tokens
```

### 4.1 Root Cause Analysis & Resolution: The Blank Phone Screen Defect
During rigorous user and QA testing, a critical visual bug was isolated and repaired:
* **The Symptom:** In Guided Practice (`GuidedPracticeScreen.jsx`), the left-side instruction panel rendered correctly ("Find the button to attach something to your message. Step 1 of 3"), and the phone outer chassis rendered the top status bar ("10:30 ... WiFi 100%"). However, the entire interior of the phone below the status bar was blank white.
* **The Root Cause:**
  1. When an elder user explores safety scenarios or selects fear items related to suspicious messages, `currentTaskId` or recommendation can be set to `'check-message'`.
  2. `'check-message'` is a safety scenario defined in `scenarios.js`, not an interactive phone simulation task in `tasks.js`.
  3. `GuidedPracticeScreen.jsx` contained a fallback for its step definition: `const task = tasks[taskId] || tasks['send-picture']`, successfully loading the instructions for Step 1 of 3.
  4. However, it forwarded `taskId={taskId}` (`taskId` = `'check-message'`) directly down to `<SimulatedPhone taskId={taskId} />`.
  5. In `SimulatedPhone.jsx`, strict condition blocks existed:
     * `{taskId === 'send-picture' && (...)}` -> evaluated to `false`
     * `{taskId === 'explore-maps' && (...)}` -> evaluated to `false`
     * `{taskId === 'safe-delete' && (...)}` -> evaluated to `false`
  6. Because none of the 3 branches matched, the phone rendered zero UI components, leaving a completely blank white screen.
* **The Permanent Multi-Layer Armor Solution:**
  1. **SimulatedPhone Internal Defense:** `SimulatedPhone.jsx` now calculates a guaranteed active task ID:
     ```javascript
     const activeTaskId = (taskId === 'explore-maps' || taskId === 'safe-delete') ? taskId : 'send-picture';
     ```
     Even if `taskId` is `null`, `undefined`, `""`, `'check-message'`, or any corrupted string, `SimulatedPhone` defaults to the messaging chat interface and will **never be blank under any circumstance**.
  2. **Screen-Level Sanitization:** `GuidedPracticeScreen.jsx` and `IndependentAttemptScreen.jsx` sanitize `activeTaskId = tasks[taskId] ? taskId : 'send-picture'` before computing steps or rendering child components.
  3. **Router State Synchronization (`App.jsx`):** Action handlers for "Try Suggested Activity" and "Start Practice" now explicitly execute `setCurrentTaskId(recommendedTaskId)` and enforce that non-interactive tasks route strictly to `safetyScenario` rather than phone practice.
  4. **Automated Verification:** Authored [`scripts/test-phone-never-blank.mjs`](file:///c:/Users/Connect2Aryans/Desktop/UNSTUCK/scripts/test-phone-never-blank.mjs), which deliberately injects corrupted `check-message` state into localStorage and asserts that phone headers, bubbles, and input controls are 100% visible (0 errors).

---

### 4.2 Comprehensive Accessibility Suite (`AccessibilityToolbar.jsx`)
* **Collapsible Senior Accessibility Toolbar:**
  * **Text Sizing Scaler:** Standard (100%), Large (+20%), Extra Large (+40%) updating CSS root variables dynamically.
  * **High Contrast Mode:** Enforces 15:1+ contrast with solid borders, darkened backgrounds, and amber text.
  * **Large Touch Targets:** Expands all interactive buttons to a minimum height of 56px with generous tap padding.
  * **Reduced Motion:** Disables decorative animations for users with vestibular or motion sensitivities.
  * **Jargon-Busting Glossary:** Explains technical terms (e.g. *OTP, Phishing, Permissions, Cloud*) in everyday language.

---

### 4.3 Deterministic Urdu Voiceover Architecture
To solve the issue where standard operating systems (including Windows) lack installed Urdu TTS voice packs, UNSTUCK employs a **Studio-Native Audio Pipeline**:
1. Generated **28 dedicated studio-grade Pakistani Urdu `.mp3` audio files** using Microsoft's neural voice `ur-PK-UzmaNeural`, stored in [`public/audio/ur/`](file:///c:/Users/Connect2Aryans/Desktop/UNSTUCK/public/audio/ur/).
2. Replaced fragile keyword regex with a rigid `audioKey` registry across all components:
   * **Welcome Screen:** Speaks the exact heading, subheading, and reassurance verbatim.
   * **Fear Map (All 7 Cards):** Each individual concern card has its own speaker button reading its exact Urdu title and description.
   * **Recommendations (All 4 Modules):** Speaks the exact recommendation heading, reason, and safety reassurance.
   * **Practice Steps:** Each step across all 3 practice tasks vocalizes the exact on-screen Urdu instruction.
   * **Safety Scenarios:** Reads the simulated SMS and question word-for-word.
   * **Summary & Library:** Speaks the calm journal review and library overview.
   * **Roman Urdu Guarantee:** Confirmed that the speaker button is 100% hidden in Roman Urdu mode across all screens.

#### Comprehensive Urdu Audio Key Mapping Table

| Audio Key | MP3 Filename | Exact Spoken Pakistani Urdu Text |
|---|---|---|
| `welcome` | `welcome_ur.mp3` | "آئیے ٹیکنالوجی استعمال کرنے کی مشق کریں۔ پہلے یہاں محفوظ طریقے سے کوشش کریں۔ آپ کے اصلی فون کو کچھ نہیں ہوگا۔ کسی اکاؤنٹ یا پاس ورڈ کی ضرورت نہیں۔ اطمینان سے سیکھیں۔" |
| `fear_map_header` | `fear_map_header_ur.mp3` | "آپ کس کام میں آسانی اور اعتماد چاہتے ہیں؟ جس چیز میں ہچکچاہٹ ہو اسے منتخب کریں۔ آپ بعد میں کبھی بھی تبدیل کر سکتے ہیں۔" |
| `concern_wrong_button` | `concern_wrong_button_ur.mp3` | "مجھے ڈر ہے کہ میں غلط بٹن دبا دوں گا۔ جانیں کہ بٹن اور شبیہیں دبانے سے پہلے کیا کرتی ہیں۔" |
| `concern_deleting` | `concern_deleting_ur.mp3` | "مجھے فکر ہے کہ میں کچھ ڈیلیٹ کر دوں۔ چیزیں کھونے کے خوف کے بغیر محفوظ طریقے سے منتخب کرنے کی مشق کریں۔" |
| `concern_navigation` | `concern_navigation_ur.mp3` | "مجھے فون پر چیزیں ڈھونڈنا مشکل لگتا ہے۔ مینو، تصاویر، اور پیغامات آسانی سے تلاش کرنا سیکھیں۔" |
| `concern_sending_picture` | `concern_sending_picture_ur.mp3` | "میں تصویریں یا فائلیں بھیجنا سیکھنا چاہتا ہوں۔ پیغام میں تصویر منسلک کرنے اور بھیجنے کی مرحلہ وار مشق۔" |
| `concern_message_safety` | `concern_message_safety_ur.mp3` | "کچھ پیغامات مجھے الجھن میں ڈال دیتے ہیں۔ مشکوک پیغامات اور کوڈز مانگنے والوں کی پہچان سیکھیں۔" |
| `concern_prefers_audio` | `concern_prefers_audio_ur.mp3` | "میں پڑھنے کی بجائے سننا پسند کرتا ہوں۔ ہر ہدایت کے ساتھ بولنے والا بٹن دستیاب ہوگا تاکہ آپ سن سکیں۔" |
| `concern_language_difficulty`| `concern_language_difficulty_ur.mp3` | "فون پر الفاظ سمجھنا مشکل ہے۔ ہم بغیر مشکل اصطلاحات کے، عام فہم زبان میں سب سمجھاتے ہیں۔" |
| `rec_send-picture` | `rec_send_picture_ur.mp3` | "آپ کے لیے تجویز کردہ مشق: پیغام میں تصویر بھیجیں۔ یہ تجویز کیوں دی گئی: آئیے ایک عام اور مفید کام سے شروع کریں، یعنی پیغام میں تصویر بھیجنا۔ محفوظ ماحول: یہاں آپ کچھ بھی خراب، ڈیلیٹ یا غلطی سے نہیں بھیج سکتے۔" |
| `rec_explore-maps` | `rec_maps_ur.mp3` | "آپ کے لیے تجویز کردہ مشق: نقشے پر جگہ تلاش کریں اور لوکیشن شیئر کریں۔ یہ تجویز کیوں دی گئی: اپنے پیاروں کے ساتھ محفوظ طریقے سے اپنی لوکیشن شیئر کرنا سیکھیں۔ محفوظ ماحول: یہاں آپ کچھ بھی خراب، ڈیلیٹ یا غلطی سے نہیں بھیج سکتے۔" |
| `rec_safe-delete` | `rec_delete_ur.mp3` | "آپ کے لیے تجویز کردہ مشق: محفوظ ڈیلیشن اور تصویر کی بحالی۔ یہ تجویز کیوں دی گئی: تصویر ڈیلیٹ کرنے کے بعد اسے کوڑے دان سے بحال کرنا سیکھیں۔ محفوظ ماحول: یہاں آپ کچھ بھی خراب، ڈیلیٹ یا غلطی سے نہیں بھیج سکتے۔" |
| `rec_check-message` | `rec_check_message_ur.mp3` | "آپ کے لیے تجویز کردہ مشق: مشکوک پیغامات کی جانچ۔ یہ تجویز کیوں دی گئی: مشکوک پیغامات اور جعلی کوڈز کی جانچ کرنا سیکھیں۔ محفوظ ماحول: یہاں آپ کچھ بھی خراب، ڈیلیٹ یا غلطی سے نہیں بھیج سکتے۔" |
| `practice_intro` | `practice_intro_ur.mp3` | "یہ ایک نقلی فون اسکرین ہے۔ آپ یہاں بے خوف ہو کر بٹن دبا سکتے ہیں۔ کوئی پیغام کسی کو نہیں جائے گا۔" |
| `task_send-picture_0` | `task_send_picture_step1_ur.mp3` | "پیغام کے ساتھ کچھ منسلک کرنے والا بٹن تلاش کریں۔" |
| `task_send-picture_1` | `task_send_picture_step2_ur.mp3` | "منسلک کرنے کے لیے ٹرے میں سے ایک تصویر منتخب کریں۔" |
| `task_send-picture_2` | `task_send_picture_step3_ur.mp3` | "تصویر کے ساتھ پیغام بھیجیں۔" |
| `task_explore-maps_0` | `task_maps_step1_ur.mp3` | "نقشے کی سرچ بار میں فارمیسی تلاش کریں۔" |
| `task_explore-maps_1` | `task_maps_step2_ur.mp3` | "اپنے مقام کو شیئر کرنے کا بٹن دبائیں۔" |
| `task_explore-maps_2` | `task_maps_step3_ur.mp3` | "15 منٹ کے لیے اپنی لائیو لوکیشن بھیجنے کی تصدیق کریں۔" |
| `task_safe-delete_0` | `task_delete_step1_ur.mp3` | "تصویر منتخب کر کے کوڑے دان کا آئیکن دبائیں۔" |
| `task_safe-delete_1` | `task_delete_step2_ur.mp3` | "ریسنٹلی ڈیلیٹڈ یعنی کوڑے دان کے فولڈر میں جائیں۔" |
| `task_safe-delete_2` | `task_delete_step3_ur.mp3` | "تصویر پر ری سٹور کا بٹن دبا کر اسے گیلری میں بحال کریں۔" |
| `independent_prompt` | `independent_prompt_ur.mp3` | "اب خود کوشش کر کے دیکھیں! کیا آپ اپنے دوست کو پھولوں کی تصویر بھیج سکتے ہیں؟ اطمینان سے کریں۔ آپ جب چاہیں اشارہ مانگ سکتے ہیں۔" |
| `safety_0` | `safety_scenario1_ur.mp3` | "سیکیورٹی جانچ: مشکوک پیغامات۔ نامعلوم نمبر سے میسج ہے: آپ کا انعام کا کوڈ 4829 ہے۔ کسی کے ساتھ شیئر نہ کریں۔ کیا آپ یہ کوڈ فون پر کسی کو بتائیں گے؟" |
| `safety_1` | `safety_scenario2_ur.mp3` | "سیکیورٹی جانچ: بینک الرٹ کا مشکوک میسج ہے: آپ کا اکاؤنٹ بلاک کر دیا گیا ہے، فوری اس لنک پر کلک کریں۔ کیا آپ اس لنک کو کھولیں گے؟" |
| `summary` | `summary_ur.mp3` | "آج آپ نے جو مشق کی۔ آپ کے سیکھنے کے سفر کا سچا ریکارڈ۔ کوئی نمبر یا دباؤ نہیں۔ اگلی تجویز کردہ مشق آزمائیں اور اپنی رفتار سے سیکھتے رہیں۔" |
| `library_intro` | `library_intro_ur.mp3` | "تمام فیچرز اور مہارتوں کا نقشہ۔ تمام مشقیں آزمائیں اور جو چاہیں اپنی مرضی سے سیکھیں۔" |

---

### 4.4 Custom Vector Illustrations & App Icons Catalog (11 SVGs)

| File Path | Dimensions | Usage Context | Visual Content |
|---|---|---|---|
| `public/images/cards/card_wrong_button.svg` | 80x80 | Fear Map Card #1 | Green button with friendly tapping finger and ripple pulse |
| `public/images/cards/card_deleting.svg` | 80x80 | Fear Map Card #2 | Trash bin with gentle recovery arrows showing reversible delete |
| `public/images/cards/card_navigation.svg` | 80x80 | Fear Map Card #3 | Compass with map fold and destination pin |
| `public/images/cards/card_sending_picture.svg` | 80x80 | Fear Map Card #4 | Photo frame with sun/mountain landscape and paperclip |
| `public/images/cards/card_message_safety.svg` | 80x80 | Fear Map Card #5 | Security shield with padlock and warning badge |
| `public/images/cards/card_prefers_audio.svg` | 80x80 | Fear Map Card #6 | Audio speaker with natural acoustic waves |
| `public/images/cards/card_language_difficulty.svg` | 80x80 | Fear Map Card #7 | Friendly conversation bubbles in two languages |
| `public/images/cards/module_messaging.svg` | 320x120 | Library Card / Rec Hero | **Original WhatsApp green logo**, simulated chat preview, paperclip |
| `public/images/cards/module_maps.svg` | 320x120 | Library Card / Rec Hero | **Original Google Maps logo**, vector roads, red destination pin, live sharing badge |
| `public/images/cards/module_safe_delete.svg` | 320x120 | Library Card / Rec Hero | **Original Google Photos pinwheel logo**, photo grid, Trash bin & restore badge |
| `public/images/cards/module_safety_scam.svg` | 320x120 | Library Card / Rec Hero | **Original Google Messages blue logo**, security shield, OTP lockscreen preview |

---

## 5. Verification & Test Evidence

UNSTUCK has undergone rigorous senior-level QA automation:

| Verification Suite | Target Checked | Total Assertions | Result | Evidence File |
|---|---|---|---|---|
| **Version 3.0 Unit Test Suite** | Confidence tracking, Exploration sandbox actions, Transfer metrics, Accessibility | 173 Tests | **100% PASSED** (0 Failures) | [`scripts/test-v3-unit.mjs`](file:///c:/Users/Connect2Aryans/Desktop/UNSTUCK/scripts/test-v3-unit.mjs) |
| **Comprehensive Regression Suite** | Data models, translations, FSM transitions, recommendation engine | 63 Tests | **100% PASSED** (0 Failures) | [`scripts/test-qa-suite.mjs`](file:///c:/Users/Connect2Aryans/Desktop/UNSTUCK/scripts/test-qa-suite.mjs) |
| **Blank Screen Prevention Suite** | Corrupted `check-message` state injection & normal flow | 12 Assertions | **100% PASSED** (0 Errors) | [`scripts/test-phone-never-blank.mjs`](file:///c:/Users/Connect2Aryans/Desktop/UNSTUCK/scripts/test-phone-never-blank.mjs) |
| **Warm UI & Aligned Audio Suite** | 7 SVG card badges, 4 module banners, Urdu audio alignment | 18 Assertions | **100% PASSED** (0 Errors) | [`scripts/test-warm-ui-urdu-alignment.mjs`](file:///c:/Users/Connect2Aryans/Desktop/UNSTUCK/scripts/test-warm-ui-urdu-alignment.mjs) |
| **All-Features Suite** | 4 Modules: Messaging, Maps, Safe Delete, Scam Defense | 24 Assertions | **100% PASSED** (0 Errors) | [`scripts/test-all-features.mjs`](file:///c:/Users/Connect2Aryans/Desktop/UNSTUCK/scripts/test-all-features.mjs) |
| **Hands-Free Demo Suite** | Animated pointer badge navigation across steps 1–3 | 12 Assertions | **100% PASSED** (0 Errors) | [`scripts/test-demo-handsfree.mjs`](file:///c:/Users/Connect2Aryans/Desktop/UNSTUCK/scripts/test-demo-handsfree.mjs) |
| **E2E Browser Journey** | Welcome → Fear Map → Recommendation → Guided → Independent → Transfer → Summary | 28 Assertions | **100% PASSED** (0 Errors) | [`scripts/test-e2e-browser.mjs`](file:///c:/Users/Connect2Aryans/Desktop/UNSTUCK/scripts/test-e2e-browser.mjs) |
| **Vite Production Build** | Zero syntax errors, CSS module tree-shaking | 95 Modules | **100% PASSED** (922ms, 0 Errors) | `npm run build` |

---

## 6. Project Directory Map

```text
C:\Users\Connect2Aryans\Desktop\UNSTUCK\
├── public/
│   ├── audio/ur/                     # 28 Studio-quality Pakistani Urdu MP3 files
│   ├── images/cards/                 # 11 Custom SVG card illustrations & authentic module banners
│   └── favicon.svg                   # Safe shield emblem favicon
├── src/
│   ├── components/                   # 13 Accessible UI components
│   │   ├── AccessibilityToolbar.jsx  # Live Text Scaler, High Contrast & Reduced Motion
│   │   ├── AppHeader.jsx             # Top bar with Language Switcher, SVG nav & Back navigation
│   │   ├── ChoiceCard.jsx            # Fear Map card with SVG illustrations & speaker
│   │   ├── SimulatedPhone.jsx        # WhatsApp/Maps/Gallery simulation with system nav & activeTaskId armor
│   │   ├── RealWorldTransferCard.jsx # Real-world phone bridging & tips card
│   │   ├── StepIndicator.jsx         # Accessible step counter
│   │   ├── HintPanel.jsx             # 3-tiered hint ladder
│   │   └── PrimaryButton.jsx         # Large, tactile senior-friendly action button
│   ├── screens/                      # 11 App screens
│   │   ├── WelcomeScreen.jsx         # Welcome & foundational reassurance
│   │   ├── FearMapScreen.jsx         # Digital Fear Map diagnostic grid
│   │   ├── RecommendationScreen.jsx  # Pedagogical recommendation card
│   │   ├── PracticeIntroScreen.jsx   # Demo vs. Guided mode selection
│   │   ├── GuidedPracticeScreen.jsx  # Step-by-step interactive practice (Armored)
│   │   ├── IndependentAttemptScreen.jsx # Practice without training wheels (Armored)
│   │   ├── SafetyScenarioScreen.jsx  # OTP & Phishing defense scenarios
│   │   ├── ConfidenceMapScreen.jsx   # Digital Confidence Map with honest milestones
│   │   ├── ExplorationModeScreen.jsx # "What Happens If...?" 15-action exploration sandbox
│   │   ├── RealWorldTransferScreen.jsx # Bridge screen to physical phone confidence
│   │   ├── LibraryScreen.jsx         # Skill Map & All Features catalog (2x2 balanced grid)
│   │   └── SummaryScreen.jsx         # Safe Practice Journal & attempt history
│   ├── logic/                        # Core algorithms
│   │   ├── practiceReducer.js        # Practice finite state machine
│   │   ├── recommendTask.js          # Adaptive recommendation engine v3.0
│   │   ├── confidenceTracker.js      # Milestone tracking without pressure
│   │   └── speechUtils.js            # Studio MP3 audio coordinator
│   ├── styles/                       # CSS architecture
│   │   ├── tokens.css                # Warm linen palette, typography, shadows, contrast modes
│   │   ├── global.css                # Global resets & animations
│   │   └── phone.css                 # Simulated phone, WhatsApp, Maps & Gallery CSS
│   ├── App.jsx                       # Master state router & audio coordinator (Armored)
│   └── main.jsx                      # React 18 root with Error Boundary Armor
├── Tasks/                            # Master Vault task documentation & evidence
├── Master_Development_Log.md         # Running governance log of all 13 development entries
└── UNSTUCK_Comprehensive_App_Summary.md # This master document
```

---

## 7. Summary Statement

**UNSTUCK** demonstrates that technology anxiety in older adults is not an inevitable consequence of aging—it is a design failure of existing software. By replacing high-stakes live environments with an **empathic, trilingual, zero-risk flight simulator featuring authentic mobile visuals, armored edge-case reliability, an open consequence sandbox, and real-world transfer support**, UNSTUCK restores digital dignity, builds durable muscle memory, and empowers learners to explore the modern world with confidence.
