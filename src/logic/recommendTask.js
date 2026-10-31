// Deterministic, rule-based recommendation engine for UNSTUCK
export function recommendTask(selectedConcerns = [], attemptHistory = [], completedTaskIds = []) {
  // Mapping of concerns to tasks and transparent user-facing reasons
  const CONCERN_MATRIX = [
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
      concern: "deleting",
      taskId: "send-picture",
      reason: {
        en: "You worry about accidentally deleting things. Here you can practise selecting items with zero risk of losing anything.",
        ur: "آپ کو چیزیں ڈیلیٹ ہو جانے کی فکر ہوتی ہے۔ یہاں آپ بنا کسی نقصان کے انتخاب کی مشق کر سکتے ہیں۔",
        "roman-ur": "Aap ko deletion ki fikar rehti hai. Yahan kuch delete nahi hoga."
      }
    },
    {
      concern: "navigation",
      taskId: "send-picture",
      reason: {
        en: "You find it hard to find items on your phone. We will clearly show you where common controls are located.",
        ur: "آپ کو فون پر چیزیں تلاش کرنا مشکل لگتا ہے۔ ہم آپ کو واضح دکھائیں گے کہ عام کنٹرولز کہاں ہوتے ہیں۔",
        "roman-ur": "Phone par controls dhoondna asaan banane ke liye yeh exercise hai."
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

  // Rule 3: Suggest any uncompleted curriculum task
  for (const item of CONCERN_MATRIX) {
    if (!completedTaskIds.includes(item.taskId)) {
      return {
        taskId: item.taskId,
        reason: {
          en: "Ready for your next digital skill? Here is a helpful practice scenario.",
          ur: "اگلی ڈیجیٹل مہارت کے لیے تیار ہیں؟ یہاں ایک مفید مشق ہے۔",
          "roman-ur": "Agli skill seekhne ke liye yeh exercise try karein."
        }
      };
    }
  }

  // Default fallback: Always recommend the primary demo task (send-picture)
  return {
    taskId: "send-picture",
    reason: {
      en: "Practise sending a picture in a fictional message. Explore freely!",
      ur: "فرضی پیغام میں تصویر بھیجنے کی مشق کریں۔ اطمینان سے کوشش کریں!",
      "roman-ur": "Farzi message mein picture send karne ki practice karein."
    }
  };
}
