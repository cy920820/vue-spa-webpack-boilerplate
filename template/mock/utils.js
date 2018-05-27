const fs = require('fs')

// get json
exports.readJSON = (file) => {
  return JSON.parse(fs.readFileSync(file))
}

// set json
exports.rewriteJSON = (file, data) => {
  return JSON.stringify(fs.writeFileSync(file, data))
}
