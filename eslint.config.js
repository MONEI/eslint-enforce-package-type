import js from '@eslint/js';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import packageJson from 'eslint-plugin-package-json/configs/recommended';
import enforcePackageType from './lib/index.js';

export default [
  js.configs.recommended,
  eslintPlugin.configs['flat/recommended'],
  ...enforcePackageType.configs.recommended,
  packageJson,
  {
    files: ['**/*.test.js'],
    ...eslintPlugin.configs['flat/tests-recommended']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    }
  }
];
