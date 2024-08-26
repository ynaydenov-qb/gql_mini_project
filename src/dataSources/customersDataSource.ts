import fs from 'fs/promises';
import path from 'path';
import { Customer } from '../models/customer';

// Path to the JSON file containing the customers
const customersDataPath = path.join(
  __dirname,
  '..',
  'data',
  'customersData.json',
);

export class CustomersDataSource {
  customers: Customer[] = [];

  constructor() {
    this.loadData();
  }

  // Load the data from the file
  async loadData(): Promise<void> {
    try {
      const data = await fs.readFile(customersDataPath, 'utf8');
      this.customers = JSON.parse(data) || [];
    } catch (error) {
      console.error('Error reading customers data:', error);
      this.customers = [];
    }
  }

  // Write data to the file
  async saveData(): Promise<void> {
    try {
      await fs.writeFile(
        customersDataPath,
        JSON.stringify(this.customers, null, 2),
      );
    } catch (error) {
      console.error('Error writing customers data:', error);
    }
  }

  // Get all customers
  async getCustomers(): Promise<Customer[]> {
    return this.customers;
  }

  // Get a customer by id
  async getCustomerById(id: string): Promise<Customer | undefined> {
    return this.customers.find((customer) => customer.id === id);
  }

  // Add a new customer
  async addCustomer(customer: Customer): Promise<void> {
    try {
      this.customers.push(customer);
      await this.saveData();
    } catch (error) {
      // If saving data fails, remove the customer from memory
      this.customers.pop();
      throw error;
    }
  }

  // Update existing customer
  async updateCustomer(updatedCustomer: Customer): Promise<void> {
    const index = this.customers.findIndex(
      (customer) => customer.id === updatedCustomer.id,
    );
    if (index !== -1) {
      const oldCustomer = this.customers[index];
      try {
        this.customers[index] = updatedCustomer;
        await this.saveData(); // Save data asynchronously
      } catch (error) {
        // If saving fails,restore the old customer
        this.customers[index] = oldCustomer;
        throw error;
      }
    }
  }
}
