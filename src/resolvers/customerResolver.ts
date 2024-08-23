import { Customer } from '../models/customer';
import { CustomersDataSource } from '../dataSources/customersDataSource';

const customersDataSource = new CustomersDataSource();

export const customerResolvers = {
  Query: {
    // Get all customers
    customers: (): Customer[] => customersDataSource.getCustomers(),

    // Get a customer by id
    customer: (_: unknown, { id }: { id: string }): Customer | undefined =>
      customersDataSource.getCustomerById(id),
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
