import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';
import { Hamburger } from './Hamburger';
import ThemeProvider from '../ThemeProvider';
import type { HamburgerProps } from '../types';

const meta: Meta<HamburgerProps> = {
  title: 'Components/Hamburger',
  component: Hamburger,
  parameters: {
    layout: 'centered',
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
      },
      defaultViewport: 'mobile',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
      description: 'Whether the hamburger menu is in open state (animated)',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for screen readers',
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <div style={{ padding: '20px' }}>
          <Story />
          <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '1rem' }}>
            💡 Hamburger is hidden on desktop (≥1024px). Use viewport controls
            to see it.
          </p>
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<HamburgerProps>;

// Interactive wrapper component
const InteractiveHamburger = (args: HamburgerProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen || false);
  return (
    <Hamburger {...args} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
  );
};

export const Default: Story = {
  render: args => <InteractiveHamburger {...args} />,
  args: {
    isOpen: false,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    ariaLabel: 'Open menu',
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
    ariaLabel: 'Close menu',
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <Hamburger
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          ariaLabel={isOpen ? 'Close menu' : 'Open menu'}
        />
        <p style={{ fontSize: '0.875rem', color: '#666' }}>
          Click to toggle: {isOpen ? 'Open' : 'Closed'}
        </p>
      </div>
    );
  },
};

export const WithCustomAria: Story = {
  render: args => <InteractiveHamburger {...args} />,
  args: {
    isOpen: false,
    ariaLabel: 'Toggle navigation menu',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Hamburger isOpen={false} />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Closed</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Hamburger isOpen={true} />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Open</p>
      </div>
    </div>
  ),
};
