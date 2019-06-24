const path = require('path');
const webpack = require('webpack');

const CORES = ['react', 'react-dom', 'react-router-dom'];
const MODULES = ['@material-ui/core', 'axios'];
const VENDORS = ['react-modal'];

module.exports = {
  entry: {
		app: './src/index.js',
    core: CORES,
		vendor: VENDORS,
    module: MODULES
	},
  optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					name: 'vendor',
					test: 'vendor',
					enforce: true
				},
        core: {
					chunks: 'initial',
					name: 'core',
					test: 'core',
					enforce: true
				},
        module: {
					chunks: 'initial',
					name: 'module',
					test: 'module',
					enforce: true
				},
			}
		},
		runtimeChunk: true
	},
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
    new webpack.DefinePlugin({
      API_URL: JSON.stringify('https://jsonplaceholder.typicode.com')
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  }
}
