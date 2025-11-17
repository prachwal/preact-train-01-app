// src/components/Typography.stories.tsx
import type { Meta, StoryObj } from '@storybook/preact';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline',
      ],
    },
    color: {
      control: { type: 'select' },
      options: [
        'text',
        'primary',
        'secondary',
        'error',
        'warning',
        'info',
        'success',
      ],
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
    },
    gutterBottom: { control: 'boolean' },
    noWrap: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    variant: 'body1',
    children: 'This is default body text.',
  },
};

export const Headings: Story = {
  render: () => (
    <>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </>
  ),
};

export const Colors: Story = {
  render: () => (
    <>
      <Typography color="primary">Primary color</Typography>
      <Typography color="error">Error color</Typography>
      <Typography color="success">Success color</Typography>
    </>
  ),
};

export const Align: Story = {
  render: () => (
    <>
      <Typography align="left">Left aligned</Typography>
      <Typography align="center">Center aligned</Typography>
      <Typography align="right">Right aligned</Typography>
    </>
  ),
};

export const Options: Story = {
  render: () => (
    <>
      <Typography gutterBottom>With gutter bottom</Typography>
      <Typography noWrap style={{ width: '200px' }}>
        This text will be truncated if too long.
      </Typography>
    </>
  ),
};
