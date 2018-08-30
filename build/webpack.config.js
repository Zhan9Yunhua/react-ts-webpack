const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = require('./config');
const constants = require('./constants');
const styleRules = require('./rules/styleRules');
const jsRules = require('./rules/jsRules');
const fileRules = require('./rules/fileRules');
const plugins = require('./plugins');
const { assetsPath, resolve } = require('./utils');
const optimization = require('./optimization');

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/index.tsx']
  },
  output: {
    path: config.outputPath,
    publicPath: config.outputPublicPath,
    filename: constants.APP_ENV === 'dev' ? '[name].js' : assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: constants.APP_ENV === 'dev' ? '[name].js' : assetsPath('js/[name].[id].[chunkhash].js')
  },
  resolve: {
    extensions: constants.FILE_EXTENSIONS,
    modules: [resolve('src'), resolve('node_modules')],
    alias: {
      mobx: resolve('node_modules/mobx/lib/mobx.es6.js')
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve('tsconfig.webpack.json'),
        extensions: constants.FILE_EXTENSIONS
      })
    ]
  },
  module: {
    rules: [...styleRules, ...jsRules, ...fileRules]
  },
  devServer: config.devServer,
  plugins,
  optimization,
  stats: { children: false },
  devtool: config.sourceMap ? '#source-map' : false
};
