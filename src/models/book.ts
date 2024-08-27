import { LendingRecord } from './lendingRecord';
import { generateUUID } from '../utils';

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
    lendingHistory: LendingRecord[] = [],
  ) {
    this.id = generateUUID();
    this.title = title;
    this.author = author;
    this.isLent = isLent;
    this.currentLendeeId = currentLendeeId;
    this.lendingHistory = lendingHistory;
  }
}
