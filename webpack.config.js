var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./app/assets/javascripts/entry.js",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js",
    publicPath: '/assets'
  },
  resolve: {
      extensions: ['', '.js'],
      modulesDirectories: [ 'node_modules', 'bower_components' ],
  },
  plugins: [
    new webpack.ResolverPlugin([
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
      ])
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  }
};
