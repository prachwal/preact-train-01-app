import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { ThemeIcon } from './ThemeIcon';

import ThemeProvider from '../ThemeProvider';
import type { ThemeIconProps } from '../types';

const meta: Meta<ThemeIconProps> = {
  title: 'Components/ThemeIcon',
  component: ThemeIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'auto'],
      description: 'Theme variant to display the appropriate icon',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <div
          style={{
            padding: '40px',
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<ThemeIconProps>;

export const Light: Story = {
  args: {
    theme: 'light',
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};

export const Auto: Story = {
  args: {
    theme: 'auto',
  },
};

export const AllThemes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <ThemeIcon theme="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Light</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ThemeIcon theme="dark" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Dark</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ThemeIcon theme="auto" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Auto</p>
      </div>
    </div>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <ThemeIcon theme="light" className="large-icon" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
          Light (Large)
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ThemeIcon theme="dark" className="large-icon" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Dark (Large)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ThemeIcon theme="auto" className="large-icon" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Auto (Large)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Icons can be styled with custom CSS classes for different sizes.',
      },
    },
  },
};

export const WithColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#f59e0b' }}>
          <ThemeIcon theme="light" />
        </div>
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Amber</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#6366f1' }}>
          <ThemeIcon theme="dark" />
        </div>
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Indigo</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#10b981' }}>
          <ThemeIcon theme="auto" />
        </div>
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Green</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Icons use currentColor and inherit text color from parent elements.',
      },
    },
  },
};

export const InButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <button
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          border: '1px solid #d1d5db',
          background: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <ThemeIcon theme="light" />
        <span>Light Mode</span>
      </button>
      <button
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          border: '1px solid #374151',
          background: '#1f2937',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <ThemeIcon theme="dark" />
        <span>Dark Mode</span>
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example usage of theme icons within button components.',
      },
    },
  },
};
