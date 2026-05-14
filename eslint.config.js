import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // Global ignores (apply to all configs)
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'scripts/**',
      'src/version.ts',
      '*.test.ts',
      '*.spec.ts',
      '*.cjs',
      '*.mjs',
    ],
  },

  // Base recommended ESLint + TypeScript rules
  ...tseslint.configs.recommended,

  // Type-aware rules (safer, catches real bugs)
  ...tseslint.configs.recommendedTypeChecked,

  // Project-specific overrides
  {
    files: ['**/*.ts'],

    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      // --- relaxed for typical app code ---
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Safer TS correctness rules (important)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // General JS rules
      'no-console': 'off',
      'no-var': 'error',
      'prefer-const': 'warn',
    },
  },
]);
