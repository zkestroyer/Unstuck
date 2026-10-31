import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import AudioButton from './AudioButton';
import styles from './RealWorldTransferCard.module.css';

export default function RealWorldTransferCard({
  taskId = 'send-picture',
  language = 'en',
  onConfirmTransfer,
  onHear,
  isSpeaking = false
}) {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const isUrdu = language === 'ur';
  const isRoman = language === 'roman-ur';

  const TRANSFER_CONTENT = {
    'send-picture': {
      title: isUrdu
        ? "جب آپ اپنا اصل فون استعمال کریں..."
        : isRoman
        ? "Jab aap apna asli phone use karein..."
        : "When you use your real phone...",
      tips: [
        isUrdu
          ? "جب آپ اپنی اصل میسجنگ ایپ (جیسے واٹس ایپ) استعمال کریں، تو میسج باکس کے قریب پیپر کلپ یا پلس کا نشان تلاش کریں۔"
          : isRoman
          ? "Asli messaging app (jaise WhatsApp) mein message box ke qareeb paperclip ya plus icon dekhein."
          : "When using your actual messaging app, look for the attachment or gallery button near the message box.",
        isUrdu
          ? "بھیجنے کا بٹن دبانے سے پہلے، ہمیشہ اسکرین کے سب سے اوپر رابطہ کا نام ضرور دیکھ لیں تاکہ تصدیق ہو سکے کہ آپ صحیح شخص کو بھیج رہے ہیں۔"
          : isRoman
          ? "Send karne se pehle chat ke top par recipient ka naam lazmi check karein."
          : "Before sending, check the person's name at the top of the conversation."
      ]
    },
    'safe-delete': {
      title: isUrdu
        ? "جب آپ اپنا اصل فون استعمال کریں..."
        : isRoman
        ? "Jab aap apna asli phone use karein..."
        : "When you use your real phone...",
      tips: [
        isUrdu
          ? "مختلف فونز میں گیلری تھوڑی مختلف ہو سکتی ہے۔ 'Recently Deleted'، 'Trash' یا 'Bin' کا نام دیکھیں۔"
          : isRoman
          ? "Mukhtalif phones mein gallery mukhtalif ho sakti hai. 'Recently Deleted', 'Trash' ya 'Bin' check karein."
          : "Different phones have different gallery apps. Look for Recently Deleted, Trash, or Bin.",
        isUrdu
          ? "ڈیلیٹ کی گئی تصاویر وہاں 30 دن تک بغیر کسی نقصان کے محفوظ رہتی ہیں، لہذا غلطی سے کچھ بھی ضائع نہیں ہوگا۔"
          : isRoman
          ? "Deleted photos wahan 30 din tak safe rehti hain. Ghalati se kuch zaya nahi hota."
          : "Deleted items wait safely in your trash bin for 30 days before permanent removal."
      ]
    },
    'explore-maps': {
      title: isUrdu
        ? "جب آپ اپنا اصل فون استعمال کریں..."
        : isRoman
        ? "Jab aap apna asli phone use karein..."
        : "When you use your real phone...",
      tips: [
        isUrdu
          ? "گوگل میپس پر اپنی لائیو لوکیشن شیئر کرنے سے پہلے دیکھیں کہ کون اسے دیکھ سکتا ہے اور شیئرنگ کتنی دیر چلے گی۔"
          : isRoman
          ? "Maps par live location share karne se pehle check karein ke kaun dekh sakta hai aur duration kitni hai."
          : "Before sharing your location, check who can see it and how long sharing will remain active.",
        isUrdu
          ? "کام ختم ہونے پر یا گھر پہنچنے پر آپ جب چاہیں 'Stop Sharing' دبا کر شیئرنگ فوراً روک سکتے ہیں۔"
          : isRoman
          ? "Ghar pohnch kar aap jab chahein 'Stop Sharing' par tap karke location rok sakte hain."
          : "You can stop sharing your location at any moment by tapping 'Stop sharing'."
      ]
    },
    'check-message': {
      title: isUrdu
        ? "جب آپ کو حقیقی میسج آئے..."
        : isRoman
        ? "Jab aap ko real message aaye..."
        : "When you receive a real message...",
      tips: [
        isUrdu
          ? "اپنا ون ٹائم پاس ورڈ (OTP) یا پن کوڈ کبھی کسی کو نہ دیں، چاہے میسج بھیجنے والا آپ کا بینک بن کر بات کرے۔"
          : isRoman
          ? "Apna OTP code ya PIN kabhi kisi ko na dein, chahe message bank ke naam se hi kyun na ho."
          : "Never share your OTP or password with anyone, even if a message claims to come from your bank.",
        isUrdu
          ? "اگر کوئی ہنگامی صورتحال پیدا کر کے ڈرائے، تو میسج کا جواب دینے کی بجائے کمپنی کے آفیشل ہیلپ لائن نمبر پر خود فون کریں۔"
          : isRoman
          ? "Emergency alerts par ghabra kar reply na karein, balkay official helpline par rabta karein."
          : "Whenever an unexpected message creates urgency, verify directly through official channels."
      ]
    }
  };

  const content = TRANSFER_CONTENT[taskId] || TRANSFER_CONTENT['send-picture'];

  const notice = isUrdu
    ? "آپ کا فون تھوڑا مختلف لگ سکتا ہے۔ یہ بالکل معمول کی بات ہے۔ سب سے اہم بات یہ سمجھنا ہے کہ بٹن اور ایکشن کیا کرتے ہیں۔"
    : isRoman
    ? "Aap ka phone thora mukhtalif lag sakta hai. Yeh normal hai. Asal baat action ko samajhna hai."
    : "Your phone may look slightly different. That's completely normal. The important thing is understanding what the action does.";

  const question = isUrdu
    ? "کیا آپ اپنے اصلی فون پر یہ آزمانے میں سہولت محسوس کریں گے؟"
    : isRoman
    ? "Kya aap apne asli phone par yeh try karne mein comfortable feel karenge?"
    : "Would you feel comfortable trying this on your own phone?";

  const choices = [
    {
      id: "ready",
      label: isUrdu ? "ہاں، میں اپنے فون پر آزماؤں گا" : isRoman ? "Haan, main phone par try karunga" : "Yes, I would like to try on my phone."
    },
    {
      id: "practice-more",
      label: isUrdu ? "میں یہاں ایک بار پھر مشق کرنا چاہوں گا" : isRoman ? "Main dobara practice karna chahoonga" : "I'd like to practise once more here."
    },
    {
      id: "need-guidance",
      label: isUrdu ? "مجھے رہنمائی اور مدد پسند ہے" : isRoman ? "Mujhe guidance pasand hai" : "I'd prefer someone to guide me."
    }
  ];

  const handleHear = () => {
    const textToSpeak = `${content.title}. ${content.tips.join('. ')}. ${notice}. ${question}`;
    onHear(textToSpeak, `transfer_${taskId}`);
  };

  const handleContinue = () => {
    onConfirmTransfer(selectedChoice || 'ready');
  };

  return (
    <div className={styles.card}>
      <div className={styles.badgeRow}>
        <span className={styles.badge}>📱 {isUrdu ? 'حقیقی دنیا میں مہارت' : 'REAL-WORLD SKILL TRANSFER'}</span>
        {language !== 'roman-ur' && (
          <AudioButton
            label={isUrdu ? 'سنیں' : 'Listen'}
            onClick={handleHear}
            isPlaying={isSpeaking}
          />
        )}
      </div>

      <h2 className={styles.title}>{content.title}</h2>

      <div className={styles.tipsList}>
        {content.tips.map((tip, idx) => (
          <div key={idx} className={styles.tipItem}>
            <span className={styles.tipIcon} aria-hidden="true">💡</span>
            <p className={styles.tipText}>{tip}</p>
          </div>
        ))}
      </div>

      <div className={styles.differenceNotice}>
        <span className={styles.noticeIcon} aria-hidden="true">ℹ️</span>
        <p className={styles.noticeText}>{notice}</p>
      </div>

      {/* Transfer Confirmation Question */}
      <div className={styles.questionSection}>
        <h3 className={styles.questionText}>{question}</h3>

        <div className={styles.choicesList} role="radiogroup" aria-label={question}>
          {choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className={`${styles.choiceBtn} ${selectedChoice === choice.id ? styles.choiceSelected : ''}`}
              onClick={() => setSelectedChoice(choice.id)}
              role="radio"
              aria-checked={selectedChoice === choice.id}
            >
              <span className={styles.radioDot}>
                {selectedChoice === choice.id && <span className={styles.radioDotInner} />}
              </span>
              <span>{choice.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.actionRow}>
          <PrimaryButton onClick={handleContinue} className={styles.continueBtn}>
            {isUrdu ? 'آگے بڑھیں' : isRoman ? 'Aagay barhein' : 'Continue to Summary'} →
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
