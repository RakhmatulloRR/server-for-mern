const { express } = require("../npm");
const router = express.Router();
const { Customer, validateCustomer } = require("../modules/customersMongoDB");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// const customers = require("../db/customersDB");
//! READ all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  return res.send(customers);
});
//! CREATE customer
router.post("/", auth, async (req, res) => {

  // sorovni validatsiya qilish
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(JSON.stringify(error.details[0].message));
  }
  // yangi haridor yaratish
  const customerObj = new Customer(req.body);
  const customer = await customerObj.save();
  // haridorni bazaga push qilish

  return res.status(201).send(customer);
});
//! READ customers by :name
router.get("/:id", auth, async (req, res) => {
  // haridorni bazadan izlab topish
  const customer = await Customer.find({ _id: req.params.id });
  // agarda haridor mavjud bo'lmasa, 404 qaytarish
  if (!customer) {
    return res
      .status(404)
      .send(JSON.stringify("berligan first name li haridor topilmadi"));
  }
  // topilgan haridorni qaytarish
  res.status(200).send(customer);
});
//! UPDATE
router.put("/:id", auth, async (req, res) => {
  // haridorni bazadan izlab topish
  const customer = await Customer.findById(req.params.id);
  // agarda haridor mavjud bo'lmasa, 404 qaytarish
  if (!customer) {
    return res
      .status(404)
      .send(JSON.stringify(`berligan id li haridor topilmadi`));
  }
  // agarda haridor topilsa so'rovni validatsiya qilish
  const { error } = validateCustomer(req.body);
  // agarda so'rov validatsiyadan o'tmasa, 400 qaytarish
  if (error) {
    return res.status(400).send(JSON.stringify(error.details[0].message));
  }
  // haridorni yangilash(topilgan haridorni validatsiya natijasiga tenglash)

  customer.first_name = req.body.first_name;
  customer.last_name = req.body.last_name;
  customer.email = req.body.email;
  customer.date_of_birth = req.body.date_of_birth;
  customer.job = req.body.job;
  customer.country = req.body.country;
  const savedCustomer = await customer.save();
  // yangilangan haridorni qaytarish

  res.send(savedCustomer);
});
//! DELETE
router.delete("/:id", auth, async (req, res) => {
  // haridorni bazadan izlab topish
  const deletedCustomer = await Customer.findOneAndDelete({ _id: req.params.id });
  // agarda haridor mavjud bo'lmasa, 404 qaytarish
  if (!deletedCustomer) {
    return res
      .status(404)
      .send(JSON.stringify(`berligan id li haridor topilmadi`));
  } else {
    return res.status(200).send(deletedCustomer);
  }
});
//! DELETE All
router.delete("/", [auth, admin], async (req, res) => {
  // haridorni bazadan izlab topish
  const deletedCustomers = await Customer.deleteMany({});
  // agarda haridor mavjud bo'lmasa, 404 qaytarish
  if (!deletedCustomers) {
    return res
      .status(404)
      .send(JSON.stringify(`berligan id li haridor topilmadi`));
  } else {
    return res.status(200).send(deletedCustomers);
  }
});

module.exports = router;