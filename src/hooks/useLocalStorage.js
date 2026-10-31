import { useState, useEffect } from 'react';

const STORAGE_KEY = 'unstuck_session_v1';

export function useLocalStorage(initialValue) {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }
  }, [state]);

  const resetStorage = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore cleanup error
    }
    setState(initialValue);
  };

  return [state, setState, resetStorage];
}
