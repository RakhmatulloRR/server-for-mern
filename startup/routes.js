const {express, cors} = require("../npm");
const { home, books, users, auth } = require("../routes");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/", home);
  app.use("/api/books", books);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};
