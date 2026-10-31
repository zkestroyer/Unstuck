// Safety scenario definitions for Task B (Check a Suspicious Message)
export const scenarios = [
  {
    id: "otp-scam-1",
    scenarioNumber: 1,
    title: {
      en: "Scenario 1: Urgent Account Message",
      ur: "منظر نامہ 1: فوری اکاؤنٹ کا پیغام",
      "roman-ur": "Scenario 1: Urgent Account Message"
    },
    sender: "Unknown Number",
    messageBody: {
      en: "URGENT NOTICE: Your mobile account will be suspended within 2 hours due to unverified activity. Reply immediately with the 6-digit one-time code (OTP) sent to your phone to keep your service active.",
      ur: "فوری اطلاع: غیر تصدیق شدہ سرگرمی کی وجہ سے آپ کا اکاؤنٹ 2 گھنٹے میں معطل ہو جائے گا۔ سروس چالو رکھنے کے لیے اپنے فون پر موصول ہونے والا 6 ہندسوں کا کوڈ (OTP) فوری واپس بھیجیں۔",
      "roman-ur": "URGENT NOTICE: Aap ka account 2 ghante mein band ho jayega. Service active rakhne ke liye phone par aaya 6-digit OTP code fauran reply karein."
    },
    question: {
      en: "What would you do with this message?",
      ur: "آپ اس پیغام کے ساتھ کیا کریں گے؟",
      "roman-ur": "Aap is paighaam ke sath kya karenge?"
    },
    choices: [
      {
        id: "send-code",
        label: {
          en: "Send the code so my account isn't blocked.",
          ur: "کوڈ بھیج دیں تاکہ اکاؤنٹ بلاک نہ ہو۔",
          "roman-ur": "Code bhej dein taake account block na ho."
        },
        isSafe: false,
        feedback: {
          en: "Let's pause and think about this together. A one-time code gives access to your personal account. Legitimate companies and banks will never contact you unexpectedly asking for a code. Sending it could let someone take over your account.",
          ur: "آئیے رک کر اس پر غور کریں۔ OTP کوڈ آپ کے اکاؤنٹ کی چابی ہوتا ہے۔ کوئی بھی حقیقی کمپنی یا بینک غیر متوقع طور پر کوڈ نہیں مانگتا۔ کوڈ بھیجنے سے کوئی آپ کے اکاؤنٹ پر قبضہ کر سکتا ہے۔",
          "roman-ur": "Ruk kar sochen. OTP code aap ke account ki chaabi hota hai. Asli company ya bank kabhi message par code nahi maangte. Code bhejna khatarnaak ho sakta hai."
        }
      },
      {
        id: "stop-check",
        label: {
          en: "Stop and check first. Do not reply with the code.",
          ur: "پہلے رکیں اور جانچیں۔ کوڈ کا جواب نہ دیں۔",
          "roman-ur": "Pehle ruk kar check karein. Code ka reply na karein."
        },
        isSafe: true,
        feedback: {
          en: "Spot on! That is the safest choice. Whenever you get an unexpected message creating urgent panic, never reply directly. Always contact the official customer service number on your bill or official app.",
          ur: "بہترین فیصلہ! یہ سب سے محفوظ طریقہ ہے۔ جب بھی کوئی ہنگامی پیغام آئے تو براہ راست جواب نہ دیں۔ ہمیشہ اپنے بل یا آفیشل ایپ پر دیے گئے نمبر سے رابطہ کریں۔",
          "roman-ur": "Zabardast faisla! Yeh sab se safe tareeqa hai. Emergency create karne waley message ka fauran reply na karein, balkay official helpline se rabta karein."
        }
      },
      {
        id: "ask-sender",
        label: {
          en: "Reply to ask who they are and why they need it.",
          ur: "جواب میں پوچھیں کہ وہ کون ہیں اور کوڈ کیوں چاہیے۔",
          "roman-ur": "Reply mein poochhein ke woh kaun hain aur code kyun chahiye."
        },
        isSafe: false,
        feedback: {
          en: "Good thinking to ask questions, but replying to unknown numbers confirms your phone number is active and invites more scam messages. The safest step is not replying at all, and checking through official channels.",
          ur: "سوال پوچھنا اچھا خیال ہے، لیکن نامعلوم نمبر کو جواب دینے سے تصدیق ہو جاتی ہے کہ آپ کا نمبر ایکٹو ہے، جس سے مزید دھوکہ دہی کے پیغامات آ سکتے ہیں۔ محفوظ ترین طریقہ جواب نہ دینا ہے۔",
          "roman-ur": "Sawal poochna theek hai, lekin unknown number ko reply karne se confirm hota hai ke number active hai. Behtar hai reply na karein."
        }
      }
    ],
    goldenRule: {
      en: "Golden Safety Rule: Never share a one-time code (OTP) with anyone who contacts you unexpectedly, even if they sound official.",
      ur: "سنہری اصول: غیر متوقع طور پر رابطہ کرنے والے کسی بھی شخص کے ساتھ کبھی اپنا OTP کوڈ شیئر نہ کریں۔",
      "roman-ur": "Golden Rule: Achanak message karne waley kisi bhi shakhs ke sath apna OTP code kabhi share na karein."
    }
  },
  {
    id: "otp-scam-2",
    scenarioNumber: 2,
    title: {
      en: "Scenario 2: Delivery Verification",
      ur: "منظر نامہ 2: پارسل ڈلیوری کی تصدیق",
      "roman-ur": "Scenario 2: Delivery Verification"
    },
    sender: "Express Courier Alert",
    messageBody: {
      en: "Your delivery package could not be completed. Driver is waiting outside. Please text back the verification PIN code sent to your phone to confirm your address.",
      ur: "آپ کا پارسل پہنچایا نہیں جا سکا۔ ڈرائیور باہر انتظار کر رہا ہے۔ پتے کی تصدیق کے لیے فون پر آنے والا پن کوڈ فوری واپس بھیجیں۔",
      "roman-ur": "Aap ka parcel deliver nahi ho saka. Driver bahar intezar kar raha hai. Address confirm karne ke liye PIN code reply karein."
    },
    question: {
      en: "What is the safest action here?",
      ur: "یہاں سب سے محفوظ عمل کیا ہے؟",
      "roman-ur": "Yahan sab se safe step kya hai?"
    },
    choices: [
      {
        id: "stop-check-2",
        label: {
          en: "Do not send the PIN. Check your actual order status on the courier website.",
          ur: "پن نہ بھیجیں۔ کورئیر کی اصل ویب سائٹ پر جا کر آرڈر چیک کریں۔",
          "roman-ur": "PIN na bhejein. Courier ki official website par ja kar status check karein."
        },
        isSafe: true,
        feedback: {
          en: "Excellent! Real delivery couriers deliver packages without asking for private login codes or sensitive PINs via text message. You protected your safety.",
          ur: "شاندار! حقیقی ڈلیوری ڈرائیور کبھی ٹیکسٹ میسج پر حساس پن کوڈ نہیں مانگتے۔ آپ نے اپنی حفاظت کی۔",
          "roman-ur": "Excellent! Delivery waley kabhi sensitive PIN code nahi maangte. Aap ne apna account safe rakha."
        }
      },
      {
        id: "send-code-2",
        label: {
          en: "Send the PIN so the driver doesn't leave.",
          ur: "پن کوڈ بھیج دیں تاکہ ڈرائیور واپس نہ چلا جائے۔",
          "roman-ur": "PIN code bhej dein taake driver wapis na chala jaye."
        },
        isSafe: false,
        feedback: {
          en: "Scammers often use fake delivery alerts to create panic. Remember: a PIN sent to your phone should never be handed to someone texting you.",
          ur: "دھوکہ باز اکثر ڈلیوری کے بہانے پریشانی پیدا کرتے ہیں۔ یاد رکھیں: فون پر آنے والا پن کوڈ کسی میسج کرنے والے کو نہ دیں۔",
          "roman-ur": "Fake delivery alerts se scam kiya jata hai. Yaad rakhein: phone par aaya PIN kisi ko reply na karein."
        }
      }
    ],
    goldenRule: {
      en: "Remember: Real delivery services do not ask for secret verification codes via SMS.",
      ur: "یاد رکھیں: اصلی ڈلیوری سروسز SMS کے ذریعے خفیہ کوڈز نہیں مانگتیں۔",
      "roman-ur": "Yaad rakhein: Asli courier service SMS par secret code nahi maangti."
    }
  }
];
