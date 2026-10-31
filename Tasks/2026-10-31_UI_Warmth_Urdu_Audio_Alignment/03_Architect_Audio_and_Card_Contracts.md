# UNSTUCK — Architectural Blueprint: Audio Key Registry & Component Contracts
**Role:** AI Lead Architect (`godmode_lead_architect`)  
**Scope:** Audio Key Registry, Deterministic Audio Resolution, Image Binding Scheme  

---

## 1. Deterministic Audio Key Contract (`audioKey`)

To eliminate fragile substring matching, every screen and action passes a rigid, deterministic `audioKey` to `onHear(text, audioKey)`.

### Rigid Audio Key Registry

| Screen / Component | Audio Key | Corresponding File | Exact Spoken Urdu Text |
|---|---|---|---|
| `WelcomeScreen` | `welcome` | `welcome_ur.mp3` | "آئیے ٹیکنالوجی استعمال کرنے کی مشق کریں۔ پہلے یہاں محفوظ طریقے سے کوشش کریں۔ آپ کے اصلی فون کو کچھ نہیں ہوگا۔ کسی اکاؤنٹ یا پاس ورڈ کی ضرورت نہیں۔ اطمینان سے سیکھیں۔" |
| `FearMapScreen` | `fear_map_header` | `fear_map_header_ur.mp3` | "آپ کس کام میں آسانی اور اعتماد چاہتے ہیں؟ جس چیز میں ہچکچاہٹ ہو اسے منتخب کریں۔ آپ بعد میں کبھی بھی تبدیل کر سکتے ہیں۔" |
| `ChoiceCard` (wrong_button) | `concern_wrong_button` | `concern_wrong_button_ur.mp3` | "مجھے ڈر ہے کہ میں غلط بٹن دبا دوں گا۔ جانیں کہ بٹن اور شبیہیں دبانے سے پہلے کیا کرتی ہیں۔" |
| `ChoiceCard` (deleting) | `concern_deleting` | `concern_deleting_ur.mp3` | "مجھے فکر ہے کہ میں کچھ ڈیلیٹ کر دوں۔ چیزیں کھونے کے خوف کے بغیر محفوظ طریقے سے منتخب کرنے کی مشق کریں۔" |
| `ChoiceCard` (navigation) | `concern_navigation` | `concern_navigation_ur.mp3` | "مجھے فون پر چیزیں ڈھونڈنا مشکل لگتا ہے۔ مینو، تصاویر، اور پیغامات آسانی سے تلاش کرنا سیکھیں۔" |
| `ChoiceCard` (sending_picture) | `concern_sending_picture` | `concern_sending_picture_ur.mp3` | "میں تصویریں یا فائلیں بھیجنا سیکھنا چاہتا ہوں۔ پیغام میں تصویر منسلک کرنے اور بھیجنے کی مرحلہ وار مشق۔" |
| `ChoiceCard` (message_safety) | `concern_message_safety` | `concern_message_safety_ur.mp3` | "کچھ پیغامات مجھے الجھن میں ڈال دیتے ہیں۔ مشکوک پیغامات اور کوڈز مانگنے والوں کی پہچان سیکھیں۔" |
| `ChoiceCard` (prefers_audio) | `concern_prefers_audio` | `concern_prefers_audio_ur.mp3` | "میں پڑھنے کی بجائے سننا پسند کرتا ہوں۔ ہر ہدایت کے ساتھ بولنے والا بٹن دستیاب ہوگا تاکہ آپ سن سکیں۔" |
| `ChoiceCard` (language_diff) | `concern_language_difficulty` | `concern_language_difficulty_ur.mp3` | "فون پر الفاظ سمجھنا مشکل ہے۔ ہم بغیر مشکل اصطلاحات کے، عام فہم زبان میں سب سمجھاتے ہیں۔" |
| `RecommendationScreen` (send-picture) | `rec_send-picture` | `rec_send_picture_ur.mp3` | "آپ کے لیے تجویز کردہ مشق: پیغام میں تصویر بھیجیں۔ یہ تجویز کیوں دی گئی: آئیے ایک عام اور مفید کام سے شروع کریں، یعنی پیغام میں تصویر بھیجنا۔ محفوظ ماحول: یہاں آپ کچھ بھی خراب، ڈیلیٹ یا غلطی سے نہیں بھیج سکتے۔" |
| `RecommendationScreen` (explore-maps) | `rec_explore-maps` | `rec_maps_ur.mp3` | "آپ کے لیے تجویز کردہ مشق: نقشے پر جگہ تلاش کریں اور لوکیشن شیئر کریں۔ یہ تجویز کیوں دی گئی: اپنے پیاروں کے ساتھ محفوظ طریقے سے اپنی لوکیشن شیئر کرنا سیکھیں۔ محفوظ ماحول: یہاں آپ کچھ بھی خراب، ڈیلیٹ یا غلطی سے نہیں بھیج سکتے۔" |
| `RecommendationScreen` (safe-delete) | `rec_safe-delete` | `rec_delete_ur.mp3` | "آپ کے لیے تجویز کردہ مشق: محفوظ ڈیلیشن اور تصویر کی بحالی۔ یہ تجویز کیوں دی گئی: تصویر ڈیلیٹ کرنے کے بعد اسے کوڑے دان سے بحال کرنا سیکھیں۔ محفوظ ماحول: یہاں آپ کچھ بھی خراب، ڈیلیٹ یا غلطی سے نہیں بھیج سکتے۔" |
| `RecommendationScreen` (check-message) | `rec_check-message` | `rec_check_message_ur.mp3` | "آپ کے لیے تجویز کردہ مشق: مشکوک پیغامات کی جانچ۔ یہ تجویز کیوں دی گئی: مشکوک پیغامات اور جعلی کوڈز کی جانچ کرنا سیکھیں۔ محفوظ ماحول: یہاں آپ کچھ بھی خراب، ڈیلیٹ یا غلطی سے نہیں بھیج سکتے۔" |
| `PracticeIntroScreen` | `practice_intro` | `practice_intro_ur.mp3` | "یہ ایک نقلی فون اسکرین ہے۔ آپ یہاں بے خوف ہو کر بٹن دبا سکتے ہیں۔ کوئی پیغام کسی کو نہیں جائے گا۔" |
| `GuidedPracticeScreen` (send-picture step 0) | `task_send-picture_0` | `task_send_picture_step1_ur.mp3` | "پیغام کے ساتھ کچھ منسلک کرنے والا بٹن تلاش کریں۔" |
| `GuidedPracticeScreen` (send-picture step 1) | `task_send-picture_1` | `task_send_picture_step2_ur.mp3` | "منسلک کرنے کے لیے ٹرے میں سے ایک تصویر منتخب کریں۔" |
| `GuidedPracticeScreen` (send-picture step 2) | `task_send-picture_2` | `task_send_picture_step3_ur.mp3` | "تصویر کے ساتھ پیغام بھیجیں۔" |
| `GuidedPracticeScreen` (explore-maps step 0) | `task_explore-maps_0` | `task_maps_step1_ur.mp3` | "نقشے کی سرچ بار میں فارمیسی تلاش کریں۔" |
| `GuidedPracticeScreen` (explore-maps step 1) | `task_explore-maps_1` | `task_maps_step2_ur.mp3` | "اپنے مقام کو شیئر کرنے کا بٹن دبائیں۔" |
| `GuidedPracticeScreen` (explore-maps step 2) | `task_explore-maps_2` | `task_maps_step3_ur.mp3` | "15 منٹ کے لیے اپنی لائیو لوکیشن بھیجنے کی تصدیق کریں۔" |
| `GuidedPracticeScreen` (safe-delete step 0) | `task_safe-delete_0` | `task_delete_step1_ur.mp3` | "تصویر منتخب کر کے کوڑے دان کا آئیکن دبائیں۔" |
| `GuidedPracticeScreen` (safe-delete step 1) | `task_safe-delete_1` | `task_delete_step2_ur.mp3` | "ریسنٹلی ڈیلیٹڈ یعنی کوڑے دان کے فولڈر میں جائیں۔" |
| `GuidedPracticeScreen` (safe-delete step 2) | `task_safe-delete_2` | `task_delete_step3_ur.mp3` | "تصویر پر ری سٹور کا بٹن دبا کر اسے گیلری میں بحال کریں۔" |
| `IndependentAttemptScreen` | `independent_prompt` | `independent_prompt_ur.mp3` | "اب خود کوشش کر کے دیکھیں! کیا آپ اپنے دوست کو پھولوں کی تصویر بھیج سکتے ہیں؟ اطمینان سے کریں۔ آپ جب چاہیں اشارہ مانگ سکتے ہیں۔" |
| `SafetyScenarioScreen` (Scenario 0) | `safety_0` | `safety_scenario1_ur.mp3` | "سیکیورٹی جانچ: مشکوک پیغامات۔ نامعلوم نمبر سے میسج ہے: آپ کا انعام کا کوڈ 4829 ہے۔ کسی کے ساتھ شیئر نہ کریں۔ کیا آپ یہ کوڈ فون پر کسی کو بتائیں گے؟" |
| `SafetyScenarioScreen` (Scenario 1) | `safety_1` | `safety_scenario2_ur.mp3` | "سیکیورٹی جانچ: بینک الرٹ کا مشکوک میسج ہے: آپ کا اکاؤنٹ بلاک کر دیا گیا ہے، فوری اس لنک پر کلک کریں۔ کیا آپ اس لنک کو کھولیں گے؟" |
| `SummaryScreen` | `summary` | `summary_ur.mp3` | "آج آپ نے جو مشق کی۔ آپ کے سیکھنے کے سفر کا سچا ریکارڈ۔ کوئی نمبر یا دباؤ نہیں۔ اگلی تجویز کردہ مشق آزمائیں اور اپنی رفتار سے سیکھتے رہیں۔" |
| `LibraryScreen` | `library_intro` | `library_intro_ur.mp3` | "تمام فیچرز اور مہارتوں کا نقشہ۔ تمام مشقیں آزمائیں اور جو چاہیں اپنی مرضی سے سیکھیں۔" |

---

## 2. Card Image Binding Schema

In `src/data/concerns.js`, add `image: "/images/cards/card_${id}.svg"`.
In `ChoiceCard.jsx`, render:
```jsx
<div className={styles.imageWrap}>
  <img src={image || `/images/cards/card_${id}.svg`} alt="" className={styles.cardImage} />
</div>
```
In `LibraryScreen.jsx`, render the module banner:
```jsx
<div className={styles.cardBannerWrap}>
  <img src={topic.bannerImage} alt="" className={styles.cardBanner} />
</div>
```
