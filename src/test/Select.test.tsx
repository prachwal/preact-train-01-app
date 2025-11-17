import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { Select } from '../ui/Select';

const basicOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('Select Component', () => {
  describe('Rendering', () => {
    it('renders select with placeholder', () => {
      render(<Select options={basicOptions} placeholder="Select option" />);
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Select options={basicOptions} label="Choose" />);
      expect(screen.getByText('Choose')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Select options={basicOptions} helperText="Helper text" />);
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Select options={basicOptions} error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders required indicator', () => {
      render(<Select options={basicOptions} label="Select" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Options', () => {
    it('displays options when opened', async () => {
      const { container } = render(<Select options={basicOptions} />);
      const trigger = container.querySelector('.pta-select-trigger');
      if (trigger) fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
      });
    });

    it('selects option on click', async () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Select options={basicOptions} onChange={handleChange} />
      );
      const trigger = container.querySelector('.pta-select-trigger');
      if (trigger) fireEvent.click(trigger);

      await waitFor(() => {
        const option = screen.getByText('Option 2');
        fireEvent.click(option);
      });

      expect(handleChange).toHaveBeenCalledWith('2');
    });

    it('displays selected option', () => {
      render(<Select options={basicOptions} value="2" />);
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      const { container } = render(<Select options={basicOptions} size="sm" />);
      expect(
        container.querySelector('.pta-select-wrapper--sm')
      ).toBeInTheDocument();
    });

    it('renders medium size', () => {
      const { container } = render(<Select options={basicOptions} size="md" />);
      expect(
        container.querySelector('.pta-select-wrapper--md')
      ).toBeInTheDocument();
    });

    it('renders large size', () => {
      const { container } = render(<Select options={basicOptions} size="lg" />);
      expect(
        container.querySelector('.pta-select-wrapper--lg')
      ).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders outlined variant', () => {
      const { container } = render(
        <Select options={basicOptions} variant="outlined" />
      );
      expect(
        container.querySelector('.pta-select-wrapper--outlined')
      ).toBeInTheDocument();
    });

    it('renders filled variant', () => {
      const { container } = render(
        <Select options={basicOptions} variant="filled" />
      );
      expect(
        container.querySelector('.pta-select-wrapper--filled')
      ).toBeInTheDocument();
    });

    it('renders standard variant', () => {
      const { container } = render(
        <Select options={basicOptions} variant="standard" />
      );
      expect(
        container.querySelector('.pta-select-wrapper--standard')
      ).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('applies error state', () => {
      const { container } = render(
        <Select options={basicOptions} error="Error" />
      );
      const trigger = container.querySelector('.pta-select-trigger');
      expect(trigger).toHaveAttribute('aria-invalid', 'true');
    });

    it('applies disabled state', () => {
      const { container } = render(<Select options={basicOptions} disabled />);
      const trigger = container.querySelector('.pta-select-trigger');
      expect(trigger).toBeDisabled();
      expect(
        container.querySelector('.pta-select-wrapper--disabled')
      ).toBeInTheDocument();
    });

    it('opens dropdown on click', async () => {
      const { container } = render(<Select options={basicOptions} />);
      const trigger = container.querySelector('.pta-select-trigger');
      if (trigger) fireEvent.click(trigger);

      await waitFor(() => {
        expect(
          container.querySelector('.pta-select-dropdown')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Multiple Selection', () => {
    it('allows multiple selections', async () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Select options={basicOptions} multiple onChange={handleChange} />
      );
      const trigger = container.querySelector('.pta-select-trigger');
      if (trigger) fireEvent.click(trigger);

      await waitFor(() => {
        const option1 = screen.getByText('Option 1');
        const option2 = screen.getByText('Option 2');
        fireEvent.click(option1);
        fireEvent.click(option2);
      });

      expect(handleChange).toHaveBeenCalled();
    });

    it('displays checkboxes for multiple select', async () => {
      const { container } = render(<Select options={basicOptions} multiple />);
      const trigger = container.querySelector('.pta-select-trigger');
      if (trigger) fireEvent.click(trigger);

      await waitFor(() => {
        expect(container.querySelectorAll('.pta-select-checkbox')).toHaveLength(
          3
        );
      });
    });
  });

  describe('Search', () => {
    it('shows search input when searchable', async () => {
      const { container } = render(
        <Select options={basicOptions} searchable />
      );
      const trigger = container.querySelector('.pta-select-trigger');
      if (trigger) fireEvent.click(trigger);

      await waitFor(() => {
        expect(
          container.querySelector('.pta-select-search-input')
        ).toBeInTheDocument();
      });
    });

    it('filters options based on search', async () => {
      const { container } = render(
        <Select options={basicOptions} searchable />
      );
      const trigger = container.querySelector('.pta-select-trigger');
      if (trigger) fireEvent.click(trigger);

      await waitFor(() => {
        const searchInput = container.querySelector('.pta-select-search-input');
        if (searchInput) {
          fireEvent.input(searchInput, { target: { value: 'Option 2' } });
        }
      });

      await waitFor(() => {
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
      });
    });
  });

  describe('Clear Button', () => {
    it('shows clear button when clearable and has value', () => {
      const { container } = render(
        <Select options={basicOptions} clearable value="2" />
      );
      expect(container.querySelector('.pta-select-clear')).toBeTruthy();
    });

    it('clears selection on clear button click', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Select
          options={basicOptions}
          clearable
          value="2"
          onChange={handleChange}
        />
      );
      const clearButton = container.querySelector('.pta-select-clear');
      if (clearButton) fireEvent.click(clearButton);
      expect(handleChange).toHaveBeenCalledWith(null);
    });
  });

  describe('Loading State', () => {
    it('displays loading message', async () => {
      const { container } = render(
        <Select options={[]} isLoading loadingMessage="Loading..." />
      );
      const trigger = container.querySelector('.pta-select-trigger');
      if (trigger) fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Loading...')).toBeInTheDocument();
      });
    });
  });

  describe('No Options', () => {
    it('displays no options message', async () => {
      const { container } = render(
        <Select options={[]} noOptionsMessage="No options" />
      );
      const trigger = container.querySelector('.pta-select-trigger');
      if (trigger) fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('No options')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      const { container } = render(
        <Select options={basicOptions} label="Test" />
      );
      const trigger = container.querySelector('.pta-select-trigger');
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates aria-expanded when opened', async () => {
      const { container } = render(<Select options={basicOptions} />);
      const trigger = container.querySelector('.pta-select-trigger');
      if (trigger) {
        fireEvent.click(trigger);
        await waitFor(() => {
          expect(trigger).toHaveAttribute('aria-expanded', 'true');
        });
      }
    });
  });

  describe('Semantic States', () => {
    it('applies success semantic state', () => {
      const { container } = render(
        <Select options={basicOptions} semanticState="success" />
      );
      expect(
        container.querySelector('.pta-select-wrapper--state-success')
      ).toBeInTheDocument();
    });

    it('applies error semantic state', () => {
      const { container } = render(
        <Select options={basicOptions} semanticState="error" />
      );
      expect(
        container.querySelector('.pta-select-wrapper--state-error')
      ).toBeInTheDocument();
    });

    it('applies warning semantic state', () => {
      const { container } = render(
        <Select options={basicOptions} semanticState="warning" />
      );
      expect(
        container.querySelector('.pta-select-wrapper--state-warning')
      ).toBeInTheDocument();
    });
  });
});
