import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import vitestGlobals from 'eslint-plugin-vitest-globals'

export default [
  { ignores: ['dist', '.eslintrc.cjs'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...vitestGlobals.environments.env.globals, // Add vitest globals
        ...globals.jest, // Add Jest globals
        ...globals.cypress,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.2' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'vitest-globals': vitestGlobals, // Add vitest-globals plugin
      cypress,
      jest
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...vitestGlobals.configs.recommended.rules, // Apply vitest-globals rules


      // Custom rules
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
]
