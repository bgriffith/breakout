const path = require('path'),
      webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'app/js/main.js'),
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: [/(node_modules)/, /bower_components/],
      },
    ],
    loaders: [
      {
        loader: 'babel-loader',
        test: path.join(__dirname, 'app'),
        query: {
          presets: 'es2015',
        },
      },
    ],
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
  ],
  stats: {
    // Nice colored output
    colors: true,
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map',
};
