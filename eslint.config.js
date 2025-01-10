import js from '@eslint/js';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import * as tseslint from 'typescript-eslint';
import enforcePackageType from './dist/index.js';

export default tseslint.config(
  {
    ignores: ['dist/**']
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    files: ['**/*.test.{js,ts}'],
    ...eslintPlugin.configs['flat/tests-recommended']
  },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    }
  },
  ...enforcePackageType.configs.recommended
);
