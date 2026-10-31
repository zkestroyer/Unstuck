import { useState, useEffect, useCallback } from 'react';
import { speakText, stopSpeaking, isSpeechSupported } from '../logic/speechUtils';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const supported = isSpeechSupported();

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const speak = useCallback((text, lang = 'en', audioKey = null) => {
    if (!text || !supported) return;

    setIsPlaying(true);
    speakText(text, lang, () => {
      setIsPlaying(false);
    }, audioKey);
  }, [supported]);

  const stop = useCallback(() => {
    stopSpeaking();
    setIsPlaying(false);
  }, []);

  return {
    speak,
    stop,
    isPlaying,
    supported
  };
}
