// Dynamic Digital Confidence Map Tracker & Profile Management
import { LEARNING_CATEGORIES, MODULE_TO_CATEGORY } from '../data/categories.js';

export const CONFIDENCE_STATUS = {
  STARTED: 'started',       // Just getting started
  IMPROVING: 'improving',   // Practising and improving
  COMFORTABLE: 'comfortable' // Comfortable with this skill
};

export const STATUS_LABELS = {
  started: {
    en: "Just getting started",
    ur: "آغاز ہو رہا ہے",
    "roman-ur": "Aghaz ho raha hai"
  },
  improving: {
    en: "Practising & improving",
    ur: "مشق جاری ہے اور بہتری آ رہی ہے",
    "roman-ur": "Practice aur behtari jari hai"
  },
  comfortable: {
    en: "Comfortable with this skill",
    ur: "اس مہارت میں پراعتماد",
    "roman-ur": "Is skill mein pur-aitamad"
  }
};

/**
 * Calculates user's live category mastery & progress from real attempts
 */
export function calculateCategoryProgress(categoryId, attemptHistory = [], completedTaskIds = []) {
  const category = LEARNING_CATEGORIES.find(c => c.id === categoryId);
  if (!category) {
    return {
      status: CONFIDENCE_STATUS.STARTED,
      attemptsCount: 0,
      independentCount: 0,
      assistedCount: 0,
      hintsCount: 0,
      completedModules: []
    };
  }

  const catAttempts = attemptHistory.filter(a => {
    const aCat = MODULE_TO_CATEGORY[a.taskId] || a.category;
    return aCat === categoryId;
  });

  const attemptsCount = catAttempts.length;
  const independentCount = catAttempts.filter(a => a.completedIndependently || (a.mode === 'safety' && a.safetyChoiceSafe)).length;
  const assistedCount = catAttempts.filter(a => a.hintsUsed > 0 || a.demonstrationUsed).length;
  const hintsCount = catAttempts.reduce((acc, a) => acc + (a.hintsUsed || 0), 0);

  const completedModules = category.modules.filter(m => completedTaskIds.includes(m));

  let status = CONFIDENCE_STATUS.STARTED;

  if (independentCount > 0) {
    status = CONFIDENCE_STATUS.COMFORTABLE;
  } else if (attemptsCount > 0) {
    status = CONFIDENCE_STATUS.IMPROVING;
  }

  return {
    categoryId,
    status,
    attemptsCount,
    independentCount,
    assistedCount,
    hintsCount,
    completedModules,
    totalModules: category.modules.length,
    lastAttempt: catAttempts[catAttempts.length - 1] || null
  };
}

/**
 * Calculates full confidence profile across all 4 categories
 */
export function buildConfidenceProfile({
  selectedConcerns = [],
  attemptHistory = [],
  completedTaskIds = [],
  mistakesHistory = [],
  transferReadiness = {}
}) {
  const categoriesProgress = {};
  let totalIndependent = 0;
  let totalAssisted = 0;
  let totalHintsUsed = 0;

  for (const cat of LEARNING_CATEGORIES) {
    const p = calculateCategoryProgress(cat.id, attemptHistory, completedTaskIds);
    categoriesProgress[cat.id] = p;
    totalIndependent += p.independentCount;
    totalAssisted += p.assistedCount;
    totalHintsUsed += p.hintsCount;
  }

  // Friendly milestone statements derived honestly from real achievements
  const friendlyAchievements = [];
  if (completedTaskIds.includes('send-picture')) {
    friendlyAchievements.push({
      id: 'achieve_send',
      en: "You successfully attached and sent a photograph.",
      ur: "آپ نے کامیابی کے ساتھ تصویر منسلک کر کے بھیجی۔",
      "roman-ur": "Aap ne photo attach aur send karne ki practice mukammal ki."
    });
  }
  if (completedTaskIds.includes('safe-delete')) {
    friendlyAchievements.push({
      id: 'achieve_trash',
      en: "You conquered the fear of deleting by restoring a photo from Trash.",
      ur: "آپ نے کوڑے دان سے تصویر بحال کر کے ڈیلیٹ کا خوف دور کیا۔",
      "roman-ur": "Aap ne Trash se photo wapis la kar deletion ka darr door kiya."
    });
  }
  if (completedTaskIds.includes('explore-maps')) {
    friendlyAchievements.push({
      id: 'achieve_maps',
      en: "You explored destinations and learned safe location sharing.",
      ur: "آپ نے نقشے پر منزل تلاش کی اور محفوظ لوکیشن شیئر کرنا سیکھی۔",
      "roman-ur": "Aap ne Maps par jagah talash ki aur safe location share seekhi."
    });
  }
  if (completedTaskIds.includes('check-message')) {
    friendlyAchievements.push({
      id: 'achieve_safety',
      en: "You learned to recognise urgent scam messages and protect your OTP.",
      ur: "آپ نے مشکوک پیغامات کی پہچان اور اپنے او ٹی پی کوڈ کی حفاظت سیکھی۔",
      "roman-ur": "Aap ne scam messages pehchanna aur OTP protect karna seekha."
    });
  }

  // Count explored settings / exploration actions if any
  if (mistakesHistory.some(m => m.recovered)) {
    friendlyAchievements.push({
      id: 'achieve_recover',
      en: "You practised how to recover from an unintended tap calmly.",
      ur: "آپ نے غلط بٹن دبنے کے بعد پرسکون انداز میں واپسی کا طریقہ سیکھا۔",
      "roman-ur": "Aap ne ghalat tap ke baad calmly wapis aana seekha."
    });
  }

  return {
    selectedConcerns,
    categoriesProgress,
    totalAttempts: attemptHistory.length,
    totalIndependent,
    totalAssisted,
    totalHintsUsed,
    completedTaskIds,
    friendlyAchievements,
    transferReadiness,
    lastPracticed: attemptHistory.length > 0 ? attemptHistory[attemptHistory.length - 1].timestamp : null
  };
}
