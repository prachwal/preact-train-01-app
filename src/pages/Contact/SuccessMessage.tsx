// Success Message Section - Displayed after form submission

import { Typography } from '../../ui';

export function SuccessMessage() {
  return (
    <div className="pta-contact__success">
      <div className="pta-contact__success-icon">✓</div>
      <Typography variant="h3" gutterBottom align="center">
        Message Sent Successfully!
      </Typography>
      <Typography variant="body1" color="secondary" align="center">
        Thank you for contacting us. We'll respond to your message within 24-48
        hours.
      </Typography>
    </div>
  );
}
