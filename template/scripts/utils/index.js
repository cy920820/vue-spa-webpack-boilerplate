const config = require('../../config')
const path = require('path')
const glob = require('glob')
const os = require('os')
const env = process.env.NODE_ENV
const isProd = env === 'production'
/**
 * set alias in base config
 * @param {Array} alias Project global config alias Array
 */

exports.alias = () => {
  let alias = config.alias
  return alias.reduce((copy, name) => {
    copy[name] = config.root + '/src/' + name
    return copy
  }, {})
}

/**
 * create css related loaders
 */

exports.cssLoaders = (name, extract) => {
  let loaders = [
    {
      loader: 'css-loader',
      options: {
        minimize: isProd,
        sourceMap: false
      }
    },

    {
      loader: 'postcss-loader',
      options: {
        sourceMap: false
      }
    }
  ]

  if (name !== 'css') {
    loaders.push({
      loader: name + '-loader',
      options: {
        sourceMap: false
      }
    })
  }

  if (!isProd) {
    loaders.unshift('style-loader')
  } else {
    loaders = extract.extract({ use: loaders })
  }

  return loaders
}

/**
 * pickeEntries
 */

exports.pickeEntries = () => {
  let entry = {}
  glob.sync('./entry/*.js', {
    cwd: path.join(config.root, 'src')
  })
  .map((file) => {
    const parts = path.parse(file)
    entry[parts.name] = [ file ]
  })

  return entry
}

/**
 * get Host
 */

exports.getHost = () => {
  let IPv4 = '127.0.0.1'
  let networkInterfaces = os.networkInterfaces()
  for (let key in networkInterfaces) {
    networkInterfaces[key].some((interface) => {
      if (interface.family == 'IPv4' && key == 'en8') {
        IPv4 = interface.address
        return true
      }
    })
  }

  return IPv4
}
