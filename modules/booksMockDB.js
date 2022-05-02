const books = [
  {
    id: 1651062280931,
    name: "book1",
    year: 1981,
    isBestSeller: true,
    author: {
      fn: "John1",
      ln: "Doe1",
    },
  },
  {
    id: 1651062280932,
    name: "book2",
    year: 1982,
    isBestSeller: true,
    author: {
      fn: "John2",
      ln: "Doe2",
    },
  },
  {
    id: 1651062280933,
    name: "book3",
    year: 1983,
    isBestSeller: true,
    author: {
      fn: "John3",
      ln: "Doe3",
    },
  },
  {
    id: 1651062280934,
    name: "book4",
    year: 1984,
    isBestSeller: true,
    author: {
      fn: "John4",
      ln: "Doe4",
    },
  },
  {
    id: 1651062280935,
    name: "book5",
    year: 1985,
    isBestSeller: true,
    author: {
      fn: "John5",
      ln: "Doe5",
    },
  },
  {
    id: 1651062280936,
    name: "book6",
    year: 1986,
    isBestSeller: true,
    author: {
      fn: "John6",
      ln: "Doe6",
    },
  },
];
module.exports = books;

const book = books[0];
console.log(JSON.stringify(book))