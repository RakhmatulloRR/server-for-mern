const {helmet, compression} = require('../npm');

module.exports = function(app) {
  app.use(helmet());
  app.use(compression())
}