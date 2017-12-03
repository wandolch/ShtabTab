const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = (config) => {
  config.plugins.push(
    new UglifyJsPlugin(),
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      caches: {
        main: [':rest:']
      },
      safeToUseOptionalCaches: true,
      AppCache: false
    })
  );
  return config;
};
