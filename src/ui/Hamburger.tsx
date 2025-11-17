import { buildClassName } from '../types';
import type { HamburgerProps } from '../types/component-props';

export const Hamburger = ({
  isOpen = false,
  onClick,
  className: additionalClassName,
  ariaLabel = 'Toggle menu',
}: HamburgerProps) => {
  const modifiers: Record<string, boolean> = {
    open: isOpen,
  };

  const baseClassName = buildClassName('pta-hamburger', modifiers);
  const finalClassName = additionalClassName
    ? `${baseClassName} ${additionalClassName}`
    : baseClassName;

  return (
    <button
      className={finalClassName}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      type="button"
    >
      <span className="pta-hamburger__line" />
      <span className="pta-hamburger__line" />
      <span className="pta-hamburger__line" />
    </button>
  );
};
