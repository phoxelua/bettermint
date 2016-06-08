'use strict';

function makeUrlLoader(pattern) {
  return {
    test: pattern,
    loader: 'url',
    exclude: /node_modules/,
  };
}

exports.tslint = {
  test: /\.tsx?$/,
  loader: 'tslint',
  exclude: /node_modules/,
};

exports.tsx = {
  test: /\.tsx?$/,
  loader: 'ts',
  exclude: /(node_modules|test-utils|\.test\.ts$)/,
};

exports.eslint = {
  test: /\.jsx?$/,
  loader: 'eslint-loader',
  exclude: /node_modules/,
};

exports.babel = {
  test: /\.jsx?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
};

exports.html = {
  test: /\.html$/,
  loader: 'raw',
  exclude: /node_modules/,
};

exports.css = {
  test: /\.scss$/,
  loader: 'style-loader!css-loader!sass-loader',
  exclude: /node_modules/,
};

exports.svg = makeUrlLoader(/\.svg$/);
exports.eot = makeUrlLoader(/\.eot$/);
exports.woff = makeUrlLoader(/\.woff$/);
exports.woff2 = makeUrlLoader(/\.woff2$/);
exports.ttf = makeUrlLoader(/\.ttf$/);
