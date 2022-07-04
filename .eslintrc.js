module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'jsx-a11y/label-has-for': 0,
    'max-lines-per-function': [
      2,
      {
        max: 320,
        skipComments: true,
        skipBlankLines: true,
      },
    ],
    'no-confusing-arrow': 0,
    'no-nested-ternary': 0,
    'no-console': 2,
    'no-param-reassign': [
      2,
      {
        props: true,
        ignorePropertyModificationsFor: ['draft'],
      },
    ],
    'no-param-reassign': [
      2,
      { props: true, ignorePropertyModificationsFor: ['res', 'item', 'state'] },
    ],
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name=/^(log|warn|error|info|trace)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
    'react/no-this-in-sfc': 0,
    'prettier/prettier': [
      'error',
      {},
      {
        fileInfoOptions: {
          withNodeModules: true,
        },
      },
    ],
  },
};
