# eslint-enforce-package-type

ESLint plugin to enforce package.json type field to be either "module" or "commonjs".

## Installation

```bash
npm install --save-dev eslint-enforce-package-type
```

## Usage

Add the plugin to your ESLint configuration:

```js
// eslint.config.js
import enforcePackageType from 'eslint-enforce-package-type';

export default [
  // Use recommended configuration (enforces "module" by default)
  enforcePackageType.configs.recommended,

  // Or configure manually
  {
    plugins: {
      'enforce-package-type': enforcePackageType
    },
    rules: {
      // Default to 'module'
      'enforce-package-type/enforce-package-type': 'error',

      // Or enforce 'commonjs'
      'enforce-package-type/enforce-package-type': ['error', {enforceType: 'commonjs'}]
    }
  }
];
```

## Rule Details

This rule enforces that the `type` field in package.json is set to either "module" or "commonjs".

### Options

The rule accepts an options object with the following properties:

- `enforceType`: The type to enforce ("module" or "commonjs"). Defaults to "module".

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
