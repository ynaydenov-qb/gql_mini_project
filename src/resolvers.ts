import { Book} from "./models/book";
import { Customer } from "./models/customer";
import { LendingRecord } from "./models/lendingRecord";
import { BooksDataSource } from "./dataSources/booksDataSource";
import { CustomersDataSource } from "./dataSources/customersDataSource";
import { logger } from "./logger";

const booksDataSource = new BooksDataSource();
const customersDataSource = new CustomersDataSource();

export const resolvers = {
  Query: {
    // Get all books
    books: (): Book[] => booksDataSource.getBooks(),

    // Get a book by id
    book: (_: any, { id }: { id: string }): Book | undefined => {
      return booksDataSource.getBookById(id);
    },

    // Get all customers
    customers: (): Customer[] => customersDataSource.getCustomers(),

    // Get a customer by id
    customer: (_: any, { id }: { id: string }): Customer | undefined =>
      customersDataSource.getCustomerById(id),
  },

  Mutation: {
    // Add a new book, the isLent field is set to false by default
    addBook: (
      _: any,
      {title, author }: {title: string; author: string }
    ): Book => {
      const newBook = new Book(title, author);
      booksDataSource.addBook(newBook);
      return newBook;
    },

    // Add a new customer
    addCustomer: (
      _: any,
      {name, email }: {name: string; email: string }
    ): Customer => {
      const newCustomer = new Customer(name, email);
      customersDataSource.addCustomer(newCustomer);
      return newCustomer;
    },

    // Lend a book to a customer, updates the fields of a book related to lending
    lendBook: (
      _: any,
      {
        bookId,
        customerId,
        lentDate,
        dueDate,
      }: {
        bookId: string;
        customerId: string;
        lentDate: string;
        dueDate: string;
      }
    ): Book => {
      const book = booksDataSource.getBookById(bookId);
      const customer = customersDataSource.getCustomerById(customerId);

      if (book && customer && !book.isLent) {
        const record = new LendingRecord(customer.id, lentDate, dueDate);

        book.isLent = true;
        book.currentLendeeId = customer.id;
        book.lendingHistory.push(record);
        booksDataSource.updateBook(book);

        return book;
      } else {
        const errorMessage = `Book with ID ${bookId} is already lent or does not exist.`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
      }
    },

    // Mark a book as returned, change its isLent field to false and add a new lendingRecord
    returnBook: (
      _: any,
      { bookId, returnDate }: { bookId: string; returnDate: string }
    ): Book => {
      const book = booksDataSource.getBookById(bookId);
      // Check if the book exists and is actually lent to someone
      if (book && book.isLent) {
        // Find the lending record without return date
        const record = book.lendingHistory.find((r) => !r.returnDate);
        // Update the record and the book
        if (record) {
          record.returnDate = returnDate;
          book.isLent = false;
          book.currentLendeeId = undefined;
          booksDataSource.updateBook(book);

          return book;
        }
      }
      const errorMessage = `Book with ID ${bookId} is not currently lent or does not exist.`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    },
  },

  Book: {
    // Find the current customer that is lending the book
    currentLendee: (book: Book): Customer | null => {
      if (book.currentLendeeId)
        return customersDataSource.getCustomerById(book.currentLendeeId)!;
      return null;
    },

    // Find the lending history
    lendingHistory: (book: Book): LendingRecord[] => {
      return book.lendingHistory;
    },
  },

  LendingRecord: {
    // Find the customer associated with a lending record
    customer: (record: LendingRecord): Customer => {
      return customersDataSource.getCustomerById(record.customerId)!;
    },
  },
};
