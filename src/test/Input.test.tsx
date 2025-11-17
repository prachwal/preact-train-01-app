import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { Input } from '../ui/Input';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders input with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label="Username" />);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Input helperText="This is helper text" />);
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders required indicator', () => {
      render(<Input label="Email" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Types', () => {
    it('renders text input by default', () => {
      const { container } = render(<Input />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders email input', () => {
      const { container } = render(<Input type="email" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders password input', () => {
      const { container } = render(<Input type="password" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('renders number input', () => {
      const { container } = render(<Input type="number" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'number');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      const { container } = render(<Input size="sm" />);
      expect(
        container.querySelector('.pta-input-wrapper--sm')
      ).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      const { container } = render(<Input size="md" />);
      expect(
        container.querySelector('.pta-input-wrapper--md')
      ).toBeInTheDocument();
    });

    it('renders large size', () => {
      const { container } = render(<Input size="lg" />);
      expect(
        container.querySelector('.pta-input-wrapper--lg')
      ).toBeInTheDocument();
    });

    it('renders xl size', () => {
      const { container } = render(<Input size="xl" />);
      expect(
        container.querySelector('.pta-input-wrapper--xl')
      ).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders outlined variant', () => {
      const { container } = render(<Input variant="outlined" />);
      expect(
        container.querySelector('.pta-input-wrapper--outlined')
      ).toBeInTheDocument();
    });

    it('renders filled variant', () => {
      const { container } = render(<Input variant="filled" />);
      expect(
        container.querySelector('.pta-input-wrapper--filled')
      ).toBeTruthy();
    });

    it('renders standard variant', () => {
      const { container } = render(<Input variant="standard" />);
      expect(
        container.querySelector('.pta-input-wrapper--standard')
      ).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('applies error state', () => {
      const { container } = render(<Input error="Error message" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(
        container.querySelector('.pta-input-wrapper--error')
      ).toBeInTheDocument();
    });

    it('applies disabled state', () => {
      const { container } = render(<Input disabled />);
      const input = container.querySelector('input');
      expect(input).toBeDisabled();
      expect(
        container.querySelector('.pta-input-wrapper--disabled')
      ).toBeInTheDocument();
    });

    it('applies readonly state', () => {
      const { container } = render(<Input readOnly />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('readonly');
    });

    it('applies focused state on focus', () => {
      const { container } = render(<Input />);
      const input = container.querySelector('input');
      if (input) fireEvent.focus(input);
      expect(
        container.querySelector('.pta-input-wrapper--focused')
      ).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onChange handler', () => {
      const handleChange = vi.fn();
      const { container } = render(<Input onChange={handleChange} />);
      const input = container.querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: 'test' } });
      }
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('calls onFocus handler', () => {
      const handleFocus = vi.fn();
      const { container } = render(<Input onFocus={handleFocus} />);
      const input = container.querySelector('input');
      if (input) fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur handler', () => {
      const handleBlur = vi.fn();
      const { container } = render(<Input onBlur={handleBlur} />);
      const input = container.querySelector('input');
      if (input) {
        fireEvent.focus(input);
        fireEvent.blur(input);
      }
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Clear Button', () => {
    it('shows clear button when showClearButton is true and has value', () => {
      const { container } = render(
        <Input showClearButton defaultValue="test" />
      );
      expect(container.querySelector('.pta-input-clear')).toBeTruthy();
    });

    it('does not show clear button when empty', () => {
      const { container } = render(<Input showClearButton />);
      expect(
        container.querySelector('.pta-input-clear')
      ).not.toBeInTheDocument();
    });

    it('clears value when clear button is clicked', () => {
      const handleClear = vi.fn();
      const { container } = render(
        <Input showClearButton defaultValue="test" onClear={handleClear} />
      );
      const clearButton = container.querySelector('.pta-input-clear');
      if (clearButton) fireEvent.click(clearButton);
      expect(handleClear).toHaveBeenCalledTimes(1);
    });
  });

  describe('Character Count', () => {
    it('shows character count when enabled', () => {
      const { container } = render(
        <Input showCharacterCount maxLength={100} defaultValue="test" />
      );
      expect(
        container.querySelector('.pta-input-character-count')
      ).toBeInTheDocument();
      expect(screen.getByText('4 / 100')).toBeInTheDocument();
    });

    it('does not show character count when disabled', () => {
      const { container } = render(
        <Input maxLength={100} defaultValue="test" />
      );
      expect(
        container.querySelector('.pta-input-character-count')
      ).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct aria attributes', () => {
      const { container } = render(<Input label="Test" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('id');
    });

    it('connects label with input', () => {
      const { container } = render(<Input label="Test Label" />);
      const label = container.querySelector('label');
      const input = container.querySelector('input');
      expect(label).toHaveAttribute('for', input?.id);
    });

    it('has aria-invalid when error', () => {
      const { container } = render(<Input error="Error" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('has aria-describedby for error', () => {
      const { container } = render(<Input error="Error message" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-describedby');
    });
  });

  describe('Semantic States', () => {
    it('applies success semantic state', () => {
      const { container } = render(<Input semanticState="success" />);
      expect(
        container.querySelector('.pta-input-wrapper--state-success')
      ).toBeInTheDocument();
    });

    it('applies error semantic state', () => {
      const { container } = render(<Input semanticState="error" />);
      expect(
        container.querySelector('.pta-input-wrapper--state-error')
      ).toBeInTheDocument();
    });

    it('applies warning semantic state', () => {
      const { container } = render(<Input semanticState="warning" />);
      expect(
        container.querySelector('.pta-input-wrapper--state-warning')
      ).toBeInTheDocument();
    });

    it('applies info semantic state', () => {
      const { container } = render(<Input semanticState="info" />);
      expect(
        container.querySelector('.pta-input-wrapper--state-info')
      ).toBeInTheDocument();
    });
  });
});
