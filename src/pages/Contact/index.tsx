// Contact Page - Contact form with validation

import { useState, useEffect } from 'preact/hooks';
import { Typography, Card } from '../../ui';
import {
  initializeContactService,
  submitContactForm,
  type ContactFormData,
} from '../../services/ContactService';
import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';
import { SuccessMessage } from './SuccessMessage';
import './Contact.scss';

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize service
  useEffect(() => {
    initializeContactService();
  }, []);

  const handleSuccess = () => {
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="pta-contact">
      <div className="pta-contact__header">
        <Typography variant="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" color="secondary" gutterBottom>
          Have a question or feedback? We'd love to hear from you. Fill out the
          form below and we'll get back to you as soon as possible.
        </Typography>
      </div>

      <div className="pta-contact__content">
        <Card
          variant="elevated"
          shadow="medium"
          className="pta-contact__form-card"
        >
          {isSubmitted ? (
            <SuccessMessage />
          ) : (
            <ContactForm onSuccess={handleSuccess} />
          )}
        </Card>

        <ContactInfo />
      </div>
    </div>
  );
}
