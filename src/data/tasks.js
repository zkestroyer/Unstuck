// Task definitions for interactive practice
export const tasks = {
  "send-picture": {
    id: "send-picture",
    type: "practice",
    title: {
      en: "Send a picture in a message",
      ur: "پیغام میں تصویر بھیجیں",
      "roman-ur": "Paighaam mein tasveer bhejein"
    },
    description: {
      en: "Practise attaching a fictional picture to a message in a safe simulation.",
      ur: "ایک فرضی تصویر پیغام کے ساتھ منسلک کرنے کی مشق کریں۔",
      "roman-ur": "Aik farzi tasveer paighaam ke saath munaslik karne ki mashq karein."
    },
    relatedConcerns: ["sending_picture", "wrong_button", "deleting"],
    
    // Guided Steps (Step-by-step with progressive hints)
    guidedSteps: [
      {
        stepIndex: 0,
        instruction: {
          en: "Find the button to attach something to your message.",
          ur: "پیغام کے ساتھ کچھ منسلک کرنے والا بٹن تلاش کریں۔",
          "roman-ur": "Paighaam ke sath kuch attach karne wala button talash karein."
        },
        targetControlId: "attachment-btn",
        hints: [
          {
            en: "Look for a button used to add something to a message.",
            ur: "پیغام میں کچھ شامل کرنے کے لیے بٹن دیکھیں۔",
            "roman-ur": "Paighaam mein kuch shaamil karne wala button dekhein."
          },
          {
            en: "It is near the message box, shown as a paperclip or plus icon.",
            ur: "یہ میسج باکس کے قریب پیپر کلپ کی شکل کا بٹن ہے۔",
            "roman-ur": "Yeh message box ke qareeb paperclip icon wala button hai."
          },
          {
            en: "Let me show you — tap this highlighted button right here.",
            ur: "آئیے ہم دکھاتے ہیں — اس نمایاں بٹن کو دبائیں۔",
            "roman-ur": "Hum dikhate hain — is highlighted button ko dabayein."
          }
        ],
        wrongTapFeedback: {
          en: "That button does something else. Look for the paperclip attachment icon near the message box.",
          ur: "یہ بٹن کچھ اور کام کرتا ہے۔ میسج باکس کے قریب پیپر کلپ والا بٹن دیکھیں۔",
          "roman-ur": "Yeh button kuch aur kaam karta hai. Message box ke qareeb paperclip icon dekhein."
        },
        correctTapFeedback: {
          en: "That's it! Tapping the paperclip opens your picture tray.",
          ur: "بالکل درست! پیپر کلپ دبانے سے تصاویر کی ٹرے کھل جاتی ہے۔",
          "roman-ur": "Bilkul theek! Paperclip dabane se pictures tray khul jaati hai."
        },
        whatHappensExplanation: {
          en: "This button lets you pick a picture or file to add to your message. It does not send anything yet.",
          ur: "یہ بٹن تصویر منتخب کرنے کے لیے ہوتا ہے۔ اس سے ابھی کچھ نہیں بھیجا جائے گا۔",
          "roman-ur": "Yeh button tasveer chun-ne ke liye hai. Is se abhi kuch send nahi hoga."
        }
      },
      {
        stepIndex: 1,
        instruction: {
          en: "Choose a picture from the tray to attach.",
          ur: "منسلک کرنے کے لیے ٹرے میں سے ایک تصویر منتخب کریں۔",
          "roman-ur": "Attach karne ke liye tray mein se aik picture choose karein."
        },
        targetControlId: "picture-item",
        hints: [
          {
            en: "Tap on any of the pictures shown in the tray.",
            ur: "ٹرے میں نظر آنے والی کسی بھی تصویر کو دبائیں۔",
            "roman-ur": "Tray mein nazar aane wali kisi bhi picture par tap karein."
          },
          {
            en: "Try tapping the 'Family Trip' or 'My Cat' picture.",
            ur: "'Family Trip' یا 'My Cat' والی تصویر پر ٹیپ کریں۔",
            "roman-ur": "'Family Trip' ya 'My Cat' picture par tap karein."
          },
          {
            en: "Let me show you — tap this highlighted picture.",
            ur: "ہم دکھاتے ہیں — اس نمایاں تصویر پر ٹیپ کریں۔",
            "roman-ur": "Hum dikhate hain — is highlighted picture par tap karein."
          }
        ],
        wrongTapFeedback: {
          en: "Tap on one of the photos shown in the tray below.",
          ur: "نیچے ٹرے میں موجود تصاویر میں سے کسی ایک پر ٹیپ کریں۔",
          "roman-ur": "Neeche tray mein mojood photos mein se kisi aik par tap karein."
        },
        correctTapFeedback: {
          en: "Great choice! The picture is now selected and previewed in your draft.",
          ur: "شاندار! تصویر منتخب ہو گئی ہے اور میسج میں نظر آ رہی ہے۔",
          "roman-ur": "Zabardast! Picture select ho gayi hai aur preview nazar aa raha hai."
        },
        whatHappensExplanation: {
          en: "Selecting a picture puts it into your draft message so you can review it before sending.",
          ur: "تصویر منتخب کرنے سے وہ ڈرافٹ میں آ جاتی ہے تاکہ آپ بھیجنے سے پہلے دیکھ سکیں۔",
          "roman-ur": "Picture select karne se woh draft mein aa jaati hai taake aap pehle dekh sakein."
        }
      },
      {
        stepIndex: 2,
        instruction: {
          en: "Review the picture preview, then tap Send to complete the practice.",
          ur: "تصویر دیکھ لیں، پھر مشق مکمل کرنے کے لیے 'Send' دبائیں۔",
          "roman-ur": "Picture preview dekh lein, phir practice mukammal karne ke liye 'Send' dabayein."
        },
        targetControlId: "send-btn",
        hints: [
          {
            en: "Look for the green Send button with the paper airplane icon.",
            ur: "کاغذی جہاز والی سبز سینڈ بٹن کو تلاش کریں۔",
            "roman-ur": "Paper plane icon wala green Send button talash karein."
          },
          {
            en: "It is on the right side of the message input bar.",
            ur: "یہ میسج ان پٹ بار کے دائیں جانب ہے۔",
            "roman-ur": "Yeh message bar ke right side par hai."
          },
          {
            en: "Let me show you — tap this green Send button.",
            ur: "ہم دکھاتے ہیں — اس سبز سینڈ بٹن پر ٹیپ کریں۔",
            "roman-ur": "Hum dikhate hain — is green Send button par tap karein."
          }
        ],
        wrongTapFeedback: {
          en: "To finish sending, find the green button with the arrow or airplane icon.",
          ur: "بھیجنے کے لیے سبز رنگ کا تیر یا جہاز کے نشان والا بٹن تلاش کریں۔",
          "roman-ur": "Bhejne ke liye green button jahan arrow ya airplane icon hai talash karein."
        },
        correctTapFeedback: {
          en: "Well done! You successfully sent the picture in this practice session.",
          ur: "بہت خوب! آپ نے کامیابی سے تصویر بھیج دی ہے۔",
          "roman-ur": "Bohat khoob! Aap ne kamyabi se picture send kar di."
        },
        whatHappensExplanation: {
          en: "In real apps, Send delivers the message to the person. In UNSTUCK, it safely completes the practice.",
          ur: "حقیقی ایپس میں سینڈ پیغام پہنچا دیتا ہے۔ یہاں یہ صرف مشق کو محفوظ طریقے سے مکمل کرتا ہے۔",
          "roman-ur": "Real apps mein Send paighaam pohnchata hai. UNSTUCK mein yeh safe practice mukammal karta hai."
        }
      }
    ],

    // Independent Steps (New scenario, different photo, NO automatic highlights)
    independentSteps: [
      {
        stepIndex: 0,
        instruction: {
          en: "Your friend wants to see your garden. Can you attach a picture of your flowers?",
          ur: "آپ کا دوست باغ دیکھنا چاہتا ہے۔ کیا آپ پھولوں کی تصویر منسلک کر سکتے ہیں؟",
          "roman-ur": "Aap ka dost garden dekhna chahta hai. Kya aap phoolon ki picture attach kar sakte hain?"
        },
        targetControlId: "attachment-btn",
        hints: [
          {
            en: "Remember where we found the attachment option — look for the paperclip.",
            ur: "یاد کریں ہم نے منسلک کرنے کا بٹن کہاں پایا تھا — پیپر کلپ تلاش کریں۔",
            "roman-ur": "Yaad karein attachment button kahan tha — paperclip talash karein."
          },
          {
            en: "The paperclip icon is next to the text box.",
            ur: "پیپر کلپ کا نشان ٹیکسٹ باکس کے ساتھ ہے۔",
            "roman-ur": "Paperclip ka icon text box ke barabar hai."
          }
        ],
        wrongTapFeedback: {
          en: "Not quite. Look near the message box for the paperclip button.",
          ur: "درست نہیں۔ میسج باکس کے قریب پیپر کلپ بٹن دیکھیں۔",
          "roman-ur": "Sahi nahi. Message box ke qareeb paperclip button dekhein."
        },
        correctTapFeedback: {
          en: "You found it on your own!",
          ur: "آپ نے خود ڈھونڈ لیا!",
          "roman-ur": "Aap ne khud dhoond liya!"
        },
        whatHappensExplanation: {
          en: "Opens the photo gallery tray.",
          ur: "فوٹو گیلری ٹرے کھولتا ہے۔",
          "roman-ur": "Photo gallery tray kholta hai."
        }
      },
      {
        stepIndex: 1,
        instruction: {
          en: "Select the 'Garden Flowers' photo from your gallery.",
          ur: "اپنی گیلری سے 'Garden Flowers' والی تصویر منتخب کریں۔",
          "roman-ur": "Apni gallery se 'Garden Flowers' wali photo select karein."
        },
        targetControlId: "picture-garden",
        hints: [
          {
            en: "Look for the picture showing flowers and tap it.",
            ur: "پھولوں والی تصویر دیکھیں اور اس پر ٹیپ کریں۔",
            "roman-ur": "Phoolon wali picture dekhein aur tap karein."
          }
        ],
        wrongTapFeedback: {
          en: "Look for the photo labeled 'Garden Flowers'.",
          ur: "'Garden Flowers' والی تصویر تلاش کریں۔",
          "roman-ur": "'Garden Flowers' wali photo talash karein."
        },
        correctTapFeedback: {
          en: "Perfect! The flowers photo is ready.",
          ur: "بہترین! پھولوں کی تصویر تیار ہے۔",
          "roman-ur": "Zabardast! Flowers ki photo ready hai."
        },
        whatHappensExplanation: {
          en: "Prepares the photo for dispatch.",
          ur: "تصویر کو بھیجنے کے لیے تیار کرتا ہے۔",
          "roman-ur": "Photo ko send karne ke liye tayyar karta hai."
        }
      },
      {
        stepIndex: 2,
        instruction: {
          en: "Now send the message on your own.",
          ur: "اب خود ہی پیغام بھیجیں۔",
          "roman-ur": "Ab khud hi paighaam send karein."
        },
        targetControlId: "send-btn",
        hints: [
          {
            en: "Look for the green button with the paper airplane.",
            ur: "کاغذی جہاز والے سبز بٹن کو دیکھیں۔",
            "roman-ur": "Paper plane waley green button ko dekhein."
          }
        ],
        wrongTapFeedback: {
          en: "Tap the green send icon to deliver the picture.",
          ur: "تصویر بھیجنے کے لیے سبز سینڈ بٹن دبائیں۔",
          "roman-ur": "Photo send karne ke liye green send button dabayein."
        },
        correctTapFeedback: {
          en: "Fantastic! You completed this completely on your own!",
          ur: "شاندار! آپ نے یہ مکمل طور پر خود کر دکھایا!",
          "roman-ur": "Shandar! Aap ne yeh poora khud kar dikhaya!"
        },
        whatHappensExplanation: {
          en: "Completes the independent practice.",
          ur: "آزادانہ مشق مکمل کرتا ہے۔",
          "roman-ur": "Independent practice mukammal karta hai."
        }
      }
    ]
  }
};
