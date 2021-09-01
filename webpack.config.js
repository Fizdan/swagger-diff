/* eslint no-var:0, import/no-extraneous-dependencies: 0 */
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loaders: ['babel'],
        test: /\.js$/,
      },
      {
        loaders: ['json'],
        test: /\.json$/,
      },
    ],
  },
  output: {
    library: 'SwaggerDiff',
    libraryTarget: 'umd',
    filename: 'dist/swagger-diff.min.js',
  },
  resolve: {
    extensions: ['', '.js', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.browser': JSON.stringify(true),
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      sourceMap: true,
      uglifyOptions: {
        mangle: {
          keep_fnames: true,
        },
        compress: {
          warnings: false,
        },
        output: {
          beautify: false,
        },
      },
    })
  ],
  node: {
    fs: 'empty',
  },
};
