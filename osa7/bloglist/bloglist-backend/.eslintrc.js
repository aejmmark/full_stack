module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    semi: 'off',
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
  },
}
