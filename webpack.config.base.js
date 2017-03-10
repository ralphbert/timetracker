let webpack = require('webpack');
let path = require('path');

module.exports = {
  output: {
    publicPath: 'js/',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(sass|scss)$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ]
    }, {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: { presets: ['es2015'] }
      }]
    }, {
      test: /\.vue$/,
      use: ['vue-loader']
    }]
  },
  resolve: {
    modules: ["node_modules", "bower_components"],
    alias: {
      "vueCommon": path.join(__dirname, 'node_modules/vue/dist/vue.common.js')
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ]
};