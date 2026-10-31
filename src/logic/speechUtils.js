// Web Speech API coordinator with studio-quality native Urdu MP3 audio playback and Roman-Urdu muting
let cachedVoices = [];
let activeAudio = null;

const URDU_AUDIO_MAP = {
  // Screen 1: Welcome
  'welcome': '/audio/ur/welcome_ur.mp3',

  // Screen 2: Fear Map Header & Cards
  'fear_map_header': '/audio/ur/fear_map_header_ur.mp3',
  'fearMap': '/audio/ur/fear_map_header_ur.mp3',
  'concern_wrong_button': '/audio/ur/concern_wrong_button_ur.mp3',
  'concern_deleting': '/audio/ur/concern_deleting_ur.mp3',
  'concern_navigation': '/audio/ur/concern_navigation_ur.mp3',
  'concern_sending_picture': '/audio/ur/concern_sending_picture_ur.mp3',
  'concern_message_safety': '/audio/ur/concern_message_safety_ur.mp3',
  'concern_prefers_audio': '/audio/ur/concern_prefers_audio_ur.mp3',
  'concern_language_difficulty': '/audio/ur/concern_language_difficulty_ur.mp3',
  'wrong_button': '/audio/ur/concern_wrong_button_ur.mp3',
  'deleting': '/audio/ur/concern_deleting_ur.mp3',
  'navigation': '/audio/ur/concern_navigation_ur.mp3',
  'sending_picture': '/audio/ur/concern_sending_picture_ur.mp3',
  'message_safety': '/audio/ur/concern_message_safety_ur.mp3',
  'prefers_audio': '/audio/ur/concern_prefers_audio_ur.mp3',
  'language_difficulty': '/audio/ur/concern_language_difficulty_ur.mp3',

  // Screen 3: Recommendation
  'rec_send-picture': '/audio/ur/rec_send_picture_ur.mp3',
  'rec_explore-maps': '/audio/ur/rec_maps_ur.mp3',
  'rec_safe-delete': '/audio/ur/rec_delete_ur.mp3',
  'rec_check-message': '/audio/ur/rec_check_message_ur.mp3',

  // Screen 4: Practice Intro
  'practice_intro': '/audio/ur/practice_intro_ur.mp3',
  'practiceIntro': '/audio/ur/practice_intro_ur.mp3',

  // Task A: Send Picture Steps
  'task_send-picture_0': '/audio/ur/task_send_picture_step1_ur.mp3',
  'task_send-picture_1': '/audio/ur/task_send_picture_step2_ur.mp3',
  'task_send-picture_2': '/audio/ur/task_send_picture_step3_ur.mp3',

  // Task B: Maps & Location Steps
  'task_explore-maps_0': '/audio/ur/task_maps_step1_ur.mp3',
  'task_explore-maps_1': '/audio/ur/task_maps_step2_ur.mp3',
  'task_explore-maps_2': '/audio/ur/task_maps_step3_ur.mp3',

  // Task C: Safe Delete Steps
  'task_safe-delete_0': '/audio/ur/task_delete_step1_ur.mp3',
  'task_safe-delete_1': '/audio/ur/task_delete_step2_ur.mp3',
  'task_safe-delete_2': '/audio/ur/task_delete_step3_ur.mp3',

  // Independent Attempt
  'independent_prompt': '/audio/ur/independent_prompt_ur.mp3',

  // Safety Scenarios
  'safety_0': '/audio/ur/safety_scenario1_ur.mp3',
  'safety_1': '/audio/ur/safety_scenario2_ur.mp3',

  // Summary Screen
  'summary': '/audio/ur/summary_ur.mp3',

  // Library Screen
  'library_intro': '/audio/ur/library_intro_ur.mp3',
  'library': '/audio/ur/library_intro_ur.mp3'
};

