import { Book } from "../models";
import * as fs from "fs";
import * as path from "path";

const booksDataPath = path.join(__dirname, "booksData.json");

export class BooksDataSource {
  books: Book[] = [];

  constructor() {
    this.loadData();
  }

  loadData() {
    const data = JSON.parse(fs.readFileSync(booksDataPath, "utf8"));
    this.books = data || [];
  }

  saveData() {
    fs.writeFileSync(booksDataPath, JSON.stringify(this.books));
  }

  getBooks(): Book[] {
    return this.books;
  }

  getBookById(id: string): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  addBook(book: Book) {
    this.books.push(book);
    this.saveData();
  }

  updateBook(updatedBook: Book) {
    const index = this.books.findIndex((book) => book.id === updatedBook.id);
    if (index !== -1) {
      this.books[index] = updatedBook;
      this.saveData();
    }
  }
}
