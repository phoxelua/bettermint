'use strict';

var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.base.config.js');
var update = require('react/lib/update');
var HtmlWebpackPlugin = require('html-webpack-plugin');

if (process.env.NODE_ENV !== 'test') {
  config = update(config, {
    entry: {
      $set: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/dev-server',
        './app/entry',
      ],
    },
  });
}

config = update(config, {
  debug: { $set: true },

  profile: { $set: true },

  devtool: { $set: 'eval-source-map' },

  output: {
    $set: {
      path: path.join(process.cwd(), 'dev'),
      pathInfo: true,
      publicPath: 'http://localhost:3000/',
      filename: 'main.js',
    },
  },

  plugins: {
    $push: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        filename: './index.html',
        template: 'app/index.html',
      }),
    ],
  },

  module: {
    loaders: {
      $push: [
        { test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/ },
      ],
    },
  },

  devServer: {
    $set: {
      port: 3000,

      contentBase: './dev',

      inline: true,

      hot: true,

      stats: {
        colors: true,
      },

      historyApiFallback: true,

      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3001',
      },

      proxy: {
        '/api/*': 'http://localhost:3001',
      },
    },
  },
});

module.exports = config;
