import { v4 as uuidv4 } from "uuid";

export class Customer {
  id: string;
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
  }
}
