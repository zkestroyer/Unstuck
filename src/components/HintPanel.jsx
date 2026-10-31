import React from 'react';
import styles from './HintPanel.module.css';

export default function HintPanel({ hintText, hintLevel = 1, onDismiss, onMoreHelp, canShowMore = true }) {
  if (!hintText) return null;

  return (
    <div className={styles.hintPanel} role="region" aria-live="polite">
      <div className={styles.header}>
        <div className={styles.iconTitle}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span className={styles.levelBadge}>
            {hintLevel === 1 && "Helpful Clue"}
            {hintLevel === 2 && "More Specific Clue"}
            {hintLevel === 3 && "Let's Show You"}
          </span>
        </div>
        <button type="button" className={styles.closeBtn} onClick={onDismiss} aria-label="Close hint">
          ✕
        </button>
      </div>

      <p className={styles.text}>{hintText}</p>

      <div className={styles.actions}>
        <button type="button" className={styles.gotItBtn} onClick={onDismiss}>
          Got it
        </button>
        {canShowMore && hintLevel < 3 && (
          <button type="button" className={styles.moreBtn} onClick={onMoreHelp}>
            Need more help?
          </button>
        )}
      </div>
    </div>
  );
}
