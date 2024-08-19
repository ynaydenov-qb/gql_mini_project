export class Book {
  id: string;
  title: string;
  author: string;
  isLent: boolean;
  currentLendeeId?: string;
  dueDate?: Date;
  lendingHistory: LendingRecord[];

  constructor(
    id: string,
    title: string,
    author: string,
    isLent: boolean = false,
    currentLendeeId?: string,
    dueDate?: Date,
    lendingHistory: LendingRecord[] = []
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isLent = isLent;
    this.currentLendeeId = currentLendeeId;
    this.dueDate = dueDate;
    this.lendingHistory = lendingHistory;
  }
}

export class Customer {
  id: string;
  name: string;
  email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

export class LendingRecord {
  customerId: string;
  lentDate: Date;
  returnDate?: Date;
  dueDate: Date;

  constructor(
    customerId: string,
    lentDate: Date,
    dueDate: Date,
    returnDate?: Date
  ) {
    this.customerId = customerId;
    this.lentDate = lentDate;
    this.dueDate = dueDate;
    this.returnDate = returnDate;
  }
}
