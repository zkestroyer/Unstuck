# UNSTUCK — Task Specification & PM Scope Alignment
**Task:** Urdu Voiceover Alignment, UI Warmth / Simplicity Overhaul & Card Illustration Integration  
**Date:** 2026-10-31  
**Author:** AI Product Manager (`godmode_product_manager`)  
**Target Audience:** Older adults, anxious late technology adopters, non-technical learners  

---

## 1. Executive Summary & Problem Statement

User testing revealed three critical UX friction points:
1. **Urdu Voiceover Text Misalignment:** The audio played by the speaker button did not match the exact text on the screen. It recited generic paraphrases rather than reading the visible text, causing confusion for illiterate or audio-dependent users.
2. **Bland, Clinical & Technical UI:** The visual tone felt like an austere administrative portal, stark government form, or developer console. Older adult users need an interface that feels warm, encouraging, human, forgiving, and gentle.
3. **Missing Card Imagery:** Cards on the Fear Map and the Skill Map Library displayed either no imagery or raw unicode emojis instead of friendly, high-quality, illustrative SVGs.

---

## 2. In-Scope Deliverables

### Requirement 1: 100% Word-for-Word Urdu Voiceover Alignment
- Generate studio-grade Urdu audio files matching the exact Urdu text displayed on each screen:
  - Welcome Screen (Heading, Subheading, Reassurance)
  - Fear Map Screen (Heading, Subheading, and all 7 individual concern cards)
  - Recommendation Screen (Heading, Task Title, Reason, Safety Reassurance for all 4 task modules)
  - Practice Intro Screen (Heading, Subheading)
  - Guided Practice Steps for all 3 tasks (Messaging, Maps, Safe Delete)
  - Independent Practice Prompt
  - Safety Scenario Questions (OTP phishing, Fake Bank Alert)
  - Summary Screen (Milestone narrative, encouraging next steps)
  - Skill Map Library Screen (Overview and module cards)
- Guarantee 1-to-1 deterministic binding using explicit `audioKey` identifiers across all components, bypassing fragile keyword heuristics.

### Requirement 2: Warm, Simple, Encouraging UI Overhaul
- **Color Palette:** Shift from austere stark white and cold grey-green to warm cream (`#FAF8F5`), soft botanical sage (`#1E5E4F`), warm terracotta/coral accents (`#E07A5F`), and gentle honey highlights (`#FEF3E2`).
- **Typography & Touch Targets:** Larger, friendly typography with generous line height. Generous touch targets (min 48px to 56px) with soft rounded pill geometry (14px–24px border radii).
- **Empathy & Reassurance:** Redesign the Summary Screen's empty state from a cold database prompt ("You haven't completed any exercises yet") into a warm welcoming encouragement card ("Welcome to your Safe Practice Journal 🌿").
- **Visual Elevation:** Soft, warm, multi-layered shadows replacing harsh 1px borders.

### Requirement 3: Card Illustrations Integration
- **Fear Map Cards (`ChoiceCard.jsx`):** Integrate the 7 dedicated illustrative SVGs (`card_wrong_button.svg`, `card_deleting.svg`, `card_navigation.svg`, `card_sending_picture.svg`, `card_message_safety.svg`, `card_prefers_audio.svg`, `card_language_difficulty.svg`) into every concern card.
- **Skill Map Library Cards (`LibraryScreen.jsx`):** Replace raw emoji headers with rich 320x120 SVG illustrations (`module_messaging.svg`, `module_maps.svg`, `module_safe_delete.svg`, `module_safety_scam.svg`).

---

## 3. Definition of Done (DoD)
- [ ] 100% of Urdu voiceover clips match the displayed on-screen Urdu strings verbatim.
- [ ] Roman Urdu continues to strictly suppress the speaker icon (zero audio emissions).
- [ ] All 7 Fear Map concern cards render their matching SVG illustration.
- [ ] All 4 Skill Map Library cards render their matching module banner SVG.
- [ ] Summary screen displays a warm, encouraging illustration and gentle supportive text.
- [ ] Zero build warnings or errors (`npm run build`).
- [ ] Zero browser runtime exceptions verified via headless automated testing.
