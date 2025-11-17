import type { Preview } from '@storybook/preact';
import '../src/styles/index.scss';
import ThemeProvider from '../src/ThemeProvider';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'auto', title: 'Auto', icon: 'eye' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div
        id="app"
        style={{
          minHeight: 'auto',
          backgroundColor: 'var(--pta-color-bg)',
          padding: '20px',
        }}
      >
        <ThemeProvider initialTheme={context.globals.theme}>
          {Story()}
        </ThemeProvider>
      </div>
    ),
  ],
};

export default preview;
