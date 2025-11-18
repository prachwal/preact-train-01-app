import { useState } from 'preact/hooks';
import type { RadioProps } from '../types';
import { buildClassName } from '../types';
import type { JSX } from 'preact';

export const Radio = ({
  name,
  value,
  checked,
  defaultChecked,
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  readOnly = false,
  size = 'md',
  variant = 'primary',
  theme,
  onChange,
  ariaLabel,
  className: additionalClassName,
  id: providedId,
  ...props
}: RadioProps) => {
  const [internalChecked, setInternalChecked] = useState<boolean>(
    checked ?? defaultChecked ?? false
  );

  // Generate unique ID for accessibility
  const id = providedId || `radio-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${id}-error`;
  const helperId = helperText ? `${id}-helper` : undefined;

  // Determine which checked state to use (controlled vs uncontrolled)
  const isChecked = checked !== undefined ? checked : internalChecked;

  // Build class names using BEM pattern
  const modifiers: Record<string, boolean | string | undefined> = {
    [size]: true,
    [variant]: true,
    checked: isChecked,
    error: !!error,
    disabled,
    'read-only': readOnly,
  };

  const containerClassName = buildClassName('pta-radio-container', {});
  const wrapperClassName = buildClassName('pta-radio-wrapper', modifiers);
  const inputClassName = buildClassName('pta-radio-input', {});
  const circleClassName = buildClassName('pta-radio-circle', {});
  const labelClassName = buildClassName('pta-radio-label', {});
  const finalContainerClassName = additionalClassName
    ? `${containerClassName} ${additionalClassName}`
    : containerClassName;

  // Event handler
  const handleChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const newChecked = e.currentTarget.checked;
    if (checked === undefined) {
      setInternalChecked(newChecked);
    }
    if (!readOnly) {
      onChange?.(newChecked, e);
    }
  };

  return (
    <div className={finalContainerClassName} data-theme={theme}>
      <label className={wrapperClassName}>
        <input
          type="radio"
          id={id}
          name={name}
          className={inputClassName}
          checked={isChecked}
          value={value}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          onChange={handleChange}
          aria-label={ariaLabel || label}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperId ? helperId : undefined}
          {...props}
        />
        <span className={circleClassName}>
          <span className="pta-radio-dot" />
        </span>
        {label && <span className={labelClassName}>{label}</span>}
      </label>
      {error && (
        <span id={errorId} className="pta-radio-error" role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={helperId} className="pta-radio-helper">
          {helperText}
        </span>
      )}
    </div>
  );
};
