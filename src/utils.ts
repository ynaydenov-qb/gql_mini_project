import { v4 as uuidv4 } from 'uuid';
import { LendingRecord } from './models/lendingRecord';

export function generateUUID(): string {
  return uuidv4();
}

// Utility function that converts a LendingRecord object with string dates to a LendingRecord object with Date dates
export const parseLendingRecordDates = (
  record: LendingRecord,
): LendingRecord => {
  return {
    ...record,
    lentDate: new Date(record.lentDate),
    returnDate: record.returnDate ? new Date(record.returnDate) : undefined,
    dueDate: new Date(record.dueDate),
  };
};
