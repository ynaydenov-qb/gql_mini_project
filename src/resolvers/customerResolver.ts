import { Customer } from '../models/customer';
import { CustomersDataSource } from '../dataSources/customersDataSource';

const customersDataSource = new CustomersDataSource();

export const customerResolvers = {
  Query: {
    // Get all customers
    customers: async (): Promise<Customer[]> =>
      await customersDataSource.getCustomers(),

    // Get a customer by id
    customer: async (
      _: unknown,
      { id }: { id: string },
    ): Promise<Customer | undefined> =>
      await customersDataSource.getCustomerById(id),
  },
  Mutation: {
    // Add a new customer
    addCustomer: (
      _: unknown,
      { name, email }: { name: string; email: string },
    ): Customer => {
      const newCustomer = new Customer(name, email);
      customersDataSource.addCustomer(newCustomer);
      return newCustomer;
    },
  },
};
