import { useRef, useState, useEffect } from 'preact/hooks';
import type { SelectProps, SelectOption, SelectOptionGroup } from '../types';
import { buildClassName } from '../types';
import type { JSX } from 'preact';

const isOptionGroup = (
  item: SelectOption | SelectOptionGroup
): item is SelectOptionGroup => {
  return 'options' in item;
};

export const Select = ({
  name,
  value,
  defaultValue,
  options,
  placeholder = 'Select an option',
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  multiple = false,
  searchable = false,
  clearable = false,
  size = 'md',
  variant = 'outlined',
  theme,
  semanticState,
  borderRadius,
  borderWidth,
  maxHeight = 300,
  noOptionsMessage = 'No options available',
  loadingMessage = 'Loading...',
  isLoading = false,
  onChange,
  onFocus,
  onBlur,
  onSearch,
  className: additionalClassName,
  id: providedId,
  ...props
}: SelectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState<
    string | number | Array<string | number>
  >((value ?? defaultValue ?? (multiple ? [] : '')) as any);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Generate unique ID for accessibility
  const id = providedId || `select-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${id}-error`;
  const helperTextId = `${id}-helper`;
  const listboxId = `${id}-listbox`;

  // Determine which value to use (controlled vs uncontrolled)
  const currentValue = value !== undefined ? value : internalValue;

  // Flatten options for easier processing
  const flatOptions: SelectOption[] = [];
  options.forEach(item => {
    if (isOptionGroup(item)) {
      flatOptions.push(...item.options);
    } else {
      flatOptions.push(item);
    }
  });

  // Filter options based on search term
  const filteredOptions =
    searchable && searchTerm
      ? flatOptions.filter(opt =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : flatOptions;

  // Get selected option(s) label
  const getSelectedLabel = (): string => {
    if (multiple && Array.isArray(currentValue)) {
      if (currentValue.length === 0) return placeholder;
      const selectedOptions = flatOptions.filter(opt =>
        currentValue.includes(opt.value)
      );
      return selectedOptions.map(opt => opt.label).join(', ');
    } else {
      const selectedOption = flatOptions.find(
        opt => opt.value === currentValue
      );
      return selectedOption ? selectedOption.label : placeholder;
    }
  };

  // Build class names using BEM pattern
  const modifiers: Record<string, boolean | string | undefined> = {
    [size]: true,
    [variant]: true,
    error: !!error,
    disabled,
    open: isOpen,
    multiple,
    searchable,
  };
  if (semanticState) modifiers[`state-${semanticState}`] = true;
  if (borderRadius) modifiers[`border-radius-${borderRadius}`] = true;
  if (borderWidth) modifiers[`border-width-${borderWidth}`] = true;

  const containerClassName = buildClassName('pta-select-container', {});
  const wrapperClassName = buildClassName('pta-select-wrapper', modifiers);
  const triggerClassName = buildClassName('pta-select-trigger', {});
  const finalContainerClassName = additionalClassName
    ? `${containerClassName} ${additionalClassName}`
    : containerClassName;

  // Handle option selection
  const handleSelect = (optionValue: string | number) => {
    let newValue: string | number | Array<string | number>;

    if (multiple) {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      if (currentArray.includes(optionValue)) {
        newValue = currentArray.filter(v => v !== optionValue);
      } else {
        newValue = [...currentArray, optionValue];
      }
    } else {
      newValue = optionValue;
      setIsOpen(false);
    }

    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  // Handle clear
  const handleClear = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newValue = multiple ? [] : null;
    if (value === undefined) {
      setInternalValue(newValue as any);
    }
    onChange?.(newValue);
  };

  // Handle search
  const handleSearch = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const term = e.currentTarget.value;
    setSearchTerm(term);
    onSearch?.(term);
    setHighlightedIndex(-1);
  };

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          setIsOpen(true);
          e.preventDefault();
        } else if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          const option = filteredOptions[highlightedIndex];
          if (option && !option.disabled) {
            handleSelect(option.value);
            e.preventDefault();
          }
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        e.preventDefault();
        break;
      case 'ArrowDown':
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        e.preventDefault();
        break;
      case 'ArrowUp':
        if (isOpen) {
          setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
        }
        e.preventDefault();
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Check if option is selected
  const isSelected = (optionValue: string | number): boolean => {
    if (multiple && Array.isArray(currentValue)) {
      return currentValue.includes(optionValue);
    }
    return currentValue === optionValue;
  };

  // Render options
  const renderOptions = () => {
    if (isLoading) {
      return (
        <div className="pta-select-loading" role="status">
          {loadingMessage}
        </div>
      );
    }

    if (filteredOptions.length === 0) {
      return (
        <div className="pta-select-no-options" role="status">
          {noOptionsMessage}
        </div>
      );
    }

    return filteredOptions.map((option, index) => {
      const selected = isSelected(option.value);
      const highlighted = index === highlightedIndex;
      const optionClassName = buildClassName('pta-select-option', {
        selected,
        highlighted,
        disabled: option.disabled,
      });

      return (
        <div
          key={option.value}
          className={optionClassName}
          role="option"
          aria-selected={selected}
          aria-disabled={option.disabled}
          onClick={() => !option.disabled && handleSelect(option.value)}
          onMouseEnter={() => setHighlightedIndex(index)}
        >
          {multiple && (
            <span className="pta-select-checkbox">{selected ? '☑' : '☐'}</span>
          )}
          <span className="pta-select-option-label">{option.label}</span>
        </div>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className={finalContainerClassName}
      data-theme={theme}
    >
      {label && (
        <label htmlFor={id} className="pta-select-label">
          {label}
          {required && <span className="pta-select-required">*</span>}
        </label>
      )}

      <div className={wrapperClassName}>
        <button
          id={id}
          type="button"
          className={triggerClassName}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown as any}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperTextId : undefined
          }
          {...props}
        >
          <span className="pta-select-value">{getSelectedLabel()}</span>
          <span className="pta-select-arrow">{isOpen ? '▲' : '▼'}</span>
        </button>

        {clearable && currentValue && !disabled && (
          <button
            type="button"
            className="pta-select-clear"
            onClick={handleClear}
            aria-label="Clear selection"
            tabIndex={-1}
          >
            ✕
          </button>
        )}

        {isOpen && (
          <div
            className="pta-select-dropdown"
            role="listbox"
            id={listboxId}
            aria-multiselectable={multiple}
            style={{ maxHeight: `${maxHeight}px` }}
          >
            {searchable && (
              <div className="pta-select-search">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="pta-select-search-input"
                  placeholder="Search..."
                  value={searchTerm}
                  onInput={handleSearch}
                  aria-label="Search options"
                />
              </div>
            )}
            <div className="pta-select-options">{renderOptions()}</div>
          </div>
        )}
      </div>

      {error && typeof error === 'string' && (
        <div id={errorId} className="pta-select-error" role="alert">
          {error}
        </div>
      )}

      {!error && helperText && (
        <div id={helperTextId} className="pta-select-helper">
          {helperText}
        </div>
      )}
    </div>
  );
};
