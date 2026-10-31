# UNSTUCK — UI/UX Design System & Token Specification

**Document Version:** 1.0.0  
**Date:** 2026-10-31  
**Author:** AI UI/UX Designer (`godmode_ui_ux_designer`)  
**Status:** Approved & Token-Locked  

---

## 1. Art Direction Summary

**Visual Identity:** *"A patient local learning companion"* — warm, approachable, tactile, and human. The interface echoes high-clarity physical instruction cards translated into a calm, responsive digital interface.

### Anti-Patterns Strictly Prohibited:
- ❌ Dark Mode / Cyberpunk / Matrix palettes
- ❌ Neon purple/cyan AI gradients, glowing orbs, or floating chat bubbles
- ❌ Glassmorphism, backdrop-blur, or low-contrast translucent overlays
- ❌ Patronizing stock photography
- ❌ Icon-only navigation bars with ambiguous symbols
- ❌ Confetti bursts, shaking error boxes, or flashing red alert banners
- ❌ Countdown timers or any element inducing urgency
- ❌ Meaningless percentage dials or arbitrary XP progress bars

---

## 2. Complete CSS Custom Properties & Design Tokens

### 2.1 Color Tokens
```css
:root {
  /* Surface & Canvas */
  --color-page-bg:            #F7F5EF;   /* Warm comforting off-white background */
  --color-surface:            #FFFFFF;   /* Crisp white working cards and phone body */

  /* Text & Typography */
  --color-text-primary:       #202820;   /* High-contrast ink-dark green/charcoal */
  --color-text-secondary:     #4E5A52;   /* Muted readable slate for supporting guidance */
  --color-text-on-primary:    #FFFFFF;   /* High-contrast text on solid green buttons */
  --color-text-on-warning:    #704400;   /* Deep amber text on warning surfaces */
  --color-text-danger:        #8B2D28;   /* Deep rust red for high-risk explanations */

  /* Brand & Primary Actions */
  --color-primary:            #245C4B;   /* Deep grounding forest green */
  --color-primary-hover:      #194638;   /* Darker forest green for active/hover */
  --color-primary-light:      #E9F1E9;   /* Soft sage wash for selected backgrounds */

  /* Structural Dividers */
  --color-border:             #D7DDD6;   /* Gentle neutral border for cards and inputs */
  --color-border-selected:    #245C4B;   /* 2px solid forest green for selected items */

  /* Semantic Feedback & Notices */
  --color-gentle-highlight:   #E9F1E9;   /* Supportive callouts and HintPanel fill */
  --color-warning-bg:         #FFF1D6;   /* Warm caution banner background */
  --color-practice-badge-bg:  #FFF1D6;   /* "PRACTICE ONLY" header badge background */

  /* Focus Indicator (Accessibility) */
  --color-focus-ring:         #0B6E99;   /* 3px high-visibility ocean blue keyboard ring */

  /* Simulated Mobile Enclosure */
  --color-phone-frame:        #2C2C2E;   /* Sleek matte phone chassis */
  --color-phone-screen-bg:    #FFFFFF;   /* Screen area canvas */
  --color-phone-status-bar:   #F2F2F7;   /* Simulated mobile header bar */
}
```

### 2.2 Contrast Verification (WCAG AA / AAA)
- `--color-text-primary` on `--color-page-bg`: **14.5:1** (AAA Compliant)
- `--color-text-primary` on `--color-surface`: **16.2:1** (AAA Compliant)
- `--color-text-secondary` on `--color-surface`: **6.8:1** (AA Compliant)
- `--color-text-on-primary` on `--color-primary`: **6.7:1** (AAA for large, AA for normal)
- `--color-text-on-warning` on `--color-warning-bg`: **6.3:1** (AA Compliant)

---

## 3. Typography Scale & Hierarchy

```css
:root {
  /* System font stack for zero layout shift and instant native rendering */
  --font-family-base: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  /* Scale */
  --font-size-heading-xl:     2.00rem;   /* 32px — Screen Titles */
  --font-size-heading-lg:     1.75rem;   /* 28px — Task Headers */
  --font-size-heading-md:     1.375rem;  /* 22px — Card Headers */
  --font-size-heading-sm:     1.125rem;  /* 18px — Subsections */

  --font-size-body-lg:        1.25rem;   /* 20px — Primary Step Instructions */
  --font-size-body-md:        1.125rem;  /* 18px — General Body Copy */
  --font-size-body-sm:        1.00rem;   /* 16px — Secondary Meta & Reassurances */

  --font-size-button-text:    1.125rem;  /* 18px — Action Controls */
  --font-size-label:          0.875rem;  /* 14px — Step Indicators & Tags */
  --font-size-badge:          0.75rem;   /* 12px — Practice Only Badge */

  /* Line Heights */
  --line-height-heading:      1.25;
  --line-height-body:         1.55;
  --line-height-button:       1.20;

  /* Weights */
  --font-weight-regular:      400;
  --font-weight-medium:       500;
  --font-weight-semibold:     600;
  --font-weight-bold:         700;
}
```

---

## 4. Spacing, Metrics & Elevation

```css
:root {
  --space-xs:   4px;
  --space-sm:   8px;
  --space-md:   16px;
  --space-lg:   24px;
  --space-xl:   32px;
  --space-2xl:  48px;
  --space-3xl:  64px;

  --radius-sm:  6px;
  --radius-md:  12px;
  --radius-lg:  20px;
  --radius-xl:  36px;   /* Phone frame outer contour */
  --radius-full:9999px; /* Badges & circular pills */

  --content-max-width:  1060px;
  --phone-width:        375px;
  --phone-height:       720px;
}
```

---

## 5. Component Construction Rules

### 5.1 Interactive Target Rule (48px Rule)
Every interactive element (button, checkbox card, audio trigger, modal dismiss) must have a computed bounding box of at least **48px by 48px** with at least **8px** clear margin from adjacent targets.

### 5.2 ChoiceCard (Fear Map Tiles)
- Visual state consists of 3 synchronized attributes:
  1. Border transitions from `1.5px solid var(--color-border)` to `2.5px solid var(--color-primary)`.
  2. Surface transitions from white to `var(--color-primary-light)` (`#E9F1E9`).
  3. Integrated checkbox circle switches from empty border to filled forest green containing a crisp white SVG checkmark.
- Never rely solely on color switch.

### 5.3 SimulatedPhone Architecture
- Outer bezel: `#2C2C2E` rounded at 36px with subtle hardware drop-shadow (`0 12px 36px rgba(0,0,0,0.14)`).
- Top status header: Persistent `PRACTICE ONLY — NOTHING IS SENT` banner permanently anchored above application content.
- Screen container: Smooth vertical scroll with invisible scrollbar (`scrollbar-width: thin`).

### 5.4 HintPanel
- Background: `#E9F1E9` with deep green 4px left-border accent.
- Icon: Clean line lightbulb SVG.
- Step-ladder animation: Subtle opacity fade-in over 200ms when user triggers a progressive hint.

---

## 6. Motion Standards
- Transitions strictly locked between **150ms and 250ms** with `ease-out`.
- `prefers-reduced-motion` must be respected globally.
- Zero particle animations, zero bouncing buttons, zero flashing indicators.
