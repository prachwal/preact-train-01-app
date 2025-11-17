// NavigationService Tests
// Testing navigation state management, item tracking, and data structure

import { describe, it, expect, beforeEach } from 'vitest';
import {
  NavigationService,
  activeNavigationSignal,
} from '../services/NavigationService';
import { navigationConfig } from '../data/navigation';

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(() => {
    service = new NavigationService(navigationConfig);
    // Reset signal state
    activeNavigationSignal.value = {
      activeItemId: null,
      activeParentId: null,
      expandedIds: [],
    };
  });

  describe('getAllItems', () => {
    it('should return all navigation items including children', () => {
      const items = service.getAllItems();
      expect(items.length).toBeGreaterThan(0);

      // Should include parent items
      expect(items.some(item => item.id === 'home')).toBe(true);
      expect(items.some(item => item.id === 'settings')).toBe(true);

      // Should include child items
      expect(items.some(item => item.id === 'settings-general')).toBe(true);
      expect(items.some(item => item.id === 'settings-appearance')).toBe(true);
    });
  });

  describe('findItemById', () => {
    it('should find parent item by ID', () => {
      const item = service.findItemById('home');
      expect(item).toBeDefined();
      expect(item?.label).toBe('Home');
    });

    it('should find child item by ID', () => {
      const item = service.findItemById('settings-general');
      expect(item).toBeDefined();
      expect(item?.label).toBe('General');
    });

    it('should return null for non-existent ID', () => {
      const item = service.findItemById('non-existent');
      expect(item).toBeNull();
    });
  });

  describe('findItemByPath', () => {
    it('should find item by path', () => {
      const item = service.findItemByPath('/');
      expect(item).toBeDefined();
      expect(item?.id).toBe('home');
    });

    it('should find item by path and anchor', () => {
      const item = service.findItemByPath('/settings', '#general');
      expect(item).toBeDefined();
      expect(item?.id).toBe('settings-general');
    });

    it('should return null for non-existent path', () => {
      const item = service.findItemByPath('/non-existent');
      expect(item).toBeNull();
    });
  });

  describe('getParentItem', () => {
    it('should return parent for child item', () => {
      const parent = service.getParentItem('settings-general');
      expect(parent).toBeDefined();
      expect(parent?.id).toBe('settings');
    });

    it('should return null for top-level item', () => {
      const parent = service.getParentItem('home');
      expect(parent).toBeNull();
    });

    it('should return null for non-existent item', () => {
      const parent = service.getParentItem('non-existent');
      expect(parent).toBeNull();
    });
  });

  describe('hasChildren', () => {
    it('should return true for item with children', () => {
      expect(service.hasChildren('settings')).toBe(true);
    });

    it('should return false for item without children', () => {
      expect(service.hasChildren('home')).toBe(false);
      expect(service.hasChildren('settings-general')).toBe(false);
    });

    it('should return false for non-existent item', () => {
      expect(service.hasChildren('non-existent')).toBe(false);
    });
  });

  describe('setActiveItem', () => {
    it('should set active item without parent', () => {
      service.setActiveItem('home');

      const state = activeNavigationSignal.value;
      expect(state.activeItemId).toBe('home');
      expect(state.activeParentId).toBeNull();
      expect(state.expandedIds).toHaveLength(0);
    });

    it('should set active child item and parent', () => {
      service.setActiveItem('settings-general');

      const state = activeNavigationSignal.value;
      expect(state.activeItemId).toBe('settings-general');
      expect(state.activeParentId).toBe('settings');
      expect(state.expandedIds).toContain('settings');
    });

    it('should clear active state when setting null', () => {
      service.setActiveItem('home');
      service.setActiveItem(null);

      const state = activeNavigationSignal.value;
      expect(state.activeItemId).toBeNull();
      expect(state.activeParentId).toBeNull();
    });
  });

  describe('setActiveByPath', () => {
    it('should set active item by path', () => {
      service.setActiveByPath('/');

      const state = activeNavigationSignal.value;
      expect(state.activeItemId).toBe('home');
    });

    it('should set active item by path and anchor', () => {
      service.setActiveByPath('/settings', '#general');

      const state = activeNavigationSignal.value;
      expect(state.activeItemId).toBe('settings-general');
      expect(state.activeParentId).toBe('settings');
    });

    it('should fallback to path-only match if anchor not found', () => {
      service.setActiveByPath('/settings', '#non-existent');

      const state = activeNavigationSignal.value;
      expect(state.activeItemId).toBe('settings');
    });
  });

  describe('toggleExpanded', () => {
    it('should expand collapsed item', () => {
      service.toggleExpanded('settings');

      const state = activeNavigationSignal.value;
      expect(state.expandedIds).toContain('settings');
    });

    it('should collapse expanded item', () => {
      service.toggleExpanded('settings');
      service.toggleExpanded('settings');

      const state = activeNavigationSignal.value;
      expect(state.expandedIds).not.toContain('settings');
    });

    it('should maintain other expanded items', () => {
      service.toggleExpanded('settings');
      service.toggleExpanded('about');

      const state = activeNavigationSignal.value;
      expect(state.expandedIds).toContain('settings');
      expect(state.expandedIds).toContain('about');
    });
  });

  describe('isExpanded', () => {
    it('should return true for expanded item', () => {
      service.toggleExpanded('settings');
      expect(service.isExpanded('settings')).toBe(true);
    });

    it('should return false for collapsed item', () => {
      expect(service.isExpanded('settings')).toBe(false);
    });
  });

  describe('isActive', () => {
    it('should return true for active item', () => {
      service.setActiveItem('home');
      expect(service.isActive('home')).toBe(true);
    });

    it('should return false for inactive item', () => {
      service.setActiveItem('home');
      expect(service.isActive('about')).toBe(false);
    });
  });

  describe('isParentActive', () => {
    it('should return true for active parent', () => {
      service.setActiveItem('settings-general');
      expect(service.isParentActive('settings')).toBe(true);
    });

    it('should return false for inactive parent', () => {
      service.setActiveItem('home');
      expect(service.isParentActive('settings')).toBe(false);
    });
  });

  describe('buildUrl', () => {
    it('should build URL without anchor', () => {
      const item = service.findItemById('home')!;
      const url = service.buildUrl(item);
      expect(url).toBe('/');
    });

    it('should build URL with anchor', () => {
      const item = service.findItemById('settings-general')!;
      const url = service.buildUrl(item);
      expect(url).toBe('/settings#general');
    });

    it('should return external URL as-is', () => {
      const item = service.findItemById('documentation')!;
      const url = service.buildUrl(item);
      expect(url).toContain('https://');
    });
  });

  describe('getConfig', () => {
    it('should return navigation configuration', () => {
      const config = service.getConfig();
      expect(config).toBe(navigationConfig);
      expect(config.groups).toBeDefined();
      expect(config.groups.length).toBeGreaterThan(0);
    });
  });
});
