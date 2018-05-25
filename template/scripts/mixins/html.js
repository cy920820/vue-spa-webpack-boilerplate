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
].map((option) => {
  if (process.env.NODE_ENV === 'production') {
    option.minify = {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      minifyJS: true,
      removeComments: true
    }
  } else {
    options.chunks.push('server-client')
  }

  option.apiPath = config.apiPath
  option.versiton = config.version

  return new HtmlWebpackPlugin(option)
})

module.exports = (config) => {
  config.plugins = config.plugins.concat(htmlPlugins)
  return config
}
