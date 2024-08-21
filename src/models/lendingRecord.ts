import { v4 as uuidv4 } from "uuid";

export class LendingRecord {
  id: string;
  customerId: string;
  lentDate: string;
  returnDate?: string;
  dueDate: string;

  constructor(
    customerId: string,
    lentDate: string,
    dueDate: string,
    returnDate?: string
  ) {
    this.id = uuidv4();
    this.customerId = customerId;
    this.lentDate = lentDate;
    this.dueDate = dueDate;
    this.returnDate = returnDate;
  }
}
