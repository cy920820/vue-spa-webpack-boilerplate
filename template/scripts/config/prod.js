'use strict'
// const shell = require('shelljs')
// shell.echo(env.NODE_ENV = 'development')
process.env.NODE_ENV = 'development'
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackConfig = require('./base')

module.exports = webpackMerge(webpackConfig, {
  plugins: [
    // compress js && tree shaking
    // 可以将未使用的 exports 和 很多不必要的代码清除
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false }
    })
  ]
})
