module.exports = function(mongoose, url) {
  mongoose
  .connect(`${url}`)
  .then((result) => {
    console.log(`MongoDBga ulanish hosil qilindi...`);
  })
  .catch((err) => {
    console.log(`MongoDBga ulanishda hatolik yuz beridi...`);
  });
}