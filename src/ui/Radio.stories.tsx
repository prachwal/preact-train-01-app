import type { Meta, StoryObj } from '@storybook/preact';
import { Radio } from './Radio';
import type { RadioProps } from '../types';

const meta: Meta<RadioProps> = {
  title: 'Components/Radio',
  component: Radio,
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
  },
};

export default meta;
type Story = StoryObj<RadioProps>;

export const Default: Story = {
  args: {
    label: 'Default Radio',
    name: 'default-radio',
    value: 'option1',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Radio',
    name: 'checked-radio',
    value: 'option1',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    helperText: 'We will respond via email',
    name: 'contact-method',
    value: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Option with Error',
    error: 'This option is not available',
    name: 'error-radio',
    value: 'option1',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Radio',
    size: 'sm',
    name: 'size-radio',
    value: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Radio',
    size: 'lg',
    name: 'size-radio',
    value: 'large',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Radio',
    disabled: true,
    name: 'disabled-radio',
    value: 'option1',
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    disabled: true,
    checked: true,
    name: 'disabled-checked-radio',
    value: 'option1',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read-only Radio',
    readOnly: true,
    checked: true,
    name: 'readonly-radio',
    value: 'option1',
  },
};

export const PrimaryVariant: Story = {
  args: {
    label: 'Primary Radio',
    variant: 'primary',
    checked: true,
    name: 'variant-radio',
    value: 'primary',
  },
};

export const SecondaryVariant: Story = {
  args: {
    label: 'Secondary Radio',
    variant: 'secondary',
    checked: true,
    name: 'variant-radio',
    value: 'secondary',
  },
};

export const SuccessVariant: Story = {
  args: {
    label: 'Success Radio',
    variant: 'success',
    checked: true,
    name: 'variant-radio',
    value: 'success',
  },
};

export const ErrorVariant: Story = {
  args: {
    label: 'Error Radio',
    variant: 'error',
    checked: true,
    name: 'variant-radio',
    value: 'error',
  },
};

export const WarningVariant: Story = {
  args: {
    label: 'Warning Radio',
    variant: 'warning',
    checked: true,
    name: 'variant-radio',
    value: 'warning',
  },
};

export const InfoVariant: Story = {
  args: {
    label: 'Info Radio',
    variant: 'info',
    checked: true,
    name: 'variant-radio',
    value: 'info',
  },
};
