import { describe, it, expect, vi } from 'vitest';
import { h } from 'preact';
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { Switch } from '../ui/Switch';

describe('Switch Component', () => {
  describe('Rendering', () => {
    it('renders switch with correct structure', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} />
      );

      expect(container.querySelector('.pta-switch')).toBeInTheDocument();
      expect(
        container.querySelector('.pta-switch__slider')
      ).toBeInTheDocument();
      expect(container.querySelector('.pta-switch__thumb')).toBeInTheDocument();
    });

    it('renders with label text', () => {
      const handleChange = vi.fn();
      render(
        <Switch
          checked={false}
          onChange={handleChange}
          label="Enable feature"
        />
      );

      expect(screen.getByText('Enable feature')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch
          checked={false}
          onChange={handleChange}
          className="custom-switch"
        />
      );

      expect(container.querySelector('.custom-switch')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders unchecked state', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} />
      );

      const switchEl = container.querySelector('.pta-switch');
      expect(switchEl).not.toHaveClass('pta-switch--checked');
    });

    it('renders checked state', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={true} onChange={handleChange} />
      );

      const switchEl = container.querySelector('.pta-switch');
      expect(switchEl).toHaveClass('pta-switch--checked');
    });

    it('renders disabled state', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} disabled />
      );

      const switchEl = container.querySelector('.pta-switch');
      expect(switchEl).toHaveClass('pta-switch--disabled');

      const input = container.querySelector('input');
      expect(input).toBeDisabled();
    });

    it('renders checked and disabled', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={true} onChange={handleChange} disabled />
      );

      const switchEl = container.querySelector('.pta-switch');
      expect(switchEl).toHaveClass('pta-switch--checked');
      expect(switchEl).toHaveClass('pta-switch--disabled');
    });
  });

  describe('Interactions', () => {
    it('calls onChange when clicked', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} />
      );

      const slider = container.querySelector('.pta-switch__slider');
      fireEvent.click(slider!);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('toggles from checked to unchecked', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={true} onChange={handleChange} />
      );

      const slider = container.querySelector('.pta-switch__slider');
      fireEvent.click(slider!);

      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('does not call onChange when disabled', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} disabled />
      );

      const slider = container.querySelector('.pta-switch__slider');
      fireEvent.click(slider!);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('handles keyboard space key', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} />
      );

      const slider = container.querySelector('.pta-switch__slider');
      fireEvent.keyDown(slider!, { key: ' ' });

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('handles keyboard Enter key', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} />
      );

      const slider = container.querySelector('.pta-switch__slider');
      fireEvent.keyDown(slider!, { key: 'Enter' });

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('ignores other keyboard keys', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} />
      );

      const slider = container.querySelector('.pta-switch__slider');
      fireEvent.keyDown(slider!, { key: 'a' });

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not respond to keyboard when disabled', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} disabled />
      );

      const slider = container.querySelector('.pta-switch__slider');
      fireEvent.keyDown(slider!, { key: ' ' });

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has role="switch"', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} />
      );

      const slider = container.querySelector('.pta-switch__slider');
      expect(slider).toHaveAttribute('role', 'switch');
    });

    it('has correct aria-checked attribute', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={true} onChange={handleChange} />
      );

      const slider = container.querySelector('.pta-switch__slider');
      expect(slider).toHaveAttribute('aria-checked', 'true');
    });

    it('updates aria-checked on state change', () => {
      const handleChange = vi.fn();
      const { container, rerender } = render(
        <Switch checked={false} onChange={handleChange} />
      );

      let slider = container.querySelector('.pta-switch__slider');
      expect(slider).toHaveAttribute('aria-checked', 'false');

      rerender(<Switch checked={true} onChange={handleChange} />);

      slider = container.querySelector('.pta-switch__slider');
      expect(slider).toHaveAttribute('aria-checked', 'true');
    });

    it('has aria-disabled when disabled', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} disabled />
      );

      const slider = container.querySelector('.pta-switch__slider');
      expect(slider).toHaveAttribute('aria-disabled', 'true');
    });

    it('uses label as aria-label for input', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} label="Test label" />
      );

      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-label', 'Test label');
    });

    it('uses ariaLabel prop when provided', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch
          checked={false}
          onChange={handleChange}
          label="Visible label"
          ariaLabel="Screen reader label"
        />
      );

      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-label', 'Screen reader label');
    });

    it('is keyboard focusable when enabled', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} />
      );

      const slider = container.querySelector('.pta-switch__slider');
      expect(slider).toHaveAttribute('tabIndex', '0');
    });

    it('is not keyboard focusable when disabled', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} disabled />
      );

      const slider = container.querySelector('.pta-switch__slider');
      expect(slider).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Visual Elements', () => {
    it('renders On/Off labels', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} />
      );

      expect(
        container.querySelector('.pta-switch__label--on')
      ).toHaveTextContent('On');
      expect(
        container.querySelector('.pta-switch__label--off')
      ).toHaveTextContent('Off');
    });

    it('renders thumb element', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <Switch checked={false} onChange={handleChange} />
      );

      expect(container.querySelector('.pta-switch__thumb')).toBeInTheDocument();
    });
  });
});
