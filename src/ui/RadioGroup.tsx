import { useState } from 'preact/hooks';
import type { RadioGroupProps } from '../types';
import { buildClassName } from '../types';
import { Radio } from './Radio';

export const RadioGroup = ({
  name,
  options,
  value,
  defaultValue,
  label,
  error,
  helperText,
  disabled = false,
  required = false,
  readOnly = false,
  size = 'md',
  variant = 'primary',
  theme,
  direction = 'column',
  onChange,
  className: additionalClassName,
  id: providedId,
  ...props
}: RadioGroupProps) => {
  const [internalValue, setInternalValue] = useState<string>(
    value ?? defaultValue ?? ''
  );

  // Generate unique ID for accessibility
  const id =
    providedId || `radio-group-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${id}-error`;
  const helperTextId = `${id}-helper`;

  // Determine which value to use (controlled vs uncontrolled)
  const currentValue = value !== undefined ? value : internalValue;

  // Build class names using BEM pattern
  const modifiers: Record<string, boolean | string | undefined> = {
    [direction]: true,
    error: !!error,
    disabled,
  };

  const containerClassName = buildClassName('pta-radio-group-container', {});
  const groupClassName = buildClassName('pta-radio-group', modifiers);
  const finalContainerClassName = additionalClassName
    ? `${containerClassName} ${additionalClassName}`
    : containerClassName;

  // Event handler
  const handleChange = (optionValue: string) => {
    if (value === undefined) {
      setInternalValue(optionValue);
    }
    if (!readOnly) {
      onChange?.(optionValue);
    }
  };

  return (
    <div
      className={finalContainerClassName}
      data-theme={theme}
      role="radiogroup"
      aria-labelledby={label ? `${id}-label` : undefined}
      aria-describedby={error ? errorId : helperText ? helperTextId : undefined}
      aria-invalid={!!error}
      {...props}
    >
      {label && (
        <div id={`${id}-label`} className="pta-radio-group-label">
          {label}
          {required && <span className="pta-radio-group-required">*</span>}
        </div>
      )}
      <div className={groupClassName}>
        {options.map((option, index) => (
          <div key={option.value} className="pta-radio-group-item">
            <Radio
              name={name}
              value={option.value}
              checked={currentValue === option.value}
              label={option.label}
              disabled={Boolean(disabled || option.disabled)}
              required={required}
              readOnly={readOnly}
              size={size}
              variant={variant}
              {...(theme && { theme })}
              onChange={() => handleChange(option.value)}
              id={`${id}-option-${index}`}
            />
            {option.helperText && (
              <div className="pta-radio-group-item-helper">
                {option.helperText}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="pta-radio-group-footer">
        {error && (
          <span id={errorId} className="pta-radio-group-error" role="alert">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={helperTextId} className="pta-radio-group-helper">
            {helperText}
          </span>
        )}
      </div>
    </div>
  );
};
