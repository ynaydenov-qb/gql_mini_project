import { LendingRecord } from "./lendingRecord";

export class Book {
  id: string;
  title: string;
  author: string;
  isLent: boolean;
  currentLendeeId?: string;
  dueDate?: string;
  lendingHistory: LendingRecord[];

  constructor(
    id: string,
    title: string,
    author: string,
    isLent: boolean = false,
    currentLendeeId?: string,
    dueDate?: string,
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
