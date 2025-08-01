import { useState, useEffect } from 'react';

export function useLocalStorage(key: string, fallback: string) {
  const [input, setInput] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored !== null ? stored : fallback;
  });

  useEffect(() => {
    localStorage.setItem(key, input.trim());
  }, [key, input]);

  return [input, setInput] as const;
}
