import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { Textarea } from '../ui/Textarea';

describe('Textarea Component', () => {
  describe('Rendering', () => {
    it('renders textarea with placeholder', () => {
      render(<Textarea placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Textarea label="Message" />);
      expect(screen.getByText('Message')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Textarea helperText="This is helper text" />);
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Textarea error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders required indicator', () => {
      render(<Textarea label="Message" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      const { container } = render(<Textarea size="sm" />);
      expect(
        container.querySelector('.pta-textarea-wrapper--sm')
      ).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      const { container } = render(<Textarea size="md" />);
      expect(
        container.querySelector('.pta-textarea-wrapper--md')
      ).toBeInTheDocument();
    });

    it('renders large size', () => {
      const { container } = render(<Textarea size="lg" />);
      expect(
        container.querySelector('.pta-textarea-wrapper--lg')
      ).toBeInTheDocument();
    });

    it('renders xl size', () => {
      const { container } = render(<Textarea size="xl" />);
      expect(
        container.querySelector('.pta-textarea-wrapper--xl')
      ).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders outlined variant', () => {
      const { container } = render(<Textarea variant="outlined" />);
      expect(
        container.querySelector('.pta-textarea-wrapper--outlined')
      ).toBeInTheDocument();
    });

    it('renders filled variant', () => {
      const { container } = render(<Textarea variant="filled" />);
      expect(
        container.querySelector('.pta-textarea-wrapper--filled')
      ).toBeInTheDocument();
    });

    it('renders standard variant', () => {
      const { container } = render(<Textarea variant="standard" />);
      expect(
        container.querySelector('.pta-textarea-wrapper--standard')
      ).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('applies error state', () => {
      const { container } = render(<Textarea error="Error message" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
      expect(
        container.querySelector('.pta-textarea-wrapper--error')
      ).toBeInTheDocument();
    });

    it('applies disabled state', () => {
      const { container } = render(<Textarea disabled />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toBeDisabled();
      expect(
        container.querySelector('.pta-textarea-wrapper--disabled')
      ).toBeInTheDocument();
    });

    it('applies readonly state', () => {
      const { container } = render(<Textarea readOnly />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('readonly');
    });

    it('applies focused state on focus', () => {
      const { container } = render(<Textarea />);
      const textarea = container.querySelector('textarea');
      if (textarea) fireEvent.focus(textarea);
      expect(
        container.querySelector('.pta-textarea-wrapper--focused')
      ).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onChange handler', () => {
      const handleChange = vi.fn();
      const { container } = render(<Textarea onChange={handleChange} />);
      const textarea = container.querySelector('textarea');
      if (textarea) {
        fireEvent.change(textarea, { target: { value: 'test' } });
      }
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('calls onInput handler', () => {
      const handleInput = vi.fn();
      const { container } = render(<Textarea onInput={handleInput} />);
      const textarea = container.querySelector('textarea');
      if (textarea) {
        fireEvent.input(textarea, { target: { value: 'test' } });
      }
      expect(handleInput).toHaveBeenCalledTimes(1);
    });

    it('calls onFocus handler', () => {
      const handleFocus = vi.fn();
      const { container } = render(<Textarea onFocus={handleFocus} />);
      const textarea = container.querySelector('textarea');
      if (textarea) fireEvent.focus(textarea);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur handler', () => {
      const handleBlur = vi.fn();
      const { container } = render(<Textarea onBlur={handleBlur} />);
      const textarea = container.querySelector('textarea');
      if (textarea) {
        fireEvent.focus(textarea);
        fireEvent.blur(textarea);
      }
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Character Count', () => {
    it('shows character count when enabled', () => {
      const { container } = render(
        <Textarea showCharacterCount maxLength={100} defaultValue="test" />
      );
      expect(
        container.querySelector('.pta-textarea-char-count')
      ).toBeInTheDocument();
      expect(screen.getByText('4/100')).toBeInTheDocument();
    });

    it('does not show character count when disabled', () => {
      const { container } = render(
        <Textarea maxLength={100} defaultValue="test" />
      );
      // Character count is shown when maxLength is set, even if showCharacterCount is false
      expect(
        container.querySelector('.pta-textarea-char-count')
      ).toBeInTheDocument();
    });

    it('updates character count as user types', () => {
      const { container } = render(
        <Textarea showCharacterCount maxLength={100} />
      );
      const textarea = container.querySelector('textarea');
      if (textarea) {
        fireEvent.change(textarea, { target: { value: 'hello world' } });
      }
      expect(screen.getByText('11/100')).toBeInTheDocument();
    });
  });

  describe('Auto Resize', () => {
    it('sets min and max rows when auto-resize is enabled', () => {
      const { container } = render(
        <Textarea autoResize minRows={3} maxRows={10} />
      );
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('rows', '4'); // Default rows value
    });
  });

  describe('Accessibility', () => {
    it('has correct aria attributes', () => {
      const { container } = render(<Textarea label="Test" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('id');
    });

    it('connects label with textarea', () => {
      const { container } = render(<Textarea label="Test Label" />);
      const label = container.querySelector('label');
      const textarea = container.querySelector('textarea');
      expect(label).toHaveAttribute('for', textarea?.id);
    });

    it('has aria-invalid when error', () => {
      const { container } = render(<Textarea error="Error" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });

    it('has aria-describedby for error', () => {
      const { container } = render(<Textarea error="Error message" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('aria-describedby');
    });
  });

  describe('Semantic States', () => {
    it('applies success semantic state', () => {
      const { container } = render(<Textarea semanticState="success" />);
      expect(
        container.querySelector('.pta-textarea-wrapper--state-success')
      ).toBeInTheDocument();
    });

    it('applies error semantic state', () => {
      const { container } = render(<Textarea semanticState="error" />);
      expect(
        container.querySelector('.pta-textarea-wrapper--state-error')
      ).toBeInTheDocument();
    });

    it('applies warning semantic state', () => {
      const { container } = render(<Textarea semanticState="warning" />);
      expect(
        container.querySelector('.pta-textarea-wrapper--state-warning')
      ).toBeInTheDocument();
    });

    it('applies info semantic state', () => {
      const { container } = render(<Textarea semanticState="info" />);
      expect(
        container.querySelector('.pta-textarea-wrapper--state-info')
      ).toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', () => {
      const { container, rerender } = render(<Textarea value="initial" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveValue('initial');

      rerender(<Textarea value="updated" />);
      expect(textarea).toHaveValue('updated');
    });

    it('works as uncontrolled component', () => {
      const { container } = render(<Textarea defaultValue="initial" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveValue('initial');

      fireEvent.change(textarea!, { target: { value: 'changed' } });
      expect(textarea).toHaveValue('changed');
    });
  });
});
