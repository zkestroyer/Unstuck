import React, { useState, useEffect } from 'react';
import AppHeader from './components/AppHeader';
import WelcomeScreen from './screens/WelcomeScreen';
import FearMapScreen from './screens/FearMapScreen';
import RecommendationScreen from './screens/RecommendationScreen';
import PracticeIntroScreen from './screens/PracticeIntroScreen';
import GuidedPracticeScreen from './screens/GuidedPracticeScreen';
import IndependentAttemptScreen from './screens/IndependentAttemptScreen';
import RealWorldTransferScreen from './screens/RealWorldTransferScreen';
import ConfidenceMapScreen from './screens/ConfidenceMapScreen';
import ExplorationModeScreen from './screens/ExplorationModeScreen';
import SummaryScreen from './screens/SummaryScreen';
import SafetyScenarioScreen from './screens/SafetyScenarioScreen';
import LibraryScreen from './screens/LibraryScreen';

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
  completedTaskIds: [],
  transferReadiness: {},
  mistakesHistory: [],
  accessibility: {
    textSize: 'normal',
    highContrast: false,
    largeButtons: false,
    reducedMotion: false
  }
};

const VALID_SCREENS = [
  'welcome',
  'fearMap',
  'recommendation',
  'practiceIntro',
  'guidedPractice',
  'independentAttempt',
  'realWorldTransfer',
  'confidenceMap',
  'exploration',
  'summary',
  'safetyScenario',
  'library'
];

