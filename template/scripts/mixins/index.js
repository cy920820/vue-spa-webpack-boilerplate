const htmlMixins = require('./html')
const cssMixins = require('./css')

module.exports = (config) => {
  return cssMixins(htmlMixins(config))
}