import { buildClassName } from '../types';
import type { SwitchProps } from '../types/component-props';

export function Switch({
  checked,
  onChange,
  disabled = false,
  label,
  ariaLabel,
  className,
  size = 'md',
  theme,
  variant,
  semanticState,
  shadow,
  borderRadius,
  borderWidth,
}: SwitchProps) {
  const modifiers: Record<string, boolean | string | undefined> = {
    [size]: true,
    checked,
    disabled,
  };
  if (variant) modifiers[variant] = true;
  if (semanticState) modifiers[`state-${semanticState}`] = true;
  if (shadow) modifiers[shadow] = true;
  if (borderRadius) modifiers[`border-radius-${borderRadius}`] = true;
  if (borderWidth) modifiers[`border-width-${borderWidth}`] = true;

  const baseClassName = buildClassName('pta-switch', modifiers);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault(); // Prevent label from triggering input
    if (!disabled) {
      const newChecked = !checked;
      onChange(newChecked);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const newChecked = !checked;
      onChange(newChecked);
    }
  };

  return (
    <label
      className={className ? `${baseClassName} ${className}` : baseClassName}
      data-theme={theme}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel || label}
        className="pta-switch__input"
      />
      <span
        className="pta-switch__slider"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        <span className="pta-switch__thumb" />
        <span className="pta-switch__label pta-switch__label--on">On</span>
        <span className="pta-switch__label pta-switch__label--off">Off</span>
      </span>
      {label && <span className="pta-switch__text">{label}</span>}
    </label>
  );
}
