import path from 'node:path'
import { fileURLToPath } from 'node:url'
import prettier from 'eslint-plugin-prettier/recommended'
import unusedImports from 'eslint-plugin-unused-imports'
import { fixupPluginRules } from '@eslint/compat'
import tsParser from '@typescript-eslint/parser'
import parser from 'astro-eslint-parser'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

const importPlugin = compat.plugins('eslint-plugin-import')[0]?.plugins?.import

export default [
  js.configs.recommended,
  ...compat.extends('plugin:astro/recommended'),
  prettier,
  {
    plugins: {
      import: fixupPluginRules(importPlugin),
      'unused-imports': unusedImports,
    },

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',

      'import/order': [
        'error',
        {
          groups: [
            'type',
            'builtin',
            'external',
            'internal',
            ['sibling', 'parent'],
            'index',
            'object',
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.astro'],

    languageOptions: {
      parser: parser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  },
]
