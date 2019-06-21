const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: true,
    hot: true,
    watchOptions: {
      poll: true
    }
  },
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: [/fonts/],
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  }
}
