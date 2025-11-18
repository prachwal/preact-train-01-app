import { useRef, useState, useEffect } from 'preact/hooks';
import type { TextareaProps } from '../types';
import { buildClassName } from '../types';
import type { JSX } from 'preact';

export const Textarea = ({
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
  autoFocus = false,
  size = 'md',
  variant = 'outlined',
  theme,
  semanticState,
  borderRadius,
  borderWidth,
  maxLength,
  minLength,
  rows = 4,
  minRows,
  maxRows,
  autoResize = false,
  showCharacterCount = false,
  resize = 'vertical',
  onChange,
  onInput,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  className: additionalClassName,
  id: providedId,
  ...props
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [internalValue, setInternalValue] = useState<string>(
    (value ?? defaultValue ?? '') as string
  );
  const [isFocused, setIsFocused] = useState(false);

  // Generate unique ID for accessibility
  const id =
    providedId || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${id}-error`;
  const helperTextId = `${id}-helper`;

  // Determine which value to use (controlled vs uncontrolled)
  const currentValue = value !== undefined ? value : internalValue;
  const hasValue =
    currentValue !== '' && currentValue !== null && currentValue !== undefined;

  // Auto-resize functionality
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const computedRows = rows || minRows || 4;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const minHeight = computedRows * lineHeight;
      const maxHeight = maxRows ? maxRows * lineHeight : Infinity;

      textarea.style.height = `${Math.min(
        Math.max(scrollHeight, minHeight),
        maxHeight
      )}px`;
    }
  }, [currentValue, autoResize, rows, minRows, maxRows]);

  // Build class names using BEM pattern
  const modifiers: Record<string, boolean | string | undefined> = {
    [size]: true,
    [variant]: true,
    [`resize-${resize}`]: true,
    error: !!error,
    disabled,
    focused: isFocused,
    'has-value': hasValue,
    'auto-resize': autoResize,
  };
  if (semanticState) modifiers[`state-${semanticState}`] = true;
  if (borderRadius) modifiers[`border-radius-${borderRadius}`] = true;
  if (borderWidth) modifiers[`border-width-${borderWidth}`] = true;

  const containerClassName = buildClassName('pta-textarea-container', {});
  const wrapperClassName = buildClassName('pta-textarea-wrapper', modifiers);
  const textareaClassName = buildClassName('pta-textarea', {});
  const finalContainerClassName = additionalClassName
    ? `${containerClassName} ${additionalClassName}`
    : containerClassName;

  // Event handlers
  const handleChange = (e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) => {
    const newValue = e.currentTarget.value;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(e);
  };

  const handleInput = (e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) => {
    const newValue = e.currentTarget.value;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onInput?.(e);
  };

  const handleFocus = (e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Calculate character count
  const characterCount = currentValue ? String(currentValue).length : 0;
  const showCount = showCharacterCount || maxLength;

  return (
    <div className={finalContainerClassName} data-theme={theme}>
      {label && (
        <label htmlFor={id} className="pta-textarea-label">
          {label}
          {required && <span className="pta-textarea-required">*</span>}
        </label>
      )}
      <div className={wrapperClassName}>
        <textarea
          ref={textareaRef}
          id={id}
          name={name}
          className={textareaClassName}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          autoFocus={autoFocus}
          rows={rows}
          maxLength={maxLength}
          minLength={minLength}
          onChange={handleChange}
          onInput={handleInput}
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
      </div>
      <div className="pta-textarea-footer">
        {error && (
          <span id={errorId} className="pta-textarea-error" role="alert">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={helperTextId} className="pta-textarea-helper">
            {helperText}
          </span>
        )}
        {showCount && (
          <span className="pta-textarea-char-count">
            {characterCount}
            {maxLength && `/${maxLength}`}
          </span>
        )}
      </div>
    </div>
  );
};
