/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules'],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/client/src/tests/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/client/src/tests/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/client/src/$1', // Translate webpack @ aliases, excluding packages starting with @
  },

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    '<root-dir>/node_modules(?!/@other-packages|d3-.*)/',
  ],

  snapshotSerializers: ['@emotion/jest/serializer'],
};
