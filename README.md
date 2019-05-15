# vue-spa-webpack-boilerplate

> 这是vue-cli的一个项目模板, 基于 vue2.x，面向单页应用开发需求
> 可参考[vuejs-template](https://github.com/vuejs-templates/webpack).

## 使用

> 建议使用npm 3+来获取更新依赖

```bash
# 全局安装 cli 2.x 脚手架工具
$ npm install -g vue-cli
# 远程下载模板目录
$ vue init cy920820/vue-spa-webpack-boilerplate my-project
# 进入项目目录
$ cd my-project
# 开发 & 生产
$ npm start or yarn start (for dev)
$ npm build or yarn build (for prod)
```

## 实现的功能

- 预编译 es6、stylus、tpl 文件
  - babel-loader
  - stylus-loader
  - vue-template-loader
- 处理图片路径为 dataurl
  - url-loader
- 自动添加 css 浏览器内核前缀
  - postcss-loader
- 压缩 html、css、js
  - UglifyJsPlugin
  - css-loader options
  - HtmlWebpackPlugin
- 按需拆分、打包 js、css
  - entry, 多入口
  - ExtractTextPlugin
- 提取 manifest、使用hash命名文件做持久缓存
  - [name].[chunkhash].js
  - HashedModuleIdsPlugin
  - CommonsChunkPlugin
  - InlineManifestWebpackPlugin
- 全局配置路径别名、文件扩展名
  - resolve alias
  - resolve extensions
- 自动引入资源到 html 文件
  - HtmlWebpackPlugin
- 热更新、浏览器自动刷新
  - HotModuleReplacementPlugin
- 热部署到测试服务器
  - sftp-deploy-tool
- eslint 语法检查
  - pre-commit
  - eslintrc
- 本地 mock
  - webpack-dev-server
  - body-parser
  - ...

## Npm 脚本

```bash
# 构建生产包
yarn build

# eslint 风格检查
yarn lint

# 使用 sftp 工具上传远程测试服务器
yarn deploy

# 热上传测试服务器
yarn hotdeploy

```

## Development

You can fork this repo to create your own boilerplate and use it with  `vue-cli`.

```bash
vue init username/repo my-project
```

## Reference

- [handlebarsjs](http://handlebarsjs.com/)
- [vuejs-templates](http://vuejs-templates.github.io/webpack/)

## Todos

- [x] Routing lazy loading
- [ ] Dll动态链接库加速打包
- [ ] Sentry
- [ ] Unit
- [ ] E2e
