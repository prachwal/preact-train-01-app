import type { Meta, StoryObj } from '@storybook/preact';
import { RadioGroup } from './RadioGroup';
import type { RadioGroupProps, RadioOption } from '../types';

const simpleOptions: RadioOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const optionsWithHelperText: RadioOption[] = [
  { value: 'email', label: 'Email', helperText: 'We will respond via email' },
  { value: 'phone', label: 'Phone', helperText: 'We will call you back' },
  {
    value: 'none',
    label: 'No preference',
    helperText: 'Any method works',
  },
];

const meta: Meta<RadioGroupProps> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
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
    direction: {
      control: { type: 'select' },
      options: ['row', 'column'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

export const Default: Story = {
  args: {
    name: 'default-group',
    label: 'Choose an option',
    options: simpleOptions,
  },
};

export const WithHelperText: Story = {
  args: {
    name: 'contact-method',
    label: 'Preferred Contact Method',
    options: optionsWithHelperText,
  },
};

export const WithError: Story = {
  args: {
    name: 'error-group',
    label: 'Select an option',
    options: simpleOptions,
    error: 'Please select an option',
  },
};

export const WithValue: Story = {
  args: {
    name: 'value-group',
    label: 'Pre-selected Option',
    options: simpleOptions,
    value: 'option2',
  },
};

export const RowDirection: Story = {
  args: {
    name: 'row-group',
    label: 'Row Direction',
    options: simpleOptions,
    direction: 'row',
  },
};

export const ColumnDirection: Story = {
  args: {
    name: 'column-group',
    label: 'Column Direction',
    options: simpleOptions,
    direction: 'column',
  },
};

export const Small: Story = {
  args: {
    name: 'small-group',
    label: 'Small Radio Group',
    options: simpleOptions,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    name: 'large-group',
    label: 'Large Radio Group',
    options: simpleOptions,
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled-group',
    label: 'Disabled Radio Group',
    options: simpleOptions,
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    name: 'required-group',
    label: 'Required Radio Group',
    options: simpleOptions,
    required: true,
  },
};

export const PrimaryVariant: Story = {
  args: {
    name: 'primary-group',
    label: 'Primary Variant',
    options: simpleOptions,
    variant: 'primary',
    value: 'option1',
  },
};

export const SecondaryVariant: Story = {
  args: {
    name: 'secondary-group',
    label: 'Secondary Variant',
    options: simpleOptions,
    variant: 'secondary',
    value: 'option1',
  },
};

export const SuccessVariant: Story = {
  args: {
    name: 'success-group',
    label: 'Success Variant',
    options: simpleOptions,
    variant: 'success',
    value: 'option1',
  },
};

export const ErrorVariant: Story = {
  args: {
    name: 'error-group',
    label: 'Error Variant',
    options: simpleOptions,
    variant: 'error',
    value: 'option1',
  },
};
