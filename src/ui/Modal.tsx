import { h, type ComponentChildren } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import { Button, Typography } from './';
import './Modal.scss';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ComponentChildren;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && e.target === modalRef.current) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    // Focus trap
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement)?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="pta-modal" ref={modalRef}>
      <div
        className={`pta-modal__content pta-modal__content--${size} ${
          className || ''
        }`}
      >
        <div className="pta-modal__header">
          {title && (
            <Typography variant="h3" className="pta-modal__title">
              {title}
            </Typography>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="pta-modal__close"
            aria-label="Close modal"
          >
            ✕
          </Button>
        </div>
        <div className="pta-modal__body">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
