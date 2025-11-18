import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import '@testing-library/jest-dom';
import { Contact } from '../pages/Contact';

describe('Contact Page', () => {
  beforeEach(() => {
    // Mock console methods
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render contact form', () => {
    render(<Contact />);

    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    render(<Contact />);

    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    // Wait for validation errors to appear - check for error messages in input components
    await waitFor(
      () => {
        expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it('should validate email format', async () => {
    render(<Contact />);

    const emailInput = screen.getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    await waitFor(
      () => {
        expect(
          screen.getByText(/Please enter a valid email address/i)
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it('should validate minimum message length', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const subjectInput = screen.getByLabelText(/Subject/i);
    const messageInput = screen.getByLabelText(/Message/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, { target: { value: 'Short' } });

    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    await waitFor(
      () => {
        expect(
          screen.getByText(/Message must be at least 10 characters/i)
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it('should validate maximum message length', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const subjectInput = screen.getByLabelText(/Subject/i);
    const messageInput = screen.getByLabelText(/Message/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, {
      target: { value: 'A'.repeat(501) },
    });

    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    await waitFor(
      () => {
        expect(
          screen.getByText(/Message must be no more than 500 characters/i)
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it('should clear errors when user starts typing', async () => {
    render(<Contact />);

    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText(/Your Name/i);
    fireEvent.change(nameInput, { target: { value: 'J' } });

    await waitFor(() => {
      expect(screen.queryByText(/Name is required/i)).not.toBeInTheDocument();
    });
  });

  it('should display character count for message', () => {
    render(<Contact />);

    const messageInput = screen.getByLabelText(/Message/i);
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    expect(screen.getByText('12/500')).toBeInTheDocument();
  });

  it('should submit form with valid data', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const subjectInput = screen.getByLabelText(/Subject/i);
    const messageInput = screen.getByLabelText(/Message/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, {
      target: { value: 'This is a test message with enough characters.' },
    });

    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    await waitFor(
      () => {
        expect(
          screen.getByText(/Message Sent Successfully!/i)
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
it('should display info cards', () => {
  render(<Contact />);

  expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument();
  expect(screen.getByText(/Response Time/i)).toBeInTheDocument();
  // Use more specific matcher to avoid conflicts with Privacy Policy link
  expect(screen.getByRole('heading', { name: /Privacy/i })).toBeInTheDocument();
});

it('should have privacy policy link', () => {
  render(<Contact />);

  const privacyLink = screen.getByRole('link', { name: /Privacy Policy/i });
  expect(privacyLink).toBeInTheDocument();
  expect(privacyLink).toHaveAttribute('href', '/privacy');
});

it('should render newsletter checkbox', () => {
  render(<Contact />);

  expect(
    screen.getByLabelText(/Subscribe to our newsletter/i)
  ).toBeInTheDocument();
});

it('should render preferred contact method radio group', () => {
  render(<Contact />);

  expect(screen.getByText(/Preferred Contact Method/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/email/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/phone/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/none/i)).toBeInTheDocument();
});

it('should show phone field when phone contact method is selected', async () => {
  render(<Contact />);

  const phoneRadio = screen.getByLabelText(/Phone/i);
  fireEvent.click(phoneRadio);

  await waitFor(() => {
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  });
});

it('should hide phone field when email or no preference is selected', async () => {
  render(<Contact />);

  // First select phone to show the field
  const phoneRadio = screen.getByLabelText(/Phone/i);
  fireEvent.click(phoneRadio);

  await waitFor(() => {
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  });

  // Then select email to hide it
  const emailRadio = screen.getByDisplayValue(/email/i);
  fireEvent.click(emailRadio);

  await waitFor(() => {
    expect(screen.queryByLabelText(/Phone Number/i)).not.toBeInTheDocument();
  });
});

it('should validate phone number when phone contact method is selected', async () => {
  render(<Contact />);

  // Select phone method
  const phoneRadio = screen.getByLabelText(/Phone/i);
  fireEvent.click(phoneRadio);

  // Submit without phone number
  const form = document.querySelector('form') as HTMLFormElement;
  fireEvent.submit(form);

  await waitFor(() => {
    expect(
      screen.getByText(/Phone number is required for phone contact/i)
    ).toBeInTheDocument();
  });
});

it('should allow toggling newsletter subscription', () => {
  render(<Contact />);

  const newsletterCheckbox = screen.getByLabelText(
    /Subscribe to our newsletter/i
  );
  expect(newsletterCheckbox).not.toBeChecked();

  fireEvent.click(newsletterCheckbox);
  expect(newsletterCheckbox).toBeChecked();

  fireEvent.click(newsletterCheckbox);
  expect(newsletterCheckbox).not.toBeChecked();
});

it('should submit form with all new fields', async () => {
  render(<Contact />);

  // Fill required fields
  const nameInput = screen.getByLabelText(/Your Name/i);
  const emailInput = screen.getByLabelText(/Email Address/i);
  const subjectInput = screen.getByLabelText(/Subject/i);
  const messageInput = screen.getByLabelText(/Message/i);
  const newsletterCheckbox = screen.getByLabelText(
    /Subscribe to our newsletter/i
  );
  const phoneRadio = screen.getByLabelText(/Phone/i);

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
  fireEvent.change(messageInput, {
    target: { value: 'This is a test message with enough characters.' },
  });

  // Select phone contact method
  fireEvent.click(phoneRadio);

  // Wait for phone field to appear
  await waitFor(() => {
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  });

  // Fill phone number
  const phoneInput = screen.getByLabelText(/Phone Number/i);
  fireEvent.change(phoneInput, { target: { value: '+48 123 456 789' } });

  // Check newsletter subscription
  fireEvent.click(newsletterCheckbox);

  const form = document.querySelector('form') as HTMLFormElement;
  fireEvent.submit(form);

  await waitFor(
    () => {
      expect(
        screen.getByText(/Message Sent Successfully!/i)
      ).toBeInTheDocument();
    },
    { timeout: 2000 }
  );
});
