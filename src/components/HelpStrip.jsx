import React from 'react';
import styles from './HelpStrip.module.css';

export default function HelpStrip({
  onHearAgain,
  onGiveHint,
  onWhatHappens,
  onStartAgain,
  isSpeaking = false,
  showWhatHappens = true,
  showHearAgain = true
}) {
  return (
    <div className={styles.strip} role="toolbar" aria-label="Learning and recovery controls">
      {showHearAgain && (
        <button
          type="button"
          className={`${styles.helpBtn} ${isSpeaking ? styles.speaking : ''}`}
          onClick={onHearAgain}
          aria-label="Hear instruction again"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <span>Hear again</span>
        </button>
      )}

      <button
        type="button"
        className={styles.helpBtn}
        onClick={onGiveHint}
        aria-label="Give me a hint"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>Give me a hint</span>
      </button>

      {showWhatHappens && (
        <button
          type="button"
          className={styles.helpBtn}
          onClick={onWhatHappens}
          aria-label="Learn what happens if I tap this"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>What if I tap this?</span>
        </button>
      )}

      <button
        type="button"
        className={`${styles.helpBtn} ${styles.resetBtn}`}
        onClick={onStartAgain}
        aria-label="Start this task again from step 1"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
        <span>Start again</span>
      </button>
    </div>
  );
}
