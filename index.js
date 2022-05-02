const { express, mongoose} = require("./npm");
const { db, prod, routes, config } = require("./startup");
const app = express();
db(mongoose, 'mongodb+srv://RRR:42rustamovmongodb31@cluster0.imykb.mongodb.net/myFirstDatabase?retryWrites=true')
prod(app);
routes(app);
config();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`${port}-portni eshitishni boshladim...`);
});
module.exports = server;
