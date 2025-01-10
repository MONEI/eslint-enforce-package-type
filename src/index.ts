import type {ESLint} from 'eslint';
import * as jsoncParser from 'jsonc-eslint-parser';
import enforcePackageType from './rules/enforce-package-type.js';

const plugin: ESLint.Plugin = {
  meta: {
    name: 'eslint-enforce-package-type',
    version: '1.0.0'
  },
  rules: {
    'enforce-package-type': enforcePackageType
  },
  configs: {
    recommended: [
      {
        files: ['package.json'],
        plugins: {
          'enforce-package-type': {
            rules: {
              'enforce-package-type': enforcePackageType
            }
          }
        },
        rules: {
          'enforce-package-type/enforce-package-type': 'error'
        },
        languageOptions: {
          parser: jsoncParser
        }
      }
    ]
  }
};

export default plugin;
