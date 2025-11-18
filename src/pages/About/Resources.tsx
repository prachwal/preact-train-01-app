// Resources Section

import { Typography, Grid, Card, Button } from '../../ui';

export function Resources() {
  return (
    <section className="app-actions">
      <Card variant="elevated" shadow="none" size="xl">
        <Typography variant="h3" gutterBottom>
          Resources
        </Typography>
        <div style={{ marginTop: '1rem' }}>
          <Grid
            direction="row"
            gap="md"
            className="pta-grid--auto-column-mobile"
          >
            <Button variant="primary" size="md">
              Documentation
            </Button>
            <Button variant="secondary" size="md">
              GitHub Repository
            </Button>
            <Button variant="secondary" size="md">
              Report Issue
            </Button>
          </Grid>
        </div>
      </Card>
    </section>
  );
}
