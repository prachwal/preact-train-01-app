import type { Meta, StoryObj } from '@storybook/preact';
import { Form } from './Form';
import { Input } from './Input';
import { Button } from './Button';
import type { FormProps } from '../types';

const meta: Meta<FormProps> = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSubmitting: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<FormProps>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" type="email" placeholder="Enter your email" />
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </>
    ),
  },
};

export const WithValidation: Story = {
  args: {
    onValidate: () => {
      console.log('Validating form...');
      return true;
    },
    children: (
      <>
        <Input label="Username" placeholder="Enter username" required />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          required
        />
        <Button type="submit" variant="primary">
          Login
        </Button>
      </>
    ),
  },
};

export const Submitting: Story = {
  args: {
    isSubmitting: true,
    children: (
      <>
        <Input label="Name" placeholder="Enter your name" disabled />
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          disabled
        />
        <Button type="submit" variant="primary" disabled>
          Submitting...
        </Button>
      </>
    ),
  },
};

export const WithErrorHandling: Story = {
  args: {
    onSubmit: (e: Event) => {
      e.preventDefault();
      console.log('Form submitted');
    },
    onValidate: () => {
      console.log('Validation failed');
      return false;
    },
    children: (
      <>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          error="Please enter a valid email"
        />
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </>
    ),
  },
};

export const ComplexForm: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input label="First Name" placeholder="John" required />
        <Input label="Last Name" placeholder="Doe" required />
        <Input
          label="Email"
          type="email"
          placeholder="john.doe@example.com"
          required
        />
        <Input label="Phone" type="tel" placeholder="+48 123 456 789" />
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </div>
    ),
  },
};
