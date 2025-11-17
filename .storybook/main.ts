import { StorybookConfig } from '@storybook/preact-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],

  framework: {
    name: '@storybook/preact-vite',
    options: {},
  }
};

export default config;
