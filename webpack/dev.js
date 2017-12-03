const RemoveServiceWorkerPlugin = require('webpack-remove-serviceworker-plugin');

module.exports = (config) => {
  config.devtool = 'cheap-module-eval-source-map';
  config.plugins.push(new RemoveServiceWorkerPlugin());
  return config;
};
