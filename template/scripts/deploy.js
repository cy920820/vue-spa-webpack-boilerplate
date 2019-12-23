const webpack = require('webpack')
const config = require('./config/dev')
const DeployPlugin = require('deploy-kit/plugins/sftp-webpack-plugin')
config.plugins.push(new DeployPlugin())

webpack(config).watch({
}, (err, stats) => {
  if (err) throw err
  console.log(stats.toString({
    colors: true,
    modules: false,
    chunks: false
  }))
})
