import type {Rule} from 'eslint';
import type {JSONSchema4} from 'json-schema';

interface PackageJson {
  type?: string;
  [key: string]: unknown;
}

interface RuleOptions {
  enforceType?: 'module' | 'commonjs';
}

const schema: JSONSchema4[] = [
  {
    type: 'object',
    properties: {
      enforceType: {
        enum: ['module', 'commonjs']
      }
    },
    additionalProperties: false
  }
];

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce package.json type field to be either "module" or "commonjs"',
      recommended: true,
      url: 'https://github.com/MONEI/eslint-enforce-package-type/blob/main/docs/rules/enforce-package-type.md'
    },
    fixable: 'code',
    schema,
    messages: {
      missingType: 'Missing "type" field in package.json',
      invalidType: '"type" field must be "{{ expected }}", but found "{{ actual }}"'
    }
  },

  create(context) {
    return {
      Program(node) {
        // Only process package.json files
        const filename = context.getFilename();
        if (
          !filename.endsWith('package.json') ||
          filename === 'not-package.json' ||
          filename.includes('node_modules')
        ) {
          return;
        }

        try {
          const options = (context.options[0] as RuleOptions) || {};
          const enforceType = options.enforceType || 'module';
          const source = context.getSourceCode().getText();

          // Try to parse package.json content
          let packageJson: PackageJson;
          try {
            packageJson = JSON.parse(source);
          } catch {
            // If JSON is invalid, report missing type but don't try to fix
            context.report({
              node,
              messageId: 'missingType'
            });
            return;
          }

          if (!packageJson.type) {
            context.report({
              node,
              messageId: 'missingType',
              fix(fixer) {
                const newPackageJson = {...packageJson, type: enforceType};
                return fixer.replaceText(node, JSON.stringify(newPackageJson, null, 2));
              }
            });
          } else if (packageJson.type !== enforceType) {
            context.report({
              node,
              messageId: 'invalidType',
              data: {
                expected: enforceType,
                actual: packageJson.type
              },
              fix(fixer) {
                const newPackageJson = {...packageJson, type: enforceType};
                return fixer.replaceText(node, JSON.stringify(newPackageJson, null, 2));
              }
            });
          }
        } catch {
          // Handle any other unexpected errors
          context.report({
            node,
            messageId: 'missingType'
          });
        }
      }
    };
  }
};

export default rule;