function resolveUrduAudioPath(text, audioKey) {
  if (audioKey && URDU_AUDIO_MAP[audioKey]) {
    return URDU_AUDIO_MAP[audioKey];
  }

  if (!text) return null;

  // Semantic keyword matcher for Urdu voiceover
  if (text.includes('خوش آمدید') || text.includes('UNSTUCK')) return URDU_AUDIO_MAP['welcome'];
  if (text.includes('مشکل') || text.includes('الجھن')) return URDU_AUDIO_MAP['fearMap'];
  if (text.includes('خلاصہ') || text.includes('مشق مکمل')) return URDU_AUDIO_MAP['summary'];
  if (text.includes('نقشے') || text.includes('لوکیشن') || text.includes('جگہ')) {
    if (text.includes('تلاش')) return URDU_AUDIO_MAP['task_explore-maps_0'];
    if (text.includes('شیئر')) return URDU_AUDIO_MAP['task_explore-maps_1'];
    if (text.includes('تصدیق')) return URDU_AUDIO_MAP['task_explore-maps_2'];
    return URDU_AUDIO_MAP['rec_explore-maps'];
  }
  if (text.includes('ڈیلیٹ') || text.includes('ہٹانا') || text.includes('کوڑے دان')) {
    if (text.includes('کوڑے دان') || text.includes('فولڈر')) return URDU_AUDIO_MAP['task_safe-delete_1'];
    if (text.includes('بحال') || text.includes('ریسٹور')) return URDU_AUDIO_MAP['task_safe-delete_2'];
    return URDU_AUDIO_MAP['task_safe-delete_0'];
  }
  if (text.includes('پیپر کلپ') || text.includes('منسلک کرنے والا بٹن')) return URDU_AUDIO_MAP['task_send_picture_step1_ur.mp3'] || URDU_AUDIO_MAP['task_send-picture_0'];
  if (text.includes('تصویر منتخب') || text.includes('ٹرے میں سے')) return URDU_AUDIO_MAP['task_send-picture_1'];
  if (text.includes('بھیجیں') || text.includes('تیر')) return URDU_AUDIO_MAP['task_send-picture_2'];
  if (text.includes('پاس ورڈ') || text.includes('کوڈ') || text.includes('او ٹی پی')) return URDU_AUDIO_MAP['safety_0'];
  if (text.includes('بینک') || text.includes('اکاؤنٹ')) return URDU_AUDIO_MAP['safety_1'];
  if (text.includes('محفوظ کھیل') || text.includes('مشق شروع')) return URDU_AUDIO_MAP['practiceIntro'];
  if (text.includes('تصویر بھیجیں') || text.includes('تصویر')) return URDU_AUDIO_MAP['rec_send-picture'];

  return null;
}

function loadVoices() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  }
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

export function isSpeechSupported() {
  return typeof window !== 'undefined';
}

export function stopSpeaking() {
  // Stop any active audio stream
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch {}
    activeAudio = null;
  }

  // Stop browser speech synthesis
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

export function speakText(text, language = 'en', onEnd = null, audioKey = null) {
  stopSpeaking();

  // RULE: Mute audio completely for Roman Urdu
  if (language === 'roman-ur') {
    if (onEnd) onEnd();
    return false;
  }

  if (!text) {
    if (onEnd) onEnd();
    return false;
  }

  // ── Handle Standard Urdu (اردو) via Studio Native MP3 Files ──
  if (language === 'ur') {
    const audioSrc = resolveUrduAudioPath(text, audioKey);
    if (audioSrc) {
      try {
        const audio = new Audio(audioSrc);
        activeAudio = audio;

        let finished = false;
        const finishCb = () => {
          if (!finished) {
            finished = true;
            activeAudio = null;
            if (onEnd) onEnd();
          }
        };

        audio.onended = finishCb;
        audio.onerror = (e) => {
          console.warn('Local Urdu audio load error, attempting WebSpeech fallback:', e);
          fallbackWebSpeech(text, 'ur-PK', onEnd);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Audio play prevented by browser:', err);
            fallbackWebSpeech(text, 'ur-PK', onEnd);
          });
        }
        return true;
      } catch (err) {
        console.warn('Audio playback initiation failed:', err);
      }
    }

    // Fallback to Web Speech API
    return fallbackWebSpeech(text, 'ur-PK', onEnd);
  }

  // ── Handle English (en) via Web Speech API ──
  return fallbackWebSpeech(text, 'en-US', onEnd);
}

function fallbackWebSpeech(text, targetLang = 'en-US', onEnd = null) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetLang;

      if (cachedVoices.length === 0) {
        loadVoices();
      }

      if (targetLang.startsWith('ur')) {
        const urduVoice = cachedVoices.find(v => {
          const l = (v.lang || '').toLowerCase();
          const n = (v.name || '').toLowerCase();
          return l.startsWith('ur') || l.includes('pk') || n.includes('urdu') || n.includes('pakistan');
        }) || cachedVoices.find(v => {
          const l = (v.lang || '').toLowerCase();
          return l.startsWith('hi');
        });

        if (urduVoice) {
          utterance.voice = urduVoice;
          utterance.lang = urduVoice.lang;
        }
        utterance.rate = 0.85;
      } else {
        const englishVoice = cachedVoices.find(v => {
          const l = (v.lang || '').toLowerCase();
          return l.startsWith('en-us') || l.startsWith('en');
        });
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
        utterance.rate = 0.9;
      }

      let finished = false;
      const finishCb = () => {
        if (!finished) {
          finished = true;
          if (onEnd) onEnd();
        }
      };

      utterance.onend = finishCb;
      utterance.onerror = finishCb;

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      console.warn('SpeechSynthesis error:', err);
      if (onEnd) onEnd();
      return false;
    }
  }

  if (onEnd) onEnd();
  return false;
}
