import type { Meta, StoryObj } from '@storybook/preact';
import { Checkbox } from './Checkbox';
import type { CheckboxProps } from '../types';

const meta: Meta<CheckboxProps> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
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
    indeterminate: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Default: Story = {
  args: {
    label: 'Default Checkbox',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate Checkbox',
    indeterminate: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'You will receive weekly updates via email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept Terms',
    error: 'You must accept the terms and conditions',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Checkbox',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Checkbox',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    disabled: true,
    checked: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read-only Checkbox',
    readOnly: true,
    checked: true,
  },
};

export const PrimaryVariant: Story = {
  args: {
    label: 'Primary Checkbox',
    variant: 'primary',
    checked: true,
  },
};

export const SecondaryVariant: Story = {
  args: {
    label: 'Secondary Checkbox',
    variant: 'secondary',
    checked: true,
  },
};

export const SuccessVariant: Story = {
  args: {
    label: 'Success Checkbox',
    variant: 'success',
    checked: true,
  },
};

export const ErrorVariant: Story = {
  args: {
    label: 'Error Checkbox',
    variant: 'error',
    checked: true,
  },
};

export const WarningVariant: Story = {
  args: {
    label: 'Warning Checkbox',
    variant: 'warning',
    checked: true,
  },
};

export const InfoVariant: Story = {
  args: {
    label: 'Info Checkbox',
    variant: 'info',
    checked: true,
  },
};
