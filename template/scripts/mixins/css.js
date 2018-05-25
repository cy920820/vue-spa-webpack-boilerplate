/**
 * 统一维护extract-text-webpack-plugin插件
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractLibCss = ExtractTextPlugin('css/lib.[contenthash].css')
const extractAppCss = ExtractTextPlugin('css/app.[contenthash].css')
const helper = require('../utils')

module.exports = (config) => {
  config.module.rules.push({
    test: /\.css$/,
    use: helper.cssLoaders('css', extractLibCss)
  })

  config.module.rules.push({
    test: /\.styl$/,
    use: helper.cssLoaders('stylus', extractAppCss)
  })

  config.plugins.push(extractLibCss)
  config.plugins.push(extractAppCss)
  return config
}
