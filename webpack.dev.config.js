const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  context: __dirname,
  target: 'web',
  entry: {
    site: [path.resolve(__dirname, 'src/assets/js/site.js'), path.resolve(__dirname, 'src/assets/css/site.pcss')],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
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
        options: {
          emitWarning: true,
          failOnWarning: false,
          emitError: true,
          failOnError: false,
        },
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
        test: /\.(eot|otf|ttf|woff|woff2|svg)$/i,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          esModule: false,
        },
      },
      {
        test: /\.(html)$/,
        use: [{
          loader: 'html-loader',
          options: {
            interpolate: true,
          },
        }],
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
