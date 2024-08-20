import { Book } from "../models";
import * as fs from "fs";
import * as path from "path";

// Path to JSON file where books are stored
const booksDataPath = path.join(__dirname, "booksData.json");

export class BooksDataSource {
  books: Book[] = [];

  constructor() {
    this.loadData();
  }

  // Load data from file to thhe object
  loadData() {
    const data = JSON.parse(fs.readFileSync(booksDataPath, "utf8"));
    this.books = data || [];
  }

  // Write data to the file
  saveData() {
    fs.writeFileSync(booksDataPath, JSON.stringify(this.books));
  }

  // Get all books
  getBooks(): Book[] {
    return this.books;
  }

  // Get a book by id
  getBookById(id: string): Book | undefined {
    return this.books.find((book) => book.id === id);
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
