import React from 'react';
import styles from './ChoiceCard.module.css';

export default function ChoiceCard({ id, label, description, isSelected, onToggle, onHear, isSpeaking = false, image }) {
  const imageSrc = image || `/images/cards/card_${id}.svg`;

  return (
    <div
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div className={styles.checkIndicator}>
        {isSelected && (
          <svg viewBox="0 0 20 20" fill="none" className={styles.checkIcon}>
            <path d="M4 10.5L8 14.5L16 6.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      <div className={styles.imageWrapper}>
        <img
          src={imageSrc}
          alt=""
          className={styles.cardImage}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.label}>{label}</div>
        {description && <div className={styles.description}>{description}</div>}
      </div>

      {onHear && (
        <button
          type="button"
          className={`${styles.hearBtn} ${isSpeaking ? styles.speaking : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onHear();
          }}
          aria-label={`Listen to ${label}`}
          title="Listen to this option"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.speakerIcon}>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={isSpeaking ? 'currentColor' : 'none'} />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        </button>
      )}
    </div>
  );
}
