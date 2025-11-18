import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';
import { ToggleButton } from './ToggleButton';
import { ThemeIcon } from './ThemeIcon';
import { ICONS } from './Icons';
import type { ToggleButtonProps, ToggleItem } from '../types';

const meta: Meta<ToggleButtonProps> = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['icon', 'text', 'icon-text', 'dropdown', 'carousel'],
      description: 'Display variant of the toggle button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the toggle button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    value: {
      control: 'text',
      description: 'Currently selected value',
    },
    // items is not controllable since it contains Preact components
    items: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ToggleButtonProps>;

// Theme items for examples
const themeItems: ToggleItem[] = [
  {
    value: 'light',
    label: 'Light',
    icon: <ThemeIcon theme="light" />,
    ariaLabel: 'Switch to light theme',
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: <ThemeIcon theme="dark" />,
    ariaLabel: 'Switch to dark theme',
  },
  {
    value: 'auto',
    label: 'Auto',
    icon: <ThemeIcon theme="auto" />,
    ariaLabel: 'Switch to auto theme',
  },
];

// Language items for examples
const languageItems: ToggleItem[] = [
  { value: 'en', label: 'English', icon: ICONS.UK },
  { value: 'pl', label: 'Polski', icon: ICONS.POLAND },
  { value: 'de', label: 'Deutsch', icon: ICONS.GERMANY },
  { value: 'fr', label: 'Français', icon: ICONS.FRANCE },
  { value: 'es', label: 'Español', icon: ICONS.SPAIN },
];

// User menu items
const userMenuItems: ToggleItem[] = [
  { value: 'profile', label: 'Profile', icon: ICONS.PROFILE },
  { value: 'settings', label: 'Settings', icon: ICONS.GEAR },
  { value: 'help', label: 'Help', icon: ICONS.HELP },
  { value: 'logout', label: 'Logout', icon: ICONS.LOGOUT },
];

/**
 * Icon Only - Mobile/Tablet variant
 * Perfect for headers where space is limited
 * Cyclic toggle: light → dark → auto → light
 */
export const IconOnly: Story = {
  args: {
    variant: 'icon',
    items: themeItems,
    value: 'light',
    size: 'md',
    ariaLabel: 'Toggle theme',
  },
  render: args => {
    const ToggleButtonWithState = () => {
      const [value, setValue] = useState(args.value);
      return <ToggleButton {...args} value={value} onChange={setValue} />;
    };
    return <ToggleButtonWithState />;
  },
};

/**
 * Icon + Text - Desktop variant
 * Larger target area with descriptive label
 */
export const IconText: Story = {
  args: {
    variant: 'icon-text',
    items: themeItems,
    value: 'light',
    size: 'md',
    ariaLabel: 'Toggle theme',
  },
  render: args => {
    const ToggleButtonWithState = () => {
      const [value, setValue] = useState(args.value);
      return <ToggleButton {...args} value={value} onChange={setValue} />;
    };
    return <ToggleButtonWithState />;
  },
};

/**
 * Text Only variant
 * Simple text toggle without icons
 */
export const TextOnly: Story = {
  args: {
    variant: 'text',
    items: [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
      { value: 'auto', label: 'Auto' },
    ],
    value: 'light',
    size: 'md',
  },
  render: args => {
    const ToggleButtonWithState = () => {
      const [value, setValue] = useState(args.value);
      return <ToggleButton {...args} value={value} onChange={setValue} />;
    };
    return <ToggleButtonWithState />;
  },
};

/**
 * Dropdown variant
 * For multiple options like language selection
 */
export const Dropdown: Story = {
  args: {
    variant: 'dropdown',
    items: languageItems,
    value: 'en',
    size: 'md',
    ariaLabel: 'Select language',
  },
  render: args => {
    const ToggleButtonWithState = () => {
      const [value, setValue] = useState(args.value);
      return <ToggleButton {...args} value={value} onChange={setValue} />;
    };
    return <ToggleButtonWithState />;
  },
};

/**
 * User Menu Example
 * Dropdown with user actions
 */
