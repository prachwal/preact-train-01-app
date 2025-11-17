import { Card, Typography, Grid, Button, Switch, Modal } from '../ui';
import { themeSignal } from '../application/signals';
import {
  emailNotificationsSignal,
  desktopNotificationsSignal,
  weeklySummarySignal,
  developerModeSignal,
  betaFeaturesSignal,
  initializeSettings,
} from '../services/SettingsService';
import { useEffect, useState } from 'preact/hooks';
import './Settings.scss';

export function Settings() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Initialize settings from localStorage on mount
  useEffect(() => {
    initializeSettings();
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
    themeSignal.value = newTheme;
    localStorage.setItem('pta-theme', newTheme);

    if (newTheme === 'auto') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      document.documentElement.setAttribute(
        'data-theme',
        prefersDark ? 'dark' : 'light'
      );
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  return (
    <>
      <section className="app-content">
        <Card variant="elevated" shadow="none" size="xl">
          <Typography variant="h2" gutterBottom>
            Settings
          </Typography>
          <Typography variant="body1" color="secondary">
            Customize your application preferences and appearance
          </Typography>
        </Card>
      </section>

      {/* General Settings */}
      <section id="general" className="app-demo settings-section">
        <Card variant="elevated" shadow="none" size="xl">
          <Typography variant="h3" gutterBottom>
            General
          </Typography>
          <Typography variant="body2" color="secondary" gutterBottom>
            Basic application settings and preferences
          </Typography>

          <div style={{ marginTop: '1.5rem' }}>
            <Grid direction="column" gap="md">
              <div>
                <Typography variant="caption" color="tertiary" gutterBottom>
                  Language
                </Typography>
                <Typography variant="body1">English (US)</Typography>
              </div>

              <div>
                <Typography variant="caption" color="tertiary" gutterBottom>
                  Time Zone
                </Typography>
                <Typography variant="body1">UTC+0 (London)</Typography>
              </div>
            </Grid>
          </div>
        </Card>
      </section>

      {/* Appearance / Theme Settings */}
      <section id="appearance" className="app-demo settings-section">
        {' '}
        <Card variant="elevated" shadow="none" size="xl">
          <Typography variant="h3" gutterBottom>
            Appearance
          </Typography>
          <Typography variant="body2" color="secondary" gutterBottom>
            Choose your preferred color scheme
          </Typography>

          <div style={{ marginTop: '1.5rem' }}>
            <Grid direction="row" gap="md">
              <Button
                variant={
                  themeSignal.value === 'light' ? 'primary' : 'secondary'
                }
                size="md"
                onClick={() => handleThemeChange('light')}
              >
                Light
              </Button>
              <Button
                variant={themeSignal.value === 'dark' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => handleThemeChange('dark')}
              >
                Dark
              </Button>
              <Button
                variant={themeSignal.value === 'auto' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => handleThemeChange('auto')}
              >
                Auto
              </Button>
            </Grid>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <Typography variant="caption" color="tertiary">
              Current theme: <strong>{themeSignal.value}</strong>
            </Typography>
          </div>
        </Card>
      </section>

      {/* Notification Settings */}
      <section id="notifications" className="app-demo settings-section">
        <Card variant="elevated" shadow="none" size="xl">
          <Typography variant="h3" gutterBottom>
            Notifications
          </Typography>
          <Typography variant="body2" color="secondary" gutterBottom>
            Manage how you receive updates and alerts
          </Typography>

          <div style={{ marginTop: '1.5rem' }}>
            <Grid direction="column" gap="md">
              <div className="settings-item">
                <div>
                  <Typography variant="body1" gutterBottom>
                    Email Notifications
                  </Typography>
                  <Typography variant="caption" color="tertiary">
                    Receive updates via email
                  </Typography>
                </div>
                <Switch
                  checked={emailNotificationsSignal.value}
                  onChange={checked => {
                    emailNotificationsSignal.value = checked;
                  }}
                  ariaLabel="Email notifications"
                />
              </div>

              <div className="settings-item">
                <div>
                  <Typography variant="body1" gutterBottom>
                    Desktop Notifications
                  </Typography>
                  <Typography variant="caption" color="tertiary">
                    Show browser notifications
                  </Typography>
                </div>
                <Switch
                  checked={desktopNotificationsSignal.value}
                  onChange={checked => {
                    desktopNotificationsSignal.value = checked;
                  }}
                  ariaLabel="Desktop notifications"
                />
              </div>

              <div className="settings-item">
                <div>
                  <Typography variant="body1" gutterBottom>
                    Weekly Summary
                  </Typography>
                  <Typography variant="caption" color="tertiary">
                    Get weekly performance reports
                  </Typography>
                </div>
                <Switch
                  checked={weeklySummarySignal.value}
                  onChange={checked => {
                    weeklySummarySignal.value = checked;
                  }}
                  ariaLabel="Weekly summary"
                />
              </div>
            </Grid>
          </div>
        </Card>
      </section>

      {/* Privacy & Account Settings */}
      <section id="privacy" className="app-demo settings-section">
        <Card variant="elevated" shadow="none" size="xl">
          <Typography variant="h3" gutterBottom>
            Privacy & Account
          </Typography>
          <Typography variant="body2" color="secondary" gutterBottom>
            Manage your account details and preferences
          </Typography>

          <div style={{ marginTop: '1.5rem' }}>
            <Grid direction="column" gap="md">
              <div>
                <Typography variant="caption" color="tertiary" gutterBottom>
                  Full Name
                </Typography>
                <Typography variant="body1">John Doe</Typography>
              </div>

              <div>
                <Typography variant="caption" color="tertiary" gutterBottom>
                  Email Address
                </Typography>
                <Typography variant="body1">john.doe@example.com</Typography>
              </div>

              <div>
                <Typography variant="caption" color="tertiary" gutterBottom>
                  Role
                </Typography>
                <Typography variant="body1">Administrator</Typography>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <Grid
                  direction="row"
                  gap="md"
                  wrap={true}
                  className="pta-grid--auto-column-mobile"
                >
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setEditModalOpen(true)}
                    className="pta-button--flex-1"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setPasswordModalOpen(true)}
                    className="pta-button--flex-1"
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="danger"
                    size="md"
                    onClick={() => setDeleteModalOpen(true)}
                    className="pta-button--flex-1"
                  >
                    Delete Account
                  </Button>
                </Grid>
              </div>
            </Grid>
          </div>
        </Card>
      </section>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Profile"
        size="md"
      >
        <Grid direction="column" gap="md">
          <div>
            <Typography variant="body2" color="secondary" gutterBottom>
              Full Name
            </Typography>
            <input
              type="text"
              defaultValue="John Doe"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--pta-color-border)',
                background: 'var(--pta-color-bg)',
                color: 'var(--pta-color-text-primary)',
              }}
            />
          </div>
          <div>
            <Typography variant="body2" color="secondary" gutterBottom>
              Email Address
            </Typography>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--pta-color-border)',
                background: 'var(--pta-color-bg)',
                color: 'var(--pta-color-text-primary)',
              }}
            />
          </div>
          <div>
            <Typography variant="body2" color="secondary" gutterBottom>
              Role
            </Typography>
            <input
              type="text"
              defaultValue="Administrator"
              disabled
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--pta-color-border)',
                background: 'var(--pta-color-bg-secondary)',
                color: 'var(--pta-color-text-tertiary)',
                opacity: 0.6,
              }}
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Grid direction="row" gap="md">
              <Button
                variant="primary"
                size="md"
                onClick={() => setEditModalOpen(false)}
              >
                Save Changes
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
          </div>
        </Grid>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        title="Change Password"
        size="md"
      >
        <Grid direction="column" gap="md">
          <div>
            <Typography variant="body2" color="secondary" gutterBottom>
              Current Password
            </Typography>
            <input
              type="password"
              placeholder="Enter current password"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--pta-color-border)',
                background: 'var(--pta-color-bg)',
                color: 'var(--pta-color-text-primary)',
              }}
            />
          </div>
          <div>
            <Typography variant="body2" color="secondary" gutterBottom>
              New Password
            </Typography>
            <input
              type="password"
              placeholder="Enter new password"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--pta-color-border)',
                background: 'var(--pta-color-bg)',
                color: 'var(--pta-color-text-primary)',
              }}
            />
          </div>
          <div>
            <Typography variant="body2" color="secondary" gutterBottom>
              Confirm New Password
            </Typography>
            <input
              type="password"
              placeholder="Confirm new password"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--pta-color-border)',
                background: 'var(--pta-color-bg)',
                color: 'var(--pta-color-text-primary)',
              }}
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Grid direction="row" gap="md">
              <Button
                variant="primary"
                size="md"
                onClick={() => setPasswordModalOpen(false)}
              >
                Change Password
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setPasswordModalOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
          </div>
        </Grid>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Account"
        size="md"
      >
        <Grid direction="column" gap="md">
          <Typography variant="body1" color="error" gutterBottom>
            ⚠️ Warning: This action cannot be undone!
          </Typography>
          <Typography variant="body2" color="secondary" gutterBottom>
            Deleting your account will permanently remove all your data,
            including:
          </Typography>
          <ul
            style={{
              paddingLeft: '1.5rem',
              color: 'var(--pta-color-text-secondary)',
            }}
          >
            <li>Profile information</li>
            <li>Settings and preferences</li>
            <li>Dashboard data</li>
            <li>Activity history</li>
          </ul>
          <div>
            <Typography variant="body2" color="secondary" gutterBottom>
              Type <strong>DELETE</strong> to confirm:
            </Typography>
            <input
              type="text"
              placeholder="Type DELETE to confirm"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--pta-color-danger)',
                background: 'var(--pta-color-bg)',
                color: 'var(--pta-color-text-primary)',
              }}
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Grid direction="row" gap="md">
              <Button
                variant="danger"
                size="md"
                onClick={() => setDeleteModalOpen(false)}
              >
                Delete Account
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
          </div>
        </Grid>
      </Modal>

      {/* Advanced Settings */}
      <section id="advanced" className="app-demo settings-section">
        <Card variant="elevated" shadow="none" size="xl">
          <Typography variant="h3" gutterBottom>
            Advanced
          </Typography>
          <Typography variant="body2" color="secondary" gutterBottom>
            Developer and advanced user options
          </Typography>

          <div style={{ marginTop: '1.5rem' }}>
            <Grid direction="column" gap="md">
              <div className="settings-item">
                <div>
                  <Typography variant="body1" gutterBottom>
                    Developer Mode
                  </Typography>
                  <Typography variant="caption" color="tertiary">
                    Enable advanced debugging features
                  </Typography>
                </div>
                <Switch
                  checked={developerModeSignal.value}
                  onChange={checked => {
                    developerModeSignal.value = checked;
                  }}
                  ariaLabel="Developer mode"
                />
              </div>

              <div className="settings-item">
                <div>
                  <Typography variant="body1" gutterBottom>
                    Beta Features
                  </Typography>
                  <Typography variant="caption" color="tertiary">
                    Try new features before they're released
                  </Typography>
                </div>
                <Switch
                  checked={betaFeaturesSignal.value}
                  onChange={checked => {
                    betaFeaturesSignal.value = checked;
                  }}
                  ariaLabel="Beta features"
                />
              </div>

              <div style={{ marginTop: '1rem' }}>
                <Button variant="danger" size="md">
                  Clear Cache & Data
                </Button>
              </div>
            </Grid>
          </div>
        </Card>
      </section>
    </>
  );
}
