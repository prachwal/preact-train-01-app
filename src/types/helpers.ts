// ============================================
// HELPER FUNCTIONS
// ============================================

import type { Theme, Breakpoint } from './types';
import { BREAKPOINT_NUMBERS } from './constants';
import type { ThemeColors } from './interfaces';
import { THEME_COLORS } from './colors';

// Helper do pobierania CSS custom property
export const getCSSVariable = (name: string): string => {
  return `var(--${name})`;
};

// Helper do pobierania CSS custom property z fallback
export const getCSSVariableWithFallback = (
  name: string,
  fallback: string
): string => {
  return `var(--${name}, ${fallback})`;
};

// Helper do budowania nazw klas
export const buildClassName = (
  base: string,
  modifiers?: Record<string, boolean | string | undefined>
): string => {
  const classes = [base];

  if (modifiers) {
    Object.entries(modifiers).forEach(([key, value]) => {
      if (value === true) {
        classes.push(`${base}--${key}`);
      } else if (typeof value === 'string' && value) {
        classes.push(`${base}--${value}`);
      }
    });
  }

  return classes.join(' ');
};

// Helper do sprawdzania czy motyw to dark
export const isDarkTheme = (theme: Theme): boolean => {
  if (theme === 'dark') return true;
  if (theme === 'light') return false;
  // auto - sprawdź preferencje systemowe
  return typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false;
};

// Helper do konwersji rem na px (zakładając 16px base)
export const remToPx = (rem: number | string): number => {
  const numericValue = typeof rem === 'string' ? parseFloat(rem) : rem;
  return numericValue * 16;
};

// Helper do konwersji px na rem
export const pxToRem = (px: number): string => {
  return `${px / 16}rem`;
};

// Helper do pobierania koloru motywu
export const getThemeColor = (
  theme: Exclude<Theme, 'auto'>,
  colorKey: keyof ThemeColors
): string => {
  return THEME_COLORS[theme][colorKey];
};

// Helper do sprawdzania breakpointu
export const isBreakpoint = (breakpoint: Breakpoint): boolean => {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  const breakpointValue = BREAKPOINT_NUMBERS[breakpoint];

  switch (breakpoint) {
    case 'mobile':
      return width < BREAKPOINT_NUMBERS.tablet;
    case 'tablet':
      return (
        width >= BREAKPOINT_NUMBERS.tablet && width < BREAKPOINT_NUMBERS.desktop
      );
    case 'desktop':
      return (
        width >= BREAKPOINT_NUMBERS.desktop && width < BREAKPOINT_NUMBERS.large
      );
    case 'large':
      return width >= BREAKPOINT_NUMBERS.large;
    default:
      return false;
  }
};
