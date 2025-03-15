
export default [
  {
    ignores: ['dist', 'node_modules'],
  },

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'off',
    },
  },
];
