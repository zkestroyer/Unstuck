import React from 'react';
import AccessibilityToolbar from './AccessibilityToolbar';
import styles from './AppHeader.module.css';

export default function AppHeader({
  currentScreen,
  onNavigate,
  onBack,
  canGoBack = false,
  language = 'en',
  onLanguageChange,
  onReset,
  accessibility,
  onChangeAccessibility
}) {
  const isUrdu = language === 'ur';
  const isRoman = language === 'roman-ur';

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <button
          type="button"
          className={styles.brand}
          onClick={() => onNavigate('welcome')}
          aria-label="UNSTUCK Home"
        >
          <div className={styles.logoBadge}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.logoIcon}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div className={styles.brandText}>
            <span className={styles.title}>UNSTUCK</span>
            <span className={styles.tagline}>
              {isUrdu ? 'بے خوف ہو کر سیکھیں، اپنی رفتار سے چلیں۔' : isRoman ? 'Explore safely. Learn at your pace.' : 'Explore safely. Learn at your pace.'}
            </span>
          </div>
        </button>

        {/* Controls Row: Accessibility & Language Switcher */}
        <div className={styles.controlsRow}>
          {accessibility && onChangeAccessibility && (
            <AccessibilityToolbar
              accessibility={accessibility}
              onChangeAccessibility={onChangeAccessibility}
              language={language}
            />
          )}

          <div className={styles.langSelector} role="group" aria-label="Choose language">
            <button
              type="button"
              className={`${styles.langBtn} ${language === 'en' ? styles.langActive : ''}`}
              onClick={() => onLanguageChange('en')}
            >
              English
            </button>
            <button
              type="button"
              className={`${styles.langBtn} ${language === 'ur' ? styles.langActive : ''}`}
              onClick={() => onLanguageChange('ur')}
            >
              اردو
            </button>
            <button
              type="button"
              className={`${styles.langBtn} ${language === 'roman-ur' ? styles.langActive : ''}`}
              onClick={() => onLanguageChange('roman-ur')}
            >
              Roman Urdu
            </button>
          </div>
        </div>
      </div>

      {/* Shallow Navigation */}
      <nav className={styles.navBar} aria-label="Main navigation">
        <div className={styles.navLinks}>
          {canGoBack && (
            <button
              type="button"
              className={styles.headerBackBtn}
              onClick={onBack}
              aria-label={isUrdu ? 'پچھلی اسکرین پر واپس جائیں' : 'Go back to previous screen'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>{isUrdu ? 'پیچھے' : isRoman ? 'Peechay' : 'Back'}</span>
            </button>
          )}

          <button
            type="button"
            className={`${styles.navItem} ${currentScreen === 'welcome' || currentScreen === 'fearMap' ? styles.navActive : ''}`}
            onClick={() => onNavigate('welcome')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>{isUrdu ? 'ہوم' : 'Home'}</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${currentScreen === 'confidenceMap' ? styles.navActive : ''}`}
            onClick={() => onNavigate('confidenceMap')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            <span>{isUrdu ? 'اعتماد کا نقشہ' : isRoman ? 'Confidence Map' : 'Confidence Map'}</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${currentScreen === 'exploration' ? styles.navActive : ''}`}
            onClick={() => onNavigate('exploration')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            <span>{isUrdu ? 'کھوج (What Happens?)' : isRoman ? 'What Happens?' : 'What Happens If?'}</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${currentScreen === 'library' ? styles.navActive : ''}`}
            onClick={() => onNavigate('library')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span>{isUrdu ? 'تمام مشقیں' : isRoman ? 'Tamam Skills' : 'Skill Library'}</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${currentScreen === 'summary' ? styles.navActive : ''}`}
            onClick={() => onNavigate('summary')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>{isUrdu ? 'میری مشق' : isRoman ? 'Meri Practice' : 'My Practice'}</span>
          </button>
        </div>

        <button
          type="button"
          className={styles.resetBtn}
          onClick={() => {
            if (window.confirm(isUrdu ? "کیا آپ تمام مشقوں کا ریکارڈ صاف کر کے دوبارہ شروع کرنا چاہتے ہیں؟" : "Do you want to reset your practice history and start fresh?")) {
              onReset();
            }
          }}
          title="Reset practice session"
        >
          {isUrdu ? 'ری سیٹ' : 'Reset Progress'}
        </button>
      </nav>
    </header>
  );
}
