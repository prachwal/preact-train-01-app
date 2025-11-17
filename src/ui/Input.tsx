import { useRef, useState } from 'preact/hooks';
import type { InputProps } from '../types';
import { buildClassName } from '../types';
import type { JSX } from 'preact';

export const Input = ({
  type = 'text',
  name,
  value,
  defaultValue,
  placeholder,
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  readOnly = false,
  autoComplete,
  autoFocus = false,
  size = 'md',
  variant = 'outlined',
  theme,
  semanticState,
  borderRadius,
  borderWidth,
  maxLength,
  minLength,
  min,
  max,
  step,
  pattern,
  showCharacterCount = false,
  showClearButton = false,
  leftIcon,
  rightIcon,
  onChange,
  onInput,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onClear,
  className: additionalClassName,
  id: providedId,
  ...props
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState<string | number>(
    (value ?? defaultValue ?? '') as string | number
  );
  const [isFocused, setIsFocused] = useState(false);

  // Generate unique ID for accessibility
  const id = providedId || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${id}-error`;
  const helperTextId = `${id}-helper`;

  // Determine which value to use (controlled vs uncontrolled)
  const currentValue = value !== undefined ? value : internalValue;
  const hasValue =
    currentValue !== '' && currentValue !== null && currentValue !== undefined;

  // Build class names using BEM pattern
  const modifiers: Record<string, boolean | string | undefined> = {
    [size]: true,
    [variant]: true,
    error: !!error,
    disabled,
    focused: isFocused,
    'has-value': hasValue,
    'with-left-icon': !!leftIcon,
    'with-right-icon': !!rightIcon || showClearButton,
  };
  if (semanticState) modifiers[`state-${semanticState}`] = true;
  if (borderRadius) modifiers[`border-radius-${borderRadius}`] = true;
  if (borderWidth) modifiers[`border-width-${borderWidth}`] = true;

  const containerClassName = buildClassName('pta-input-container', {});
  const wrapperClassName = buildClassName('pta-input-wrapper', modifiers);
  const inputClassName = buildClassName('pta-input', {});
  const finalContainerClassName = additionalClassName
    ? `${containerClassName} ${additionalClassName}`
    : containerClassName;

  // Event handlers
  const handleChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const newValue = e.currentTarget.value;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(e);
  };

  const handleFocus = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleClear = () => {
    if (value === undefined) {
      setInternalValue('');
    }
    onClear?.();
    inputRef.current?.focus();
  };

  // Calculate character count
  const characterCount = currentValue ? String(currentValue).length : 0;
  const showCount = showCharacterCount && maxLength !== undefined;

  return (
    <div className={finalContainerClassName} data-theme={theme}>
      {label && (
        <label htmlFor={id} className="pta-input-label">
          {label}
          {required && <span className="pta-input-required">*</span>}
        </label>
      )}

      <div className={wrapperClassName}>
        {leftIcon && (
          <span className="pta-input-icon pta-input-icon--left">
            {leftIcon}
          </span>
        )}

        <input
          ref={inputRef}
          id={id}
          type={type}
          name={name}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          className={inputClassName}
          onChange={handleChange}
          onInput={onInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperTextId : undefined
          }
          {...props}
        />

        {showClearButton && hasValue && !disabled && !readOnly && (
          <button
            type="button"
            className="pta-input-clear"
            onClick={handleClear}
            aria-label="Clear input"
            tabIndex={-1}
          >
            ✕
          </button>
        )}

        {rightIcon && !showClearButton && (
          <span className="pta-input-icon pta-input-icon--right">
            {rightIcon}
          </span>
        )}
      </div>

      {/* Helper text or error message */}
      {error && typeof error === 'string' && (
        <div id={errorId} className="pta-input-error" role="alert">
          {error}
        </div>
      )}

      {!error && helperText && (
        <div id={helperTextId} className="pta-input-helper">
          {helperText}
        </div>
      )}

      {/* Character count */}
      {showCount && (
        <div className="pta-input-character-count">
          {characterCount} / {maxLength}
        </div>
      )}
    </div>
  );
};
