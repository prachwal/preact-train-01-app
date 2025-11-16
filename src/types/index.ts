// ============================================
// TYPES
// ============================================

// Rozmiary spacing
export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Rozmiary font
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

// Rozmiary border-radius
export type BorderRadiusSize = 'sm' | 'md' | 'lg' | 'xl';

// Rozmiary komponentów (przyciski, inputy, itp.)
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

// Breakpointy
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'large';

// Motywy
export type Theme = 'light' | 'dark' | 'auto';

// Warianty przycisków
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'disabled';

// Warianty kart
export type CardVariant = 'default' | 'elevated' | 'outlined';

// Stany semantyczne
export type SemanticState = 'success' | 'error' | 'warning' | 'info';

// Warianty cieni
export type ShadowVariant = 'light' | 'medium' | 'heavy';

// ============================================
// INTERFACES
// ============================================

// Rozszerzone kolory motywu
export interface ThemeColors {
  // Base colors
  bg: string;
  bgSecondary: string;
  surface: string;
  surfaceHover: string;

  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textMuted: string;
  textInverted: string;

  // Border colors
  border: string;
  borderLight: string;
  borderMedium: string;
  borderHover: string;
  borderFocus: string;

  // Accent colors
  accent: string;
  accentHover: string;
  accentActive: string;
  accentLight: string;

  // Semantic colors
  success: string;
  successHover: string;
  successLight: string;

  error: string;
  errorHover: string;
  errorLight: string;

  warning: string;
  warningHover: string;
  warningLight: string;

  info: string;
  infoHover: string;
  infoLight: string;

  // Button colors
  buttonPrimaryBg: string;
  buttonPrimaryText: string;
  buttonPrimaryHover: string;

  buttonSecondaryBg: string;
  buttonSecondaryText: string;
  buttonSecondaryHover: string;

  buttonSuccessBg: string;
  buttonSuccessText: string;
  buttonSuccessHover: string;

  buttonDangerBg: string;
  buttonDangerText: string;
  buttonDangerHover: string;

  buttonDisabledBg: string;
  buttonDisabledText: string;

  // Link colors
  link: string;
  linkHover: string;
  linkVisited: string;
  linkActive: string;

  // Shadow & Overlay
  shadow: string;
  shadowMedium: string;
  shadowHeavy: string;
  overlay: string;

  // Focus
  focus: string;
  focusRing: string;
}

// ============================================
// CONSTANTS
// ============================================

// Konfiguracja spacing (w rem)
export const SPACING_VALUES: Record<SpacingSize, string> = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
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
  sm: '0.3125rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
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

// ============================================
// LIGHT THEME COLORS
// ============================================

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

// ============================================
// HELPER FUNCTIONS
// ============================================

// Helper do pobierania CSS custom property
export const getCSSVariable = (name: string): string => {
  return `var(--${name})`;
};

// Helper do pobierania CSS custom property z fallback
export const getCSSVariableWithFallback = (name: string, fallback: string): string => {
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
      return width >= BREAKPOINT_NUMBERS.tablet && width < BREAKPOINT_NUMBERS.desktop;
    case 'desktop':
      return width >= BREAKPOINT_NUMBERS.desktop && width < BREAKPOINT_NUMBERS.large;
    case 'large':
      return width >= BREAKPOINT_NUMBERS.large;
    default:
      return false;
  }
};

// ============================================
// COMPONENT PROPS INTERFACES
// ============================================

// Typy dla props komponentów
export interface BaseComponentProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
  'data-theme'?: Theme;
}

export interface SizedComponentProps extends BaseComponentProps {
  size?: ComponentSize;
}

export interface ThemedComponentProps extends BaseComponentProps {
  theme?: Theme;
}

export interface ButtonComponentProps extends SizedComponentProps, ThemedComponentProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export interface CardComponentProps extends SizedComponentProps, ThemedComponentProps {
  variant?: CardVariant;
  semanticState?: SemanticState;
  shadow?: ShadowVariant;
  title?: string;
  children?: React.ReactNode;
}

export interface AlertComponentProps extends BaseComponentProps {
  variant?: SemanticState;
  dismissible?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
}

export interface LinkComponentProps extends BaseComponentProps {
  href: string;
  external?: boolean;
  visited?: boolean;
  children?: React.ReactNode;
}

// ============================================
// BACKWARDS COMPATIBILITY
// ============================================

// Export dla kompatybilności wstecznej
export type Size = ComponentSize;
export type Themes = Theme;