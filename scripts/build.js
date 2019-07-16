// 读取 .env 里的 process.env.NODE_ENV 环境变量，仅供本地开发使用
// 本地运行 npm run build 或 npm run startProduction，需要将 NODE_ENV 改成实际要运行的环境
// 实际部署时会通过 bash 先设置好 process.env.NODE_ENV 变量，跟 .env 文件无关
require('dotenv').config();

if (!process.env.NODE_ENV) throw new Error('请先设置环境变量NODE_ENV');

// 后面会将 NODE-ENV 再次修改，所以下面这句一定要在最前面，这样 node-config 才能读取到正确的配置文件
const { appBuild, port, appHtmlName } = require('../config/config');

// 这边会将 NODE_ENV 再次修改为 production，这个是供 webpack 打包使用
// webpack 打包只需分为 开发 和 生产 两种形式即可
process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

/* eslint-disable */
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
/* eslint-enable */
const compiler = webpack(webpackConfig);

function build() {
  return new Promise((resolve, reject) => {
    console.log('webpack 开始打包，请稍等...');
    compiler.run((err, stats) => {
      // 这里面可以根据 stats 对打包过程进一步分析 和 处理
      if (err) throw err;
      const { errors = [], warnings = [] } = stats.toJson({}, true);
      if (errors.length === 0) {
        console.log('webpack 打包成功!');
        if (warnings.length > 0) {
          console.warn('有下列警告信息：/n', warnings);
        }
        return resolve();
      }
      return reject(new Error(errors));
    });
  });
}

const promise = build();

if (process.env.RUN_PROD === 'true') {
  promise.then(() => {
    const express = require('express');
    const app = express();
    const compression = require('compression');
    app.use(compression()); // 这个要在 express.static 之前，gzip才会生效
    app.use(express.static(appBuild));
    app.listen(port, () => console.log(`Listening on port ${port}!`));
    app.get('*', (req, res) => {
      res.sendFile(`${appBuild}/${appHtmlName}`);
    });
  });
}
