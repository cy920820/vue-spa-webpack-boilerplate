/**
 * init webpack-dev-server
 */
const Server = require('webpack-dev-server')
const webpackConfig = require('./config/dev')
const webpack = require('webpack')
const getHost = require('./utils').getHost
let port = 8080
let host = getHost()
let address = `http://${host}:${port}`
let useHotReload = false

const serverClients = [
  `webpack-dev-server/client?${address}`
]

// the config of HMR
if (useHotReload) {
  serverClients.push('webpack/hot/dev-server')
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  webpackConfig.plugins.push(new webpack.NamedModulesPlugin())
}

webpackConfig.entry['server-client'] = serverClients

let server = new Server(webpack(webpackConfig), {
  hot: useHotReload,
  contentBase: webpackConfig.output.path,
  stats: {
    colors: true, chunks: false, modules: false, children: false, hash: false
  },
  disableHostCheck: true
})

server.listen(port, undefined, () => {
  console.log(`\n ===> ${address} \n`)
})

// start mock server
require('../mock/app')(server.app)
