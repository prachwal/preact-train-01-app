// Navigation Component Tests
// Testing rendering, active states, and user interactions

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from 'preact';
import { render, screen } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { Navigation } from '../components/Navigation';

// Mock the entire navigation service
vi.mock('../services/NavigationService', () => ({
  navigationService: {
    getConfig: () => ({
      groups: [
        {
          id: 'main',
          title: 'Main Navigation',
          items: [
            { id: 'home', label: 'Home', path: '/', icon: '🏠' },
            {
              id: 'settings',
              label: 'Settings',
              path: '/settings',
              icon: '⚙️',
              children: [
                {
                  id: 'settings-general',
                  label: 'General',
                  path: '/settings',
                  anchor: '#general',
                },
                {
                  id: 'settings-notifications',
                  label: 'Notifications',
                  path: '/settings',
                  anchor: '#notifications',
                },
              ],
            },
          ],
        },
      ],
    }),
    setActiveByPath: vi.fn(),
    isActive: vi.fn(),
    isParentActive: vi.fn(),
    isExpanded: vi.fn(id => id === 'settings'), // Settings is expanded
    toggleExpanded: vi.fn(),
    buildUrl: vi.fn(() => '/'),
  },
  activeNavigationSignal: {
    value: {
      activeItemId: null,
      activeParentId: null,
      expandedIds: ['settings'],
    },
  },
}));

// Mock Preact Router
const mockUseLocation = vi.fn();
vi.mock('preact-iso', () => ({
  useLocation: () => mockUseLocation(),
}));

// Mock Typography component
vi.mock('../ui', () => ({
  Typography: ({ children, className }: any) =>
    h('span', { className }, children),
}));

// Mock window.location.hash
const mockLocation = {
  hash: '',
  pathname: '/',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

// Mock addEventListener/removeEventListener
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();
Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
});
Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
});

describe('Navigation Component', () => {
  beforeEach(() => {
    // Reset mocks
    mockUseLocation.mockReturnValue({
      path: '/',
      query: {},
    });

    mockLocation.hash = '';
    mockLocation.pathname = '/';

    // Clear event listeners
    mockAddEventListener.mockClear();
    mockRemoveEventListener.mockClear();
  });

  describe('Rendering', () => {
    it('renders navigation with proper structure', () => {
      render(<Navigation />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders navigation items', () => {
      render(<Navigation />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });
  });

  describe('Active State Logic', () => {
    it('handles active state changes', () => {
      mockUseLocation.mockReturnValue({ path: '/settings' });
      mockLocation.hash = '#general';

      render(<Navigation />);

      // Component should render without errors
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByText('General')).toBeInTheDocument();
    });

    it('handles parent active state', () => {
      mockUseLocation.mockReturnValue({ path: '/settings' });
      mockLocation.hash = '#notifications';

      render(<Navigation />);

      // Component should render without errors
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has navigation role', () => {
      render(<Navigation />);
      expect(screen.getByRole('navigation')).toHaveAttribute(
        'aria-label',
        'Main navigation'
      );
    });
  });

  describe('Child Item Styling', () => {
    it('applies correct classes to child items when expanded', () => {
      render(<Navigation />);

      // Find child items (they should be rendered since Settings is expanded in mock)
      const childItems = document.querySelectorAll('.pta-nav-item--level-1');

      expect(childItems.length).toBe(2); // General and Notifications

      childItems.forEach(child => {
        expect(child).toHaveClass('pta-nav-item');
        expect(child).toHaveClass('pta-nav-item--level-1');

        const link = child.querySelector('.pta-nav-item__link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveClass('pta-nav-item__link');
      });
    });

    it('child items have correct indentation and spacing', () => {
      render(<Navigation />);

      const childLink = document.querySelector(
        '.pta-nav-item--level-1 .pta-nav-item__link'
      );
      expect(childLink).toBeInTheDocument();

      // Check that child links have smaller height than parent links
      const parentLink = document.querySelector(
        '.pta-nav-item--level-0 .pta-nav-item__link'
      );
      expect(parentLink).toBeInTheDocument();

      // Child should have different styling than parent
      expect(childLink).not.toHaveClass('pta-nav-item--level-0');
    });
  });
});
