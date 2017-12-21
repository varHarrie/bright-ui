const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const lessFunctions = require('less-plugin-functions')
const autoprefixer = require('autoprefixer')

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
  js: {
    test: /\.js$/,
    enforce: 'pre',
    loader: 'source-map-loader'
  },
  tsx: {
    test: /\.tsx?$/,
    include: path.resolve(root, 'src'),
    exclude: /node_modules/,
    use: ['react-hot-loader/webpack', 'awesome-typescript-loader']
  },
  tsxForProd: {
    test: /\.tsx?$/,
    include: path.resolve(root, 'src'),
    exclude: /node_modules/,
    loader: 'awesome-typescript-loader'
  },
  // css: {
  //   test: /\.css$/,
  //   use: ExtractTextPlugin.extract({
  //     fallback: 'style-loader',
  //     use: [
  //       {loader: 'css-loader', options: {importLoaders: 1}},
  //       {loader: 'postcss-loader', options: postCssOptions}
  //     ]
  //   })
  // },
  less: {
    test: /\.less$/i,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {loader: 'css-loader', options: {importLoaders: 1}},
        {loader: 'postcss-loader', options: postCssOptions},
        {loader: 'less-loader', options: lessOptions}
      ]
    })
  },
  url: {
    test: /\.(png|jpg|gif)$/,
    use: [{loader: 'url-loader', options: {limit: 8192}}]
  }
}

const base = {
  devtool: 'inline-source-map',
  entry: path.resolve(root, 'src/index.ts'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.less']
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }
}

const development = {
  output: {
    filename: 'index.js',
    path: path.resolve(root, 'dist'),
    publicPath: 'dist/',
    library: 'Bright-UI',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      rules.js,
      rules.tsx,
      rules.less,
      rules.url
    ]
  },
  plugins: [
    new ExtractTextPlugin('index.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  ]
}

const production = {
  devtool: 'cheep-source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(root, 'dist'),
    publicPath: 'dist/',
    sourceMapFilename: 'bright-ui.sourcemap.js',
    library: 'Bright-UI',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      rules.js,
      rules.tsxForProd,
      rules.less,
      rules.url
    ]
  },
  plugins: [
    new ExtractTextPlugin('index.css'),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
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
