// Key Features Section

import { Typography, Grid, Card } from '../../ui';

const features = [
  {
    icon: '🎨',
    title: 'Design System',
    description:
      'BEM methodology, WCAG AA compliant colors, fluid typography and spacing',
  },
  {
    icon: '🌓',
    title: 'Theme System',
    description: 'Light, dark, and auto modes with glassmorphism effects',
  },
  {
    icon: '📱',
    title: 'Responsive Design',
    description:
      'Mobile-first approach with breakpoints at 640px, 768px, 1024px, and 1280px',
  },
  {
    icon: '⚡',
    title: 'Performance Optimized',
    description:
      'Lazy loading, code splitting, and minimal bundle size (~40kB gzipped)',
  },
  {
    icon: '♿',
    title: 'Accessibility',
    description:
      'ARIA labels, keyboard navigation, focus management, and screen reader support',
  },
  {
    icon: '🧪',
    title: 'Tested',
    description:
      'Unit tests with Vitest, E2E tests with Playwright, 90%+ coverage',
  },
];

export function KeyFeatures() {
  return (
    <section className="app-demo">
      <Card variant="elevated" shadow="none" size="xl">
        <Typography variant="h3" gutterBottom>
          Key Features
        </Typography>
        <Typography variant="body2" color="secondary" gutterBottom>
          Comprehensive design system with modern patterns
        </Typography>

        <div style={{ marginTop: '1.5rem' }}>
          <Grid direction="column" gap="md">
            {features.map((feature, idx) => (
              <div key={idx}>
                <Typography variant="body1" gutterBottom>
                  {feature.icon} <strong>{feature.title}</strong>
                </Typography>
                <Typography variant="body2" color="secondary">
                  {feature.description}
                </Typography>
              </div>
            ))}
          </Grid>
        </div>
      </Card>
    </section>
  );
}
