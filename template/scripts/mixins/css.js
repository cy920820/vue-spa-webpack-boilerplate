/**
 * 统一维护extract-text-webpack-plugin插件
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractLibCss = new ExtractTextPlugin('css/lib.[contenthash].css')
const extractAppCss = new ExtractTextPlugin({
  filename: 'css/app.[contenthash].css',
  allChunks: true
})
const utils = require('../utils')

module.exports = (config) => {
  config.module.rules.push({
    test: /\.css$/,
    use: utils.cssLoaders('css', extractLibCss)
  })

  config.module.rules.push({
    test: /\.styl$/,
    use: utils.cssLoaders('stylus', extractAppCss)
  })

  config.plugins.push(extractLibCss)
  config.plugins.push(extractAppCss)
  return config
}
