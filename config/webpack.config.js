const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // 这个支持对 ES2015+ 的代码进行处理
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const isWsl = require('is-wsl');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const {
  appIndexJs, templateHtml, publicUrl, appBuild, appPublic,
} = require('./config');
// const postcssNormalize = require('postcss-normalize');

const isProductionEnv = process.env.NODE_ENV === 'production';
const isDevelopmentEnv = process.env.NODE_ENV === 'development';
const baseDir = path.resolve('./');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const outputFileName = isProductionEnv ? '[name].[chunkhash:8]' : '[name].[hash:8]';
const outputChunkFileName = isProductionEnv ? '[name].[contenthash:8].chunk' : '[name].chunk';

module.exports = {
  mode: isDevelopmentEnv ? 'development' : 'production',
  bail: isDevelopmentEnv,
  entry: {
    app: [
      'react-hot-loader/patch', // 支持react 热加载
      appIndexJs,
      isDevelopmentEnv && 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    ].filter(Boolean),
  },
  devtool: !!isDevelopmentEnv && 'eval-source-map',
  output: {
    filename: `${outputFileName}.js`,
    chunkFilename: `${outputChunkFileName}.js`,
    path: path.resolve(baseDir, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      'react-dom': isDevelopmentEnv ? '@hot-loader/react-dom' : 'react-dom',
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
          emitWarning: true,
          failOnError: true,
          failOnWarning: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          isDevelopmentEnv && require.resolve('style-loader'),
          isProductionEnv && { loader: MiniCssExtractPlugin.loader },
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]', // css module 类名的格式 name(文件名称) local:类名 后面那串是唯一的识别码
              },
              sourceMap: isDevelopmentEnv,
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-px-to-viewport')({
                  unitToConvert: 'px',
                  viewportWidth: 750,
                  unitPrecision: 5, // 转换成 vw 单位后要保留的小数精度，5 表示保持5位小数位
                  propList: ['*'], // 哪些 css 属性的 px 需要被转换成 vw
                  viewportUnit: 'vw',
                  fontViewportUnit: 'vw',
                  selectorBlackList: [],
                  minPixelValue: 1,
                  mediaQuery: true,
                  // replace: true,
                  // exclude: [],
                  // landscape: false,
                  // landscapeUnit: 'vw',
                  // landscapeWidth: 568
                }),
                // require('postcss-modules-values')
                // require('postcss-import'),
                /* require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009'
                  },
                  stage: 3
                }),
                postcssNormalize() */
              ],
              sourceMap: isProductionEnv && shouldUseSourceMap,
            },
          },
        ].filter(Boolean),
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // 对图片的处理
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: isProductionEnv,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|[ot]tf|eot|svg)(\?t=[0-9]+(#\w+)?)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 51200, // 50K
              name: 'fonts/[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: isProductionEnv,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // 这边的配置项供 webpack compile time 使用，webpack 根据这个进行变量替换 或者 条件分支的执行
      IS_DEVELOPMENT: JSON.stringify(isDevelopmentEnv)
    }),
    // 实际部署要去除这个 plugin
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new MiniCssExtractPlugin({
      filename: `${outputFileName}.css`,
      chunkFilename: `${outputChunkFileName}.css`,
    }),
    new HtmlWebpackPlugin({
      title: 'React Demo',
      // filename: appHtml,
      template: templateHtml,
      minify: isProductionEnv && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CleanWebpackPlugin(),

    isProductionEnv && new webpack.HashedModuleIdsPlugin(),
    isProductionEnv && new CopyPlugin([{ from: appPublic, to: appBuild, ignore: [templateHtml] }]),
    isProductionEnv
      && new UglifyJSPlugin({
        sourceMap: false,
        uglifyOptions: {
          parallel: true,
          output: {
            comments: false,
            beautify: false,
          },
        },
      }),
    isDevelopmentEnv && new webpack.HotModuleReplacementPlugin(),
    isDevelopmentEnv && new OpenBrowserPlugin({ url: `http://${publicUrl}` }),
  ].filter(Boolean),
  optimization: {
    minimize: isProductionEnv,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: { ecma: 8 },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: !isWsl,
        cache: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: !!shouldUseSourceMap && {
            inline: false,
            annotation: true,
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
