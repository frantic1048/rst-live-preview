#!/usr/bin/env node
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackDevServer = require("webpack-dev-server");
var opener = require('opener');

// rstpreview [OPTION...] INPUT
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
server.listen(function() {

  // `listeningApp` is found from webpack-dev-server sourcecode
  // https://github.com/webpack/webpack-dev-server/blob/master/lib/Server.js#L292-L294
  var port = server.listeningApp.address().port;

  console.log('rST preview runs on localhost:' + port);

  // use iframe mode (/webpack-dev-server/) for auto refreshing
  // so that it doesn't need manual injecting webpack-dev-server runtime
  opener('http://localhost:' + port + '/webpack-dev-server/index.html');
});
