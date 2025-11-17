import type { Meta, StoryObj } from '@storybook/preact';
import { Input } from './Input';
import type { InputProps } from '../types';

const meta: Meta<InputProps> = {
  title: 'Components/Input',
  component: Input,
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
      options: ['outlined', 'filled', 'standard'],
    },
    type: {
      control: { type: 'select' },
      options: [
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'time',
      ],
    },
    semanticState: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
    borderRadius: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    borderWidth: {
      control: { type: 'select' },
      options: ['thin', 'medium', 'thick'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    showCharacterCount: {
      control: { type: 'boolean' },
    },
    showClearButton: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'your.email@example.com',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'This is disabled',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read Only',
    value: 'This is read only',
    readOnly: true,
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    maxLength: 100,
    showCharacterCount: true,
  },
};

export const WithClearButton: Story = {
  args: {
    label: 'Search',
    type: 'search',
    placeholder: 'Search...',
    showClearButton: true,
    defaultValue: 'Example search',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    label: 'Small Input',
    placeholder: 'Small size',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    label: 'Large Input',
    placeholder: 'Large size',
  },
};

export const FilledVariant: Story = {
  args: {
    variant: 'filled',
    label: 'Filled Input',
    placeholder: 'Filled variant',
  },
};

export const StandardVariant: Story = {
  args: {
    variant: 'standard',
    label: 'Standard Input',
    placeholder: 'Standard variant',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'user@example.com',
    semanticState: 'success',
    helperText: 'Email is valid',
  },
};

export const WarningState: Story = {
  args: {
    label: 'Username',
    value: 'user123',
    semanticState: 'warning',
    helperText: 'This username is already taken',
  },
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    label: 'Age',
    placeholder: 'Enter your age',
    min: 0,
    max: 120,
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    helperText: 'Must contain at least 8 characters',
  },
};

export const DateInput: Story = {
  args: {
    type: 'date',
    label: 'Birth Date',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: '🔍',
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'your.email@example.com',
    rightIcon: '✉️',
  },
};
