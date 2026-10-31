// Categories and Skill Mappings for UNSTUCK 4-Domain Curriculum
export const LEARNING_CATEGORIES = [
  {
    id: "navigation",
    title: {
      en: "Navigation & Everyday Phone Usage",
      ur: "فون کا استعمال اور نیویگیشن",
      "roman-ur": "Phone Navigation aur Daily Usage"
    },
    shortTitle: {
      en: "Navigation",
      ur: "نیویگیشن",
      "roman-ur": "Navigation"
    },
    icon: "compass",
    badgeIcon: "🧭",
    description: {
      en: "Finding apps, opening menus, searching destinations, and sharing your location safely.",
      ur: "ایپس تلاش کرنا، مینو کھولنا، راستے ڈھونڈنا اور محفوظ طریقے سے لوکیشن شیئر کرنا۔",
      "roman-ur": "Apps dhoondna, menus kholna, maps par rasta aur safe location share karna."
    },
    modules: ["explore-maps"],
    relatedConcerns: ["navigation", "wrong_button"]
  },
  {
    id: "messaging",
    title: {
      en: "Messaging & Sharing",
      ur: "پیغامات اور شیئرنگ",
      "roman-ur": "Messaging aur Sharing"
    },
    shortTitle: {
      en: "Messaging",
      ur: "پیغامات",
      "roman-ur": "Messaging"
    },
    icon: "message",
    badgeIcon: "💬",
    description: {
      en: "Opening chats, attaching photos, sending voice notes, and reviewing messages before sending.",
      ur: "چیٹ کھولنا، تصویریں لگانا، صوتی پیغامات اور بھیجنے سے پہلے پیغام کی جانچ۔",
      "roman-ur": "Chat kholna, photo attach karna, aur message send karne se pehle review karna."
    },
    modules: ["send-picture"],
    relatedConcerns: ["sending_picture", "wrong_button"]
  },
  {
    id: "storage",
    title: {
      en: "Files, Photos & Storage",
      ur: "تصاویر، فائلیں اور کوڑے دان",
      "roman-ur": "Files, Photos aur Storage"
    },
    shortTitle: {
      en: "Storage & Photos",
      ur: "گیلری اور فائلیں",
      "roman-ur": "Storage aur Photos"
    },
    icon: "trash",
    badgeIcon: "📁",
    description: {
      en: "Browsing photo albums, safe deletion, and recovering files from Recently Deleted trash.",
      ur: "فوٹو البم دیکھنا، غلطی سے ڈیلیٹ ہونے سے بچاؤ اور کوڑے دان سے تصویریں واپس لانا۔",
      "roman-ur": "Photos dekhna, safe deletion aur Recently Deleted trash se photos wapis lana."
    },
    modules: ["safe-delete"],
    relatedConcerns: ["deleting", "wrong_button"]
  },
  {
    id: "safety",
    title: {
      en: "Digital Safety & Security",
      ur: "ڈیجیٹل تحفظ اور سیکیورٹی",
      "roman-ur": "Digital Safety aur Security"
    },
    shortTitle: {
      en: "Safety & Scams",
      ur: "سیکیورٹی اور تحفظ",
      "roman-ur": "Safety aur Security"
    },
    icon: "shield",
    badgeIcon: "🛡️",
    description: {
      en: "Spotting suspicious scam messages, protecting one-time codes (OTPs), and verifying senders.",
      ur: "مشکوک پیغامات اور جعلی کوڈز کی پہچان، او ٹی پی کی حفاظت اور محفوظ رہنا۔",
      "roman-ur": "Scam messages pehchanna, OTP codes ki hifazat aur safe verification."
    },
    modules: ["check-message"],
    relatedConcerns: ["message_safety"]
  }
];

export const MODULE_TO_CATEGORY = {
  "explore-maps": "navigation",
  "send-picture": "messaging",
  "safe-delete": "storage",
  "check-message": "safety"
};

// Plain Language Dictionary / Glossary to replace confusing technical jargon
export const GLOSSARY_TERMS = [
  {
    id: "authentication",
    technical: "Authentication / 2FA",
    plain: {
      en: "Proving that it is really you.",
      ur: "یہ ثابت کرنا کہ یہ واقعی آپ ہی ہیں۔",
      "roman-ur": "Yeh confirm karna ke yeh waqai aap hi hain."
    },
    detail: {
      en: "A step where the phone or app checks that the real account owner is logging in.",
      ur: "وہ مرحلہ جس میں ایپ تصدیق کرتی ہے کہ اصل مالک لاگ ان ہو رہا ہے۔",
      "roman-ur": "Woh step jisme app verify karti hai ke asli maalik log in kar raha hai."
    }
  },
  {
    id: "attachment",
    technical: "Attachment",
    plain: {
      en: "A picture or file you add to a message.",
      ur: "کوئی تصویر یا فائل جو آپ پیغام کے ساتھ لگاتے ہیں۔",
      "roman-ur": "Photo ya file jo aap message ke sath add karte hain."
    },
    detail: {
      en: "Represented by a paperclip or plus icon near the typing box.",
      ur: "میسج باکس کے ساتھ پیپر کلپ یا پلس کے نشان سے ظاہر ہوتا ہے۔",
      "roman-ur": "Message box ke sath paperclip ya plus icon se show hota hai."
    }
  },
  {
    id: "phishing",
    technical: "Phishing / Scam Message",
    plain: {
      en: "A fake message trying to trick you.",
      ur: "ایک دھوکہ دہی والا پیغام جو آپ کو پریشان کر کے معلومات چرانا چاہتا ہے۔",
      "roman-ur": "Fake message jo aap ko darra kar secret details lena chahta hai."
    },
    detail: {
      en: "Messages creating false urgency to steal money, passwords, or one-time codes.",
      ur: "فوری نقصان کا جھوٹا خوف دلا کر پاس ورڈ یا کوڈ مانگنے والے پیغامات۔",
      "roman-ur": "Emergency ka darr dikha kar OTP ya password maangne waley messages."
    }
  },
  {
    id: "permissions",
    technical: "App Permissions",
    plain: {
      en: "Things an app is allowed to access.",
      ur: "وہ چیزیں جن تک ایپ کو رسائی کی اجازت ہوتی ہے (جیسے کیمرہ یا لوکیشن)۔",
      "roman-ur": "Woh cheezein jin ki app ko permission milti hai (jaise camera ya location)."
    },
    detail: {
      en: "Settings that allow an app to use your camera, microphone, or location only when needed.",
      ur: "سیٹنگز جو ایپ کو ضرورت کے وقت کیمرہ یا لوکیشن استعمال کرنے دیتی ہیں۔",
      "roman-ur": "Settings jo app ko zaroorat ke waqt camera ya location use karne deti hain."
    }
  },
  {
    id: "otp",
    technical: "OTP (One-Time Password)",
    plain: {
      en: "A secret verification code sent to your phone.",
      ur: "ایک عارضی خفیہ تصدیقی کوڈ جو آپ کے فون پر آتا ہے۔",
      "roman-ur": "Secret verification code jo aap ke phone par aata hai."
    },
    detail: {
      en: "Never share this code with anyone who calls or texts you unexpectedly.",
      ur: "یہ کوڈ فون یا میسج کرنے والے کسی بھی نامعلوم شخص کو کبھی نہ دیں۔",
      "roman-ur": "Yeh code achanak rabta karne waley kisi shakhs ko kabhi na dein."
    }
  }
];
