import { generateUUID } from '../utils';

export class LendingRecord {
  id: string;

  customerId: string;

  lentDate: Date;

  returnDate?: Date;

  dueDate: Date;

  constructor(
    customerId: string,
    lentDate: Date,
    dueDate: Date,
    returnDate?: Date,
  ) {
    this.id = generateUUID();
    this.customerId = customerId;
    this.lentDate = lentDate;
    this.dueDate = dueDate;
    this.returnDate = returnDate;
  }
}
