import fs from 'fs/promises';
import path from 'path';
import { Book } from '../models/book';
import { LendingRecord } from '../models/lendingRecord';
import { parseLendingRecordDates } from '../utils';
import { logger } from '../logger';

// Path to JSON file where books are stored
const booksDataPath = path.join(__dirname, '..', 'data', 'booksData.json');

export class BooksDataSource {
  books: Book[] = [];

  constructor() {
    this.loadData();
  }

  // Load data from file to thhe object
  async loadData(): Promise<void> {
    try {
      const data = await fs.readFile(booksDataPath, 'utf-8');
      this.books = JSON.parse(data) || [];
    } catch (error) {
      logger.error('Error reading books data:', error);
      this.books = [];
    }
  }

  // Write data to the file
  async saveData(): Promise<void> {
    try {
      await fs.writeFile(booksDataPath, JSON.stringify(this.books, null, 2));
    } catch (error) {
      logger.error('Error writing books data:', error);
    }
  }

  // Get all books, cast the lending records into a new ones, because json reads the fields as string and we need them as date
  async getBooks(): Promise<Book[]> {
    return this.books.map((book) => ({
      ...book,
      lendingHistory: book.lendingHistory.map(
        parseLendingRecordDates,
      ) as LendingRecord[], // Explicitly cast the type because it was necessary
    }));
  }

  // Get a book by id, cast the lending records into a new ones, because json reads the fields as string and we need them as date
  async getBookById(id: string): Promise<Book | undefined> {
    const book = this.books.find((book) => book.id === id);
    if (!book) return undefined;
    return {
      ...book,
      lendingHistory: book.lendingHistory.map(
        parseLendingRecordDates,
      ) as LendingRecord[], // Explicitly cast the type because it was necessary
    };
  }

  // Add a new book
  async addBook(book: Book): Promise<void> {
    try {
      const data = await fs.readFile(booksDataPath, 'utf8');
      const books: Book[] = JSON.parse(data) || [];
      books.push(book);
      await fs.writeFile(booksDataPath, JSON.stringify(books, null, 2));
      this.books.push(book);
    } catch (error) {
      logger.error('Error adding book:', error);
      throw new Error('Failed to add book');
    }
  }

  // Update an existing book
  async updateBook(updatedBook: Book): Promise<void> {
    try {
      const data = await fs.readFile(booksDataPath, 'utf8');
      const books: Book[] = JSON.parse(data) || [];
      const index = books.findIndex((book) => book.id === updatedBook.id);
      if (index !== -1) {
        books[index] = updatedBook;
        await fs.writeFile(booksDataPath, JSON.stringify(books, null, 2));
        this.books[index] = updatedBook;
      }
    } catch (error) {
      logger.error('Error updating book:', error);
      throw new Error('Failed to update book');
    }
  }
}
