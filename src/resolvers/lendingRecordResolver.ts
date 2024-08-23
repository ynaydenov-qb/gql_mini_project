import { Customer } from "../models/customer";
import { LendingRecord } from "../models/lendingRecord";
import { CustomersDataSource } from "../dataSources/customersDataSource";
const customersDataSource = new CustomersDataSource();

export const lendingRecordResolvers = {
  LendingRecord: {
    // Find the customer associated with a lending record
    customer: (record: LendingRecord): Customer => {
      return customersDataSource.getCustomerById(record.customerId)!;
    },
  },
};
