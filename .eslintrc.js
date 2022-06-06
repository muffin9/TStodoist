module.exports = {
  extends: 'airbnb-typescript/base',
  plugins: ['import', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  ignorePatterns: ['webpack.config.js', 'dist'],
};
