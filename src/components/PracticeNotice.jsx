import React from 'react';
import styles from './PracticeNotice.module.css';

export default function PracticeNotice({ message = "Practice only — nothing is being sent to anyone." }) {
  return (
    <div className={styles.noticeBar} role="status" aria-live="polite">
      <span className={styles.badge}>PRACTICE ONLY</span>
      <span className={styles.text}>{message}</span>
    </div>
  );
}
