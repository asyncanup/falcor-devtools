'use strict';

var webpack = require('webpack');
var __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: __DEV__ ? '#cheap-module-eval-source-map' : false,
  entry: {
    devtools: './src/devtools.js',
    background: './src/background.js',
    content: './src/content.js',
    panel: './src/panel.js',
    'popup-shared': './src/popup-shared.js',
    'ui-test': './test/ui.js',
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
    }, {
      test: /\.css$/,
      loaders: [ 'style-loader', 'css-loader' ]
    }, {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }],
  },
  watch: __DEV__,
  watchOptions: {
    aggregateTimeout: 300,
      ignored: /node_modules/,
  },
};

