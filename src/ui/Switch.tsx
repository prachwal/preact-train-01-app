import { h } from 'preact';
import { buildClassName } from '../types';
import './Switch.scss';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  ariaLabel?: string;
  className?: string;
}

export function Switch({
  checked,
  onChange,
  disabled = false,
  label,
  ariaLabel,
  className,
}: SwitchProps) {
  console.log('🔄 Switch render:', { checked, disabled, label, ariaLabel });

  const baseClassName = buildClassName('pta-switch', {
    checked,
    disabled,
  });

  const handleClick = (e: MouseEvent) => {
    console.log('🖱️ Switch handleClick called, disabled:', disabled);
    e.preventDefault(); // Prevent label from triggering input
    if (!disabled) {
      const newChecked = !checked;
      console.log('🔄 Switch onChange called with:', newChecked);
      onChange(newChecked);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    console.log('⌨️ Switch handleKeyDown:', e.key, 'disabled:', disabled);
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const newChecked = !checked;
      console.log('🔄 Switch onChange called from keydown with:', newChecked);
      onChange(newChecked);
    }
  };

  return (
    <label
      className={className ? `${baseClassName} ${className}` : baseClassName}
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