export default function App() {
  const [persistedState, setPersistedState, resetStorage] = useLocalStorage(DEFAULT_STATE);

  const [screen, setScreen] = useState(() => {
    const s = persistedState?.screen;
    return VALID_SCREENS.includes(s) ? s : 'welcome';
  });
  const [language, setLanguage] = useState(persistedState?.language || 'en');
  const [selectedConcerns, setSelectedConcerns] = useState(persistedState?.selectedConcerns || []);
  const [currentTaskId, setCurrentTaskId] = useState(persistedState?.currentTaskId || 'send-picture');
  const [recommendedTaskId, setRecommendedTaskId] = useState(persistedState?.recommendedTaskId || 'send-picture');
  const [recommendationReason, setRecommendationReason] = useState(persistedState?.recommendationReason || '');
  const [attemptHistory, setAttemptHistory] = useState(persistedState?.attemptHistory || []);
  const [completedTaskIds, setCompletedTaskIds] = useState(persistedState?.completedTaskIds || []);
  const [transferReadiness, setTransferReadiness] = useState(persistedState?.transferReadiness || {});
  const [mistakesHistory, setMistakesHistory] = useState(persistedState?.mistakesHistory || []);
  const [accessibility, setAccessibility] = useState(persistedState?.accessibility || {
    textSize: 'normal',
    highContrast: false,
    largeButtons: false,
    reducedMotion: false
  });

  const [practiceMode, setPracticeMode] = useState('guided');
  const [speakingId, setSpeakingId] = useState(null);

  const { speak, isPlaying } = useAudio();

  // Apply accessibility attributes to document element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-text-size', accessibility.textSize || 'normal');
    root.setAttribute('data-contrast', accessibility.highContrast ? 'high' : 'normal');
    root.setAttribute('data-large-buttons', accessibility.largeButtons ? 'true' : 'false');
    root.setAttribute('data-reduced-motion', accessibility.reducedMotion ? 'true' : 'false');
    root.setAttribute('lang', language);
  }, [accessibility, language]);

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
      completedTaskIds,
      transferReadiness,
      mistakesHistory,
      accessibility
    });
  }, [
    screen,
    language,
    selectedConcerns,
    currentTaskId,
    recommendedTaskId,
    recommendationReason,
    attemptHistory,
    completedTaskIds,
    transferReadiness,
    mistakesHistory,
    accessibility
  ]);

  // Recalculate recommendation whenever concerns or attempts change
  useEffect(() => {
    const rec = recommendTask(
      selectedConcerns,
      attemptHistory,
      completedTaskIds,
      transferReadiness,
      mistakesHistory
    );
    setRecommendedTaskId(rec.taskId);
    setRecommendationReason(rec.reason);
  }, [selectedConcerns, attemptHistory, completedTaskIds, transferReadiness, mistakesHistory]);

  // Handle TTS speaker helper
  const handleHear = (text, id = null, audioKey = null) => {
    setSpeakingId(id);
    speak(text, language, audioKey || id);
  };

  // Fear Map Handlers
  const handleToggleConcern = (concernId) => {
    setSelectedConcerns((prev) =>
      prev.includes(concernId) ? prev.filter((id) => id !== concernId) : [...prev, concernId]
    );
  };

  const handleContinueFromFearMap = () => {
    const rec = recommendTask(
      selectedConcerns,
      attemptHistory,
      completedTaskIds,
      transferReadiness,
      mistakesHistory
    );
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
    const ALL_AVAILABLE = ['send-picture', 'explore-maps', 'safe-delete', 'check-message'];
    const nextIdx = (ALL_AVAILABLE.indexOf(currentTaskId) + 1) % ALL_AVAILABLE.length;
    const otherTask = ALL_AVAILABLE[nextIdx];
    setCurrentTaskId(otherTask);
    setRecommendedTaskId(otherTask);
    const rec = recommendTask(
      selectedConcerns,
      attemptHistory,
      completedTaskIds,
      transferReadiness,
      mistakesHistory
    );
    setRecommendationReason(rec.reason);
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

  // Independent Mode Completion Handlers -> Leads to Real-World Transfer Bridge
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

    setScreen('realWorldTransfer');
  };

  // Real-World Transfer Confirmation Handler
  const handleConfirmTransfer = (readinessChoice) => {
    setTransferReadiness((prev) => ({
      ...prev,
      [currentTaskId]: readinessChoice
    }));
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

    setScreen('realWorldTransfer');
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
    setTransferReadiness({});
    setMistakesHistory([]);
  };

  const handleSelectTask = (taskId, mode = 'guided') => {
    setCurrentTaskId(taskId);
    if (mode === 'safety' || taskId === 'check-message') {
      setScreen('safetyScenario');
    } else if (mode === 'independent') {
      setPracticeMode('independent');
      setScreen('independentAttempt');
    } else {
      setPracticeMode('guided');
      setScreen('guidedPractice');
    }
  };

  const SCREEN_BACK_MAP = {
    fearMap: 'welcome',
    recommendation: 'fearMap',
    practiceIntro: 'recommendation',
    guidedPractice: 'practiceIntro',
    independentAttempt: 'guidedPractice',
    realWorldTransfer: 'independentAttempt',
    confidenceMap: 'welcome',
    exploration: 'welcome',
    safetyScenario: 'recommendation',
    summary: 'welcome',
    library: 'welcome'
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
        accessibility={accessibility}
        onChangeAccessibility={(newAcc) => setAccessibility(newAcc)}
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

        {screen === 'realWorldTransfer' && (
          <RealWorldTransferScreen
            taskId={currentTaskId}
            language={language}
            onConfirmTransfer={handleConfirmTransfer}
            onHear={handleHear}
            isSpeaking={isPlaying}
          />
        )}

        {screen === 'confidenceMap' && (
          <ConfidenceMapScreen
            attemptHistory={attemptHistory}
            completedTaskIds={completedTaskIds}
            onSelectTask={handleSelectTask}
            onBack={handleBack}
            language={language}
            onHear={handleHear}
            isSpeaking={isPlaying}
          />
        )}

        {screen === 'exploration' && (
          <ExplorationModeScreen
            onBack={handleBack}
            language={language}
            onHear={handleHear}
            isSpeaking={isPlaying}
          />
        )}

        {screen === 'summary' && (
          <SummaryScreen
            attemptHistory={attemptHistory}
            completedTaskIds={completedTaskIds}
            selectedConcerns={selectedConcerns}
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
            onOpenConfidenceMap={() => setScreen('confidenceMap')}
            onOpenExploration={() => setScreen('exploration')}
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

        {screen === 'library' && (
          <LibraryScreen
            onSelectTask={handleSelectTask}
            completedTaskIds={completedTaskIds}
            recommendedTaskId={recommendedTaskId}
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
