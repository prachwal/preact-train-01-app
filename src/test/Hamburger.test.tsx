import { describe, it, expect, vi } from 'vitest';
import { h } from 'preact';
import { render, fireEvent } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { Hamburger } from '../ui/Hamburger';

describe('Hamburger Component', () => {
  describe('Rendering', () => {
    it('renders hamburger button', () => {
      const { container } = render(<Hamburger />);

      expect(container.querySelector('.pta-hamburger')).toBeInTheDocument();
      expect(container.querySelector('button')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(<Hamburger className="custom-hamburger" />);

      expect(container.querySelector('.pta-hamburger')).toHaveClass(
        'custom-hamburger'
      );
    });

    it('renders three line elements', () => {
      const { container } = render(<Hamburger />);

      const lines = container.querySelectorAll('.pta-hamburger__line');
      expect(lines).toHaveLength(3);
    });
  });

  describe('States', () => {
    it('renders closed state by default', () => {
      const { container } = render(<Hamburger />);

      expect(container.querySelector('.pta-hamburger')).not.toHaveClass(
        'pta-hamburger--open'
      );
    });

    it('renders open state when isOpen is true', () => {
      const { container } = render(<Hamburger isOpen={true} />);

      expect(container.querySelector('.pta-hamburger')).toHaveClass(
        'pta-hamburger--open'
      );
    });

    it('renders closed state when isOpen is false', () => {
      const { container } = render(<Hamburger isOpen={false} />);

      expect(container.querySelector('.pta-hamburger')).not.toHaveClass(
        'pta-hamburger--open'
      );
    });
  });

  describe('Interactions', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = vi.fn();
      const { container } = render(<Hamburger onClick={handleClick} />);

      const button = container.querySelector('button');
      fireEvent.click(button!);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not throw when onClick is not provided', () => {
      const { container } = render(<Hamburger />);

      const button = container.querySelector('button');
      expect(() => {
        fireEvent.click(button!);
      }).not.toThrow();
    });

    it('is keyboard accessible', () => {
      const handleClick = vi.fn();
      const { container } = render(<Hamburger onClick={handleClick} />);

      const button = container.querySelector('button');
      button?.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('has button role', () => {
      const { container } = render(<Hamburger />);

      const button = container.querySelector('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('has default aria-label', () => {
      const { container } = render(<Hamburger />);

      const button = container.querySelector('button');
      expect(button).toHaveAttribute('aria-label', 'Toggle menu');
    });

    it('uses custom aria-label when provided', () => {
      const { container } = render(<Hamburger ariaLabel="Open navigation" />);

      const button = container.querySelector('button');
      expect(button).toHaveAttribute('aria-label', 'Open navigation');
    });

    it('has aria-expanded attribute', () => {
      const { container } = render(<Hamburger isOpen={false} />);

      const button = container.querySelector('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates aria-expanded when state changes', () => {
      const { container, rerender } = render(<Hamburger isOpen={false} />);

      let button = container.querySelector('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      rerender(<Hamburger isOpen={true} />);

      button = container.querySelector('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('is focusable', () => {
      const { container } = render(<Hamburger />);

      const button = container.querySelector('button');
      expect(button).not.toHaveAttribute('tabindex', '-1');
    });
  });

  describe('Props Combination', () => {
    it('handles all props together', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Hamburger
          isOpen={true}
          onClick={handleClick}
          className="custom"
          ariaLabel="Custom label"
        />
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-hamburger--open');
      expect(button).toHaveClass('custom');
      expect(button).toHaveAttribute('aria-label', 'Custom label');

      fireEvent.click(button!);
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Button Type', () => {
    it('has type="button" to prevent form submission', () => {
      const { container } = render(<Hamburger />);

      const button = container.querySelector('button');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Animation Structure', () => {
    it('maintains line structure for animations', () => {
      const { container } = render(<Hamburger />);

      const lines = container.querySelectorAll('.pta-hamburger__line');
      expect(lines).toHaveLength(3);

      lines.forEach(line => {
        expect(line.tagName.toLowerCase()).toBe('span');
      });
    });
  });
});
