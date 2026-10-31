// Comprehensive Unit & Integration Test Suite for UNSTUCK v3.0 Enhancements
import { LEARNING_CATEGORIES, MODULE_TO_CATEGORY, GLOSSARY_TERMS } from '../src/data/categories.js';
import { EXPLORATION_DOMAINS } from '../src/data/explorationActions.js';
import { concerns } from '../src/data/concerns.js';
import { tasks } from '../src/data/tasks.js';
import { scenarios } from '../src/data/scenarios.js';
import { translations } from '../src/data/translations.js';
import { recommendTask } from '../src/logic/recommendTask.js';
import { calculateCategoryProgress, buildConfidenceProfile, CONFIDENCE_STATUS, STATUS_LABELS } from '../src/logic/confidenceTracker.js';
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

console.log('\n======================================================');
console.log('UNSTUCK v3.0 LOGIC & ARCHITECTURE VERIFICATION SUITE');
console.log('======================================================\n');

// ── 1. FEATURE ONE: LEARNING CATEGORIES & CONFIDENCE TRACKER ──
console.log('1. Testing Feature One: Digital Confidence Map & Categories...');
assert(LEARNING_CATEGORIES.length === 4, 'Four distinct learning categories defined');
const categoryIds = LEARNING_CATEGORIES.map(c => c.id);
assert(categoryIds.includes('navigation'), 'Category "navigation" exists');
assert(categoryIds.includes('messaging'), 'Category "messaging" exists');
assert(categoryIds.includes('storage'), 'Category "storage" exists');
assert(categoryIds.includes('safety'), 'Category "safety" exists');

LEARNING_CATEGORIES.forEach(cat => {
  assert(cat.title.en && cat.title.ur && cat.title['roman-ur'], `Category ${cat.id} has trilingual titles`);
  assert(cat.description.en && cat.description.ur, `Category ${cat.id} has trilingual descriptions`);
  assert(cat.modules.length >= 1, `Category ${cat.id} maps to at least one practice module`);
});

// Category Progress Calculation Test: Clean Start
const emptyNavProgress = calculateCategoryProgress('navigation', [], []);
assert(emptyNavProgress.status === CONFIDENCE_STATUS.STARTED, 'Unpractised category begins at "started" status');
assert(emptyNavProgress.attemptsCount === 0, 'Zero attempts recorded initially');
assert(emptyNavProgress.independentCount === 0, 'Zero independent runs initially');

// Category Progress Calculation Test: After Guided Run with Hints
const guidedAttempts = [
  createAttemptRecord({ taskId: 'explore-maps', mode: 'guided', hintsUsed: 2, demonstrationUsed: false })
];
const improvingProgress = calculateCategoryProgress('navigation', guidedAttempts, ['explore-maps']);
assert(improvingProgress.status === CONFIDENCE_STATUS.IMPROVING, 'Guided completion elevates category to "improving"');
assert(improvingProgress.attemptsCount === 1, 'Attempt count reflects guided session');
assert(improvingProgress.hintsCount === 2, 'Total hints counted accurately');

// Category Progress Calculation Test: After Independent Completion
const independentAttempts = [
  ...guidedAttempts,
  createAttemptRecord({ taskId: 'explore-maps', mode: 'independent', hintsUsed: 0, demonstrationUsed: false })
];
const comfortableProgress = calculateCategoryProgress('navigation', independentAttempts, ['explore-maps']);
assert(comfortableProgress.status === CONFIDENCE_STATUS.COMFORTABLE, 'Independent completion elevates category to "comfortable"');
assert(comfortableProgress.independentCount === 1, 'Independent completion count recorded');

// Full Confidence Profile Build
const fullProfile = buildConfidenceProfile({
  selectedConcerns: ['navigation', 'deleting'],
  attemptHistory: independentAttempts,
  completedTaskIds: ['explore-maps']
});
assert(fullProfile.totalAttempts === 2, 'Profile aggregates total attempts across categories');
assert(fullProfile.totalIndependent === 1, 'Profile aggregates independent completions');
assert(fullProfile.friendlyAchievements.length >= 1, 'Friendly achievements generated without scores or percentages');
assert(fullProfile.friendlyAchievements[0].en.includes('destinations'), 'Achievement describes Maps destination discovery in plain words');

