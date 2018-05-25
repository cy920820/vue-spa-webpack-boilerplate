const bodyParser = require('body-parser')
const utils = require('./utils')

let handler = (req, res, next) => {
  let data = null
  try {
    data = utils.readJSON(`${__dirname}${req.path}.json`)
  } catch (err) {
    return next()
  }

  const responseName = data.responseName
  const response = data.response[responseName]

  setTimeout(() => {
    res.send(response)
  }, data.delay)
}

module.exports = (app) => {
  app.use(bodyParser.json())
  app.all('*', handler)
}
