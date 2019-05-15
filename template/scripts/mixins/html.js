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
