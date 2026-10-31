// Finite State Machine for UNSTUCK Practice Tasks
export const INITIAL_PRACTICE_STATE = {
  phase: "practice",            // "practice" | "feedback" | "completed"
  attemptMode: "guided",         // "guided" | "independent"
  currentStep: 0,
  totalSteps: 3,

  // Assistance tracking
  hintsUsed: 0,
  hintLevel: 0,                  // 0: none, 1: general, 2: specific, 3: highlight demonstration
  demonstrationUsed: false,
  wrongAttempts: 0,
  completedIndependently: false,

  // UI state
  showHint: false,
  showExplanation: false,
  pictureTrayOpen: false,
  selectedPictureId: null,
  highlightedControl: "attachment-btn",
  feedbackMessage: null,
  feedbackType: "neutral"        // "neutral" | "correct" | "incorrect"
};

export function practiceReducer(state, action) {
  switch (action.type) {
    case "INIT_TASK": {
      const mode = action.payload.mode || "guided";
      const totalSteps = action.payload.totalSteps || 3;
      return {
        ...INITIAL_PRACTICE_STATE,
        attemptMode: mode,
        totalSteps,
        highlightedControl: mode === "guided" ? "attachment-btn" : null,
        completedIndependently: mode === "independent"
      };
    }

    case "CORRECT_TAP": {
      const nextStep = state.currentStep + 1;
      const isCompleted = nextStep >= state.totalSteps;

      let nextHighlight = null;
      if (!isCompleted && state.attemptMode === "guided") {
        if (nextStep === 1) nextHighlight = "picture-item";
        if (nextStep === 2) nextHighlight = "send-btn";
      }

      return {
        ...state,
        currentStep: nextStep,
        phase: isCompleted ? "completed" : "practice",
        pictureTrayOpen: nextStep === 1,
        selectedPictureId: action.payload?.pictureId || state.selectedPictureId,
        highlightedControl: nextHighlight,
        showHint: false,
        hintLevel: 0,
        feedbackMessage: action.payload?.feedback || null,
        feedbackType: "correct"
      };
    }

    case "WRONG_TAP": {
      return {
        ...state,
        wrongAttempts: state.wrongAttempts + 1,
        feedbackMessage: action.payload?.feedback || null,
        feedbackType: "incorrect"
      };
    }

    case "REQUEST_HINT": {
      const nextLevel = Math.min(state.hintLevel + 1, 3);
      return {
        ...state,
        hintsUsed: state.hintsUsed + 1,
        hintLevel: nextLevel,
        showHint: true,
        completedIndependently: false, // Disqualify pure independence if hint used
        highlightedControl: nextLevel === 3 ? action.payload?.targetControlId : state.highlightedControl
      };
    }

    case "DISMISS_HINT": {
      return {
        ...state,
        showHint: false
      };
    }

    case "SHOW_EXPLANATION": {
      return {
        ...state,
        showExplanation: true
      };
    }

    case "DISMISS_EXPLANATION": {
      return {
        ...state,
        showExplanation: false
      };
    }

    case "DISMISS_FEEDBACK": {
      return {
        ...state,
        feedbackMessage: null
      };
    }

    case "RESET_TASK": {
      return {
        ...INITIAL_PRACTICE_STATE,
        attemptMode: state.attemptMode,
        totalSteps: state.totalSteps,
        highlightedControl: state.attemptMode === "guided" ? "attachment-btn" : null,
        completedIndependently: state.attemptMode === "independent"
      };
    }

    default:
      return state;
  }
}
