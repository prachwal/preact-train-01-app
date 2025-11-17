import { useRef, useState, useEffect } from 'preact/hooks';
import type { ToggleButtonProps, ToggleItem } from '../types';
import { buildClassName } from '../types';
import type { JSX } from 'preact';

/**
 * ToggleButton Component
 *
 * Universal toggle component supporting multiple display variants:
 * - icon: Cyclic toggle with icon only (mobile/tablet)
 * - icon-text: Icon + text label (desktop)
 * - dropdown: Button with dropdown list (many options)
 * - text: Text only toggle
 * - carousel: Visible 3 options with arrows (optional)
 *
 * @example
 * ```tsx
 * <ToggleButton
 *   variant="icon"
 *   items={themeItems}
 *   value={currentTheme}
 *   onChange={handleChange}
 *   ariaLabel="Toggle theme"
 * />
 * ```
 */
export const ToggleButton = ({
  items,
  value,
  onChange,
  variant = 'icon',
  size = 'md',
  ariaLabel,
  disabled = false,
  theme,
  className: additionalClassName,
  id,
  'data-testid': dataTestId,
}: ToggleButtonProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Guard against empty items array
  if (items.length === 0) {
    return null;
  }

  // Find current item (guaranteed to exist since items.length > 0)
  const currentItem = (items.find(item => item.value === value) || items[0])!;
  const currentIndex = items.findIndex(item => item.value === value);

  /**
   * Handle cyclic toggle for icon/text variants
   * Cycles through items: item0 → item1 → item2 → item0
   */
  const handleCyclicToggle = () => {
    if (disabled) return;
    const nextIndex = (currentIndex + 1) % items.length;
    const nextItem = items[nextIndex];
    if (nextItem && !nextItem.disabled) {
      onChange(nextItem.value);
    }
  };

  /**
   * Handle dropdown item selection
   */
  const handleDropdownSelect = (item: ToggleItem) => {
    if (disabled || item.disabled) return;
    onChange(item.value);
    setIsDropdownOpen(false);
    buttonRef.current?.focus();
  };

  /**
   * Toggle dropdown open/close
   */
  const toggleDropdown = () => {
    if (disabled) return;
    setIsDropdownOpen(!isDropdownOpen);
  };

  /**
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  /**
   * Keyboard navigation for dropdown
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;

    if (variant === 'dropdown') {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          toggleDropdown();
          break;
        case 'Escape':
          if (isDropdownOpen) {
            e.preventDefault();
            setIsDropdownOpen(false);
            buttonRef.current?.focus();
          }
          break;
        case 'ArrowDown':
          if (isDropdownOpen) {
            e.preventDefault();
            // Focus first item in dropdown
            const firstItem = dropdownRef.current?.querySelector(
              '[role="option"]'
            ) as HTMLElement;
            firstItem?.focus();
          } else {
            toggleDropdown();
          }
          break;
        case 'ArrowUp':
          if (isDropdownOpen) {
            e.preventDefault();
            // Focus last item in dropdown
            const items =
              dropdownRef.current?.querySelectorAll('[role="option"]');
            const lastItem = items?.[items.length - 1] as HTMLElement;
            lastItem?.focus();
          }
          break;
      }
    } else {
      // Cyclic toggle for other variants
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCyclicToggle();
      }
    }
  };

  /**
   * Handle keyboard navigation within dropdown items
   */
  const handleDropdownItemKeyDown = (
    e: KeyboardEvent,
    item: ToggleItem,
    index: number
  ) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleDropdownSelect(item);
        break;
      case 'Escape':
        e.preventDefault();
        setIsDropdownOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (index + 1) % items.length;
        const nextItem = dropdownRef.current?.querySelectorAll(
          '[role="option"]'
        )[nextIndex] as HTMLElement;
        nextItem?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (index - 1 + items.length) % items.length;
        const prevItem = dropdownRef.current?.querySelectorAll(
          '[role="option"]'
        )[prevIndex] as HTMLElement;
        prevItem?.focus();
        break;
      case 'Home':
        e.preventDefault();
        const firstItem = dropdownRef.current?.querySelector(
          '[role="option"]'
        ) as HTMLElement;
        firstItem?.focus();
        break;
      case 'End':
        e.preventDefault();
        const allItems =
          dropdownRef.current?.querySelectorAll('[role="option"]');
        const lastItem = allItems?.[allItems.length - 1] as HTMLElement;
        lastItem?.focus();
        break;
    }
  };

  // Build class names
  const modifiers: Record<string, boolean | string> = {
    [size]: true,
    [variant]: true,
    disabled,
    open: variant === 'dropdown' && isDropdownOpen,
  };

  const baseClassName = buildClassName('pta-toggle-button', modifiers);
  const finalClassName = additionalClassName
    ? `${baseClassName} ${additionalClassName}`
    : baseClassName;

  /**
   * Render button content based on variant
   */
  const renderButtonContent = () => {
    switch (variant) {
      case 'icon':
        return (
          <span className="pta-toggle-button__icon" aria-hidden="true">
            {currentItem.icon}
          </span>
        );

      case 'text':
        return (
          <span className="pta-toggle-button__label">
            {currentItem.label || currentItem.value}
          </span>
        );

      case 'icon-text':
        return (
          <>
            {currentItem.icon && (
              <span className="pta-toggle-button__icon" aria-hidden="true">
                {currentItem.icon}
              </span>
            )}
            <span className="pta-toggle-button__label">
              {currentItem.label || currentItem.value}
            </span>
          </>
        );

      case 'dropdown':
        return (
          <>
            {currentItem.icon && (
              <span className="pta-toggle-button__icon" aria-hidden="true">
                {currentItem.icon}
              </span>
            )}
            <span className="pta-toggle-button__label">
              {currentItem.label || currentItem.value}
            </span>
            <span className="pta-toggle-button__arrow" aria-hidden="true">
              {isDropdownOpen ? '▲' : '▼'}
            </span>
          </>
        );

      case 'carousel':
        // TODO: Implement carousel variant (Priority 4)
        return (
          <span className="pta-toggle-button__label">
            {currentItem.label || currentItem.value}
          </span>
        );

      default:
        return null;
    }
  };

  /**
   * Render dropdown menu
   */
  const renderDropdown = () => {
    if (variant !== 'dropdown' || !isDropdownOpen) return null;

    return (
      <div
        className="pta-toggle-button__dropdown"
        role="listbox"
        aria-label={ariaLabel || 'Options'}
      >
        {items.map((item, index) => {
          const isSelected = item.value === value;
          const itemClassName = buildClassName('pta-toggle-button__item', {
            selected: isSelected,
            disabled: item.disabled || false,
          });

          return (
            <div
              key={item.value}
              role="option"
              aria-selected={isSelected}
              aria-disabled={item.disabled}
              className={itemClassName}
              onClick={() => handleDropdownSelect(item)}
              onKeyDown={e =>
                handleDropdownItemKeyDown(
                  e as unknown as KeyboardEvent,
                  item,
                  index
                )
              }
              tabIndex={item.disabled ? -1 : 0}
            >
              {item.icon && (
                <span
                  className="pta-toggle-button__item-icon"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              )}
              <span className="pta-toggle-button__item-label">
                {item.label || item.value}
              </span>
              {isSelected && (
                <span
                  className="pta-toggle-button__item-check"
                  aria-hidden="true"
                >
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Determine ARIA label
  const effectiveAriaLabel =
    ariaLabel ||
    currentItem.ariaLabel ||
    `Toggle ${currentItem.label || currentItem.value}`;

  // Determine onClick handler
  const handleClick =
    variant === 'dropdown' ? toggleDropdown : handleCyclicToggle;

  return (
    <div
      ref={dropdownRef}
      className={finalClassName}
      data-theme={theme}
      id={id}
      data-testid={dataTestId}
    >
      <button
        ref={buttonRef}
        type="button"
        className="pta-toggle-button__button"
        onClick={handleClick}
        onKeyDown={
          handleKeyDown as unknown as JSX.KeyboardEventHandler<HTMLButtonElement>
        }
        disabled={disabled}
        aria-label={effectiveAriaLabel}
        aria-expanded={variant === 'dropdown' ? isDropdownOpen : undefined}
        aria-haspopup={variant === 'dropdown' ? 'listbox' : undefined}
      >
        {renderButtonContent()}
      </button>
      {renderDropdown()}
    </div>
  );
};
