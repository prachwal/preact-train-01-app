// ============================================
// COMPONENT PROPS INTERFACES
// ============================================

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

export interface ButtonComponentProps
  extends SizedComponentProps,
    ThemedComponentProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  shadow?: ShadowVariant;
  borderRadius?: BorderRadiusSize;
  borderWidth?: BorderWidthSize;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export interface CardComponentProps
  extends SizedComponentProps,
    ThemedComponentProps {
  variant?: CardVariant;
  semanticState?: SemanticState;
  shadow?: ShadowVariant;
  borderRadius?: BorderRadiusSize;
  borderWidth?: BorderWidthSize;
  title?: string;
  children?: React.ReactNode;
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
  children: React.ReactNode;
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
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface TypographyProps extends BaseComponentProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: TypographyAlign;
  gutterBottom?: boolean;
  noWrap?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
