import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig({
  ...viteConfig,
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8', // or 'istanbul' if you prefer
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts',
        'src/main.tsx',
        'src/_test-utils/index.ts',
        'src/pages/app.tsx',
        'src/pages/about_page.tsx',
        'src/_test-utils/mocks.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  },
  resolve: {
    alias: {
      '@assets': '/users/alekseishapovalov/my-rick-morty-app/src/assets',
      '@entities': '/users/alekseishapovalov/my-rick-morty-app/src/entities',
      '@pages': '/users/alekseishapovalov/my-rick-morty-app/src/pages',
      '@shared': '/users/alekseishapovalov/my-rick-morty-app/src/shared',
      '@state': '/users/alekseishapovalov/my-rick-morty-app/src/state',
    },
  },
});
