const user = require('./users')



function route(app) {
  app.use("/", user)
}

module.exports = route