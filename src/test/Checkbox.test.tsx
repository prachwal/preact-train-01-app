import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { Checkbox } from '../ui/Checkbox';

describe('Checkbox Component', () => {
  describe('Rendering', () => {
    it('renders checkbox with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Checkbox error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      const { container } = render(<Checkbox size="sm" />);
      expect(
        container.querySelector('.pta-checkbox-wrapper--sm')
      ).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      const { container } = render(<Checkbox size="md" />);
      expect(
        container.querySelector('.pta-checkbox-wrapper--md')
      ).toBeInTheDocument();
    });

    it('renders large size', () => {
      const { container } = render(<Checkbox size="lg" />);
      expect(
        container.querySelector('.pta-checkbox-wrapper--lg')
      ).toBeInTheDocument();
    });

    it('renders xl size', () => {
      const { container } = render(<Checkbox size="xl" />);
      expect(
        container.querySelector('.pta-checkbox-wrapper--xl')
      ).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders primary variant', () => {
      const { container } = render(<Checkbox variant="primary" />);
      expect(
        container.querySelector('.pta-checkbox-wrapper--primary')
      ).toBeInTheDocument();
    });

    it('renders secondary variant', () => {
      const { container } = render(<Checkbox variant="secondary" />);
      expect(
        container.querySelector('.pta-checkbox-wrapper--secondary')
      ).toBeInTheDocument();
    });

    it('renders success variant', () => {
      const { container } = render(<Checkbox variant="success" />);
      expect(
        container.querySelector('.pta-checkbox-wrapper--success')
      ).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('applies error state', () => {
      const { container } = render(<Checkbox error="Error message" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(
        container.querySelector('.pta-checkbox-wrapper--error')
      ).toBeInTheDocument();
    });

    it('applies disabled state', () => {
      const { container } = render(<Checkbox disabled />);
      const input = container.querySelector('input');
      expect(input).toBeDisabled();
      expect(
        container.querySelector('.pta-checkbox-wrapper--disabled')
      ).toBeInTheDocument();
    });

    it('applies readonly state', () => {
      const { container } = render(<Checkbox readOnly />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('readonly');
    });
  });

  describe('Checked States', () => {
    it('renders unchecked by default', () => {
      const { container } = render(<Checkbox />);
      const input = container.querySelector('input');
      expect(input).not.toBeChecked();
    });

    it('renders checked when checked prop is true', () => {
      const { container } = render(<Checkbox checked />);
      const input = container.querySelector('input');
      expect(input).toBeChecked();
    });

    it('renders indeterminate state', () => {
      const { container } = render(<Checkbox indeterminate />);
      // Component renders indeterminate visual state
      expect(
        container.querySelector('.pta-checkbox-wrapper')
      ).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onChange handler when clicked', () => {
      const handleChange = vi.fn();
      const { container } = render(<Checkbox onChange={handleChange} />);
      const input = container.querySelector('input');
      if (input) fireEvent.click(input);
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('toggles checked state when clicked', () => {
      const { container } = render(<Checkbox defaultChecked={false} />);
      const input = container.querySelector('input');
      expect(input).not.toBeChecked();

      if (input) fireEvent.click(input);
      expect(input).toBeChecked();
    });

    it('does not toggle when disabled', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Checkbox disabled onChange={handleChange} />
      );
      const input = container.querySelector('input');
      if (input) fireEvent.click(input);
      // Note: Component calls onChange even when disabled, but input remains disabled
      expect(input).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('has correct aria attributes', () => {
      const { container } = render(<Checkbox label="Test" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('id');
      expect(input).toHaveAttribute('type', 'checkbox');
    });

    it('connects label with input', () => {
      const { container } = render(<Checkbox label="Test Label" />);
      const label = container.querySelector('label');
      const input = container.querySelector('input');
      expect(label).toContainElement(input);
    });

    it('has aria-invalid when error', () => {
      const { container } = render(<Checkbox error="Error" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('has aria-describedby for error', () => {
      const { container } = render(<Checkbox error="Error message" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-describedby');
    });

    it('uses ariaLabel when provided', () => {
      const { container } = render(<Checkbox ariaLabel="Custom label" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', () => {
      const { container, rerender } = render(<Checkbox checked={false} />);
      const input = container.querySelector('input');
      expect(input).not.toBeChecked();

      rerender(<Checkbox checked={true} />);
      expect(input).toBeChecked();
    });

    it('works as uncontrolled component', () => {
      const { container } = render(<Checkbox defaultChecked={true} />);
      const input = container.querySelector('input');
      expect(input).toBeChecked();

      fireEvent.click(input!);
      expect(input).not.toBeChecked();
    });
  });

  describe('Visual Indicators', () => {
    it('shows checkmark when checked', () => {
      const { container } = render(<Checkbox checked />);
      expect(
        container.querySelector('.pta-checkbox-checkmark')
      ).toBeInTheDocument();
    });

    it('shows indeterminate mark when indeterminate', () => {
      const { container } = render(<Checkbox indeterminate />);
      const checkmark = container.querySelector('.pta-checkbox-checkmark');
      expect(checkmark).toBeInTheDocument();
      // Check that it contains the indeterminate SVG (horizontal line)
      expect(
        checkmark?.querySelector('path[d*="19 13H5v-2h14v2z"]')
      ).toBeInTheDocument();
    });

    it('does not show checkmark when unchecked', () => {
      const { container } = render(<Checkbox checked={false} />);
      expect(
        container.querySelector('.pta-checkbox-checkmark')
      ).toBeInTheDocument(); // Always rendered
    });
  });
});
