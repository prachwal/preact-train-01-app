import { Component, type ComponentChildren } from 'preact';
import { Card, Typography } from '../ui';

/**
 * Props for the ErrorBoundary component
 */
export interface Props {
  children: ComponentChildren;
}

/**
 * State for the ErrorBoundary component
 */
export interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <Card variant="elevated" shadow="light" size="xl">
            <Typography variant="h2" color="error" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body1" color="secondary" gutterBottom>
              {this.state.error?.message || 'An unexpected error occurred'}
            </Typography>
            <Typography variant="body2" color="tertiary">
              Please try refreshing the page or contact support if the problem
              persists.
            </Typography>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
