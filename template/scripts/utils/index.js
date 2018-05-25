const config = require('../../config')
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
