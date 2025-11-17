import { describe, it, expect } from 'vitest';
import { h } from 'preact';
import { render } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { Card } from '../ui/Card';
import { Typography } from '../ui/Typography';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders card with children', () => {
      const { container } = render(
        <Card>
          <div>Card content</div>
        </Card>
      );

      expect(container.querySelector('.pta-card')).toBeInTheDocument();
      expect(container.textContent).toContain('Card content');
    });

    it('renders with title', () => {
      const { container } = render(
        <Card title="Test Title">
          <div>Content</div>
        </Card>
      );

      expect(container.textContent).toContain('Test Title');
      expect(container.querySelector('.pta-card__title')).toBeInTheDocument();
    });

    it('renders without title', () => {
      const { container } = render(
        <Card>
          <div>Content</div>
        </Card>
      );

      expect(
        container.querySelector('.pta-card__title')
      ).not.toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <Card className="custom-card">
          <div>Content</div>
        </Card>
      );

      expect(container.querySelector('.pta-card')).toHaveClass('custom-card');
    });
  });

  describe('Variants', () => {
    it('renders default variant (no class)', () => {
      const { container } = render(
        <Card variant="default">
          <div>Content</div>
        </Card>
      );

      // Default variant is not added as a class modifier
      expect(container.querySelector('.pta-card')).not.toHaveClass(
        'pta-card--default'
      );
    });

    it('renders elevated variant', () => {
      const { container } = render(
        <Card variant="elevated">
          <div>Content</div>
        </Card>
      );

      expect(container.querySelector('.pta-card')).toHaveClass(
        'pta-card--elevated'
      );
    });

    it('renders outlined variant', () => {
      const { container } = render(
        <Card variant="outlined">
          <div>Content</div>
        </Card>
      );

      expect(container.querySelector('.pta-card')).toHaveClass(
        'pta-card--outlined'
      );
    });
  });

  describe('Shadows', () => {
    it('applies no shadow', () => {
      const { container } = render(
        <Card shadow="none">
          <div>Content</div>
        </Card>
      );

      expect(container.querySelector('.pta-card')).toHaveClass(
        'pta-card--none'
      );
    });

    it('applies light shadow', () => {
      const { container } = render(
        <Card shadow="light">
          <div>Content</div>
        </Card>
      );

      expect(container.querySelector('.pta-card')).toHaveClass(
        'pta-card--light'
      );
    });

    it('applies medium shadow (default, no class)', () => {
      const { container } = render(
        <Card shadow="medium">
          <div>Content</div>
        </Card>
      );

      // Medium shadow is default and not added as a class modifier
      expect(container.querySelector('.pta-card')).not.toHaveClass(
        'pta-card--medium'
      );
    });

    it('applies heavy shadow', () => {
      const { container } = render(
        <Card shadow="heavy">
          <div>Content</div>
        </Card>
      );

      expect(container.querySelector('.pta-card')).toHaveClass(
        'pta-card--heavy'
      );
    });
  });

  describe('Border Properties', () => {
    it('applies small border radius', () => {
      const { container } = render(
        <Card borderRadius="sm">
          <div>Content</div>
        </Card>
      );

      expect(container.querySelector('.pta-card')).toHaveClass(
        'pta-card--border-radius-sm'
      );
    });

    it('applies medium border radius', () => {
      const { container } = render(
        <Card borderRadius="md">
          <div>Content</div>
        </Card>
      );

      expect(container.querySelector('.pta-card')).toHaveClass(
        'pta-card--border-radius-md'
      );
    });

    it('applies large border radius', () => {
      const { container } = render(
        <Card borderRadius="lg">
          <div>Content</div>
        </Card>
      );

      expect(container.querySelector('.pta-card')).toHaveClass(
        'pta-card--border-radius-lg'
      );
    });

    it('applies thin border', () => {
      const { container } = render(
        <Card borderWidth="thin">
          <div>Content</div>
        </Card>
      );

      expect(container.querySelector('.pta-card')).toHaveClass(
        'pta-card--border-width-thin'
      );
    });

    it('applies medium border', () => {
      const { container } = render(
        <Card borderWidth="medium">
          <div>Content</div>
        </Card>
      );

      expect(container.querySelector('.pta-card')).toHaveClass(
        'pta-card--border-width-medium'
      );
    });

    it('applies thick border', () => {
      const { container } = render(
        <Card borderWidth="thick">
          <div>Content</div>
        </Card>
      );

      expect(container.querySelector('.pta-card')).toHaveClass(
        'pta-card--border-width-thick'
      );
    });
  });

  describe('Combined Props', () => {
    it('applies multiple modifiers', () => {
      const { container } = render(
        <Card
          variant="elevated"
          shadow="medium"
          borderRadius="lg"
          title="Complex Card"
        >
          <div>Content</div>
        </Card>
      );

      const card = container.querySelector('.pta-card');
      expect(card).toHaveClass('pta-card--elevated');
      expect(card).toHaveClass('pta-card--border-radius-lg');
      // Shadow 'medium' is default and not added as a class modifier
    });
  });

  describe('Content Structure', () => {
    it('renders title in title section', () => {
      const { container } = render(
        <Card title="Header Title">
          <div>Body content</div>
        </Card>
      );

      const title = container.querySelector('.pta-card__title');
      expect(title).toBeInTheDocument();
      expect(title?.textContent).toContain('Header Title');
    });

    it('renders children in content section', () => {
      const { container } = render(
        <Card>
          <div className="test-content">Test Content</div>
        </Card>
      );

      const content = container.querySelector('.pta-card__content');
      expect(content).toBeInTheDocument();
      expect(content?.querySelector('.test-content')).toBeInTheDocument();
    });

    it('renders complex children', () => {
      const { container } = render(
        <Card title="Complex Card">
          <Typography variant="body1">Paragraph 1</Typography>
          <Typography variant="body2">Paragraph 2</Typography>
        </Card>
      );

      expect(container.textContent).toContain('Paragraph 1');
      expect(container.textContent).toContain('Paragraph 2');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards data attributes', () => {
      const { container } = render(
        <Card data-testid="test-card" data-custom="value">
          <div>Content</div>
        </Card>
      );

      const card = container.querySelector('.pta-card');
      expect(card).toHaveAttribute('data-testid', 'test-card');
      expect(card).toHaveAttribute('data-custom', 'value');
    });

    it('forwards id attribute', () => {
      const { container } = render(
        <Card id="my-card">
          <div>Content</div>
        </Card>
      );

      expect(container.querySelector('#my-card')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('uses default variant when not specified', () => {
      const { container } = render(
        <Card>
          <div>Content</div>
        </Card>
      );

      const card = container.querySelector('.pta-card');
      // Default variant is not added as a class modifier
      expect(card).not.toHaveClass('pta-card--default');
      expect(card).toHaveClass('pta-card--md'); // Default size
    });
  });

  describe('Accessibility', () => {
    it('maintains semantic HTML structure', () => {
      const { container } = render(
        <Card title="Accessible Card">
          <div>Content</div>
        </Card>
      );

      expect(container.querySelector('.pta-card__title')).toBeInTheDocument();
      expect(container.querySelector('.pta-card__content')).toBeInTheDocument();
    });
  });
});
