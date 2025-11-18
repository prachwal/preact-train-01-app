// Privacy Policy Page

import { Typography, Grid, Card } from '../../ui';
import './LegalPages.scss';

export const PrivacyPolicy = () => {
  return (
    <Grid direction="column" gap="lg" className="privacy-policy">
      <Typography variant="h1">Privacy Policy</Typography>
      <Typography variant="body1" color="secondary">
        Last updated: November 17, 2025
      </Typography>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">1. Information We Collect</Typography>
          <Typography variant="body1">
            We collect information that you provide directly to us, including
            when you create an account, update your profile, or use our
            services. This may include your name, email address, and
            preferences.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">2. How We Use Your Information</Typography>
          <Typography variant="body1">
            We use the information we collect to:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                Provide, maintain, and improve our services
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Send you technical notices and support messages
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Respond to your comments and questions
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Monitor and analyze trends, usage, and activities
              </Typography>
            </li>
          </ul>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">3. Information Sharing</Typography>
          <Typography variant="body1">
            We do not share your personal information with third parties except
            as described in this policy. We may share information with service
            providers who perform services on our behalf, and when required by
            law or to protect our rights.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">4. Data Security</Typography>
          <Typography variant="body1">
            We take reasonable measures to protect your information from
            unauthorized access, disclosure, alteration, or destruction.
            However, no internet transmission is ever fully secure or
            error-free.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">5. Your Rights</Typography>
          <Typography variant="body1">
            You have the right to access, update, or delete your personal
            information at any time. You may also have the right to restrict or
            object to certain processing of your data. Contact us to exercise
            these rights.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">6. Cookies and Tracking</Typography>
          <Typography variant="body1">
            We use cookies and similar tracking technologies to collect
            information about your browsing activities. You can control cookies
            through your browser settings, though this may affect the
            functionality of our services.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">7. Children's Privacy</Typography>
          <Typography variant="body1">
            Our services are not directed to children under 13. We do not
            knowingly collect personal information from children under 13. If
            you become aware that a child has provided us with personal
            information, please contact us.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">8. Changes to This Policy</Typography>
          <Typography variant="body1">
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the "Last updated" date.
          </Typography>
        </Grid>
      </Card>

      <Card>
        <Grid direction="column" gap="md">
          <Typography variant="h2">9. Contact Us</Typography>
          <Typography variant="body1">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </Typography>
          <Typography variant="body1" color="primary">
            privacy@preact-train-app.com
          </Typography>
        </Grid>
      </Card>
    </Grid>
  );
};
