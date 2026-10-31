import React, { useReducer, useEffect, useState } from 'react';
import PracticeNotice from '../components/PracticeNotice';
import StepIndicator from '../components/StepIndicator';
import AudioButton from '../components/AudioButton';
import HintPanel from '../components/HintPanel';
import HelpStrip from '../components/HelpStrip';
import SimulatedPhone from '../components/SimulatedPhone';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { tasks } from '../data/tasks';
import { practiceReducer, INITIAL_PRACTICE_STATE } from '../logic/practiceReducer';
import styles from './GuidedPracticeScreen.module.css';

export default function GuidedPracticeScreen({
  taskId = 'send-picture',
  initialMode = 'guided',
  onCompleteGuided,
  onBack,
  language = 'en',
  onHear,
  isSpeaking = false
}) {
  const activeTaskId = tasks[taskId] ? taskId : 'send-picture';
  const task = tasks[activeTaskId];
  const steps = task.guidedSteps;

  const [mode, setMode] = useState(initialMode);
  const [isDemoRunning, setIsDemoRunning] = useState(initialMode === 'demonstrate');
  const [demoFinished, setDemoFinished] = useState(false);

  const [state, dispatch] = useReducer(practiceReducer, {
    ...INITIAL_PRACTICE_STATE,
    attemptMode: initialMode,
    totalSteps: steps.length,
    highlightedControl: steps[0]?.targetControlId
  });

  const [selectedPic, setSelectedPic] = useState(null);
  const [messages, setMessages] = useState([
    { text: "Hi Mom! Did you find the pictures from last weekend?", isSender: false, time: "10:25 AM" }
  ]);

  const currentStepData = steps[state.currentStep] || steps[steps.length - 1];
  const instruction = currentStepData?.instruction[language] || currentStepData?.instruction.en;
  const currentHint = currentStepData?.hints[state.hintLevel - 1]?.[language] || currentStepData?.hints[state.hintLevel - 1]?.en;

  // Fully Visual Hands-Free Demonstration Flow
  useEffect(() => {
    if (!isDemoRunning) return;

    // Timer 1: Paperclip Click
    const timer1 = setTimeout(() => {
      const feedback = steps[0].correctTapFeedback[language] || steps[0].correctTapFeedback.en;
      dispatch({ type: 'CORRECT_TAP', payload: { feedback } });
    }, 2200);

    // Timer 2: Photo Selection
    const timer2 = setTimeout(() => {
      setSelectedPic({ id: "picture-cat", label: "My Cat", src: "/images/photo_cat.svg" });
      const feedback = steps[1].correctTapFeedback[language] || steps[1].correctTapFeedback.en;
      dispatch({ type: 'CORRECT_TAP', payload: { pictureId: "picture-cat", feedback } });
    }, 4500);

    // Timer 3: Send Tap
    const timer3 = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: "Here is the picture!",
          isSender: true,
          imageSrc: "/images/photo_cat.svg",
          imageAlt: "My Cat",
          time: "10:30 AM"
        }
      ]);
      const feedback = steps[2].correctTapFeedback[language] || steps[2].correctTapFeedback.en;
      dispatch({ type: 'CORRECT_TAP', payload: { feedback } });
      setIsDemoRunning(false);
      setDemoFinished(true);
    }, 6800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isDemoRunning, language]);

  const handleSkipDemo = () => {
    setIsDemoRunning(false);
    setDemoFinished(false);
    setMode('guided');
    setSelectedPic(null);
    setMessages([
      { text: "Hi Mom! Did you find the pictures from last weekend?", isSender: false, time: "10:25 AM" }
    ]);
    dispatch({ type: 'RESET_TASK' });
  };

  const handleReplayDemo = () => {
    setSelectedPic(null);
    setMessages([
      { text: "Hi Mom! Did you find the pictures from last weekend?", isSender: false, time: "10:25 AM" }
    ]);
    dispatch({ type: 'RESET_TASK' });
    setDemoFinished(false);
    setIsDemoRunning(true);
  };

  const handleStartPracticeMyself = () => {
    handleSkipDemo();
  };

  // Keyboard accessibility: Escape dismisses overlays
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (state.showExplanation) {
          dispatch({ type: 'DISMISS_EXPLANATION' });
        } else if (state.showHint) {
          dispatch({ type: 'DISMISS_HINT' });
        } else if (state.feedbackMessage) {
          dispatch({ type: 'DISMISS_FEEDBACK' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.showExplanation, state.showHint, state.feedbackMessage]);

  const handleAttachmentTap = () => {
    if (state.currentStep === 0) {
      const feedback = currentStepData.correctTapFeedback[language] || currentStepData.correctTapFeedback.en;
      dispatch({ type: 'CORRECT_TAP', payload: { feedback } });
    } else {
      // Harmless toggle
      dispatch({ type: 'WRONG_TAP', payload: {
        feedback: "You already have the picture tray open. Pick a photo from the tray."
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
      // Add message to chat
      setMessages(prev => [
        ...prev,
        {
          text: "Here is the picture!",
          isSender: true,
          imageSrc: selectedPic?.src,
          imageAlt: selectedPic?.label,
          time: "10:30 AM"
        }
      ]);

      const feedback = currentStepData.correctTapFeedback[language] || currentStepData.correctTapFeedback.en;
      dispatch({ type: 'CORRECT_TAP', payload: { feedback } });
    } else {
      const wrongMsg = currentStepData.wrongTapFeedback[language] || currentStepData.wrongTapFeedback.en;
      dispatch({ type: 'WRONG_TAP', payload: { feedback: wrongMsg } });
    }
  };

  const handleWrongTap = (controlName) => {
    const wrongMsg = currentStepData?.wrongTapFeedback[language] || currentStepData?.wrongTapFeedback.en;
    dispatch({ type: 'WRONG_TAP', payload: { feedback: wrongMsg } });
  };

  const handleHear = () => {
    const textToSpeak = `${instruction}. ${state.feedbackMessage || ''}`;
    onHear(textToSpeak, `task_${activeTaskId}_${state.currentStep}`);
  };

  const handleStartAgain = () => {
    dispatch({ type: 'RESET_TASK' });
    setSelectedPic(null);
    setMessages([
      { text: "Hi Mom! Did you find the pictures from last weekend?", isSender: false, time: "10:25 AM" }
    ]);
  };

  return (
    <div className={`screen-fade ${styles.container}`}>
      <PracticeNotice message="Practice Sandbox: Tap buttons freely. Nothing is being sent to real contacts." />

      <div className={styles.practiceLayout}>
        {/* Left Panel: Instructions, Hints, Controls */}
        <div className={styles.instructionsPanel}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            {onBack && (
              <SecondaryButton onClick={onBack} style={{ minHeight: 38, padding: '4px 12px', fontSize: 13 }}>
                ← {language === 'ur' ? 'پیچھے جائیں' : 'Back to Choices'}
              </SecondaryButton>
            )}
            <StepIndicator
              currentStep={Math.min(state.currentStep + 1, steps.length)}
              totalSteps={steps.length}
              label={language === 'ur' ? 'مرحلہ' : 'Step'}
            />
          </div>

          {isDemoRunning && (
            <div style={{ padding: '10px 14px', backgroundColor: '#E0F2FE', borderRadius: 8, border: '1px solid #7DD3FC', color: '#0369A1', fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div>
                <strong>🎥 Watching Demonstration:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 13, color: '#0C4A6E' }}>UNSTUCK is demonstrating each step hands-free. Watch where the pointer taps.</p>
              </div>
              <button
                type="button"
                onClick={handleSkipDemo}
                style={{ background: '#FFFFFF', border: '1.5px solid #0284C7', color: '#0369A1', borderRadius: 6, padding: '6px 12px', fontSize: 13, cursor: 'pointer', fontWeight: 600, flexShrink: 0 }}
              >
                Skip to Practice →
              </button>
            </div>
          )}

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

          {/* Corrective / Informational Feedback Banner */}
          {state.feedbackMessage && (
            <div
              className={`${styles.feedbackBanner} ${
                state.feedbackType === 'correct' ? styles.feedbackCorrect : styles.feedbackIncorrect
              }`}
            >
              <span className={styles.feedbackIcon}>
                {state.feedbackType === 'correct' ? '✓' : 'ℹ️'}
              </span>
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

          {/* Progressive Hint Panel */}
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

          {/* Consequence Modal / Explanation ("What happens if I tap this?") */}
          {state.showExplanation && (
            <div className={styles.consequenceBox}>
              <div className={styles.consequenceHeader}>
                <strong>What happens if you tap this?</strong>
                <button
                  type="button"
                  className={styles.dismissFeedback}
                  onClick={() => dispatch({ type: 'DISMISS_EXPLANATION' })}
                >
                  ✕
                </button>
              </div>
              <p className={styles.consequenceText}>
                {currentStepData?.whatHappensExplanation[language] || currentStepData?.whatHappensExplanation.en}
              </p>
            </div>
          )}

          {/* Completion State */}
          {demoFinished ? (
            <div className={styles.completedBox} style={{ borderColor: '#0284C7', backgroundColor: '#F0F9FF' }}>
              <div className={styles.congratsIcon}>🎉</div>
              <h3 style={{ color: '#0369A1' }}>{language === 'ur' ? 'ڈیمو مکمل ہو گیا!' : 'Demonstration Complete!'}</h3>
              <p>
                {language === 'ur'
                  ? 'آپ نے دیکھا کہ تصویر کیسے منسلک اور بھیجی جاتی ہے۔ اب خود کوشش کریں!'
                  : 'You saw how each step works hands-free! Ready to practice with gentle highlighted hints?'}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
                <PrimaryButton onClick={handleStartPracticeMyself} className={styles.nextStageBtn}>
                  Now Let Me Try (Guided Practice) →
                </PrimaryButton>
                <SecondaryButton onClick={handleReplayDemo}>
                  Replay Demonstration ↺
                </SecondaryButton>
              </div>
            </div>
          ) : state.phase === 'completed' ? (
            <div className={styles.completedBox}>
              <div className={styles.congratsIcon}>🎉</div>
              <h3>{language === 'ur' ? 'شاندار! مشق مکمل ہو گئی۔' : 'Well Done! Guided Practice Complete.'}</h3>
              <p>
                {language === 'ur'
                  ? 'اب آئیے اسی مہارت کو آزادانہ طور پر خود آزما کر دیکھتے ہیں۔'
                  : "You've learned the steps! Now let's try a fresh scenario on your own with training wheels off."}
              </p>
              <PrimaryButton
                onClick={() => onCompleteGuided({
                  hintsUsed: state.hintsUsed,
                  demonstrationUsed: initialMode === 'demonstrate' || state.demonstrationUsed
                })}
                className={styles.nextStageBtn}
              >
                Try It on Your Own (Independent) →
              </PrimaryButton>
            </div>
          ) : (
            <HelpStrip
              onHearAgain={handleHear}
              onGiveHint={() => dispatch({
                type: 'REQUEST_HINT',
                payload: { targetControlId: currentStepData?.targetControlId }
              })}
              onWhatHappens={() => dispatch({ type: 'SHOW_EXPLANATION' })}
              onStartAgain={handleStartAgain}
              isSpeaking={isSpeaking}
              showHearAgain={language !== 'roman-ur'}
            />
          )}
        </div>

        {/* Right Panel: Simulated Mobile Phone */}
        <div className={styles.phonePanel}>
          <SimulatedPhone
            taskId={activeTaskId}
            currentStep={state.currentStep}
            messages={messages}
            highlightedControl={state.highlightedControl}
            pictureTrayOpen={state.pictureTrayOpen || state.currentStep === 1}
            selectedPicture={selectedPic}
            isDemonstrating={isDemoRunning}
            onAttachmentTap={handleAttachmentTap}
            onPictureSelect={handlePictureSelect}
            onSendTap={handleSendTap}
            onWrongTap={handleWrongTap}
          />
        </div>
      </div>
    </div>
  );
}
