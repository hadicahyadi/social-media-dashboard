const Merge = require('webpack-merge');
const common = require('./webpack.common.js');

/**
 * Load the correct configuration file.
 *
 */
module.exports = function (env) {
  var config;

  env = env || 'dev';
  config = require(`./webpack.${env}.js`);

  return Merge(common, config);
};
