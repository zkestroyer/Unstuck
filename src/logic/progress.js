// Attempt recording and progress calculation
export function createAttemptRecord({
  taskId,
  scenarioId = null,
  mode = "guided",
  hintsUsed = 0,
  demonstrationUsed = false,
  completedIndependently = false,
  safetyChoiceId = null,
  safetyChoiceSafe = null
}) {
  return {
    taskId,
    scenarioId,
    timestamp: new Date().toISOString(),
    mode,
    hintsUsed,
    demonstrationUsed,
    completedIndependently: mode === "independent" && hintsUsed === 0 && !demonstrationUsed,
    safetyChoiceId,
    safetyChoiceSafe
  };
}

export function formatAttemptSummary(attempt, language = "en") {
  if (attempt.mode === "safety") {
    if (attempt.safetyChoiceSafe) {
      if (language === "ur") return "حفاظتی جانچ: سب سے محفوظ راستہ منتخب کیا۔";
      if (language === "roman-ur") return "Safety Check: Sab se safe option choose kiya.";
      return "Safety Check: Chose the safest verification path.";
    } else {
      if (language === "ur") return "حفاظتی جانچ: خطرے کی نشاندہی اور رہنمائی سیکھی۔";
      if (language === "roman-ur") return "Safety Check: Risk samjha aur guidelines seekhein.";
      return "Safety Check: Reviewed warning signs and learned safer habits.";
    }
  }

  if (attempt.completedIndependently) {
    if (language === "ur") return "خود مکمل کیا — بغیر کسی اشارے کے!";
    if (language === "roman-ur") return "Bina kisi hint ke khud mukammal kiya!";
    return "Completed independently on your own without hints!";
  }

  if (attempt.demonstrationUsed) {
    if (language === "ur") return "مرحلہ وار ڈیمو دیکھ کر مکمل کیا۔";
    if (language === "roman-ur") return "Demo dekh kar complete kiya.";
    return "Completed after watching step-by-step demonstration.";
  }

  if (attempt.hintsUsed > 0) {
    if (language === "ur") return `مدد کے ساتھ مکمل کیا (${attempt.hintsUsed} اشارے استعمال کیے)۔`;
    if (language === "roman-ur") return `Madad ke sath mukammal kiya (${attempt.hintsUsed} hints).`;
    return `Completed with a little help (${attempt.hintsUsed} hint${attempt.hintsUsed > 1 ? 's' : ''} used).`;
  }

  if (language === "ur") return "رہنمائی والے طریقہ سے کامیابی کے ساتھ مکمل کیا۔";
  if (language === "roman-ur") return "Guided practice kamyabi se mukammal ki.";
  return "Completed successfully in guided practice.";
}
