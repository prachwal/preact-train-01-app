import { createContext } from 'preact';
import { useState, useEffect } from 'preact/compat';
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
    const saved = localStorage.getItem('theme');
    return saved === 'light' || saved === 'dark' || saved === 'auto'
      ? saved
      : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      if (theme === 'auto') {
        document.documentElement.setAttribute(
          'data-theme',
          mediaQuery.matches ? 'dark' : 'light'
        );
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }
    };

    applyTheme();
    mediaQuery.addEventListener('change', applyTheme);

    return () => mediaQuery.removeEventListener('change', applyTheme);
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
