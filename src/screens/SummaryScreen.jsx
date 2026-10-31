import React from 'react';
import ProgressCard from '../components/ProgressCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import AudioButton from '../components/AudioButton';
import { translations } from '../data/translations';
import { tasks } from '../data/tasks';
import styles from './SummaryScreen.module.css';

export default function SummaryScreen({
  attemptHistory = [],
  recommendedTaskId,
  recommendationReason,
  onTrySuggested,
  onPractiseAgain,
  onChangeConcerns,
  language = 'en',
  onHear,
  isSpeaking = false
}) {
  const t = translations[language]?.summary || translations.en.summary;

  const nextTaskTitle = recommendedTaskId === 'check-message'
    ? (language === 'ur' ? 'مشکوک پیغامات کی جانچ' : 'Check a Suspicious Message')
    : (tasks[recommendedTaskId]?.title[language] || tasks[recommendedTaskId]?.title.en || 'Send a Picture in a Message');

  const reasonText = typeof recommendationReason === 'object'
    ? (recommendationReason[language] || recommendationReason.en)
    : recommendationReason;

  const handleHear = () => {
    const summaryNarrative = `${t.heading}. You completed ${attemptHistory.length} practice exercises today. ${t.nextSuggestionHeader}: ${nextTaskTitle}. ${reasonText}`;
    onHear(summaryNarrative);
  };

  return (
    <div className={`screen-fade ${styles.container}`}>
      <div className={styles.headerArea}>
        <span className={styles.badge}>HONEST PROGRESS</span>
        <h1 className={styles.heading}>{t.heading}</h1>
        <p className={styles.subheading}>{t.subheading}</p>

        {language !== 'roman-ur' && (
          <div className={styles.audioRow}>
            <AudioButton
              label={language === 'ur' ? 'خلاصہ سنیں' : 'Hear summary'}
              onClick={handleHear}
              isPlaying={isSpeaking}
            />
          </div>
        )}
      </div>

      {/* Actual Attempt History Cards */}
      <div className={styles.historySection}>
        <h2 className={styles.sectionTitle}>{t.attemptLabel}</h2>
        {attemptHistory.length === 0 ? (
          <div className={styles.emptyState}>
            <p>You haven't completed any exercises yet. Start your first practice below!</p>
          </div>
        ) : (
          <div className={styles.historyList}>
            {attemptHistory.map((attempt, index) => {
              const title = attempt.taskId === 'check-message'
                ? 'Check a Suspicious Message'
                : (tasks[attempt.taskId]?.title[language] || tasks[attempt.taskId]?.title.en || 'Practice Task');

              return (
                <ProgressCard
                  key={index}
                  attempt={attempt}
                  taskTitle={title}
                  language={language}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Suggested Next Step Box */}
      <div className={styles.nextStepCard}>
        <div className={styles.nextStepHeader}>
          <span className={styles.compassIcon}>🧭</span>
          <div>
            <h3 className={styles.nextStepTitle}>{t.nextSuggestionHeader}</h3>
            <p className={styles.nextTaskName}>{nextTaskTitle}</p>
          </div>
        </div>

        <p className={styles.nextReasonText}>{reasonText}</p>

        <div className={styles.nextActions}>
          <PrimaryButton onClick={onTrySuggested} className={styles.tryNextBtn}>
            {t.trySuggestedBtn} →
          </PrimaryButton>

          <SecondaryButton onClick={onPractiseAgain}>
            {t.practiseAgainBtn}
          </SecondaryButton>

          <SecondaryButton onClick={onChangeConcerns}>
            {t.changeConcernsBtn}
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
