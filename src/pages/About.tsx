import { Card, Typography, Grid, Button } from '../ui';
// @ts-ignore
import packageJson from '../../package.json';

export function About() {
  return (
    <>
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

      {/* Application Info */}
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
                <Typography variant="body1">v{packageJson.version}</Typography>
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

      {/* Technology Stack */}
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
              {[
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
              ].map((tech, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.75rem 0',
                    borderBottom:
                      idx < 5
                        ? '1px solid rgba(var(--pta-color-border-rgb, 0, 0, 0), 0.08)'
                        : 'none',
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    <strong>{tech.name}</strong>{' '}
                    <span style={{ color: 'var(--pta-color-text-tertiary)' }}>
                      v{tech.version}
                    </span>
                  </Typography>
                  <Typography variant="caption" color="tertiary">
                    {tech.description}
                  </Typography>
                </div>
              ))}
            </Grid>
          </div>
        </Card>
      </section>

      {/* Features */}
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
              <div>
                <Typography variant="body1" gutterBottom>
                  🎨 <strong>Design System</strong>
                </Typography>
                <Typography variant="body2" color="secondary">
                  BEM methodology, WCAG AA compliant colors, fluid typography
                  and spacing
                </Typography>
              </div>

              <div>
                <Typography variant="body1" gutterBottom>
                  🌓 <strong>Theme Support</strong>
                </Typography>
                <Typography variant="body2" color="secondary">
                  Light, dark, and auto modes with glassmorphism effects
                </Typography>
              </div>

              <div>
                <Typography variant="body1" gutterBottom>
                  📱 <strong>Responsive Design</strong>
                </Typography>
                <Typography variant="body2" color="secondary">
                  Mobile-first with 6 breakpoints, hamburger menu, sticky
                  sidebar
                </Typography>
              </div>

              <div>
                <Typography variant="body1" gutterBottom>
                  🧩 <strong>Component Library</strong>
                </Typography>
                <Typography variant="body2" color="secondary">
                  Button, Card, Grid, Typography with typed props and variants
                </Typography>
              </div>

              <div>
                <Typography variant="body1" gutterBottom>
                  ⚡ <strong>Performance</strong>
                </Typography>
                <Typography variant="body2" color="secondary">
                  Signals for reactive state, lazy loading, code splitting
                </Typography>
              </div>

              <div>
                <Typography variant="body1" gutterBottom>
                  🧪 <strong>Testing</strong>
                </Typography>
                <Typography variant="body2" color="secondary">
                  Vitest for unit tests, Playwright for E2E with visual
                  regression
                </Typography>
              </div>
            </Grid>
          </div>
        </Card>
      </section>

      {/* Links */}
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
    </>
  );
}
