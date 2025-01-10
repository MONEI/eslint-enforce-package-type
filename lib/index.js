import enforcePackageType from './rules/enforce-package-type.js';

export default {
  rules: {
    'enforce-package-type': enforcePackageType
  },
  configs: {
    recommended: {
      plugins: ['enforce-package-type'],
      rules: {
        'enforce-package-type/enforce-package-type': 'error'
      }
    }
  }
};
