const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
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

const rules = {
  'jsx': {
    test: /\jsx?$/,
    include: path.resolve(root, 'site-src'),
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'react']
      }
    }
  },
  'css': {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {loader: 'css-loader', options: {importLoaders: 1}},
        {loader: 'postcss-loader', options: postCssOptions}
      ]
    })
  },
  'less': {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {loader: 'css-loader', options: {importLoaders: 1}},
        {loader: 'postcss-loader', options: postCssOptions},
        {loader: 'less-loader', options: lessOptions}
      ]
    })
  }
}

const base = {
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'bright-ui': path.resolve(root, 'dist')
    },
    extensions: ['.js', '.jsx', '.less']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(root, 'site'),
    publicPath: '/'
  }
}

const development = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    path.resolve(root, 'site-src/index.js')
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 8080,
    publicPath: '/',
    contentBase: path.resolve(root, 'dist')
  },
  module: {
    rules: [rules.jsx, rules.css, rules.less]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('index.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(root, 'site-src/index.html')
    })
  ]
}

const production = {
  entry: path.resolve(root, 'site-src/index.js'),
  module: {
    rules: [rules.jsx, rules.css, rules.less]
  },
  plugins: [
    new ExtractTextPlugin('index.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(root, 'site-src/index.html')
    })
  ]
}

module.exports = (env = 'development') => {
  console.log('\n===========================\n')
  console.log(`     env: ${env}`)
  console.log('\n---------------------------\n')
  
  return env === 'production'
    ? merge(base, production)
    : merge(base, development)
}
