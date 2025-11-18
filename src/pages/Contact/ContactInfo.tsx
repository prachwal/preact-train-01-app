// Contact Info Section - Information cards

import { Typography, Card } from '../../ui';

export function ContactInfo() {
  return (
    <div className="pta-contact__info">
      <Card variant="outlined" className="pta-contact__info-card">
        <Typography variant="h5" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="body2" color="secondary" gutterBottom>
          We're here to help and answer any question you might have. We look
          forward to hearing from you.
        </Typography>
      </Card>

      <Card variant="outlined" className="pta-contact__info-card">
        <Typography variant="h5" gutterBottom>
          Response Time
        </Typography>
        <Typography variant="body2" color="secondary" gutterBottom>
          We typically respond to all inquiries within 24-48 hours during
          business days.
        </Typography>
      </Card>

      <Card variant="outlined" className="pta-contact__info-card">
        <Typography variant="h5" gutterBottom>
          Privacy
        </Typography>
        <Typography variant="body2" color="secondary" gutterBottom>
          Your information is safe with us. We never share your personal data
          with third parties. See our{' '}
          <a href="/privacy" className="pta-contact__link">
            Privacy Policy
          </a>
          .
        </Typography>
      </Card>
    </div>
  );
}
