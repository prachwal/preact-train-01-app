// ============================================
// COMPONENT PROPS INTERFACES
// ============================================

import type { ComponentChildren } from 'preact';
import type { CSSProperties } from 'preact/compat';
import type { JSX } from 'preact';

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
  children?: ComponentChildren;
}

export interface ButtonProps extends BaseComponentProps {
  size?: ComponentSize;
  theme?: Theme;
  variant?: ButtonVariant;
  semanticState?: SemanticState;
  shadow?: ShadowVariant;
  borderRadius?: BorderRadiusSize;
  borderWidth?: BorderWidthSize;
  disabled?: boolean;
  onClick?: (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => void;
  children: ComponentChildren;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps extends BaseComponentProps {
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

export interface SwitchProps extends BaseComponentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  ariaLabel?: string;
  size?: ComponentSize;
  theme?: Theme;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'disabled';
  semanticState?: SemanticState;
  shadow?: ShadowVariant;
  borderRadius?: BorderRadiusSize;
  borderWidth?: BorderWidthSize;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ComponentChildren;
  size?: 'sm' | 'md' | 'lg';
}

export interface HamburgerProps extends BaseComponentProps {
  isOpen?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

export interface ThemeIconProps extends BaseComponentProps {
  theme: Theme;
}

// Validation functions for component props
export const isValidBaseComponentProps = (
  props: unknown
): props is BaseComponentProps => {
  if (typeof props !== 'object' || props === null) return false;
  const p = props as Record<string, unknown>;
  if (p.className !== undefined && typeof p.className !== 'string')
    return false;
  if (p.id !== undefined && typeof p.id !== 'string') return false;
  if (p['data-testid'] !== undefined && typeof p['data-testid'] !== 'string')
    return false;
  if (
    p['data-theme'] !== undefined &&
    !['light', 'dark', 'auto'].includes(p['data-theme'] as string)
  )
    return false;
  return true;
};

export const isValidButtonProps = (props: unknown): props is ButtonProps => {
  if (!isValidBaseComponentProps(props)) return false;
  const p = props as Record<string, unknown>;
  if (
    p.size !== undefined &&
    !['sm', 'md', 'lg', 'xl'].includes(p.size as string)
  )
    return false;
  if (
    p.theme !== undefined &&
    !['light', 'dark', 'auto'].includes(p.theme as string)
  )
    return false;
  if (
    p.variant !== undefined &&
    !['primary', 'secondary', 'success', 'danger', 'disabled'].includes(
      p.variant as string
    )
  )
    return false;
  if (
    p.semanticState !== undefined &&
    !['success', 'error', 'warning', 'info'].includes(p.semanticState as string)
  )
    return false;
  if (
    p.shadow !== undefined &&
    !['none', 'light', 'medium', 'heavy'].includes(p.shadow as string)
  )
    return false;
  if (
    p.borderRadius !== undefined &&
    !['none', 'sm', 'md', 'lg', 'xl'].includes(p.borderRadius as string)
  )
    return false;
  if (
    p.borderWidth !== undefined &&
    !['none', 'thin', 'medium', 'thick'].includes(p.borderWidth as string)
  )
    return false;
  if (p.disabled !== undefined && typeof p.disabled !== 'boolean') return false;
  if (p.onClick !== undefined && typeof p.onClick !== 'function') return false;
  if (
    p.children !== undefined &&
    typeof p.children !== 'string' &&
    !Array.isArray(p.children)
  )
    return false;
  return true;
};

export const isValidSizedComponentProps = (
  props: unknown
): props is SizedComponentProps => {
  if (!isValidBaseComponentProps(props)) return false;
  const p = props as Record<string, unknown>;
  let isValid = true;

  if (
    p.size !== undefined &&
    !['sm', 'md', 'lg', 'xl'].includes(p.size as string)
  )
    isValid = false;

  return isValid;
};

export const isValidThemedComponentProps = (
  props: unknown
): props is ThemedComponentProps => {
  if (!isValidBaseComponentProps(props)) return false;
  const p = props as Record<string, unknown>;
  let isValid = true;

  if (
    p.theme !== undefined &&
    !['light', 'dark', 'auto'].includes(p.theme as string)
  )
    isValid = false;

  return isValid;
};

export const isValidGridComponentProps = (
  props: unknown
): props is GridComponentProps => {
  if (!isValidBaseComponentProps(props)) return false;
  const p = props as Record<string, unknown>;
  let isValid = true;

  if (p.mode !== undefined && !['flex', 'grid'].includes(p.mode as string))
    isValid = false;
  if (
    p.direction !== undefined &&
    !['row', 'column', 'row-reverse', 'column-reverse'].includes(
      p.direction as string
    )
  )
    isValid = false;
  if (
    p.justify !== undefined &&
    !['start', 'center', 'end', 'between', 'around', 'evenly'].includes(
      p.justify as string
    )
  )
    isValid = false;
  if (
    p.align !== undefined &&
    !['start', 'center', 'end', 'stretch', 'baseline'].includes(
      p.align as string
    )
  )
    isValid = false;
  if (
    p.gap !== undefined &&
    !['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(p.gap as string)
  )
    isValid = false;
  if (p.wrap !== undefined && typeof p.wrap !== 'boolean') isValid = false;
  if (
    p.gridTemplateColumns !== undefined &&
    typeof p.gridTemplateColumns !== 'string'
  )
    isValid = false;
  if (
    p.gridTemplateRows !== undefined &&
    typeof p.gridTemplateRows !== 'string'
  )
    isValid = false;
  if (
    p.gridAutoFlow !== undefined &&
    !['row', 'column', 'dense', 'row dense', 'column dense'].includes(
      p.gridAutoFlow as string
    )
  )
    isValid = false;
  if (
    p.as !== undefined &&
    ![
      'div',
      'section',
      'article',
      'main',
      'aside',
      'header',
      'footer',
    ].includes(p.as as string)
  )
    isValid = false;
  if (p.children !== undefined) {
    if (typeof p.children !== 'string' && !Array.isArray(p.children)) {
      isValid = false;
    }
  }

  return isValid;
};

export const isValidCardProps = (props: unknown): props is CardProps => {
  if (!isValidBaseComponentProps(props)) return false;
  const p = props as Record<string, unknown>;
  let isValid = true;

  if (
    p.size !== undefined &&
    !['sm', 'md', 'lg', 'xl'].includes(p.size as string)
  )
    isValid = false;
  if (
    p.theme !== undefined &&
    !['light', 'dark', 'auto'].includes(p.theme as string)
  )
    isValid = false;
  if (
    p.variant !== undefined &&
    !['default', 'elevated', 'outlined'].includes(p.variant as string)
  )
    isValid = false;
  if (
    p.semanticState !== undefined &&
    !['success', 'error', 'warning', 'info'].includes(p.semanticState as string)
  )
    isValid = false;
  if (
    p.shadow !== undefined &&
    !['none', 'light', 'medium', 'heavy'].includes(p.shadow as string)
  )
    isValid = false;
  if (
    p.borderRadius !== undefined &&
    !['none', 'sm', 'md', 'lg', 'xl'].includes(p.borderRadius as string)
  )
    isValid = false;
  if (
    p.borderWidth !== undefined &&
    !['none', 'thin', 'medium', 'thick'].includes(p.borderWidth as string)
  )
    isValid = false;
  if (p.title !== undefined && typeof p.title !== 'string') isValid = false;
  if (
    p.headerLevel !== undefined &&
    (typeof p.headerLevel !== 'number' ||
      ![1, 2, 3, 4, 5, 6].includes(p.headerLevel))
  )
    isValid = false;
  if (
    p.as !== undefined &&
    ![
      'div',
      'section',
      'article',
      'main',
      'aside',
      'header',
      'footer',
    ].includes(p.as as string)
  )
    isValid = false;
  if (p.style !== undefined && typeof p.style !== 'object') isValid = false;
  if (p.children !== undefined) {
    if (typeof p.children !== 'string' && !Array.isArray(p.children)) {
      isValid = false;
    }
  }

  return isValid;
};

export const isValidTypographyProps = (
  props: unknown
): props is TypographyProps => {
  if (!isValidBaseComponentProps(props)) return false;
  const p = props as Record<string, unknown>;
  let isValid = true;

  if (
    p.variant !== undefined &&
    ![
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
    ].includes(p.variant as string)
  )
    isValid = false;
  if (
    p.color !== undefined &&
    ![
      'text',
      'primary',
      'secondary',
      'error',
      'warning',
      'info',
      'success',
    ].includes(p.color as string)
  )
    isValid = false;
  if (
    p.align !== undefined &&
    !['left', 'center', 'right', 'justify'].includes(p.align as string)
  )
    isValid = false;
  if (p.gutterBottom !== undefined && typeof p.gutterBottom !== 'boolean')
    isValid = false;
  if (p.noWrap !== undefined && typeof p.noWrap !== 'boolean') isValid = false;
  if (p.style !== undefined && typeof p.style !== 'object') isValid = false;
  if (p.children !== undefined) {
    if (typeof p.children !== 'string' && !Array.isArray(p.children)) {
      isValid = false;
    }
  }

  return isValid;
};
