import React, { useReducer, useState, useEffect } from 'react';
import PracticeNotice from '../components/PracticeNotice';
import StepIndicator from '../components/StepIndicator';
import AudioButton from '../components/AudioButton';
import HintPanel from '../components/HintPanel';
import HelpStrip from '../components/HelpStrip';
import SimulatedPhone from '../components/SimulatedPhone';
import SecondaryButton from '../components/SecondaryButton';
import { tasks } from '../data/tasks';
import { practiceReducer, INITIAL_PRACTICE_STATE } from '../logic/practiceReducer';
import styles from './IndependentAttemptScreen.module.css';

export default function IndependentAttemptScreen({
  taskId = 'send-picture',
  onFinishIndependent,
  onBackToGuided,
  language = 'en',
  onHear,
  isSpeaking = false
}) {
  const activeTaskId = tasks[taskId] ? taskId : 'send-picture';
  const task = tasks[activeTaskId];
  const steps = task.independentSteps || task.guidedSteps;

  const [state, dispatch] = useReducer(practiceReducer, {
    ...INITIAL_PRACTICE_STATE,
    attemptMode: 'independent',
    totalSteps: steps.length,
    highlightedControl: null, // Zero highlights initially!
    completedIndependently: true
  });

  const [selectedPic, setSelectedPic] = useState(null);
  const [messages, setMessages] = useState([
    { text: "Your garden must be blooming! Can you send a photo of the flowers?", isSender: false, time: "10:35 AM" }
  ]);

  const currentStepData = steps[state.currentStep] || steps[steps.length - 1];
  const instruction = currentStepData?.instruction[language] || currentStepData?.instruction.en;
  const currentHint = currentStepData?.hints[state.hintLevel - 1]?.[language] || currentStepData?.hints[state.hintLevel - 1]?.en;

  // Keyboard accessibility: Escape dismisses overlays
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (state.showHint) {
          dispatch({ type: 'DISMISS_HINT' });
        } else if (state.feedbackMessage) {
          dispatch({ type: 'DISMISS_FEEDBACK' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.showHint, state.feedbackMessage]);

  const handleAttachmentTap = () => {
    if (state.currentStep === 0) {
      const feedback = currentStepData.correctTapFeedback[language] || currentStepData.correctTapFeedback.en;
      dispatch({ type: 'CORRECT_TAP', payload: { feedback } });
    } else {
      dispatch({ type: 'WRONG_TAP', payload: {
        feedback: "The picture tray is already open. Pick the flowers photo from the gallery."
      }});
    }
  };

  const handlePictureSelect = (pic) => {
    if (state.currentStep === 1) {
      setSelectedPic(pic);
      const feedback = currentStepData.correctTapFeedback[language] || currentStepData.correctTapFeedback.en;
      dispatch({ type: 'CORRECT_TAP', payload: { pictureId: pic.id, feedback } });
    } else {
      dispatch({ type: 'WRONG_TAP', payload: {
        feedback: "First tap the attachment paperclip icon to open the picture tray."
      }});
    }
  };

  const handleSendTap = () => {
    if (state.currentStep === 2) {
      setMessages(prev => [
        ...prev,
        {
          text: "Here are the flowers from my garden!",
          isSender: true,
          imageSrc: selectedPic?.src || "/images/photo_garden.svg",
          imageAlt: "Garden Flowers",
          time: "10:38 AM"
        }
      ]);

      const feedback = currentStepData.correctTapFeedback[language] || currentStepData.correctTapFeedback.en;
      dispatch({ type: 'CORRECT_TAP', payload: { feedback } });

      // Trigger completion after short moment
      setTimeout(() => {
        onFinishIndependent({
          hintsUsed: state.hintsUsed,
          completedIndependently: state.hintsUsed === 0 && !state.demonstrationUsed
        });
      }, 1500);
    } else {
      const wrongMsg = currentStepData?.wrongTapFeedback[language] || currentStepData?.wrongTapFeedback.en;
      dispatch({ type: 'WRONG_TAP', payload: { feedback: wrongMsg } });
    }
  };

  const handleWrongTap = () => {
    const wrongMsg = currentStepData?.wrongTapFeedback[language] || currentStepData?.wrongTapFeedback.en;
    dispatch({ type: 'WRONG_TAP', payload: { feedback: wrongMsg } });
  };

  const handleHear = () => {
    const textToSpeak = `${instruction}. ${state.feedbackMessage || ''}`;
    onHear(textToSpeak, 'independent_prompt');
  };

  const handleStartAgain = () => {
    dispatch({ type: 'RESET_TASK' });
    setSelectedPic(null);
    setMessages([
      { text: "Your garden must be blooming! Can you send a photo of the flowers?", isSender: false, time: "10:35 AM" }
    ]);
  };

  return (
    <div className={`screen-fade ${styles.container}`}>
      <PracticeNotice message="Independent Attempt: Training wheels are off. Try completing the task without hints." />

      <div className={styles.practiceLayout}>
        {/* Left Column: Instructions & Fallback */}
        <div className={styles.instructionsPanel}>
          <div className={styles.badgeRow} style={{ flexWrap: 'wrap', gap: 8 }}>
            {onBackToGuided && (
              <SecondaryButton onClick={onBackToGuided} style={{ minHeight: 36, padding: '4px 12px', fontSize: 13 }}>
                ← {language === 'ur' ? 'رہنمائی پر واپس' : 'Back to Guided'}
              </SecondaryButton>
            )}
            <span className={styles.independentBadge}>TRAINING WHEELS OFF</span>
            <StepIndicator
              currentStep={Math.min(state.currentStep + 1, steps.length)}
              totalSteps={steps.length}
              label={language === 'ur' ? 'مرحلہ' : 'Step'}
            />
          </div>

          <h2 className={styles.stepHeading}>{instruction}</h2>

          {language !== 'roman-ur' && (
            <div className={styles.audioRow}>
              <AudioButton
                label={language === 'ur' ? 'ہدایت سنیں' : 'Hear instruction'}
                onClick={handleHear}
                isPlaying={isSpeaking}
              />
            </div>
          )}

          {state.feedbackMessage && (
            <div
              className={`${styles.feedbackBanner} ${
                state.feedbackType === 'correct' ? styles.feedbackCorrect : styles.feedbackIncorrect
              }`}
            >
              <span>{state.feedbackType === 'correct' ? '✓' : 'ℹ️'}</span>
              <p className={styles.feedbackText}>{state.feedbackMessage}</p>
              <button
                type="button"
                className={styles.dismissFeedback}
                onClick={() => dispatch({ type: 'DISMISS_FEEDBACK' })}
              >
                ✕
              </button>
            </div>
          )}

          {state.showHint && (
            <HintPanel
              hintText={currentHint}
              hintLevel={state.hintLevel}
              onDismiss={() => dispatch({ type: 'DISMISS_HINT' })}
              onMoreHelp={() => dispatch({
                type: 'REQUEST_HINT',
                payload: { targetControlId: currentStepData?.targetControlId }
              })}
            />
          )}

          {state.phase === 'completed' ? (
            <div className={styles.completedBox}>
              <div className={styles.congratsIcon}>🌟</div>
              <h3>{language === 'ur' ? 'شاندار کامیابی!' : 'Independent Task Complete!'}</h3>
              <p>
                {state.hintsUsed === 0
                  ? "Incredible job! You completed this entire task completely on your own without hints."
                  : `Great practice! You completed the task with ${state.hintsUsed} hint.`}
              </p>
            </div>
          ) : (
            <>
              <HelpStrip
                onHearAgain={handleHear}
                onGiveHint={() => dispatch({
                  type: 'REQUEST_HINT',
                  payload: { targetControlId: currentStepData?.targetControlId }
                })}
                onWhatHappens={() => dispatch({ type: 'SHOW_EXPLANATION' })}
                onStartAgain={handleStartAgain}
                isSpeaking={isSpeaking}
                showWhatHappens={false}
                showHearAgain={language !== 'roman-ur'}
              />

              <div className={styles.fallbackArea}>
                <SecondaryButton onClick={onBackToGuided} className={styles.backGuidedBtn}>
                  ← Go back to guided practice
                </SecondaryButton>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Simulated Phone */}
        <div className={styles.phonePanel}>
          <SimulatedPhone
            taskId={activeTaskId}
            currentStep={state.currentStep}
            messages={messages}
            highlightedControl={state.highlightedControl}
            pictureTrayOpen={state.pictureTrayOpen || state.currentStep === 1}
            selectedPicture={selectedPic}
            onAttachmentTap={handleAttachmentTap}
            onPictureSelect={handlePictureSelect}
            onSendTap={handleSendTap}
            onWrongTap={handleWrongTap}
            contactName="Farah (Friend)"
            contactInitials="F"
          />
        </div>
      </div>
    </div>
  );
}
