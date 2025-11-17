// ============================================
// TYPES
// ============================================

// Rozmiary spacing
export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Rozmiary font
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

// Rozmiary border-radius
export type BorderRadiusSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';

// Rozmiary border-width
export type BorderWidthSize = 'none' | 'thin' | 'medium' | 'thick';

// Rozmiary komponentów (przyciski, inputy, itp.)
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

// Breakpointy
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'large';

// Motywy
export type Theme = 'light' | 'dark' | 'auto';

// Warianty przycisków
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'disabled';

// Warianty kart
export type CardVariant = 'default' | 'elevated' | 'outlined';

// Stany semantyczne
export type SemanticState = 'success' | 'error' | 'warning' | 'info';

// Warianty cieni
export type ShadowVariant = 'none' | 'light' | 'medium' | 'heavy';

// Rozmiary przycisku motywu
export type ThemeButtonSize = 'tablet' | 'desktop';

// Warianty typografii
export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

// Kolory typografii
export type TypographyColor =
  | 'text'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

// Wyrównanie typografii
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

// Validation functions for type safety
export const isSpacingSize = (value: string): value is SpacingSize => {
  return ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value);
};

export const isFontSize = (value: string): value is FontSize => {
  return ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].includes(value);
};

export const isBorderRadiusSize = (
  value: string
): value is BorderRadiusSize => {
  return ['none', 'sm', 'md', 'lg', 'xl'].includes(value);
};

export const isBorderWidthSize = (value: string): value is BorderWidthSize => {
  return ['none', 'thin', 'medium', 'thick'].includes(value);
};

export const isComponentSize = (value: string): value is ComponentSize => {
  return ['sm', 'md', 'lg', 'xl'].includes(value);
};

export const isTheme = (value: string): value is Theme => {
  return ['light', 'dark', 'auto'].includes(value);
};

export const isButtonVariant = (value: string): value is ButtonVariant => {
  return ['primary', 'secondary', 'success', 'danger', 'disabled'].includes(
    value
  );
};

export const isCardVariant = (value: string): value is CardVariant => {
  return ['default', 'elevated', 'outlined'].includes(value);
};

export const isSemanticState = (value: string): value is SemanticState => {
  return ['success', 'error', 'warning', 'info'].includes(value);
};

export const isShadowVariant = (value: string): value is ShadowVariant => {
  return ['none', 'light', 'medium', 'heavy'].includes(value);
};

export const isTypographyVariant = (
  value: string
): value is TypographyVariant => {
  return [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'overline',
  ].includes(value);
};

export const isTypographyColor = (value: string): value is TypographyColor => {
  return [
    'text',
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
  ].includes(value);
};

export const isTypographyAlign = (value: string): value is TypographyAlign => {
  return ['left', 'center', 'right', 'justify'].includes(value);
};
