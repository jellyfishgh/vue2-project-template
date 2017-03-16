var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')

module.exports = (options, config) => {
  utils = utils(config)
  baseWebpackConfig = baseWebpackConfig(options, config, utils)
  // add hot-reload related code to entry chunks
  Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
  })
  return merge(baseWebpackConfig, {
    module: {
      rules: utils.styleLoaders({
        sourceMap: config.dev.cssSourceMap
      })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': config.dev.env
      }),
      // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: options.template,
        inject: true
      }),
      new FriendlyErrorsPlugin()
    ]
  })
}
