var path = require('path');
var webpack = require('webpack');

module.exports = {
  target: 'web',

  resolve: {
    alias: {
      'jQuery': 'jquery'
    },
    modulesDirectories: [
      'bower_components',
      'node_modules',
      'app'
    ],
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    root: path.resolve(__dirname, 'client')
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: process.env.NODE_ENV
    }),
    new webpack.ProvidePlugin({
      $:      "jquery",
      jQuery: "jquery"
    })
  ],

  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules|bower_components)/
      }
    ],

    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ],

    noParse: /\.min\.js/
  }
};

