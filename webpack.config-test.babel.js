/* eslint import/no-commonjs: 0 */

const path = require('path');
const nodeExternals = require('webpack-node-externals');

export default {
  target: 'node',
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
      {
        test: /\.scss$/,
        exclude: /styles/,
        loaders: [
          'style',
          'css?sourceMap&-minimize&modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
          'sass?sourceMap',
        ],
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/,
      },
      {test: /\.(png|jpg)$/, loader: 'url?limit=8192'},
    ],
  },
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
};
