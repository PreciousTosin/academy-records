import webpack from 'webpack';
import path from 'path';

export default {
  entry: [
    'webpack-hot-middleware/client',
    './src/main',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  module: {
    loaders: [{
      tests: /\.js?$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src'),
    }],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['js', '.css'],
  },
};
