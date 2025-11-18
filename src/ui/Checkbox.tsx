import { useState } from 'preact/hooks';
import type { CheckboxProps } from '../types';
import { buildClassName } from '../types';
import type { JSX } from 'preact';

export const Checkbox = ({
  name,
  checked,
  defaultChecked,
  indeterminate = false,
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  readOnly = false,
  size = 'md',
  variant = 'primary',
  theme,
  value,
  onChange,
  ariaLabel,
  className: additionalClassName,
  id: providedId,
  ...props
}: CheckboxProps) => {
  const [internalChecked, setInternalChecked] = useState<boolean>(
    checked ?? defaultChecked ?? false
  );

  // Generate unique ID for accessibility
  const id =
    providedId || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${id}-error`;
  const helperTextId = `${id}-helper`;

  // Determine which checked state to use (controlled vs uncontrolled)
  const isChecked = checked !== undefined ? checked : internalChecked;

  // Build class names using BEM pattern
  const modifiers: Record<string, boolean | string | undefined> = {
    [size]: true,
    [variant]: true,
    checked: isChecked,
    indeterminate,
    error: !!error,
    disabled,
    'read-only': readOnly,
  };

  const containerClassName = buildClassName('pta-checkbox-container', {});
  const wrapperClassName = buildClassName('pta-checkbox-wrapper', modifiers);
  const inputClassName = buildClassName('pta-checkbox-input', {});
  const checkmarkClassName = buildClassName('pta-checkbox-checkmark', {});
  const labelClassName = buildClassName('pta-checkbox-label', {});
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
          type="checkbox"
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
          aria-describedby={
            error ? errorId : helperText ? helperTextId : undefined
          }
          {...props}
        />
        <span className={checkmarkClassName}>
          {indeterminate ? (
            <svg viewBox="0 0 24 24" className="pta-checkbox-icon">
              <path d="M19 13H5v-2h14v2z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="pta-checkbox-icon">
              <path
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                fill="currentColor"
              />
            </svg>
          )}
        </span>
        {label && <span className={labelClassName}>{label}</span>}
      </label>
      {error && (
        <span id={errorId} className="pta-checkbox-error" role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={helperTextId} className="pta-checkbox-helper">
          {helperText}
        </span>
      )}
    </div>
  );
};
