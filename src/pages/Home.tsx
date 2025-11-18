import { Card, Typography, Grid, Button } from '../ui';
import { ICONS } from '../ui/Icons';
import {
  revenueSignal,
  activeUsersSignal,
  conversionRateSignal,
  avgOrderValueSignal,
  activitiesSignal,
} from '../application/signals';
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
          shadow="md"
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
                // Determine icon and color based on category
                let icon = ICONS.CLIPBOARD;
                let accentColor = 'var(--pta-color-primary)';

                if (activity.category === 'Order Management') {
                  icon = ICONS.PACKAGE;
                  accentColor = 'var(--pta-color-info)';
                } else if (activity.category === 'Finance') {
                  icon = ICONS.MONEY;
                  accentColor = 'var(--pta-color-success)';
                } else if (activity.category === 'User Management') {
                  icon = ICONS.PEOPLE;
                  accentColor = 'var(--pta-color-primary)';
                } else if (activity.category === 'System') {
                  icon = ICONS.GEAR;
                  accentColor = 'var(--pta-color-tertiary)';
                }

                return (
                  <div
                    key={activity.id}
                    className="activity-item"
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1rem',
                      borderLeft: `3px solid ${accentColor}`,
                      backgroundColor: 'var(--pta-color-bg-secondary)',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div
                      className="activity-icon"
                      style={{
                        fontSize: '1.5rem',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--pta-color-bg)',
                        borderRadius: '8px',
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body1" gutterBottom>
                        <strong>{activity.title}</strong>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary"
                        gutterBottom
                      >
                        {activity.description}
                      </Typography>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          alignItems: 'center',
                          marginTop: '0.25rem',
                        }}
                      >
                        <Typography variant="caption" color="tertiary">
                          {activity.time}
                        </Typography>
                        <span style={{ color: 'var(--pta-color-border)' }}>
                          ·
                        </span>
                        <Typography
                          variant="caption"
                          style={{ color: accentColor, fontWeight: 500 }}
                        >
                          {activity.category}
                        </Typography>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Grid>
          </div>
        </Card>
      </section>

      {/* Team Performance */}
      <section className="app-team">
        <Card variant="elevated" shadow="none" size="xl">
          <Typography variant="h3" gutterBottom>
            Team Performance
          </Typography>
          <Typography variant="body2" color="secondary" gutterBottom>
            Top performing team members this month
          </Typography>

          <div style={{ marginTop: '1rem' }}>
            <Grid direction="column" gap="sm">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'Senior Sales Manager',
                  revenue: 45200,
                  growth: 18.5,
                },
                {
                  name: 'Michael Chen',
                  role: 'Account Executive',
                  revenue: 38900,
                  growth: 15.2,
                },
                {
                  name: 'Emily Rodriguez',
                  role: 'Business Development',
                  revenue: 32450,
                  growth: 12.8,
                },
              ].map((member, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 0',
                    borderBottom:
                      idx < 2
                        ? '1px solid rgba(var(--pta-color-border-rgb, 0, 0, 0), 0.08)'
                        : 'none',
                  }}
                >
                  <div>
                    <Typography variant="body1" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="caption" color="tertiary">
                      {member.role}
                    </Typography>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Typography variant="body1" gutterBottom>
                      ${member.revenue.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="success">
                      +{member.growth}%
                    </Typography>
                  </div>
                </div>
              ))}
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
