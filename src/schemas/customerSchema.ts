import { gql } from "apollo-server";

export const customerTypeDefs = gql`
  type Customer {
    id: String!
    name: String!
    email: String!
  }
`;