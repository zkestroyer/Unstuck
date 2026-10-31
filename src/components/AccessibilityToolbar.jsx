import React, { useState } from 'react';
import styles from './AccessibilityToolbar.module.css';

export default function AccessibilityToolbar({
  accessibility = {
    textSize: 'normal',
    highContrast: false,
    largeButtons: false,
    reducedMotion: false
  },
  onChangeAccessibility,
  language = 'en'
}) {
  const [isOpen, setIsOpen] = useState(false);

  const isUrdu = language === 'ur';
  const isRoman = language === 'roman-ur';

  const t = {
    toggleBtn: isUrdu ? "رسائی اور سہولت (Accessibility)" : isRoman ? "Accessibility Controls" : "Accessibility & Comfort",
    textSize: isUrdu ? "لکھائی کا سائز" : isRoman ? "Text Size" : "Text Size",
    sizeNormal: isUrdu ? "عام" : isRoman ? "Normal" : "Normal",
    sizeLarge: isUrdu ? "بڑا (+20%)" : isRoman ? "Bara" : "Large",
    sizeXLarge: isUrdu ? "بہت بڑا (+40%)" : isRoman ? "Bohat Bara" : "Extra Large",
    highContrast: isUrdu ? "ہائی کنٹراسٹ (واضح رنگ)" : isRoman ? "High Contrast" : "High Contrast Mode",
    largeButtons: isUrdu ? "بڑے بٹنز (آسان ٹچ)" : isRoman ? "Barey Buttons" : "Large Touch Buttons",
    reducedMotion: isUrdu ? "حرکت کم کریں (ساکت اسکرین)" : isRoman ? "Animation Band Karein" : "Reduce Motion / Animations",
    on: isUrdu ? "چالو" : isRoman ? "On" : "ON",
    off: isUrdu ? "بند" : isRoman ? "Off" : "OFF",
    close: isUrdu ? "بند کریں" : isRoman ? "Band karein" : "Close"
  };

  const handleTextSizeCycle = () => {
    const next = accessibility.textSize === 'normal' ? 'large' : accessibility.textSize === 'large' ? 'xlarge' : 'normal';
    onChangeAccessibility({ ...accessibility, textSize: next });
  };

  const handleToggleContrast = () => {
    onChangeAccessibility({ ...accessibility, highContrast: !accessibility.highContrast });
  };

  const handleToggleLargeButtons = () => {
    onChangeAccessibility({ ...accessibility, largeButtons: !accessibility.largeButtons });
  };

  const handleToggleMotion = () => {
    onChangeAccessibility({ ...accessibility, reducedMotion: !accessibility.reducedMotion });
  };

  return (
    <aside className={styles.container} aria-label="Accessibility options">
      <button
        type="button"
        className={`${styles.triggerBtn} ${isOpen ? styles.triggerActive : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <span className={styles.triggerIcon} aria-hidden="true">👁️</span>
        <span>{t.toggleBtn}</span>
        {accessibility.highContrast || accessibility.textSize !== 'normal' || accessibility.largeButtons || accessibility.reducedMotion ? (
          <span className={styles.activeDot} title="Accessibility features active" />
        ) : null}
      </button>

      {isOpen && (
        <div id="accessibility-panel" className={styles.panel} role="region" aria-label="Accessibility settings panel">
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>⚙️ {t.toggleBtn}</span>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
              aria-label={t.close}
            >
              ✕
            </button>
          </div>

          <div className={styles.optionsList}>
            {/* 1. Text Size */}
            <div className={styles.optionRow}>
              <div className={styles.optionMeta}>
                <span className={styles.optionLabel}>{t.textSize}</span>
                <span className={styles.optionVal}>
                  {accessibility.textSize === 'normal' ? t.sizeNormal : accessibility.textSize === 'large' ? t.sizeLarge : t.sizeXLarge}
                </span>
              </div>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={handleTextSizeCycle}
                aria-label={`Current text size is ${accessibility.textSize}. Tap to change.`}
              >
                A A+
              </button>
            </div>

            {/* 2. High Contrast */}
            <div className={styles.optionRow}>
              <div className={styles.optionMeta}>
                <span className={styles.optionLabel}>{t.highContrast}</span>
              </div>
              <button
                type="button"
                className={`${styles.toggleSwitch} ${accessibility.highContrast ? styles.toggleOn : ''}`}
                onClick={handleToggleContrast}
                role="switch"
                aria-checked={accessibility.highContrast}
              >
                {accessibility.highContrast ? t.on : t.off}
              </button>
            </div>

            {/* 3. Large Buttons */}
            <div className={styles.optionRow}>
              <div className={styles.optionMeta}>
                <span className={styles.optionLabel}>{t.largeButtons}</span>
              </div>
              <button
                type="button"
                className={`${styles.toggleSwitch} ${accessibility.largeButtons ? styles.toggleOn : ''}`}
                onClick={handleToggleLargeButtons}
                role="switch"
                aria-checked={accessibility.largeButtons}
              >
                {accessibility.largeButtons ? t.on : t.off}
              </button>
            </div>

            {/* 4. Reduced Motion */}
            <div className={styles.optionRow}>
              <div className={styles.optionMeta}>
                <span className={styles.optionLabel}>{t.reducedMotion}</span>
              </div>
              <button
                type="button"
                className={`${styles.toggleSwitch} ${accessibility.reducedMotion ? styles.toggleOn : ''}`}
                onClick={handleToggleMotion}
                role="switch"
                aria-checked={accessibility.reducedMotion}
              >
                {accessibility.reducedMotion ? t.on : t.off}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
