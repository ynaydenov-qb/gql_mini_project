import { gql } from "apollo-server";

export const typeDefs = gql`
  type Customer {
    id: String!
    name: String!
    email: String!
  }

  type LendingRecord {
    id: String!
    customer: Customer!
    lentDate: String!
    returnDate: String
    dueDate: String!
  }

  type Book {
    id: String!
    title: String!
    author: String!
    isLent: Boolean!
    currentLendee: Customer
    dueDate: String
    lendingHistory: [LendingRecord!]!
  }

  type Query {
    books: [Book!]!
    book(id: String!): Book
    customers: [Customer!]!
    customer(id: String!): Customer
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
    addCustomer(name: String!, email: String!): Customer
    lendBook(
      bookId: String!
      customerId: String!
      lentDate: String!
      dueDate: String!
    ): Book
    returnBook(bookId: String!, returnDate: String!): Book
  }
`;
