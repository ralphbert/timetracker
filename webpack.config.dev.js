let baseConfig = Object.assign({}, require('./webpack.config.base'));
let webpack = require('webpack');

baseConfig.plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  })
];
module.exports = baseConfig;