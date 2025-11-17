import type { Meta, StoryObj } from '@storybook/preact';
import { Select } from './Select';
import type { SelectProps } from '../types';

const meta: Meta<SelectProps> = {
  title: 'Components/Select',
  component: Select,
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
    multiple: {
      control: { type: 'boolean' },
    },
    searchable: {
      control: { type: 'boolean' },
    },
    clearable: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<SelectProps>;

const basicOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
];

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'pl', label: 'Poland' },
];

const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select an option',
  },
};

export const WithLabel: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    placeholder: 'Select your country',
  },
};

export const Required: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    placeholder: 'Select your country',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    placeholder: 'Select your country',
    helperText: 'Choose the country where you live',
  },
};

export const WithError: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    placeholder: 'Select your country',
    error: 'Please select a country',
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    label: 'Disabled Select',
    value: '2',
    disabled: true,
  },
};

export const Multiple: Story = {
  args: {
    options: countryOptions,
    label: 'Countries',
    placeholder: 'Select multiple countries',
    multiple: true,
  },
};

export const Searchable: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    placeholder: 'Search for a country',
    searchable: true,
  },
};

export const Clearable: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    placeholder: 'Select your country',
    defaultValue: 'us',
    clearable: true,
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    options: basicOptions,
    label: 'Small Select',
    placeholder: 'Small size',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    options: basicOptions,
    label: 'Large Select',
    placeholder: 'Large size',
  },
};

export const FilledVariant: Story = {
  args: {
    variant: 'filled',
    options: basicOptions,
    label: 'Filled Select',
    placeholder: 'Filled variant',
  },
};

export const StandardVariant: Story = {
  args: {
    variant: 'standard',
    options: basicOptions,
    label: 'Standard Select',
    placeholder: 'Standard variant',
  },
};

export const SuccessState: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    value: 'us',
    semanticState: 'success',
    helperText: 'Country selected successfully',
  },
};

export const WarningState: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    value: 'us',
    semanticState: 'warning',
    helperText: 'Unusual selection detected',
  },
};

export const GroupedOptions: Story = {
  args: {
    options: groupedOptions,
    label: 'Food',
    placeholder: 'Select a food item',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2 (Disabled)', disabled: true },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4 (Disabled)', disabled: true },
      { value: '5', label: 'Option 5' },
    ],
    label: 'Options',
    placeholder: 'Select an option',
  },
};

export const Loading: Story = {
  args: {
    options: [],
    label: 'Loading Select',
    placeholder: 'Loading...',
    isLoading: true,
  },
};

export const NoOptions: Story = {
  args: {
    options: [],
    label: 'Empty Select',
    placeholder: 'No options available',
    noOptionsMessage: 'No options found',
  },
};

export const MultipleSearchable: Story = {
  args: {
    options: countryOptions,
    label: 'Countries',
    placeholder: 'Search and select multiple',
    multiple: true,
    searchable: true,
    clearable: true,
  },
};
