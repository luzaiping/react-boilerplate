const presets = [
  [
    '@babel/env',
    {
      targets: '>0.2% not dead not op_mini all'
    }
  ],
  [
    '@babel/preset-react',
    {
      development: process.env.BABEL_ENV === 'development'
    }
  ]
];

const plugins = [
  'react-hot-loader/babel',
  '@babel/plugin-syntax-dynamic-import',
  [
    '@babel/plugin-transform-runtime',
    {
      absoluteRuntime: false,
      corejs: false,
      helpers: true,
      regenerator: true,
      useESModules: false
    }
  ]
];

module.exports = { presets, plugins };
