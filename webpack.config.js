'use strict';

var webpack = require('webpack');
var __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: __DEV__ ? '#cheap-module-eval-source-map' : false,
  entry: {
    devtools: './src/devtools.js',
    background: './src/background.js',
    hook: './src/hook.js',
    panel: './src/panel.js',
    'popup-shared': './src/popup-shared.js',
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
  },
  plugins: __DEV__ ? [] : [
    // Ensure we get production React
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    // Remove dead code but keep it readable:
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      beautify: true,
      compress: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader:  'babel',
      exclude: /node_modules/,
    }],
  },
  watch: __DEV__,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
  },
};

