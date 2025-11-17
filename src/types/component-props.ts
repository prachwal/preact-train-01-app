// ============================================
// COMPONENT PROPS INTERFACES
// ============================================

import type { ComponentChildren } from 'preact';
import type { CSSProperties } from 'preact/compat';
import type {
  ComponentSize,
  Theme,
  ButtonVariant,
  CardVariant,
  SemanticState,
  ShadowVariant,
  SpacingSize,
  BorderRadiusSize,
  BorderWidthSize,
  TypographyVariant,
  TypographyColor,
  TypographyAlign,
} from './types';

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

export interface GridComponentProps extends BaseComponentProps {
  mode?: 'flex' | 'grid';
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  gap?: SpacingSize;
  wrap?: boolean;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridAutoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
  className?: string;
  children?: ComponentChildren;
}

export interface ButtonProps {
  size?: ComponentSize;
  theme?: Theme;
  variant?: ButtonVariant;
  semanticState?: SemanticState;
  shadow?: ShadowVariant;
  borderRadius?: BorderRadiusSize;
  borderWidth?: BorderWidthSize;
  disabled?: boolean;
  onClick?: () => void;
  children: ComponentChildren;
  className?: string;
}

export interface CardProps {
  size?: ComponentSize;
  theme?: Theme;
  variant?: CardVariant;
  semanticState?: SemanticState;
  shadow?: ShadowVariant;
  borderRadius?: BorderRadiusSize;
  borderWidth?: BorderWidthSize;
  title?: string;
  headerLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
  style?: CSSProperties;
  children?: ComponentChildren;
  className?: string;
}

export interface TypographyProps extends BaseComponentProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: TypographyAlign;
  gutterBottom?: boolean;
  noWrap?: boolean;
  style?: CSSProperties;
  children?: ComponentChildren;
}
