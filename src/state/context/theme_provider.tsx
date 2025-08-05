import { useState, useEffect } from 'react';
import { ThemeContext } from './theme_context.tsx';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  function toggleTheme(theme: 'dark' | 'light') {
    setTheme(theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
