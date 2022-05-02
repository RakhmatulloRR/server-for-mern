const {express, bcrypt, config, lodash} = require('../npm');
const router = express.Router();
const _ = lodash;
const { User, validateAuth } = require("../modules/usersMongoDB");

// const users = require("../db/usersDB");
//! CREATE user
router.post("/", async (req, res) => {
  // sorovni validatsiya qilish
  const { error } = validateAuth(req.body);
  if (error) {
    return res.send(JSON.stringify(error.details[0].message));
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send(JSON.stringify("Email yoki parol noto'g'ri"));
  }
  // yangi kitob yaratish

  isValidPwd = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPwd) {
    return res.status(400).send(JSON.stringify("Email yoki parol noto'g'ri"));
  }
  const token = user.generateAuthToken()
  return res.header("x-auth-token", token).status(200).send(true);
  // kitobni bazaga push qilish

  return res.status(201).send(_.pick(user, ["name", "email", "_id"]));
});


module.exports = router;
