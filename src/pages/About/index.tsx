// About Page - Application Information

// @ts-ignore
import packageJson from '../../../package.json';
import { Typography, Grid, Card, Button } from '../../ui';
import { AppInfo } from './AppInfo';
import { TechnologyStack } from './TechnologyStack';
import { KeyFeatures } from './KeyFeatures';
import { Resources } from './Resources';

export function About() {
  return (
    <>
      {/* Header */}
      <section className="app-content">
        <Card variant="elevated" shadow="none" size="xl">
          <Typography variant="h2" gutterBottom>
            About
          </Typography>
          <Typography variant="body1" color="secondary">
            Learn more about this application and its features
          </Typography>
        </Card>
      </section>

      <AppInfo version={packageJson.version} />
      <TechnologyStack />
      <KeyFeatures />
      <Resources />
    </>
  );
}
