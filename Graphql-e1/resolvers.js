// In-memory database
let books = [
  { id: '1', title: '1984', author: 'George Orwell', year: 1949 },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
];

let nextId = 3;

export const resolvers = {
  Query: {
    books: (_, { author, year }) => {
      let result = books;
      if (author) {
        result = result.filter(b => 
          b.author.toLowerCase().includes(author.toLowerCase())
        );
      }
      if (year) {
        result = result.filter(b => b.year === year);
      }
      return result;
    },
    book: (_, { id }) => books.find(b => b.id === id),
  },

  Mutation: {
    addBook: (_, { title, author, year }) => {
      const newBook = { id: String(nextId++), title, author, year };
      books.push(newBook);
      return newBook;
    },
    deleteBook: (_, { id }) => {
      const index = books.findIndex(b => b.id === id);
      if (index === -1) return false;
      books.splice(index, 1);
      return true;
    },
    updateBook: (_, { id, title, author, year }) => {
      const book = books.find(b => b.id === id);
      if (!book) return null;
      if (title) book.title = title;
      if (author) book.author = author;
      if (year) book.year = year;
      return book;
    },
  },
};