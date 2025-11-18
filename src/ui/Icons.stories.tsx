import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import {
  XIcon,
  GitHubIcon,
  DiscordIcon,
  YouTubeIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  LightThemeIcon,
  DarkThemeIcon,
  AutoThemeIcon,
  ICONS,
  type IconName,
} from './Icons';

import ThemeProvider from '../ThemeProvider';

/**
 * Icon component props interface
 */
interface IconProps {
  className?: string | undefined;
}

const meta: Meta<IconProps> = {
  title: 'Components/Icons',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Centralized icon library using Lucide React icons for consistency and performance. All icons are tree-shakeable and professionally designed.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes for styling',
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
            flexWrap: 'wrap',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<IconProps>;

export const SocialMediaIcons: Story = {
  render: () => (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <XIcon />
        <span style={{ fontSize: '12px', color: '#666' }}>X</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <GitHubIcon />
        <span style={{ fontSize: '12px', color: '#666' }}>GitHub</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <DiscordIcon />
        <span style={{ fontSize: '12px', color: '#666' }}>Discord</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <YouTubeIcon />
        <span style={{ fontSize: '12px', color: '#666' }}>YouTube</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <InstagramIcon />
        <span style={{ fontSize: '12px', color: '#666' }}>Instagram</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <FacebookIcon />
        <span style={{ fontSize: '12px', color: '#666' }}>Facebook</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <LinkedInIcon />
        <span style={{ fontSize: '12px', color: '#666' }}>LinkedIn</span>
      </div>
    </>
  ),
};

export const ThemeIcons: Story = {
  render: () => (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <LightThemeIcon />
        <span style={{ fontSize: '12px', color: '#666' }}>Light</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <DarkThemeIcon />
        <span style={{ fontSize: '12px', color: '#666' }}>Dark</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <AutoThemeIcon />
        <span style={{ fontSize: '12px', color: '#666' }}>Auto</span>
      </div>
    </>
  ),
};

export const IconConstantsGrid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
        gap: '16px',
        maxWidth: '600px',
      }}
    >
      {(Object.keys(ICONS) as IconName[]).map(iconName => (
        <div
          key={iconName}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '12px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
          }}
        >
          {ICONS[iconName]}
          <span
            style={{ fontSize: '10px', color: '#666', textAlign: 'center' }}
          >
            {iconName}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const WithCustomClass: Story = {
  args: {
    className: 'custom-icon-class',
  },
  render: args => (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <XIcon className={args.className} />
        <span style={{ fontSize: '12px', color: '#666' }}>X</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <GitHubIcon className={args.className} />
        <span style={{ fontSize: '12px', color: '#666' }}>GitHub</span>
      </div>
    </>
  ),
};

export const IconShowcase: Story = {
  render: () => (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '24px', color: '#333' }}>
        Icon Library Showcase
      </h3>

      <div style={{ marginBottom: '32px' }}>
        <h4 style={{ marginBottom: '16px', color: '#666' }}>
          Social Media Icons
        </h4>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
          <XIcon />
          <GitHubIcon />
          <DiscordIcon />
          <YouTubeIcon />
          <InstagramIcon />
          <FacebookIcon />
          <LinkedInIcon />
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h4 style={{ marginBottom: '16px', color: '#666' }}>Theme Icons</h4>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
          <LightThemeIcon />
          <DarkThemeIcon />
          <AutoThemeIcon />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', color: '#666' }}>
          Common UI Icons (from ICONS constant)
        </h4>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
            gap: '12px',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          {[
            'HOME',
            'USER',
            'SETTINGS',
            'BELL',
            'LOCK',
            'INFO',
            'HELP',
            'LOGOUT',
          ].map(iconName => (
            <div
              key={iconName}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              {ICONS[iconName as IconName]}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
