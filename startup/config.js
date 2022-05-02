const config = require('config');
module.exports = function() {
  if (!config.get("JWT_KEY")) {
    console.log("JIDDIY HATO: jwt_key muhit o'zgaruvchisi o'rnatilmagan");
    process.exit(1)
  }
};
