import { gql } from 'apollo-server';

export const lendingRecordTypeDefs = gql`
  type LendingRecord {
    id: String!
    customer: Customer!
    lentDate: String!
    returnDate: String
    dueDate: String!
  }
`;
