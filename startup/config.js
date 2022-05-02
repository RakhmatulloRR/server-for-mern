const config = require('config');
module.exports = function() {
  if (!config.get("JWT_KEY")) {
    throw new Error("JIDDIY HATO: jwt_key muhit o'zgaruvchisi o'rnatilmagan")
  }
};
