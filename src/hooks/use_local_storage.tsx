import { useState, useEffect } from 'react';

export function useLocalStorage(key: string, value: string = '') {
  const [input, setInput] = useState(() => {
    return localStorage.getItem(key) || value;
  });

  useEffect(() => {
    localStorage.setItem(key, input.trim());
  }, [key, input]);

  return [input, setInput] as const;
}
