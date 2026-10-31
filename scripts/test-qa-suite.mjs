// Automated QA Test Suite for UNSTUCK
import { concerns } from '../src/data/concerns.js';
import { tasks } from '../src/data/tasks.js';
import { scenarios } from '../src/data/scenarios.js';
import { translations } from '../src/data/translations.js';
import { recommendTask } from '../src/logic/recommendTask.js';
import { practiceReducer, INITIAL_PRACTICE_STATE } from '../src/logic/practiceReducer.js';
import { createAttemptRecord, formatHonestSummary } from '../src/logic/progress.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('\n========================================');
console.log('UNSTUCK SENIOR QA TEST SUITE');
console.log('========================================\n');

// 1. DATA INTEGRITY: Concerns
console.log('1. Testing Concerns Data Model...');
assert(Array.isArray(concerns) && concerns.length === 7, 'Concerns list contains exactly 7 items');
concerns.forEach(c => {
  assert(c.id && c.label.en && c.label.ur && c.label['roman-ur'], `Concern ${c.id} has trilingual labels`);
});

// 2. DATA INTEGRITY: Tasks
console.log('\n2. Testing Tasks Data Model...');
assert(tasks['send-picture'], 'Task "send-picture" exists');
const taskA = tasks['send-picture'];
assert(taskA.guidedSteps.length === 3, 'Task A has 3 guided steps');
assert(taskA.independentSteps.length === 3, 'Task A has 3 independent steps');
taskA.guidedSteps.forEach((s, idx) => {
  assert(s.instruction.en && s.instruction.ur && s.instruction['roman-ur'], `Guided Step ${idx + 1} has trilingual instructions`);
  assert(s.hints.length === 3, `Guided Step ${idx + 1} has 3-tier progressive hints`);
});

// 3. DATA INTEGRITY: Scenarios
console.log('\n3. Testing Safety Scenarios Data Model...');
assert(scenarios.length === 2, 'Two safety scenarios exist');
scenarios.forEach((sc, idx) => {
  assert(sc.id && sc.sender && sc.choices.length >= 2, `Scenario ${idx + 1} has valid sender and choices`);
  sc.choices.forEach(ch => {
    assert(ch.feedback.en && ch.feedback.ur && ch.feedback['roman-ur'], `Choice ${ch.id} has trilingual pedagogical feedback`);
  });
});

// 4. DATA INTEGRITY: Translations
console.log('\n4. Testing Trilingual Translations Dictionary...');
['en', 'ur', 'roman-ur'].forEach(lang => {
  assert(translations[lang], `Translations dictionary has key "${lang}"`);
  assert(translations[lang].welcome.heading, `Lang "${lang}" has welcome heading`);
  assert(translations[lang].fearMap.heading, `Lang "${lang}" has fear map heading`);
  assert(translations[lang].recommendation.heading, `Lang "${lang}" has recommendation heading`);
  assert(translations[lang].summary.heading, `Lang "${lang}" has summary heading`);
});

// 5. LOGIC: Recommendation Engine
console.log('\n5. Testing Recommendation Engine Logic...');
const recDefault = recommendTask([], [], []);
assert(recDefault.taskId === 'send-picture', 'Default recommendation is "send-picture"');

const recSafety = recommendTask(['message_safety'], [], []);
assert(recSafety.taskId === 'check-message', 'Safety concern recommends "check-message"');

const recCompleted = recommendTask([], [], ['send-picture']);
assert(recCompleted.taskId === 'check-message', 'Completed Task A recommends Task B');

// 6. LOGIC: Practice State Machine
console.log('\n6. Testing Practice Finite State Machine...');
let state = practiceReducer(INITIAL_PRACTICE_STATE, { type: 'INIT_TASK', payload: { mode: 'guided', totalSteps: 3 } });
assert(state.currentStep === 0, 'Initial step is 0');
assert(state.pictureTrayOpen === false, 'Tray is closed initially');

// Step 0 -> Step 1 (Correct tap on paperclip)
state = practiceReducer(state, { type: 'CORRECT_TAP', payload: { feedback: 'Great!' } });
assert(state.currentStep === 1, 'Step advances to 1 after correct tap');
assert(state.pictureTrayOpen === true, 'Picture tray opens on step 1');
assert(state.highlightedControl === 'picture-item', 'Highlighted control advances to picture-item');

// Step 1 -> Step 2 (Correct tap on photo)
state = practiceReducer(state, { type: 'CORRECT_TAP', payload: { pictureId: 'picture-cat' } });
assert(state.currentStep === 2, 'Step advances to 2 after photo select');
assert(state.selectedPictureId === 'picture-cat', 'Picture ID recorded');
assert(state.highlightedControl === 'send-btn', 'Highlighted control advances to send-btn');

// Step 2 -> Step 3 (Correct tap on send)
state = practiceReducer(state, { type: 'CORRECT_TAP', payload: { feedback: 'Sent!' } });
assert(state.currentStep === 3, 'Step advances to 3');
assert(state.phase === 'completed', 'Phase is "completed"');

// Test Wrong Tap
state = practiceReducer(state, { type: 'WRONG_TAP', payload: { feedback: 'Try the clip' } });
assert(state.wrongAttempts === 1, 'Wrong attempts counter increments');
assert(state.feedbackType === 'incorrect', 'Feedback type is incorrect');

// Test Hint Escalation
state = practiceReducer(INITIAL_PRACTICE_STATE, { type: 'REQUEST_HINT', payload: { targetControlId: 'attachment-btn' } });
assert(state.hintLevel === 1, 'Hint level escalates to 1');
state = practiceReducer(state, { type: 'REQUEST_HINT', payload: { targetControlId: 'attachment-btn' } });
assert(state.hintLevel === 2, 'Hint level escalates to 2');
state = practiceReducer(state, { type: 'REQUEST_HINT', payload: { targetControlId: 'attachment-btn' } });
assert(state.hintLevel === 3, 'Hint level escalates to 3');
assert(state.highlightedControl === 'attachment-btn', 'Level 3 reveals highlighted control');

// 7. LOGIC: Progress Tracking
console.log('\n7. Testing Progress Tracking & Honest Summary...');
const attemptRecord = createAttemptRecord({
  taskId: 'send-picture',
  mode: 'guided',
  hintsUsed: 1,
  demonstrationUsed: false,
  completedIndependently: false
});
assert(attemptRecord.taskId === 'send-picture', 'Attempt record records task ID');
assert(attemptRecord.hintsUsed === 1, 'Attempt record records hints used');

const summaryEn = formatHonestSummary(attemptRecord, 'en');
assert(typeof summaryEn === 'string' && summaryEn.includes('hint'), 'English summary mentions hint usage honestly');
const summaryUr = formatHonestSummary(attemptRecord, 'ur');
assert(typeof summaryUr === 'string' && summaryUr.length > 0, 'Urdu summary generated');

console.log('\n========================================');
console.log(`QA TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('========================================\n');

if (failed > 0) {
  process.exit(1);
}
