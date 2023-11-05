import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    onConsoleLog() {
      return false;
    },
    include: ['**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      exclude: [
        ...defaultExclude,
        '**/*.{fixture,enum,interface,type,error}.ts',
      ],
    },
  },
});
