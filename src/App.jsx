import React, { useState, useEffect } from 'react';
import AppHeader from './components/AppHeader';
import WelcomeScreen from './screens/WelcomeScreen';
import FearMapScreen from './screens/FearMapScreen';
import RecommendationScreen from './screens/RecommendationScreen';
import PracticeIntroScreen from './screens/PracticeIntroScreen';
import GuidedPracticeScreen from './screens/GuidedPracticeScreen';
import IndependentAttemptScreen from './screens/IndependentAttemptScreen';
import SummaryScreen from './screens/SummaryScreen';
import SafetyScenarioScreen from './screens/SafetyScenarioScreen';

import { recommendTask } from './logic/recommendTask';
import { createAttemptRecord } from './logic/progress';
import { useAudio } from './hooks/useAudio';
import { useLocalStorage } from './hooks/useLocalStorage';
import './styles/global.css';

const DEFAULT_STATE = {
  screen: 'welcome',
  language: 'en',
  selectedConcerns: [],
  currentTaskId: 'send-picture',
  recommendedTaskId: 'send-picture',
  recommendationReason: 'Practise sending a picture in a fictional message. Explore freely!',
  attemptHistory: [],
  completedTaskIds: []
};

export default function App() {
  const [persistedState, setPersistedState, resetStorage] = useLocalStorage(DEFAULT_STATE);

  const [screen, setScreen] = useState(persistedState.screen || 'welcome');
  const [language, setLanguage] = useState(persistedState.language || 'en');
  const [selectedConcerns, setSelectedConcerns] = useState(persistedState.selectedConcerns || []);
  const [currentTaskId, setCurrentTaskId] = useState(persistedState.currentTaskId || 'send-picture');
  const [recommendedTaskId, setRecommendedTaskId] = useState(persistedState.recommendedTaskId || 'send-picture');
  const [recommendationReason, setRecommendationReason] = useState(persistedState.recommendationReason || '');
  const [attemptHistory, setAttemptHistory] = useState(persistedState.attemptHistory || []);
  const [completedTaskIds, setCompletedTaskIds] = useState(persistedState.completedTaskIds || []);

  const [practiceMode, setPracticeMode] = useState('guided');
  const [speakingId, setSpeakingId] = useState(null);

  const { speak, isPlaying } = useAudio();

  // Sync state changes to persistence
  useEffect(() => {
    setPersistedState({
      screen,
      language,
      selectedConcerns,
      currentTaskId,
      recommendedTaskId,
      recommendationReason,
      attemptHistory,
      completedTaskIds
    });
  }, [screen, language, selectedConcerns, currentTaskId, recommendedTaskId, recommendationReason, attemptHistory, completedTaskIds]);

  // Recalculate recommendation whenever concerns or attempts change
  useEffect(() => {
    const rec = recommendTask(selectedConcerns, attemptHistory, completedTaskIds);
    setRecommendedTaskId(rec.taskId);
    setRecommendationReason(rec.reason);
  }, [selectedConcerns, attemptHistory, completedTaskIds]);

  // Handle TTS speaker helper
  const handleHear = (text, id = null) => {
    setSpeakingId(id);
    speak(text, language);
  };

  // Fear Map Handlers
  const handleToggleConcern = (concernId) => {
    setSelectedConcerns((prev) =>
      prev.includes(concernId) ? prev.filter((id) => id !== concernId) : [...prev, concernId]
    );
  };

  const handleContinueFromFearMap = () => {
    const rec = recommendTask(selectedConcerns, attemptHistory, completedTaskIds);
    setRecommendedTaskId(rec.taskId);
    setRecommendationReason(rec.reason);
    setCurrentTaskId(rec.taskId);
    setScreen('recommendation');
  };

  const handleSkipFearMap = () => {
    setRecommendedTaskId('send-picture');
    setRecommendationReason('Let’s start with a practical, common task: sending a picture in a message.');
    setCurrentTaskId('send-picture');
    setScreen('recommendation');
  };

  // Recommendation Handlers
  const handleStartPractice = () => {
    if (recommendedTaskId === 'check-message') {
      setScreen('safetyScenario');
    } else {
      setScreen('practiceIntro');
    }
  };

  const handleChooseOtherTask = () => {
    const otherTask = currentTaskId === 'send-picture' ? 'check-message' : 'send-picture';
    setCurrentTaskId(otherTask);
    setRecommendedTaskId(otherTask);
    setRecommendationReason(
      otherTask === 'check-message'
        ? 'Learn to identify unexpected verification codes and scam messages.'
        : 'Practise attaching and sending photos in a simulated chat.'
    );
  };

  // Practice Intro Handlers
  const handleSelectPracticeMode = (mode) => {
    setPracticeMode(mode);
    setScreen('guidedPractice');
  };

  // Guided Mode Completion Handlers
  const handleCompleteGuided = ({ hintsUsed, demonstrationUsed }) => {
    const record = createAttemptRecord({
      taskId: currentTaskId,
      mode: 'guided',
      hintsUsed,
      demonstrationUsed,
      completedIndependently: false
    });

    setAttemptHistory((prev) => [...prev, record]);
    if (!completedTaskIds.includes(currentTaskId)) {
      setCompletedTaskIds((prev) => [...prev, currentTaskId]);
    }

    setScreen('independentAttempt');
  };

  // Independent Mode Completion Handlers
  const handleFinishIndependent = ({ hintsUsed, completedIndependently }) => {
    const record = createAttemptRecord({
      taskId: currentTaskId,
      mode: 'independent',
      hintsUsed,
      demonstrationUsed: false,
      completedIndependently
    });

    setAttemptHistory((prev) => [...prev, record]);
    if (!completedTaskIds.includes(currentTaskId)) {
      setCompletedTaskIds((prev) => [...prev, currentTaskId]);
    }

    setScreen('summary');
  };

  // Safety Scenario Completion Handlers
  const handleFinishSafety = ({ scenarioId, choiceId, isSafe }) => {
    const record = createAttemptRecord({
      taskId: 'check-message',
      scenarioId,
      mode: 'safety',
      hintsUsed: 0,
      demonstrationUsed: false,
      completedIndependently: true,
      safetyChoiceId: choiceId,
      safetyChoiceSafe: isSafe
    });

    setAttemptHistory((prev) => [...prev, record]);
    if (!completedTaskIds.includes('check-message')) {
      setCompletedTaskIds((prev) => [...prev, 'check-message']);
    }

    setScreen('summary');
  };

  // Reset Handler
  const handleResetSession = () => {
    resetStorage();
    setScreen('welcome');
    setSelectedConcerns([]);
    setCurrentTaskId('send-picture');
    setRecommendedTaskId('send-picture');
    setRecommendationReason('Practise sending a picture in a fictional message. Explore freely!');
    setAttemptHistory([]);
    setCompletedTaskIds([]);
  };

  const SCREEN_BACK_MAP = {
    fearMap: 'welcome',
    recommendation: 'fearMap',
    practiceIntro: 'recommendation',
    guidedPractice: 'practiceIntro',
    independentAttempt: 'guidedPractice',
    safetyScenario: 'recommendation',
    summary: 'welcome'
  };

  const handleBack = () => {
    const prev = SCREEN_BACK_MAP[screen];
    if (prev) {
      setScreen(prev);
    }
  };

  return (
    <div className="app-container">
      <AppHeader
        currentScreen={screen}
        onNavigate={(newScreen) => setScreen(newScreen)}
        onBack={handleBack}
        canGoBack={Boolean(SCREEN_BACK_MAP[screen])}
        language={language}
        onLanguageChange={(newLang) => setLanguage(newLang)}
        onReset={handleResetSession}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {screen === 'welcome' && (
          <WelcomeScreen
            onStart={() => setScreen('fearMap')}
            language={language}
            onHear={handleHear}
            isSpeaking={isPlaying}
          />
        )}

        {screen === 'fearMap' && (
          <FearMapScreen
            selectedConcerns={selectedConcerns}
            onToggleConcern={handleToggleConcern}
            onContinue={handleContinueFromFearMap}
            onSkip={handleSkipFearMap}
            onBack={handleBack}
            language={language}
            onHear={handleHear}
            speakingId={speakingId}
          />
        )}

        {screen === 'recommendation' && (
          <RecommendationScreen
            recommendedTaskId={recommendedTaskId}
            recommendationReason={recommendationReason}
            onStartPractice={handleStartPractice}
            onChooseOther={handleChooseOtherTask}
            onBack={handleBack}
            language={language}
            onHear={handleHear}
            isSpeaking={isPlaying}
          />
        )}

        {screen === 'practiceIntro' && (
          <PracticeIntroScreen
            onSelectMode={handleSelectPracticeMode}
            onBack={handleBack}
            language={language}
            onHear={handleHear}
            isSpeaking={isPlaying}
          />
        )}

        {screen === 'guidedPractice' && (
          <GuidedPracticeScreen
            taskId={currentTaskId}
            initialMode={practiceMode}
            onCompleteGuided={handleCompleteGuided}
            onBack={handleBack}
            language={language}
            onHear={handleHear}
            isSpeaking={isPlaying}
          />
        )}

        {screen === 'independentAttempt' && (
          <IndependentAttemptScreen
            taskId={currentTaskId}
            onFinishIndependent={handleFinishIndependent}
            onBackToGuided={() => setScreen('guidedPractice')}
            language={language}
            onHear={handleHear}
            isSpeaking={isPlaying}
          />
        )}

        {screen === 'summary' && (
          <SummaryScreen
            attemptHistory={attemptHistory}
            recommendedTaskId={recommendedTaskId}
            recommendationReason={recommendationReason}
            onTrySuggested={() => {
              if (recommendedTaskId === 'check-message') {
                setScreen('safetyScenario');
              } else {
                setScreen('practiceIntro');
              }
            }}
            onPractiseAgain={() => setScreen('practiceIntro')}
            onChangeConcerns={() => setScreen('fearMap')}
            language={language}
            onHear={handleHear}
            isSpeaking={isPlaying}
          />
        )}

        {screen === 'safetyScenario' && (
          <SafetyScenarioScreen
            onFinishSafety={handleFinishSafety}
            onBack={handleBack}
            language={language}
            onHear={handleHear}
            isSpeaking={isPlaying}
          />
        )}
      </main>
    </div>
  );
}
