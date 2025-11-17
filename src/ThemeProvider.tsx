import { createContext } from 'preact';
import { useState, useEffect, useCallback } from 'preact/compat';
import type { Themes } from './types';

type ThemeContextType = {
  theme: Themes;
  setTheme: (theme: Themes) => void;
  nextTheme: (currentTheme: Themes) => Themes;
};

export const Theme = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {
    throw new Error('Theme.setTheme called outside ThemeProvider');
  },
  nextTheme: () => {
    throw new Error('Theme.nextTheme called outside ThemeProvider');
  },
});

function ThemeProvider({
  children,
  initialTheme,
}: {
  children: any;
  initialTheme?: Themes;
}) {
  const [theme, setTheme] = useState<Themes>(() => {
    if (initialTheme) return initialTheme;
    if (typeof window === 'undefined' || !window.localStorage) {
      return 'dark';
    }
    try {
      const saved = localStorage.getItem('theme');
      return saved === 'light' || saved === 'dark' || saved === 'auto'
        ? saved
        : 'dark';
    } catch (error) {
      console.warn('localStorage is not available:', error);
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'auto') {
        document.documentElement.setAttribute(
          'data-theme',
          mediaQuery.matches ? 'dark' : 'light'
        );
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const nextTheme = (currentTheme: Themes): Themes => {
    switch (currentTheme) {
      case 'dark':
        return 'light';
      case 'light':
        return 'auto';
      case 'auto':
        return 'dark';
    }
  };

  return (
    <Theme.Provider
      value={{
        theme,
        setTheme,
        nextTheme,
      }}
    >
      {children}
    </Theme.Provider>
  );
}

export default ThemeProvider;
