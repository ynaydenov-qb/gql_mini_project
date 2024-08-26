import { gql } from 'apollo-server';

export const lendingRecordTypeDefs = gql`
  scalar Date

  type LendingRecord {
    id: String!
    customer: Customer
    lentDate: Date!
    returnDate: Date
    dueDate: Date!
  }
`;
