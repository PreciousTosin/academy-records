import path from 'path';
import webpack from 'webpack';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HandlebarsPlugin = require('handlebars-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


export default {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/main',
    'bootstrap',
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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
    /* new HandlebarsPlugin({
      // path to hbs entry file(s)
      entry: path.join(process.cwd(), '../views', 'src', '*.hbs'),
      // output path and filename(s)
      // if ommited, the input filepath stripped of its extension will be used
      output: path.join(process.cwd(), '[name].html'),
    }), */
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
      /* {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      }, */
    ],
  },
  resolve: {
    extensions: ['ts', '.js', '.jsx'],
  },
};

/*
import webpack from 'webpack';
import path from 'path';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

export default {
  devtool: 'src-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
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
    extensions: ['js', '.css', 'jpeg', 'png', 'gif', 'svg'],
  },
};
*/
