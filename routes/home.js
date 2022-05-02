const { express } = require("../npm");
const router = express.Router();

//! READ all books
router.get("/", (req, res) => {
  return res.send("home page");
});

module.exports = router;
