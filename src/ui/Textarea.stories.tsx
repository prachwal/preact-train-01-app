import type { Meta, StoryObj } from '@storybook/preact';
import { Textarea } from './Textarea';
import type { TextareaProps } from '../types';

const meta: Meta<TextareaProps> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    showCharacterCount: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<TextareaProps>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text here...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Description',
    helperText: 'Please provide a detailed description',
    placeholder: 'Enter description...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Message',
    error: 'This field is required',
    placeholder: 'Enter message...',
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Tweet',
    maxLength: 280,
    showCharacterCount: true,
    placeholder: "What's happening?",
  },
};

export const AutoResize: Story = {
  args: {
    label: 'Auto-resize Textarea',
    autoResize: true,
    resize: 'vertical',
    placeholder: 'This textarea will grow as you type...',
    rows: 3,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Textarea',
    size: 'sm',
    placeholder: 'Small size...',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Textarea',
    size: 'lg',
    placeholder: 'Large size...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'This textarea is disabled',
    disabled: true,
    value: 'You cannot edit this text',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read-only Textarea',
    readOnly: true,
    value: 'This is read-only content that cannot be edited.',
  },
};

export const WithVariants: Story = {
  args: {
    label: 'Outlined Variant',
    variant: 'outlined',
    placeholder: 'Outlined variant...',
  },
};
