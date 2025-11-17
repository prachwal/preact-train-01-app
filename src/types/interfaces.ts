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

// Validation function for ThemeColors interface
export const isValidThemeColors = (colors: any): colors is ThemeColors => {
  const requiredKeys: (keyof ThemeColors)[] = [
    'bg',
    'bgSecondary',
    'surface',
    'surfaceHover',
    'text',
    'textSecondary',
    'textTertiary',
    'textDisabled',
    'textMuted',
    'textInverted',
    'border',
    'borderLight',
    'borderMedium',
    'borderHover',
    'borderFocus',
    'accent',
    'accentHover',
    'accentActive',
    'accentLight',
    'success',
    'successHover',
    'successLight',
    'error',
    'errorHover',
    'errorLight',
    'warning',
    'warningHover',
    'warningLight',
    'info',
    'infoHover',
    'infoLight',
    'buttonPrimaryBg',
    'buttonPrimaryText',
    'buttonPrimaryHover',
    'buttonSecondaryBg',
    'buttonSecondaryText',
    'buttonSecondaryHover',
    'buttonSuccessBg',
    'buttonSuccessText',
    'buttonSuccessHover',
    'buttonDangerBg',
    'buttonDangerText',
    'buttonDangerHover',
    'buttonDisabledBg',
    'buttonDisabledText',
    'link',
    'linkHover',
    'linkVisited',
    'linkActive',
    'shadow',
    'shadowMedium',
    'shadowHeavy',
    'overlay',
    'focus',
    'focusRing',
  ];

  return requiredKeys.every(
    key => typeof colors[key] === 'string' && colors[key].length > 0
  );
};
