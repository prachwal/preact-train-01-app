// Home Page - Dashboard with metrics

import { Typography, Grid, Card, Button } from '../../ui';
import { ICONS } from '../../ui/Icons';
import {
  revenueSignal,
  activeUsersSignal,
  conversionRateSignal,
  avgOrderValueSignal,
  activitiesSignal,
} from '../../application/signals';
import './Home.scss';

export function Home() {
  return (
    <>
      {/* Dashboard Header */}
      <section className="app-content">
        <Card variant="elevated" shadow="none" size="xl">
          <Typography variant="h2" gutterBottom>
            Analytics Dashboard
          </Typography>
          <Typography variant="body1" color="secondary" gutterBottom>
            Real-time performance metrics and key business indicators
          </Typography>
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <Typography variant="caption" color="tertiary">
                Last updated
              </Typography>
              <Typography variant="body2">2 minutes ago</Typography>
            </div>
            <div>
              <Typography variant="caption" color="tertiary">
                Reporting Period
              </Typography>
              <Typography variant="body2">Nov 1-17, 2025</Typography>
            </div>
            <div>
              <Typography variant="caption" color="tertiary">
                Data Source
              </Typography>
              <Typography variant="body2">Production Database</Typography>
            </div>
          </div>
        </Card>
      </section>

      {/* Metrics Grid */}
      <section className="app-metrics">
        <Grid mode="grid" gap="lg" className="pta-grid--auto-column-mobile">
          <Card variant="elevated" shadow="none" size="md">
            <Typography variant="h4" color="tertiary" gutterBottom>
              Total Revenue
            </Typography>
            <Typography variant="h2" gutterBottom>
              ${revenueSignal.value.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="success">
              +12.5% from last month
            </Typography>
          </Card>

          <Card variant="elevated" shadow="none" size="md">
            <Typography variant="h4" color="tertiary" gutterBottom>
              Active Users
            </Typography>
            <Typography variant="h2" gutterBottom>
              {activeUsersSignal.value.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="success">
              +8.2% from last month
            </Typography>
          </Card>

          <Card variant="elevated" shadow="none" size="md">
            <Typography variant="h4" color="tertiary" gutterBottom>
              Conversion Rate
            </Typography>
            <Typography variant="h2" gutterBottom>
              {conversionRateSignal.value}%
            </Typography>
            <Typography variant="body2" color="error">
              -2.1% from last month
            </Typography>
          </Card>

          <Card variant="elevated" shadow="none" size="md">
            <Typography variant="h4" color="tertiary" gutterBottom>
              Avg. Order Value
            </Typography>
            <Typography variant="h2" gutterBottom>
              ${avgOrderValueSignal.value}
            </Typography>
            <Typography variant="body2" color="success">
              +5.8% from last month
            </Typography>
          </Card>
        </Grid>
      </section>

      {/* Recent Activity */}
      <section className="app-demo">
        <Card
          variant="elevated"
          shadow="medium"
          size="xl"
          className="activity-card"
        >
          <Typography variant="h3" gutterBottom>
            Recent Activity
          </Typography>
          <Typography variant="body2" color="secondary" gutterBottom>
            Latest transactions and system events
          </Typography>

          <div style={{ marginTop: '1.5rem' }}>
            <Grid direction="column" gap="md">
              {activitiesSignal.value.map(activity => {
                let icon = ICONS.CLIPBOARD;
                let accentColor = 'var(--pta-color-primary)';

                if (activity.category === 'payment') {
                  icon = ICONS.DOLLAR;
                  accentColor = 'var(--pta-color-success)';
                } else if (activity.category === 'user') {
                  icon = ICONS.PEOPLE;
                  accentColor = 'var(--pta-color-info)';
                } else if (activity.category === 'system') {
                  icon = ICONS.SETTINGS;
                  accentColor = 'var(--pta-color-warning)';
                } else if (activity.category === 'security') {
                  icon = ICONS.SHIELD;
                  accentColor = 'var(--pta-color-error)';
                }

                return (
                  <div
                    key={activity.id}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      background: 'var(--pta-color-bg-secondary)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '1.5rem',
                        color: accentColor,
                      }}
                    >
                      {icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <Typography variant="body1" gutterBottom>
                        {activity.title}
                      </Typography>
                      <Typography variant="body2" color="secondary">
                        {activity.description}
                      </Typography>
                    </div>
                    <Typography
                      variant="caption"
                      color="tertiary"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {activity.time}
                    </Typography>
                  </div>
                );
              })}
            </Grid>
          </div>
        </Card>
      </section>

      {/* Action Buttons */}
      <section className="app-actions">
        <Card variant="elevated" shadow="none" size="xl">
          <Typography variant="h3" gutterBottom>
            Quick Actions
          </Typography>
          <div style={{ marginTop: '1rem' }}>
            <Grid
              direction="row"
              gap="md"
              className="pta-grid--auto-column-mobile"
            >
              <Button variant="primary" size="md">
                Generate Report
              </Button>
              <Button variant="secondary" size="md">
                Export Data
              </Button>
              <Button variant="success" size="md">
                New Transaction
              </Button>
              <Button variant="secondary" size="md">
                Settings
              </Button>
            </Grid>
          </div>
        </Card>
      </section>
    </>
  );
}
