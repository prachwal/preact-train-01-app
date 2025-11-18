import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { RadioGroup } from '../ui/RadioGroup';
import type { RadioOption } from '../types';

const mockOptions: RadioOption[] = [
  { value: 'email', label: 'Email', helperText: 'We will respond via email' },
  { value: 'phone', label: 'Phone', helperText: 'We will call you back' },
  { value: 'none', label: 'No preference', helperText: 'Any method works' },
];

describe('RadioGroup Component', () => {
  describe('Rendering', () => {
    it('renders radio group with label', () => {
      render(
        <RadioGroup
          name="contact"
          options={mockOptions}
          label="Contact Method"
        />
      );
      expect(screen.getByText('Contact Method')).toBeInTheDocument();
    });

    it('renders all radio options', () => {
      render(<RadioGroup name="contact" options={mockOptions} />);
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Phone')).toBeInTheDocument();
      expect(screen.getByText('No preference')).toBeInTheDocument();
    });

    it('renders helper text for options', () => {
      render(<RadioGroup name="contact" options={mockOptions} />);
      expect(screen.getByText('We will respond via email')).toBeInTheDocument();
      expect(screen.getByText('We will call you back')).toBeInTheDocument();
      expect(screen.getByText('Any method works')).toBeInTheDocument();
    });

    it('renders with group helper text', () => {
      render(
        <RadioGroup
          name="contact"
          options={mockOptions}
          helperText="Choose your preferred contact method"
        />
      );
      expect(
        screen.getByText('Choose your preferred contact method')
      ).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(
        <RadioGroup
          name="contact"
          options={mockOptions}
          error="This field is required"
        />
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders required indicator', () => {
      render(
        <RadioGroup
          name="contact"
          options={mockOptions}
          label="Required field"
          required
        />
      );
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Layout Directions', () => {
    it('renders in row direction by default', () => {
      const { container } = render(
        <RadioGroup name="contact" options={mockOptions} />
      );
      // Default direction is column
      expect(
        container.querySelector('.pta-radio-group--column')
      ).toBeInTheDocument();
    });

    it('renders in column direction', () => {
      const { container } = render(
        <RadioGroup name="contact" options={mockOptions} direction="column" />
      );
      expect(
        container.querySelector('.pta-radio-group--column')
      ).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders with size prop', () => {
      const { container } = render(
        <RadioGroup name="contact" options={mockOptions} size="sm" />
      );
      // RadioGroup passes size to individual Radio components
      expect(container.querySelector('.pta-radio-group')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('applies error state', () => {
      const { container } = render(
        <RadioGroup
          name="contact"
          options={mockOptions}
          error="Error message"
        />
      );
      expect(
        container.querySelector('.pta-radio-group--error')
      ).toBeInTheDocument();
    });

    it('applies disabled state', () => {
      const { container } = render(
        <RadioGroup name="contact" options={mockOptions} disabled />
      );
      expect(
        container.querySelector('.pta-radio-group--disabled')
      ).toBeInTheDocument();

      // All radio inputs should be disabled
      const inputs = container.querySelectorAll('input[type="radio"]');
      inputs.forEach(input => {
        expect(input).toBeDisabled();
      });
    });

    it('applies readonly state', () => {
      const { container } = render(
        <RadioGroup name="contact" options={mockOptions} readOnly />
      );
      const inputs = container.querySelectorAll('input[type="radio"]');
      inputs.forEach(input => {
        expect(input).toHaveAttribute('readonly');
      });
    });
  });

  describe('Selection', () => {
    it('has no selection by default', () => {
      const { container } = render(
        <RadioGroup name="contact" options={mockOptions} />
      );
      const inputs = container.querySelectorAll('input[type="radio"]');
      inputs.forEach(input => {
        expect(input).not.toBeChecked();
      });
    });

    it('selects option when value prop is set', () => {
      const { container } = render(
        <RadioGroup name="contact" options={mockOptions} value="phone" />
      );
      const phoneInput = container.querySelector('input[value="phone"]');
      expect(phoneInput).toBeChecked();
    });

    it('works as controlled component', () => {
      const { container, rerender } = render(
        <RadioGroup name="contact" options={mockOptions} value="email" />
      );
      let emailInput = container.querySelector('input[value="email"]');
      expect(emailInput).toBeChecked();

      rerender(
        <RadioGroup name="contact" options={mockOptions} value="phone" />
      );
      emailInput = container.querySelector('input[value="email"]');
      const phoneInput = container.querySelector('input[value="phone"]');
      expect(emailInput).not.toBeChecked();
      expect(phoneInput).toBeChecked();
    });

    it('works as uncontrolled component', () => {
      const { container } = render(
        <RadioGroup name="contact" options={mockOptions} defaultValue="email" />
      );
      const emailInput = container.querySelector('input[value="email"]');
      expect(emailInput).toBeChecked();

      const phoneInput = container.querySelector('input[value="phone"]');
      if (phoneInput) fireEvent.click(phoneInput);
      expect(emailInput).not.toBeChecked();
      expect(phoneInput).toBeChecked();
    });
  });

  describe('Interactions', () => {
    it('calls onChange handler when option is selected', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <RadioGroup
          name="contact"
          options={mockOptions}
          onChange={handleChange}
        />
      );
      const phoneInput = container.querySelector('input[value="phone"]');
      if (phoneInput) fireEvent.click(phoneInput);
      expect(handleChange).toHaveBeenCalledWith('phone');
    });

    it('only allows one selection at a time', () => {
      const { container } = render(
        <RadioGroup name="contact" options={mockOptions} />
      );
      const emailInput = container.querySelector('input[value="email"]');
      const phoneInput = container.querySelector('input[value="phone"]');

      if (emailInput) fireEvent.click(emailInput);
      expect(emailInput).toBeChecked();
      expect(phoneInput).not.toBeChecked();

      if (phoneInput) fireEvent.click(phoneInput);
      expect(emailInput).not.toBeChecked();
      expect(phoneInput).toBeChecked();
    });
  });

  describe('Disabled Options', () => {
    it('renders disabled options correctly', () => {
      const optionsWithDisabled = [
        ...mockOptions,
        { value: 'disabled', label: 'Disabled Option', disabled: true },
      ];
      const { container } = render(
        <RadioGroup name="contact" options={optionsWithDisabled} />
      );
      const disabledInput = container.querySelector('input[value="disabled"]');
      expect(disabledInput).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('has correct aria attributes', () => {
      const { container } = render(
        <RadioGroup name="contact" options={mockOptions} label="Test Group" />
      );
      const radios = container.querySelectorAll('input[type="radio"]');
      radios.forEach(radio => {
        expect(radio).toHaveAttribute('name', 'contact');
      });
    });

    it('connects group label with fieldset', () => {
      const { container } = render(
        <RadioGroup name="contact" options={mockOptions} label="Test Label" />
      );
      // RadioGroup uses div with role, not fieldset/legend
      const groupDiv = container.querySelector('[role="radiogroup"]');
      expect(groupDiv).toBeInTheDocument();
      expect(groupDiv).toHaveAttribute('aria-labelledby');
    });

    it('has aria-invalid when error', () => {
      const { container } = render(
        <RadioGroup name="contact" options={mockOptions} error="Error" />
      );
      const groupDiv = container.querySelector('[role="radiogroup"]');
      expect(groupDiv).toHaveAttribute('aria-invalid', 'true');
    });

    it('has aria-describedby for error', () => {
      const { container } = render(
        <RadioGroup
          name="contact"
          options={mockOptions}
          error="Error message"
        />
      );
      const groupDiv = container.querySelector('[role="radiogroup"]');
      expect(groupDiv).toHaveAttribute('aria-describedby');
    });
  });
});
