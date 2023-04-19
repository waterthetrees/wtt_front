module.exports = {
  printWidth: 80, // https://prettier.io/docs/en/options.html#print-width
  tabWidth: 2, // https://prettier.io/docs/en/options.html#tab-width
  useTabs: false, // https://prettier.io/docs/en/options.html#tabs
  semi: true, // https://prettier.io/docs/en/options.html#semicolons
  singleQuote: true, // https://prettier.io/docs/en/options.html#quotes
  quoteProps: 'as-needed', // https://prettier.io/docs/en/options.html#quote-props
  jsxSingleQuote: false, // https://prettier.io/docs/en/options.html#jsx-quotes
  trailingComma: 'all', // https://prettier.io/docs/en/options.html#trailing-commas
  bracketSpacing: true, // https://prettier.io/docs/en/options.html#bracket-spacing
  bracketSameLine: false, // https://prettier.io/docs/en/options.html#bracket-line
  arrowParens: 'always', // https://prettier.io/docs/en/options.html#arrow-function-parentheses
  importOrder: [
    '^@/(api|assets|components|data|pages|util)(.*)$', // Absolute imports using '@' alias
    '^(\\.{1,2}\\/)+([A-z|\\-|\\_]\\/?)*$', // Relative imports without file extensions
    '^(\\.{1,2}\\/)+.*$', // Relative imports with file extensions
  ], // https://github.com/trivago/prettier-plugin-sort-imports
  importOrderSeparation: true, // https://github.com/trivago/prettier-plugin-sort-imports
  importOrderSortSpecifiers: true, // https://github.com/trivago/prettier-plugin-sort-imports
};
