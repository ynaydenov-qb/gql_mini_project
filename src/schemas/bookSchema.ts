import { gql } from "apollo-server";

export const bookTypeDefs = gql`
  type Book {
    id: String!
    title: String!
    author: String!
    isLent: Boolean!
    currentLendee: Customer
    lendingHistory: [LendingRecord!]!
  }
`;