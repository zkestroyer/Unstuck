import React from 'react';
import styles from './AudioButton.module.css';

export default function AudioButton({ label = 'Hear this', onClick, isPlaying = false, className = '' }) {
  return (
    <button
      type="button"
      className={`${styles.audioButton} ${isPlaying ? styles.playing : ''} ${className}`}
      onClick={onClick}
      aria-label={`${label} spoken aloud`}
      title={label}
    >
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={isPlaying ? 'currentColor' : 'none'} />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
      <span>{isPlaying ? 'Speaking...' : label}</span>
    </button>
  );
}
