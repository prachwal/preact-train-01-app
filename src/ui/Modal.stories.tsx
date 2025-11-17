import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Modal } from './Modal';
import type { ModalProps } from './Modal';
import { Button } from './Button';
import { Typography } from './Typography';
import ThemeProvider from '../ThemeProvider';

const meta: Meta<ModalProps> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
      description: 'Controls modal visibility',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Modal size variant',
    },
    title: {
      control: { type: 'text' },
      description: 'Modal title displayed in header',
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <div style={{ padding: '20px', minHeight: '400px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<ModalProps>;

// Interactive wrapper for controlling modal state
const InteractiveModal = (args: Omit<ModalProps, 'isOpen' | 'onClose'>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: args => <InteractiveModal {...args} />,
  args: {
    title: 'Default Modal',
    children: (
      <div>
        <Typography variant="body1">
          This is a default modal with medium size.
        </Typography>
        <Typography variant="body2" style={{ marginTop: '1rem' }}>
          Click outside or press ESC to close.
        </Typography>
      </div>
    ),
    size: 'md',
  },
};

export const Small: Story = {
  render: args => <InteractiveModal {...args} />,
  args: {
    title: 'Small Modal',
    children: (
      <Typography variant="body1">
        This is a small modal, perfect for confirmations.
      </Typography>
    ),
    size: 'sm',
  },
};

export const Large: Story = {
  render: args => <InteractiveModal {...args} />,
  args: {
    title: 'Large Modal',
    children: (
      <div>
        <Typography variant="body1" style={{ marginBottom: '1rem' }}>
          This is a large modal with more content space.
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </div>
    ),
    size: 'lg',
  },
};

export const WithoutTitle: Story = {
  render: args => <InteractiveModal {...args} />,
  args: {
    children: (
      <div>
        <Typography variant="h4" style={{ marginBottom: '1rem' }}>
          Custom Content
        </Typography>
        <Typography variant="body1">
          Modal without a title prop, using custom header content.
        </Typography>
      </div>
    ),
    size: 'md',
  },
};

export const WithForm: Story = {
  render: args => <InteractiveModal {...args} />,
  args: {
    title: 'User Settings',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            <Typography variant="body2">Username</Typography>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            <Typography variant="body2">Email</Typography>
          </label>
          <input
            type="email"
            placeholder="Enter email"
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'flex-end',
            marginTop: '1rem',
          }}
        >
          <Button variant="secondary" size="sm">
            Cancel
          </Button>
          <Button variant="primary" size="sm">
            Save
          </Button>
        </div>
      </div>
    ),
    size: 'md',
  },
};

export const Confirmation: Story = {
  render: args => <InteractiveModal {...args} />,
  args: {
    title: 'Confirm Action',
    children: (
      <div>
        <Typography variant="body1" style={{ marginBottom: '1.5rem' }}>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </Typography>
        <div
          style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}
        >
          <Button variant="secondary" size="sm">
            Cancel
          </Button>
          <Button variant="danger" size="sm">
            Delete
          </Button>
        </div>
      </div>
    ),
    size: 'sm',
  },
};

export const LongContent: Story = {
  render: args => <InteractiveModal {...args} />,
  args: {
    title: 'Terms and Conditions',
    children: (
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Typography variant="body1" style={{ marginBottom: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '1rem' }}>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Typography>
        <Typography variant="body2" style={{ marginBottom: '1rem' }}>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
          omnis iste natus error sit voluptatem accusantium doloremque
          laudantium.
        </Typography>
        <Typography variant="body2">
          Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
          quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
          voluptatem quia voluptas sit aspernatur aut odit aut fugit.
        </Typography>
      </div>
    ),
    size: 'lg',
  },
};
