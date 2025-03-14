import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', '.eslintrc.cjs'] }, // Matches ignorePatterns
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.2' } }, // Matched version
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // Custom rules from module.exports version
      // indent: ['error', 2],
      // 'linebreak-style': ['error', 'unix'],
      // quotes: ['error', 'single'],
      // semi: ['error', 'never'],
      // eqeqeq: 'error',
      // 'no-trailing-spaces': 'error',
      // 'object-curly-spacing': ['error', 'always'],
      // 'arrow-spacing': ['error', { before: true, after: true }],
      // 'no-console': 0,
      // 'react/react-in-jsx-scope': 'off',
      // 'react/prop-types': 0,
      // 'no-unused-vars': 0,

      // // Ensuring parity with first config
      // 'react/jsx-no-target-blank': 'off',
      // 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
]
