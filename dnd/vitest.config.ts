import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
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
