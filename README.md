# eslint-enforce-package-type

ESLint plugin to enforce package.json type field to be either "module" or "commonjs".

## Installation

First, install the required peer dependencies:

```bash
npm install --save-dev eslint@^9.0.0 jsonc-eslint-parser@^2.0.0
```

Then, install the plugin:

```bash
npm install --save-dev eslint-enforce-package-type
```

## Usage

Add the plugin to your ESLint configuration:

```js
// eslint.config.js
import enforcePackageType from 'eslint-enforce-package-type';
import jsoncParser from 'jsonc-eslint-parser';

export default [
  // Use recommended configuration (enforces "module" by default)
  ...enforcePackageType.configs.recommended,

  // Or configure manually
  {
    files: ['package.json'],
    plugins: {
      'enforce-package-type': enforcePackageType
    },
    rules: {
      // Default to 'module'
      'enforce-package-type/enforce-package-type': 'error'
      // Or enforce 'commonjs'
      // 'enforce-package-type/enforce-package-type': ['error', { enforceType: 'commonjs' }]
    },
    languageOptions: {
      parser: jsoncParser
    }
  }
];
```

Then run ESLint:

```bash
# Check for issues
npx eslint .

# Or automatically fix issues
npx eslint . --fix
```

## Rule Details

This rule enforces that the `type` field in package.json is set to either "module" or "commonjs".

### Options

The rule accepts an options object with the following properties:

- `enforceType`: The type to enforce ("module" or "commonjs"). Defaults to "module".

### Auto-fix

This rule supports the `--fix` option. When enabled, it will:

- Add the `type` field if it's missing
- Change the `type` field value to match the enforced type
- Preserve all other fields and formatting

### Examples

#### Valid

```json
{
  "name": "my-package",
  "type": "module"
}
```

```json
{
  "name": "my-package",
  "type": "commonjs"
}
```

#### Invalid

```json
{
  "name": "my-package"
  // Missing type field
}
```

```json
{
  "name": "my-package",
  "type": "commonjs" // When enforceType is set to "module"
}
```

## Features

- ✅ Enforces "type" field in package.json
- ✅ Supports both "module" and "commonjs" types
- ✅ Provides auto-fix functionality
- ✅ Configurable default type
- ✅ Ignores package.json files in node_modules
- ✅ Works with ESLint flat config

## Development

### Prerequisites

- Node.js >= 18
- npm >= 9

### Setup

```bash
# Clone the repository
git clone https://github.com/MONEI/eslint-enforce-package-type.git
cd eslint-enforce-package-type

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint files
npm run lint

# Lint and fix files
npm run lint:fix

# Format files
npm run format
```

### Git Hooks

This project uses [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) to ensure code quality before commits:

- All staged files are formatted with Prettier
- JavaScript files are linted with ESLint
- All tests must pass

These checks run automatically before each commit.

### Testing

Tests are written using Vitest and follow ESLint's testing conventions. Run tests with:

```bash
npm test
```

The test suite includes:

- Rule metadata validation
- Basic functionality tests
- Edge cases (malformed JSON, invalid types)
- Auto-fix functionality tests

### Releasing

This project uses [release-it](https://github.com/release-it/release-it) for version management and package publishing.

Available commands:

```bash
# Dry run (no changes)
npm run release:dry

# Regular release
npm run release

# Alpha release
npm run release:alpha

# Beta release
npm run release:beta
```

The release process:

1. Runs tests and linting
2. Bumps version in package.json
3. Creates a git tag
4. Creates a GitHub release
5. Publishes to npm
6. Formats files after version bump

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

MIT
