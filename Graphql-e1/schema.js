export const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: String!
    year: Int!
  }

  type Query {
    books(author: String, year: Int): [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!, year: Int!): Book!
    deleteBook(id: ID!): Boolean!
    updateBook(id: ID!, title: String, author: String, year: Int): Book!
  }
`;