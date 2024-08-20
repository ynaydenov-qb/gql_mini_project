import { Customer } from "../models";
import * as fs from "fs";
import * as path from "path";

// Path to the JSON file containing the customers
const customersDataPath = path.join(__dirname, "customersData.json");

export class CustomersDataSource {
  customers: Customer[] = [];

  constructor() {
    this.loadData();
  }

  // Load the data from the file
  loadData() {
    const data = JSON.parse(fs.readFileSync(customersDataPath, "utf8"));
    this.customers = data || [];
  }

  // Write data to the file
  private saveData() {
    fs.writeFileSync(customersDataPath, JSON.stringify(this.customers));
  }

  // Get all customers
  getCustomers(): Customer[] {
    return this.customers;
  }

  // Get a customer by id
  getCustomerById(id: string): Customer | undefined {
    return this.customers.find((customer) => customer.id === id);
  }

  // Add a new customer
  addCustomer(customer: Customer) {
    this.customers.push(customer);
    this.saveData();
  }

  // Update existing customer
  updateCustomer(updatedCustomer: Customer) {
    const index = this.customers.findIndex(
      (customer) => customer.id === updatedCustomer.id
    );
    if (index !== -1) {
      this.customers[index] = updatedCustomer;
      this.saveData();
    }
  }
}
