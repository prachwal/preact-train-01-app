// Application Info Section

import { Typography, Grid, Card } from '../../ui';

/**
 * Props for the AppInfo component
 */
export interface AppInfoProps {
  version: string;
}

export function AppInfo({ version }: AppInfoProps) {
  return (
    <section className="app-demo">
      <Card variant="elevated" shadow="none" size="xl">
        <Typography variant="h3" gutterBottom>
          Preact Dashboard
        </Typography>
        <Typography variant="body1" color="secondary" gutterBottom>
          A modern, responsive analytics dashboard built with Preact and
          TypeScript
        </Typography>

        <div style={{ marginTop: '1.5rem' }}>
          <Grid direction="column" gap="md">
            <div>
              <Typography variant="caption" color="tertiary" gutterBottom>
                Version
              </Typography>
              <Typography variant="body1">v{version}</Typography>
            </div>

            <div>
              <Typography variant="caption" color="tertiary" gutterBottom>
                Build Date
              </Typography>
              <Typography variant="body1">November 17, 2025</Typography>
            </div>

            <div>
              <Typography variant="caption" color="tertiary" gutterBottom>
                Environment
              </Typography>
              <Typography variant="body1">Production</Typography>
            </div>
          </Grid>
        </div>
      </Card>
    </section>
  );
}
