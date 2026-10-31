import React from 'react';
import { formatAttemptSummary } from '../logic/progress';
import styles from './ProgressCard.module.css';

export default function ProgressCard({ attempt, taskTitle, language = 'en' }) {
  const summaryText = formatAttemptSummary(attempt, language);
  const isIndependent = attempt.completedIndependently;
  const isSafe = attempt.mode === 'safety' ? attempt.safetyChoiceSafe : null;

  return (
    <div className={`${styles.card} ${isIndependent ? styles.independent : ''}`}>
      <div className={styles.iconArea}>
        {isIndependent || isSafe ? (
          <div className={styles.successIcon}>✓</div>
        ) : (
          <div className={styles.infoIcon}>💡</div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h3 className={styles.taskTitle}>{taskTitle}</h3>
          <span className={styles.badge}>
            {attempt.mode === 'independent' && 'Independent Attempt'}
            {attempt.mode === 'guided' && 'Guided Practice'}
            {attempt.mode === 'safety' && 'Safety Exercise'}
          </span>
        </div>

        <p className={styles.summary}>{summaryText}</p>

        {attempt.hintsUsed > 0 && (
          <div className={styles.hintsUsed}>
            Hints requested: <strong>{attempt.hintsUsed}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
