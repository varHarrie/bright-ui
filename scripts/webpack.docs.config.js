const path = require('path')
const webpack = require('webpack')
const lessFunctions = require('less-plugin-functions')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const root = path.resolve(__dirname, '..')

const lessOptions = {
  plugins: [
    new lessFunctions()
  ]
}

const postCssOptions = {
  ident: 'postcss-ident',
  plugins: () => [
    autoprefixer({browsers: 'last 5 version'})
  ]
}

module.exports = {
  entry: path.resolve(root, 'docs-src/index.js'),
  resolve: {
    extensions: ['.js', '.jsx', '.less']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(root, 'docs')
  },
  module: {
    rules: [{
      test: /\jsx?$/,
      include: path.resolve(root, 'docs'),
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react']
        }
      }
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {loader: 'css-loader', options: {importLoaders: 1}},
          {loader: 'postcss-loader', options: postCssOptions},
          {loader: 'less-loader', options: lessOptions}
        ]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('index.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(root, 'docs-src/index.html')
    })
  ]
}
