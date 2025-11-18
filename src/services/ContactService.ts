// ContactService - Manages contact form submissions with localStorage persistence

import { signal, effect } from '@preact/signals';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  subscribeNewsletter: boolean;
  preferredContactMethod: 'email' | 'phone' | 'none';
  phone?: string;
  timestamp: number;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  status: 'pending' | 'submitted' | 'failed';
}

// Signals for contact submissions
export const submissions = signal<ContactSubmission[]>([]);
export const isInitialized = signal(false);

// Local storage key
const STORAGE_KEY = 'pta-contact-submissions';

/**
 * Initialize the contact service - load submissions from localStorage
 */
export function initializeContactService() {
  if (isInitialized.value) return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      submissions.value = Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error(
      'Failed to load contact submissions from localStorage:',
      error
    );
    submissions.value = [];
  }

  isInitialized.value = true;
}

/**
 * Auto-save submissions to localStorage whenever they change
 */
effect(() => {
  if (!isInitialized.value) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions.value));
  } catch (error) {
    console.error('Failed to save contact submissions to localStorage:', error);
  }
});

/**
 * Submit a new contact form
 */
export async function submitContactForm(
  formData: ContactFormData
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    // Generate unique ID
    const id = `contact-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Create submission
    const submission: ContactSubmission = {
      ...formData,
      id,
      status: 'pending',
      timestamp: Date.now(),
    };

    // Add to submissions
    submissions.value = [...submissions.value, submission];

    // Simulate API call (replace with real API call in production)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update status to submitted
    submissions.value = submissions.value.map(s =>
      s.id === id ? { ...s, status: 'submitted' } : s
    );

    return { success: true, id };
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get all submissions
 */
export function getAllSubmissions(): ContactSubmission[] {
  return submissions.value;
}

/**
 * Get submission by ID
 */
export function getSubmissionById(id: string): ContactSubmission | undefined {
  return submissions.value.find(s => s.id === id);
}

/**
 * Delete a submission
 */
export function deleteSubmission(id: string): void {
  submissions.value = submissions.value.filter(s => s.id !== id);
}

/**
 * Clear all submissions
 */
export function clearAllSubmissions(): void {
  submissions.value = [];
}

/**
 * Get submissions count
 */
export function getSubmissionsCount(): number {
  return submissions.value.length;
}

/**
 * Get recent submissions (last N)
 */
export function getRecentSubmissions(count: number = 5): ContactSubmission[] {
  return submissions.value
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, count);
}
