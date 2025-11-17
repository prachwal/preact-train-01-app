import type { ButtonProps } from '../types';
import { buildClassName } from '../types';

export const Button = ({
  size = 'md',
  theme,
  variant,
  semanticState,
  shadow,
  borderRadius,
  borderWidth,
  disabled = false,
  onClick,
  children,
  className: additionalClassName,
  ...props
}: ButtonProps) => {
  const modifiers: Record<string, boolean | string | undefined> = {
    [size]: true,
  };
  if (variant) modifiers[variant] = true;
  if (semanticState) modifiers[`state-${semanticState}`] = true;
  if (shadow) modifiers[shadow] = true;
  if (borderRadius) modifiers[`border-radius-${borderRadius}`] = true;
  if (borderWidth) modifiers[`border-width-${borderWidth}`] = true;
  if (disabled) modifiers.disabled = true;

  const baseClassName = buildClassName('pta-button', modifiers);
  const finalClassName = additionalClassName
    ? `${baseClassName} ${additionalClassName}`
    : baseClassName;

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
