/** @type { import('@storybook/react-webpack5').StorybookConfig } */
import webpackConfigFunc from '../webpack.config';

const config = {
  webpackFinal: (config) => {
    const webpackConfig = webpackConfigFunc('production');
    config.resolve.alias = {
      ...webpackConfig.resolve.alias,
      ...config.resolve.alias,
    };
    config.module.rules.push(...webpackConfig.module.rules);
    config.plugins.push(...webpackConfig.plugins);
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
