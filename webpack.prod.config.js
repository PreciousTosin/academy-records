/* eslint import/no-extraneous-dependencies: 'off' */
import path from 'path';
import webpack from 'webpack';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HandlebarsPlugin = require('handlebars-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


export default {
  devtool: 'source-map',
  entry: [
    './src/main',
    'bootstrap',
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../views/index.html'),
      /* inject: 'body', */
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '../src'),
        exclude: /node_modules/,
        options: {
          presets: ['latest'],
        },
      },
      {
        rules: [
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader',
            }),
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 },
          },
          'image-webpack-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['ts', '.js', '.jsx'],
  },
};
