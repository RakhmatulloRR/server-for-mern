module.exports = function admin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).send(JSON.stringify("Morojat rad etildi"))
  }
  next()
}