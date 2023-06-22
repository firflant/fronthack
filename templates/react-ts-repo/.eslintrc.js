module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    'prettier',
  ],
  extends: [
    'react-app',
    'prettier',
  ],
  rules: {
    'comma-dangle': ['warn', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    'keyword-spacing': ['error'],
    'no-console': ['warn', { allow: ['error'] }],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 2 }],
    'no-undef': 'off',
    semi: ['error', 'never'],
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-no-undef': 'off',
    'react/no-did-update-set-state': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  ignorePatterns: ["serviceWorker.*", "enableServiceWorker.*"],
}
