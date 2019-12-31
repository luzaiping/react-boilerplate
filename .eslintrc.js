module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  plugins: ['react', 'react-hooks'],
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
    jest: true // 支持 it 断言
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'comma-dangle': 0,
    'no-console': 0, // 部署前要打开这个rule
    'import/no-extraneous-dependencies': 0, // 部署前要打开这个rule
    'func-names': 0,
    'global-require': 0,
    'no-use-before-define': 0,
    'import/no-dynamic-require': 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-one-expression-per-line': 0,
    'react/button-has-type': 1,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
