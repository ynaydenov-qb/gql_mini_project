import { Customer } from '../models/customer';
import { LendingRecord } from '../models/lendingRecord';
import { CustomersDataSource } from '../dataSources/customersDataSource';
import { DateScalar } from '../customScalars/dateScalar';

const customersDataSource = new CustomersDataSource();

export const lendingRecordResolvers = {
  Date: DateScalar,

  LendingRecord: {
    // Find the customer associated with a lending record
    customer: (record: LendingRecord): Customer =>
      customersDataSource.getCustomerById(record.customerId)!,
  },
};
