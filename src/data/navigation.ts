// Navigation Data Configuration
// Two-level navigation structure with parent/child relationships

import type { NavigationConfig } from '../types/navigation';
import { ICONS } from '../ui/Icons';

export const navigationConfig: NavigationConfig = {
  groups: [
    {
      id: 'main',
      title: 'Main Navigation',
      items: [
        {
          id: 'home',
          label: 'Home',
          icon: ICONS.HOME,
          path: '/',
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: ICONS.GEAR,
          path: '/settings',
          children: [
            {
              id: 'settings-general',
              label: 'General',
              icon: ICONS.CLIPBOARD,
              path: '/settings',
              anchor: '#general',
            },
            {
              id: 'settings-appearance',
              label: 'Appearance',
              icon: ICONS.PALETTE,
              path: '/settings',
              anchor: '#appearance',
            },
            {
              id: 'settings-notifications',
              label: 'Notifications',
              icon: ICONS.BELL,
              path: '/settings',
              anchor: '#notifications',
            },
            {
              id: 'settings-privacy',
              label: 'Privacy',
              icon: ICONS.LOCK,
              path: '/settings',
              anchor: '#privacy',
            },
            {
              id: 'settings-advanced',
              label: 'Advanced',
              icon: ICONS.WRENCH,
              path: '/settings',
              anchor: '#advanced',
            },
          ],
        },
        {
          id: 'about',
          label: 'About',
          icon: ICONS.INFO,
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
          icon: ICONS.BOOKS,
          path: 'https://preactjs.com/guide/v10/getting-started',
          external: true,
        },
        {
          id: 'github',
          label: 'GitHub',
          icon: ICONS.COMPUTER,
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
          icon: ICONS.LOCK,
          path: '/privacy',
        },
        {
          id: 'terms',
          label: 'Terms of Service',
          icon: ICONS.SCROLL,
          path: '/terms',
        },
        {
          id: 'contact',
          label: 'Contact',
          icon: ICONS.ENVELOPE,
          path: '/contact',
          hidden: true, // Hidden from sidebar, accessible via footer
        },
      ],
    },
  ],
};
