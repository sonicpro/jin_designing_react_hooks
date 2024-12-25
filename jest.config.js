/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    html: '<html lang="en-US"></html>',
    url: 'https://jestjs.io/',
    userAgent: 'Agent/007',
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js'
  ]
};

module.exports = config;