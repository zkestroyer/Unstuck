import React from 'react';
import PrimaryButton from '../components/PrimaryButton';
import AudioButton from '../components/AudioButton';
import { translations } from '../data/translations';
import styles from './WelcomeScreen.module.css';

export default function WelcomeScreen({ onStart, language = 'en', onHear, isSpeaking = false }) {
  const t = translations[language]?.welcome || translations.en.welcome;

  const handleHear = () => {
    const fullText = `${t.heading}. ${t.subheading}. ${t.reassurance}`;
    onHear(fullText, 'welcome');
  };

  return (
    <div className={`screen-fade ${styles.container}`}>
      <div className={styles.heroSection}>
        <div className={styles.iconEmblem}>
          <svg viewBox="0 0 64 64" fill="none" className={styles.emblemSvg}>
            <rect width="64" height="64" rx="20" fill="var(--color-primary-light)" />
            <path d="M32 12C20.95 12 12 20.95 12 32C12 43.05 20.95 52 32 52C43.05 52 52 43.05 52 32C52 20.95 43.05 12 32 12Z" stroke="var(--color-primary)" strokeWidth="3" />
            <path d="M24 32L30 38L42 26" stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className={styles.heading}>{t.heading}</h1>
        <p className={styles.subheading}>{t.subheading}</p>

        {language !== 'roman-ur' && (
          <div className={styles.audioContainer}>
            <AudioButton
              label={t.hearMessage}
              onClick={handleHear}
              isPlaying={isSpeaking}
            />
          </div>
        )}
      </div>

      <div className={styles.card}>
        <div className={styles.pillarsGrid}>
          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>🛡️</span>
            <div>
              <h3>100% Safe Sandbox</h3>
              <p>Nothing touches your real phone, contacts, bank, or apps.</p>
            </div>
          </div>

          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>🌱</span>
            <div>
              <h3>No Rush, No Scores</h3>
              <p>Take as long as you need. Mistakes are welcomed as part of learning.</p>
            </div>
          </div>

          <div className={styles.pillar}>
            <span className={styles.pillarIcon}>🎧</span>
            <div>
              <h3>Spoken Instructions</h3>
              <p>Listen to instructions in plain words if you prefer not to read.</p>
            </div>
          </div>
        </div>

        <div className={styles.actionRow}>
          <PrimaryButton onClick={onStart} className={styles.startBtn}>
            {t.startBtn} →
          </PrimaryButton>
          <span className={styles.reassurance}>{t.reassurance}</span>
        </div>
      </div>
    </div>
  );
}
