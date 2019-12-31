const path = require('path');
const fs = require('fs');
const url = require('url');

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx'
];

const getPaths = ({ publicUrl, outputPath }) => {
  // Make sure any symlinks in the project folder are resolved:
  // https://github.com/facebook/create-react-app/issues/637
  const appDirectory = fs.realpathSync(process.cwd());
  const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

  const envPublicUrl = publicUrl;

  function ensureSlash(inputPath, needsSlash) {
    const hasSlash = inputPath.endsWith('/');
    if (hasSlash && !needsSlash) {
      return inputPath.substr(0, inputPath.length - 1);
    }
    if (!hasSlash && needsSlash) {
      return `${inputPath}/`;
    }
    return inputPath;
  }

  const getPublicUrl = appPackageJson =>
    envPublicUrl || require(appPackageJson).homepage;

  // We use `PUBLIC_URL` environment variable or "homepage" field to infer
  // "public path" at which the app is served.
  // Webpack needs to know it to put the right <script> hrefs into HTML even in
  // single-page apps that may serve index.html for nested URLs like /todos/42.
  // We can't use a relative path in HTML because we don't want to load something
  // like /todos/42/static/js/bundle.7289d.js. We have to know the root.
  function getServedPath(appPackageJson) {
    const publicUrlVal = getPublicUrl(appPackageJson);
    const servedUrl =
      envPublicUrl || (publicUrlVal ? url.parse(publicUrlVal).pathname : '/');
    return ensureSlash(servedUrl, true);
  }

  // Resolve file paths in the same order as webpack
  const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(ext =>
      fs.existsSync(resolveFn(`${filePath}.${ext}`))
    );

    if (extension) {
      return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
  };

  // config after eject: we're in ./config/
  return {
    appPath: resolveApp('.'),
    appBuild: resolveApp(outputPath),
    appPublic: resolveApp('public'),
    templateHtml: resolveApp('public/index.html'),
    appHtmlName: 'index.html', // 通过 htmlWebpackPlugin 生成的 html 文件名称
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appTsConfig: resolveApp('tsconfig.json'),
    appJsConfig: resolveApp('jsconfig.json'),
    yarnLockFile: resolveApp('yarn.lock'),
    testsSetup: resolveModule(resolveApp, 'src/setupTests'),
    proxySetup: resolveApp('src/setupProxy.js'),
    appNodeModules: resolveApp('node_modules'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json'))
  };
};

module.exports = {
  moduleFileExtensions,
  getPaths
};
