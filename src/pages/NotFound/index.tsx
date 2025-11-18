// NotFound Page - 404 Error

import { Card, Typography, Button, Grid } from '../../ui';

export function NotFound() {
  return (
    <section className="app-content">
      <Card variant="elevated" shadow="none" size="xl">
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <Typography
            variant="h1"
            gutterBottom
            style={{ fontSize: '6rem', lineHeight: '1' }}
          >
            404
          </Typography>
          <Typography variant="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="secondary" gutterBottom>
            The page you are looking for doesn't exist or has been moved.
          </Typography>

          <div style={{ marginTop: '2rem' }}>
            <Grid direction="row" gap="md" style={{ justifyContent: 'center' }}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => (window.location.href = '/')}
              >
                Go Home
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </Grid>
          </div>
        </div>
      </Card>
    </section>
  );
}
