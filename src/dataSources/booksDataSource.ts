import fs from 'fs';
import path from 'path';
import { Book } from '../models/book';
import { LendingRecord } from '../models/lendingRecord';
import { parseLendingRecordDates } from '../utils';

// Path to JSON file where books are stored
const booksDataPath = path.join(__dirname, '..', 'data', 'booksData.json');

export class BooksDataSource {
  books: Book[] = [];

  constructor() {
    this.loadData();
  }

  // Load data from file to thhe object
  loadData() {
    const data = JSON.parse(fs.readFileSync(booksDataPath, 'utf8'));
    this.books = data || [];
  }

  // Write data to the file
  saveData() {
    fs.writeFileSync(booksDataPath, JSON.stringify(this.books));
  }

  // Get all books, cast the lending records into a new ones, because json reads the fields as string and we need them as date
  getBooks(): Book[] {
    return this.books.map((book) => ({
      ...book,
      lendingHistory: book.lendingHistory.map(
        parseLendingRecordDates,
      ) as LendingRecord[], // Explicitly cast the type because it was necessary
    }));
  }

  // Get a book by id, cast the lending records into a new ones, because json reads the fields as string and we need them as date
  getBookById(id: string): Book | undefined {
    const book = this.books.find((book) => book.id === id);
    if (book) {
      return {
        ...book,
        lendingHistory: book.lendingHistory.map(
          parseLendingRecordDates,
        ) as LendingRecord[], // Explicitly cast the type because it was necessary
      };
    }
    return undefined;
  }

  // Add a new book
  addBook(book: Book) {
    this.books.push(book);
    this.saveData();
  }

  // Update an existing book
  updateBook(updatedBook: Book) {
    const index = this.books.findIndex((book) => book.id === updatedBook.id);
    if (index !== -1) {
      this.books[index] = updatedBook;
      this.saveData();
    }
  }
}
