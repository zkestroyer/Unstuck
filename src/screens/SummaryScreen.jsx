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
  recommendedTaskId = 'send-picture',
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
    const summaryNarrative = `${t.heading}. ${t.subheading}. ${t.nextSuggestionHeader}: ${nextTaskTitle}.`;
    onHear(summaryNarrative, 'summary');
  };

  const getModuleIllustration = (id) => {
    switch (id) {
      case 'explore-maps':
        return '/images/cards/module_maps.svg';
      case 'safe-delete':
        return '/images/cards/module_safe_delete.svg';
      case 'check-message':
        return '/images/cards/module_safety_scam.svg';
      case 'send-picture':
      default:
        return '/images/cards/module_messaging.svg';
    }
  };

  return (
    <div className={`screen-fade ${styles.container}`}>
      {/* Header Area */}
      <div className={styles.headerArea}>
        <span className={styles.badge}>
          🌱 {language === 'ur' ? 'پرسکون مشق کا ریکارڈ' : 'SAFE PRACTICE JOURNAL'}
        </span>
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

      {/* Attempt History Section */}
      <div className={styles.historySection}>
        <h2 className={styles.sectionTitle}>
          {language === 'ur' ? 'آپ کی مکمل کردہ سرگرمیاں' : 'Your Learning Activities'}
        </h2>

        {attemptHistory.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIconCircle}>
              <span className={styles.emptyIcon}>🌱</span>
            </div>
            <div className={styles.emptyTextContent}>
              <h3 className={styles.emptyTitle}>
                {language === 'ur'
                  ? 'آپ کا سیکھنے کا سفر یہاں شروع ہوتا ہے!'
                  : 'Welcome to your practice journal!'}
              </h3>
              <p className={styles.emptyDesc}>
                {language === 'ur'
                  ? 'یہاں آپ کی ہر مشق بغیر کسی نمبر یا دباؤ کے محفوظ ہوگی۔ اپنی رفتار سے نیچے دی گئی سرگرمی شروع کریں۔'
                  : 'Whenever you try a practice, your gentle milestones appear here — no scores, no grades, no pressure. You cannot break anything.'}
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.historyList}>
            {attemptHistory.map((attempt, index) => {
              const title = attempt.taskId === 'check-message'
                ? (language === 'ur' ? 'مشکوک پیغامات کی جانچ' : 'Check a Suspicious Message')
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
        <div className={styles.nextCardBannerWrap}>
          <img
            src={getModuleIllustration(recommendedTaskId)}
            alt=""
            className={styles.nextCardBanner}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        <div className={styles.nextStepHeader}>
          <div>
            <span className={styles.nextStepCategory}>
              ★ {language === 'ur' ? 'تجویز کردہ اگلی مشق' : 'Recommended Next Step'}
            </span>
            <h3 className={styles.nextTaskName}>{nextTaskTitle}</h3>
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
