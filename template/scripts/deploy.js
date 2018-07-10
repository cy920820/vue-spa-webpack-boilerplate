const webpack = require('webpack')
const config = require('./config/prod')

webpack(config).watch({
}, (err, stats) => {
  if (err) throw err
  console.log(stats.toString({
    colors: true,
    modules: false,
    chunks: false
  }))
})
