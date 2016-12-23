/* eslint no-param-reassign: 0, import/no-commonjs: 0 */

const path = require('path');
const _ = require('lodash');
const ip = require('ip');
const webpack = require('webpack');
const config = require('config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const argv = require('yargs').argv;

const __DEV__ = process.env.NODE_ENV === 'development';
const __PROD__ = process.env.NODE_ENV === 'production';


const fixStyleLoader = (loader) => {
  if (!__DEV__) {
    const first = loader.loaders[0];
    const rest = loader.loaders.slice(1);
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
    delete loader.loaders;
  }
  return loader;
};

const getEnvPlugins = () => {
  if (__DEV__) {
    return [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ];
  }
  if (__PROD__) {
    return [
      new ExtractTextPlugin('[name].[contenthash].css', {allChunks: true}),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true,
          warnings: false,
        },
      }),
      new CopyWebpackPlugin([
        {from: './src/static', to: '.'},
      ]),
    ];
  }
  return [
    new ExtractTextPlugin('[name].[contenthash].css', {allChunks: true}),
  ];
};


module.exports = {
  name: 'client',
  target: 'web',
  devtool: __PROD__ ? null : 'inline-eval-cheap-source-map',
  resolve: {
    root: path.join(__dirname, './src'),
    extensions: ['', '.jsx', '.js', '.json'],
    fallback: [
      path.join(__dirname, './src/styles/img'),
    ],
    alias: {
      store: path.join(__dirname, './src/store'),
      containers: path.join(__dirname, './src/containers'),
      services: path.join(__dirname, './src/services'),
      layouts: path.join(__dirname, './src/layouts'),
      components: path.join(__dirname, './src/components'),
    },
  },
  entry: {
    app: _.compact([
      'babel-polyfill',
      __DEV__ && 'webpack-hot-middleware/client',
      './src/styles/main.scss',
      './src/main.jsx',
    ]),
    vendor: [
      'react',
      'react-redux',
      'react-router',
      'redux',
      'redux-actions',
      'redux-connect',
      'lodash',
    ],
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, './dist'),
    publicPath: __DEV__ ? `http://${ip.address()}:${process.env.PORT || 3000}/` : '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      __COVERAGE__: !argv.watch && process.env.NODE_ENV === 'test',
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
        API_BASE_PATH: JSON.stringify(process.env.API_BASE_PATH),
      },
    }),
    new HtmlWebpackPlugin({
      GOOGLE_API_KEY: config.GOOGLE_API_KEY,
      template: './src/index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: false,
      },
    }),
    ...getEnvPlugins(),
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.json5$/,
        loader: 'json5',
      },
      fixStyleLoader({
        test: /\.scss$/,
        exclude: /styles/,
        loaders: [
          'style',
          'css?sourceMap&-minimize&modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
          'sass?sourceMap',
        ],
      }),
      fixStyleLoader({
        test: /\.scss$/,
        include: /styles/,
        loaders: [
          'style',
          'css?sourceMap&-minimize',
          'postcss',
          'sass?sourceMap',
        ],
      }),
      fixStyleLoader({
        test: /\.css$/,
        loaders: ['style', 'css?modules'],
        include: /flexboxgrid/,
      }),
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2',
      },
      {
        test: /\.otf(\?.*)?$/,
        loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype',
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream',
      },
      {test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]'},
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml',
      },
      {test: /\.(png|jpg)$/, loader: 'url?limit=8192'},
    ],
  },
  postcss: [
    require('postcss-flexboxfixer'),
    require('autoprefixer')({
      browsers: ['last 2 versions'],
    }),
  ],
  sassLoader: {
    includePaths: [
      path.join(__dirname, './src/styles'),
      path.join(__dirname, '../src/styles'),
    ],
  },
};
