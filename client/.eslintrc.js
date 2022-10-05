module.exports = {
  plugins: ['prettier'],
  extends: ['airbnb-typescript/base', 'plugin:import/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  ignorePatterns: [".eslintrc.js", 'webpack.config.js', 'dist', "server"],
  rules: {
    "@typescript-eslint/indent": 'off',
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