export const UserMenu: Story = {
  args: {
    variant: 'dropdown',
    items: userMenuItems,
    value: 'profile',
    size: 'md',
    ariaLabel: 'User menu',
  },
  render: args => {
    const ToggleButtonWithState = () => {
      const [value, setValue] = useState(args.value);
      return (
        <ToggleButton
          {...args}
          value={value}
          onChange={v => {
            setValue(v);
            console.log('User action:', v);
          }}
        />
      );
    };
    return <ToggleButtonWithState />;
  },
};

/**
 * Small Size - Icon Only
 * Compact version for tight spaces
 */
export const SmallIcon: Story = {
  args: {
    variant: 'icon',
    items: themeItems,
    value: 'light',
    size: 'sm',
    ariaLabel: 'Toggle theme',
  },
  render: args => {
    const ToggleButtonWithState = () => {
      const [value, setValue] = useState(args.value);
      return <ToggleButton {...args} value={value} onChange={setValue} />;
    };
    return <ToggleButtonWithState />;
  },
};

/**
 * Large Size - Icon + Text
 * Prominent toggle button
 */
export const LargeIconText: Story = {
  args: {
    variant: 'icon-text',
    items: themeItems,
    value: 'dark',
    size: 'lg',
    ariaLabel: 'Toggle theme',
  },
  render: args => {
    const ToggleButtonWithState = () => {
      const [value, setValue] = useState(args.value);
      return <ToggleButton {...args} value={value} onChange={setValue} />;
    };
    return <ToggleButtonWithState />;
  },
};

/**
 * Disabled State
 * Toggle button that cannot be interacted with
 */
export const Disabled: Story = {
  args: {
    variant: 'icon-text',
    items: themeItems,
    value: 'light',
    size: 'md',
    disabled: true,
    ariaLabel: 'Toggle theme (disabled)',
  },
};

/**
 * Theme Switcher Comparison
 * All sizes side by side
 */
export const SizeComparison: Story = {
  render: () => {
    const SizeComparisonComponent = () => {
      const [value, setValue] = useState('light');

      return (
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <ToggleButton
            variant="icon"
            items={themeItems}
            value={value}
            onChange={setValue}
            size="sm"
            ariaLabel="Small theme toggle"
          />
          <ToggleButton
            variant="icon"
            items={themeItems}
            value={value}
            onChange={setValue}
            size="md"
            ariaLabel="Medium theme toggle"
          />
          <ToggleButton
            variant="icon"
            items={themeItems}
            value={value}
            onChange={setValue}
            size="lg"
            ariaLabel="Large theme toggle"
          />
        </div>
      );
    };
    return <SizeComparisonComponent />;
  },
};

/**
 * Variant Comparison
 * All variants for the same data
 */
export const VariantComparison: Story = {
  render: () => {
    const VariantComparisonComponent = () => {
      const [value, setValue] = useState('light');

      return (
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <strong>Icon Only:</strong>
            <ToggleButton
              variant="icon"
              items={themeItems}
              value={value}
              onChange={setValue}
              ariaLabel="Toggle theme (icon)"
            />
          </div>
          <div>
            <strong>Icon + Text:</strong>
            <ToggleButton
              variant="icon-text"
              items={themeItems}
              value={value}
              onChange={setValue}
              ariaLabel="Toggle theme (icon-text)"
            />
          </div>
          <div>
            <strong>Text Only:</strong>
            <ToggleButton
              variant="text"
              items={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'auto', label: 'Auto' },
              ]}
              value={value}
              onChange={setValue}
              ariaLabel="Toggle theme (text)"
            />
          </div>
          <div>
            <strong>Dropdown:</strong>
            <ToggleButton
              variant="dropdown"
              items={themeItems}
              value={value}
              onChange={setValue}
              ariaLabel="Toggle theme (dropdown)"
            />
          </div>
        </div>
      );
    };
    return <VariantComparisonComponent />;
  },
};

/**
 * Real-world Example: Header Theme Switcher
 * How it would appear in the app header
 */
export const HeaderExample: Story = {
  render: () => {
    const HeaderExampleComponent = () => {
      const [theme, setTheme] = useState('light');

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            background: 'var(--pta-color-bg-secondary)',
            borderRadius: '8px',
          }}
        >
          <h2 style={{ margin: 0 }}>My App</h2>
          <ToggleButton
            variant="icon"
            items={themeItems}
            value={theme}
            onChange={setTheme}
            ariaLabel="Toggle theme"
          />
        </div>
      );
    };
    return <HeaderExampleComponent />;
  },
};
