import type { Meta, StoryObj } from '@storybook/preact';

import { Card, Grid } from './index';
import type { GridComponentProps } from '../types';

const meta: Meta<GridComponentProps> = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['flex', 'grid'],
    },
    direction: {
      control: { type: 'select' },
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      if: { arg: 'mode', eq: 'flex' },
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      if: { arg: 'mode', eq: 'flex' },
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      if: { arg: 'mode', eq: 'flex' },
    },
    gap: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    wrap: {
      control: { type: 'boolean' },
      if: { arg: 'mode', eq: 'flex' },
    },
    gridTemplateColumns: {
      control: { type: 'text' },
      if: { arg: 'mode', eq: 'grid' },
    },
    gridTemplateRows: {
      control: { type: 'text' },
      if: { arg: 'mode', eq: 'grid' },
    },
    gridAutoFlow: {
      control: { type: 'select' },
      options: ['row', 'column', 'dense', 'row dense', 'column dense'],
      if: { arg: 'mode', eq: 'grid' },
    },
  },
};

export default meta;
type Story = StoryObj<GridComponentProps>;

export const Default: Story = {
  args: {
    gap: 'md',
    children: (
      <>
        <Card title="Card 1">Content 1</Card>
        <Card title="Card 2">Content 2</Card>
        <Card title="Card 3">Content 3</Card>
      </>
    ),
  },
};

export const RowWithCenter: Story = {
  args: {
    direction: 'row',
    justify: 'center',
    align: 'center',
    gap: 'lg',
    children: (
      <>
        <Card size="sm" title="Small">
          Small card
        </Card>
        <Card size="md" title="Medium">
          Medium card
        </Card>
        <Card size="lg" title="Large">
          Large card
        </Card>
      </>
    ),
  },
};

export const Column: Story = {
  args: {
    direction: 'column',
    align: 'stretch',
    gap: 'sm',
    children: (
      <>
        <Card variant="elevated">Elevated card</Card>
        <Card variant="outlined">Outlined card</Card>
        <Card variant="default">Default card</Card>
      </>
    ),
  },
};

export const WithWrap: Story = {
  args: {
    wrap: true,
    gap: 'md',
    children: Array.from({ length: 6 }, (_, i) => (
      <Card key={i} title={`Card ${i + 1}`}>
        Content {i + 1}
      </Card>
    )),
  },
};

export const GridTable: Story = {
  args: {
    mode: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    gap: 'md',
    children: (
      <>
        <Card title="Header 1">Name</Card>
        <Card title="Header 2">Description</Card>
        <Card title="Header 3">Action</Card>
        <Card>John Doe</Card>
        <Card>Developer</Card>
        <Card>
          <button>Edit</button>
        </Card>
        <Card>Jane Smith</Card>
        <Card>Designer</Card>
        <Card>
          <button>Edit</button>
        </Card>
      </>
    ),
  },
};

export const GridAutoFlow: Story = {
  args: {
    mode: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridAutoFlow: 'row',
    gap: 'sm',
    children: Array.from({ length: 9 }, (_, i) => (
      <Card key={i} title={`Item ${i + 1}`}>
        Content {i + 1}
      </Card>
    )),
  },
};

export const GridDense: Story = {
  args: {
    mode: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridAutoFlow: 'dense',
    gap: 'sm',
    children: (
      <>
        <Card title="Wide" style={{ gridColumn: 'span 2' }}>
          Spans 2 columns
        </Card>
        <Card title="Normal">Normal</Card>
        <Card title="Normal">Normal</Card>
        <Card title="Tall" style={{ gridRow: 'span 2' }}>
          Spans 2 rows
        </Card>
        <Card title="Normal">Normal</Card>
        <Card title="Normal">Normal</Card>
        <Card title="Normal">Normal</Card>
      </>
    ),
  },
};
