// Navigation Data Configuration
// Two-level navigation structure with parent/child relationships

import type { NavigationConfig } from '../types/navigation';

export const navigationConfig: NavigationConfig = {
  groups: [
    {
      id: 'main',
      title: 'Main Navigation',
      items: [
        {
          id: 'home',
          label: 'Home',
          icon: '🏠',
          path: '/',
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: '⚙️',
          path: '/settings',
          children: [
            {
              id: 'settings-general',
              label: 'General',
              icon: '📋',
              path: '/settings',
              anchor: '#general',
            },
            {
              id: 'settings-appearance',
              label: 'Appearance',
              icon: '🎨',
              path: '/settings',
              anchor: '#appearance',
            },
            {
              id: 'settings-notifications',
              label: 'Notifications',
              icon: '🔔',
              path: '/settings',
              anchor: '#notifications',
            },
            {
              id: 'settings-privacy',
              label: 'Privacy',
              icon: '🔒',
              path: '/settings',
              anchor: '#privacy',
            },
            {
              id: 'settings-advanced',
              label: 'Advanced',
              icon: '🔧',
              path: '/settings',
              anchor: '#advanced',
            },
          ],
        },
        {
          id: 'about',
          label: 'About',
          icon: 'ℹ️',
          path: '/about',
        },
      ],
    },
    {
      id: 'resources',
      title: 'Resources',
      items: [
        {
          id: 'documentation',
          label: 'Documentation',
          icon: '📚',
          path: 'https://preactjs.com/guide/v10/getting-started',
          external: true,
        },
        {
          id: 'github',
          label: 'GitHub',
          icon: '💻',
          path: 'https://github.com/preactjs/preact',
          external: true,
        },
      ],
    },
    {
      id: 'legal',
      title: 'Legal',
      items: [
        {
          id: 'privacy',
          label: 'Privacy Policy',
          icon: '🔒',
          path: '/privacy',
        },
        {
          id: 'terms',
          label: 'Terms of Service',
          icon: '📜',
          path: '/terms',
        },
      ],
    },
  ],
};
