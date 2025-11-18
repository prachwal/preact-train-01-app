import type { FormProps } from '../types';
import { buildClassName } from '../types';
import type { JSX } from 'preact';

export const Form = ({
  onSubmit,
  onValidate,
  isSubmitting = false,
  noValidate = false,
  autoComplete = 'on',
  children,
  className: additionalClassName,
  id,
  ...props
}: FormProps) => {
  // Build class names using BEM pattern
  const modifiers: Record<string, boolean | string | undefined> = {
    submitting: isSubmitting,
  };

  const formClassName = buildClassName('pta-form', modifiers);
  const finalClassName = additionalClassName
    ? `${formClassName} ${additionalClassName}`
    : formClassName;

  // Event handler
  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();

    // Run validation if provided
    if (onValidate && !onValidate()) {
      return;
    }

    // Call submit handler
    if (onSubmit) {
      await onSubmit(e);
    }
  };

  return (
    <form
      id={id}
      className={finalClassName}
      onSubmit={handleSubmit}
      noValidate={noValidate}
      autoComplete={autoComplete}
      {...props}
    >
      {children}
    </form>
  );
};
