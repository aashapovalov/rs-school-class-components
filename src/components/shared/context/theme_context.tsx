import { createContext } from 'react';

type ThemeContextType = {
  theme: 'dark' | 'light';
  toggleTheme: (theme: 'dark' | 'light') => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
