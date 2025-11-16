import type { ButtonVariant, ComponentSize, SemanticState, ShadowVariant, Theme } from '../types';
import { buildClassName } from '../types';

interface ButtonProps {
  size?: ComponentSize;
  theme?: Theme;
  variant?: ButtonVariant;
  semanticState?: SemanticState;
  shadow?: ShadowVariant;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = ({ 
  size = 'md', 
  theme, 
  variant,
  semanticState,
  shadow,
  disabled = false,
  onClick, 
  children,
  className: additionalClassName,
  ...props
}: ButtonProps & { className?: string }) => {
  const modifiers: Record<string, boolean | string | undefined> = { [size]: true };
  if (variant) modifiers[variant] = true;
  if (semanticState) modifiers[`state-${semanticState}`] = true;
  if (shadow) modifiers[shadow] = true;
  if (disabled) modifiers.disabled = true;
  
  const baseClassName = buildClassName('pta-button', modifiers);
  const finalClassName = additionalClassName ? `${baseClassName} ${additionalClassName}` : baseClassName;
  
  return (
    <button 
      className={finalClassName}
      data-theme={theme}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};