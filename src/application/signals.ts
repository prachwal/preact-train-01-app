import { signal } from '@preact/signals';

// Theme signal
export const themeSignal = signal<'light' | 'dark' | 'auto'>('auto');

// Dashboard metrics signals
export const revenueSignal = signal(142850);
export const activeUsersSignal = signal(8249);
export const conversionRateSignal = signal(3.24);
export const avgOrderValueSignal = signal(89.42);

// Mobile menu signal
export const isMobileMenuOpenSignal = signal(false);

// Notification preferences signals
export const emailNotificationsSignal = signal(
  localStorage.getItem('pta-notification-email') === 'true'
);
export const desktopNotificationsSignal = signal(
  localStorage.getItem('pta-notification-desktop') === 'true'
);
export const weeklySummarySignal = signal(
  localStorage.getItem('pta-notification-weekly') !== 'false'
); // default true

// Activity feed signal
export const activitiesSignal = signal([
  {
    id: 1,
    title: 'New order #4829',
    description: 'received from Enterprise Client',
    time: '2 minutes ago',
    category: 'Order Management',
  },
  {
    id: 2,
    title: 'Payment processed:',
    description: '$2,450.00 via Stripe',
    time: '15 minutes ago',
    category: 'Finance',
  },
  {
    id: 3,
    title: 'User registration:',
    description: '3 new accounts created',
    time: '32 minutes ago',
    category: 'User Management',
  },
  {
    id: 4,
    title: 'Report generated:',
    description: 'Monthly analytics Q4 2025',
    time: '45 minutes ago',
    category: 'Reports',
  },
  {
    id: 5,
    title: 'System backup completed',
    description: 'successfully',
    time: '1 hour ago',
    category: 'System',
  },
]);
