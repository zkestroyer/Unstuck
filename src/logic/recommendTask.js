// Deterministic, rule-based recommendation engine for UNSTUCK across all curriculum modules
export function recommendTask(selectedConcerns = [], attemptHistory = [], completedTaskIds = []) {
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

  // Rule 1: Find first selected concern whose mapped task is not yet completed
  for (const item of CONCERN_MATRIX) {
    if (selectedConcerns.includes(item.concern) && !completedTaskIds.includes(item.taskId)) {
      return {
        taskId: item.taskId,
        reason: item.reason
      };
    }
  }

  // Rule 2: If the primary concern was completed with hints or demo, suggest trying it independently
  for (const item of CONCERN_MATRIX) {
    if (selectedConcerns.includes(item.concern)) {
      const taskAttempts = attemptHistory.filter(a => a.taskId === item.taskId);
      const lastAttempt = taskAttempts[taskAttempts.length - 1];
      if (lastAttempt && !lastAttempt.completedIndependently) {
        return {
          taskId: item.taskId,
          reason: {
            en: "You completed this task with helpful hints. Would you like to try it independently to build your muscle memory?",
            ur: "آپ نے یہ مشق اشاروں کے ساتھ مکمل کی۔ کیا آپ اسے بغیر کسی مدد کے خود آزمانا چاہیں گے؟",
            "roman-ur": "Aap ne yeh hints ke sath complete kiya tha. Kya ab khud se try karna chahenge?"
          }
        };
      }
    }
  }

  // Rule 3: Suggest any uncompleted curriculum task across the full library
  const ALL_TASKS = [
    { id: "send-picture", reason: { en: "Let's start with a practical, common task: sending a picture in a message.", ur: "آئیے ایک عام مشق سے آغاز کرتے ہیں: پیغام میں تصویر بھیجنا۔", "roman-ur": "Aaiye aam mashq se shuru karein: photo send karna." } },
    { id: "explore-maps", reason: { en: "Explore finding destinations and sharing your location safely on Google Maps.", ur: "نقشے پر جگہ تلاش کرنے اور لائیو لوکیشن شیئر کرنے کی مشق کریں۔", "roman-ur": "Maps par jagah aur location share karne ki practice." } },
    { id: "safe-delete", reason: { en: "Overcome fear of deletion by learning how the trash bin protects your photos.", ur: "کوڑے دان کا استعمال سیکھ کر تصویر ڈیلیٹ ہونے کا خوف ختم کریں۔", "roman-ur": "Trash bin ka use seekh kar deletion ka darr door karein." } },
    { id: "check-message", reason: { en: "Learn how to spot suspicious scam messages asking for verification codes.", ur: "مشکوک پیغامات اور جعلی کوڈز کی جانچ کرنا سیکھیں۔", "roman-ur": "Scam messages aur OTP codes ko pehchanna seekhein." } }
  ];

  for (const t of ALL_TASKS) {
    if (!completedTaskIds.includes(t.id)) {
      return {
        taskId: t.id,
        reason: t.reason
      };
    }
  }

  // Default fallback if all completed
  return {
    taskId: "send-picture",
    reason: {
      en: "Practise sending a picture in a fictional message. Explore freely!",
      ur: "تصویر منسلک کرنے اور بھیجنے کی مشق کریں۔ آزادی سے ایکسپلور کریں!",
      "roman-ur": "Tasveer attach aur send karne ki practice karein."
    }
  };
}
