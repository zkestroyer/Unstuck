// Web Speech API coordinator with native Urdu cloud audio fallback and Roman-Urdu muting
let cachedVoices = [];
let activeAudio = null;

function loadVoices() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  }
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

export function isSpeechSupported() {
  return typeof window !== 'undefined';
}

export function stopSpeaking() {
  // Stop any active HTML5 audio stream
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

export function speakText(text, language = 'en', onEnd = null) {
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

  // Handle Standard Urdu (اردو)
  if (language === 'ur') {
    if (cachedVoices.length === 0) {
      loadVoices();
    }

    // Check if the host operating system has an actual Urdu voice installed
    const nativeUrduVoice = cachedVoices.find(v => {
      const lang = (v.lang || '').toLowerCase();
      const name = (v.name || '').toLowerCase();
      return lang.startsWith('ur') || lang.includes('pk') || name.includes('urdu') || name.includes('pakistan');
    });

    if (nativeUrduVoice && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = nativeUrduVoice;
        utterance.lang = nativeUrduVoice.lang;
        utterance.rate = 0.85;
        utterance.pitch = 1.0;

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
        console.warn('Native Urdu voice failed, trying cloud stream:', err);
      }
    }

    // Fallback: If OS lacks an Urdu voice pack (standard Windows), stream natural Urdu audio
    try {
      const cleanText = text.replace(/[*#_~]/g, '').trim().slice(0, 180);
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=ur&client=tw-ob`;
      const audio = new Audio(audioUrl);
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
        console.warn('Cloud Urdu audio failed or offline:', e);
        finishCb();
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((playErr) => {
          console.warn('Audio play prevented by browser policy:', playErr);
          finishCb();
        });
      }
      return true;
    } catch (streamErr) {
      console.warn('Urdu audio fallback unavailable:', streamErr);
      if (onEnd) onEnd();
      return false;
    }
  }

  // Handle English (en) via Web Speech API
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      if (cachedVoices.length === 0) {
        loadVoices();
      }

      const englishVoice = cachedVoices.find(v => {
        const lang = (v.lang || '').toLowerCase();
        return lang.startsWith('en-us') || lang.startsWith('en');
      });
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

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
      console.warn('English speech synthesis error:', err);
      if (onEnd) onEnd();
      return false;
    }
  }

  if (onEnd) onEnd();
  return false;
}
