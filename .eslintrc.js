module.exports = {
  plugins: ['prettier'],
  extends: ['airbnb-typescript/base', 'plugin:import/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: ['tsconfig.json'],
    extraFileExtensions: ['.js', '.ts', '.html'],
  },
  ignorePatterns: ['webpack.config.js', 'dist'],
  rules: {
    'prettier/prettier': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'import/extensions': [
      'off',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
