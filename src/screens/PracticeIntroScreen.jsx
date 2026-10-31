import React from 'react';
import PracticeNotice from '../components/PracticeNotice';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import AudioButton from '../components/AudioButton';
import { translations } from '../data/translations';
import styles from './PracticeIntroScreen.module.css';

export default function PracticeIntroScreen({
  onSelectMode,
  onBack,
  language = 'en',
  onHear,
  isSpeaking = false
}) {
  const t = translations[language]?.practiceIntro || translations.en.practiceIntro;

  const handleHear = () => {
    const fullText = `${t.heading}. ${t.subheading}`;
    onHear(fullText, 'practice_intro');
  };

  return (
    <div className={`screen-fade ${styles.container}`}>
      <PracticeNotice message="Zero Risk: This is an isolated practice screen. Nothing will be sent to anyone." />

      <div className={styles.card}>
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
              marginBottom: 8,
              alignSelf: 'flex-start'
            }}
          >
            ← {language === 'ur' ? 'تجویز پر واپس جائیں' : 'Back to Recommendation'}
          </button>
        )}
        <div className={styles.phoneIconArea}>
          <svg viewBox="0 0 48 48" fill="none" className={styles.phoneSvg}>
            <rect x="12" y="4" width="24" height="40" rx="4" stroke="var(--color-primary)" strokeWidth="3" />
            <circle cx="24" cy="38" r="2" fill="var(--color-primary)" />
            <line x1="20" y1="8" x2="28" y2="8" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className={styles.heading}>{t.heading}</h1>
        <p className={styles.subheading}>{t.subheading}</p>

        {language !== 'roman-ur' && (
          <div className={styles.audioRow}>
            <AudioButton
              label={t.hearIntro}
              onClick={handleHear}
              isPlaying={isSpeaking}
            />
          </div>
        )}

        <div className={styles.modesGrid}>
          {/* Option A: Try with me (Guided Practice) */}
          <div className={styles.modeCard}>
            <div className={styles.modeHeader}>
              <span className={styles.modeIcon}>🤝</span>
              <div>
                <h3 className={styles.modeTitle}>Try with Me</h3>
                <span className={styles.recommendedBadge}>(Recommended)</span>
              </div>
            </div>
            <p className={styles.modeDesc}>
              Tap the buttons yourself with gentle highlighted hints whenever you need them.
            </p>
            <PrimaryButton
              onClick={() => onSelectMode('guided')}
              className={styles.modeActionBtn}
            >
              Start Guided Practice →
            </PrimaryButton>
          </div>

          {/* Option B: Show me first (Demonstration) */}
          <div className={styles.modeCard}>
            <div className={styles.modeHeader}>
              <span className={styles.modeIcon}>👀</span>
              <div>
                <h3 className={styles.modeTitle}>Show Me First</h3>
              </div>
            </div>
            <p className={styles.modeDesc}>
              Watch a quick step-by-step demonstration of the actions before trying them yourself.
            </p>
            <SecondaryButton
              onClick={() => onSelectMode('demonstrate')}
              className={styles.modeActionBtn}
            >
              Watch Demonstration
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
