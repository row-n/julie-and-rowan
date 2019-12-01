const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = {
  mode: 'production',
  context: __dirname,
  target: 'web',
  entry: {
    site: [path.resolve(__dirname, 'src/assets/js/site.js'), path.resolve(__dirname, 'src/assets/css/site.pcss')],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
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
        test: /\.(eot|otf|ttf|woff|woff2|svg)$/i,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images/',
              publicPath: 'images/',
              esModule: false,
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
    }),
    new webpack.BannerPlugin({
      banner: ['/*!', ` * @project        ${pkg.name}`, ` * @author         ${pkg.author}`, ` * @release        ${pkg.version}`, ' */', ''].join(
        '\n',
      ),
      raw: true,
    }),
  ],
};
