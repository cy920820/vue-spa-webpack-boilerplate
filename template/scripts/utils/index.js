const config = require('../../config')
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
