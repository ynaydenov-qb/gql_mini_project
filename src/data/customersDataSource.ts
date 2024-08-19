import { Customer } from "../models";
import * as fs from "fs";
import * as path from "path";

const customersDataPath = path.join(__dirname, "customersData.json");

export class CustomersDataSource {
  customers: Customer[] = [];

  constructor() {
    this.loadData();
  }

  loadData() {
    const data = JSON.parse(fs.readFileSync(customersDataPath, "utf8"));
    this.customers = data || [];
  }

  private saveData() {
    fs.writeFileSync(customersDataPath, JSON.stringify(this.customers));
  }

  getCustomers(): Customer[] {
    return this.customers;
  }

  getCustomerById(id: string): Customer | undefined {
    return this.customers.find((customer) => customer.id === id);
  }

  addCustomer(customer: Customer) {
    this.customers.push(customer);
    this.saveData();
  }

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
