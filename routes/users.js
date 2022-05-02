const { express, bcrypt, lodash } = require("../npm");
// const _ = lodash;
const router = express.Router();
const { User, validateUser } = require("../modules/usersMongoDB");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// const users = require("../db/usersDB");
//! READ /me
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  return res.send(user); 
});
//! READ all users
router.get("/", [auth, admin], async (req, res) => {
  const users = await User.find().sort("name");
  return res.send(users);
});
//! CREATE user
router.post("/", async (req, res) => {
  // sorovni validatsiya qilish
  const { error } = validateUser(req.body);
  if (error) {
    return res.send(JSON.stringify(error.details[0].message));
  }
  const isIncludeUser = await User.findOne({ email: req.body.email });
  if (isIncludeUser) {
    return res.status(400).send(JSON.stringify("Mavjud bo'lgan foydalanuvchi"));
  }
  // yangi kitob yaratish
  const userObj = new User(lodash.pick(req.body, ["name", "email", "password", "isAdmin"]));
  const salt = await bcrypt.genSalt();
  userObj.password = await bcrypt.hash(userObj.password, salt);
  const user = await userObj.save();
  // kitobni bazaga push qilish

  return res.status(201).send(lodash.pick(user, ["_id", "name", "email", "isAdmin"]));
});
//! READ users by :name
router.get("/:id", [auth, admin], async (req, res) => {
  // kitobni bazadan izlab topish
  const user = await User.findById(req.params.id);
  // agarda kitob mavjud bo'lmasa, 404 qaytarish
  if (!user) {
    return res
      .status(404)
      .send(JSON.stringify("berligan name li kitob topilmadi"));
  }
  // topilgan kitobni qaytarish
  res.status(200).send(user);
});
//! UPDATE()
router.put("/:id", async (req, res) => {
  // kitobni bazadan izlab topish
  const user = await User.findById(req.params.id);
  // agarda kitob mavjud bo'lmasa, 404 qaytarish
  if (!user) {
    return res
      .status(404)
      .send(JSON.stringify(`berligan id li kitob topilmadi`));
  }
  // agarda kitob topilsa so'rovni validatsiya qilish
  const { error } = validateUser(req.body);
  // agarda so'rov validatsiyadan o'tmasa, 400 qaytarish
  if (error) {
    return res.send(JSON.stringify(error.details[0].message));
  }
  // kitobni yangilash(topilgan kitobni validatsiya natijasiga tenglash)

  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.isAdmin = req.body.isAdmin;
  const savedUser = await user.save();
  // yangilangan kitobni qaytarish

  res.send(savedUser);
});
//! DELETE
router.delete("/:id", auth, async (req, res) => {
  // kitobni bazadan izlab topish
  const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
  // agarda kitob mavjud bo'lmasa, 404 qaytarish
  if (!deletedUser) {
    return res
      .status(404)
      .send(JSON.stringify(`berligan id li kitob topilmadi`));
  } else {
    return res.status(200).send(deletedUser);
  }
});

module.exports = router;
