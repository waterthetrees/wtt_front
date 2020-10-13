module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        // we only want single quotes
        quotes: ['error', 'single'],
        // we want to force semicolons
        semi: ['error', 'always'],
        // we use 2 spaces to indent our code
        indent: ['error', 2],
        // we want to avoid useless spaces
        'no-multi-spaces': ['error'],
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
