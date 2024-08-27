import { CustomersDataSource } from '../dataSources/customersDataSource';
import { Customer } from '../models/customer';

export const customerResolvers = {
  Query: {
    // Get all customers
    customers: async (
      _: unknown,
      __: unknown,
      {
        customersDataSource,
      }: {
        customersDataSource: CustomersDataSource;
      },
    ): Promise<Customer[]> => await customersDataSource.getCustomers(),

    // Get a customer by id
    customer: async (
      _: unknown,
      { id }: { id: string },
      {
        customersDataSource,
      }: {
        customersDataSource: CustomersDataSource;
      },
    ): Promise<Customer | undefined> =>
      await customersDataSource.getCustomerById(id),
  },
  Mutation: {
    // Add a new customer
    addCustomer: (
      _: unknown,
      { name, email }: { name: string; email: string },
      {
        customersDataSource,
      }: {
        customersDataSource: CustomersDataSource;
      },
    ): Customer => {
      const newCustomer = new Customer(name, email);
      customersDataSource.addCustomer(newCustomer);
      return newCustomer;
    },
  },
};
