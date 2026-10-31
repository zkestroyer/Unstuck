// Task definitions for interactive practice across Messaging, Maps, and Safe Deletion
export const tasks = {
  "send-picture": {
    id: "send-picture",
    type: "practice",
    category: "messaging",
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
          en: "Send the message with your picture.",
          ur: "تصویر کے ساتھ پیغام بھیجیں۔",
          "roman-ur": "Tasveer ke sath message send karein."
        },
        targetControlId: "send-btn",
        hints: [
          {
            en: "Look for a button used to deliver your message.",
            ur: "پیغام پہنچانے والا بٹن دیکھیں۔",
            "roman-ur": "Message deliver karne wala button dekhein."
          },
          {
            en: "It is often a green or blue circle with an arrow or paper airplane icon.",
            ur: "یہ تیر یا کاغذی جہاز والے آئیکن والا بٹن ہوتا ہے۔",
            "roman-ur": "Yeh arrow ya paper plane icon wala button hota hai."
          },
          {
            en: "Let me show you — tap this highlighted send button right here.",
            ur: "ہم دکھاتے ہیں — اس نمایاں سینڈ بٹن کو دبائیں۔",
            "roman-ur": "Hum dikhate hain — is highlighted send button ko dabayein."
          }
        ],
        wrongTapFeedback: {
          en: "Look for the green send button on the bottom right.",
          ur: "دائیں طرف نیچے سبز سینڈ کا بٹن تلاش کریں۔",
          "roman-ur": "Right side neeche green send button dekhein."
        },
        correctTapFeedback: {
          en: "Well done! Your message and picture have been safely sent.",
          ur: "شاندار! آپ کا پیغام اور تصویر محفوظ طریقے سے بھیج دی گئی ہے۔",
          "roman-ur": "Bohat khoob! Aap ka message aur photo safely send ho gaya."
        },
        whatHappensExplanation: {
          en: "Tapping send delivers your message and attachment to the recipient in this simulation.",
          ur: "سینڈ بٹن دبانے سے آپ کا پیغام اور تصویر وصول کنندہ کو مل جاتی ہے۔",
          "roman-ur": "Send button dabane se message aur attachment doosre shakhs ko mil jaati hai."
        }
      }
    ],

    independentSteps: [
      {
        stepIndex: 0,
        instruction: {
          en: "Your friend wants to see your garden. Can you attach a picture of your flowers?",
          ur: "آپ کا دوست باغ دیکھنا چاہتا ہے۔ کیا آپ پھولوں کی تصویر منسلک کر سکتے ہیں؟",
          "roman-ur": "Aap ka dost garden dekhna chahta hai. Flowers ki photo attach karein?"
        },
        targetControlId: "attachment-btn",
        hints: [
          {
            en: "Tap the paperclip icon near the message box.",
            ur: "میسج باکس کے قریب پیپر کلپ پر ٹیپ کریں۔",
            "roman-ur": "Message box ke qareeb paperclip par tap karein."
          }
        ],
        wrongTapFeedback: {
          en: "Remember: the paperclip is on the left of the message box.",
          ur: "یاد رہے: پیپر کلپ میسج باکس کے بائیں طرف ہوتا ہے۔",
          "roman-ur": "Yaad rakhein: paperclip message box ke left par hota hai."
        },
        correctTapFeedback: {
          en: "Great! The photo gallery tray is open.",
          ur: "عمدہ! فوٹو گیلری کی ٹرے کھل گئی ہے۔",
          "roman-ur": "Great! Photo gallery tray khul gayi hai."
        },
        whatHappensExplanation: {
          en: "Opens the photo gallery selection tray.",
          ur: "تصاویر منتخب کرنے کی ٹرے کھولتا ہے۔",
          "roman-ur": "Photos select karne ki tray kholta hai."
        }
      },
      {
        stepIndex: 1,
        instruction: {
          en: "Select the photo of the garden flowers.",
          ur: "باغ کے پھولوں والی تصویر منتخب کریں۔",
          "roman-ur": "Garden flowers wali photo select karein."
        },
        targetControlId: "picture-item",
        hints: [
          {
            en: "Look for the photo labeled 'Garden Flowers'.",
            ur: "'Garden Flowers' والی تصویر تلاش کریں۔",
            "roman-ur": "'Garden Flowers' wali photo talash karein."
          }
        ],
        wrongTapFeedback: {
          en: "Tap the flowers photo in the tray.",
          ur: "ٹرے میں پھولوں کی تصویر پر ٹیپ کریں۔",
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
  },

  // 🗺️ Task B: Explore Maps & Share Location
  "explore-maps": {
    id: "explore-maps",
    type: "practice",
    category: "mapping",
    title: {
      en: "Find a place and share your location on Maps",
      ur: "نقشے پر جگہ تلاش کریں اور لوکیشن شیئر کریں",
      "roman-ur": "Maps par jagah talash karein aur location share karein"
    },
    description: {
      en: "Practise finding a destination and sharing your live location with family safely.",
      ur: "نقشے پر مقام تلاش کرنے اور فیملی کے ساتھ محفوظ لوکیشن شیئر کرنے کی مشق کریں۔",
      "roman-ur": "Maps par jagah dhoondne aur family ke sath safe location share karne ki practice."
    },
    relatedConcerns: ["navigation", "wrong_button"],

    guidedSteps: [
      {
        stepIndex: 0,
        instruction: {
          en: "Tap the search bar at the top to look for 'City Pharmacy'.",
          ur: "اوپر موجود سرچ بار پر ٹیپ کر کے 'City Pharmacy' تلاش کریں۔",
          "roman-ur": "Upar search bar par tap karke 'City Pharmacy' talash karein."
        },
        targetControlId: "maps-search-bar",
        hints: [
          {
            en: "Look for the white search bar with the magnifying glass icon at the top of the map.",
            ur: "نقشے کے سب سے اوپر میگنیفائنگ گلاس والے سفید سرچ بار کو دیکھیں۔",
            "roman-ur": "Map ke top par search bar par tap karein."
          },
          {
            en: "Tap the search box to type or choose your destination.",
            ur: "اپنی منزل چننے کے لیے سرچ باکس کو دبائیں۔",
            "roman-ur": "Apni manzil chun-ne ke liye search box dabayein."
          },
          {
            en: "Tap this highlighted search bar right here.",
            ur: "اس نمایاں سرچ بار پر ٹیپ کریں۔",
            "roman-ur": "Is highlighted search bar par tap karein."
          }
        ],
        wrongTapFeedback: {
          en: "Tap the top search bar to search for your destination.",
          ur: "منزل تلاش کرنے کے لیے اوپر والی سرچ بار پر ٹیپ کریں۔",
          "roman-ur": "Destination dhoondne ke liye top search bar dabayein."
        },
        correctTapFeedback: {
          en: "Great! 'City Pharmacy' has been found on the map with a red pin.",
          ur: "شاندار! نقشے پر لال پن کے ساتھ 'City Pharmacy' مل گئی ہے۔",
          "roman-ur": "Zabardast! Map par red pin ke sath pharmacy mil gayi."
        },
        whatHappensExplanation: {
          en: "Searching on Maps displays directions and details about the place without making any calls or charges.",
          ur: "نقشے پر تلاش کرنے سے راستے کی تفصیل ملتی ہے، اس پر کوئی خرچ نہیں آتا۔",
          "roman-ur": "Search karne se directions nazar aati hain, koi charges nahi lagtay."
        }
      },
      {
        stepIndex: 1,
        instruction: {
          en: "Tap 'Share Location' on the location details card.",
          ur: "مقام کی تفصیلات والے کارڈ پر 'Share Location' پر ٹیپ کریں۔",
          "roman-ur": "Location card par 'Share Location' button par tap karein."
        },
        targetControlId: "maps-share-btn",
        hints: [
          {
            en: "Look for the blue 'Share Location' button at the bottom of the map.",
            ur: "نقشے کے نچلے حصے پر نیلے رنگ کا 'Share Location' بٹن دیکھیں۔",
            "roman-ur": "Map ke bottom par 'Share Location' button dekhein."
          },
          {
            en: "Tapping this lets you safely send your location link to trusted contacts.",
            ur: "اس بٹن سے آپ اپنے بھروسے مند رابطوں کو لوکیشن بھیج سکتے ہیں۔",
            "roman-ur": "Is se aap family ko safe location link bhej saktay hain."
          },
          {
            en: "Tap this highlighted 'Share Location' button.",
            ur: "اس نمایاں 'Share Location' بٹن پر ٹیپ کریں۔",
            "roman-ur": "Highlighted 'Share Location' button dabayein."
          }
        ],
        wrongTapFeedback: {
          en: "Tap the blue 'Share Location' button on the card.",
          ur: "کارڈ پر نیلے 'Share Location' بٹن پر ٹیپ کریں۔",
          "roman-ur": "Card par blue 'Share Location' button dabayein."
        },
        correctTapFeedback: {
          en: "Excellent! The sharing options sheet is now open.",
          ur: "بہترین! لوکیشن شیئر کرنے کے اختیارات کھل گئے ہیں۔",
          "roman-ur": "Bohat khoob! Location share sheet khul gayi hai."
        },
        whatHappensExplanation: {
          en: "This prepares a secure 15-minute location link for your chosen family contact.",
          ur: "یہ آپ کے منتخب کردہ خاندانی فرد کے لیے 15 منٹ کا محفوظ لنک تیار کرتا ہے۔",
          "roman-ur": "Yeh 15 minutes ka safe location link ready karta hai."
        }
      },
      {
        stepIndex: 2,
        instruction: {
          en: "Tap 'Send Location to Family' to confirm.",
          ur: "تصدیق کے لیے 'Send Location to Family' پر ٹیپ کریں۔",
          "roman-ur": "'Send Location to Family' par tap karke confirm karein."
        },
        targetControlId: "maps-confirm-btn",
        hints: [
          {
            en: "Tap the green confirm button at the bottom of the sharing sheet.",
            ur: "شیئرنگ شیٹ کے نچلے حصے پر سبز بٹن دبائیں۔",
            "roman-ur": "Green confirm button par tap karein."
          },
          {
            en: "This sends the location only to your fictional daughter in this practice sandbox.",
            ur: "اس مشق میں یہ لوکیشن صرف فرضی بیٹی کے ساتھ شیئر ہوگی۔",
            "roman-ur": "Yeh location sirf practice daughter ko send hogi."
          },
          {
            en: "Tap the highlighted 'Send Location' button right here.",
            ur: "اس نمایاں 'Send Location' بٹن پر ٹیپ کریں۔",
            "roman-ur": "Highlighted 'Send Location' button dabayein."
          }
        ],
        wrongTapFeedback: {
          en: "Tap the green 'Send Location' button to complete the step.",
          ur: "مرحلہ مکمل کرنے کے لیے سبز 'Send Location' بٹن پر ٹیپ کریں۔",
          "roman-ur": "Green 'Send Location' button dabayein."
        },
        correctTapFeedback: {
          en: "Wonderful! Your live location has been shared safely.",
          ur: "شاندار! آپ کی لائیو لوکیشن محفوظ طریقے سے شیئر ہو گئی ہے۔",
          "roman-ur": "Zabardast! Aap ki live location safely share ho gayi."
        },
        whatHappensExplanation: {
          en: "Your family can now see where you are on their map for 15 minutes, and it stops automatically.",
          ur: "اب آپ کی فیملی 15 منٹ کے لیے آپ کو دیکھ سکتی ہے، جس کے بعد یہ خود بند ہو جائے گا۔",
          "roman-ur": "Family 15 mins ke liye map par dekh sakti hai, phir auto-stop ho jata hai."
        }
      }
    ],

    independentSteps: [
      {
        stepIndex: 0,
        instruction: {
          en: "You are meeting your family at 'Central Park'. Tap the search bar to find it.",
          ur: "آپ فیملی سے 'Central Park' میں مل رہے ہیں۔ سرچ بار پر ٹیپ کریں۔",
          "roman-ur": "Aap family se 'Central Park' mil rahe hain. Search bar tap karein."
        },
        targetControlId: "maps-search-bar",
        hints: [{ en: "Tap the search box at the top.", ur: "اوپر سرچ باکس دبائیں۔", "roman-ur": "Top search box tap karein." }],
        wrongTapFeedback: { en: "Tap the search bar.", ur: "سرچ بار دبائیں۔", "roman-ur": "Search bar tap karein." },
        correctTapFeedback: { en: "Central Park located on the map!", ur: "سینٹرل پارک مل گیا!", "roman-ur": "Central Park mil gaya!" },
        whatHappensExplanation: { en: "Locates the park.", ur: "پارک تلاش کرتا ہے۔", "roman-ur": "Park locate karta hai." }
      },
      {
        stepIndex: 1,
        instruction: {
          en: "Now tap 'Share Location' so they know you have arrived.",
          ur: "اب 'Share Location' پر ٹیپ کریں تاکہ انہیں معلوم ہو آپ پہنچ گئے ہیں۔",
          "roman-ur": "Ab 'Share Location' par tap karein taake unhein pata chale."
        },
        targetControlId: "maps-share-btn",
        hints: [{ en: "Look for the blue share button.", ur: "نیلا شیئر بٹن دیکھیں۔", "roman-ur": "Blue share button dekhein." }],
        wrongTapFeedback: { en: "Tap the share button on the card.", ur: "کارڈ پر شیئر بٹن دبائیں۔", "roman-ur": "Share button dabayein." },
        correctTapFeedback: { en: "Sharing sheet opened.", ur: "شیئرنگ شیٹ کھل گئی۔", "roman-ur": "Sharing sheet khul gayi." },
        whatHappensExplanation: { en: "Prepares location link.", ur: "لنک تیار کرتا ہے۔", "roman-ur": "Location link tayyar karta hai." }
      },
      {
        stepIndex: 2,
        instruction: {
          en: "Confirm by tapping 'Send Location to Family'.",
          ur: "'Send Location to Family' پر ٹیپ کر کے بھیجیں۔",
          "roman-ur": "'Send Location to Family' par tap karke bhejein."
        },
        targetControlId: "maps-confirm-btn",
        hints: [{ en: "Tap the green confirm button.", ur: "سبز بٹن دبائیں۔", "roman-ur": "Green button tap karein." }],
        wrongTapFeedback: { en: "Tap the green send button.", ur: "سبز بٹن دبائیں۔", "roman-ur": "Green button dabayein." },
        correctTapFeedback: { en: "Independent Maps practice complete! You did it on your own!", ur: "شاندار! آپ نے یہ مکمل طور پر خود کر دکھایا!", "roman-ur": "Shandar! Aap ne khud kar dikhaya!" },
        whatHappensExplanation: { en: "Completes independent Maps practice.", ur: "مشق مکمل کرتا ہے۔", "roman-ur": "Maps practice complete karta hai." }
      }
    ]
  },

  // 🗑️ Task C: Safe Deletion & Trash Recovery
  "safe-delete": {
    id: "safe-delete",
    type: "practice",
    category: "storage",
    title: {
      en: "Safely delete a photo and restore from trash",
      ur: "تصویر ڈیلیٹ کریں اور کوڑے دان سے واپس لائیں",
      "roman-ur": "Photo delete karein aur trash se restore karein"
    },
    description: {
      en: "Learn what happens when you delete an item and how Recently Deleted trash safely protects you.",
      ur: "جانیں کہ ڈیلیٹ کرنے پر کیا ہوتا ہے اور کوڑے دان آپ کی فائلوں کو کیسے محفوظ رکھتا ہے۔",
      "roman-ur": "Seekhein ke delete karne par kya hota hai aur trash kaise protect karta hai."
    },
    relatedConcerns: ["deleting", "wrong_button"],

    guidedSteps: [
      {
        stepIndex: 0,
        instruction: {
          en: "Tap the Trash Bin icon on the blurry test photo to delete it.",
          ur: "دھندلی ٹیسٹ تصویر کو ہٹانے کے لیے کچرے کے ڈبے والے آئیکن پر ٹیپ کریں۔",
          "roman-ur": "Blurry test photo ko hatane ke liye Trash Bin icon par tap karein."
        },
        targetControlId: "photo-trash-btn",
        hints: [
          {
            en: "Look for the red trash can icon below the sample photo.",
            ur: "تصویر کے نیچے لال کچرے کے ڈبے کا نشان دیکھیں۔",
            "roman-ur": "Photo ke neeche red trash can icon dekhein."
          },
          {
            en: "Don't worry: in phones, deleting first moves items to a holding bin for 30 days.",
            ur: "گھبرائیں نہیں: فونز میں ڈیلیٹ کی گئی چیزیں 30 دن تک کوڑے دان میں محفوظ رہتی ہیں۔",
            "roman-ur": "Fikar na karein: phone mein items 30 days tak trash bin mein rehti hain."
          },
          {
            en: "Tap this highlighted trash bin button right here.",
            ur: "اس نمایاں کچرے کے ڈبے والے بٹن پر ٹیپ کریں۔",
            "roman-ur": "Highlighted trash bin button dabayein."
          }
        ],
        wrongTapFeedback: {
          en: "Tap the trash bin button next to the photo.",
          ur: "تصویر کے ساتھ والے کچرے کے ڈبے پر ٹیپ کریں۔",
          "roman-ur": "Photo ke sath trash button dabayein."
        },
        correctTapFeedback: {
          en: "Photo deleted from album! Notice the notice: it is safely in 'Recently Deleted'.",
          ur: "تصویر البم سے ہٹ گئی! مگر یہ 'Recently Deleted' کوڑے دان میں محفوظ ہے۔",
          "roman-ur": "Photo album se hat gayi! Magar 'Recently Deleted' mein safe hai."
        },
        whatHappensExplanation: {
          en: "Deleting a photo does NOT destroy it instantly. It moves to a temporary safety bin.",
          ur: "ڈیلیٹ کرنے سے تصویر فوراً ضائع نہیں ہوتی بلکہ عارضی کوڑے دان میں محفوظ رہتی ہے۔",
          "roman-ur": "Delete karne se photo hamesha ke liye khatam nahi hoti, safety bin mein jaati hai."
        }
      },
      {
        stepIndex: 1,
        instruction: {
          en: "Open the 'Recently Deleted' trash folder to find your photo.",
          ur: "اپنی تصویر تلاش کرنے کے لیے 'Recently Deleted' کوڑے دان کے فولڈر پر ٹیپ کریں۔",
          "roman-ur": "'Recently Deleted' trash folder par tap karke apni photo dekhein."
        },
        targetControlId: "recently-deleted-btn",
        hints: [
          {
            en: "Look for the button labeled 'Recently Deleted (Trash)' in the gallery tabs.",
            ur: "گیلری میں 'Recently Deleted (Trash)' والا بٹن دیکھیں۔",
            "roman-ur": "'Recently Deleted' tab par tap karein."
          },
          {
            en: "This is your safety net where deleted files wait before any permanent removal.",
            ur: "یہ آپ کا حفاظتی جال ہے جہاں ڈیلیٹ کی گئی فائلیں موجود رہتی ہیں۔",
            "roman-ur": "Yeh safety folder hai jahan deleted photos rehti hain."
          },
          {
            en: "Tap this highlighted 'Recently Deleted' folder.",
            ur: "اس نمایاں 'Recently Deleted' فولڈر پر ٹیپ کریں۔",
            "roman-ur": "Highlighted 'Recently Deleted' folder dabayein."
          }
        ],
        wrongTapFeedback: {
          en: "Tap the 'Recently Deleted' folder button.",
          ur: "'Recently Deleted' والے فولڈر پر ٹیپ کریں۔",
          "roman-ur": "'Recently Deleted' folder dabayein."
        },
        correctTapFeedback: {
          en: "There it is! Your photo is intact and waiting safely in the trash bin.",
          ur: "دیکھیں! آپ کی تصویر بالکل محفوظ حالت میں کوڑے دان میں موجود ہے۔",
          "roman-ur": "Dekhein! Aap ki photo safe حالت mein mojood hai."
        },
        whatHappensExplanation: {
          en: "This folder keeps all deleted photos for 30 days so you can always change your mind.",
          ur: "یہ فولڈر 30 دن تک تصویریں سنبھال کر رکھتا ہے تاکہ آپ جب چاہیں واپس لا سکیں۔",
          "roman-ur": "Yeh folder 30 days tak photos rakhta hai taake aap wapis la sakein."
        }
      },
      {
        stepIndex: 2,
        instruction: {
          en: "Tap 'Restore Photo' to return it safely back to your main album.",
          ur: "تصویر کو اپنے البم میں واپس لانے کے لیے 'Restore Photo' پر ٹیپ کریں۔",
          "roman-ur": "Photo ko album mein wapis lane ke liye 'Restore Photo' par tap karein."
        },
        targetControlId: "restore-photo-btn",
        hints: [
          {
            en: "Look for the green 'Restore Photo' button.",
            ur: "سبز رنگ کا 'Restore Photo' بٹن دیکھیں۔",
            "roman-ur": "Green 'Restore Photo' button dekhein."
          },
          {
            en: "Tapping restore brings the photo back as if it was never deleted.",
            ur: "ریسٹور دبانے سے تصویر ایسے واپس آ جاتی ہے جیسے کبھی ڈیلیٹ ہوئی ہی نہ ہو۔",
            "roman-ur": "Restore karne se photo bilkul pehle jaisi wapis aa jaati hai."
          },
          {
            en: "Tap this highlighted 'Restore Photo' button.",
            ur: "اس نمایاں 'Restore Photo' بٹن پر ٹیپ کریں۔",
            "roman-ur": "Highlighted 'Restore Photo' button dabayein."
          }
        ],
        wrongTapFeedback: {
          en: "Tap the green 'Restore Photo' button.",
          ur: "سبز 'Restore Photo' بٹن پر ٹیپ کریں۔",
          "roman-ur": "Green 'Restore Photo' button dabayein."
        },
        correctTapFeedback: {
          en: "Success! The photo is safely restored to your main album. You can never break anything!",
          ur: "کامیابی! تصویر واپس آپ کی مین گیلری میں آ گئی۔ آپ کا کچھ ضائع نہیں ہو سکتا!",
          "roman-ur": "Kamiyabi! Photo wapis album mein aa gayi. Kuch zaya nahi ho sakta!"
        },
        whatHappensExplanation: {
          en: "Restoring puts the item back in its original album without any quality loss.",
          ur: "ریسٹور کرنے سے تصویر بغیر کسی نقصان کے اپنے اصل البم میں واپس آ جاتی ہے۔",
          "roman-ur": "Restore karne se photo bina kisi loss ke wapis aa jaati hai."
        }
      }
    ],

    independentSteps: [
      {
        stepIndex: 0,
        instruction: {
          en: "Delete the accidental duplicate photo by tapping its trash icon.",
          ur: "کچرے کے ڈبے پر ٹیپ کر کے فالتو تصویر ڈیلیٹ کریں۔",
          "roman-ur": "Trash icon par tap karke duplicate photo delete karein."
        },
        targetControlId: "photo-trash-btn",
        hints: [{ en: "Tap the trash can icon.", ur: "کچرے کے ڈبے پر ٹیپ کریں۔", "roman-ur": "Trash can par tap karein." }],
        wrongTapFeedback: { en: "Tap the trash icon.", ur: "کچرے کے ڈبے پر ٹیپ کریں۔", "roman-ur": "Trash icon dabayein." },
        correctTapFeedback: { en: "Photo moved to trash bin.", ur: "تصویر کوڑے دان میں چلی گئی۔", "roman-ur": "Photo trash mein chali gayi." },
        whatHappensExplanation: { en: "Moves item to trash.", ur: "کوڑے دان میں منتقل کرتا ہے۔", "roman-ur": "Trash mein bhejta hai." }
      },
      {
        stepIndex: 1,
        instruction: {
          en: "Open 'Recently Deleted' to verify where it went.",
          ur: "'Recently Deleted' کھول کر دیکھیں کہ وہ کہاں گئی۔",
          "roman-ur": "'Recently Deleted' khol kar check karein."
        },
        targetControlId: "recently-deleted-btn",
        hints: [{ en: "Tap the Recently Deleted tab.", ur: "Recently Deleted پر ٹیپ کریں۔", "roman-ur": "Recently Deleted tap karein." }],
        wrongTapFeedback: { en: "Tap Recently Deleted.", ur: "Recently Deleted پر ٹیپ کریں۔", "roman-ur": "Recently Deleted dabayein." },
        correctTapFeedback: { en: "Photo found in trash.", ur: "تصویر کوڑے دان میں موجود ہے۔", "roman-ur": "Photo trash mein mil gayi." },
        whatHappensExplanation: { en: "Shows trash contents.", ur: "کوڑے دان دکھاتا ہے۔", "roman-ur": "Trash contents dikhata hai." }
      },
      {
        stepIndex: 2,
        instruction: {
          en: "Restore the photo back to your gallery.",
          ur: "تصویر کو بحال کر کے گیلری میں واپس لائیں۔",
          "roman-ur": "Photo ko gallery mein restore karein."
        },
        targetControlId: "restore-photo-btn",
        hints: [{ en: "Tap Restore Photo.", ur: "Restore Photo پر ٹیپ کریں۔", "roman-ur": "Restore Photo tap karein." }],
        wrongTapFeedback: { en: "Tap Restore.", ur: "Restore پر ٹیپ کریں۔", "roman-ur": "Restore dabayein." },
        correctTapFeedback: { en: "You conquered your fear of deleting! Fantastic work!", ur: "آپ نے ڈیلیٹ کا خوف دور کر لیا! زبردست کامیابی!", "roman-ur": "Aap ne deletion ka darr door kar liya!" },
        whatHappensExplanation: { en: "Restores the item safely.", ur: "محفوظ بحال کرتا ہے۔", "roman-ur": "Safely restore karta hai." }
      }
    ]
  }
};
