import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { ToggleButton } from '../ui/ToggleButton';
import type { ToggleItem } from '../types';

describe('ToggleButton', () => {
  const mockItems: ToggleItem[] = [
    { value: 'option1', label: 'Option 1', icon: '1️⃣' },
    { value: 'option2', label: 'Option 2', icon: '2️⃣' },
    { value: 'option3', label: 'Option 3', icon: '3️⃣' },
  ];

  describe('Rendering', () => {
    it('should render with default props', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should render with custom aria-label', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          items={mockItems}
          value="option1"
          onChange={handleChange}
          ariaLabel="Custom label"
        />
      );

      const button = screen.getByRole('button', { name: /custom label/i });
      expect(button).toBeInTheDocument();
    });

    it('should render with data-testid', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          items={mockItems}
          value="option1"
          onChange={handleChange}
          data-testid="toggle-btn"
        />
      );

      const element = container.querySelector('[data-testid="toggle-btn"]');
      expect(element).toBeInTheDocument();
    });
  });

  describe('Icon variant', () => {
    it('should render icon only', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          variant="icon"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const icon = container.querySelector('.pta-toggle-button__icon');
      expect(icon).toBeInTheDocument();
      expect(icon?.textContent).toBe('1️⃣');
    });

    it('should cycle to next item on click', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          variant="icon"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleChange).toHaveBeenCalledWith('option2');
    });

    it('should cycle back to first item after last', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          variant="icon"
          items={mockItems}
          value="option3"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleChange).toHaveBeenCalledWith('option1');
    });
  });

  describe('Icon-Text variant', () => {
    it('should render icon and text', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          variant="icon-text"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const icon = container.querySelector('.pta-toggle-button__icon');
      const label = container.querySelector('.pta-toggle-button__label');

      expect(icon).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(label?.textContent).toBe('Option 1');
    });

    it('should cycle through items on click', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          variant="icon-text"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleChange).toHaveBeenCalledWith('option2');
    });
  });

  describe('Text variant', () => {
    const textItems: ToggleItem[] = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ];

    it('should render text only', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          variant="text"
          items={textItems}
          value="a"
          onChange={handleChange}
        />
      );

      const label = container.querySelector('.pta-toggle-button__label');
      expect(label).toBeInTheDocument();
      expect(label?.textContent).toBe('Option A');
    });
  });

  describe('Dropdown variant', () => {
    it('should render dropdown button', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          variant="dropdown"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      const arrow = container.querySelector('.pta-toggle-button__arrow');

      expect(button).toBeInTheDocument();
      expect(arrow).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('should open dropdown on click', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          variant="dropdown"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      const dropdown = container.querySelector('.pta-toggle-button__dropdown');
      expect(dropdown).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should render all dropdown items', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          variant="dropdown"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(3);
    });

    it('should select item from dropdown', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          variant="dropdown"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      const option2 = screen.getAllByRole('option')[1];
      fireEvent.click(option2);

      expect(handleChange).toHaveBeenCalledWith('option2');
    });

    it('should close dropdown after selection', async () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          variant="dropdown"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      const option2 = screen.getAllByRole('option')[1];
      fireEvent.click(option2);

      await waitFor(() => {
        const dropdown = container.querySelector(
          '.pta-toggle-button__dropdown'
        );
        expect(dropdown).not.toBeInTheDocument();
      });
    });

    it('should mark selected item with checkmark', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          variant="dropdown"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      const checkmark = container.querySelector(
        '.pta-toggle-button__item-check'
      );
      expect(checkmark).toBeInTheDocument();
      expect(checkmark?.textContent).toBe('✓');
    });
  });

  describe('Keyboard navigation', () => {
    it('should cycle on Enter key for icon variant', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          variant="icon"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Enter' });

      expect(handleChange).toHaveBeenCalledWith('option2');
    });

    it('should cycle on Space key for icon variant', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          variant="icon"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: ' ' });

      expect(handleChange).toHaveBeenCalledWith('option2');
    });

    it('should open dropdown on Enter key', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          variant="dropdown"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Enter' });

      const dropdown = container.querySelector('.pta-toggle-button__dropdown');
      expect(dropdown).toBeInTheDocument();
    });

    it('should close dropdown on Escape key', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          variant="dropdown"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      const dropdown = container.querySelector('.pta-toggle-button__dropdown');
      expect(dropdown).toBeInTheDocument();

      fireEvent.keyDown(button, { key: 'Escape' });

      const dropdownAfter = container.querySelector(
        '.pta-toggle-button__dropdown'
      );
      expect(dropdownAfter).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply small size class', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          variant="icon"
          items={mockItems}
          value="option1"
          onChange={handleChange}
          size="sm"
        />
      );

      const element = container.querySelector('.pta-toggle-button--sm');
      expect(element).toBeInTheDocument();
    });

    it('should apply medium size class', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          variant="icon"
          items={mockItems}
          value="option1"
          onChange={handleChange}
          size="md"
        />
      );

      const element = container.querySelector('.pta-toggle-button--md');
      expect(element).toBeInTheDocument();
    });

    it('should apply large size class', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          variant="icon"
          items={mockItems}
          value="option1"
          onChange={handleChange}
          size="lg"
        />
      );

      const element = container.querySelector('.pta-toggle-button--lg');
      expect(element).toBeInTheDocument();
    });
  });

  describe('Disabled state', () => {
    it('should render disabled button', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          items={mockItems}
          value="option1"
          onChange={handleChange}
          disabled
        />
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should not call onChange when disabled', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          variant="icon"
          items={mockItems}
          value="option1"
          onChange={handleChange}
          disabled
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('should not open dropdown when disabled', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          variant="dropdown"
          items={mockItems}
          value="option1"
          onChange={handleChange}
          disabled
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      const dropdown = container.querySelector('.pta-toggle-button__dropdown');
      expect(dropdown).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          variant="icon"
          items={mockItems}
          value="option1"
          onChange={handleChange}
          ariaLabel="Test toggle"
        />
      );

      const button = screen.getByRole('button', { name: /test toggle/i });
      expect(button).toHaveAttribute('aria-label');
    });

    it('should have aria-expanded for dropdown', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          variant="dropdown"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have aria-haspopup for dropdown', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          variant="dropdown"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('should mark dropdown items as selected', () => {
      const handleChange = vi.fn();
      render(
        <ToggleButton
          variant="dropdown"
          items={mockItems}
          value="option1"
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      const selectedOption = screen.getByRole('option', { selected: true });
      expect(selectedOption).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <ToggleButton
          items={mockItems}
          value="option1"
          onChange={handleChange}
          className="custom-class"
        />
      );

      const element = container.querySelector('.custom-class');
      expect(element).toBeInTheDocument();
    });
  });
});
