// 实际部署时会通过 bash 先设置好 NODE_ENV 变量，本地是在 .env 显示设置 NODE_ENV
// require('dotenv').config();

// 后面会将 NODE-ENV 再次修改，所以下面这句一定要在最前面，这样 node-config 才能读取到正确的配置文件
const { appBuild, port, appHtmlName } = require('../config/config');

// 这边会将 NODE_ENV 再次修改为 development，这个是供 webpack 打包使用
// webpack 打包只需分为 开发 和 生产 两种形式即可
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const express = require('express');
const app = express();

const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(webpackConfig);
app.use(
  devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: true
  })
);
app.use(hotMiddleware(compiler));

// 前端基于 browserHistory 实现路由
// 页面刷新 会再次请求 server，需要将 首页 内容再次返回
app.get('*', (req, res) => {
  res.sendFile(`${appBuild}/${appHtmlName}`);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