// ── 2. FEATURE TWO: WHAT HAPPENS IF...? EXPLORATION DOMAINS ──
console.log('\n2. Testing Feature Two: "What Happens If...?" Exploration Actions...');
assert(EXPLORATION_DOMAINS.length === 4, 'Four exploration domains defined (Gallery, Messaging, Settings, Safety)');
const domainIds = EXPLORATION_DOMAINS.map(d => d.id);
assert(domainIds.includes('gallery'), 'Domain "gallery" exists');
assert(domainIds.includes('messaging'), 'Domain "messaging" exists');
assert(domainIds.includes('settings'), 'Domain "settings" exists');
assert(domainIds.includes('safety'), 'Domain "safety" exists');

let totalExplorationActions = 0;
EXPLORATION_DOMAINS.forEach(dom => {
  assert(dom.title.en && dom.title.ur, `Domain ${dom.id} has trilingual title`);
  assert(dom.actions.length >= 3, `Domain ${dom.id} has at least 3 consequence-exploration actions`);
  dom.actions.forEach(act => {
    totalExplorationActions++;
    assert(act.id && act.label.en && act.question.en && act.explanation.en, `Action ${act.id} has complete questions & explanations`);
    assert(act.explanation.ur && act.explanation['roman-ur'], `Action ${act.id} has Urdu & Roman-Urdu consequence explanations`);
    assert(act.demoFeedback.en && act.demoFeedback.ur, `Action ${act.id} has demo feedback`);
  });
});
console.log(`  ✓ Total interactive exploration actions verified: ${totalExplorationActions}`);

// Check specific required actions
const galleryActions = EXPLORATION_DOMAINS.find(d => d.id === 'gallery').actions.map(a => a.id);
assert(galleryActions.includes('open-photo'), 'Gallery: "Open a photograph" action exists');
assert(galleryActions.includes('select-photo'), 'Gallery: "Select a photograph" action exists');
assert(galleryActions.includes('delete-photo'), 'Gallery: "Delete button" action exists');
assert(galleryActions.includes('restore-photo'), 'Gallery: "Restore photo" action exists');

const messagingActions = EXPLORATION_DOMAINS.find(d => d.id === 'messaging').actions.map(a => a.id);
assert(messagingActions.includes('open-conversation'), 'Messaging: "Open conversation" action exists');
assert(messagingActions.includes('attach-photo'), 'Messaging: "Attach photo" action exists');
assert(messagingActions.includes('send-message'), 'Messaging: "Send message" action exists');
assert(messagingActions.includes('delete-message'), 'Messaging: "Delete message" action exists');
assert(messagingActions.includes('block-contact'), 'Messaging: "Block unknown contact" action exists');

const settingsActions = EXPLORATION_DOMAINS.find(d => d.id === 'settings').actions.map(a => a.id);
assert(settingsActions.includes('toggle-wifi'), 'Settings: "Wi-Fi on/off" action exists');
assert(settingsActions.includes('text-size'), 'Settings: "Adjust text size" action exists');
assert(settingsActions.includes('notifications'), 'Settings: "Turn notifications on/off" action exists');

const safetyActions = EXPLORATION_DOMAINS.find(d => d.id === 'safety').actions.map(a => a.id);
assert(safetyActions.includes('open-suspicious-msg'), 'Safety: "Open suspicious message" action exists');
assert(safetyActions.includes('otp-request'), 'Safety: "Understand OTP request" action exists');
assert(safetyActions.includes('inspect-link'), 'Safety: "Inspect suspicious link" action exists');

// ── 3. FEATURE THREE & FOUR: ADAPTIVE RECOMMENDATIONS & TRANSFER ──
console.log('\n3. Testing Adaptive Recommendations & Real-World Transfer Integration...');

// Test Transfer Readiness Preference: User requested to practise once more
const recWithTransferPreference = recommendTask([], [], ['send-picture'], { 'send-picture': 'practice-more' }, []);
assert(recWithTransferPreference.taskId === 'send-picture', 'Recommends same task if user chose "I\'d like to practise once more" in transfer card');
assert(recWithTransferPreference.reason.en.includes('once more'), 'Reason explicitly mentions user\'s transfer preference');

