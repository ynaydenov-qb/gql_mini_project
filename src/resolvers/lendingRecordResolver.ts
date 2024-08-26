import { Customer } from '../models/customer';
import { LendingRecord } from '../models/lendingRecord';
import { CustomersDataSource } from '../dataSources/customersDataSource';
import { DateScalar } from '../customScalars/dateScalar';

const customersDataSource = new CustomersDataSource();

export const lendingRecordResolvers = {
  Date: DateScalar,

  LendingRecord: {
    // Find the customer associated with a lending record
    customer: async (record: LendingRecord): Promise<Customer | null> => {
      const customer = await customersDataSource.getCustomerById(
        record.customerId,
      );
      if (!customer) return null;
      return customer;
    },
  },
};
