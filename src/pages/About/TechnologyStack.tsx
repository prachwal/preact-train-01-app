// Technology Stack Section

import { Typography, Grid, Card } from '../../ui';

const technologies = [
  {
    name: 'Preact',
    version: '10.x',
    description: 'Fast 3kB React alternative',
  },
  {
    name: 'TypeScript',
    version: '5.x',
    description: 'Type-safe JavaScript',
  },
  {
    name: 'Vite',
    version: '7.x',
    description: 'Next-gen build tool',
  },
  {
    name: 'SCSS',
    version: 'Latest',
    description: 'Advanced CSS preprocessor',
  },
  {
    name: 'preact-iso',
    version: 'Latest',
    description: 'Client-side routing',
  },
  {
    name: '@preact/signals',
    version: 'Latest',
    description: 'Reactive state management',
  },
];

export function TechnologyStack() {
  return (
    <section className="app-demo">
      <Card variant="elevated" shadow="none" size="xl">
        <Typography variant="h3" gutterBottom>
          Technology Stack
        </Typography>
        <Typography variant="body2" color="secondary" gutterBottom>
          Built with modern web technologies for optimal performance
        </Typography>

        <div style={{ marginTop: '1.5rem' }}>
          <Grid direction="column" gap="sm">
            {technologies.map((tech, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.75rem 0',
                  borderBottom:
                    idx < technologies.length - 1
                      ? '1px solid rgba(var(--pta-color-border-rgb, 0, 0, 0), 0.08)'
                      : 'none',
                }}
              >
                <Grid direction="row" justify="between" align="center">
                  <div>
                    <Typography variant="body1" gutterBottom>
                      {tech.name}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      {tech.description}
                    </Typography>
                  </div>
                  <Typography variant="caption" color="tertiary">
                    {tech.version}
                  </Typography>
                </Grid>
              </div>
            ))}
          </Grid>
        </div>
      </Card>
    </section>
  );
}
