/**
 * 统一维护html-webpack-plugin插件的模板文件
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../../config')

// 当开发多页时，例如单独增加一个登陆单页时，方便统一管理html
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
    option.chunks.push('server-client')
  }

  option.apiPath = config.apiPath
  option.appVersion = config.appVersion

  return new HtmlWebpackPlugin(option)
})

module.exports = (config) => {
  config.plugins = config.plugins.concat(htmlPlugins)
  return config
}