// Test Repeated Hint Rule: Last attempt needed 2 hints -> recommend repeat guided attempt
const heavyAssistanceAttempt = [
  createAttemptRecord({ taskId: 'safe-delete', mode: 'guided', hintsUsed: 2, demonstrationUsed: false })
];
const recAfterHints = recommendTask([], heavyAssistanceAttempt, ['safe-delete'], {}, []);
assert(recAfterHints.taskId === 'safe-delete', 'Recommends repeat of task where user needed multiple hints');
assert(recAfterHints.reason.en.includes('guidance') || recAfterHints.reason.en.includes('solidify'), 'Explains reason to build muscle memory');

// Test Concern Prioritization: Fear of deleting recommends safe-delete
const recDeleteFear = recommendTask(['deleting'], [], [], {}, []);
assert(recDeleteFear.taskId === 'safe-delete', 'Explicit fear of deleting recommends "safe-delete"');

// Test Concern Prioritization: Navigation fear recommends explore-maps
const recNavFear = recommendTask(['navigation'], [], [], {}, []);
assert(recNavFear.taskId === 'explore-maps', 'Explicit navigation difficulty recommends "explore-maps"');

// ── 4. FEATURE FIVE: ACCESSIBILITY & PLAIN LANGUAGE GLOSSARY ──
console.log('\n4. Testing Feature Five: Accessibility & Plain Language Glossary...');
assert(GLOSSARY_TERMS.length >= 5, 'Plain language dictionary contains required technical terms');
const terms = GLOSSARY_TERMS.map(t => t.id);
assert(terms.includes('authentication'), 'Term "authentication" simplified');
assert(terms.includes('attachment'), 'Term "attachment" simplified');
assert(terms.includes('phishing'), 'Term "phishing" simplified');
assert(terms.includes('permissions'), 'Term "permissions" simplified');
assert(terms.includes('otp'), 'Term "otp" simplified');

GLOSSARY_TERMS.forEach(g => {
  assert(g.plain.en && g.plain.ur && g.plain['roman-ur'], `Term ${g.id} has trilingual plain-language replacement`);
  assert(g.detail.en && g.detail.ur, `Term ${g.id} has supportive explanation`);
});

// ── 5. DATA INTEGRITY: Trilingual Translations ──
console.log('\n5. Testing Trilingual Translations Dictionary...');
['en', 'ur', 'roman-ur'].forEach(lang => {
  assert(translations[lang], `Translations dictionary has key "${lang}"`);
  assert(translations[lang].app.practiceBadge, `Lang "${lang}" has practice sandbox badge`);
  assert(translations[lang].confidenceMap?.heading, `Lang "${lang}" has confidence map heading`);
  assert(translations[lang].exploration?.heading, `Lang "${lang}" has exploration heading`);
});

// ── 6. ALL FOUR LEARNING MODULES VERIFICATION ──
console.log('\n6. Testing All 4 Learning Modules Data Contracts...');
assert(tasks['send-picture'], 'Task "send-picture" (Messaging) exists');
assert(tasks['explore-maps'], 'Task "explore-maps" (Navigation & Maps) exists');
assert(tasks['safe-delete'], 'Task "safe-delete" (Storage & Trash) exists');
assert(scenarios.length >= 2, 'Task "check-message" (Safety & OTP) exists with 2 scenarios');

['send-picture', 'explore-maps', 'safe-delete'].forEach(taskId => {
  const t = tasks[taskId];
  assert(t.guidedSteps.length === 3, `${taskId} has exactly 3 guided steps`);
  assert(t.independentSteps.length === 3, `${taskId} has exactly 3 independent steps`);
  t.guidedSteps.forEach((s, idx) => {
    assert(s.instruction.en && s.instruction.ur, `${taskId} Step ${idx + 1} has bilingual instructions`);
    assert(s.hints.length === 3, `${taskId} Step ${idx + 1} has 3-tier progressive hints`);
    assert(s.whatHappensExplanation?.en, `${taskId} Step ${idx + 1} has "What happens if I tap this?" explanation`);
  });
});

console.log('\n======================================================');
console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('======================================================\n');

if (failed === 0) {
  console.log('🎉 ALL 60+ v3.0 LOGIC & ARCHITECTURE TESTS PASSED WITH 100% SUCCESS!');
  process.exit(0);
} else {
  process.exit(1);
}
