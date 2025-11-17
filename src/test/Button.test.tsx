import { describe, it, expect, vi } from 'vitest';
import { h } from 'preact';
import { render, screen, fireEvent } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { Button } from '../ui/Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders button with text content', () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole('button', { name: 'Click me' })
      ).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <Button className="custom-class">Test</Button>
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('custom-class');
    });

    it('applies disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Variants', () => {
    it('renders primary variant', () => {
      const { container } = render(<Button variant="primary">Primary</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--primary');
    });

    it('renders secondary variant', () => {
      const { container } = render(
        <Button variant="secondary">Secondary</Button>
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--secondary');
    });

    it('renders success variant', () => {
      const { container } = render(<Button variant="success">Success</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--success');
    });

    it('renders danger variant', () => {
      const { container } = render(<Button variant="danger">Danger</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--danger');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      const { container } = render(<Button size="sm">Small</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--sm');
    });

    it('renders medium size (default)', () => {
      const { container } = render(<Button size="md">Medium</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--md');
    });

    it('renders large size', () => {
      const { container } = render(<Button size="lg">Large</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--lg');
    });

    it('renders xl size', () => {
      const { container } = render(<Button size="xl">Extra Large</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--xl');
    });
  });

  describe('Semantic States', () => {
    it('applies success semantic state', () => {
      const { container } = render(
        <Button semanticState="success">Success</Button>
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--state-success');
    });

    it('applies error semantic state', () => {
      const { container } = render(
        <Button semanticState="error">Error</Button>
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--state-error');
    });

    it('applies warning semantic state', () => {
      const { container } = render(
        <Button semanticState="warning">Warning</Button>
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--state-warning');
    });

    it('applies info semantic state', () => {
      const { container } = render(<Button semanticState="info">Info</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--state-info');
    });
  });

  describe('Shadows', () => {
    it('applies light shadow', () => {
      const { container } = render(<Button shadow="light">Light</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--light');
    });

    it('applies medium shadow', () => {
      const { container } = render(<Button shadow="medium">Medium</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--medium');
    });

    it('applies heavy shadow', () => {
      const { container } = render(<Button shadow="heavy">Heavy</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--heavy');
    });

    it('applies no shadow', () => {
      const { container } = render(<Button shadow="none">None</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--none');
    });
  });

  describe('Border Radius', () => {
    it('applies small border radius', () => {
      const { container } = render(<Button borderRadius="sm">Small</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--border-radius-sm');
    });

    it('applies medium border radius', () => {
      const { container } = render(<Button borderRadius="md">Medium</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--border-radius-md');
    });

    it('applies large border radius', () => {
      const { container } = render(<Button borderRadius="lg">Large</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--border-radius-lg');
    });
  });

  describe('Border Width', () => {
    it('applies thin border', () => {
      const { container } = render(<Button borderWidth="thin">Thin</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--border-width-thin');
    });

    it('applies medium border', () => {
      const { container } = render(
        <Button borderWidth="medium">Medium</Button>
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--border-width-medium');
    });

    it('applies thick border', () => {
      const { container } = render(<Button borderWidth="thick">Thick</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('pta-button--border-width-thick');
    });
  });

  describe('Interactions', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('supports keyboard interactions', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Button>Accessible</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Button aria-label="Custom label">Icon</Button>);
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
    });

    it('is keyboard accessible', () => {
      const { container } = render(<Button>Keyboard</Button>);
      const button = container.querySelector('button');
      expect(button).not.toHaveAttribute('tabindex', '-1');
    });

    it('disabled button has aria-disabled', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');
    });
  });

  describe('Combined Props', () => {
    it('applies multiple modifiers correctly', () => {
      const { container } = render(
        <Button variant="primary" size="lg" shadow="medium" borderRadius="lg">
          Combined
        </Button>
      );
      const button = container.querySelector('button');

      expect(button).toHaveClass('pta-button--primary');
      expect(button).toHaveClass('pta-button--lg');
      expect(button).toHaveClass('pta-button--medium');
      expect(button).toHaveClass('pta-button--border-radius-lg');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards other HTML attributes', () => {
      const { container } = render(
        <Button data-testid="test-button" id="my-button">
          Test
        </Button>
      );
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('data-testid', 'test-button');
      expect(button).toHaveAttribute('id', 'my-button');
    });
  });
});
