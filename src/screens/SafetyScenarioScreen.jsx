import React, { useState } from 'react';
import PracticeNotice from '../components/PracticeNotice';
import StepIndicator from '../components/StepIndicator';
import AudioButton from '../components/AudioButton';
import PrimaryButton from '../components/PrimaryButton';
import { scenarios } from '../data/scenarios';
import { translations } from '../data/translations';
import styles from './SafetyScenarioScreen.module.css';

export default function SafetyScenarioScreen({
  onFinishSafety,
  onBack,
  language = 'en',
  onHear,
  isSpeaking = false
}) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const scenario = scenarios[currentScenarioIndex] || scenarios[0];
  const t = translations[language]?.safety || translations.en.safety;

  const senderName = scenario.sender;
  const messageText = scenario.messageBody[language] || scenario.messageBody.en;
  const questionText = scenario.question[language] || scenario.question.en;
  const goldenRuleText = scenario.goldenRule[language] || scenario.goldenRule.en;

  const handleSelectChoice = (choice) => {
    setSelectedChoiceId(choice.id);
    const feedbackText = choice.feedback[language] || choice.feedback.en;
    setFeedback({
      isSafe: choice.isSafe,
      text: feedbackText
    });
  };

  const handleNext = () => {
    const isLast = currentScenarioIndex >= scenarios.length - 1;
    const choiceObj = scenario.choices.find(c => c.id === selectedChoiceId);

    if (isLast) {
      onFinishSafety({
        scenarioId: scenario.id,
        choiceId: selectedChoiceId,
        isSafe: choiceObj?.isSafe ?? true
      });
    } else {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedChoiceId(null);
      setFeedback(null);
    }
  };

  const handleHear = () => {
    const textToSpeak = `${t.heading}. Message from ${senderName}: ${messageText}. ${questionText}`;
    onHear(textToSpeak, `safety_${currentScenarioIndex}`);
  };

  return (
    <div className={`screen-fade ${styles.container}`}>
      <PracticeNotice message="Safety Exercise: Simulated suspicious messages. Practice recognizing warning signs in safety." />

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
              marginBottom: 10,
              padding: 0
            }}
          >
            ← {language === 'ur' ? 'تجویز پر واپس جائیں' : 'Back to Recommendation'}
          </button>
        )}
        <div className={styles.badgeRow}>
          <span className={styles.safetyBadge}>ONLINE SAFETY PRACTICE</span>
          <StepIndicator
            currentStep={currentScenarioIndex + 1}
            totalSteps={scenarios.length}
            label={language === 'ur' ? 'منظر نامہ' : 'Scenario'}
          />
        </div>

        <h1 className={styles.heading}>{scenario.title[language] || scenario.title.en}</h1>

        {language !== 'roman-ur' && (
          <div className={styles.audioRow}>
            <AudioButton
              label={language === 'ur' ? 'پیغام سنیں' : 'Hear message aloud'}
              onClick={handleHear}
              isPlaying={isSpeaking}
            />
          </div>
        )}
      </div>

      <div className={styles.contentGrid}>
        {/* Left: Simulated Phone Message Screen */}
        <div className={styles.phoneFrame}>
          <div className={styles.phoneHeader}>
            <div className={styles.warningAlertIcon}>⚠️</div>
            <div>
              <span className={styles.senderTitle}>{senderName}</span>
              <span className={styles.senderSub}>Suspicious incoming text message</span>
            </div>
          </div>

          <div className={styles.messageBox}>
            <div className={styles.smsBubble}>
              <p className={styles.smsText}>{messageText}</p>
              <span className={styles.smsTime}>Received Just Now</span>
            </div>
          </div>
        </div>

        {/* Right: Decision Tree & Choices */}
        <div className={styles.decisionPanel}>
          <h2 className={styles.questionHeading}>{questionText}</h2>

          <div className={styles.choicesList} role="radiogroup" aria-label="Response options">
            {scenario.choices.map((choice) => {
              const isSelected = selectedChoiceId === choice.id;
              const choiceLabel = choice.label[language] || choice.label.en;

              return (
                <button
                  key={choice.id}
                  type="button"
                  className={`${styles.choiceBtn} ${isSelected ? styles.choiceSelected : ''}`}
                  onClick={() => handleSelectChoice(choice)}
                  role="radio"
                  aria-checked={isSelected}
                >
                  <span className={styles.radioDot} />
                  <span className={styles.choiceLabelText}>{choiceLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Consequence Explanation */}
          {feedback && (
            <div
              className={`${styles.feedbackCard} ${
                feedback.isSafe ? styles.feedbackSafe : styles.feedbackRisky
              }`}
            >
              <div className={styles.feedbackTitleRow}>
                <span className={styles.feedbackIcon}>
                  {feedback.isSafe ? '🛡️ Safe Choice' : '💡 Let’s Pause and Think'}
                </span>
              </div>
              <p className={styles.feedbackBody}>{feedback.text}</p>

              <div className={styles.goldenRuleBox}>
                <strong>Tip:</strong> {goldenRuleText}
              </div>

              <PrimaryButton onClick={handleNext} className={styles.continueBtn}>
                {currentScenarioIndex < scenarios.length - 1 ? "Try Next Scenario →" : "Finish Safety Exercise →"}
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
