import { gql } from "apollo-server";

export const queryAndMutationTypeDefs = gql`
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