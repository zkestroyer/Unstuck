import React from 'react';
import styles from './StepIndicator.module.css';

export default function StepIndicator({ currentStep = 1, totalSteps = 3, label = 'Step' }) {
  const dots = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className={styles.container} aria-label={`${label} ${currentStep} of ${totalSteps}`}>
      <span className={styles.text}>
        {label} {currentStep} of {totalSteps}
      </span>
      <div className={styles.dots} aria-hidden="true">
        {dots.map((stepNum) => (
          <div
            key={stepNum}
            className={`${styles.dot} ${stepNum === currentStep ? styles.active : ''} ${stepNum < currentStep ? styles.completed : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
