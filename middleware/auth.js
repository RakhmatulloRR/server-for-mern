// const { jwt } = require("../npm");
const {jwt, config} = require("../npm")


function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .send(JSON.stringify("Token bo'lmaganligi sababli murojat rad etildi"));
  }
  try {
    const decoded = jwt.verify(token, config.get("JWT_KEY"));
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send(JSON.stringify("Yaroqsiz token"));
  }
}

module.exports = auth;
