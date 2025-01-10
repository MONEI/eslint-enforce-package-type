import fs from 'fs';
import jsoncParser from 'jsonc-eslint-parser';
import {URL} from 'url';
import enforcePackageType from './rules/enforce-package-type.js';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version
  },
  rules: {
    'enforce-package-type': enforcePackageType
  },
  configs: {}
};

// Assign configs after plugin object is created so we can reference it
Object.assign(plugin.configs, {
  recommended: [
    {
      files: ['package.json'],
      plugins: {
        'enforce-package-type': plugin
      },
      rules: {
        'enforce-package-type/enforce-package-type': 'error'
      },
      languageOptions: {
        parser: jsoncParser
      }
    }
  ]
});

export default plugin;
