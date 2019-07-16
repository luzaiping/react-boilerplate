// 设置 配置文件 存放路径，默认是存放 config 目录
process.env.NODE_CONFIG_DIR = `${__dirname}/env/`;

const config = require('config');
const paths = require('./paths');

console.log(`config.js 读到的 NODE_ENV 参数: ${config.util.getEnv('NODE_ENV')}`);
console.log(`对应的config: ${JSON.stringify(config)}`);

const pathsObj = paths.getPaths(config);

module.exports = { ...config, ...pathsObj };
