// Vitest configuration (CommonJS style for compatibility)
const config = {
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: 'coverage',
  exclude: ['**/node_modules/**', '**/dist/**', 'src/lom.js']
    }
  }
};

module.exports = config;
