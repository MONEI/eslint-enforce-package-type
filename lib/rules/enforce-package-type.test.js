import {RuleTester} from 'eslint';
import jsoncParser from 'jsonc-eslint-parser';
import {describe, expect, it, vi} from 'vitest';
import rule from './enforce-package-type.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: jsoncParser,
    parserOptions: {jsonSyntax: 'JSON'}
  }
});

describe('enforce-package-type', () => {
  describe('rule metadata', () => {
    it('has correct metadata', () => {
      expect(rule.meta.type).toBe('problem');
      expect(rule.meta.fixable).toBe('code');
      expect(rule.meta.docs.description).toBe(
        'Enforce package.json type field to be either "module" or "commonjs"'
      );
    });

    it('has valid schema', () => {
      expect(rule.meta.schema).toEqual([
        {
          type: 'object',
          properties: {
            enforceType: {
              enum: ['module', 'commonjs']
            }
          },
          additionalProperties: false
        }
      ]);
    });
  });

  describe('rule behavior', () => {
    it('validates basic cases', () => {
      expect(() => {
        ruleTester.run('enforce-package-type', rule, {
          valid: [
            // Default behavior (module)
            {
              code: JSON.stringify({type: 'module'}, null, 2),
              filename: 'package.json'
            },
            // Explicit module setting
            {
              code: JSON.stringify({type: 'module'}, null, 2),
              filename: 'package.json',
              options: [{enforceType: 'module'}]
            },
            // Explicit commonjs setting
            {
              code: JSON.stringify({type: 'commonjs'}, null, 2),
              filename: 'package.json',
              options: [{enforceType: 'commonjs'}]
            },
            // Should ignore non-package.json files
            {
              code: '{ "type": "wrong" }',
              filename: 'not-package.json'
            }
          ],
          invalid: [
            // Missing type field (default to module)
            {
              code: JSON.stringify({name: 'test-package'}, null, 2),
              filename: 'package.json',
              errors: [{messageId: 'missingType'}],
              output: JSON.stringify({name: 'test-package', type: 'module'}, null, 2)
            },
            // Missing type field (explicit commonjs)
            {
              code: JSON.stringify({name: 'test-package'}, null, 2),
              filename: 'package.json',
              options: [{enforceType: 'commonjs'}],
              errors: [{messageId: 'missingType'}],
              output: JSON.stringify({name: 'test-package', type: 'commonjs'}, null, 2)
            },
            // Wrong type value (should be module)
            {
              code: JSON.stringify({type: 'commonjs'}, null, 2),
              filename: 'package.json',
              errors: [
                {
                  messageId: 'invalidType',
                  data: {expected: 'module', actual: 'commonjs'}
                }
              ],
              output: JSON.stringify({type: 'module'}, null, 2)
            },
            // Wrong type value (should be commonjs)
            {
              code: JSON.stringify({type: 'module'}, null, 2),
              filename: 'package.json',
              options: [{enforceType: 'commonjs'}],
              errors: [
                {
                  messageId: 'invalidType',
                  data: {expected: 'commonjs', actual: 'module'}
                }
              ],
              output: JSON.stringify({type: 'commonjs'}, null, 2)
            },
            // Invalid type value
            {
              code: JSON.stringify({type: 'invalid'}, null, 2),
              filename: 'package.json',
              errors: [
                {
                  messageId: 'invalidType',
                  data: {expected: 'module', actual: 'invalid'}
                }
              ],
              output: JSON.stringify({type: 'module'}, null, 2)
            },
            // Preserves other fields when fixing
            {
              code: JSON.stringify(
                {
                  name: 'test-package',
                  version: '1.0.0',
                  type: 'commonjs',
                  dependencies: {foo: '^1.0.0'}
                },
                null,
                2
              ),
              filename: 'package.json',
              errors: [
                {
                  messageId: 'invalidType',
                  data: {expected: 'module', actual: 'commonjs'}
                }
              ],
              output: JSON.stringify(
                {
                  name: 'test-package',
                  version: '1.0.0',
                  type: 'module',
                  dependencies: {foo: '^1.0.0'}
                },
                null,
                2
              )
            }
          ]
        });
      }).not.toThrow();
    });

    it('handles malformed JSON', () => {
      // For malformed JSON, we'll test the rule directly since RuleTester
      // requires valid JSON for parsing
      const context = {
        getFilename: () => 'package.json',
        getSourceCode: () => ({getText: () => '{ invalid json'}),
        report: vi.fn(),
        options: []
      };

      const program = {};
      rule.create(context).Program(program);

      expect(context.report).toHaveBeenCalledWith({
        node: program,
        messageId: 'missingType'
      });
    });
  });
});
