#!/usr/bin/env node
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackDevServer = require("webpack-dev-server");
var opener = require('opener');

// rstp [OPTION...] INPUT
var option  = process.argv.slice(2, -1);
var input = process.argv[process.argv.length - 1];

var iFile = path.resolve(input);
var iDir  = path.dirname(iFile);

var webpackConfig = {
  entry: {
    rst: iFile,
  },

  output: {
    path: iDir,
    filename: '[name].js',
  },

  context: iDir,

  resolve: {
    extensions: ['', 'rst'],
  },

  module: {
    loaders: [
      {
        test: /\.rst$/,
        loader: ExtractTextPlugin.extract(path.join(__dirname,'./rst-loader')),
      },
    ],
  },

  // rst-loader option
  rst: {
    argv: option,
  },

  plugins: [
    new ExtractTextPlugin('index.html'),
  ],
};

var devServerConfig = {
  contentBase: './',
  stats: { errorDetails: true, colors: true },
};

var compiler = webpack(webpackConfig);
var server = new WebpackDevServer(compiler, devServerConfig);
server.listen(8080, 'localhost', function() {
  // use iframe mode for autorefresh
  opener('http://localhost:8080/webpack-dev-server/index.html');
});
