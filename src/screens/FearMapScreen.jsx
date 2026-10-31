import React from 'react';
import ChoiceCard from '../components/ChoiceCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { concerns } from '../data/concerns';
import { translations } from '../data/translations';
import styles from './FearMapScreen.module.css';

export default function FearMapScreen({
  selectedConcerns = [],
  onToggleConcern,
  onContinue,
  onSkip,
  onBack,
  language = 'en',
  onHear,
  speakingId = null
}) {
  const t = translations[language]?.fearMap || translations.en.fearMap;

  const handleHearOption = (concern) => {
    const text = `${concern.label[language] || concern.label.en}. ${concern.description[language] || concern.description.en}`;
    onHear(text, concern.id);
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
            ← {language === 'ur' ? 'ہوم پیج پر واپس جائیں' : 'Back to Home'}
          </button>
        )}
        <h1 className={styles.heading}>{t.heading}</h1>
        <p className={styles.subheading}>{t.subheading}</p>
      </div>

      <div className={styles.cardsGrid} role="group" aria-label="Learning concerns options">
        {concerns.map((concern) => {
          const isSelected = selectedConcerns.includes(concern.id);
          const label = concern.label[language] || concern.label.en;
          const description = concern.description[language] || concern.description.en;

          return (
            <ChoiceCard
              key={concern.id}
              id={concern.id}
              label={label}
              description={description}
              isSelected={isSelected}
              onToggle={() => onToggleConcern(concern.id)}
              onHear={language !== 'roman-ur' ? () => handleHearOption(concern) : null}
              isSpeaking={speakingId === concern.id}
            />
          );
        })}
      </div>

      <div className={styles.footerBar}>
        <SecondaryButton onClick={onSkip} className={styles.skipBtn}>
          {t.skipBtn}
        </SecondaryButton>

        <PrimaryButton
          onClick={onContinue}
          className={styles.continueBtn}
        >
          {t.continueBtn}
          {selectedConcerns.length > 0 && ` (${selectedConcerns.length})`}
        </PrimaryButton>
      </div>
    </div>
  );
}
