import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./setupVitest.js'],
    coverage: {
      exclude: ['**/main.js', ...coverageConfigDefaults.exclude],
    },
  },
});
