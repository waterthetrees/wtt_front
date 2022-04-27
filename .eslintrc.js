module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  settings: {
    'import/resolver': {
      alias: [
        ['@', './client/src']
      ]
    }
  },
  rules: {
    'react/prop-types': [0, { skipUndeclared: 1 }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/no-extraneous-dependencies': [
      'error', {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
        packageDir: './',
      },
    ],
  },
};
