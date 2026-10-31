import React from 'react';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import AudioButton from '../components/AudioButton';
import PracticeNotice from '../components/PracticeNotice';
import styles from './LibraryScreen.module.css';

export default function LibraryScreen({
  onSelectTask,
  onBack,
  language = 'en',
  onHear,
  isSpeaking = false,
  completedTaskIds = [],
  recommendedTaskId = 'send-picture'
}) {
  const isUrdu = language === 'ur';
  const isRoman = language === 'roman-ur';

  const headingText = isUrdu
    ? "تمام فیچرز اور مہارتوں کا نقشہ"
    : isRoman
    ? "Tamam Features aur Skill Map"
    : "Skill Map & Practice Library";

  const subText = isUrdu
    ? "ڈیجیٹل مہارتوں کا مکمل کیٹلاگ۔ اپنی مرضی سے کوئی بھی سرگرمی منتخب کریں اور اطمینان سے مشق کریں۔"
    : isRoman
    ? "Apni marzi se koi bhi digital skill select karein aur baghair kisi khauf ke practice karein."
    : "Browse and choose any digital skill to practise freely at your pace. All 4 interactive sandbox modules are available.";

  const handleHear = () => {
    onHear(`${headingText}. ${subText}`, 'library_intro');
  };

  const TOPICS = [
    {
      id: "explore-maps",
      image: "/images/cards/module_maps.svg",
      category: isUrdu ? "نقشہ اور لوکیشن" : "Maps & Navigation",
      title: isUrdu ? "نقشے پر جگہ تلاش کریں اور لوکیشن شیئر کریں" : "Find Places & Share Location on Maps",
      desc: isUrdu
        ? "گوگل میپس پر منزل تلاش کریں اور فیملی کے ساتھ اپنی محفوظ 15 منٹ لائیو لوکیشن بھیجنے کی مشق کریں۔"
        : "Practise searching a destination on Google Maps and sharing a secure 15-minute live GPS link with trusted family.",
      type: "practice"
    },
    {
      id: "send-picture",
      image: "/images/cards/module_messaging.svg",
      category: isUrdu ? "پیغامات اور میڈیا" : "Messaging & Photos",
      title: isUrdu ? "پیغام میں تصویر منسلک کر کے بھیجیں" : "Send a Picture in a Message",
      desc: isUrdu
        ? "میسج باکس میں پیپر کلپ کا نشان ڈھونڈیں، گیلری سے تصویر منتخب کریں اور بھیجنے کی مکمل مشق کریں۔"
        : "Learn to locate the paperclip attachment icon, open your photo tray, and send images in a safe simulated chat.",
      type: "practice"
    },
    {
      id: "safe-delete",
      image: "/images/cards/module_safe_delete.svg",
      category: isUrdu ? "محفوظ ڈیلیشن" : "Storage & Trash Recovery",
      title: isUrdu ? "تصویر ڈیلیٹ کریں اور کوڑے دان سے بحال کریں" : "Safely Delete & Restore from Trash",
      desc: isUrdu
        ? "ڈیلیٹ کا خوف دور کریں۔ جانیں کہ کوڑے دان فائلوں کو 30 دن تک کیسے محفوظ رکھتا ہے اور ایک کلک سے واپس لائیں۔"
        : "Overcome fear of losing files. Discover how Recently Deleted holds photos safely for 30 days and restore them anytime.",
      type: "practice"
    },
    {
      id: "check-message",
      image: "/images/cards/module_safety_scam.svg",
      category: isUrdu ? "سائبر سیکیورٹی" : "Scam & OTP Defense",
      title: isUrdu ? "مشکوک پیغامات اور جعلی او ٹی پی کوڈز کی پہچان" : "Check Suspicious Messages & OTP Scams",
      desc: isUrdu
        ? "جعلی بینک پیغامات اور انجان لنکس کی پہچان کریں۔ جانیں کہ اپنا ون ٹائم پاس ورڈ کبھی کسی کو کیوں نہیں دینا چاہیے۔"
        : "Learn to identify urgent phishing texts and recognize why you must never share one-time security codes with strangers.",
      type: "safety"
    }
  ];

  return (
    <div className={`screen-fade ${styles.container}`}>
      <PracticeNotice message="Full Practice Catalog: Explore all features freely. All exercises run in 100% isolated sandboxes." />

      <div className={styles.headerArea}>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              marginBottom: 12
            }}
          >
            ← {isUrdu ? 'واپس جائیں' : 'Back'}
          </button>
        )}

        <div>
          <span className={styles.badge}>🌿 {isUrdu ? 'تمام فیچرز' : 'ALL FEATURES & SKILL MAP'}</span>
        </div>
        <h1 className={styles.heading}>{headingText}</h1>
        <p className={styles.subheading}>{subText}</p>

        {!isRoman && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
            <AudioButton
              label={isUrdu ? 'لائبریری کی تفصیل سنیں' : 'Hear Library Overview'}
              onClick={handleHear}
              isPlaying={isSpeaking}
            />
          </div>
        )}
      </div>

      <div className={styles.libraryGrid}>
        {TOPICS.map((topic) => {
          const isCompleted = completedTaskIds.includes(topic.id);
          const isRecommended = recommendedTaskId === topic.id;

          return (
            <div key={topic.id} className={styles.libraryCard}>
              {/* Card Banner Image */}
              <div className={styles.cardBannerWrap}>
                <img
                  src={topic.image}
                  alt=""
                  className={styles.cardBanner}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={styles.cardCategory}>{topic.category}</span>
                {isCompleted ? (
                  <span className={`${styles.statusPill} ${styles.statusCompleted}`}>
                    ✓ {isUrdu ? 'مکمل شدہ' : 'Practised'}
                  </span>
                ) : isRecommended ? (
                  <span className={`${styles.statusPill} ${styles.statusRecommended}`}>
                    ★ {isUrdu ? 'تجویز کردہ' : 'Recommended'}
                  </span>
                ) : (
                  <span className={`${styles.statusPill} ${styles.statusReady}`}>
                    ● {isUrdu ? 'تیار ہے' : 'Ready'}
                  </span>
                )}
              </div>

              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{topic.title}</h3>
              </div>

              <p className={styles.cardDesc}>{topic.desc}</p>

              <div className={styles.cardFooter}>
                {topic.type === 'safety' ? (
                  <PrimaryButton
                    onClick={() => onSelectTask(topic.id, 'safety')}
                    style={{ fontSize: 15, padding: '12px 20px', width: '100%' }}
                  >
                    {isUrdu ? 'سیکیورٹی مشق شروع کریں →' : 'Start Safety Exercise →'}
                  </PrimaryButton>
                ) : (
                  <div className={styles.buttonGroup}>
                    <PrimaryButton
                      onClick={() => onSelectTask(topic.id, 'guided')}
                      style={{ fontSize: 14, padding: '10px 16px', flex: 1 }}
                    >
                      {isUrdu ? 'رہنمائی والی مشق →' : 'Guided Practice →'}
                    </PrimaryButton>

                    <SecondaryButton
                      onClick={() => onSelectTask(topic.id, 'independent')}
                      style={{ fontSize: 14, padding: '10px 14px' }}
                    >
                      {isUrdu ? 'خود کوشش کریں' : 'Try on my own'}
                    </SecondaryButton>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
