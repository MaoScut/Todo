const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  // context: resolve(__dirname, 'src'),

  entry: [
    'babel-polyfill',
    './src/index.js', 
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server
    inline: true,
    historyApiFallback: true,
    // match the output path
    // 告诉webpack-dev-server从项目目录下的dist文件夹提供服务（文件）
    contentBase: './dist',
    publicPath: '/',
    // match the output `publicPath`
  },

  module: {
    rules: [{
        test: /\.s?css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      }, {
        test: /\.html$/,
        loaders: ['ngtemplate-loader', 'html-loader']
      }, {
        test: /\.png$/,
        loader: 'url-loader',
      }
    ],
  },
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
};
