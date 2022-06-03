module.exports = {
  //   parserOptions: {
  //     ecmaVersion: 6,
  //     module: 'commonJS',
  //   },
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  env: {
    node: true,
  },
  rules: {
    // https://eslint.org/docs/rules/array-bracket-spacing
    'array-bracket-spacing': ['error', 'never'],

    'no-underscore-dangle': 0,
    // Use the one true brace style
    // "brace-style": ["error", "1tbs"],

    'linebreak-style': 0,
    camelcase: 0,
    'func-names': 0,

    // Shouldn't use console.* -- use a proper logger instead, e.g.
    // https://www.npmjs.com/package/winston
    // "no-console": ["warn"],
    // "no-debugger": ["warn"],

    // Don't use semicolons at the end of your statements
    // semi: ["error", "never"],\
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
  },
};
