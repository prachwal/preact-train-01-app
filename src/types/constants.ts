// ============================================
// CONSTANTS
// ============================================

import type {
  SpacingSize,
  FontSize,
  BorderRadiusSize,
  Breakpoint,
  ThemeButtonSize,
} from './types';

// Konfiguracja spacing (w rem)
export const SPACING_VALUES: Record<SpacingSize, string> = {
  xs: '0.25rem',
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
} as const;

// Konfiguracja font sizes (w rem)
export const FONT_SIZE_VALUES: Record<FontSize, string> = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
} as const;

// Konfiguracja border-radius (w rem)
export const BORDER_RADIUS_VALUES: Record<BorderRadiusSize, string> = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
} as const;

// Konfiguracja breakpointów (w px)
export const BREAKPOINT_VALUES: Record<Breakpoint, string> = {
  mobile: '0px',
  tablet: '768px',
  desktop: '1024px',
  large: '1440px',
} as const;

// Konfiguracja breakpointów jako liczby (dla JS calculations)
export const BREAKPOINT_NUMBERS: Record<Breakpoint, number> = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  large: 1440,
} as const;

// Konfiguracja rozmiarów przycisku motywu (w px)
export const THEME_BUTTON_SIZE_VALUES: Record<ThemeButtonSize, string> = {
  tablet: '36px',
  desktop: '44px',
} as const;
