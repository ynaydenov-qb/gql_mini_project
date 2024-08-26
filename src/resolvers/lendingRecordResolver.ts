import { Customer } from '../models/customer';
import { LendingRecord } from '../models/lendingRecord';
import { DateScalar } from '../customScalars/dateScalar';
import { CustomersDataSource } from '../dataSources/customersDataSource';

export const lendingRecordResolvers = {
  Date: DateScalar,

  LendingRecord: {
    // Find the customer associated with a lending record
    customer: async (
      record: LendingRecord,
      _: unknown,
      {
        customersDataSource,
      }: {
        customersDataSource: CustomersDataSource;
      },
    ): Promise<Customer | undefined> => {
      const customer = await customersDataSource.getCustomerById(
        record.customerId,
      );
      return customer;
    },
  },
};
