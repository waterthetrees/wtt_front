module.exports = {
  root: true,
  env: {
    es2022: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended', // https://eslint.org/docs/rules/
    'plugin:import/recommended', // https://github.com/import-js/eslint-plugin-import
    'plugin:jsx-a11y/recommended', // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
    'plugin:prettier/recommended', // https://github.com/prettier/eslint-plugin-prettier
    'plugin:react/recommended', // https://github.com/yannickcr/eslint-plugin-react
    'plugin:react-hooks/recommended', // https://www.npmjs.com/package/eslint-plugin-react-hooks
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: [['@', './client/src']],
    },
  },
  rules: {
    'react/prop-types': 'off',
    'no-console': 'warn',
  },
};
