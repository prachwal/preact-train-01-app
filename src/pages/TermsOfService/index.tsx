// Terms of Service Page

import { Typography, Grid, Card } from '../../ui';
import './LegalPages.scss';

export const TermsOfService = () => {
  return (
    <Grid direction="column" gap="lg" className="terms-of-service">
      <Typography variant="h1">Terms of Service</Typography>
      <Typography variant="body1" color="secondary">
        Last updated: November 17, 2025
      </Typography>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">1. Acceptance of Terms</Typography>
          <Typography variant="body1">
            By accessing and using this service, you accept and agree to be
            bound by the terms and provision of this agreement. If you do not
            agree to these terms, please do not use our service.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">2. Use License</Typography>
          <Typography variant="body1">
            Permission is granted to temporarily access the materials on our
            service for personal, non-commercial transitory viewing only. This
            is the grant of a license, not a transfer of title.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">3. User Account</Typography>
          <Typography variant="body1">
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to accept responsibility for all
            activities that occur under your account.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">4. Disclaimer</Typography>
          <Typography variant="body1">
            The materials on our service are provided on an 'as is' basis. We
            make no warranties, expressed or implied, and hereby disclaim all
            other warranties.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">5. Limitations</Typography>
          <Typography variant="body1">
            In no event shall we or our suppliers be liable for any damages
            arising out of the use or inability to use our service.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">6. Contact Information</Typography>
          <Typography variant="body1">
            Questions about the Terms of Service should be sent to us at:
          </Typography>
          <Typography variant="body1" color="primary">
            legal@preact-train-app.com
          </Typography>
        </Grid>
      </Card>
    </Grid>
  );
};
