'use strict'
// const shell = require('shelljs')
process.env.NODE_ENV = 'development'
const webpackMerge = require('webpack-merge')
const webpackConfig = require('./base')

module.exports = webpackMerge(webpackConfig, {
})
