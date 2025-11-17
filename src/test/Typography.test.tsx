import { describe, it, expect } from 'vitest';
import { h } from 'preact';
import { render } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { Typography } from '../ui/Typography';

describe('Typography Component', () => {
  describe('Rendering', () => {
    it('renders text content', () => {
      const { container } = render(<Typography>Test text</Typography>);

      expect(container.textContent).toBe('Test text');
    });

    it('renders with custom className', () => {
      const { container } = render(
        <Typography className="custom-class">Text</Typography>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders h1 variant', () => {
      const { container } = render(
        <Typography variant="h1">Heading 1</Typography>
      );

      expect(container.querySelector('h1')).toBeInTheDocument();
      expect(container.querySelector('h1')).toHaveClass(
        'pta-typography--variant-h1'
      );
    });

    it('renders h2 variant', () => {
      const { container } = render(
        <Typography variant="h2">Heading 2</Typography>
      );

      expect(container.querySelector('h2')).toBeInTheDocument();
      expect(container.querySelector('h2')).toHaveClass(
        'pta-typography--variant-h2'
      );
    });

    it('renders h3 variant', () => {
      const { container } = render(
        <Typography variant="h3">Heading 3</Typography>
      );

      expect(container.querySelector('h3')).toBeInTheDocument();
    });

    it('renders h4 variant', () => {
      const { container } = render(
        <Typography variant="h4">Heading 4</Typography>
      );

      expect(container.querySelector('h4')).toBeInTheDocument();
    });

    it('renders h5 variant', () => {
      const { container } = render(
        <Typography variant="h5">Heading 5</Typography>
      );

      expect(container.querySelector('h5')).toBeInTheDocument();
    });

    it('renders h6 variant', () => {
      const { container } = render(
        <Typography variant="h6">Heading 6</Typography>
      );

      expect(container.querySelector('h6')).toBeInTheDocument();
    });

    it('renders body1 variant with p tag', () => {
      const { container } = render(
        <Typography variant="body1">Body text</Typography>
      );

      expect(container.querySelector('p')).toBeInTheDocument();
      expect(container.querySelector('p')).toHaveClass(
        'pta-typography--variant-body1'
      );
    });

    it('renders body2 variant with p tag', () => {
      const { container } = render(
        <Typography variant="body2">Body text</Typography>
      );

      expect(container.querySelector('p')).toBeInTheDocument();
      expect(container.querySelector('p')).toHaveClass(
        'pta-typography--variant-body2'
      );
    });

    it('renders subtitle1 variant with h6 tag', () => {
      const { container } = render(
        <Typography variant="subtitle1">Subtitle 1</Typography>
      );

      expect(container.querySelector('h6')).toBeInTheDocument();
      expect(container.querySelector('h6')).toHaveClass(
        'pta-typography--variant-subtitle1'
      );
    });

    it('renders subtitle2 variant with h6 tag', () => {
      const { container } = render(
        <Typography variant="subtitle2">Subtitle 2</Typography>
      );

      expect(container.querySelector('h6')).toBeInTheDocument();
      expect(container.querySelector('h6')).toHaveClass(
        'pta-typography--variant-subtitle2'
      );
    });

    it('renders caption variant with span tag', () => {
      const { container } = render(
        <Typography variant="caption">Caption</Typography>
      );

      expect(container.querySelector('span')).toBeInTheDocument();
      expect(container.querySelector('span')).toHaveClass(
        'pta-typography--variant-caption'
      );
    });

    it('renders overline variant with span tag', () => {
      const { container } = render(
        <Typography variant="overline">Overline</Typography>
      );

      expect(container.querySelector('span')).toBeInTheDocument();
      expect(container.querySelector('span')).toHaveClass(
        'pta-typography--variant-overline'
      );
    });
  });

  describe('Colors', () => {
    it('applies text color (default, no class)', () => {
      const { container } = render(<Typography color="text">Text</Typography>);

      expect(container.firstChild).not.toHaveClass(
        'pta-typography--color-text'
      );
      expect(container.firstChild).toHaveClass('pta-typography--variant-body1');
    });

    it('applies primary color', () => {
      const { container } = render(
        <Typography color="primary">Text</Typography>
      );

      expect(container.firstChild).toHaveClass('pta-typography--color-primary');
    });

    it('applies secondary color', () => {
      const { container } = render(
        <Typography color="secondary">Text</Typography>
      );

      expect(container.firstChild).toHaveClass(
        'pta-typography--color-secondary'
      );
    });

    it('applies tertiary color', () => {
      const { container } = render(
        <Typography color="tertiary">Text</Typography>
      );

      expect(container.firstChild).toHaveClass(
        'pta-typography--color-tertiary'
      );
    });

    it('applies error color', () => {
      const { container } = render(<Typography color="error">Text</Typography>);

      expect(container.firstChild).toHaveClass('pta-typography--color-error');
    });

    it('applies warning color', () => {
      const { container } = render(
        <Typography color="warning">Text</Typography>
      );

      expect(container.firstChild).toHaveClass('pta-typography--color-warning');
    });

    it('applies info color', () => {
      const { container } = render(<Typography color="info">Text</Typography>);

      expect(container.firstChild).toHaveClass('pta-typography--color-info');
    });

    it('applies success color', () => {
      const { container } = render(
        <Typography color="success">Text</Typography>
      );

      expect(container.firstChild).toHaveClass('pta-typography--color-success');
    });
  });

  describe('Alignment', () => {
    it('applies left alignment (default, no class)', () => {
      const { container } = render(<Typography align="left">Text</Typography>);

      expect(container.firstChild).not.toHaveClass(
        'pta-typography--align-left'
      );
      expect(container.firstChild).toHaveClass('pta-typography--variant-body1');
    });

    it('applies center alignment', () => {
      const { container } = render(
        <Typography align="center">Text</Typography>
      );

      expect(container.firstChild).toHaveClass('pta-typography--align-center');
    });

    it('applies right alignment', () => {
      const { container } = render(<Typography align="right">Text</Typography>);

      expect(container.firstChild).toHaveClass('pta-typography--align-right');
    });

    it('applies justify alignment', () => {
      const { container } = render(
        <Typography align="justify">Text</Typography>
      );

      expect(container.firstChild).toHaveClass('pta-typography--align-justify');
    });
  });

  describe('Combined Props', () => {
    it('applies multiple modifiers', () => {
      const { container } = render(
        <Typography variant="h2" color="primary" align="center">
          Heading
        </Typography>
      );

      const element = container.querySelector('h2');
      expect(element).toHaveClass('pta-typography--variant-h2');
      expect(element).toHaveClass('pta-typography--color-primary');
      expect(element).toHaveClass('pta-typography--align-center');
    });

    it('combines all prop types', () => {
      const { container } = render(
        <Typography
          variant="body1"
          color="error"
          align="right"
          className="custom"
        >
          Text
        </Typography>
      );

      const element = container.querySelector('p');
      expect(element).toHaveClass('pta-typography--variant-body1');
      expect(element).toHaveClass('pta-typography--color-error');
      expect(element).toHaveClass('pta-typography--align-right');
      expect(element).toHaveClass('custom');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards id attribute', () => {
      const { container } = render(
        <Typography id="my-typography">Text</Typography>
      );

      expect(container.querySelector('#my-typography')).toBeInTheDocument();
    });

    it('forwards data attributes', () => {
      const { container } = render(
        <Typography data-testid="test-typo" data-custom="value">
          Text
        </Typography>
      );

      const element = container.firstChild;
      expect(element).toHaveAttribute('data-testid', 'test-typo');
      expect(element).toHaveAttribute('data-custom', 'value');
    });

    it('forwards style prop', () => {
      const { container } = render(
        <Typography style={{ marginTop: '10px' }}>Text</Typography>
      );

      expect(container.firstChild).toHaveStyle({ marginTop: '10px' });
    });
  });

  describe('Children Content', () => {
    it('renders string children', () => {
      const { container } = render(<Typography>Simple string</Typography>);

      expect(container.textContent).toBe('Simple string');
    });

    it('renders number children', () => {
      const { container } = render(<Typography>{42}</Typography>);

      expect(container.textContent).toBe('42');
    });

    it('renders nested elements', () => {
      const { container } = render(
        <Typography>
          Text with <strong>bold</strong> and <em>italic</em>
        </Typography>
      );

      expect(container.querySelector('strong')).toBeInTheDocument();
      expect(container.querySelector('em')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('maintains semantic heading hierarchy', () => {
      const { container: c1 } = render(
        <Typography variant="h1">H1</Typography>
      );
      const { container: c2 } = render(
        <Typography variant="h2">H2</Typography>
      );
      const { container: c3 } = render(
        <Typography variant="h3">H3</Typography>
      );

      expect(c1.querySelector('h1')).toBeInTheDocument();
      expect(c2.querySelector('h2')).toBeInTheDocument();
      expect(c3.querySelector('h3')).toBeInTheDocument();
    });

    it('uses appropriate semantic tags', () => {
      const { container: c1 } = render(
        <Typography variant="body1">Body</Typography>
      );
      const { container: c2 } = render(
        <Typography variant="caption">Caption</Typography>
      );

      expect(c1.querySelector('p')).toBeInTheDocument();
      expect(c2.querySelector('span')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('uses body1 variant by default', () => {
      const { container } = render(<Typography>Default</Typography>);

      expect(container.querySelector('p')).toBeInTheDocument();
      expect(container.querySelector('p')).toHaveClass(
        'pta-typography--variant-body1'
      );
    });
  });
});
