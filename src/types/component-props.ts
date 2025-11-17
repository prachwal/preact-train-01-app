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

export interface InputProps extends BaseComponentProps {
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'date'
    | 'time'
    | 'datetime-local';
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string | boolean;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  size?: ComponentSize;
  variant?: 'outlined' | 'filled' | 'standard';
  theme?: Theme;
  semanticState?: SemanticState;
  borderRadius?: BorderRadiusSize;
  borderWidth?: BorderWidthSize;
  maxLength?: number;
  minLength?: number;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
  showCharacterCount?: boolean;
  showClearButton?: boolean;
  leftIcon?: ComponentChildren;
  rightIcon?: ComponentChildren;
  onChange?: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void;
  onInput?: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void;
  onFocus?: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void;
  onBlur?: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void;
  onKeyDown?: (e: JSX.TargetedKeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: JSX.TargetedKeyboardEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps extends BaseComponentProps {
  name?: string;
  value?: string | number | Array<string | number>;
  defaultValue?: string | number | Array<string | number>;
  options: SelectOption[] | SelectOptionGroup[];
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string | boolean;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  size?: ComponentSize;
  variant?: 'outlined' | 'filled' | 'standard';
  theme?: Theme;
  semanticState?: SemanticState;
  borderRadius?: BorderRadiusSize;
  borderWidth?: BorderWidthSize;
  maxHeight?: number;
  noOptionsMessage?: string;
  loadingMessage?: string;
  isLoading?: boolean;
  onChange?: (value: string | number | Array<string | number> | null) => void;
  onFocus?: (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => void;
  onBlur?: (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => void;
  onSearch?: (searchTerm: string) => void;
}

// Helper functions for validation
const isString = (value: unknown): boolean =>
  value === undefined || typeof value === 'string';

const isBoolean = (value: unknown): boolean =>
  value === undefined || typeof value === 'boolean';

const isFunction = (value: unknown): boolean =>
  value === undefined || typeof value === 'function';

const isOneOf = (value: unknown, allowed: string[]): boolean =>
  value === undefined || (typeof value === 'string' && allowed.includes(value));

const isComponentChildren = (value: unknown): boolean =>
  value === undefined ||
  typeof value === 'string' ||
  (Array.isArray(value) &&
    value.every(item => typeof item === 'string' || typeof item === 'object'));

// Validation functions for component props
export const isValidBaseComponentProps = (
  props: unknown
): props is BaseComponentProps => {
  if (typeof props !== 'object' || props === null) return false;
  const p = props as Record<string, unknown>;
  return (
    isString(p.className) &&
    isString(p.id) &&
    isString(p['data-testid']) &&
    isOneOf(p['data-theme'], ['light', 'dark', 'auto'])
  );
};

export const isValidButtonProps = (props: unknown): props is ButtonProps => {
  if (!isValidBaseComponentProps(props)) return false;
  const p = props as Record<string, unknown>;
  return (
    isOneOf(p.size, ['sm', 'md', 'lg', 'xl']) &&
    isOneOf(p.theme, ['light', 'dark', 'auto']) &&
    isOneOf(p.variant, [
      'primary',
      'secondary',
      'success',
      'danger',
      'disabled',
    ]) &&
    isOneOf(p.semanticState, ['success', 'error', 'warning', 'info']) &&
    isOneOf(p.shadow, ['none', 'light', 'medium', 'heavy']) &&
    isOneOf(p.borderRadius, ['none', 'sm', 'md', 'lg', 'xl']) &&
    isOneOf(p.borderWidth, ['none', 'thin', 'medium', 'thick']) &&
    isBoolean(p.disabled) &&
    isFunction(p.onClick) &&
    isComponentChildren(p.children)
  );
};

export const isValidSizedComponentProps = (
  props: unknown
): props is SizedComponentProps => {
  return (
    isValidBaseComponentProps(props) &&
    isOneOf((props as Record<string, unknown>).size, ['sm', 'md', 'lg', 'xl'])
  );
};

export const isValidThemedComponentProps = (
  props: unknown
): props is ThemedComponentProps => {
  return (
    isValidBaseComponentProps(props) &&
    isOneOf((props as Record<string, unknown>).theme, ['light', 'dark', 'auto'])
  );
};

export const isValidGridComponentProps = (
  props: unknown
): props is GridComponentProps => {
  if (!isValidBaseComponentProps(props)) return false;
  const p = props as Record<string, unknown>;
  return (
    isOneOf(p.mode, ['flex', 'grid']) &&
    isOneOf(p.direction, ['row', 'column', 'row-reverse', 'column-reverse']) &&
    isOneOf(p.justify, [
      'start',
      'center',
      'end',
      'between',
      'around',
      'evenly',
    ]) &&
    isOneOf(p.align, ['start', 'center', 'end', 'stretch', 'baseline']) &&
    isOneOf(p.gap, ['xs', 'sm', 'md', 'lg', 'xl', '2xl']) &&
    isBoolean(p.wrap) &&
    isString(p.gridTemplateColumns) &&
    isString(p.gridTemplateRows) &&
    isOneOf(p.gridAutoFlow, [
      'row',
      'column',
      'dense',
      'row dense',
      'column dense',
    ]) &&
    isOneOf(p.as, [
      'div',
      'section',
      'article',
      'main',
      'aside',
      'header',
      'footer',
    ]) &&
    isComponentChildren(p.children)
  );
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

/**
 * Props for ToggleButton component
 * Universal toggle component supporting multiple display variants
 */
export interface ToggleItem {
  /** Unique value for the item */
  value: string;
  /** Optional display label */
  label?: string;
  /** Optional icon (ComponentChild - can be JSX, string, or null) */
  icon?: ComponentChildren;
  /** Optional ARIA label for accessibility */
  ariaLabel?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
}

export interface ToggleButtonProps extends BaseComponentProps {
  /** List of items to toggle between */
  items: ToggleItem[];
  /** Currently selected value */
  value: string;
  /** Callback when value changes */
  onChange: (value: string) => void;
  /** Display variant - determines how the toggle is rendered */
  variant?: 'icon' | 'text' | 'icon-text' | 'dropdown' | 'carousel';
  /** Size of the toggle button */
  size?: ComponentSize;
  /** ARIA label for the entire toggle button */
  ariaLabel?: string;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Theme override */
  theme?: Theme;
}
