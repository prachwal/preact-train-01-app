// Contact Form Section - Main form with validation

import { useState } from 'preact/hooks';
import type { JSX } from 'preact';
import { Button, Input, Form, Textarea, Checkbox, RadioGroup } from '../../ui';
import type { RadioOption } from '../../types';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  subscribeNewsletter: boolean;
  preferredContactMethod: 'email' | 'phone' | 'none';
  phone?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  phone?: string;
  preferredContactMethod?: string;
}

/**
 * Form data structure for contact form
 */
export type { FormData };

/**
 * Form validation errors structure
 */
export type { FormErrors };

const contactMethodOptions: RadioOption[] = [
  { value: 'email', label: 'Email', helperText: 'We will respond via email' },
  { value: 'phone', label: 'Phone', helperText: 'We will call you back' },
  { value: 'none', label: 'No preference', helperText: 'Any method works' },
];

interface ContactFormProps {
  onSuccess: () => void;
  initialData?: Partial<FormData>;
}

/**
 * Props for the ContactForm component
 */
export type { ContactFormProps };

export function ContactForm({ onSuccess, initialData }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    subject: initialData?.subject || '',
    message: initialData?.message || '',
    subscribeNewsletter: initialData?.subscribeNewsletter || false,
    preferredContactMethod: initialData?.preferredContactMethod || 'email',
    phone: initialData?.phone || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 500) {
      newErrors.message = 'Message must be no more than 500 characters';
    }

    // Phone validation (if phone method selected)
    if (formData.preferredContactMethod === 'phone') {
      if (!formData.phone?.trim()) {
        newErrors.phone = 'Phone number is required for phone contact';
      } else if (!/^[\d\s()+-]+$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    onSuccess();
  };

  const handleChange =
    (field: keyof FormData) =>
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const value = (e.target as HTMLInputElement).value;
      setFormData(prev => ({ ...prev, [field]: value }));
      // Clear error when user starts typing
      if (field in errors) {
        const newErrors = { ...errors };
        delete newErrors[field as keyof FormErrors];
        setErrors(newErrors);
      }
    };

  return (
    <Form
      onSubmit={handleSubmit}
      onValidate={validateForm}
      isSubmitting={isSubmitting}
      className="pta-contact__form"
    >
      <div className="pta-contact__form-row">
        <Input
          label="Your Name"
          value={formData.name}
          onInput={handleChange('name')}
          placeholder="John Doe"
          {...(errors.name && { error: errors.name })}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="pta-contact__form-row">
        <Input
          label="Email Address"
          type="email"
          value={formData.email}
          onInput={handleChange('email')}
          placeholder="john.doe@example.com"
          {...(errors.email && { error: errors.email })}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="pta-contact__form-row">
        <Input
          label="Subject"
          value={formData.subject}
          onInput={handleChange('subject')}
          placeholder="What is this regarding?"
          {...(errors.subject && { error: errors.subject })}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="pta-contact__form-row">
        <Textarea
          label="Message"
          value={formData.message}
          onInput={e => {
            const value = (e.target as HTMLTextAreaElement).value;
            setFormData(prev => ({ ...prev, message: value }));
            if ('message' in errors) {
              const newErrors = { ...errors };
              delete newErrors.message;
              setErrors(newErrors);
            }
          }}
          placeholder="Tell us what's on your mind..."
          {...(errors.message && { error: errors.message })}
          disabled={isSubmitting}
          rows={6}
          maxLength={500}
          showCharacterCount
          required
        />
      </div>

      <div className="pta-contact__form-row">
        <RadioGroup
          name="preferredContactMethod"
          label="Preferred Contact Method"
          options={contactMethodOptions}
          value={formData.preferredContactMethod}
          onChange={value => {
            setFormData(prev => ({
              ...prev,
              preferredContactMethod: value as 'email' | 'phone' | 'none',
            }));
            if ('preferredContactMethod' in errors) {
              const newErrors = { ...errors };
              delete newErrors.preferredContactMethod;
              setErrors(newErrors);
            }
          }}
          {...(errors.preferredContactMethod && {
            error: errors.preferredContactMethod,
          })}
          disabled={isSubmitting}
          direction="column"
          required
        />
      </div>

      {formData.preferredContactMethod === 'phone' && (
        <div className="pta-contact__form-row">
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone || ''}
            onInput={e => {
              const value = (e.target as HTMLInputElement).value;
              setFormData(prev => ({ ...prev, phone: value }));
              if ('phone' in errors) {
                const newErrors = { ...errors };
                delete newErrors.phone;
                setErrors(newErrors);
              }
            }}
            placeholder="+48 123 456 789"
            {...(errors.phone && { error: errors.phone })}
            disabled={isSubmitting}
            required
          />
        </div>
      )}

      <div className="pta-contact__form-row">
        <Checkbox
          name="subscribeNewsletter"
          label="Subscribe to our newsletter for updates and news"
          checked={formData.subscribeNewsletter}
          onChange={checked => {
            setFormData(prev => ({
              ...prev,
              subscribeNewsletter: checked,
            }));
          }}
          disabled={isSubmitting}
          variant="primary"
        />
      </div>

      <div className="pta-contact__form-actions">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="pta-contact__submit-button"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </Form>
  );
}
