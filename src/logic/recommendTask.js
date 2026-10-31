// Deterministic, rule-based recommendation engine for UNSTUCK across all curriculum modules
// Version 3.0: Incorporates Dynamic Confidence Map, Hint repetition, Mistake recovery, and Real-World Transfer readiness

export function recommendTask(
  selectedConcerns = [],
  attemptHistory = [],
  completedTaskIds = [],
  transferReadiness = {},
  mistakesHistory = []
) {
  // ── RULE 0: Check Real-World Transfer Preference ──
  // If user completed a task and said "I'd like to practise once more" or "I'd prefer someone to guide me"
  for (const [taskId, readiness] of Object.entries(transferReadiness)) {
    if (readiness === 'practice-more' || readiness === 'need-guidance') {
      return {
        taskId,
        reason: {
          en: "You mentioned wanting to practise this once more before trying on your real phone. Let's do another calm, guided run together.",
          ur: "آپ نے اپنے اصلی فون پر آزمانے سے پہلے اس کی مزید مشق کی خواہش ظاہر کی تھی۔ آئیے ایک بار پھر اطمینان سے مل کر مشق کریں۔",
          "roman-ur": "Aap ne real phone par try karne se pehle mazeed practice ki khwahish ki thi. Aaiye dobara safe practice karein."
        }
      };
    }
  }

  const CONCERN_MATRIX = [
    {
      concern: "navigation",
      taskId: "explore-maps",
      reason: {
        en: "You find it hard to find items or places on your phone. Let's practise exploring a destination and sharing your live location on Maps safely.",
        ur: "آپ کو فون پر چیزیں یا جگہیں تلاش کرنا مشکل لگتا ہے۔ آئیے نقشے پر مقام تلاش کرنے اور محفوظ لوکیشن شیئر کرنے کی مشق کریں۔",
        "roman-ur": "Phone par places dhoondna asaan banane ke liye Maps aur Location ki practice karein."
      }
    },
    {
      concern: "deleting",
      taskId: "safe-delete",
      reason: {
        en: "You worry about accidentally deleting things. Learn hands-on how Recently Deleted trash safely holds items so you can never lose anything.",
        ur: "آپ کو چیزیں ڈیلیٹ ہو جانے کی فکر رہتی ہے۔ سیکھیں کہ کوڑے دان فائلوں کو کیسے محفوظ رکھتا ہے اور آپ جب چاہیں واپس لا سکتے ہیں۔",
        "roman-ur": "Accidental deletion ke darr ko door karein. Seekhein ke trash bin se photos wapis kaise laate hain."
      }
    },
    {
      concern: "message_safety",
      taskId: "check-message",
      reason: {
        en: "You mentioned that unfamiliar messages make you unsure. Let's practise checking one safely so you know what signs to look for.",
        ur: "آپ نے بتایا کہ نامعلوم پیغامات آپ کو الجھن میں ڈالتے ہیں۔ آئیے ایک پیغام کو محفوظ طریقے سے جانچنے کی مشق کریں۔",
        "roman-ur": "Aap ne bataya ke unfamiliar messages se pareshani hoti hai. Aaiye safe practice karein."
      }
    },
    {
      concern: "sending_picture",
      taskId: "send-picture",
      reason: {
        en: "You expressed an interest in learning to send pictures. We prepared a simple step-by-step exercise for you.",
        ur: "آپ نے تصویریں بھیجنا سیکھنے کی خواہش ظاہر کی تھی۔ ہم نے آپ کے لیے ایک آسان مرحلہ وار مشق تیار کی ہے۔",
        "roman-ur": "Aap ne photos bhejna seekhne ki khwahish zahir ki thi. Step-by-step practice tayyar hai."
      }
    },
    {
      concern: "wrong_button",
      taskId: "send-picture",
      reason: {
        en: "You worry about pressing the wrong button. In this safe playground, tapping anything is completely safe and reversible.",
        ur: "آپ غلط بٹن دبانے سے ڈرتے ہیں۔ اس محفوظ کھیل کے میدان میں کسی بھی بٹن کو دبانا بالکل محفوظ ہے۔",
        "roman-ur": "Aap ghalat button dabane se darte hain. Yahan kuch bhi dabana 100% safe hai."
      }
    },
    {
      concern: "prefers_audio",
      taskId: "send-picture",
      reason: {
        en: "You prefer listening over reading. Spoken instructions are enabled for every single step.",
        ur: "آپ پڑھنے کی بجائے سننا پسند کرتے ہیں۔ ہر مرحلے کے لیے بولنے والی آواز فراہم کی گئی ہے۔",
        "roman-ur": "Aap sunna pasand karte hain. Har step ke sath bolne wali voice enabled hai."
      }
    },
    {
      concern: "language_difficulty",
      taskId: "send-picture",
      reason: {
        en: "You find technical words difficult. We use plain, conversational language with no confusing terms.",
        ur: "آپ کو تکنیکی الفاظ مشکل لگتے ہیں۔ ہم نے روزمرہ کی سادہ زبان استعمال کی ہے۔",
        "roman-ur": "Mushkil words ke baghair aasan zuban mein practice karein."
      }
    }
  ];

  // ── RULE 1: Prioritize an unpractised activity related to an explicitly selected fear ──
  for (const item of CONCERN_MATRIX) {
    if (selectedConcerns.includes(item.concern) && !completedTaskIds.includes(item.taskId)) {
      return {
        taskId: item.taskId,
        reason: item.reason
      };
    }
  }

  // ── RULE 2: If the user repeatedly needed hints (2+ hints in last attempt), recommend another guided practice ──
  if (attemptHistory.length > 0) {
    const lastAttempt = attemptHistory[attemptHistory.length - 1];
    if (lastAttempt && (lastAttempt.hintsUsed >= 2 || lastAttempt.demonstrationUsed)) {
      return {
        taskId: lastAttempt.taskId,
        reason: {
          en: "You completed this activity with helpful guidance. Let's do a quick repeat to solidify what each button does.",
          ur: "آپ نے یہ مشق رہنمائی کے ساتھ مکمل کی۔ بٹنوں کا کام پکا کرنے کے لیے آئیے ایک بار پھر کوشش کریں۔",
          "roman-ur": "Aap ne guidance ke sath practice ki thi. Muscle memory pakki karne ke liye dobara koshish karein."
        }
      };
    }
  }

  // ── RULE 3: If the user completed an activity independently, suggest an adjacent skill ──
  const CURRICULUM_FLOW = [
    {
      completedId: "send-picture",
      nextId: "safe-delete",
      reason: {
        en: "You've practised selecting and sending pictures! Let's now learn how Recently Deleted trash safely protects your photos.",
        ur: "آپ نے تصویریں بھیجنا سیکھ لیا! آئیے اب دیکھیں کہ کوڑے دان فائلوں کو غلطی سے ضائع ہونے سے کیسے بچاتا ہے۔",
        "roman-ur": "Aap ne photos send karna seekh liya! Aaiye ab dekhein ke Trash photos ko kaise protect karta hai."
      }
    },
    {
      completedId: "safe-delete",
      nextId: "explore-maps",
      reason: {
        en: "You conquered the fear of deleting! Let's now explore finding destinations and sharing location safely on Maps.",
        ur: "آپ نے ڈیلیٹ کا خوف دور کر لیا! آئیے اب نقشے پر جگہیں تلاش کرنے اور لوکیشن شیئر کرنے کی مشق کریں۔",
        "roman-ur": "Deletion ka darr door ho gaya! Ab Maps par jagah aur safe location share explore karein."
      }
    },
    {
      completedId: "explore-maps",
      nextId: "check-message",
      reason: {
        en: "You navigated Maps with confidence. Let's now practise recognising unexpected scam messages and protecting your OTP.",
        ur: "آپ نے اعتماد سے نقشہ استعمال کیا۔ آئیے اب مشکوک پیغامات اور جعلی او ٹی پی کوڈز کی پہچان کی مشق کریں۔",
        "roman-ur": "Maps confidence se use kiya. Ab scam messages aur OTP security ki safe practice karein."
      }
    },
    {
      completedId: "check-message",
      nextId: "send-picture",
      reason: {
        en: "You mastered safety checks! Let's practise everyday messaging and picture sharing.",
        ur: "آپ نے سیکیورٹی اصول سیکھ لیے! آئیے روزمرہ پیغامات اور تصویر بھیجنے کی مشق کریں۔",
        "roman-ur": "Safety principles seekh liye! Ab everyday messaging ki practice karein."
      }
    }
  ];

  // Check if last attempt was independent, suggest next in curriculum flow
  if (attemptHistory.length > 0) {
    const lastAttempt = attemptHistory[attemptHistory.length - 1];
    if (lastAttempt && (lastAttempt.completedIndependently || lastAttempt.safetyChoiceSafe)) {
      const flow = CURRICULUM_FLOW.find(f => f.completedId === lastAttempt.taskId);
      if (flow && !completedTaskIds.includes(flow.nextId)) {
        return {
          taskId: flow.nextId,
          reason: flow.reason
        };
      }
    }
  }

  // ── RULE 4: Suggest any uncompleted curriculum task across the full library ──
  const ALL_TASKS = [
    {
      id: "send-picture",
      reason: {
        en: "Let's start with a practical, common task: sending a picture in a message.",
        ur: "آئیے ایک عام مشق سے آغاز کرتے ہیں: پیغام میں تصویر بھیجنا۔",
        "roman-ur": "Aaiye aam mashq se shuru karein: photo send karna."
      }
    },
    {
      id: "check-message",
      reason: {
        en: "Learn how to spot suspicious scam messages asking for verification codes.",
        ur: "مشکوک پیغامات اور جعلی کوڈز کی جانچ کرنا سیکھیں۔",
        "roman-ur": "Scam messages aur OTP codes ko pehchanna seekhein."
      }
    },
    {
      id: "safe-delete",
      reason: {
        en: "Overcome fear of deletion by learning how the trash bin protects your photos.",
        ur: "کوڑے دان کا استعمال سیکھ کر تصویر ڈیلیٹ ہونے کا خوف ختم کریں۔",
        "roman-ur": "Trash bin ka use seekh kar deletion ka darr door karein."
      }
    },
    {
      id: "explore-maps",
      reason: {
        en: "Explore finding destinations and sharing your location safely on Google Maps.",
        ur: "نقشے پر جگہ تلاش کرنے اور لائیو لوکیشن شیئر کرنے کی مشق کریں۔",
        "roman-ur": "Maps par jagah aur location share karne ki practice."
      }
    }
  ];

  for (const t of ALL_TASKS) {
    if (!completedTaskIds.includes(t.id)) {
      return {
        taskId: t.id,
        reason: t.reason
      };
    }
  }

  // ── Default fallback if all completed ──
  return {
    taskId: "send-picture",
    reason: {
      en: "Practise sending a picture in a fictional message. Explore freely!",
      ur: "تصویر منسلک کرنے اور بھیجنے کی مشق کریں۔ آزادی سے ایکسپلور کریں!",
      "roman-ur": "Tasveer attach aur send karne ki practice karein."
    }
  };
}
