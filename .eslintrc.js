module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  overrides: [
    {
      files: ["test/**/*.js"],
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: "module",
      },
    },
  ],
};
