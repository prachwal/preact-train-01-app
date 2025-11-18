import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Switch } from './Switch';

import ThemeProvider from '../ThemeProvider';
import type { SwitchProps } from '../types';

const meta: Meta<SwitchProps> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Current checked state of the switch',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the switch is disabled',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text displayed next to the switch',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for screen readers',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the switch',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'auto'],
      description: 'Theme variant',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'disabled'],
      description: 'Color variant',
    },
    semanticState: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
      description: 'Semantic state',
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'light', 'medium', 'heavy'],
      description: 'Shadow variant',
    },
    borderRadius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Border radius size',
    },
    borderWidth: {
      control: { type: 'select' },
      options: ['none', 'thin', 'medium', 'thick'],
      description: 'Border width size',
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <div style={{ padding: '20px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<SwitchProps>;

// Interactive wrapper component for Storybook controls
const InteractiveSwitch = (args: SwitchProps) => {
  const [checked, setChecked] = useState(args.checked);
  return <Switch {...args} checked={checked} onChange={setChecked} />;
};

export const Default: Story = {
  render: args => <InteractiveSwitch {...args} />,
  args: {
    checked: false,
    disabled: false,
  },
};

export const WithLabel: Story = {
  render: args => <InteractiveSwitch {...args} />,
  args: {
    checked: false,
    disabled: false,
    label: 'Enable notifications',
  },
};

export const Checked: Story = {
  render: args => <InteractiveSwitch {...args} />,
  args: {
    checked: true,
    disabled: false,
    label: 'Feature enabled',
  },
};

export const Disabled: Story = {
  render: args => <InteractiveSwitch {...args} />,
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled option',
  },
};

export const DisabledChecked: Story = {
  render: args => <InteractiveSwitch {...args} />,
  args: {
    checked: true,
    disabled: true,
    label: 'Read-only setting',
  },
};

export const WithAriaLabel: Story = {
  render: args => <InteractiveSwitch {...args} />,
  args: {
    checked: false,
    disabled: false,
    ariaLabel: 'Toggle dark mode',
  },
};

export const AllStates: Story = {
  render: () => {
    const [state1, setState1] = useState(false);
    const [state2, setState2] = useState(true);
    const [state3, setState3] = useState(false);
    const [state4, setState4] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Switch checked={state1} onChange={setState1} label="Off" />
        <Switch checked={state2} onChange={setState2} label="On" />
        <Switch
          checked={state3}
          onChange={setState3}
          disabled
          label="Disabled Off"
        />
        <Switch
          checked={state4}
          onChange={setState4}
          disabled
          label="Disabled On"
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch
        checked={true}
        onChange={() => {}}
        label="Primary"
        variant="primary"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Secondary"
        variant="secondary"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Success"
        variant="success"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Danger"
        variant="danger"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch checked={true} onChange={() => {}} label="Small" size="sm" />
      <Switch checked={true} onChange={() => {}} label="Medium" size="md" />
      <Switch checked={true} onChange={() => {}} label="Large" size="lg" />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Extra Large"
        size="xl"
      />
    </div>
  ),
};

export const SemanticStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch
        checked={true}
        onChange={() => {}}
        label="Success"
        semanticState="success"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Error"
        semanticState="error"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Warning"
        semanticState="warning"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Info"
        semanticState="info"
      />
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch
        checked={true}
        onChange={() => {}}
        label="No Shadow"
        shadow="none"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Light Shadow"
        shadow="light"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Medium Shadow"
        shadow="medium"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Heavy Shadow"
        shadow="heavy"
      />
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch
        checked={true}
        onChange={() => {}}
        label="No Radius"
        borderRadius="none"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Small Radius"
        borderRadius="sm"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Medium Radius"
        borderRadius="md"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Large Radius"
        borderRadius="lg"
      />
    </div>
  ),
};

export const BorderWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch
        checked={true}
        onChange={() => {}}
        label="No Border"
        borderWidth="none"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Thin Border"
        borderWidth="thin"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Medium Border"
        borderWidth="medium"
      />
      <Switch
        checked={true}
        onChange={() => {}}
        label="Thick Border"
        borderWidth="thick"
      />
    </div>
  ),
};
