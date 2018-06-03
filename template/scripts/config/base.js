/**
 * ## webpack.base.config
 * @ 公共设置
 * @ 持久化缓存策略
 *    - 追求稳定的模块ID: new webpack.HashedModuleIdsPlugin()
 *    - 避免频繁的chunk内容变动: 合理分割公共模块 | 添加代码分割点(Code Splitting)
 */
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
  // webpack主目录
  context: path.join(config.root, 'src'),

  // 入口文件(建议使用脚本扫描目录生成, 手动添加维护性较差): 划分的chunks
  entry: utils.pickeEntries(),

  // 输出结果
  output: {
    path: path.resolve(config.root, 'dist'), // 必须是绝对路径
    filename: isProd ? 'js/[name].[chunkhash:8].js' : 'js/[name].js', // name: 用于多个入口的输出文件模板; chunkhash: 用于长期缓存,根据其chunk相关内容去生成
    // chunkFileName: isProd ? '[name].[chunkhash:8].js' : '[name].js', // 附加分块(除入口文件之外的)的文件名模板; 多用于模块异步按需加载
    publicPath: isProd ? config.publicPath : '/' // 用于生产环境下
  },

  // 调试工具 - sourceMap
  devtool: 'source-map',

  // externals: 不打包这些模块， 而是使用CDN资源
  externals: {
  },

  // 解析模块请求的选项
  resolve: {

    // 自动补全使用的扩展名
    extensions: config.extensions,

    // 起别名
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
        loader: 'babel-loader'
      },

      {
        test: /\.(png|jpe?g|gif|svg|eot|otf|ttf|woff|woff2)(\?.*)?$/, // 将文件转化为base64编码
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[hash:12].[ext]',
          publicPath: './images'
        }
      }
    ]
  },

  // 附加插件列表
  plugins: [
    // 设置全局环境变量, 对于不同的环境构建不同的行为
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${env}"` // 使用双重引号 或者 JSON.stringify
    }),

    // 为避免增加一个manifest.js文件的请求, 可以借助工具内联在html script中, 提高页面的加载速度
    // 该插件依赖html-webpack-plugin 和 公共chunk manifest
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest'
    }),

    // 由于webpack生成的模块ID不稳定, 需要借助工具保证模块ID稳定, 从而达到chunkhash稳定, 实现webpack持久化缓存最优
    new webpack.HashedModuleIdsPlugin(),

    // 利用该配置抽离公共部分, 但是这样会导致webpack runtime被抽离到数组末尾的chunks,即vendor 
    new webpack.optimize.CommonsChunkPlugin({
      names: ['manifest', 'vendor'].reverse(), // 提取公共模块到vendor, 将webpack runtime提取到名为manifest的公共chunk中
      minChunks: Infinity // 公共Chunk只包含entry中指定的模块
    })
  ]
})
