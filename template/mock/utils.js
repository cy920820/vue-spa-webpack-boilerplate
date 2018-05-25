const fs = require('fs')

// get json
exports.readJSON = (file) => {
  return JSON.parse(fs.readFile(file))
}

// set json
exports.rewriteJSON = (file, data) => {
  return JSON.stringify(fs.writeFile(file, data))
}
