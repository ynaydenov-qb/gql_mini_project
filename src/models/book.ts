import { LendingRecord } from "./lendingRecord";
import { v4 as uuidv4 } from "uuid";

export class Book {
  id: string;
  title: string;
  author: string;
  isLent: boolean;
  currentLendeeId?: string;
  lendingHistory: LendingRecord[];

  constructor(
    title: string,
    author: string,
    isLent: boolean = false,
    currentLendeeId?: string,
    lendingHistory: LendingRecord[] = []
  ) {
    this.id = uuidv4();
    this.title = title;
    this.author = author;
    this.isLent = isLent;
    this.currentLendeeId = currentLendeeId;
    this.lendingHistory = lendingHistory;
  }
}
