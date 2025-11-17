import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { h } from 'preact';
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { Modal } from '../ui/Modal';
import { Typography } from '../ui/Typography';

describe('Modal Component', () => {
  beforeEach(() => {
    // Create a div to portal into
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    // Clean up
    document.body.style.overflow = '';
    const portalRoot = document.getElementById('modal-root');
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
  });

  describe('Rendering', () => {
    it('does not render when isOpen is false', () => {
      const handleClose = vi.fn();
      const { container } = render(
        <Modal isOpen={false} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      expect(document.body.querySelector('.pta-modal')).not.toBeInTheDocument();
    });

    it('renders when isOpen is true', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Modal Content</div>
        </Modal>
      );

      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('renders with title', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          <div>Content</div>
        </Modal>
      );

      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('renders without title', () => {
      const handleClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      expect(
        document.body.querySelector('.pta-modal__title')
      ).not.toBeInTheDocument();
    });

    it('renders close button', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const handleClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={handleClose} className="custom-modal">
          <div>Content</div>
        </Modal>
      );

      const content = document.body.querySelector('.pta-modal__content');
      expect(content).toHaveClass('custom-modal');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      const handleClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={handleClose} size="sm">
          <div>Content</div>
        </Modal>
      );

      const content = document.body.querySelector('.pta-modal__content');
      expect(content).toHaveClass('pta-modal__content--sm');
    });

    it('renders medium size (default)', () => {
      const handleClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      const content = document.body.querySelector('.pta-modal__content');
      expect(content).toHaveClass('pta-modal__content--md');
    });

    it('renders large size', () => {
      const handleClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={handleClose} size="lg">
          <div>Content</div>
        </Modal>
      );

      const content = document.body.querySelector('.pta-modal__content');
      expect(content).toHaveClass('pta-modal__content--lg');
    });
  });

  describe('Interactions', () => {
    it('calls onClose when close button is clicked', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      const closeButton = screen.getByLabelText('Close modal');
      fireEvent.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape key is pressed', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when clicking outside modal content', () => {
      const handleClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      const backdrop = document.body.querySelector('.pta-modal');
      fireEvent.mouseDown(backdrop!);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not close when clicking inside modal content', () => {
      const handleClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      const content = document.body.querySelector('.pta-modal__content');
      fireEvent.mouseDown(content!);

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('does not respond to non-Escape keys', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Enter' });

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('Body Overflow', () => {
    it('sets body overflow to hidden when open', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body overflow when closed', () => {
      const handleClose = vi.fn();
      const { rerender } = render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Modal isOpen={false} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Focus Management', () => {
    it('focuses first focusable element (close button) when opened', async () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <button>First Button</button>
          <button>Second Button</button>
        </Modal>
      );

      await waitFor(() => {
        const closeButton = screen.getByLabelText('Close modal');
        expect(closeButton).toHaveFocus();
      });
    });

    it('handles modal with no focusable elements', () => {
      const handleClose = vi.fn();
      expect(() => {
        render(
          <Modal isOpen={true} onClose={handleClose}>
            <div>No focusable elements</div>
          </Modal>
        );
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('close button has accessible label', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      const closeButton = screen.getByLabelText('Close modal');
      expect(closeButton).toBeInTheDocument();
    });

    it('renders title with correct heading level', () => {
      const handleClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={handleClose} title="Modal Title">
          <div>Content</div>
        </Modal>
      );

      const title = document.body.querySelector('.pta-modal__title');
      expect(title).toBeInTheDocument();
      expect(title?.tagName.toLowerCase()).toBe('h3');
    });
  });

  describe('Complex Content', () => {
    it('renders complex children', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="Complex Modal">
          <Typography variant="body1">First paragraph</Typography>
          <Typography variant="body2">Second paragraph</Typography>
          <button>Action Button</button>
        </Modal>
      );

      expect(screen.getByText('First paragraph')).toBeInTheDocument();
      expect(screen.getByText('Second paragraph')).toBeInTheDocument();
      expect(screen.getByText('Action Button')).toBeInTheDocument();
    });
  });

  describe('Event Cleanup', () => {
    it('removes event listeners on unmount', () => {
      const handleClose = vi.fn();
      const { unmount } = render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      unmount();

      // After unmount, pressing Escape should not call onClose
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('removes event listeners when closing', () => {
      const handleClose = vi.fn();
      const { rerender } = render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      rerender(
        <Modal isOpen={false} onClose={handleClose}>
          <div>Content</div>
        </Modal>
      );

      // After closing, pressing Escape should not call onClose again
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(handleClose).not.toHaveBeenCalled();
    });
  });
});
