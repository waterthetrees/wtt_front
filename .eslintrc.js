module.exports = {
  root: true,
  env: {
    es2022: true,
    browser: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:jsx-a11y/recommended', 'plugin:prettier/recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:storybook/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      alias: [['@', './client/src']]
    }
  },
  rules: {
    'react/prop-types': 'off',
    'no-console': 'warn'
  }
};