/**
 * 统一维护html-webpack-plugin插件的模板文件
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../../config')

const htmlPlugins = [
  {
    title: 'project name',
    filename: 'index.html',
    template: 'html/index.html',
    chunks: ['vendor', 'main']
  }
].map((options) => {
  if (process.env.NODE_ENV === 'production') {
    options.minify = {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      minifyJS: true,
      removeComments: true
    }
  } else {
  }

  options.apiPath = config.apiPath
  options.versiton = config.version

  return new HtmlWebpackPlugin(options)
})

module.exports = (config) => {
  config.plugins = config.plugins.concat(htmlPlugins)
  return config
}
