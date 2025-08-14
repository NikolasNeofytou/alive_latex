// Vitest configuration (CommonJS style for compatibility)
const config = {
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: 'coverage',
      exclude: ['**/node_modules/**', '**/dist/**']
    }
  }
};

module.exports = config;
