module.exports = {
  root: true,
  env: { node: true },
  globals: {
    __dirname: true,
    module: true,
    window: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:unicorn/all',
  ],
  rules: {
    'id-length': ['off', { exceptionPatterns: ['_'] }],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'unicorn/no-useless-undefined': [
      'error',
      {
        checkArguments: false,
      },
    ],
    'unicorn/prefer-event-target': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['*.js', '*.cjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
};
