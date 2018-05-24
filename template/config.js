// project global config

// pkg version
const pkg = require('./package.json')
exports.version = pkg.version

// alias
exports.alias = [
  'views', 'services', 'helper', 'components'
]

// apiPath
let apiPath = null
if (process.env.NODE_ENV === 'production') {
  apiPath = '/'
} else {
  apiPath = ''
}

exports.apiPath = apiPath

// root
exports.root = __dirname

// public path
exports.publicPath = ''
