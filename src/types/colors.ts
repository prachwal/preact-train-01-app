// ============================================
// LIGHT THEME COLORS
// ============================================

import type { ThemeColors } from './interfaces';
import type { Theme } from './types';

export const LIGHT_THEME_COLORS: ThemeColors = {
  // Base colors
  bg: '#ffffff',
  bgSecondary: '#f8f9fa',
  surface: '#f5f5f5',
  surfaceHover: '#eeeeee',

  // Text colors
  text: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textDisabled: '#bbbbbb',
  textMuted: '#6c757d',
  textInverted: '#ffffff',

  // Border colors
  border: '#000000',
  borderLight: '#e0e0e0',
  borderMedium: '#cccccc',
  borderHover: '#333333',
  borderFocus: '#6200ee',

  // Accent colors
  accent: '#6200ee',
  accentHover: '#3700b3',
  accentActive: '#230072',
  accentLight: '#e8d5ff',

  // Semantic colors
  success: '#28a745',
  successHover: '#218838',
  successLight: '#d4edda',

  error: '#dc3545',
  errorHover: '#c82333',
  errorLight: '#f8d7da',

  warning: '#ffc107',
  warningHover: '#e0a800',
  warningLight: '#fff3cd',

  info: '#17a2b8',
  infoHover: '#138496',
  infoLight: '#d1ecf1',

  // Button colors
  buttonPrimaryBg: '#6200ee',
  buttonPrimaryText: '#ffffff',
  buttonPrimaryHover: '#3700b3',

  buttonSecondaryBg: '#6c757d',
  buttonSecondaryText: '#ffffff',
  buttonSecondaryHover: '#5a6268',

  buttonSuccessBg: '#28a745',
  buttonSuccessText: '#ffffff',
  buttonSuccessHover: '#218838',

  buttonDangerBg: '#dc3545',
  buttonDangerText: '#ffffff',
  buttonDangerHover: '#c82333',

  buttonDisabledBg: '#e9ecef',
  buttonDisabledText: '#6c757d',

  // Link colors
  link: '#0066cc',
  linkHover: '#0052a3',
  linkVisited: '#800080',
  linkActive: '#cc0000',

  // Shadow & Overlay
  shadow: 'rgba(0, 0, 0, 0.15)',
  shadowMedium: 'rgba(0, 0, 0, 0.25)',
  shadowHeavy: 'rgba(0, 0, 0, 0.4)',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Focus
  focus: '#6200ee',
  focusRing: 'rgba(98, 0, 238, 0.25)',
} as const;

// ============================================
// DARK THEME COLORS
// ============================================

export const DARK_THEME_COLORS: ThemeColors = {
  // Base colors
  bg: '#121212',
  bgSecondary: '#1e1e1e',
  surface: '#2c2c2c',
  surfaceHover: '#383838',

  // Text colors
  text: '#ffffff',
  textSecondary: '#b3b3b3',
  textTertiary: '#808080',
  textDisabled: '#666666',
  textMuted: '#adb5bd',
  textInverted: '#000000',

  // Border colors
  border: '#ffffff',
  borderLight: '#3d3d3d',
  borderMedium: '#555555',
  borderHover: '#cccccc',
  borderFocus: '#bb86fc',

  // Accent colors
  accent: '#bb86fc',
  accentHover: '#9c4dcc',
  accentActive: '#7c2db3',
  accentLight: '#3e2558',

  // Semantic colors
  success: '#4caf50',
  successHover: '#66bb6a',
  successLight: '#1b5e20',

  error: '#f44336',
  errorHover: '#e57373',
  errorLight: '#b71c1c',

  warning: '#ffb300',
  warningHover: '#ffc107',
  warningLight: '#f57f17',

  info: '#29b6f6',
  infoHover: '#4fc3f7',
  infoLight: '#01579b',

  // Button colors
  buttonPrimaryBg: '#bb86fc',
  buttonPrimaryText: '#000000',
  buttonPrimaryHover: '#9c4dcc',

  buttonSecondaryBg: '#6c757d',
  buttonSecondaryText: '#ffffff',
  buttonSecondaryHover: '#828a91',

  buttonSuccessBg: '#4caf50',
  buttonSuccessText: '#000000',
  buttonSuccessHover: '#66bb6a',

  buttonDangerBg: '#f44336',
  buttonDangerText: '#ffffff',
  buttonDangerHover: '#e57373',

  buttonDisabledBg: '#2c2c2c',
  buttonDisabledText: '#666666',

  // Link colors
  link: '#64b5f6',
  linkHover: '#90caf9',
  linkVisited: '#ce93d8',
  linkActive: '#ef5350',

  // Shadow & Overlay
  shadow: 'rgba(0, 0, 0, 0.4)',
  shadowMedium: 'rgba(0, 0, 0, 0.6)',
  shadowHeavy: 'rgba(0, 0, 0, 0.8)',
  overlay: 'rgba(0, 0, 0, 0.7)',

  // Focus
  focus: '#bb86fc',
  focusRing: 'rgba(187, 134, 252, 0.25)',
} as const;

// ============================================
// THEME MAP
// ============================================

// Mapa wszystkich motywów
export const THEME_COLORS: Record<Exclude<Theme, 'auto'>, ThemeColors> = {
  light: LIGHT_THEME_COLORS,
  dark: DARK_THEME_COLORS,
} as const;
