import { Typography, Grid, Card } from '../ui';
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
            is the grant of a license, not a transfer of title, and under this
            license you may not:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                Modify or copy the materials
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Use the materials for any commercial purpose or public display
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Attempt to reverse engineer any software contained on our
                service
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Remove any copyright or proprietary notations from the materials
              </Typography>
            </li>
          </ul>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">3. User Account</Typography>
          <Typography variant="body1">
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to accept responsibility for all
            activities that occur under your account. We reserve the right to
            refuse service, terminate accounts, or remove content at our sole
            discretion.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">4. Disclaimer</Typography>
          <Typography variant="body1">
            The materials on our service are provided on an 'as is' basis. We
            make no warranties, expressed or implied, and hereby disclaim and
            negate all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a
            particular purpose, or non-infringement of intellectual property.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">5. Limitations</Typography>
          <Typography variant="body1">
            In no event shall we or our suppliers be liable for any damages
            (including, without limitation, damages for loss of data or profit,
            or due to business interruption) arising out of the use or inability
            to use our service, even if we have been notified orally or in
            writing of the possibility of such damage.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">6. Accuracy of Materials</Typography>
          <Typography variant="body1">
            The materials appearing on our service could include technical,
            typographical, or photographic errors. We do not warrant that any of
            the materials on our service are accurate, complete, or current. We
            may make changes to the materials at any time without notice.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">7. Links</Typography>
          <Typography variant="body1">
            We have not reviewed all of the sites linked to our service and are
            not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by us. Use of any
            such linked website is at the user's own risk.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">8. Modifications</Typography>
          <Typography variant="body1">
            We may revise these terms of service at any time without notice. By
            using this service, you are agreeing to be bound by the then current
            version of these terms of service.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">9. Governing Law</Typography>
          <Typography variant="body1">
            These terms and conditions are governed by and construed in
            accordance with the laws and you irrevocably submit to the exclusive
            jurisdiction of the courts in that location.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">10. Contact Information</Typography>
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
