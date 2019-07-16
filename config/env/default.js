const defer = require('config/defer').deferConfig;

module.exports = {
  debug: true,
  outputPath: 'dist',
  host: 'localhost',
  port: 4000,
  publicUrl: defer(function getPublicUrl() {
    return `//${this.host}:${this.port}/`;
  })
};
