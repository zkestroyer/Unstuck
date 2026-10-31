import React from 'react';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import AudioButton from '../components/AudioButton';
import PracticeNotice from '../components/PracticeNotice';
import { LEARNING_CATEGORIES } from '../data/categories';
import { calculateCategoryProgress, STATUS_LABELS, CONFIDENCE_STATUS } from '../logic/confidenceTracker';
import styles from './ConfidenceMapScreen.module.css';

export default function ConfidenceMapScreen({
  attemptHistory = [],
  completedTaskIds = [],
  onSelectTask,
  onBack,
  language = 'en',
  onHear,
  isSpeaking = false
}) {
  const isUrdu = language === 'ur';
  const isRoman = language === 'roman-ur';

  const headingText = isUrdu
    ? "آپ کے اعتماد کا نقشہ (Confidence Map)"
    : isRoman
    ? "Aap Ke Aitemad Ka Naqsha"
    : "Your Digital Confidence Map";

  const subText = isUrdu
    ? "یہ کوئی امتحان نہیں ہے۔ یہاں دکھایا گیا ہے کہ آپ نے کس مہارت کی مشق کی ہے اور آپ کس میں پرسکون محسوس کر رہے ہیں۔"
    : isRoman
    ? "Yeh koi exam nahi hai. Yahan aap ki safe practice aur confidence ka real record hai."
    : "Your living learning journey. No scores, no countdowns, and no pressure — just honest progress as you explore.";

  const handleHear = () => {
    onHear(`${headingText}. ${subText}`, 'confidence_map_intro');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case CONFIDENCE_STATUS.COMFORTABLE:
        return styles.statusComfortable;
      case CONFIDENCE_STATUS.IMPROVING:
        return styles.statusImproving;
      case CONFIDENCE_STATUS.STARTED:
      default:
        return styles.statusStarted;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case CONFIDENCE_STATUS.COMFORTABLE:
        return '🌟';
      case CONFIDENCE_STATUS.IMPROVING:
        return '🌱';
      case CONFIDENCE_STATUS.STARTED:
      default:
        return '⚪';
    }
  };

  const hasRecentActivity = attemptHistory.length > 0;

  return (
    <div className={`screen-fade ${styles.container}`}>
      <PracticeNotice message="Continuous Learning Map: Your personal journey. Every step you try builds real-life comfort." />

      <div className={styles.headerArea}>
        

        <div className={styles.badgeWrap}>
          <span className={styles.badge}>🌿 {isUrdu ? 'اعتماد کا سفر' : 'CONFIDENCE-FIRST JOURNEY'}</span>
        </div>

        <h1 className={styles.heading}>{headingText}</h1>
        <p className={styles.subheading}>{subText}</p>

        {hasRecentActivity && (
          <div className={styles.encouragementBanner}>
            <span className={styles.encouragementIcon}>🌱</span>
            <span>
              {isUrdu
                ? "شاباش! آپ نے نئی مہارتوں کی محفوظ مشق کی ہے اور آپ کا اعتماد بڑھ رہا ہے۔"
                : isRoman
                ? "Shabash! Aap ne safe practice ki hai aur aap ka confidence barh raha hai."
                : "Look at you! You've stepped forward and practised new skills with curiosity and care."}
            </span>
          </div>
        )}

        {!isRoman && (
          <div className={styles.audioRow}>
            <AudioButton
              label={isUrdu ? 'نقشہ سنیں' : 'Hear Map Overview'}
              onClick={handleHear}
              isPlaying={isSpeaking}
            />
          </div>
        )}
      </div>

      {/* 4 Learning Categories Grid */}
      <div className={styles.categoriesGrid}>
        {LEARNING_CATEGORIES.map((cat) => {
          const progress = calculateCategoryProgress(cat.id, attemptHistory, completedTaskIds);
          const statusText = STATUS_LABELS[progress.status]?.[language] || STATUS_LABELS[progress.status]?.en;
          const statusIcon = getStatusIcon(progress.status);
          const statusClass = getStatusBadgeClass(progress.status);

          const primaryTaskId = cat.modules[0];

          return (
            <div key={cat.id} className={styles.categoryCard}>
              <div className={styles.cardHeader}>
                <span className={styles.catIcon} aria-hidden="true">{cat.badgeIcon}</span>
                <div className={styles.headerInfo}>
                  <h2 className={styles.catTitle}>{cat.title[language] || cat.title.en}</h2>
                  <div className={`${styles.statusPill} ${statusClass}`}>
                    <span aria-hidden="true">{statusIcon}</span>
                    <span>{statusText}</span>
                  </div>
                </div>
              </div>

              <p className={styles.catDesc}>{cat.description[language] || cat.description.en}</p>

              {/* Progress Record */}
              <div className={styles.metricsBox}>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>{isUrdu ? 'مکمل مشقیں:' : isRoman ? 'Completed:' : 'Practised:'}</span>
                  <span className={styles.metricVal}>
                    {progress.attemptsCount === 0
                      ? (isUrdu ? 'ابھی شروع نہیں کی' : 'Not started yet')
                      : `${progress.attemptsCount} ${isUrdu ? 'بار' : 'time(s)'}`}
                  </span>
                </div>

                {progress.independentCount > 0 && (
                  <div className={styles.metricItem}>
                    <span className={styles.metricLabel}>{isUrdu ? 'خود سے مکمل:' : isRoman ? 'Khud mukammal:' : 'Independent:'}</span>
                    <span className={styles.metricVal}>
                      {progress.independentCount} {isUrdu ? 'بار بغیر اشارے کے' : 'time(s) on your own'}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className={styles.cardFooter}>
                <PrimaryButton
                  onClick={() => onSelectTask(primaryTaskId, 'guided')}
                  className={styles.practiseBtn}
                >
                  {progress.status === CONFIDENCE_STATUS.STARTED
                    ? (isUrdu ? 'مشق شروع کریں' : isRoman ? 'Practice Shuru Karein' : 'Start Practice')
                    : (isUrdu ? 'دوبارہ مشق کریں' : isRoman ? 'Dobara Practice Karein' : 'Practise Again')} →
                </PrimaryButton>

                {progress.status !== CONFIDENCE_STATUS.STARTED && (
                  <SecondaryButton
                    onClick={() => onSelectTask(primaryTaskId, 'independent')}
                    className={styles.independentBtn}
                  >
                    {isUrdu ? 'خود آزما کر دیکھیں' : isRoman ? 'Khud try karein' : 'Try on Your Own'}
                  </SecondaryButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
