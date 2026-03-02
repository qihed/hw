import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  {
    ignores: [
      '**/dist',
      '**/build',
      '**/public',
      '**/*.cjs',
      '**/node_modules',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ['src/**/*.tsx', 'src/**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
    },
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['src/**/*.tsx', 'src/**/*.ts'],
    plugins: {
      prettier,
      import: importPlugin,
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: '19.0', // явно, чтобы обойти баг detect в ESLint 10 flat config
      },
    },
    rules: {
      'eol-last': ['error', 'always'],
      'prettier/prettier': 'error',
      'no-console': 'error',
      'linebreak-style': ['error', 'unix'],
      'import/order': 'off', // eslint-plugin-import: getTokenOrCommentBefore несовместим с ESLint 10
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/no-unknown-property': 'error',
      'react/self-closing-comp': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  }
);
