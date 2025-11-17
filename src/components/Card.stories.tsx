import type { Meta, StoryObj } from '@storybook/preact';

import { Card, type CardProps } from './Card';

const meta: Meta<CardProps> = {
  title: 'Components/Card',
  component: Card,
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
      options: ['default', 'elevated', 'outlined'],
    },
    semanticState: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
    shadow: {
      control: { type: 'select' },
      options: ['light', 'medium', 'heavy'],
    },
  },
};

export default meta;
type Story = StoryObj<CardProps>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    children: 'This is the content of the card.',
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    title: 'Elevated Card',
    children: 'This card has an elevated appearance.',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    title: 'Outlined Card',
    children: 'This card has an outlined style.',
  },
};

export const WithSemanticState: Story = {
  args: {
    semanticState: 'success',
    title: 'Success Card',
    children: 'This card indicates success.',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    title: 'Large Card',
    children: 'This is a large card with more padding.',
  },
};
