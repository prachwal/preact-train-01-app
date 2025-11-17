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
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

// Wyrównanie typografii
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
