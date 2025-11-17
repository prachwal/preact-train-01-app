import type { Meta, StoryObj } from '@storybook/preact';
import { Card } from './Card';
import type { CardProps } from '../types';

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
      options: ['none', 'light', 'medium', 'heavy'],
    },
    borderRadius: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    borderWidth: {
      control: { type: 'select' },
      options: ['thin', 'medium', 'thick'],
    },
    headerLevel: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
    },
    as: {
      control: { type: 'select' },
      options: [
        'div',
        'section',
        'article',
        'main',
        'aside',
        'header',
        'footer',
      ],
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

export const CustomHeaderLevel: Story = {
  args: {
    headerLevel: 1,
    title: 'H1 Header',
    children: 'This card uses an H1 for the title.',
  },
};

export const CustomAs: Story = {
  args: {
    as: 'article',
    title: 'Article Card',
    children: 'This card is rendered as an <article> element.',
  },
};

export const WithShadow: Story = {
  args: {
    shadow: 'heavy',
    title: 'Heavy Shadow',
    children: 'This card has a heavy shadow.',
  },
};

export const NoShadow: Story = {
  args: {
    shadow: 'none',
    title: 'No Shadow',
    children: 'This card has no shadow.',
  },
};

export const RoundedCorners: Story = {
  args: {
    borderRadius: 'lg',
    title: 'Rounded Corners',
    children: 'This card has large rounded corners.',
  },
};

export const ThickBorder: Story = {
  args: {
    borderWidth: 'thick',
    variant: 'outlined',
    title: 'Thick Border',
    children: 'This card has a thick border.',
  },
};

export const SemanticError: Story = {
  args: {
    semanticState: 'error',
    variant: 'outlined',
    title: 'Error State',
    children: 'This card indicates an error.',
  },
};
