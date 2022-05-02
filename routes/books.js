const { express } = require("../npm");
const router = express.Router();
const { Book, validateBook } = require("../modules/booksMongoDB");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// const books = require("../db/booksDB");
//! READ all books
router.get("/", async (req, res) => {
  const books = await Book.find().sort("name");
  return res.send(books);
});
//! CREATE book
router.post("/", auth, async (req, res) => {

  // sorovni validatsiya qilish
  const { error } = validateBook(req.body);
  if (error) {
    return res.send(JSON.stringify(error.details[0].message));
  }
  // yangi kitob yaratish
  const bookObj = new Book(req.body);
  const book = await bookObj.save();
  // kitobni bazaga push qilish

  return res.status(201).send(book);
});
//! READ books by :name
router.get("/:name", auth, async (req, res) => {
  // kitobni bazadan izlab topish
  const book = await Book.find({ name: req.params.name });
  // agarda kitob mavjud bo'lmasa, 404 qaytarish
  if (!book) {
    return res
      .status(404)
      .send(JSON.stringify("berligan name li kitob topilmadi"));
  }
  // topilgan kitobni qaytarish
  res.status(200).send(book);
});
//! UPDATE()
router.put("/:id", auth, async (req, res) => {
  // kitobni bazadan izlab topish
  const book = await Book.findById(req.params.id);
  // agarda kitob mavjud bo'lmasa, 404 qaytarish
  if (!book) {
    return res
      .status(404)
      .send(JSON.stringify(`berligan id li kitob topilmadi`));
  }
  // agarda kitob topilsa so'rovni validatsiya qilish
  const { error } = validateBook(req.body);
  // agarda so'rov validatsiyadan o'tmasa, 400 qaytarish
  if (error) {
    return res.send(JSON.stringify(error.details[0].message));
  }
  // kitobni yangilash(topilgan kitobni validatsiya natijasiga tenglash)

  book.name = req.body.name;
  book.year = req.body.year;
  book.isBestSeller = req.body.isBestSeller;
  book.author = req.body.author;
  const savedBook = await book.save();
  // yangilangan kitobni qaytarish

  res.send(savedBook);
});
//! DELETE
router.delete("/:id", auth, async (req, res) => {
  // kitobni bazadan izlab topish
  const deletedBook = await Book.findOneAndDelete({ _id: req.params.id });
  // agarda kitob mavjud bo'lmasa, 404 qaytarish
  if (!deletedBook) {
    return res
      .status(404)
      .send(JSON.stringify(`berligan id li kitob topilmadi`));
  } else {
    return res.status(200).send(deletedBook);
  }
});

module.exports = router;
