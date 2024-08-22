import { generateUUID } from "../utils";

export class Customer {
  id: string;
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.id = generateUUID();
    this.name = name;
    this.email = email;
  }
}
