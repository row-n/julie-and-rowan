const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
require('@babel/polyfill');

module.exports = {
  mode: 'development',
  context: __dirname,
  target: 'web',
  entry: {
    site: [path.resolve(__dirname, 'src/assets/js/site.js'), path.resolve(__dirname, 'src/assets/css/site.pcss')],
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: '[name].bundle.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, path.resolve(__dirname, 'src/assets/js/vendor/')],
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(pc|c)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(woff|woff2|svg|jpg)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  devtool: '(none)',
  resolve: {
    extensions: ['.js', '.css', '.pcss', '*'],
    modules: ['node_modules'],
  },
  watch: true,
  watchOptions: {
    ignored: ['node_modules'],
    aggregateTimeout: 0,
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    stats: {
      builtAt: false,
      colors: true,
      entrypoints: false,
      errors: true,
      modules: false,
      performance: true,
      version: false,
      warnings: true,
    },
    watchContentBase: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
