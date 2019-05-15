'use strict'
const path = require('path')
const config = require('../../config')
const env = process.env.NODE_ENV
const isProd = env === 'production'
const utils = require('../utils')
const webpack = require('webpack')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const Mixins = require('../mixins')

module.exports = Mixins({
  context: path.join(config.root, 'src'),
  entry: utils.pickeEntries(),
  output: {
    path: path.resolve(config.root, 'dist'),
    filename: isProd ? 'js/[name].[chunkhash:8].js' : 'js/[name].js',
    publicPath: isProd ? config.publicPath : '/'
  },

  devtool: 'source-map',

  externals: {
  },

  resolve: {
    extensions: config.extensions,
    alias: utils.alias()
  },

  // 模块配置
  module: {
    rules: [
      {
        test: /\.tpl$/,
        // https://github.com/ktsn/vue-template-loader
        loader: 'vue-template-loader',
        options: {
          transformToRequire: {
            // The key should be an element name
            // The value should be an attribute name or an array of attribute names
            img: 'src'
          }
        }
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        // https://github.com/babel/babel-loader
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.(png|jpe?g|gif|svg|eot|otf|ttf|woff|woff2)(\?.*)?$/, // 将文件转化为base64编码
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[hash:12].[ext]'
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${env}"`
    }),

    new InlineManifestWebpackPlugin({
      name: 'webpackManifest'
    }),

    new webpack.HashedModuleIdsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['manifest', 'vendor'].reverse(),
      minChunks: Infinity
    })
  ]
})
