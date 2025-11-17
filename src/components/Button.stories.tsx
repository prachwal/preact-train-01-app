import type { Meta, StoryObj } from '@storybook/preact';

import { Button, type ButtonProps } from './Button';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'disabled'],
    },
    semanticState: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
    shadow: {
      control: { type: 'select' },
      options: ['light', 'medium', 'heavy'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'disabled',
    disabled: true,
    children: 'Disabled Button',
  },
};

export const WithSemanticState: Story = {
  args: {
    semanticState: 'success',
    children: 'Button with Semantic State',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const WithShadow: Story = {
  args: {
    shadow: 'medium',
    children: 'Button with Shadow',
  },
};
