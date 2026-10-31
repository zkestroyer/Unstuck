# UNSTUCK — UI/UX Design System Specification: Human-First Warmth
**Role:** AI UI/UX Designer (`godmode_ui_ux_designer`)  
**Design Philosophy:** Scandinavian Warmth meets Apple Human Interface Guidelines (Calm, Soft, High-Contrast, Forgiving)  

---

## 1. Warmth & Accessibility Palette Refactoring

```css
:root {
  /* Surface & Canvas: Warm, comforting paper tones */
  --color-page-bg: #FAF8F5;          /* Warm oat/linen tone, reduces eye strain */
  --color-surface: #FFFFFF;          /* Pure crisp white card surface */
  --color-surface-warm: #F4EFEB;     /* Tinted soft warm container fill */

  /* Text & Readability (WCAG AAA Compliance) */
  --color-text-primary: #1C2B24;      /* Deep ink forest charcoal (14.2:1 contrast) */
  --color-text-secondary: #4A5B52;    /* Calming slate moss for explanations */
  --color-text-muted: #74857B;        /* Gentle hint text */
  --color-text-on-primary: #FFFFFF;

  /* Primary Brand: Botanical Emerald */
  --color-primary: #1E5E4F;           /* Welcoming forest teal */
  --color-primary-hover: #16473C;     /* Deepened hover state */
  --color-primary-light: #EBF4F0;     /* Soft botanical wash for selected items */
  --color-primary-border: #BCD9CE;    /* Gentle card border */

  /* Emotional Accents: Warm Terracotta & Honey */
  --color-accent: #E07A5F;            /* Friendly, human terracotta */
  --color-accent-light: #FDF0EC;      /* Soft peach highlight */
  --color-warning-bg: #FEF6E9;        /* Warm amber/honey safety notice */
  --color-warning-border: #F6D69E;    /* Subtle golden border */
  --color-warning-text: #7C4A00;

  /* Card Shadows: Multi-tiered organic elevation */
  --shadow-warm-sm: 0 2px 8px rgba(30, 94, 79, 0.05);
  --shadow-warm-md: 0 6px 20px -2px rgba(30, 94, 79, 0.08), 0 2px 6px rgba(0, 0, 0, 0.03);
  --shadow-warm-lg: 0 12px 32px -4px rgba(30, 94, 79, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
  --shadow-warm-hover: 0 14px 36px -2px rgba(30, 94, 79, 0.16);

  /* Generous Rounded Radii */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-xl: 36px;
  --radius-full: 9999px;
}
```

---

## 2. Component Visual Guidelines

### A. ChoiceCard (`ChoiceCard.jsx`)
- Render an illustrative circular thumbnail (`64px x 64px`) displaying the matching SVG.
- Provide a clear, friendly checkbox indicator that lights up with botanical green and checkmark when selected.
- Card padding increased to `20px`, minimum height `90px` to guarantee zero accidental taps.
- Smooth scale-up and shadow transition on hover (`transform: translateY(-2px)`).

### B. Library Cards (`LibraryScreen.jsx`)
- Top hero banner slot (`height: 110px`) rendering the full vector illustration (`module_*.svg`).
- Status badge with soft pill styling:
  - *Practised* -> Sage green badge with checkmark (`✓ Practised`).
  - *Recommended* -> Warm honey badge with star (`★ Recommended`).
  - *Ready* -> Soft linen badge (`● Ready to explore`).
- Primary call to action with a friendly arrow.

### C. Summary Screen (`SummaryScreen.jsx`)
- Replace the clinical "HONEST PROGRESS" badge with a warm friendly medal/plant badge: `🌱 Safe Practice Journal`.
- If zero exercises completed:
  - Render an inviting illustration card with warm messaging:
    "Welcome to your safe practice space! Take your time, explore at your own pace, and know that you cannot break anything."
- Redesign the Recommended Next Activity box with a warm garden card border, soft green gradient, and prominent pill action button.
