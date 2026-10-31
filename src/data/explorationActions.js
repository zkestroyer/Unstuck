// Actions and consequence definitions for "What Happens If...?" Exploration Mode
export const EXPLORATION_DOMAINS = [
  {
    id: "gallery",
    title: {
      en: "Photos & Gallery",
      ur: "تصاویر اور گیلری",
      "roman-ur": "Photos aur Gallery"
    },
    icon: "picture",
    actions: [
      {
        id: "open-photo",
        label: {
          en: "Open a photograph",
          ur: "تصویر کو بڑا کر کے کھولیں",
          "roman-ur": "Photo ko open karein"
        },
        question: {
          en: "What happens when you tap a photograph?",
          ur: "جب آپ تصویر پر ٹیپ کرتے ہیں تو کیا ہوتا ہے؟",
          "roman-ur": "Photo par tap karne se kya hota hai?"
        },
        explanation: {
          en: "Opening a photo enlarges it to fill your screen so you can view details clearly. It does NOT send, change, or delete anything.",
          ur: "تصویر کھولنے سے وہ پوری اسکرین پر بڑی ہو جاتی ہے تاکہ آپ واضح دیکھ سکیں۔ اس سے کچھ ڈیلیٹ یا کسی کو بھیجا نہیں جاتا۔",
          "roman-ur": "Photo kholne se woh screen par bari ho jati hai. Kuch bhi delete ya send nahi hota."
        },
        consequenceType: "view",
        demoFeedback: {
          en: "The photograph is now open full-screen. You can swipe through or tap back to return.",
          ur: "تصویر اب پوری اسکرین پر کھلی ہے۔ آپ واپس جانے کے لیے بیک دبا سکتے ہیں۔",
          "roman-ur": "Photo full-screen khul gayi hai. Wapis jane ke liye back tap karein."
        }
      },
      {
        id: "select-photo",
        label: {
          en: "Select a photograph",
          ur: "تصویر کو منتخب (سلیکٹ) کریں",
          "roman-ur": "Photo select karein"
        },
        question: {
          en: "What happens when you select a photo?",
          ur: "جب آپ تصویر کو منتخب کرتے ہیں تو کیا ہوتا ہے؟",
          "roman-ur": "Photo select karne se kya hota hai?"
        },
        explanation: {
          en: "Selecting puts a gentle checkmark on the photo. It tells your phone 'I want to do something with this picture next' (like share or delete it). Tapping it again unselects it.",
          ur: "سلیکٹ کرنے سے تصویر پر چیک کا نشان لگ جاتا ہے۔ اس کا مطلب ہے کہ آپ اس تصویر کے ساتھ کچھ کرنا چاہتے ہیں۔ دوبارہ دبانے سے انتخاب ختم ہو جاتا ہے۔",
          "roman-ur": "Select karne se photo par checkmark lag jata hai. Dobara tap karne se unselect ho jati hai."
        },
        consequenceType: "select",
        demoFeedback: {
          en: "A blue checkmark is placed on the photo. It is now ready for your next choice.",
          ur: "تصویر پر نیلے رنگ کا نشان آ گیا ہے۔ یہ اب اگلی کارروائی کے لیے تیار ہے۔",
          "roman-ur": "Photo par checkmark aa gaya hai. Ab aap is par koi action le sakte hain."
        }
      },
      {
        id: "delete-photo",
        label: {
          en: "Press the Delete button",
          ur: "ڈیلیٹ (کچرے کا ڈبہ) کا بٹن دبائیں",
          "roman-ur": "Delete button dabayein"
        },
        question: {
          en: "What happens when you press Delete?",
          ur: "جب آپ ڈیلیٹ کا بٹن دباتے ہیں تو کیا ہوتا ہے؟",
          "roman-ur": "Delete button dabane se kya hota hai?"
        },
        explanation: {
          en: "On modern phones, deleting does NOT destroy your picture permanently right away. It gently moves it to 'Recently Deleted' or Trash, where it stays safe for 30 days in case you change your mind.",
          ur: "فونز میں ڈیلیٹ کرنے سے تصویر فوراً غائب نہیں ہوتی۔ یہ 'Recently Deleted' یا کوڑے دان میں چلی جاتی ہے جہاں 30 دن تک محفوظ رہتی ہے۔",
          "roman-ur": "Delete karne se photo hamesha ke liye gayab nahi hoti. Yeh Recently Deleted trash mein 30 days tak safe rehti hai."
        },
        consequenceType: "trash",
        demoFeedback: {
          en: "The photo disappeared from your main album and was safely moved to the Recently Deleted trash bin.",
          ur: "تصویر البم سے ہٹ کر کوڑے دان کے محفوظ فولڈر میں چلی گئی ہے۔",
          "roman-ur": "Photo main album se hat kar Recently Deleted trash mein safe chali gayi."
        }
      },
      {
        id: "restore-photo",
        label: {
          en: "Restore a deleted photo",
          ur: "کوڑے دان سے تصویر بحال (ریسٹور) کریں",
          "roman-ur": "Trash se photo wapis layein"
        },
        question: {
          en: "What happens when you tap Restore?",
          ur: "جب آپ ریسٹور پر ٹیپ کرتے ہیں تو کیا ہوتا ہے؟",
          "roman-ur": "Restore par tap karne se kya hota hai?"
        },
        explanation: {
          en: "Restoring takes the photo right back out of the Trash and returns it to its original spot in your photo album, looking good as new.",
          ur: "ریسٹور کرنے سے تصویر کوڑے دان سے نکل کر واپس اپنے اصل البم میں اسی جگہ چلی جاتی ہے۔",
          "roman-ur": "Restore karne se photo trash se nikal kar wapis gallery album mein chali jaati hai."
        },
        consequenceType: "restore",
        demoFeedback: {
          en: "Success! The photo has been restored back into your main gallery album.",
          ur: "شاندار! تصویر واپس آپ کی مین گیلری میں بحال ہو گئی ہے۔",
          "roman-ur": "Zabardast! Photo wapis main gallery album mein restore ho gayi."
        }
      }
    ]
  },
  {
    id: "messaging",
    title: {
      en: "Messages & Chats",
      ur: "پیغامات اور چیٹس",
      "roman-ur": "Messages aur Chats"
    },
    icon: "message",
    actions: [
      {
        id: "open-conversation",
        label: {
          en: "Open a conversation",
          ur: "کسی سے گفتگو (چیٹ) کھولیں",
          "roman-ur": "Chat conversation open karein"
        },
        question: {
          en: "What happens when you open a conversation?",
          ur: "گفتگو کھولنے سے کیا ہوتا ہے؟",
          "roman-ur": "Chat kholne se kya hota hai?"
        },
        explanation: {
          en: "Opening a chat displays messages exchanged between you and that person. Just reading a message will NEVER send anything or charge any money.",
          ur: "چیٹ کھولنے سے صرف پچھلے پیغامات نظر آتے ہیں۔ پیغام پڑھنے سے نہ کوئی رقم کٹتی ہے اور نہ ہی خودبخود کچھ بھیجا جاتا ہے۔",
          "roman-ur": "Chat kholne se pehle ke messages nazar aate hain. Padhne se koi charges nahi lagte aur kuch send nahi hota."
        },
        consequenceType: "chat-open",
        demoFeedback: {
          en: "The conversation with Sara is open. You can see past messages safely.",
          ur: "سارہ کے ساتھ گفتگو کھل گئی ہے۔ آپ پرانے پیغامات محفوظ طریقے سے دیکھ سکتے ہیں۔",
          "roman-ur": "Sara ke sath chat khul gayi hai. Purane messages nazar aa rahe hain."
        }
      },
      {
        id: "attach-photo",
        label: {
          en: "Tap the paperclip attachment icon",
          ur: "پیپر کلپ (اٹیچمنٹ) پر ٹیپ کریں",
          "roman-ur": "Paperclip attachment tap karein"
        },
        question: {
          en: "What happens when you tap the paperclip?",
          ur: "پیپر کلپ دبانے سے کیا ہوتا ہے؟",
          "roman-ur": "Paperclip dabane se kya hota hai?"
        },
        explanation: {
          en: "Tapping the paperclip opens your photo tray so you can choose a picture to add. It does NOT send the picture yet; it only prepares it as a preview.",
          ur: "پیپر کلپ دبانے سے تصاویر کی ٹرے کھلتی ہے۔ اس سے تصویر فوراً نہیں بھیجی جاتی بلکہ پہلے ڈرافٹ میں نظر آتی ہے۔",
          "roman-ur": "Paperclip dabane se photos tray khulti hai. Photo abhi send nahi hoti, sirf preview hoti hai."
        },
        consequenceType: "attach",
        demoFeedback: {
          en: "The photo gallery tray slid open from the bottom so you can review and choose.",
          ur: "تصاویر کی ٹرے کھل گئی ہے تاکہ آپ اپنی مرضی کی تصویر چن سکیں۔",
          "roman-ur": "Photo tray khul gayi hai taake aap apni marzi ki picture choose kar sakein."
        }
      },
      {
        id: "send-message",
        label: {
          en: "Tap the Send button (Green arrow)",
          ur: "بھیجیں (سینڈ کا بٹن) دبائیں",
          "roman-ur": "Send button dabayein"
        },
        question: {
          en: "What happens when you tap Send?",
          ur: "سینڈ کا بٹن دبانے سے کیا ہوتا ہے؟",
          "roman-ur": "Send button dabane se kya hota hai?"
        },
        explanation: {
          en: "Tapping Send delivers your typed words and attached picture to the person whose name is at the top. On real phones, always check the recipient's name before sending.",
          ur: "سینڈ دبانے سے آپ کا پیغام اس شخص کو پہنچ جاتا ہے جس کا نام اوپر لکھا ہے۔ حقیقی فون پر بھیجنے سے پہلے ہمیشہ نام ضرور دیکھ لیں۔",
          "roman-ur": "Send dabane se message doosre shakhs ko deliver ho jata hai. Hamesha upar naam verify karein."
        },
        consequenceType: "send",
        demoFeedback: {
          en: "Your message appeared with a small checkmark, indicating it was delivered safely.",
          ur: "آپ کا پیغام چیٹ میں آ گیا ہے اور وصول کنندہ تک پہنچ چکا ہے۔",
          "roman-ur": "Aap ka message deliver ho gaya aur checkmark nazar aa gaya."
        }
      },
      {
        id: "delete-message",
        label: {
          en: "Delete a message from a chat",
          ur: "چیٹ میں سے کوئی پیغام ڈیلیٹ کریں",
          "roman-ur": "Chat se message delete karein"
        },
        question: {
          en: "What happens when you delete a message?",
          ur: "چیٹ میں سے پیغام ڈیلیٹ کرنے پر کیا ہوتا ہے؟",
          "roman-ur": "Chat se message delete karne par kya hota hai?"
        },
        explanation: {
          en: "Deleting a message removes it from your chat screen. In many messaging apps, you can choose 'Delete for me' (it stays on their phone) or 'Delete for everyone' within a short time.",
          ur: "پیغام ڈیلیٹ کرنے سے وہ آپ کی اسکرین سے ہٹ جاتا ہے۔ اکثر ایپس میں آپ صرف اپنے لیے یا سب کے لیے ڈیلیٹ کر سکتے ہیں۔",
          "roman-ur": "Message delete karne se woh chat se hat jata hai. Apps mein 'Delete for me' ya 'Delete for everyone' ka option hota hai."
        },
        consequenceType: "msg-delete",
        demoFeedback: {
          en: "The message was removed from the conversation.",
          ur: "پیغام گفتگو سے ہٹا دیا گیا ہے۔",
          "roman-ur": "Message chat se delete kar diya gaya."
        }
      },
      {
        id: "block-contact",
        label: {
          en: "Block an unknown contact",
          ur: "کسی انجان نمبر کو بلاک کریں",
          "roman-ur": "Unknown number ko block karein"
        },
        question: {
          en: "What happens when you Block a number?",
          ur: "کسی نمبر کو بلاک کرنے سے کیا ہوتا ہے؟",
          "roman-ur": "Number block karne se kya hota hai?"
        },
        explanation: {
          en: "Blocking prevents that person or number from calling you or sending you messages. They will not be notified that they were blocked, and you can easily unblock them anytime.",
          ur: "بلاک کرنے سے وہ شخص آپ کو کال یا میسج نہیں کر سکے گا۔ انہیں کوئی اطلاع نہیں دی جاتی اور آپ جب چاہیں ان بلاک کر سکتے ہیں۔",
          "roman-ur": "Block karne se woh number aap ko call ya message nahi bhej sakta. Aap jab chahein unblock kar sakte hain."
        },
        consequenceType: "block",
        demoFeedback: {
          en: "This contact is now blocked. No new messages will disturb you from this sender.",
          ur: "یہ رابطہ اب بلاک کر دیا گیا ہے۔ ان کی طرف سے کوئی نیا میسج آپ کو تنگ نہیں کرے گا۔",
          "roman-ur": "Yeh contact block ho gaya hai. Ab is se koi message nahi aayega."
        }
      }
    ]
  },
  {
    id: "settings",
    title: {
      en: "Phone Settings & Wi-Fi",
      ur: "فون کی ترتیبات (سیٹنگز) اور وائی فائی",
      "roman-ur": "Phone Settings aur Wi-Fi"
    },
    icon: "gear",
    actions: [
      {
        id: "toggle-wifi",
        label: {
          en: "Turn Wi-Fi On or Off",
          ur: "وائی فائی (Wi-Fi) بند یا چالو کریں",
          "roman-ur": "Wi-Fi on ya off karein"
        },
        question: {
          en: "What happens when you turn Wi-Fi off?",
          ur: "وائی فائی بند کرنے پر کیا ہوتا ہے؟",
          "roman-ur": "Wi-Fi band karne par kya hota hai?"
        },
        explanation: {
          en: "Turning Wi-Fi off disconnects your phone from wireless internet. Nothing is deleted, and your photos and messages remain completely safe. You can turn it right back on anytime.",
          ur: "وائی فائی بند کرنے سے صرف انٹرنیٹ کا رابطہ منقطع ہوتا ہے۔ کوئی فائل یا میسج ضائع نہیں ہوتا اور آپ جب چاہیں دوبارہ آن کر سکتے ہیں۔",
          "roman-ur": "Wi-Fi off karne se wireless internet disconnect hota hai. Kuch delete nahi hota, jab chahein on karein."
        },
        consequenceType: "wifi",
        demoFeedback: {
          en: "Wi-Fi switch toggled. The phone shows 'Offline' without any risk to your data.",
          ur: "وائی فائی بند ہو گیا۔ فون آف لائن ہے مگر آپ کا سارا ڈیٹا محفوظ ہے۔",
          "roman-ur": "Wi-Fi switch toggle ho gaya. Data bilkul safe hai."
        }
      },
      {
        id: "text-size",
        label: {
          en: "Make phone text larger",
          ur: "فون کی لکھائی (فونٹ) کو بڑا کریں",
          "roman-ur": "Phone text size bara karein"
        },
        question: {
          en: "What happens when you adjust text size?",
          ur: "لکھائی کا سائز بڑا کرنے سے کیا ہوتا ہے؟",
          "roman-ur": "Text size bara karne se kya hota hai?"
        },
        explanation: {
          en: "Enlarging text size makes letters across your phone bigger and clearer so your eyes do not strain. It does not move or delete any of your apps.",
          ur: "لکھائی بڑی کرنے سے فون کے تمام الفاظ واضح اور آرام دہ ہو جاتے ہیں تاکہ آنکھوں پر بوجھ نہ پڑے۔",
          "roman-ur": "Text size barhaane se phone ke words bare aur saaf nazar aate hain taake eyes strain na hon."
        },
        consequenceType: "text-size",
        demoFeedback: {
          en: "Text size adjusted to Large. Notice how much easier it is to read!",
          ur: "لکھائی کا سائز بڑا کر دیا گیا ہے۔ دیکھنا کتنا آسان ہو گیا ہے!",
          "roman-ur": "Text size Large ho gaya. Padhna kitna asaan ho gaya!"
        }
      },
      {
        id: "notifications",
        label: {
          en: "Turn notifications on or off",
          ur: "نوٹیفیکیشنز (اطلاعات) بند کریں",
          "roman-ur": "Notifications on ya off karein"
        },
        question: {
          en: "What happens when you turn notifications off?",
          ur: "نوٹیفیکیشنز بند کرنے سے کیا ہوتا ہے؟",
          "roman-ur": "Notifications off karne se kya hota hai?"
        },
        explanation: {
          en: "Turning notifications off silences alerts, sounds, and banners. You will still receive all your messages — they will simply wait quietly until you open the app.",
          ur: "نوٹیفیکیشن بند کرنے سے گھنٹیاں اور الرٹس خاموش ہو جاتے ہیں۔ آپ کے تمام پیغامات بدستور آئیں گے مگر آپ کو ڈسٹرب نہیں کریں گے۔",
          "roman-ur": "Notifications off karne se phone silent rehta hai. Messages zaya nahi hotay, app kholne par milte hain."
        },
        consequenceType: "notifications",
        demoFeedback: {
          en: "Notifications silenced. Your phone will not ring or buzz for new popups.",
          ur: "نوٹیفیکیشنز خاموش ہو گئے ہیں۔ اب کوئی فالتو آواز آپ کو پریشان نہیں کرے گی۔",
          "roman-ur": "Notifications silent ho gaye. Faltu rings ya buzz band ho gaye."
        }
      }
    ]
  },
  {
    id: "safety",
    title: {
      en: "Digital Safety & Scams",
      ur: "ڈیجیٹل سیکیورٹی اور دھوکہ دہی",
      "roman-ur": "Digital Safety aur Scams"
    },
    icon: "shield",
    actions: [
      {
        id: "open-suspicious-msg",
        label: {
          en: "Open a suspicious message",
          ur: "کوئی مشکوک میسج پڑھیں",
          "roman-ur": "Suspicious message open karein"
        },
        question: {
          en: "Is it dangerous just to open an SMS?",
          ur: "کیا صرف میسج کھول کر پڑھنا خطرناک ہے؟",
          "roman-ur": "Kya sirf SMS khol kar padhna khatarnaak hai?"
        },
        explanation: {
          en: "Just opening and reading a text message will NOT infect your phone or steal money. The danger only happens if you tap a web link inside or reply with your private secret codes.",
          ur: "صرف میسج کھول کر پڑھنے سے فون ہیک نہیں ہوتا اور نہ پیسے کٹتے ہیں۔ خطرہ تب ہوتا ہے جب آپ اندر دیے گئے لنک پر کلک کریں یا کوڈ بھیجیں۔",
          "roman-ur": "Sirf message padhne se phone hack nahi hota. Khatra tab hota hai jab aap link tap karein ya OTP bhejein."
        },
        consequenceType: "msg-inspect",
        demoFeedback: {
          en: "You read the message safely. Look closely at the urgency and unknown sender.",
          ur: "آپ نے پیغام محفوظ طریقے سے پڑھ لیا۔ نوٹس کریں کہ بھیجنے والا نامعلوم ہے اور فوری ڈرا رہا ہے۔",
          "roman-ur": "Message safely padh liya. Notice karein ke sender unknown hai."
        }
      },
      {
        id: "otp-request",
        label: {
          en: "Understand an OTP code request",
          ur: "او ٹی پی (OTP) مانگنے والے کو سمجھیں",
          "roman-ur": "OTP code request ko samjhein"
        },
        question: {
          en: "What happens if you give someone your OTP code?",
          ur: "اگر آپ کسی کو اپنا OTP کوڈ بتا دیں تو کیا ہوگا؟",
          "roman-ur": "Agar kisi ko OTP code bata dein toh kya hoga?"
        },
        explanation: {
          en: "An OTP is like the key to your front door. Giving it to someone who contacted you allows them to take over your bank or social accounts. NEVER share OTPs with anyone.",
          ur: "او ٹی پی آپ کے اکاؤنٹ کی چابی ہوتا ہے۔ کسی انجان کو کوڈ دینے سے وہ آپ کے اکاؤنٹ سے پیسے نکال سکتا ہے۔ یہ کبھی کسی کو نہ بتائیں۔",
          "roman-ur": "OTP aap ke account ki chaabi hai. Kisi achanak message karne waley ko code dene se account hack ho sakta hai."
        },
        consequenceType: "otp-warning",
        demoFeedback: {
          en: "Security Notice: In this simulation, you chose to keep the OTP private. Excellent protection!",
          ur: "حفاظتی اطلاع: آپ نے کوڈ کسی کو نہیں دیا — آپ کا اکاؤنٹ 100% محفوظ رہا!",
          "roman-ur": "Security alert: Aap ne code secret rakha, account safe raha!"
        }
      },
      {
        id: "inspect-link",
        label: {
          en: "Inspect a suspicious website link",
          ur: "مشکوک لنک کو غور سے دیکھیں",
          "roman-ur": "Suspicious link inspect karein"
        },
        question: {
          en: "What happens when you tap an unknown link?",
          ur: "کسی انجان لنک پر کلک کرنے سے کیا ہوتا ہے؟",
          "roman-ur": "Unknown web link par click karne se kya hota hai?"
        },
        explanation: {
          en: "Links from unknown senders (like bit.ly or misspelled bank names) can take you to fake clone websites designed to steal passwords. If unsure, do NOT tap the link.",
          ur: "انجان لنکس اکثر جعلی ویب سائٹس پر لے جاتے ہیں جو پاس ورڈ چرانے کے لیے بنائی جاتی ہیں۔ شک کی صورت میں لنک کو کبھی نہ دبائیں۔",
          "roman-ur": "Unknown links fake websites par le jaate hain. Shakk ho toh link par click na karein."
        },
        consequenceType: "link-warning",
        demoFeedback: {
          en: "You inspected the link safely without visiting the website.",
          ur: "آپ نے ویب سائٹ کھولے بغیر لنک کی جانچ کر لی۔ آپ بالکل محفوظ ہیں۔",
          "roman-ur": "Aap ne website kholey baghair link check kar liya. Aap safe hain."
        }
      }
    ]
  }
];
