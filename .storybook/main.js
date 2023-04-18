/** @type { import('@storybook/react-webpack5').StorybookConfig } */
import webpackConfigFunc from '../webpack.config';

const config = {
  webpackFinal: (config) => {
    const webpackConfig = webpackConfigFunc('analyze');
    config.resolve.alias = {
      ...webpackConfig.resolve.alias,
      ...config.resolve.alias,
    };
    return config;
  },
  stories: [
    '../stories/**/*.mdx',
    '../client/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/testing-react',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
