module.exports = {
  env: {
    es6: true,
    node: true
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'prettier/prettier': ['error', {
      singleQuote: true
    }],

    'linebreak-style': [
      'error',
      'unix'
    ]
  },
  overrides: [
    {
      files: ["test.js"],
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
      }
    }
  ]
};
