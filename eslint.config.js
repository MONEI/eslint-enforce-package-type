import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    }
  },
  {
    files: ['package.json'],
    plugins: {
      'enforce-package-type': {
        rules: {
          'enforce-package-type': (await import('./lib/rules/enforce-package-type.js')).default
        }
      }
    },
    rules: {
      'enforce-package-type/enforce-package-type': 'error'
    },
    languageOptions: {
      parser: (await import('jsonc-eslint-parser')).default
    }
  }
];
