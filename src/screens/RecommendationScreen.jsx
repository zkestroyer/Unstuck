import React from 'react';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import AudioButton from '../components/AudioButton';
import { translations } from '../data/translations';
import { tasks } from '../data/tasks';
import { scenarios } from '../data/scenarios';
import styles from './RecommendationScreen.module.css';

export default function RecommendationScreen({
  recommendedTaskId,
  recommendationReason,
  onStartPractice,
  onChooseOther,
  onBack,
  language = 'en',
  onHear,
  isSpeaking = false
}) {
  const t = translations[language]?.recommendation || translations.en.recommendation;
  const isSafetyTask = recommendedTaskId === 'check-message';
  
  const taskTitle = isSafetyTask
    ? (language === 'ur' ? 'مشکوک پیغامات کی جانچ' : 'Check a Suspicious Message')
    : (tasks[recommendedTaskId]?.title[language] || tasks[recommendedTaskId]?.title.en || 'Send a Picture in a Message');

  const taskDescription = isSafetyTask
    ? (language === 'ur' ? 'مشکوک پیغامات اور جعلی کوڈز کی پہچان سیکھیں۔' : 'Learn how to recognize suspicious requests for one-time passwords.')
    : (tasks[recommendedTaskId]?.description[language] || tasks[recommendedTaskId]?.description.en);

  const reasonText = typeof recommendationReason === 'object'
    ? (recommendationReason[language] || recommendationReason.en)
    : recommendationReason;

  const handleHear = () => {
    const fullText = `${t.heading}: ${taskTitle}. ${t.reasonLabel} ${reasonText}. ${t.safetyReassurance}`;
    onHear(fullText);
  };

  return (
    <div className={`screen-fade ${styles.container}`}>
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
              marginBottom: 12,
              padding: 0
            }}
          >
            ← {language === 'ur' ? 'خدشات کی فہرست پر واپس جائیں' : 'Back to Fear Map'}
          </button>
        )}
        <span className={styles.badge}>PERSONALIZED RECOMMENDATION</span>
        <h1 className={styles.heading}>{t.heading}</h1>
      </div>

      <div className={styles.recommendationCard}>
        <div className={styles.taskHero}>
          <div className={styles.taskIconArea}>
            {isSafetyTask ? (
              <span className={styles.iconLarge}>🛡️</span>
            ) : (
              <span className={styles.iconLarge}>📷</span>
            )}
          </div>
          <div>
            <h2 className={styles.taskTitle}>{taskTitle}</h2>
            <p className={styles.taskDescription}>{taskDescription}</p>
          </div>
        </div>

        {/* Transparent Reason linked to Fear Map */}
        <div className={styles.reasonBox}>
          <div className={styles.reasonHeader}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.lightbulbIcon}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <strong>{t.reasonLabel}</strong>
          </div>
          <p className={styles.reasonText}>{reasonText}</p>
        </div>

        {/* Safety Boundary */}
        <div className={styles.safetyBox}>
          <span className={styles.safetyIcon}>✓</span>
          <span>{t.safetyReassurance}</span>
        </div>

        {language !== 'roman-ur' && (
          <div className={styles.audioRow}>
            <AudioButton
              label={language === 'ur' ? 'وضاحت سنیں' : 'Hear explanation'}
              onClick={handleHear}
              isPlaying={isSpeaking}
            />
          </div>
        )}

        <div className={styles.actionButtons}>
          <PrimaryButton onClick={onStartPractice} className={styles.startBtn}>
            {t.startBtn} →
          </PrimaryButton>

          <SecondaryButton onClick={onChooseOther}>
            {t.chooseOtherBtn}
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
