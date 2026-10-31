import React from 'react';
import styles from './AppHeader.module.css';

export default function AppHeader({
  currentScreen,
  onNavigate,
  onBack,
  canGoBack = false,
  language = 'en',
  onLanguageChange,
  onReset
}) {
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
            <span className={styles.tagline}>Explore safely. Learn at your pace.</span>
          </div>
        </button>

        {/* Language Switcher */}
        <div className={styles.controlsRow}>
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
              aria-label={language === 'ur' ? 'پچھلی اسکرین پر واپس جائیں' : 'Go back to previous screen'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>{language === 'ur' ? 'پیچھے' : language === 'roman-ur' ? 'Peechay' : 'Back'}</span>
            </button>
          )}

          <button
            type="button"
            className={`${styles.navItem} ${currentScreen === 'welcome' || currentScreen === 'fearMap' ? styles.navActive : ''}`}
            onClick={() => onNavigate('welcome')}
          >
            {language === 'ur' ? 'ہوم' : 'Home'}
          </button>
          <button
            type="button"
            className={`${styles.navItem} ${currentScreen === 'library' ? styles.navActive : ''}`}
            onClick={() => onNavigate('library')}
          >
            {language === 'ur' ? 'مہارتوں کا نقشہ (تمام فیچرز)' : 'Skill Map & All Features'}
          </button>
          <button
            type="button"
            className={`${styles.navItem} ${currentScreen === 'summary' ? styles.navActive : ''}`}
            onClick={() => onNavigate('summary')}
          >
            {language === 'ur' ? 'میری مشق' : 'My Practice'}
          </button>
        </div>

        <button
          type="button"
          className={styles.resetBtn}
          onClick={() => {
            if (window.confirm("Do you want to reset your practice history and start fresh?")) {
              onReset();
            }
          }}
          title="Reset practice session"
        >
          Reset Progress
        </button>
      </nav>
    </header>
  );
}
