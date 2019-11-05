const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
require('@babel/polyfill');

module.exports = {
  mode: 'production',
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
        exclude: /node_modules/,
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
        test: /\.(svg)/,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  devtool: 'source-map',
  performance: {
    hints: 'warning',
    maxEntrypointSize: 400000,
    assetFilter: (assetFilename) => {
      assetFilename.endsWith('.js');
    },
  },
  resolve: {
    extensions: ['.js', '.css', '.pcss', '*'],
    modules: ['node_modules'],
  },
  stats: {
    children: false,
    entrypoints: false,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new webpack.BannerPlugin({
      banner: ['/*!', ` * @project        ${pkg.name}`, ` * @author         ${pkg.author}`, ` * @release        ${pkg.version}`, ' */', ''].join(
        '\n',
      ),
      raw: true,
    }),
  ],
};
